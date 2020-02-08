//
// DRAWING THE STARS //
//
// Getting the canvas elements
const canvases = document.querySelectorAll('canvas')
// Function to draw stars
function drawStars() {
    for ( let i = 0; i < canvases.length; i++){
        pixelSize = i + 1
        canvases[i].width = window.innerWidth
        canvases[i].height = window.innerHeight
        const c = canvases[i].getContext('2d')
        for ( let j = 0; j < 100; j++){
            c.fillStyle = 'ghostwhite'
            c.fillRect(Math.random() * window.innerWidth, Math.random() * window.innerHeight, pixelSize, pixelSize)
        }
    }
}
drawStars()
//
// SHOWING THE PLANETS INFO TEXT-BOXES
//
// getting the planets and the info boxes as arrays
const infoBoxes = document.querySelectorAll('.info')
const planets = document.querySelectorAll('.orbit')
// initializing the array of objects
let planetsInfo = []
// pushing the planets and the info boxes as objects in the array of objects
for ( let i = 0; i < planets.length; i++) {
    planetsInfo.push({
        physicalPosition: planets[i],
        infoBox: infoBoxes[i]
    });
}
// console.log(planetsInfo)
// looping through the array of objects
for ( let i = 0; i < planetsInfo.length; i++) {
    // saving the i as a variable
    let index = i
    // adding a event to show the related info box on each planets on mouse enter
    planetsInfo[i].physicalPosition.addEventListener('mouseenter', function(event){
        // console.log('the planet the mouse entered :')
        // console.log(planetsInfo[index].infoBox)
        // console.log('the box to set to opacity 1 :')
        // console.log(planetsInfo[index].infoBox)
        planetsInfo[index].infoBox.style.opacity = '1'
    })
    // adding a event to hide the related info box on each planets on mouse leave
    planetsInfo[i].physicalPosition.addEventListener('mouseleave', function(event){
        planetsInfo[i].infoBox.style.opacity = '0'
    })
}
//
// MOVING THE ROCKET AROUND //
//
// Getting the rocket, the exhaust and the custom-cursor as a variable
const rocket = document.querySelector('.rocket')
const exhaust = document.querySelector('.exhaust-flame')
const customCursor = document.querySelector('.custom-cursor')
// Initializing the cursor coordinates off screen
let cursorX = -100
let cursorY = 480
// Initializing the rocket center coordinates off screen
let rocketCenterX = -100
let rocketCenterY = 480
// Initializing the coordinates of the distance variable
let dX = 0
let dY = 0
// Initializing the rotation angle
let angle = 0
// Initializing the variable to reduce the exhaust flame when the mouse isn't moving
let exhaustFlameHeight = 0
// Initilizing the delay variable to know when the mouse stops
let timeout
// Initializing the custom-cursor coordinates
let customCursorX = customCursor.getBoundingClientRect().x - customCursor.clientWidth / 2
let customCursorY = customCursor.getBoundingClientRect().y - customCursor.clientHeight / 2
// Waiting for mouse movement to update the variables
document.addEventListener('mousemove', function(event){
    // Rocket variables to update
        // Updating the cursor coordinates
        cursorX = event.clientX - rocket.clientWidth / 2
        cursorY = event.clientY - rocket.clientHeight / 2
        // Getting the rocket's center coordinates
        rocketCenterX = (rocket.getBoundingClientRect().x + rocket.clientWidth / 2)
        rocketCenterY = (rocket.getBoundingClientRect().y + rocket.clientHeight / 2)
        // Calculating the rotation angle
        angle = Math.atan2(cursorX - rocketCenterX, - (cursorY - rocketCenterY)) * 180/Math.PI
    // Exhaust flame variables to update
        // Calulating the height of the exhaust flame according to to distance between the cursor and the rocket center
        exhaustFlameHeight = (Math.sqrt(( cursorX - rocketCenterX ) * ( cursorX - rocketCenterX ) + ( cursorY - rocketCenterY ) * ( cursorY - rocketCenterY ))) / 6
        // if (isNaN(exhaustFlameHeight)) exhaustFlameHeight = 0
        // above line because i originaly typed a - instead of a + in the √ : the √ of a negative number would return NaN, and this line would fix the issue. Kept as a comment as a reminder if needed in a later project
        // Adjusting the height of the exhaust flame
        exhaust.style.height = exhaustFlameHeight +'px'
    // Custom cursor variables to update
        // Adjusting the custom-cursor  coordinates to the cursor ones
        customCursor.style.left = event.clientX - 2 +'px'
        customCursor.style.top = event.clientY - 2 + 'px'
        // Showing the custom cursor when the mouse moves
        customCursor.style.opacity = '1'
        // Initilizing a timer to check if the mouse has stopped
        if (timeout) {clearTimeout(timeout)}
        timeout = setTimeout(mouseStop, 500)
})
// Applying the movement and the rotation to the rocket at set intervals
setInterval(function(){
    dX += ((cursorX - dX) / 20)
    dY += ((cursorY - dY) / 20)
    rocket.style.transition = 'transform'
    rocket.style.transform = `translateX(${dX}px) translateY(${dY}px) rotate(${angle}deg)`
}, 25)
// Reducing the exhaust flame height when the mouse stops and hiding the custom cursor
function mouseStop() {
    customCursor.style.opacity = '0'
    exhaust.style.height = '1px'
    exhaust.animate([
        {height: exhaustFlameHeight + 'px' },
        {height : '1px'}],
        {duration : 500},
        {easing : 'ease-in-out'}
    )
}
//
// COLOR SWAP
//
// Getting the rocket elements to be repainted
const rocketBody =  document.querySelector('.rocket-body .body')
const rocketFins = document.querySelectorAll('.rocket-body .fin')
const rocketWindow = document.querySelector('.window')
// Getting the swap buttons
const swapSpans = document.querySelectorAll('.swap')
// Creating the objects
const colorSwappers = [
    { button : swapSpans[0], color : 'red', keyToPress : 'Digit1' } ,
    { button : swapSpans[1], color : 'yellow', keyToPress : 'Digit2' },
    { button : swapSpans[2], color : 'blue', keyToPress : 'Digit3' }
]
document.addEventListener('keydown', function(event){
    for ( let i = 0; i < colorSwappers.length; i++){
        let index = i
        if (event.code === colorSwappers[index].keyToPress){
            for (let j = 0; j <colorSwappers.length; j++){
                // console.log(colorSwappers[j].color + ' removed ')
                rocketBody.classList.remove(colorSwappers[j].color)
                rocketWindow.classList.remove(colorSwappers[j].color)
                for ( let k = 0; k < rocketFins.length; k++){
                    rocketFins[k].classList.remove(colorSwappers[j].color)
                }
            }
            rocketBody.classList.add(colorSwappers[index].color)
            rocketWindow.classList.add(colorSwappers[index].color)
            for ( let k = 0; k < rocketFins.length; k++){
                rocketFins[k].classList.add(colorSwappers[index].color)
            }
            // Annimating the key press
            for (let j = 0; j < colorSwappers.length; j++){
                colorSwappers[index].button.animate([
                    {transform: 'translateY(0)'},
                    {transform: 'translateY(2px)'}],
                    {duration: 100},
                    {easing: 'ease-in-out'}
                )
            }
        }
        
    }
})
//
// SUPERNOVA
//
// Getting the sune element and the paragraph where the timer will be displayed
const sun = document.querySelector('#sun')
const remainingTime = document.querySelector('.sun.info>p>span')
// Initializing the timer at 100
let sunTimer = 100
console.log('You can update the sun remaining life time using this console. Just enter a value for the variable sunTimer. It starts at 100 by default. Would you like to have more time to explore ? Or would you rather live dangeroulsy ?')
console.log('sunTimer = ' + sunTimer)
sun.addEventListener('mouseenter', function(event){
    // Running the update function
    sunStatus()
    // Displaying remaining time
    remainingTime.textContent = `${sunTimer}`
})
// Updating the sun status
function sunStatus(){
    // Decreasing the remaining time
    sunTimer--
    // Checking if the timer is at 0 and preventing it to go under 0
    if (sunTimer <= 0){
        sunTimer = 0
        // Adding the class to enable the keyframe
        sun.classList.add('explode')
        // Clearing the document of ressource hungry elements and telling the user what just happened
        setTimeout(function(){
            rocket.style.display ='none'
            for ( let i = 0; i < planets.length - 1; i++){
                planets[i].style.display = 'none'
            }
            sun.textContent = 'Guess the Sun just went supernova ...'
        }, 12000)
    }
}