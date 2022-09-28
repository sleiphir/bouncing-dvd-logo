// Settings toggle button
document
  .querySelector(".settings-toggle")
  .addEventListener("click", () => {
    const settings = document.querySelector(".settings-window")
    console.log(settings.style.display)
    settings.style.display = settings.style.display === "block" ? "none" : "block"
  })

// Background color
document
  .querySelector("#background-color")
  .addEventListener("input", (event) => {
    document.body.style.background = event.target.value
  })

// Logo color
document
  .querySelector("#logo-color")
  .addEventListener("input", (event) => {
    document.querySelector(".logo > svg").style.fill = event.target.value
  })

// Speed X
document
  .querySelector("#speed-x")
  .addEventListener("input", (event) => {
    settings.speed.x = settings.speed.x >= 0 ? parseInt(event.target.value) : parseInt(-1 * event.target.value)
  })

// Speed Y
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
