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
  if(position !== -1300) { //-1400
    position = position - 100;
    carousel.style.top = position + "vh"; 
  } 
}