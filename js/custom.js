$(".strength-scratch-slider").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: !0,
  autoplaySpeed: 5e3,
  dots: !1,
  arrows: !0,
  infinite: !0,
  easing: "linear",
  focusOnSelect: !0,
  pauseOnHover: !1,
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: !0,
      dots: !1
    }
  }, {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: !0
    }
  }]
});
// sidebar menu js
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerIcon = document.querySelector('.humberger_icon');
  const overMenuClose = document.querySelector('.over_menu_close');
  const body = document.querySelector('body');

  // Add event listener for hamburger icon click
  hamburgerIcon.addEventListener('click', function() {
    body.classList.add('overmenuopen');
    overMenuClose.classList.add('open');
  });

  // Add event listener for close icon click
  overMenuClose.addEventListener('click', function() {
    body.classList.remove('overmenuopen');
    overMenuClose.classList.remove('open');
  });
});

  // Get all list items
  const listItems = document.querySelectorAll('.over_level1 li');
  const overLevel2 = document.querySelectorAll('.over_level2');
  listItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      listItems.forEach(li => li.classList.remove('active'));
      overLevel2.forEach(div => div.classList.remove('open'));
      item.classList.add('active');
      const menuGet = item.querySelector('.over_level2')
      menuGet.classList.add('open');
    });
  });

// video modal

document.addEventListener("DOMContentLoaded", function() {
  var videoIcon = document.querySelector('.video_icon');
  var modal = document.querySelector('.cus_modal');
  var modalClose = document.querySelector('.cus_modal_close');
  videoIcon.addEventListener('click', function() {
      modal.classList.add('open');
  });
  modalClose.addEventListener('click', function() {
      modal.classList.remove('open');
  });
  modal.addEventListener('click', function(event) {
      if (event.target === modal) {
          modal.classList.remove('open');
      }
  });
});

   