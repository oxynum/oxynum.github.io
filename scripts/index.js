
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
