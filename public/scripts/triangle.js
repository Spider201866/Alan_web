// Alan UI - triangle.js | 14th January 2026, WJW
// public/scripts/triangle.js
// Handles the creation and animation of the SVG triangle graphic.

document.addEventListener('DOMContentLoaded', function () {
  // If AnimeJS fails to load (offline/CDN/CSP), fail gracefully to a static triangle.
  const hasAnime = typeof anime === 'function';

  // --- SVG Creation ---
  (function createTriangles() {
    const group = document.getElementById('triangleGroup');
    if (!group) return;
    const apexX = 220,
      apexY = 220;
    const baseLeftX = 0,
      baseLeftY = 440;
    const baseRightX = 440,
      baseRightY = 440;

    const lerpPoint = (ax, ay, bx, by, factor) => ({
      x: ax + (bx - ax) * factor,
      y: ay + (by - ay) * factor,
    });

    const frag = document.createDocumentFragment();

    const mainFill = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    mainFill.setAttribute(
      'd',
      `M ${apexX},${apexY} L ${baseLeftX},${baseLeftY} L ${baseRightX},${baseRightY} Z`
    );
    mainFill.setAttribute('fill', '#FF0000');
    mainFill.setAttribute('stroke', 'none');
    frag.appendChild(mainFill);

    for (let i = 1; i <= 7; i++) {
      const factor = i / 8;
      const leftPt = lerpPoint(apexX, apexY, baseLeftX, baseLeftY, factor);
      const rightPt = lerpPoint(apexX, apexY, baseRightX, baseRightY, factor);
      const outline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      outline.setAttribute(
        'd',
        `M ${apexX},${apexY} L ${leftPt.x},${leftPt.y} L ${rightPt.x},${rightPt.y} Z`
      );
      outline.setAttribute('fill', 'none');
      outline.setAttribute('stroke', 'rgba(0,0,0,0.6)');
      outline.setAttribute('stroke-width', '3');
      frag.appendChild(outline);
    }

    group.appendChild(frag);
  })();

  // --- Animation Logic ---
  (function () {
    const triangleEl = document.querySelector('.triangle-animation');
    if (!triangleEl) return;
    const allPaths = triangleEl.querySelectorAll('.triangle path');
    const outlinePaths = Array.from(allPaths).slice(1);

    // If AnimeJS isn't available, keep the static triangle without throwing.
    if (!hasAnime) return;

    const animations = [];

    const PHASE_OFFSET = 0.35;
    const PULSE_SPEED = 0.0022;

    let breathChildrenBuilt = false;

    const breathAnimation = anime({
      begin: () => {
        if (breathChildrenBuilt) return;
        breathChildrenBuilt = true;

        outlinePaths.forEach((path) => {
          animations.push(
            anime({
              targets: path,
              stroke: { value: ['rgba(0,0,0,1)', 'rgba(0,0,0,0.6)'], duration: 500 },
              strokeWidth: { value: [10, 1], duration: 500 },
              translateX: [1, -2],
              translateY: [1, -2],
              easing: 'easeOutQuad',
              autoplay: false,
            })
          );
        });
      },
      update: (ins) => {
        animations.forEach((animation, i) => {
          const percent = (1 + Math.sin(i * PHASE_OFFSET + PULSE_SPEED * ins.currentTime)) / 2;
          animation.seek(animation.duration * percent);
        });
      },
      duration: Infinity,
      autoplay: false,
    });

    const introAnimation = anime.timeline({ autoplay: false }).add(
      {
        targets: outlinePaths,
        strokeDashoffset: {
          value: [anime.setDashoffset, 0],
          duration: 2000,
          easing: 'easeInOutCirc',
          delay: anime.stagger(120),
        },
        easing: 'linear',
      },
      0
    );

    function init() {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        introAnimation.play();
        breathAnimation.play();
      } else {
        allPaths.forEach((path) => (path.style.strokeDashoffset = 0));
        outlinePaths.forEach((path) => {
          path.setAttribute('stroke', 'rgba(0,0,0,0.6)');
          path.setAttribute('stroke-width', '3');
        });
      }
    }
    init();
  })();
});
