// Settings initialization
(() => {
  // Check existence of previous settings
  const prevSettings = localStorage.getItem("settings")
  if (prevSettings) {
    Object.assign(settings, JSON.parse(prevSettings))
  }
  // Apply settings to the settings panel
  document.querySelector("#background-color").value = settings.background
  document.querySelector("#logo-color").value = settings.logo.color
  document.querySelector("#logo-scale").value = 1.0
  document.querySelector("#speed-x").value = settings.speed.x
  document.querySelector("#speed-y").value = settings.speed.y
  document.querySelector("#pause").checked = settings.paused
  document.querySelector("#fps-limit").value = settings.fps_limit

  // Apply settings to DOM
  document.body.style.background = settings.background
  document.querySelector(".logo > svg").style.fill = settings.logo.color
  document.querySelector(".logo").style.height = settings.logo.dimensions.height * settings.logo.scale
  document.querySelector(".logo").style.width = settings.logo.dimensions.width * settings.logo.scale
})()

function saveSettings()
{
  localStorage.setItem("settings", JSON.stringify(settings))
}

function clearSettings()
{
  localStorage.removeItem("settings")
  location.reload()
}

document
  .querySelector(".settings-toggle")
  .addEventListener("click", () => {
    const settingsWindow = document.querySelector(".settings-window")
    settingsWindow.style.display = settingsWindow.style.display === "block" ? "none" : "block"
  })

document
  .querySelectorAll("body div:not(.settings,.settings > *)").forEach(element =>
    element.addEventListener("click", () => {
      const settingsWindow = document.querySelector(".settings-window")
      if (settingsWindow.style.display === "block") {
        settingsWindow.style.display = "none"
      }
    })
  )

document
  .querySelector("#background-color")
  .addEventListener("input", (event) => {
    settings.background = event.target.value
    document.body.style.background = settings.background
  })

document
  .querySelector("#logo-color")
  .addEventListener("input", (event) => {
    settings.logo.color = event.target.value
    document.querySelector(".logo > svg").style.fill = settings.logo.color
  })

document
  .querySelector("#logo-scale")
  .addEventListener("input", (event) => {
    const element = document.querySelector(".logo")
    settings.logo.scale = parseFloat(event.target.value)
    element.style.height = settings.logo.dimensions.height * settings.logo.scale
    element.style.width = settings.logo.dimensions.width * settings.logo.scale
  })

document
  .querySelector("#speed-x")
  .addEventListener("input", (event) => {
    settings.speed.x = settings.speed.x >= 0 ? parseInt(event.target.value) : parseInt(-1 * event.target.value)
  })

document
  .querySelector("#speed-y")
  .addEventListener("input", (event) => {
    settings.speed.y = settings.speed.y >= 0 ? parseInt(event.target.value) : parseInt(-1 * event.target.value)
  })

document
  .querySelector("#pause")
  .addEventListener("click", (event) => {
    settings.paused = event.target.checked
  })

document
  .querySelector("#fps-limit")
  .addEventListener("input", (event) => {
    settings.fps_limit = parseInt(event.target.value)
  })

document
  .querySelector("#save-settings")
  .addEventListener("click", saveSettings)
  
document
  .querySelector("#clear-settings")
  .addEventListener("click", clearSettings)