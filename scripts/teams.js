let position = 0;
const carousel = document.querySelector(".team-carousel");

// Previous controls
function previousSlide() {
  if(position !== 0) {
    position = position + 100;
    carousel.style.transform = "translateY(" + position + "vh)";
  }
}

// Next controls
function nextSlide() {
  if(position !== -1100) {
    position = position - 100;
    carousel.style.transform = "translateY(" + position + "vh)";
    
  } 
}