
// const images = Array.from(document.querySelectorAll(".card img"));
// const lightBoxImg = document.querySelector(".lightBox img");
// const light_container = document.querySelector(".light-container");
// const nextBtn = document.querySelector("#nextBtn");
// const prevBtn = document.querySelector("#prevBtn");
// let currentImg = "";
// let indexOfImage = 0;
// let currentSrc = "";
// images.forEach(img => {
//   img.addEventListener("click", (e) => {
//     light_container.classList.replace("d-none", "d-block")
//     currentImg = e.target.src;
//     indexOfImage = images.indexOf(e.target);
//     dd()
//   })
// });

// function dd() {
//   lightBoxImg.setAttribute("src", currentImg)

//   const closeBtn = document.querySelector(".x");
//   closeBtn.addEventListener("click", () => {
//     light_container.classList.add("d-none")
//   })
// }

// nextBtn.addEventListener('click', (e) => {
//   indexOfImage++;
//   if (indexOfImage == images.length) {
//     indexOfImage = 0;
//   }
//   let currentSrc = images[indexOfImage].src;
//   lightBoxImg.setAttribute("src", currentSrc)
// })

// prevBtn.addEventListener('click', (e) => {
//   indexOfImage--;
//   if (indexOfImage < 0) {
//     indexOfImage = 8;
//   }
//    currentSrc = images[indexOfImage].src;
//   lightBoxImg.setAttribute("src", currentSrc)
  
// })

// document.addEventListener("click", function (e) {
//   if (e.target.classList.contains("light-container")) {
//     light_container.classList.add("d-none")
//   }
// });

// document.addEventListener("keydown", function (e) {
//   if (e.key == "Escape") {
//     light_container.classList.add("d-none")
//   }
// });


const images = Array.from(document.querySelectorAll(".card img"));
const lightBoxImg = document.querySelector(".lightBox img");
const lightContainer = document.querySelector(".light-container");
const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");
const closeBtn = document.querySelector(".x");

let indexOfImage = 0;
let startX = 0;
let isDragging = false;

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    showLightbox(index);
  });
});

function showLightbox(index) {
  indexOfImage = index;
  lightContainer.classList.replace("d-none", "d-block");
  updateLightboxImage();
}

function updateLightboxImage() {
  const currentSrc = images[indexOfImage].src;
  lightBoxImg.setAttribute("src", currentSrc);
}

closeBtn.addEventListener("click", () => {
  lightContainer.classList.add("d-none");
});

nextBtn.addEventListener('click', () => {
  indexOfImage = (indexOfImage + 1) % images.length;
  updateLightboxImage();
});

prevBtn.addEventListener('click', () => {
  indexOfImage = (indexOfImage - 1 + images.length) % images.length;
  updateLightboxImage();
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("light-container")) {
    lightContainer.classList.add("d-none");
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    lightContainer.classList.add("d-none");
  } else if (e.key === "ArrowRight") {
    indexOfImage = (indexOfImage + 1) % images.length;
    updateLightboxImage();
  } else if (e.key === "ArrowLeft") {
    indexOfImage = (indexOfImage - 1 + images.length) % images.length;
    updateLightboxImage();
  }
});

lightBoxImg.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
});

lightBoxImg.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const offsetX = e.clientX - startX;
    if (offsetX > 50) {
      indexOfImage = (indexOfImage - 1 + images.length) % images.length;
      updateLightboxImage();
      isDragging = false;
    } else if (offsetX < -50) {
      indexOfImage = (indexOfImage + 1) % images.length;
      updateLightboxImage();
      isDragging = false;
    }
  }
});

lightBoxImg.addEventListener('mouseup', () => {
  isDragging = false;
});

lightBoxImg.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});

lightBoxImg.addEventListener('touchmove', (e) => {
  if (isDragging) {
    const offsetX = e.touches[0].clientX - startX;
    if (offsetX > 50) {
      indexOfImage = (indexOfImage - 1 + images.length) % images.length;
      updateLightboxImage();
      isDragging = false;
    } else if (offsetX < -50) {
      indexOfImage = (indexOfImage + 1) % images.length;
      updateLightboxImage();
      isDragging = false;
    }
  }
});

lightBoxImg.addEventListener('touchend', () => {
  isDragging = false;
});
