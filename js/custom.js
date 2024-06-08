window.fullpage = true;

var defaultImage = "";
$(document).ready(function () {
    defaultImage = $("#hfDefaultImage").val();
    //console.log(defaultImage);
    $('#fullpage').fullpage({
        anchors: ['spotlight', 'sustainabilty', 'production-sector', 'investors', 'media', 'stats'],
        sectionsColor: ['#000', '#000', '#000', '#000', '#f1f5f8', '#1d1d1d'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Spotlight', 'Sustainability', 'Product & Solutions', 'Investors', 'Media', 'Stats'],
        //autoScrolling: false
        onLeave: function (index, nextIndex, direction) {
            console.log(nextIndex);
            if (nextIndex != 1) {
                $('header').addClass('smallhead');
            } else {
                $('header').removeClass('smallhead');
            }

            if (nextIndex == 5) {
                $('body').addClass('blueheader');
            } else {
                $('body').removeClass('blueheader');
            }

            $('.section').eq(index - 1).find('.animated').removeClass('go');
            $('#sustain_gallery .items').removeClass('active-slide');

            $('.section').eq(nextIndex - 1).find('.animated').addClass('go');
            $('#sustain_gallery .items:first-child').addClass('active-slide');
        },
        afterLoad: function (anchorLink, index) {

        }
    });
    //




    var slider = $('.bxslider').bxSlider({
        mode: 'fade',
        controls: false,
        auto: false,
        pause: 10000,
        pagerCustom: '#bx-pager'
    });
    var captionTimeout;
    $("#bx-pager li").hover(function () {
        clearTimeout(captionTimeout);
        $('.banner .bx-wrapper').css({ 'opacity': 1 });
        $('.banner_caption').hide();
        var newSlideNo = $($(this).find("a")[0]).attr('data-slide-index');
        if (newSlideNo != slider.getCurrentSlide()) {
            slider.goToSlide(newSlideNo);
        }
    }
        , function () {
            $('.banner .bx-wrapper').css({ 'opacity': 0 });
            captionTimeout = setTimeout(function () {
                $('.banner_caption').fadeIn();
            }, 1000);
        });


    if (!('ontouchstart' in window)) {
        $('#bx-pager li a').click(function () {
            var href = $(this).attr('href');
            //window.location = href;
            window.open(href, "_blank");
        });
    }
    else {
        $('.banner .bx-wrapper').css({ 'opacity': 1 });
        $('.banner_caption').hide();
    }
    //
    $('#sustain_gallery').bxSlider({
        mode: 'fade',
        controls: true,
        pager: true,
        auto: false,
        infiniteLoop: false,
        hideControlOnEnd: true,
        onSliderLoad: function (currentIndex) {
            $('#sustain_gallery .items').children().eq(currentIndex + 1).addClass('active-slide');
        },
        onSlideAfter: function ($slideElement) {
            $('#sustain_gallery .items').removeClass('active-slide');
            $slideElement.addClass('active-slide');
        }
    });
    $('#prod_gallery').bxSlider({
        mode: 'fade',
        controls: false,
        pager: true,
        infiniteLoop: false,
        hideControlOnEnd: true,
        auto: false
    });
    $('#investor_gallery').bxSlider({
        slideWidth: 314,
        minSlides: 1,
        maxSlides: 3,
        infiniteLoop: false,
        hideControlOnEnd: true,
        moveSlides: 1,
        controls: false
    });
    $('#media_gallery').bxSlider({
        slideWidth: 330,
        minSlides: 1,
        maxSlides: 3,
        slideMargin: 20,
        infiniteLoop: false,
        hideControlOnEnd: true,
        moveSlides: 1,
        controls: true
    });
    $(".filter_link li:nth-child(1)").hide();
});

var marketData = [];
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/umbraco/surface/Market/RetrunListOfProducts",
        dataType: "json",
        success: function (reponse) {
            //console.log(reponse);
            marketData = reponse.data;
            if (marketData[0].MarketDetails[1].Value > marketData[0].MarketDetails[2].Value) {
                document.getElementById("bsestock").innerHTML = '<strong>BSE: <span>' + marketData[0].MarketDetails[1].Value + '</span></strong>' + marketData[0].MarketDetails[0].Time + ' IST &nbsp;&nbsp; ' + marketData[0].MarketDetails[3].Value + ' &nbsp;&nbsp; ' + marketData[0].MarketDetails[4].Value + '<span class="market_updown"><img src="/images/market_up.png" width="26" height="17" alt=""></span>'
            }
            else {
                document.getElementById("bsestock").innerHTML = '<strong>BSE: <span>' + marketData[0].MarketDetails[1].Value + '</span></strong>' + marketData[0].MarketDetails[0].Time + ' IST &nbsp;&nbsp; ' + marketData[0].MarketDetails[3].Value + ' &nbsp;&nbsp; ' + marketData[0].MarketDetails[4].Value + '<span class="market_updown"><img src="/images/market_down.png" width="26" height="17" alt=""></span>'
            }

            if (marketData[1].MarketDetails[1].Value > marketData[1].MarketDetails[2].Value) {
                document.getElementById("nsestock").innerHTML = '<strong>NSE: <span>' + marketData[1].MarketDetails[1].Value + '</span></strong>' + marketData[1].MarketDetails[0].Time + ' IST &nbsp;&nbsp; ' + marketData[1].MarketDetails[3].Value + ' &nbsp;&nbsp; ' + marketData[1].MarketDetails[4].Value + '<span class="market_updown"><img src="/images/market_up.png" width="26" height="17" alt=""></span>'
            }
            else {
                document.getElementById("nsestock").innerHTML = '<strong>NSE: <span>' + marketData[1].MarketDetails[1].Value + '</span></strong>' + marketData[1].MarketDetails[0].Time + ' IST &nbsp;&nbsp; ' + marketData[1].MarketDetails[3].Value + ' &nbsp;&nbsp; ' + marketData[1].MarketDetails[4].Value + '<span class="market_updown"><img src="/images/market_down.png" width="26" height="17" alt=""></span>'
            }

            document.getElementById("lastupdate").innerHTML = "Latest updated on " + marketData[0].MarketDetails[0].Date;
        },
    });
    $('.bxSliderWrapper').bxSlider({
        infiniteLoop: false
    });

    //  $('#fp-nav li:last').remove();
});
document.addEventListener("DOMContentLoaded", function () {
    var whoAreWe = document.getElementById("who_are_we");
    var whoAreWeLink = whoAreWe.querySelector("a");
    var overLevel4 = whoAreWe.querySelector(".over_level4");

    whoAreWeLink.addEventListener("click", function (event) {
        event.preventDefault();
        whoAreWe.classList.toggle("active");
        overLevel4.classList.toggle("open");
    });
});
var galleryThumbs = new Swiper('.gallery-thumbs', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: '2',

    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 50,
        modifier: 6,
        slideShadows: false,
    },

});


var galleryTop = new Swiper('.swiper-container.testimonial', {
    speed: 400,
    spaceBetween: 50,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    direction: 'vertical',
    pagination: {
        clickable: true,
        el: '.swiper-pagination',
        type: 'bullets',
    },
    thumbs: {
        swiper: galleryThumbs
    }
});