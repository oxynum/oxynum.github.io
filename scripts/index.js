/**
 *  @description : les fonctions de ce fichier servent à controller les différentes animations de la page
 *  d'accueil.
 */


// Event sur le scrolling afin d'activer ou non l'animation des logos clients
const section = document.querySelector('.section-clients');

window.addEventListener("load", (event) => {
  if(logosIsVisible() == true){
    section.classList.add("js-show-logo");
  } else {
    window.addEventListener("scroll", (event) =>  {
      if(logosIsVisible() == true){
        section.classList.add("js-show-logo");
      } else {
        section.classList.remove("js-show-logo");
      }
    });
  }
})

function logosIsVisible() {
  const element = section.getBoundingClientRect();
  const elemTop = element.top;
  const elemBottom = element.bottom;
  let isVisible = elemTop < (window.innerHeight - 90) && elemBottom >= 0; 
  return isVisible;
}

// Ecoute de l'event pour l'affichage d'un média lié à chaque logo clients en fonction du viewport
const docWidth = document.documentElement.clientWidth;
const overlay = document.querySelector('.overlay');
const logoClient = document.querySelectorAll('.logo-client');

if(docWidth <= 1280) {
  for (var i = 0; i < logoClient.length; i++) {
    logoClient[i].addEventListener("click", (event) => {
      displayPresentationImage(event.target.id);
    })
  }
} else {
  for (var i = 0; i < logoClient.length; i++) {
    logoClient[i].addEventListener("mouseover", (event) => {
      displayPresentationVideo(event.target.id);
    })
  }
}

// function sur l'event click pour l'affichage d'une image liée au logo client (mobile/tablette)
function displayPresentationImage(element) {
  const image = document.querySelector('.overlay__image');

  overlay.style.display = "block";

  switch(element) {
    case 'imvitro':
      image.src="./images/mobile-image-clients/imvitro.jpg";
      break;
    case 'accor':
      image.src="./images/mobile-image-clients/accor.jpg";
      break;
    case 'novotel':
      image.src="./images/mobile-image-clients/novotel.jpg";
      break;
    case 'antonelle':
      image.src="./images/mobile-image-clients/antonelle.jpg";
      break;
    case 'clubmed':
      image.src="./images/mobile-image-clients/clubmed.jpg";
      break;
    case 'emmaus':
      image.src="./images/mobile-image-clients/emmaus.jpg";
      break;
    case 'ibismusic':
      image.src="./images/mobile-image-clients/ibis-music.jpg";
      break;
    case 'loreal':
      image.src="./images/mobile-image-clients/loreal.jpg";
      break;
    case 'maisondumonde':
      image.src="./images/mobile-image-clients/maisondumonde.jpeg";
      break;
    case 'marionnaud':
      image.src="./images/mobile-image-clients/marionnaud.jpg";
      break;
    case 'peugeot':
      image.src="./images/mobile-image-clients/peugeot.jpeg";
      break;
    case 'vitalliance':
      console.log('vitalliance');
      // TODO
      break;
  }
}

// function sur l'event mouseover pour l'affichage d'une vidéo liée au logo client (desktop)
function displayPresentationVideo(element) {
  const elSource = document.querySelector('#mp4Source');
  const video = document.querySelector('.video');
  document.querySelector('.section-agency__image').style.display = "none";
  document.querySelector('.section-agency__video').style.display = "block";

  setTimeout(() => {
    switch(element) {
      case 'imvitro':
        video.src="./images/videos-clients/all-live.mp4";
        break;
      case 'accor':
        video.src="./images/videos-clients/all-live.mp4";
        break;
      case 'novotel':
        video.src="./images/videos-clients/novotel.mp4";
        break;
      case 'antonelle':
        video.src="./images/videos-clients/antonelle.mp4";
        break;
      case 'clubmed':
        video.src="./images/videos-clients/clubmed.mp4";
        break;
      case 'emmaus':
        video.src="./images/videos-clients/emmausfrance.mp4";
        break;
      case 'ibismusic':
        video.src="./images/videos-clients/ibis-music.mp4";
        break;
      case 'loreal':
        video.src="./images/videos-clients/loreal.mp4";
        break;
      case 'maisondumonde':
        video.src="./images/videos-clients/maisondumonde.mp4";
        break;
      case 'marionnaud':
        video.src="./images/videos-clients/marionnaud.mp4";
        break;
      case 'peugeot':
        video.src="./images/videos-clients/peugeot.mp4";
        break;
      case 'vitalliance':
        video.src="./images/videos-clients/vitalliance.mp4";
        break;
    }
  }, 250);
}

// function de fermeture du overlay
function overlayOff() {
  overlay.style.display = "none";
}