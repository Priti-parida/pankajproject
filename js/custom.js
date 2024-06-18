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
$(".slider_wrapper_small").slick({
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: !0,
  autoplaySpeed: 5e3,
  dots: true,
  arrows: false,
  infinite: !0,
  easing: "linear",
  focusOnSelect: !0,
  pauseOnHover: !1,

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

// Select all elements with the class 'back'
document.addEventListener('DOMContentLoaded', function() {
  // Find all 'back' links within elements with class 'menu_head'
  const backLinks = document.querySelectorAll('.menu_head .back ');

  // Attach click event listener to each 'back' link
  backLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default anchor behavior

      // Find the parent ul element with class 'over_level2'
      const parentUl = link.closest('.over_level2');

      // Remove 'open' class from the parent ul if it exists
      if (parentUl) {
        parentUl.classList.remove('open');
      }
    });
  });
});



document.addEventListener('DOMContentLoaded', function() {
  let modal = document.querySelector('.leadership_modal');
  let close = document.querySelector('.leadership_modal_close');
  const cardLinks = document.querySelectorAll('.card_view_linking');

  cardLinks.forEach(function(cardLink) {
      cardLink.addEventListener('click', function() {
          modal.classList.remove('d-none');

          // Retrieve content from the clicked card
          let getName = cardLink.parentElement.querySelector('.card_view_content h3').textContent.trim();
          console.log('getName', getName)
          let getPosition = cardLink.parentElement.querySelector('.card_view_content p').textContent.trim();
          let getDescription =  cardLink.parentElement.querySelector('.card_view_content .desc').textContent.trim();;

          // Update modal content
          let ownerName = document.querySelector('.leadership_modal .leadership_modal_content_head h2');
          let ownerPosition = document.querySelector('.leadership_modal .leadership_modal_content_head p');
          let ownerDescription = document.querySelector('.leadership_modal .leadership_modal_content_description');

          ownerName.textContent = getName;
          ownerPosition.textContent = getPosition;
          ownerDescription.textContent = getDescription;

          console.log('Modal content updated:', getName, getPosition, getDescription);
          console.log('Modal content updated:', ownerName, ownerPosition, getDescription);
      });
  });

  close.addEventListener('click', function() {
      modal.classList.add('d-none');
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

   