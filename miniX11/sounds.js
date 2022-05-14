let valCheck;
let soundIsPlaying = false;
let eraArray = [false, false, false, false, false, false, false, false];
// EraArray is used to store whether a sound is played or not
// The placement in the array correspond to different eras.

function soundCheck(sound) {
  valCheck = sound.isPlaying()
  if (valCheck) {
    return true
  }
}

function playSound(target, sound, arraynum) {
  if (stateTracker === target && !isRotating && !soundCheck(sound) && !eraArray[arraynum]) {
    sound.play();
    soundIsPlaying = !soundIsPlaying;
    setTimeout(soundFlip, sound.duration()*1000);
    eraArray[arraynum] = true;
  }
}

function soundFlip() {
  soundIsPlaying = !soundIsPlaying;
}
