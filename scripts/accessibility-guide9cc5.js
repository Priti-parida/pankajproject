    $(window).on('load', function() {
        emptyFunction = function() {};
        
        _fnSpeakBackup = window.responsiveVoice.speak;
        
        if(getCookie("isResponsiveVoiceSpeakEnabled") === null
                    || getCookie("isResponsiveVoiceSpeakEnabled") === "false") {
            _fnSpeakBackup = window.responsiveVoice.speak;
            window.responsiveVoice.speak = emptyFunction;
        }
        
        if (window.location.href.indexOf('tata-group-profile') > -1
            || window.location.href.indexOf('company-profile') > -1
            || window.location.href.indexOf('vision-mission-values') > -1
            || window.location.href.indexOf('leadership') > -1
            || window.location.href.indexOf('sustainability') > -1
            // || window.location.href.match('sustainability/$')
            // || window.location.href.match('sustainability/#$')
            || window.location.href.match('products-solutions/$')
            || window.location.href.match('products-solutions/#$')
            || window.location.href.match('investors/$')
            || window.location.href.match('investors/#$')
            || window.location.href.match('financial-results/$')
            || window.location.href.match('financial-results/#$')
            || window.location.href.indexOf('contact-us') > -1
            || window.location.href.indexOf('investors') > -1) {
                
                
                /*if(sessionStorage.getItem("isAccessibilityGuideModalVisible") === null) {
                    $('#consolPopup').modal('show');
                    console.log('modal show');
                    sessionStorage.setItem("isAccessibilityGuideModalVisible", "true");
                }
                if(sessionStorage.getItem("isResponsiveVoiceSpeakEnabled") === null
                    || sessionStorage.getItem("isResponsiveVoiceSpeakEnabled") === "false") {
                
                    _fnSpeakBackup = window.responsiveVoice.speak;
                    window.responsiveVoice.speak = emptyFunction;
                }
                if(sessionStorage.getItem("isMouseTrailEnabled") === null
                    || sessionStorage.getItem("isMouseTrailEnabled") === "false") {
                    
                    document.onmousemove = emptyFunction;
					$('.mouse-trail').css('display','none');
                }
                
                if(sessionStorage.getItem("isResponsiveVoiceSpeakEnabled") === "true") {
                    triggerSpeakHeaderCopy();
                }*/
                
                if(getCookie("isAccessibilityGuideModalVisible") === null) {
                    $('#consolPopup').modal('show');
                    console.log('modal show');
                    setCookie("isAccessibilityGuideModalVisible", "true");
                }
                // if(getCookie("isResponsiveVoiceSpeakEnabled") === null
                //     || getCookie("isResponsiveVoiceSpeakEnabled") === "false") {
                
                //     _fnSpeakBackup = window.responsiveVoice.speak;
                //     window.responsiveVoice.speak = emptyFunction;
                // }
                if(getCookie("isMouseTrailEnabled") === null
                    || getCookie("isMouseTrailEnabled") === "false") {
                    
                    document.onmousemove = emptyFunction;
					$('.mouse-trail').css('display','none');
                } else {
                    $('.mouse-trail').css('display','block');
                }
                
                if(getCookie("isResponsiveVoiceSpeakEnabled") === "true") {
                    // triggerSpeakHeaderCopy();
                }
        }
    });
    
    /*if(sessionStorage.getItem("isResponsiveVoiceSpeakEnabled") === "true") {
        $("#chkToggleAudioConsolPopup").prop('checked', true);
        $("#chkToggleAudioAccessTool").prop('checked', true);
        
        // triggerSpeakHeaderCopy();
    } else {
        $("#chkToggleAudioConsolPopup").prop('checked', false);
	    $("#chkToggleAudioAccessTool").prop('checked', false);
    }
    
    if(sessionStorage.getItem("isMouseTrailEnabled") === "true") {
        $("#chkToggleMouseTrailConsolPopup").prop('checked', true);
        $("#chkToggleMouseTrailAccessTool").prop('checked', true);
    } else {
        $("#chkToggleMouseTrailConsolPopup").prop('checked', false);
	    $("#chkToggleMouseTrailAccessTool").prop('checked', false);
    }*/
    
    if(getCookie("isResponsiveVoiceSpeakEnabled") === "true") {
        $("#chkToggleAudioConsolPopup").prop('checked', true);
        $("#chkToggleAudioAccessTool,#chkToggleAudioAccessToolMobile").prop('checked', true);
        
        // triggerSpeakHeaderCopy();
    } else {
        $("#chkToggleAudioConsolPopup").prop('checked', false);
	    $("#chkToggleAudioAccessTool,#chkToggleAudioAccessToolMobile").prop('checked', false);
    }
    
    if(getCookie("isMouseTrailEnabled") === "true") {
        $("#chkToggleMouseTrailConsolPopup").prop('checked', true);
        $("#chkToggleMouseTrailAccessTool,#chkToggleMouseTrailAccessToolMobile").prop('checked', true);
    } else {
        $("#chkToggleMouseTrailConsolPopup").prop('checked', false);
	    $("#chkToggleMouseTrailAccessTool,#chkToggleMouseTrailAccessToolMobile").prop('checked', false);
    }
                
    // Toggle Audio On/Off            
    function handleToggleAudio(cb) {
	  console.log("Clicked, new value = " + cb.checked);
	  if(cb.checked) {
        // sessionStorage.setItem("isResponsiveVoiceSpeakEnabled", "true");
        setCookie("isResponsiveVoiceSpeakEnabled", "true");
        window.responsiveVoice.speak = _fnSpeakBackup;
        
        // document.onmousemove = window.processEvent;
        // $('.mouse-trail').css('display','block');
	    
	    $("#chkToggleAudioConsolPopup").prop('checked', true);
	    $("#chkToggleAudioAccessTool,#chkToggleAudioAccessToolMobile").prop('checked', true);
	    
	   // triggerSpeakHeaderCopy();
	  } else {
        // sessionStorage.setItem("isResponsiveVoiceSpeakEnabled", "false");
        setCookie("isResponsiveVoiceSpeakEnabled", "false");
        _fnSpeakBackup = window.responsiveVoice.speak;
        window.responsiveVoice.speak = emptyFunction;
        
        // document.onmousemove = emptyFunction;
		// $('.mouse-trail').css('display','none');
        
        $("#chkToggleAudioConsolPopup").prop('checked', false);
	    $("#chkToggleAudioAccessTool,#chkToggleAudioAccessToolMobile").prop('checked', false);
	  }
	}
	
	// Toggle Mouse Trail On/Off
	function handleToggleMouseTrail(cb) {
	  console.log("Clicked mouse trail, new value = " + cb.checked);
	  if(cb.checked) {
        // sessionStorage.setItem("isMouseTrailEnabled", "true");
        setCookie("isMouseTrailEnabled", "true");
        
        document.onmousemove = window.processEvent;
		$('.mouse-trail').css('display','block');
	    
	    $("#chkToggleMouseTrailConsolPopup").prop('checked', true);
	    $("#chkToggleMouseTrailAccessTool,#chkToggleMouseTrailAccessToolMobile").prop('checked', true);
	  } else {
        // sessionStorage.setItem("isMouseTrailEnabled", "false");
        setCookie("isMouseTrailEnabled", "false");
        
        document.onmousemove = emptyFunction;
		$('.mouse-trail').css('display','none');
        
        $("#chkToggleMouseTrailConsolPopup").prop('checked', false);
	    $("#chkToggleMouseTrailAccessTool,#chkToggleMouseTrailAccessToolMobile").prop('checked', false);
	  }
	}
	
	$('#guide, #guide-ab').click(function(){
        $('#consolPopup').modal('show');
    });
    
    // Set a Cookie
    function setCookie(cName, cValue) {
        const daysToExpire = new Date(2147483647 * 1000).toUTCString();
        const expires = "expires=" + daysToExpire;
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
    }
    
    // Get a Cookie
    function getCookie(cName) {
      const name = cName + "=";
      const cDecoded = decodeURIComponent(document.cookie); //to be careful
      const cArr = cDecoded .split('; ');
      let res = null;
      cArr.forEach(val => {
          if (val.indexOf(name) === 0) res = val.substring(name.length);
      })
      return res;
    }
    
    function triggerSpeakHeaderCopy() {
        console.log('In triggerSpeakHeaderCopy');
        if (window.location.href.indexOf('tata-group-profile') > -1) {
            speakHeaderCopy("Tata Group Profile Page");
            // setTimeout(function(){ responsiveVoice.speak("Tata Group Profile Page"); }, 3000);
        }
        if (window.location.href.indexOf('company-profile') > -1) {
            speakHeaderCopy("Company Profile Page");
            // setTimeout(function(){ responsiveVoice.speak("Company Profile Page"); }, 3000);
        }
        if (window.location.href.indexOf('vision-mission-values') > -1) {
            speakHeaderCopy("Vision, Mission & Values Page");
            // setTimeout(function(){ responsiveVoice.speak("Vision, Mission & Values Page"); }, 3000);
        }
        if (window.location.href.indexOf('leadership') > -1) {
            speakHeaderCopy("Leadership page");
            // setTimeout(function(){ responsiveVoice.speak("Leadership page"); }, 3000);
        }
        if (window.location.href.match('sustainability/$') || window.location.href.match('sustainability/#$')) {
            speakHeaderCopy("Sustainability Page");
            // setTimeout(function(){ responsiveVoice.speak("Sustainability Page"); }, 3000);
        }
        if (window.location.href.indexOf('governance') > -1) {
            speakHeaderCopy("Sustainability governance Page");
        }
        if (window.location.href.indexOf('material-issues') > -1) {
            speakHeaderCopy("Sustainability material issues Page");
        }
        if (window.location.href.match('products-solutions/$') || window.location.href.match('products-solutions/#$')) {
            speakHeaderCopy("Product & Solutions Page");
            // setTimeout(function(){ responsiveVoice.speak("Product & Solutions Page"); }, 3000);
        }
        if (window.location.href.match('investors/$') || window.location.href.match('investors/#$')) {
            speakHeaderCopy("Investors Page");
            // setTimeout(function(){ responsiveVoice.speak("Investors Page"); }, 3000);
        }
        if (window.location.href.match('financial-results/$') || window.location.href.match('financial-results/#$')) {
            speakHeaderCopy("Financial Results Page");
            // setTimeout(function(){ responsiveVoice.speak("Financial Performance Page"); }, 3000);
        }
        if (window.location.href.indexOf('contact-us') > -1) {
            speakHeaderCopy("Contact Us Page");
            // setTimeout(function(){ responsiveVoice.speak("Contact us Page"); }, 3000);
        }
    }
    
    function speakHeaderCopy(textToSpeak) {
        console.log('textToSpeak', textToSpeak);
        var timeInterval = 3000;
        var voice = "US English Female";
        // setTimeout(function(){ responsiveVoice.speak(textToSpeak, voice); }, timeInterval);
    }
	
	$("#cat-visually-impaired").click(function(){
		$('#consolPopup').modal('hide');		
		// $('#consolPopupImpairedDD').modal('show');	
		// $('#visuallyImpairedDD').css('display', 'block');
		// $('#hearingImpairedDD').css('display', 'none');
		$("#consolPopupImpairedContent").modal('show');
	    $("#consolPopupPartiallyBlindContent").css('display', 'block');
		$("#consolPopupColorBlindContent").css('display', 'none');
		$("#consolPopupPartialHearingLossContent").css('display', 'none');
		$("#consolPopupMixedHearingLossContent").css('display', 'none');
	});
	$("#cat-hearing-impaired").click(function(){
		$('#consolPopup').modal('hide');		
		// $('#consolPopupImpairedDD').modal('show');	
		// $('#visuallyImpairedDD').css('display', 'none');
		// $('#hearingImpairedDD').css('display', 'block');	
		$("#consolPopupImpairedContent").modal('show');
	    $("#consolPopupPartiallyBlindContent").css('display', 'none');
		$("#consolPopupColorBlindContent").css('display', 'none');
		$("#consolPopupPartialHearingLossContent").css('display', 'block');
		$("#consolPopupMixedHearingLossContent").css('display', 'none');
	});
	
	$("#back-btn-visually-impaired, #back-btn-hearing-impaired").click(function(){
		$('#consolPopupImpairedDD').modal('hide');
		$('#consolPopup').modal('show');		
	});
	
	$("#back-btn-partial-blind, #back-btn-partial-hear-loss").click(function(){
		$('#consolPopupImpairedContent').modal('hide');
		$('#consolPopup').modal('show');		
	});
	
	$(".select-visually-impaired").change(function() {
		var val = $(this).val();

		// Partial Blind
		if (val == 1) {
			$('#consolPopupImpairedDD').modal('hide');
			$("#consolPopupImpairedContent").modal('show');
			$("#consolPopupPartiallyBlindContent").css('display', 'block');
			$("#consolPopupColorBlindContent").css('display', 'none');
			$("#consolPopupPartialHearingLossContent").css('display', 'none');
			$("#consolPopupMixedHearingLossContent").css('display', 'none');
		}
		// Color Blind
		if (val == 2) {
			$('#consolPopupImpairedDD').modal('hide');
			$("#consolPopupImpairedContent").modal('show');
			$("#consolPopupPartiallyBlindContent").css('display', 'none');
			$("#consolPopupColorBlindContent").css('display', 'block');
			$("#consolPopupPartialHearingLossContent").css('display', 'none');
			$("#consolPopupMixedHearingLossContent").css('display', 'none');
		}
	});
	
	$(".select-hearing-impaired").change(function() {
		var val = $(this).val();

		// Partial Hear Loss
		if (val == 1) {
			$('#consolPopupImpairedDD').modal('hide');
			$("#consolPopupImpairedContent").modal('show');
			$("#consolPopupPartiallyBlindContent").css('display', 'none');
			$("#consolPopupColorBlindContent").css('display', 'none');
			$("#consolPopupPartialHearingLossContent").css('display', 'block');
			$("#consolPopupMixedHearingLossContent").css('display', 'none');
		}
		// Mixed Hear Loss
		if (val == 2) {
			$('#consolPopupImpairedDD').modal('hide');
			$("#consolPopupImpairedContent").modal('show');
			$("#consolPopupPartiallyBlindContent").css('display', 'none');
			$("#consolPopupColorBlindContent").css('display', 'none');
			$("#consolPopupPartialHearingLossContent").css('display', 'none');
			$("#consolPopupMixedHearingLossContent").css('display', 'block');
		}
	});
	
	$(".btn-content-back").click(function(){
		$('#consolPopupImpairedContent').modal('hide');		
		$('#consolPopupImpairedDD').modal('show');
	});
	
	$('#consolPopupImpairedDD').on('shown.bs.modal', function (e) {
		$('.select-visually-impaired').val('0');
		$('.select-hearing-impaired').val('0');
	});
                
    $(window).on("scroll", function(e){
    	if($(window).scrollTop() >= 310){
    		$(".cancel-btn-right").addClass("white");
    	}
    	else{
    		$(".cancel-btn-right").removeClass("white");
    	}
    });
    
    $(document).off("mouseenter").on("mouseenter", "div[role=img]", function() {
        console.log('ALT TEXT', $(this).attr("aria-label"));
		$this = $(this)
		if(getCookie("isResponsiveVoiceSpeakEnabled") === "true"){
		    setTimeout(function(){ responsiveVoice.speak($this.attr("aria-label"), "US English Female"); });
		}
    });	

    // Script to read image alt description
    $(document).ready(function() {
		$( "img" ).mouseover(function() {
			console.log('ALT TEXT', $(this).attr("alt"));
			$this = $(this)
			if(getCookie("isResponsiveVoiceSpeakEnabled") === "true"){
			    setTimeout(function(){ responsiveVoice.speak($this.attr("alt"), "US English Female"); }, 500);
			}
			
		});
		
		/*$("div[role=img]").mouseover(function() {
			console.log('ALT TEXT', $(this).attr("aria-label"));
			$this = $(this)
			setTimeout(function(){ responsiveVoice.speak($this.attr("aria-label"), "US English Female"); }, 500);
		});*/
		
		/*$(document).off("mouseover").on("mouseover", "div[role=img]", function() {
		    console.log('ALT TEXT', $(this).attr("aria-label"));
			$this = $(this)
			setTimeout(function(){ responsiveVoice.speak($this.attr("aria-label"), "US English Female"); }, 500);
		});*/
		
		/*$("svg[role=img]").mouseover(function() {
			console.log('ALT TEXT', $(this).attr("aria-label"));
			$this = $(this)
			setTimeout(function(){ responsiveVoice.speak($this.attr("aria-label"), "US English Female"); }, 500);
		});*/
		
		/*$(document).off("mouseover").on("mouseover", "svg[role=img]", function() {
		    console.log('ALT TEXT', $(this).attr("aria-label"));
			$this = $(this)
			setTimeout(function(){ responsiveVoice.speak($this.attr("aria-label"), "US English Female"); }, 500);
		});*/
	});
	
	function cancelSpeech() {
	    console.log('canceSpeech called from accessibility guide js');
        responsiveVoice.cancel();
	}