jQuery(document).ready(function($) {
        

	var facebookFeeds = [],
		twitterFeeds = [],
		youtubeFeeds = [],
		pressReleaseFeeds = [],
		inNewsFeeds = [],
		socialMediaFeeds = [],
		prSocialNewsFeeds = [],
		allMediaFeeds = [];


	function addMediaTypeToFeeds(feed, type) {
		$.each(feed, function(index, value) {
			value.type = type;
		});
	}


	function mergePrSocialNewsFeeds (feeds) {
		var result = [];

		function mergeArray(feed, pos, type) {
			var indx = feedCt = 0;
			$.each(feed, function(index, value) {
				if ( (indx % (pos.length) == 0 && indx !== 0) ) {
					indx = 0; feedCt++;
				}

				result[pos[indx] + (10 * feedCt)] = feed[index];

				indx++;
			});
		}

		mergeArray(feeds.facebook, [0, 3, 5, 9], 'facebook');
		mergeArray(feeds.youtube, [1, 4, 7], 'youtube');
		mergeArray(feeds.twitter, [2, 6, 8], 'twitter');

		return result;
	};

	function mergeAllMediaFeeds (feeds) {

		var result = [];

		function mergeMediaArray(feed, pos, type) {;
			alert('feed');
			var indx = feedCt = 0;
			$.each(feed, function(index, value) {
				if ( (indx % (pos.length) == 0 && indx !== 0) ) {
					indx = 0; feedCt++;
				}

				result[pos[indx] + (10 * feedCt)] = feed[index];

				indx++;
				
			});
		}

	////	mergeMediaArray(feeds.facebook, [3, 6], 'facebook');
	//	mergeMediaArray(feeds.youtube, [1, 7], 'youtube');
	//	mergeMediaArray(feeds.twitter, [2, 8], 'twitter');
		mergeMediaArray(feeds.pr, [0, 2], 'press-release');
		mergeMediaArray(feeds.news, [1, 3], 'in-the-news');
//alert(result);
		return result;

	};

	function displayBlockItem(data, type) {
		var result = '';
		if ( type == 'item-h' ) {
			result = '<div class="media_img_bx">'+
						'<a href="javascript:;"><img src="'+ (data.image ? data.image : "https://www.tatasteel.com/images/feeds-backup-img.jpg" ) +'" width="330" height="211" alt="" class="img-responsive"></a>'+
					'</div>'+
					'<div class="media_txt_bx">'+
						'<span class="social_icon"></span>'+
						'<p>'+ data.text +'</p>'+
						'<span class="upload_time">'+ data.time +'</span>'+
					'</div>';
		} else if ( type == 'item' ) {
			if ( data.type == 'youtube' ) {
				result = '<div class="media_img_bx">'+
							'<a href="javascript:;">'+
								'<img width="330" height="211" class="img-responsive" alt="" src="https://i.ytimg.com/vi/'+ data.id +'/hqdefault.jpg">'+
								'<span class="caption">'+ data.text +'</span>'+
								'<span class="social_icon"></span>' +
							'</a>'+
						'</div>';
			} else {
				result = '<div class="media_txt_bx">'+
						'<span class="social_icon"></span>'+
						'<p>'+ data.text +'</p>'+
						'<span class="upload_time">'+ data.time +'</span>'+
					'</div>';
			}

		} else if ( type == 'item-v' ) {
			result = '<div class="media_img_bx">'+
						'<a href="javascript:;"><img src="'+ (data.image ? data.image : "https://www.tatasteel.com/images/feeds-backup-img.jpg" ) +'" width="330" height="211" alt="" class="img-responsive"></a>'+
					'</div>'+
					'<div class="media_txt_bx">'+
						'<span class="social_icon"></span>'+
						'<p>'+ data.text +'</p>'+
						'<span class="upload_time">'+ data.time +'</span>'+
					'</div>';
		} 

		return result;
	}

	function loadMediaGallery(type) {
//	alert(type);
//	alert("hi");
		var feedHtml = '',
			feedCount = 0,
		//	mediaFeedsArray = (type == 'all-updates') ? allMediaFeeds : prSocialNewsFeeds[type];
//mediaFeedsArray = (type == 'all-updates');

//alert(mediaFeedsArray);


mediaFeedsArray = inNewsFeeds;
 if ( type == 'press-release' )
{
    mediaFeedsArray = pressReleaseFeeds;
} 
 if ( type == 'all-updates' )
{
            addMediaTypeToFeeds(pressReleaseFeeds, 'press-release');
			addMediaTypeToFeeds(inNewsFeeds, 'in-the-news');
			
			prSocialNewsFeeds = { 'press-release': pressReleaseFeeds, 'in-the-news': inNewsFeeds };

			mediaFeedsArray = mergeAllMediaFeeds({ pr: pressReleaseFeeds, news: inNewsFeeds });
			//alert(allMediaFeeds);
           

} 



  
var pressReleaseData = $('#pressReleaseData').val();
//alert(pressReleaseData);

		pressReleaseData = pressReleaseData.substring(0, pressReleaseData.length-3);
		pressReleaseData = pressReleaseData.split('|||');

		$.each(pressReleaseData, function(index, value) {
			pressReleaseFeeds.push({
				text: value.split('}')[0],
				image: value.split('}')[1],
				url: value.split('}')[2] != undefined ? value.split('}')[2] : '',
				time: value.split('}')[3] != undefined ? value.split('}')[3] : ''
			});
		
		
		});




	var inTheNewsData = $('#inTheNewsData').val();
		inTheNewsData = inTheNewsData.substring(0, inTheNewsData.length-3);
		inTheNewsData = inTheNewsData.split('|||');

		$.each(inTheNewsData, function(index, value) {
			inNewsFeeds.push({
				text: value.split('}')[0],
				image: value.split('}')[1],
				url: value.split('}')[2] != undefined ? value.split('}')[2] : '',
				time: value.split('}')[4] != undefined ? value.split('}')[4] : ''
			});
		});
//alert(pressReleaseFeeds);

		$.each(mediaFeedsArray, function(index, value) {
//console.log(pressReleaseData);
//alert(pressReleaseData);

			if ( index % 10 == 0 && index != 0 ) {
				feedCount += 10;
			}

			if ( index == 0 + feedCount || index == 5 + feedCount ) {
				feedHtml += '<div class="items width-2 item-horizontal '+ value.type +'" style="width: 560px;height: 225px;margin-right: 10px;" onclick="window.open('+ "'"+ value.url +"', '_blank' " +'); return false;"><div class="media_cont_bx animated slow flipInY go" style="height: 100%">'+ displayBlockItem(value, 'item-h') +'</div></div>';
			} else if ( index == 1 + feedCount || index == 2 + feedCount || index == 4 + feedCount || index == 6 + feedCount || index == 7 + feedCount || index == 8 + feedCount ) {
				feedHtml += '<div class="items item-square '+ value.type +'" style="width: 275px;height: 225px;margin-right: 10px;" onclick="window.open('+ "'"+ value.url +"', '_blank' " +'); return false;"><div class="media_cont_bx animated slow flipInY go" style="height: 100%">'+ displayBlockItem(value, 'item') +'</div></div>';
			} else if ( index == 3 + feedCount || index == 9 + feedCount ) {
				feedHtml += '<div class="items height-2 item-vertical '+ value.type +'" style="width: 275px;height: 460px;margin-right: 10px;"><div class="media_cont_bx animated slow flipInY go" style="height: 100%" onclick="window.open('+ "'"+ value.url +"', '_blank' " +'); return false;">'+ displayBlockItem(value, 'item-v') +'</div></div>';
			}
//alert(feedHtml);


		});


		$('.media_gallery_container').html('<div class="media_gallery"><div id="media_gallery" class="'+ type +'" style="height:500px;overflow-x: hidden;">'+ feedHtml +'</div></div>').css('overflow', 'hidden');
			

		$('#media_gallery').isotope({
			layoutMode: 'masonryHorizontal',
			itemSelector: '#media_gallery .items',
			masonryHorizontal: {
				rowHeight: 225,
				gutter: 10
			}
		});

		$('.media_gallery').jScrollPane({
			showArrows: true,
			arrowButtonSpeed: 275,
			animateDuration: 500,
			animateScroll: true
		});


	}


	function GetSocialMediaContent() {
		var defer = $.Deferred();
		try {
			$.ajax({
				type: "POST",
				url: "/umbraco/surface/Market/GetSocialMediaContent",
				dataType: "json",
				success: function (response) {

					////console.log(response);
					defer.resolve(response)
				},
				error: function (err) {
					//console.log(err);
					defer.reject(err);
				}
			});
		}
		catch (err) {
			//console.log(err);
			defer.reject("error");
		}
		return defer.promise();
	}


	GetSocialMediaContent().then(function (res) {

		res = JSON.parse(res);
		facebookFeeds = res[0].fbList;
		twitterFeeds = res[0].twList;

		
		var pressReleaseData = $('#pressReleaseData').val();
		pressReleaseData = pressReleaseData.substring(0, pressReleaseData.length-3);
		pressReleaseData = pressReleaseData.split('|||');

		$.each(pressReleaseData, function(index, value) {
			pressReleaseFeeds.push({
				text: value.split('}')[0],
				image: value.split('}')[1],
				url: value.split('}')[2] != undefined ? value.split('}')[2] : '',
				time: value.split('}')[3] != undefined ? value.split('}')[3] : ''
			});
return pressReleaseFeeds;
		});



		var inTheNewsData = $('#inTheNewsData').val();
		inTheNewsData = inTheNewsData.substring(0, inTheNewsData.length-3);
		inTheNewsData = inTheNewsData.split('|||');

		$.each(inTheNewsData, function(index, value) {
			inNewsFeeds.push({
				text: value.split('}')[0],
				image: value.split('}')[1],
				url: value.split('}')[2] != undefined ? value.split('}')[2] : '',
				time: value.split('}')[4] != undefined ? value.split('}')[4] : ''
			});
		});



		getYoutubeFeeds().then(function (res) {
			
			youtubeFeeds = res;
			youtubeFeeds.length = 7;
			
			addMediaTypeToFeeds(pressReleaseFeeds, 'press-release');
			addMediaTypeToFeeds(inNewsFeeds, 'in-the-news');
			addMediaTypeToFeeds(facebookFeeds, 'facebook');
			addMediaTypeToFeeds(youtubeFeeds, 'youtube');
			addMediaTypeToFeeds(twitterFeeds, 'twitter');

			socialMediaFeeds = mergePrSocialNewsFeeds({ facebook: facebookFeeds, youtube: youtubeFeeds, twitter: twitterFeeds });
			prSocialNewsFeeds = { 'press-release': pressReleaseFeeds, 'social-media': socialMediaFeeds, 'in-the-news': inNewsFeeds };

			allMediaFeeds = mergeAllMediaFeeds({ facebook: facebookFeeds, youtube: youtubeFeeds, twitter: twitterFeeds, pr: pressReleaseFeeds, news: inNewsFeeds });
			//alert(allMediaFeeds);
allMediaFeeds.length = 27;
			loadMediaGallery('all-updates');
			
			console.log(facebookFeeds.length, twitterFeeds.length, youtubeFeeds.length, pressReleaseFeeds.length, inNewsFeeds.length);

		});



	});


	$('#media_gallery').isotope({
		layoutMode: 'masonryHorizontal',
			itemSelector: '#media_gallery .items',
			masonryHorizontal: {
			rowHeight: 225,
			gutter: 10
		}
	});

	$('.media_gallery').jScrollPane({
		showArrows: true,
		arrowButtonSpeed: 275,
		animateDuration: 500,
		animateScroll: true
	});


	$('.filter_link li:first-child a').addClass('active');
	//	$('.filter_link li:first-child a').empty().html('Social Media');
	$('.filter_link li a').click(function() {       
		$('.filter_link li a').removeClass('active');
		var index = $('.filter_link li a').index(this);
		
		var type = $(this).attr('data-letters').split(' ').join('-');
		type = type.toLowerCase();
		type = type == 'all-updates' ? 'all-updates' : type;
//alert(type);
if(type == 'social-media')
{
 // alert('hi');
   
// $(".media_gallery_container").empty();
   $(".media_gallery_container").empty().html( "<iframe src='https://m.dentzzdental.com/tintup.html' frameborder='0' style='height:350px;width:100%'></iframe>" );
}
else
{
		loadMediaGallery(type);
}
		$(this).addClass('active');     
		return false;
	});
	
	setTimeout(function(){
	   $('.filter_link li:nth-child(3) a').css('display','none');
     $('.filter_link li:nth-child(2) a').trigger('click');
   }, 1000);
//	$('.filter_link').css('visibility', 'hidden');
	

});
