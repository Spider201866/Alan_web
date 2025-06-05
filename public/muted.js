// muted.js

// Track whether the images button is currently showing the sub-image buttons
let imagesButtonClicked = false

/**
 * Called only after muted.html is in the DOM. 
 * Attaches Refer, Screenshot, and Images button events.
 */
function initMutedButtons() {
  // 1) REFER
  const referButton = document.getElementById("refer")
  const popup = document.getElementById("refer-popup")
  if (referButton && popup) {
    function showPopup(e) {
      e.preventDefault()
      e.stopPropagation()
      console.log("Refer button activated")

      if (popup.hideTimeout) clearTimeout(popup.hideTimeout)
      popup.style.display = "block"
      popup.hideTimeout = setTimeout(() => {
        popup.style.display = "none"
      }, 3000)
    }
    referButton.addEventListener("click", showPopup)
    referButton.addEventListener("touchstart", showPopup)
  } else {
    console.warn("Refer button or popup element not found.")
  }

  // 2) SCREENSHOT
  const screenshotButton = document.getElementById("screenshot")
  if (screenshotButton) {
    screenshotButton.addEventListener("click", takeScreenshot)
  } else {
    console.warn("Screenshot button not found.")
  }

  // 3) IMAGES
  const imagesButton = document.getElementById("images")
  if (imagesButton) {
    imagesButton.addEventListener("click", () => {
      console.log("Images button clicked.")

      // If the sub-image buttons are already showing, remove them
      const existingContainer = document.getElementById("chat-end-buttons")
      if (existingContainer) {
        removeChatEndButtons()
        imagesButtonClicked = false
      } else {
        // Otherwise, show them
        imagesButtonClicked = true
        removeChatEndButtons()       // ensure no duplicates
        createButtonsWithText("")    // pass "" or a condition name if you want
      }
    })
  } else {
    console.warn("Images button not found in the DOM.")
  }
}

/**
 * Use html2canvas to capture the screen, then auto-download screenshot.png
 */
function takeScreenshot() {
  if (typeof html2canvas === "undefined") {
    console.error("html2canvas is not loaded.")
    return
  }
  html2canvas(document.body)
    .then(canvas => {
      const dataURL = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = dataURL
      link.download = "screenshot.png"
      link.click()
      link.remove()
    })
    .catch(err => {
      console.error("Screenshot capture failed:", err)
    })
}

/**
 * Removes any existing container for sub-image buttons
 */
function removeChatEndButtons() {
  const oldContainer = document.getElementById("chat-end-buttons")
  if (oldContainer) oldContainer.remove()
}

/**
 * Creates and inserts the sub-image button container
 * (e.g. Ophthalmology, ENT, Dermatology)
 */
function createButtonsWithText(condition) {
  // Avoid duplicates
  if (document.getElementById("chat-end-buttons")) return

  // The container
  const container = document.createElement("div")
  container.id = "chat-end-buttons"
  container.style.display = "flex"
  container.style.flexDirection = "column"
  container.style.alignItems = "center"
  container.style.marginTop = "-20px"
  container.style.marginBottom = "35px"
  container.style.transition = "margin-top 0.3s"

  // A small headline
  const textLine = document.createElement("div")
  if (condition) {
    textLine.innerHTML = `Find <strong>${condition}</strong> images on these sites`
  } else {
    textLine.textContent = "Find images on these sites"
  }
  textLine.style.fontSize = "14px"
  textLine.style.marginBottom = "10px"
  container.appendChild(textLine)

  // Row of 3 site buttons
  const buttonsRow = document.createElement("div")
  buttonsRow.style.display = "flex"
  buttonsRow.style.flexWrap = "wrap"
  buttonsRow.style.justifyContent = "center"
  buttonsRow.style.gap = "15px"

  // 1) Ophthalmology
  const ophButton = document.createElement("button")
  ophButton.className = "button"
  ophButton.style.backgroundColor = "rgb(134, 162, 255)"
  ophButton.style.color = "black"
  ophButton.style.fontSize = "14px"
  ophButton.style.border = "2px solid black"
  ophButton.style.padding = "6px 10px"
  ophButton.textContent = "Ophthalmology"
  ophButton.addEventListener("click", () => {
    window.open("https://eyewiki.org/Main_Page", "_blank")
  })

  // 2) ENT
  const entButton = document.createElement("button")
  entButton.className = "button"
  entButton.style.backgroundColor = "rgb(133, 255, 133)"
  entButton.style.color = "black"
  entButton.style.fontSize = "14px"
  entButton.style.border = "2px solid black"
  entButton.style.padding = "6px 10px"
  entButton.textContent = "ENT"
  entButton.addEventListener("click", () => {
    window.open("ent.html", "_blank")
  })

  // 3) Dermatology
  const dermButton = document.createElement("button")
  dermButton.className = "button"
  dermButton.style.backgroundColor = "#efafff"
  dermButton.style.color = "black"
  dermButton.style.fontSize = "14px"
  dermButton.style.border = "2px solid black"
  dermButton.style.padding = "6px 10px"
  dermButton.textContent = "Dermatology"
  dermButton.addEventListener("click", () => {
    window.open("https://dermnetnz.org/images", "_blank")
  })

  // Append them
  buttonsRow.appendChild(ophButton)
  buttonsRow.appendChild(entButton)
  buttonsRow.appendChild(dermButton)
  container.appendChild(buttonsRow)

  // Insert above the "Alan can make mistakes..." line if found
  const footer = document.querySelector("footer.chatbot-version")
  if (footer) {
    footer.parentNode.insertBefore(container, footer)
  } else {
    document.body.appendChild(container)
  }

  // If it's too tall, remove negative margin
  setTimeout(() => {
    const rect = container.getBoundingClientRect()
    if (rect.bottom > window.innerHeight) {
      container.style.marginTop = "0px"
    }
  }, 100)
}
