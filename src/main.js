// @ts-check

/**
 * Collision definition
 * @typedef {Object} Collision
 * @property {boolean} top
 * @property {boolean} bottom
 * @property {boolean} left
 * @property {boolean} right
 */ 

 /**
 * Speed definition
 * @typedef {Object} Speed
 * @property {number} x
 * @property {number} y
 */

 /** 
 * Dimensions definition
 * @typedef {Object} Dimensions
 * @property {number} height
 * @property {number} width
 */

 /**
  * Logo definition
  * @typedef {Object} Logo
  * @property {number} scale
  * @property {Dimensions} dimensions
  * @property {string} color
  */

 /**
 * Settings definition
 * @typedef {Object} Settings
 * @property {string} background
 * @property {Speed} speed
 * @property {Logo} logo
 * @property {Dimensions} area
 * @property {number} fps_limit
 * @property {Boolean} paused
 */

/** 
 * Settings object with default values
 * @type {Settings}
 */
const settings = {
  background: "#000000",
  speed: {
    x: 150,
    y: 120,
  },
  logo: {
    scale: 1.0,
    color: "#FFFFFF",
    dimensions: {
      height: 90,
      width: 180
    }
  },
  area: {
    height: window.innerHeight,
    width: window.innerWidth,
  },
  fps_limit: 0,
  paused: false
}

/** 
 * Used to calculate the time taken to render a frame
 * @type {number}
 */
let then

/** 
 * Number of times the element hit a corner
 * @type {number}
 */
let cornerHitCount

/**
 * Element bouncing inside the area
 * @type {HTMLElement | null}
 */
let element

/**
 * Area in which the element is bouncing
 * @type {HTMLElement | null}
 */
let area

/**
 * Move an element inside of an area at the speed given in the
 * settings object and in the given lapse of time
 * 
 * @param {HTMLElement} element - The element to move
 * @param {DOMRect} area - The area in which to move the element
 * @param {number} timeElapsed - The lapse of time
 */
function move(element, area, timeElapsed)
{
  const collision = checkCollision(element.getBoundingClientRect(), area)
  if (Object.values(collision).includes(true))
  {
    logCornerCheck(collision)
    forceInBounds(element, area, collision)
    changeDirection(collision)
  }
  updatePosition(element, timeElapsed)
}

/**
 * Log wether the element hit the side of the area or a corner
 * 
 * @param {Collision} collision - The collision object
 */
function logCornerCheck(collision)
{
  if (Object.values(collision).reduce((acc, val) => acc += val ? 1 : 0, 0) >= 2)
  {
    cornerHitCount += 1
    console.log(`%c [${new Date().toLocaleString()}] HIT THE CORNER! The total number of corner hit is ${cornerHitCount}`, 'color: #638ce6')
  }
  else
  {
    console.log("bonk")
  }
}

/**
 * Check on all sides if the element is touching or outside of a given area
 * 
 * @param {DOMRect} element - The bounding rect of the element
 * @param {DOMRect} area - The bounding rect of the area
 * @returns {Collision} The collision object 
 */
function checkCollision(element, area)
{
  return { 
    top:    element.y <= area.top,
    bottom: element.y >= area.height - element.height,
    left:   element.x <= area.left,
    right:  element.x >= area.width - element.width,
  }
}

/**
 * Change the x and y speed in the settings object if
 * there is a collision
 * 
 * @param {Collision} collision - The collision object
 */
function changeDirection(collision)
{
  settings.speed.y *= collision.top || collision.bottom ? -1 : 1
  settings.speed.x *= collision.left || collision.right ? -1 : 1
}

/**
 * Update the position of an element at the speed defined in 
 * the settings object for a given lapse of time
 * 
 * @param {HTMLElement} element - The element
 * @param {number} timeElapsed - The lapse of time
 */
function updatePosition(element, timeElapsed)
{
  let { x, y } = element.getBoundingClientRect()
  x += timeElapsed / 1000 * settings.speed.x
  y += timeElapsed / 1000 * settings.speed.y
  element.style.left = x.toString()
  element.style.top = y.toString()
}

/**
 * Move an element inside of an area of it is outside of it
 * 
 * @param {HTMLElement} element - The element to move
 * @param {DOMRect} area - The area in which to move the element
 * @param {Collision} collision - The collision object indicating the out-of-bounds sides
 */
function forceInBounds(element, area, collision)
{
  const targetBoundingRect = element.getBoundingClientRect()
  if (collision.top) {
    element.style.top = (area.top + 1).toString()
  }
  if (collision.bottom) {
    element.style.top = (area.bottom - targetBoundingRect.height - 1).toString()
  }
  if (collision.left) {
    element.style.left = (area.left + 1).toString()
  }
  if (collision.right) {
    element.style.left = (area.right - targetBoundingRect.width - 1).toString()
  }
}

function draw()
{
  let now = Date.now()
  let elapsed = now - then
  
  if (settings.paused) {
    then = now
  } else if ((settings.fps_limit === 0 || elapsed >= 1000 / settings.fps_limit) && element && area) {
    move(element, area.getBoundingClientRect(), elapsed)
    then = now
  }
  
  window.requestAnimationFrame(draw)
}

function init()
{
  cornerHitCount = 0
  then = Date.now()

  element = document.querySelector(".logo")
  if (!element) {
    throw new ReferenceError('Logo is required but no element with class "logo" was found')
  }
  element.style.height = settings.logo.dimensions.height.toString()
  element.style.width = settings.logo.dimensions.width.toString()

  area = document.querySelector(".area")
  if (!area) {
    throw new ReferenceError('Area is required but no element with class "area" was found')
  }
  area.style.width = settings.area.width.toString()
  area.style.height = settings.area.height.toString()
}

try {
  init()
  window.requestAnimationFrame(draw)
} catch (error) {
  console.error("Error during initialization", error)
}

window.addEventListener("resize", () => {
  if (area) {
    settings.area.width = window.innerWidth
    settings.area.height = window.innerHeight
    area.style.width = settings.area.width.toString()
    area.style.height = settings.area.height.toString()
  }
})