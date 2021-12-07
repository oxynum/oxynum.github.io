/**
 *  @description : les fonctions de ce fichier servent à controller le slider et les animations de la page
 *  team.
 */

let position = 0;
const carousel = document.querySelector(".team-carousel");

// Previous controls
function previousSlide() {
  if(position !== 0) {
    position = position + 100;
    carousel.style.top = position + "vh";
  }
}

// Next controls
function nextSlide() {
  if(position !== -1200) {
    position = position - 100;
    carousel.style.top = position + "vh";
    
  } 
}

// Event sur le loading de la page afin d'activer ou non l'animation d'apparition du text
// const section = document.querySelector('.team-carousel__slide__content');
// const slide = document.querySelectorAll('.team-carousel__slide');

// window.addEventListener("scroll", (event) => {
//   console.log(event);
//   for (let i = 0; i < slide.length; i++) {
//     if(slideIsVisible() == true){
//       section.classList.add("js-show-text");
//     } else {
//       section.classList.remove("js-show-text");
//     }
//   }
// })

// // détermine si la slide est visible à l'écran
// function slideIsVisible() {
//   const slideHeight = document.documentElement.clientHeight;
//   let isVisible = slideHeight === window.innerHeight; 
//   console.log(isVisible);
//   return isVisible;
// }