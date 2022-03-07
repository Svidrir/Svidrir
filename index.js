
let scaleAmount = 0.5;

function scrollZoom() {
  const images = document.querySelectorAll("[data-scroll-zoom]");
  let scrollPosY = 0;
  scaleAmount = scaleAmount / 100;

  const observerConfig = {
    rootMargin: "0% 0% 0% 0%",
    threshold: 0
  };

  images.forEach(image => {
    let isVisible = false;
    const observer = new IntersectionObserver((elements, self) => {
      elements.forEach(element => {
        isVisible = element.isIntersecting;
      });
    }, observerConfig);

    observer.observe(image);

    // Set initial image scale on page load
    image.style.transform = `scale(${1 + scaleAmount * percentageSeen(image)})`;

    // Only fires if IntersectionObserver is intersecting
    window.addEventListener("scroll", () => {
      if (isVisible) {
        scrollPosY = window.pageYOffset;
        image.style.transform = `scale(${1 +
          scaleAmount * percentageSeen(image)})`;
      }
    });
  });

  function percentageSeen(element) {
    const parent = element.parentNode;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const elPosY = parent.getBoundingClientRect().top + scrollY;
    const borderHeight = parseFloat(getComputedStyle(parent).getPropertyValue('border-bottom-width')) + parseFloat(getComputedStyle(element).getPropertyValue('border-top-width'));
    const elHeight = parent.offsetHeight + borderHeight;

    if (elPosY > scrollY + viewportHeight) {
      
      return 0;
    } else if (elPosY + elHeight < scrollY) {
     
      return 100;
    } else {
      const distance = scrollY + viewportHeight - elPosY;
      let percentage = distance / ((viewportHeight + elHeight) / 100);
      percentage = Math.round(percentage);

      return percentage;
    }
  }
}

scrollZoom();

$('document').ready(function(){
  $('input[type="text"], input[type="email"], textarea').focus(function(){
    var background = $(this).attr('id');
    $('#' + background + '-form').addClass('formgroup-active');
    $('#' + background + '-form').removeClass('formgroup-error');
  });
  $('input[type="text"], input[type="email"], textarea').blur(function(){
    var background = $(this).attr('id');
    $('#' + background + '-form').removeClass('formgroup-active');
  });

function errorfield(field){
  $(field).addClass('formgroup-error');
  console.log(field); 
}

$("#waterform").submit(function() {
  var stopsubmit = false;

if($('#name').val() == "") {
  errorfield('#name-form');
  stopsubmit=true;
}
if($('#email').val() == "") {
  errorfield('#email-form');
  stopsubmit=true;
}
  if(stopsubmit) return false;
});
    
});s