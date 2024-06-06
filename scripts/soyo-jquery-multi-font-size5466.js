$(document).ready(function() {
    /** ----------------
    *  Embuded HTML code
    -------------------- */
    //var resize_icon = 'data:image/jpg;base64,R0lGODlhFgAUALMPAOjn59DQ0JWVleDf37u7u8PCwp6dndjY2NHR0dnY2MrJyYeHh6ysrNTU1O/u7v///yH5BAEAAA8ALAAAAAAWABQAAASD8MlJq6Wh6c15qMHhjCQAkOTxTQ06Dovgjg3VuoSwFHPNuoAdw9Cz4WQwhMsnuZEEhJGBiGI+nI7C4uRALAZV45OBEpBJVqcXTNKyHWmSYcGo2xdRmhhm78+5cQ4MMjNBeXFBPDOChHEEW4sOMDxxCgmRI5ZwGCKYKCogHaIbKxemphEAOw==';
    var resize_icon = 'A';
    var font_selection_box_html = "";
    //Use for loop create duplicated content, for reduce file size.
    for (var i=1; i<=3; i++){
        //font_selection_box_html += "<img src="+resize_icon+" id=\"fontsize_opt"+i+"\" class=\"multi_font_icon\" />";
        font_selection_box_html += "<span id=\"fontsize_opt"+i+"\" class=\"multi_font_icon\">A</span>";
    }
    $("#font_selection_box,#font_selection_box_abtools").html(font_selection_box_html);

    /** ---------------
    * Embuded CSS style
    -------------------*/
    $("#font_selection_box,#font_selection_box_abtools").css({"display":"flex","align-items":"center"});
    // $("#fontsize_opt1").css({"width":"18px","height":"16px","margin":"8px 1px 0 1px"});
    // $("#fontsize_opt2").css({"width":"25px","height":"24px","margin":"5px 1px 0 1px"});
    // $("#fontsize_opt3").css({"width":"35px","height":"34px","margin":"3px 1px 0 1px"});
    // $("#fontsize_opt4").css({"width":"22px","height":"20px","margin":"0 1px 0 1px"});
    // $("#fontsize_opt1").css({"font-size":"14px"});
    // $("#fontsize_opt2").css({"font-size":"18px"});
    // $("#fontsize_opt3").css({"font-size":"26px"});
    
    $('[id="fontsize_opt1"]').css({"font-size":"14px"});
    $('[id="fontsize_opt2"]').css({"font-size":"18px"});
    $('[id="fontsize_opt3"]').css({"font-size":"26px"});

    $(".multi_font_icon").css({"float":"left","cursor":"pointer", "margin":"0 20px 0 0", "font-weight":"bold"});
    
    /** -----------------------------------------------------------------
    * If user click the icons with ".multi_font_icon" class name, 
    * run function changeFont(fontSize) according which icons they choose.
    --------------------------------------------------------------------- */
    $(".multi_font_icon").click(function(event) {
        var id = event.target.id;
        var getOptId = id.substr(id.length - 1);
        var newFontSize = 16;
        //alert(getOptId);
        switch(getOptId){
            // case '1' : newFontSize=12; break; //Param "12" means change font-size to 12px
            // case '2' : newFontSize=16; break; //Param "16" means change font-size to 16px
            // case '3' : newFontSize=24; break; //Param "18" means change font-size to 18px
            //case '4' : newFontSize=24; break; //Param "20" means change font-size to 20px
            case '1' : newFontSize=16; break; //Param "12" means change font-size to 12px
            case '2' : newFontSize=21; break; //Param "16" means change font-size to 16px
            case '3' : newFontSize=24; break; //Param "18" means change font-size to 18px
        }
        // setCookie('fontSize', newFontSize, 30);
        setFontSize('fontSize', newFontSize);
        changeFont(newFontSize);
    });
    
    /** -----------------------------------------------------------------
    * Get cookies which named fontSize.
    --------------------------------------------------------------------- */    
    // var recordedFontSize = getCookie("fontSize");
    var recordedFontSize = getFontSize("fontSize");
    if (recordedFontSize!="") {
        changeFont(recordedFontSize);
    }else{}
});

/**
* Change font size within class with the name "multi-fontszie", 
* this function was called if user check the icons with class name ".multi_font_icon"
*/
function changeFont(fontSize){
	console.log('Font Size', fontSize);
    $(".multi-fontszie").css('font-size',fontSize+'px');
        
    if(fontSize == 16)
	    $(".banner-caption p").css('font-size','18px');
	else{
	     $(".banner-caption p").css('font-size',fontSize+'px');
	}
	   
	
	$('#consolPopupImpairedContent ul li p').css('font-size',fontSize+'px');
}

/**
* function setCookie(cname, cvalue, exdays) is for set cookies to record font-size
* this function was copied from w3schools
* param     cname        This is for cookies name
* param     cvalue       This is for cookies value
* param     exdays       This is for cookies expire days, if value is mean exist one day.
*/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function setFontSize(cname, cvalue) {
    sessionStorage.setItem(cname, cvalue);
}

function getFontSize(cname) {
    sessionStorage.getItem(cname);
}

/**
* function getCookie(cname) is for get cookies which user have selected the font-size before
* this function was copied from w3schools
* param     cname        This is for cookies name
*/
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
