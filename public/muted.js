// muted.js

/**
 * Attach event listeners for the Refer button and the Screenshot button.
 * Call this function only after muted.html has been fetched and placed into the DOM.
 */
function initMutedButtons() {
    // -----------------------------------------------------
    // 1) Refer button logic
    // -----------------------------------------------------
    const referButton = document.getElementById("refer");
    const popup = document.getElementById("refer-popup");
    
    if (!referButton || !popup) {
      console.warn("Refer button or popup element not found in the DOM.");
    } else {
      // Show the popup for 3 seconds on click or touch
      function showPopup(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Refer button activated");
  
        // Cancel any existing hide timeout
        if (popup.hideTimeout) {
          clearTimeout(popup.hideTimeout);
        }
  
        // Display the popup
        popup.style.display = "block";
  
        // Hide it after 3 seconds
        popup.hideTimeout = setTimeout(function() {
          popup.style.display = "none";
        }, 3000);
      }
  
      referButton.addEventListener("click", showPopup);
      referButton.addEventListener("touchstart", showPopup);
    }
  
    // -----------------------------------------------------
    // 2) Screenshot button logic (requires html2canvas)
    // -----------------------------------------------------
    const screenshotButton = document.getElementById("screenshot");
    if (!screenshotButton) {
      console.warn("Screenshot button not found in the DOM.");
    } else {
      screenshotButton.addEventListener("click", takeScreenshot);
    }
  }
  
  /**
   * Uses the html2canvas library to capture the visible portion of the page (document.body),
   * then automatically downloads it as "screenshot.png".
   */
  function takeScreenshot() {
    // Make sure html2canvas is loaded (e.g. via a <script> in home.html)
    if (typeof html2canvas === "undefined") {
      console.error("html2canvas is not loaded. Please include it before using takeScreenshot.");
      return;
    }
  
    // Capture the entire <body> as a canvas image
    html2canvas(document.body)
      .then(canvas => {
        // Convert the canvas to a data URL (PNG format)
        const dataURL = canvas.toDataURL("image/png");
  
        // Create a temporary <a> element to trigger a download of the image
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "screenshot.png";
        link.click();
  
        // Clean up the <a> element
        link.remove();
      })
      .catch(err => {
        console.error("Screenshot capture failed:", err);
      });
  }
  