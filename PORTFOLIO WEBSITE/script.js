const cube = document.getElementById('cube');

// --- NEW: CHECK URL TO SET STARTING FACE ---
let faceIndex = 0; // Default to 0 (Logo)

const hash = window.location.hash;
if (hash === '#about') faceIndex = 1;
else if (hash === '#unit-1') faceIndex = 2; // Face 3
else if (hash === '#unit-2') faceIndex = 3; // Face 4
else if (hash === '#unit-3') faceIndex = 4; // Face 5
else if (hash === '#certification') faceIndex = 5; // Face 6

// Set both angles instantly so the cube doesn't have to animate from 0 on load
let targetAngle = faceIndex * 60;
let currentAngle = targetAngle; 
// ------------------------------------------

let isAnimating = false;

// 1. Desktop Mouse Wheel / Trackpad Listener
window.addEventListener('wheel', (event) => {
    if (isAnimating) return; 
    
    isAnimating = true;

    if (event.deltaY > 0) {
        faceIndex++; 
    } else if (event.deltaY < 0) {
        faceIndex--; 
    }

    targetAngle = faceIndex * 60;

    setTimeout(() => {
        isAnimating = false;
    }, 700); 
});

// 2. Mobile Touch / Swipe Listener
let touchStartY = 0;

window.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
});

window.addEventListener('touchend', (event) => {
    if (isAnimating) return;
    
    let touchEndY = event.changedTouches[0].clientY;
    let deltaY = touchStartY - touchEndY;
    
    if (Math.abs(deltaY) > 40) { 
        isAnimating = true;
        
        if (deltaY > 0) {
            faceIndex++; 
        } else {
            faceIndex--; 
        }
        
        targetAngle = faceIndex * 60;
        
        setTimeout(() => {
            isAnimating = false;
        }, 700);
    }
});

// 3. The Smooth Lerp Animation Loop
function animate() {
    currentAngle += (targetAngle - currentAngle) * 0.08; 
    
    // Instantly apply the initial target angle on load, then loop normally
    cube.style.transform = `translateZ(-86.6vh) rotateX(${currentAngle}deg)`;
    
    requestAnimationFrame(animate);
}

// Start loop
animate();