const imagePath = './images/photos-teams/';

let imagesTeamList = [
  'pexels-photo-1181715.jpeg',
  'maxime.jpg',
  'thomas.jpg',
  'maddy.jpg',
  'hugo.jpg',
  'jessica.jpg',
  'jonathan.jpg',
  'pascal.jpg',
  'pierrick.jpg',
  'rudy.jpg',
  'sandrine.jpg',
  'pexels-photo-1181715.jpeg'
];

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("team-carousel__slide");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.backgroundImage = "url(" + imagePath + imagesTeamList[slideIndex-1] + ")", 
  slides[slideIndex-1].style.display = "block";
}