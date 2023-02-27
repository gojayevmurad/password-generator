const passDisplay = document.querySelector("#password");
const passLength = document.querySelector(".pass--length__detail");
const passRange = document.querySelector(".pass--length input");
const passIndicator = document.querySelector(".pass--indicator");
const passChangers = document.querySelectorAll(".pass--change__group input");
const generateBtn = document.querySelector(".generate--btn");

const copyIcon = document.querySelector(".fa-clipboard");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!$%&|[](){}:;.,*+-#@<>~",
};

const generatePass = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false;
  staticPassword += characters.lowercase;
  passChangers.forEach((input) => {
    if (input.checked) {
      if (!(input.id == "space") && !(input.id == "exduplicate")) {
        staticPassword += characters[input.id];
      } else if (input.id == "exduplicate") {
        excludeDuplicate = true;
      } else {
        staticPassword += `  ${staticPassword}  `;
      }
    }
  });

  for (let i = 1; i <= +passRange.value; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];

    if (excludeDuplicate) {
      !randomPassword.includes(randomChar)
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passDisplay.value = randomPassword;
};

const updatePassIndicator = () => {
  passIndicator.id =
    passRange.value <= 8
      ? "danger"
      : passRange.value <= 16
      ? "warning"
      : "success";
};

const copyPass = () => {
  navigator.clipboard.writeText(passDisplay.value);
  copyIcon.classList.add("fa-clipboard-check");
  setTimeout(() => {
    copyIcon.classList.remove("fa-clipboard-check");
  }, 1000);
};

const updateSlider = () => {
  passLength.innerHTML = passRange.value;
  generatePass();
  updatePassIndicator();
};
updateSlider();

generateBtn.addEventListener("click", generatePass);
passRange.addEventListener("input", updateSlider);
copyIcon.addEventListener("click", copyPass);
