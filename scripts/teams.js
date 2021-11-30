var pos = 0;

// Next controls
function plusSlides() {
  showSlides();
}

// Previous controls
function previousSlide() {
  document.querySelector(".team-carousel").style.transform = "translateY("+ -pos +"vh)"
}


function showSlides() {
  pos = pos - 100;
  document.querySelector(".team-carousel").style.transform = "translateY("+ pos +"vh)"
}