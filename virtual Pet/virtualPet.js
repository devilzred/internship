// Initialize pet states
let happiness = 10;
let hunger = 10;
let energy = 10;

// Function to set the pet's name and display the main container
function givePetName() {
    const petNameInput = document.getElementById('pet-name').value.trim();
    if (petNameInput) {
        document.getElementById('name').style.display = 'none';
        document.getElementById('main-container').style.display = 'flex';
        document.getElementById('title').innerText = petNameInput + "pet";
        startDecreasingScores();
    }
}

// Update the display states
function updateDisplayStates() {
    document.getElementById('happiness-state').innerText = happiness;
    document.getElementById('hunger-state').innerText = hunger;
    document.getElementById('energy-state').innerText = energy;
    updatePetImage();
}

// Function to update pet image based on states
function updatePetImage() {
    const petImage = document.getElementById('pet-image');
    if (hunger <= 3 || energy <= 3) {
        petImage.src = 'img/virtualpet_angry.png';
    } else if (happiness <= 3) {
        petImage.src = 'img/virtualpet_sad.png';
    } else if (energy >= 8) {
        petImage.src = 'img/virtualpet_bored.png';
    } else {
        petImage.src = 'img/virtualpet_happy.png';
    }
}

// Function to handle delayed image change
function temporaryImageChange(imageSrc, duration) {
    const petImage = document.getElementById('pet-image');
    const originalImage = petImage.src;
    petImage.src = imageSrc;
    setTimeout(() => {
        updatePetImage();
    }, duration);
}

// Event listeners for action buttons
document.getElementById('play-button').addEventListener('click', () => {
    if (energy > 0) {
        happiness += 2;
        hunger -= 1;
        energy -= 2;
        updateDisplayStates();
    }
});

document.getElementById('eat-button').addEventListener('click', () => {
    if (hunger < 10) {
        hunger += 2;
        energy += 1;
        updateDisplayStates();
        temporaryImageChange('img/virtualpet_eating.png', 5000);
    }
});

document.getElementById('sleep-button').addEventListener('click', () => {
    if (energy < 10) {
        energy += 3;
        happiness -= 1;
        updateDisplayStates();
        temporaryImageChange('img/virtualpet_sleep.png', 5000);
    }
});

document.getElementById('reset-button').addEventListener('click', () => {
    happiness = 10;
    hunger = 10;
    energy = 10;
    updateDisplayStates();
    document.getElementById('name').style.display = 'flex';
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('title').innerText = "My Virtual Pet";
    document.getElementById('pet-name').value = '';
    stopDecreasingScores();
});

// Function to decrease scores over time
let scoreInterval;

function startDecreasingScores() {
    scoreInterval = setInterval(() => {
        happiness = Math.max(0, happiness - 1);
        hunger = Math.max(0, hunger - 1);
        energy = Math.max(0, energy - 1);
        updateDisplayStates();
    }, 10000); // Decrease every 10 seconds
}

function stopDecreasingScores() {
    clearInterval(scoreInterval);
}

// Initial hide main container
document.getElementById('main-container').style.display = 'none';
updateDisplayStates();
