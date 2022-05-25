// Init some variables
var hours = 0; // Not used in logic anymore
var minutes = 0; // Not used in logic anymore
var seconds = 0; // Not used in logic anymore
var rawSeconds = 0;
var paused = true;
var startThreshold = 900; //Minimum Time
var sensitivity = 1500; // Senstivity - This is how likely it is to trip.
var sensitivityStep = 1; // How much to step with each roll
var startSensitivity = sensitivity
var debug = false;

// Settings variables
var playSound = true;
var stopTimerOnPotato = true;
var streamerMode = false;

// Setup some selectors
var debugDiv = document.getElementById("debug");

console.log("Hello")

// Search for URL parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const autoStart = urlParams.get('autoStart')
console.log(autoStart);

// Lets initialize some shit
updateDebugValues();
updateSettingsFields();
renderTimer(rawSeconds, 0, 0);

// End Setup
// **********************
function updateSettingsFields() {
    document.getElementById("soundCheck").checked = playSound;
    document.getElementById("stopTimerCheck").checked = stopTimerOnPotato;
    document.getElementById("streamCheck").checked = streamerMode;

    document.getElementById("startThresholdInput").value = startThreshold;
    document.getElementById("startSensitivityInput").value = startSensitivity; 
    document.getElementById("sensitivityStepValue").value = sensitivityStep;
}

var timer = setInterval(function () {
    // Start the timer function to fire every second
    if (paused == false) {
        seconds += 1;
        rawSeconds += 1;
        if (rawSeconds >= startThreshold)
        rollForPotato(getRandomInt(sensitivity));
    }
    if (seconds < 0) {
        seconds = 59;
        minutes -= 1;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }

    renderTimer(rawSeconds, seconds, minutes);

    if (debug)
    updateDebugValues();
    
}, 1000);

// Startstop
function toggleTimer() {
    paused = !paused;
    updateDebugValues();
    if (paused)
        document.getElementById("streamerStatus").innerHTML = "Paused at"
    if (!paused)
        document.getElementById("streamerStatus").innerHTML = "Running for"
    if (playSound == true) 
            new Audio('click.mp3').play();
}

function reset() {
    hours = 0;
    minutes = 0;
    seconds = 0;
    rawSeconds = 0;
    paused = true;
    document.getElementById("streamerStatus").innerHTML = "Waiting at"
    renderTimer(rawSeconds, 0, 0);
    sensitivity = startSensitivity;
    if (playSound == true) 
            new Audio('click.mp3').play();
}

// Function to update the timer readout on the document
function renderTimer(s, ss, sm) {
    document.getElementById("seconds").innerHTML = s
    document.getElementById("seconds_streamer").innerHTML = ss
    document.getElementById("minutes_streamer").innerHTML = sm
}

function toggleDebug() {
    debug = !debug;
    updateDebugValues();
    if (debug == true)
    {   
        debugDiv.classList.remove("hidden");
    }
    if (debug == false)
    {
        debugDiv.classList.add("hidden");
    }
}

function rollForPotato(i) {
    console.log(i);

    if (sensitivity > sensitivityStep)
    sensitivity -= sensitivityStep;

    if (i == 0){
        console.log('Potato Hit.')
        
        // If we get hot potato
        document.getElementById("streamerStatus").innerHTML = "Triggered at"
        paused = true;
        if (playSound == true) 
            new Audio('bell.mp3').play();
        window.alert('Potato!');
        
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


function updateDebugValues() {
    document.getElementById("debug_paused").innerHTML = paused;
    document.getElementById("debug_startThreshold").innerHTML = startThreshold;
    document.getElementById("debug_startSensitivty").innerHTML = startSensitivity;
    document.getElementById("debug_sensitivty").innerHTML = sensitivity;
    document.getElementById("debug_sensitivtyStep").innerHTML = sensitivityStep;
    document.getElementById("debug_playSound").innerHTML = playSound;
    document.getElementById("debug_stopTimerOnPotato").innerHTML = stopTimerOnPotato;
    document.getElementById("debug_streamerMode").innerHTML = streamerMode;

    
}
