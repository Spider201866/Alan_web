/**
 * Flowise reverse-proxy middleware.
 *
 * Why: Browsers block cross-origin requests to the Flowise API unless the Flowise server
 * is configured to allow our site via CORS. By proxying via our own server (same-origin),
 * the frontend can talk to Flowise without browser CORS issues.
 *
 * This proxy is intentionally dependency-free (uses Node 20+ built-in fetch).
 */

import { Readable } from 'node:stream';

const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
]);

/**
 * @param {object} options
 * @param {string} options.targetBaseUrl - e.g. https://flowise.example.com
 */
export default function flowiseProxy({ targetBaseUrl }) {
  if (!targetBaseUrl) {
    throw new Error('flowiseProxy requires targetBaseUrl');
  }

  return async function flowiseProxyMiddleware(req, res, next) {
    const controller = new AbortController();

    const abortUpstream = () => {
      try {
        controller.abort();
      } catch {
        // ignore
      }
    };

    // If the client disconnects, abort the upstream request.
    req.on('aborted', abortUpstream);
    // IMPORTANT: do not use req.on('close') here.
    // `close` can fire on normal request completion, which would abort upstream
    // and leave the client hanging. `res.close` reliably indicates client disconnect.
    res.on('close', () => {
      if (!res.writableEnded) abortUpstream();
    });

    try {
      if (/^https?:\/\//i.test(req.url) || req.url.startsWith('//')) {
        res.statusCode = 400;
        res.end('Invalid proxy target');
        return;
      }

      const targetUrl = new URL(req.url, targetBaseUrl);
      if (targetUrl.origin !== new URL(targetBaseUrl).origin) {
        res.statusCode = 400;
        res.end('Invalid proxy target');
        return;
      }

      const headers = { ...req.headers };
      delete headers.host;
      delete headers.cookie;
      delete headers.authorization;
      delete headers['proxy-authorization'];
      delete headers['proxy-authenticate'];

      // Avoid sending an Origin header upstream. This prevents Flowise from treating
      // the request as cross-origin and needing CORS headers.
      delete headers.origin;

      // If our server already parsed the body (express.json()), forward the parsed
      // JSON instead of trying to re-stream the already-consumed request.
      const method = (req.method || 'GET').toUpperCase();
      const hasBody = !['GET', 'HEAD'].includes(method);

      let body = undefined;
      if (hasBody) {
        if (req.body !== undefined && req.body !== null && Object.keys(req.body).length > 0) {
          body = JSON.stringify(req.body);
          // Ensure correct upstream content type.
          headers['content-type'] = headers['content-type'] || 'application/json';
          // Content-Length must match the new body.
          delete headers['content-length'];
        } else {
          body = req;
        }
      }

      const upstreamResponse = await fetch(targetUrl, {
        method,
        headers,
        body,
        // Node/undici requires this when streaming a request body.
        duplex: hasBody && body === req ? 'half' : undefined,
        signal: controller.signal,
      });

      res.statusCode = upstreamResponse.status;

      upstreamResponse.headers.forEach((value, key) => {
        if (HOP_BY_HOP_HEADERS.has(key.toLowerCase())) return;
        if (key.toLowerCase() === 'set-cookie') return;
        res.setHeader(key, value);
      });

      if (!upstreamResponse.body) {
        res.end();
        return;
      }

      // Pipe upstream response (supports JSON + text/event-stream).
      Readable.fromWeb(upstreamResponse.body).pipe(res);
    } catch (err) {
      // AbortError is expected on client disconnect.
      if (err?.name === 'AbortError') {
        if (!res.headersSent) {
          // Non-standard but commonly used “Client Closed Request” code.
          res.statusCode = 499;
          res.end();
        }
        return;
      }
      next(err);
    }
  };
}
