const $elems = $("[data-animation ^= 'animated']");
const $window = $(window);

function doAnimations(elem) {
  const $animationType = elem.data("animation");

  elem.addClass($animationType);
}

function isScrolledIntoView($elem, $window) {
  const docViewTop = $window.scrollTop();
  const docViewBottom = docViewTop + $window.height();

  const elemTop = $elem.offset().top + 50;
  const elemBottom = elemTop + $elem.height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function getVisibleElementsAndAnimate() {
  $elems.each(function () {
    if (isScrolledIntoView($(this), $window)) {
      doAnimations($(this));
    }
  });
}

function toggleNavbar() {
  const shouldToggle = $('nav').offset().top > $('section').offset().top + $('section').height();

  $('nav').toggleClass('scrolled', shouldToggle);

  if (shouldToggle) {
    $('[data-toggle="navbar-logo-white"]').addClass('d-none');
    $('[data-toggle="navbar-logo-black"]').removeClass('d-none');
  } else {
    $('[data-toggle="navbar-logo-white"]').removeClass('d-none');
    $('[data-toggle="navbar-logo-black"]').addClass('d-none');
  }
}

$(document).ready(function () {
  getVisibleElementsAndAnimate();
  toggleNavbar();
  
  $('.nav-link, .navbar-brand').click(function () {
    const sectionTo = $(this).attr('href');

    $('html, body').animate({
      scrollTop: $(sectionTo).offset().top - 50
    }, 700);
  });
});

$(document).on("resize scroll", function () {
  getVisibleElementsAndAnimate();
  toggleNavbar();
});
