class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihhat-sound");
    this.index = 0;
    this.bpm = 150;
    this.plybutton = document.querySelector(".play-button");
    this.isPlaying = null;
    this.selected = document.querySelectorAll("select");
    this.muteBtn = document.querySelectorAll(".mute-button");
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.p${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickSound.currentTime = 0;
          this.kickSound.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareSound.currentTime = 0;
          this.snareSound.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatSound.currentTime = 0;
          this.hihatSound.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateButton() {
    if (!this.isPlaying) {
      this.plybutton.innerText = "Stop";
      this.plybutton.classList.add("active-button");
    } else {
      this.plybutton.innerText = "Play";
      this.plybutton.classList.remove("active-button");
    }
  }

  soundSelect(e) {
    switch (e.target.name) {
      case "kick-select":
        this.kickSound.src = e.target.value;
        break;

      case "snare-select":
        this.kickSound.src = e.target.value;
        break;
      case "hihat-select":
        this.kickSound.src = e.target.value;
        break;
    }
  }

  mutingIt(e) {
    const which = e.target.getAttribute("data-track");
    e.target.classList.toggle("wow");
    if (e.target.classList.contains("wow")) {
      switch (which) {
        case "0":
          this.kickSound.volume = 0;
      }
      switch (which) {
        case "1":
          this.snareSound.volume = 0;
      }
      switch (which) {
        case "2":
          this.hihatSound.volume = 0;
      }
    } else {
      switch (which) {
        case "0":
          this.kickSound.volume = 1;
      }
      switch (which) {
        case "1":
          this.snareSound.volume = 1;
      }
      switch (which) {
        case "2":
          this.hihatSound.volume = 1;
      }
    }
  }
}

const drumKit = new Drumkit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.plybutton.addEventListener("click", function () {
  drumKit.updateButton();
  drumKit.start();
});

drumKit.selected.forEach((selec) => {
  selec.addEventListener("change", function (e) {
    drumKit.soundSelect(e);
  });
});

drumKit.muteBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mutingIt(e);
  });
});
