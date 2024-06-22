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

document.addEventListener('DOMContentLoaded', function() {
  const listItems = document.querySelectorAll('.over_level1 > li');
  const overLevel2 = document.querySelectorAll('.over_level2');

  // Click event handling for list items
  listItems.forEach((item) => {
    item.addEventListener('click', () => {
      listItems.forEach(li => li.classList.remove('active'));
      overLevel2.forEach(div => div.classList.remove('open'));
      
      item.classList.add('active');
      const submenu = item.querySelector('.over_level2');
      if (submenu) {
        submenu.classList.add('open');
      }
    });
  });

  // Click event handling for back links
  const backLinks = document.querySelectorAll('.menu_head .back');
  backLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.stopPropagation();
      const parentUl = this.closest('.over_level2');
      if (parentUl) {
        parentUl.classList.remove('open');
      }
    });
  });
});



document.addEventListener('DOMContentLoaded', function () {
  const modal = document.querySelector('.leadership_modal');
  const modalClose = document.querySelector('.leadership_modal_close');
  const modalImage = modal.querySelector('.leadership_modal_image img');
  const modalName = modal.querySelector('.leadership_modal_content_head h2');
  const modalTitle = modal.querySelector('.leadership_modal_content_head p');
  const modalDesc = modal.querySelector('.leadership_modal_content_description');

  document.querySelectorAll('.card_view_linking').forEach(function (link) {
      link.addEventListener('click', function () {
          const card = this.closest('.card_view');
          const name = card.getAttribute('data-name');
          const title = card.getAttribute('data-title');
          const desc = card.getAttribute('data-desc');
          const img = card.getAttribute('data-img');

          modalImage.src = img;
          modalName.textContent = name;
          modalTitle.textContent = title;
          modalDesc.innerHTML = desc;

          modal.classList.remove('d-none');
      });
  });

  modalClose.addEventListener('click', function () {
      modal.classList.add('d-none');
  });

  modal.addEventListener('click', function (e) {
      if (e.target === modal) {
          modal.classList.remove('active');
      }
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

//media modal
let getMediaCard = Array.from(document.getElementsByClassName('card_view_wrapper'));
let media_modal = document.querySelector('.media_modal');
let modal_img = document.querySelector('.media_modal .cus_modal_wrap img');
let media_close = document.querySelector('.media_close')
console.log(modal_img)
let getBody = document.querySelector('body');
getMediaCard.forEach((media )=> {
  media.addEventListener('click',(e)=>{
    console.log(e.target.currentSrc)
    e.preventDefault();
    media_modal.classList.add('d-block')
    getBody.classList.add('overflow-hidden')
    modal_img.src = e.target.currentSrc
     

  })
})
media_close.addEventListener('click',()=>{
  media_modal.classList.remove('d-block')
  getBody.classList.remove('overflow-hidden')
})
   