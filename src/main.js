const settings = {
  speed: {
    x: 100,
    y: 100,
  },
  logo: {
    height: 90,
    width: 180
  },
  area: {
    height: window.innerHeight,
    width: window.innerWidth,
  },
  fps_limit: 1000,
}

let PAUSED = false
let cornerHitCount = 0

let logo = document.querySelector(".logo")
logo.style.height = settings.logo.height
logo.style.width = settings.logo.width

let area = document.querySelector(".area")
area.style.width = settings.area.width
area.style.height = settings.area.height

function move(target, area, timeElapsed)
{
  const collision = checkCollision(target.getBoundingClientRect(), area.getBoundingClientRect())
  if (Object.values(collision).includes(true))
  {
    logCornerCheck(collision)
    forceInBounds(target, area)
    changeDirection(collision)
  }
  updatePosition(target, timeElapsed)
}

function logCornerCheck(collision)
{
  if (Object.values(collision).reduce((acc, val) => acc += val, 0) >= 2)
  {
    cornerHitCount += 1
    console.log(`%c HIT THE CORNER!! The total number of corner hit is ${cornerHitCount}`, 'background: #222; color: #FF0000')
  }
  else
  {
    console.log("bonk")
  }
}

function checkCollision(target, area)
{
  return { 
    top:    target.y <= area.top,
    bottom: target.y >= area.height - target.height,
    left:   target.x <= area.left,
    right:  target.x >= area.width - target.width,
  }
}

function changeDirection(collision)
{
  settings.speed.y *= collision.top ^ collision.bottom ? -1 : 1
  settings.speed.x *= collision.left ^ collision.right ? -1 : 1
}

function updatePosition(target, timeElapsed)
{
  let { x, y } = target.getBoundingClientRect()
  x += timeElapsed / 1000 * settings.speed.x
  y += timeElapsed / 1000 * settings.speed.y
  target.style.left = x
  target.style.top = y
}

function forceInBounds(target, area)
{
  const targetBoundingRect = target.getBoundingClientRect()
  const areaBoundingRect = area.getBoundingClientRect()
  const collision = checkCollision(targetBoundingRect, areaBoundingRect)
  if (collision.top) {
    target.style.top = areaBoundingRect.top + 1
  }
  if (collision.bottom) {
    target.style.top = areaBoundingRect.bottom - targetBoundingRect.height - 1
  }
  if (collision.left) {
    target.style.left = areaBoundingRect.left + 1
  }
  if (collision.right) {
    target.style.left = areaBoundingRect.right - targetBoundingRect.width - 1
  }
}

let then = Date.now()

function draw()
{
  let now = Date.now()
  let elapsed = now - then
  if (!PAUSED) {
    if (elapsed >= 1000 / settings.fps_limit) {
      move(logo, area, elapsed)
      then = now
    }
  }
  window.requestAnimationFrame(draw)
}

// Entry point
window.requestAnimationFrame(draw)

window.addEventListener("resize", () => {
  location.reload()
})