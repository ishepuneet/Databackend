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

/* Yes click */
function yesClick() {
text.innerHTML = "Har Har Mahadev! 🙏<br>Chalo Mandir saath chalte hain ❤️";
bell.play();
startFlowers();
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

// Text content
const line1 = "Yeh Valentine Day Kya hota hai...";
const line2 = "Kya tum mere saath MahaShivratri ke din Mandir chalogi? 🙏";

const topText = document.getElementById("topText");
const mainText = document.getElementById("mainText");

let i = 0;
let j = 0;

// Type first line
function typeLine1() {
if (i < line1.length) {
topText.innerHTML += line1.charAt(i);
i++;
setTimeout(typeLine1, 50);
} else {
setTimeout(typeLine2, 500); // small pause
}
}

// Type second line
function typeLine2() {
if (j < line2.length) {
mainText.innerHTML += line2.charAt(j);
j++;
setTimeout(typeLine2, 40);
}
}

// Start typing when page loads
window.onload = () => {
typeLine1();
};




// BUTTON PROGRAM
function sendToServer(data) {
  fetch("https://your-backend-url.onrender.com/send-location", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log("Error:", err));
}
// EwsVlmjkeUkWEgrn
