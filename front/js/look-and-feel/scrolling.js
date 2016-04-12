import $ from 'jquery';

export function keepContentInTheRightPlaces() {
  const top = $(window).scrollTop(),
    scrolledDown = top > 0;

  if (scrolledDown) {
    $('.fixed-top').addClass('is-glued-to-top');
    $('.main-content').css('top', $('.fixed-top').height());
  } else {
    $('.fixed-top').removeClass('is-glued-to-top');
    $('.main-content').css('top', 0);
  }
}
