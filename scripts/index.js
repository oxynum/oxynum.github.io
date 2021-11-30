const imgContainerCover = document.getElementById("image-cover");
const imgPresentation = document.getElementById("presentation-picture");

function displayPresentationImage(element) {

  switch(element) {
    case 'imvitro':
      //imgContainerCover.style.display = "none";
      //imgPresentation.style.display = "block";
      //imgContainerCover.src="./images/mobile-image-clients/imvitro.jpg";
      //console.log("hello");
      break;
    case 'accor':
      //console.log("coucou");
      break;
  }
  // if element === truc {}
  //utiliser le switch 
  //pointer l'élément img class="section-agency-image--mobile"
  //element.setAttribute('src', './images/mobile-image-clients/imvitro.jpg');
}

function displayPresentationVideo(element) {

  switch(element) {
    case 'imvitro':
      imgContainerCover.style.display = "none";
      break;
    case 'accor':
      //console.log("coucou");
      break;
  }

  //element.setAttribute('src', './images/videos-clients/all-live.mp4');
}

function displayNormalImg(element) {
  imgContainerCover.style.display = "block";
}