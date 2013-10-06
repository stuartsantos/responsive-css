$(function () {
	loadPhoneNumber('cmpid');
    $("#navContainer a[href^=#]").addClass("nonLink").click(function (e) {
        e.preventDefault()
    });
	
    $("#navContainer #navListPanel > li").each(function () {
        var $navThis = $(this);
        var $childSize = $(".navBoxList ul", $navThis).size();
        if ($childSize <= 3) {
            $(".navBox", $navThis).parent().addClass("childItems" + $childSize + "")
        }
        if ($childSize >= 5) {
            $(".navBox", $navThis).parent().addClass("largeChildItems")
        }
    });
    $("#textResizeTop a, #textResizeBtm a").each(function (e) {
        $(this).click(function (z) {
            z.preventDefault();
            $("body").attr("class", $(this).attr("class"));
            $("#textResizeTop a, #textResizeBtm a").removeClass("active");
            $(this).addClass("active")
        })
    });
    $(".footerLink li").eq(0).attr("class", "first");
    slideIn($(".contactList>a"), "fast");
    $("a.offerLink").click(function (e) {
        $(this).parent().toggleClass("activated");
        $('html, body').animate({
            scrollTop: $("#footerSecContainer").offset().top
        }, 200);
        return false
    });
    if ($("ul#navListPanel").length) {
        $("ul#navListPanel").find("li:has(div)").addClass("arrow");
        $("ul#navListPanel li").hover(function () {
            $("div:eq(0)", this).show();
            if ($(this).children().length > 1) {
                $(this).addClass("selected")
            }
        }, function () {
            $("div:eq(0)", this).hide();
            if ($(this).children().length > 1) {
                $(this).removeClass("selected")
            }
        })
    }
    initAccordMenu("#gridCenter .catAccordion:eq(0)", 0);
    initAccordMenu("#gridBottom .catAccordion:eq(0)", 0);
    initAccordMenu("#gridCenter .catAccordion:eq(1)", 0);
    initAccordMenu("#gridBottom .catAccordion:eq(1)", 0);
    initAccordMenu("#gridCenter .catAccordion:eq(2)", 0);
    initAccordMenu("#gridBottom .catAccordion:eq(2)", 0);
    initAccordMenu(".accordionModule:eq(0)", 0);
    initAccordMenu(".accordionModule:eq(1)", 0);
    initAccordMenu(".accordionModule:eq(2)", 0);
    initAccordMenu(".accCenterModule", 0);
    $(".hpsAcc").each(function () {
        var $parThis = $(this);
        $(".accExpand", $parThis).click(function (e) {
            var $childThis = $(this);
            $(".catAccordion ul", $parThis).slideDown("slow", function () {
                equalHeight($("#gridRight, #gridCenter, #gridLeft"))
            }).parent().addClass("expanded");
            $childThis.hide();
            $(".accDefault", $parThis).show();
            e.preventDefault()
        });
        $(".accDefault", $parThis).click(function (e) {
            var $childThis1 = $(this);
            $(".catAccordion ul", $parThis).slideUp("slow", function () {
                equalHeight($("#gridRight, #gridCenter, #gridLeft"))
            }).parent().removeClass("expanded");
            $childThis1.hide();
            $(".accExpand", $parThis).show();
            e.preventDefault()
        })
    });
    $("#gridRight .rightModule ul.bulleted").parent().addClass("rightBulleted");
    $("#gridRight .rightModule ul.bigBulleted").parent().addClass("rightBigBulleted");
    $("#gridRight .rightModule ul.nonBulleted").parent().addClass("rightNonBulleted");
    $("#gridRight .rightModule ul.imageBulleted").parent().addClass("rightImageBulleted");
    $("#gridRight .rightModule.gradientBg").removeClass("rightBigBulleted");
    $("#gridRight .rightModule.gradientBg ul.imageBulleted").parent().removeClass("gradientBg").removeClass("rightImageBulleted").addClass("rightGradImageBulleted");
    $("#gridRight .rightModule.rightBigBulleted.rightNonBulleted").removeClass("rightBigBulleted").removeClass("rightNonBulleted").addClass("rightBigNonBulleted");
    $("#gridLeft .leftModule ul.bigBulleted").parent().addClass("leftBigBulleted");
    $("#gridLeft .leftModule ul.nonBulleted").parent().addClass("leftNonBulleted");
    $("#gridLeft .leftModule ul.imageBulleted").parent().addClass("leftImageBulleted");
    $(".tabModule").each(function () {
        var $thisPar = $(this);
        $(".tabContainer .tabModContent", $thisPar).each(function (e) {
            var $tChild = $(this);
            if ($("ul", $tChild).length < 1) {
                var z = $(".tabContainer .tabModContent", $thisPar).index($tChild);
                $(".tabList li", $thisPar).eq(z).remove();
                $(this).remove()
            }
        });
        $(".tabModContent", $thisPar).hide();
        $("ul.tabList li:first", $thisPar).addClass("active").show();
        $(".tabModContent:first", $thisPar).show();
        $("ul.tabList li", $thisPar).click(function () {
            var $thisChild = $(this);
            var findIndex = $("ul.tabList li", $thisPar).index(this);
            $("ul.tabList li", $thisPar).removeClass("active");
            $thisChild.addClass("active");
            $(".tabModContent", $thisPar).hide();
            $(".tabModContent", $thisPar).eq(findIndex).fadeIn();
            equalHeight($("#gridRight, #gridCenter, #gridLeft"));
            return false
        })
    });
    if ($(".indusProdContent").length) {
        $("#prodFilterSelect option").eq(0).attr("selected", true);
        $(".indusProdContent").hide();
        if ($(".indusProdOverview").length === 0) {
            $("#prodFilterSelect option").eq(1).attr("selected", true);
            $(".indusProdContent").show()
        }
        $("#prodFilterSelect").change(function () {
            var idx = document.getElementById("prodFilterSelect").selectedIndex;
            if ($(".indusProdOverview").is(":visible") && idx != 0) {
                $(".indusProdOverview").slideUp("slow", function () {
                    indusProducts()
                })
            } else {
                indusProducts()
            }
        });
        if ($(".prodOverviewLink").length) {
            $(".prodOverviewLink a").click(function (e) {
                e.preventDefault();
                $(".indusProdOverview").slideToggle("slow");
                $(".prodOverviewLink a").toggleClass("inActive");
                var $tClass = $(this).attr("class");
                if ($("#prodFilterSelect").length) {
                    var idx = document.getElementById("prodFilterSelect").selectedIndex;
                    if (idx == 0) {
                        $("#prodFilterSelect option:eq(1)").attr("selected", true)
                    } else {
                        if ($tClass == "" && idx != 0) {
                            $("#prodFilterSelect option:eq(0)").attr("selected", true)
                        }
                    }
                }
                indusProducts()
            })
        } else {
            $("#prodFilterSelect option").eq(1).attr("selected", true);
            $(".indusProdContent").show()
        }
        var selSize = $("#prodFilterSelect option").size();
        if (selSize == 2) {
            $("#prodFilterSelect").remove()
        }
    }
    if ($(".moduleOverviewLink").length) {
        $(".categoryWrap ul").slideUp(100);
        $(".moduleOverviewLink a").click(function (e) {
            e.preventDefault();
            $(".moduleOverviewLink a").toggleClass("inActive");
            var divPos = $(".categoryWrap .moduleOverview").css("position");
            var divHeight = $(".indusProdContainer").css("height");
            if (divPos == "relative") {
                $(".categoryWrap .moduleOverview").slideToggle("slow", function () {
                    $(".categoryWrap .moduleOverview").css("position", "absolute")
                });
                $(".categoryWrap ul").slideToggle("slow", function () {
                    equalHeight($("#gridRight, #gridCenter, #gridLeft"))
                })
            }
            if (divPos == "absolute") {
                $(".categoryWrap ul").slideToggle("slow");
                $(".categoryWrap .moduleOverview").slideToggle("slow");
                $(".categoryWrap .moduleOverview").css("position", "relative");
                equalHeight($("#gridRight, #gridCenter, #gridLeft"))
            }
        })
    }
    if ($(".detailAccModule").length) {
        $(".detailAccModule").each(function (x) {
            var $tParent = $(this);
            $(">ul", $tParent).each(function (y) {
                var $tChild = $(this);
                $($tChild).addClass("deActive");
                $(">ul", $tParent).addClass("deActive");
                $(">ul", $tParent).eq(0).removeClass("deActive").addClass("active");
                $(">ul.deActive .detModImage, >ul.deActive .detModDesc", $tParent).hide();
                var thisInActHeight = $($tChild).outerHeight();
                var thisActHeight = $($tChild).outerHeight();
                $tChild.click(function (z) {
                    if ($(this).attr("class") == "detModule deActive") {
                        $(">ul", $tParent).removeClass("active").removeClass("deActive");
                        $(">ul .detModImage, >ul .detModDesc", $tParent).slideUp(function () {
                            equalHeight($("#gridRight, #gridCenter, #gridLeft"))
                        });
                        $(">ul", $tParent).addClass("deActive");
                        $tChild.removeClass("deActive").addClass("active");
                        $(".detModImage, .detModDesc", $tChild).slideDown(function () {
                            equalHeight($("#gridRight, #gridCenter, #gridLeft"))
                        })
                    }
                })
            })
        })
    }
    if ($("#srchPgForm").length) {
        var allWords = "",
            exactWords = "",
            moreWords = "";
        $("#wrdsField").keyup(function () {
            allWords = trimThis($(this).val());
            outPut()
        });
        $("#exactField").keyup(function () {
            exactWords = trimThis($(this).val());
            if (exactWords != "") {
                exactWords = '"' + exactWords + '"'
            }
            outPut()
        });
        $("#moreField").keyup(function () {
            moreWords = trimThis($(this).val());
            moreWords = moreWords.replace(/\s/g, " OR ");
            outPut()
        });

        function outPut() {
            strV = allWords + " " + exactWords + " " + moreWords;
            strV = strV.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
            $("#searchTerm").val(strV)
        }
        $("#moreSearch").hide();
        $("#srchNeedMore").click(function () {
            $("#moreSearch").toggle("slow");
            $(this).toggleClass("active");
            return false
        });
        $("#searchLink, #srchPageBtn").click(function () {
            if ($("#srchPageLink").val() == $("#srchPageLinkTemp").val()) {
                $("#srchPageLink").val("");
                return true
            }
            return true
        })
    }
    $(".tipBtn1,.tipBtn2,.tipBtn3").click(function () {
        $(".tips1,.tips2,.tips3").hide();
        var btnClass = $(this).attr("class").replace("tipBtn", "");
        $(".tips" + btnClass).show()
    });
    $(".tips1 .closeTips, .tips2 .closeTips,.tips3 .closeTips").click(function () {
        var btnClass = $(this).parent().attr("class").replace("tips", "");
        $(".tips" + btnClass).hide()
    });
    if ($("#gridLeft #navlist").length) {
        $("body").addClass("withLeftNav")
    }
    if ($(".relatedDownload").length) {
        $(".relatedDownload a").each(function (e) {
            var fileType = $(this).attr("href").substr(($(this).attr("href").lastIndexOf(".") + 1));
            $(this).prev().addClass(fileType)
        })
    }
    if ($(".insightSection").length) {
        $(".insightSection").each(function () {
            var $mThis = $(this);
            var $docType = $("h3 a", $mThis).attr("href");
            var $ext = $docType.substr($docType.lastIndexOf(".") + 1);
            $(".icons", $mThis).addClass($ext)
        })
    }
    $("#searchBanner").insertAfter("#topMenu");
    if (($(".prodCol1").length == 1) && ($(".prodCol2").length == 0)) {
        $(".prodCol1").css("width", "100%");
        $(".prodCol1").css("border-left", "0");
        $(".prodCol1").css("padding-left", "0")
    }
    if (($(".prodCol1").length == 0) && ($(".prodCol2").length == 1)) {
        $(".prodCol2").css("width", "100%");
        $(".prodCol2").css("border-left", "0");
        $(".prodCol2").css("padding-left", "0")
    };
    equalHeight($("#gridRight, #gridCenter, #gridLeft"));
});
var oldBodyOnLoad = window.onload;
window.onload = function () {};

function indusProducts() {
    if ($("#prodFilterSelect").length) {
        var idx = document.getElementById("prodFilterSelect").selectedIndex;
        if (idx == 1) {
            $(".indusProdContent").slideDown("slow", function () {
                equalHeight($("#gridRight, #gridCenter, #gridLeft"))
            });
            $(".prodOverviewLink a").addClass("inActive")
        } else {
            if (idx == 0) {
                $(".indusProdContent").slideUp();
                $(".indusProdOverview").slideDown("slow", function () {
                    equalHeight($("#gridRight, #gridCenter, #gridLeft"))
                });
                $(".prodOverviewLink a").attr("class", "")
            } else {
                if (idx > 1) {
                    $(".indusProdContent").slideUp().eq(idx - 2).slideDown("slow", function () {
                        equalHeight($("#gridRight, #gridCenter, #gridLeft"))
                    });
                    $(".prodOverviewLink a").addClass("inActive")
                } else {
                    $(".indusProdContent").slideUp().eq(idx).slideDown("slow", function () {
                        equalHeight($("#gridRight, #gridCenter, #gridLeft"))
                    })
                }
            }
        }
    } else {
        $(".indusProdContent").slideDown(function () {
            equalHeight($("#gridRight, #gridCenter, #gridLeft"))
        })
    }
}
function equalHeight(group) {
      var obj = $.browser.msie;
      var objv = $.browser;
	  
      if(obj && objv.version < 7){
		group.each(function() {
			$(this).addClass('IE');
		});			  
	  }
	  else{
		group.each(function() {
			$(this).addClass('nonIE');
		});	
	  };
	var tallest = 0;
	group.each(function() {
		var thisHeight = $(this).height();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	//group.height(tallest);	
	group.each(function() {
		$(this).css('height',tallest);
	});	
}
function slideIn(element, speed) {
    $(element).next().hide();
    $(element).click(function (e) {
        e.preventDefault();
        $(this).parent().toggleClass("activated");
        $(this).next().slideToggle("speed", function () {
            equalHeight($("#gridRight, #gridCenter, #gridLeft"))
        })
    })
}
function addClass() {
    $("body").addClass("pagePreLoad")
}
function initAccordMenu(accorElemt, sel) {
    $("" + accorElemt + ">li").each(function () {
        $(this).hover(function () {
            $(this).addClass("hOver")
        }, function () {
            $(this).removeClass("hOver")
        })
    });
    $("" + accorElemt + " ul").hide().eq(sel).show().parent().addClass("expanded");
    $("" + accorElemt + " li div").click(function () {
        var checkElement = $(this).next();
        if ((checkElement.is("ul")) && (!checkElement.is(":visible"))) {
            $("" + accorElemt + " ul:visible").slideUp("slow", function () {
                equalHeight($("#gridRight, #gridCenter, #gridLeft"))
            }).parent().removeClass("expanded");
            checkElement.slideDown("slow", function () {
                equalHeight($("#gridRight, #gridCenter, #gridLeft"))
            }).parent().addClass("expanded")
        }
    })
}
function initSimpleAccordMenu(accorElemt, sel) {
    equalHeight($("" + accorElemt + " > li > div"));
    $("" + accorElemt + " ul").hide();
    $("" + accorElemt + " li div").click(function () {
        $(this).next().slideToggle("normal")
    })
}
function trimThis(str) {
    return str = str.replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/\s{2,}/g, " ")
}
try {
    document.execCommand("BackgroundImageCache", false, true)
} catch (e) {}
function showSection(x) {
    var bcID = "section" + x;
    document.getElementById(bcID).style.display = "block";
    if (document.getElementById("DivShim")) {
        DivSetVisible(true, document.getElementById(bcID))
    }
}
function hideSection(x) {
    var bcID = "section" + x;
    document.getElementById(bcID).style.display = "none";
    if (document.getElementById("DivShim")) {
        document.getElementById("DivShim").style.display = "none"
    }
}
$.getScript = function (url, callback, cache) {
    $.ajax({
        type: "GET",
        url: url,
        success: callback,
        dataType: "script",
        cache: true
    })
};
$(function () {
    if ($('#gridRight a[href*=".swf"], #gridCenter a[href*=".swf"], #gridBottom a[href*=".swf"], #gridLeft a[href*=".swf"]').length) {
        $.getScript("http://www-111.chartisinsurance.com/js/showFlash.js");
        $('#gridRight a[href*=".swf"], #gridCenter a[href*=".swf"], #gridBottom a[href*=".swf"], #gridLeft a[href*=".swf"]').click(function (e) {
            e.preventDefault();
            var $src = $(this).attr("href"),
                vidWidth = gup("width", $src),
                vidHeight = gup("height", $src),
                $contentBlocks = '<div id="overLayBg"></div><div id="overLayBlock"><div id="overLayContent"><a class="closeLayer" href="#Close"></a></div></div>';
            $("body").prepend($contentBlocks);
            $("#overLayBg").css("display", "block");
            $("#overLayBlock").css("display", "block");
            $("#overLayContent").css("height", "" + vidHeight + "px").css("width", "" + vidWidth + "px").center();
            var $strVar = '<div id="flashBanner1" style="width:' + vidWidth + "px;height:" + vidHeight + 'px"><strong>You need to upgrade your Flash Player.</strong></br>Please download the latest version of flash player from <a href="http://www.adobe.com/go/getflash/">here</a>.</div>';
            $("#overLayContent").append($strVar);
            var so = new showFlash($src, "flashBanners", vidWidth, vidHeight, "9", "");
            so.addParam("allowScriptAccess", "always");
            so.addParam("wmode", "opaque");
            so.addParam("swliveconnect", "true");
            so.write("flashBanner1");
            fullHeightOn();
            $("#overLayContent a").click(function (e1) {
                e1.preventDefault();
                $("#flashBanner1").html("");
                $("#overLayBg, #overLayBlock").remove()
            });
            if ($("#overLayBg").is(":visible")) {
                $(window).bind("resize", function () {
                    fullHeightOn();
                    $("#overLayContent").center()
                })
            } else {
                $(window).unbind("resize")
            }
        })
    }
});
jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
    this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
    return this
};

function fullHeightOn() {
    $("#overLayBg").height("" + getDocHeight() + "px").width("" + getDocWidth() + "px")
}
function getDocHeight() {
    return Math.max($(document).height(), $(window).height(), $("#body_wrapper").outerHeight(true), document.documentElement.clientHeight)
}
function getDocWidth() {
    return Math.max($("body").width(), $(window).width(), $("#body_wrapper").outerWidth(true), document.documentElement.clientWidth)
}
function gup(name, src) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)",
        regex = new RegExp(regexS),
        results = regex.exec(src);
    if (results == null) {
        return ""
    } else {
        return results[1]
    }
}
if ($.browser.msie) {
    e = "header,menu,nav,footer,abbr,article,aside,audio,canvas,datalist,details,eventsource,figure,hgroup,mark,meter,output,progress,section,time,video";
    x = e;
    e = e.split(",");
    i = e.length;
    while (i--) {
        document.createElement(e[i])
    }
};

$(document).ready(function () {
$('.catNav li').mouseover(function(){
	$(this).addClass('hover');
});
$('.catNav li').mouseout(function(){
	$(this).removeClass('hover');
});
$('#topLinks ul li a:last').css('border', '0');
var banner = $("#li1").attr('class');
if (banner!="tabOnActive") {
   //$("#pageBanner").prependTo("#gridCenter");
   //$("#topMenu").prependTo("#gridCenter");
   $('#pageTitle').insertAfter('#topMenu');
}
    //To hide page title if gridcenter has page banner
    $('#gridTop div').each(function () {
        if ($(this).attr('id') == 'pageBanner') {
            $("#pageTitle").css("display", "none");
        }
    });
    
    //Facebook
$('<iframe src="//www.facebook.com/plugins/like.php?href='+encodeURIComponent(location.href)+' &amp;send=false&amp;layout=button_count&amp;width=90&amp;show_faces=false&amp;font=arial&amp;colorscheme=light&amp;action=like&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:90px; height:21px;" allowTransparency="true"></iframe>').appendTo('#like-button') 
    
    //Assign class to body
    var reqText = $('li.tabOnActive li.tabOnActive a.nonLink').text();
    reqText = $.trim(reqText);
    var str = reqText.substring(0, reqText.indexOf(" "));
    if (str == 'AinaNainen') {
        $('body').attr('id', 'pink');
    } else if (str == 'MoniTurva') {
        $('body').attr('id', 'blue');
    } else if (str == 'Travel') {
        $('body').attr('id', 'seablue');
    } else if (str == 'HoivaTurva') {
        $('body').attr('id', 'green');
    } else if (str == 'SairaalaTurva') {
        $('body').attr('id', 'brown');
    }
    //for table row
    if($("table").attr("border") != "0") {
    $("tr:even").addClass("odd");
    $("tr:odd").addClass("even");
    }
});
function buildPromoLinks() {
    var fileLink,iframeSrc;
    var queryStr = window.location.search.substring(1);
    if (queryStr != null && queryStr != "") { 
// if querystring exists only , append to all the hrefs
        if (document.getElementsByTagName('a')) {
            for (var i = 0; (fileLink = document.getElementsByTagName('a')[i]); i++) {
                if (fileLink.href.indexOf('?') != -1) { 
// if the link has already querystring then append value with &
                    fileLink.href = fileLink.href + '&' + queryStr;
                } else { 
// if the link does not have querystring then add querystring
                    if (fileLink.href != "" || fileLink.href != "#") {
if ( (fileLink.href.indexOf('javascript'.toLowerCase()) != 0) && (fileLink.href.indexOf('mailto'.toLowerCase()) != 0) ) {
                            fileLink.href = fileLink.href + '?' + queryStr;
                        }
                    } // end file is not null
                }
            } // end for loop for a tags
        } // end if document a tags

    } // end if queryStr
}
// call the javascript function after window loads
var previousOnload = window.onload;
window.onload = function() {
    if (previousOnload) {
        previousOnload();
    }
    buildPromoLinks();
}
function loadPhoneNumber(name) {
var cmpid = decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
cmpid = cmpid.substring(0, 3);
var lead_value = 'Other';
if (cmpid == 'ACC' || cmpid == 'acc') {
lead_value = 'Agent Client campaign';
}
if (cmpid == 'BAC' || cmpid == 'bac') {
lead_value = 'Banner Ad';
}
if (cmpid == 'CAC' || cmpid == 'cac') {
lead_value = 'Classified Ad';
}
if (cmpid == 'CMC' || cmpid == 'cmc') {
lead_value = 'Direct Mail';
}
if (cmpid == 'KAC' || cmpid == 'kac') {
lead_value = 'Keyword Ad';
}
if (cmpid == 'KNC' || cmpid == 'knc') {
lead_value = 'Keyword network campaign (Paid Key Word)';
}
if (cmpid == 'LEC' || cmpid == 'lec') {
lead_value = 'Link Exchange';
}
if (cmpid == 'NLC' || cmpid == 'nlc') {
lead_value = 'Newsletter';
}
if (cmpid == 'PAC' || cmpid == 'pac') {
lead_value = 'Print Ad';
}
if (cmpid == 'RAC' || cmpid == 'rac') {
lead_value = 'Rich Media Ad';
}
if (cmpid == 'SPC' || cmpid == 'spc') {
lead_value = 'Sponsorship';
}
if (cmpid == 'OTC' || cmpid == 'otc') {
lead_value = 'Other';
}
if (cmpid == 'SRC' || cmpid == 'src') {
lead_value = 'Search';
}
if (cmpid == 'DIS' || cmpid == 'dis') {
lead_value = 'Display';
}
if (cmpid == 'AFC' || cmpid == 'afc') {
lead_value = 'Affiliate';
}
if (cmpid == 'EMC' || cmpid == 'emc') {
lead_value = 'E-mail';
}
if (cmpid == 'FCB' || cmpid == 'fcb') {
lead_value = 'Facebook Ad';
}
if (cmpid == 'TRG' || cmpid == 'trg') {
lead_value = 'Retargeting';
}
if (cmpid == 'ITD' || cmpid == 'itd') {
lead_value = 'International Display Ad';
}
if (cmpid == 'AFC' || cmpid == 'afc' || cmpid == 'EMC' || cmpid == 'emc') {
$('#gridRight .gradientBg').css('display', 'none');
} else {
$('#gridRight .gradientBg').css('display', 'block');
}
$('#leadsource').val(lead_value);
}
$(document).ready(function () {
//loadPhoneNumber('cmpid');
// adding cmd value to the returnURL vale
var URL = window.location.href;
var cmpindex = URL.indexOf('cmpid=');
var pos = URL.indexOf('?');
var nstr = URL.slice(pos);
var returl = $('#retURL').attr('value');
if(cmpindex==-1) {
$('#retURL').attr('value', returl + '?cmpid=OTC');
}else {
$('#retURL').attr('value', returl + nstr);
/* $('a').each(function(){
	var href=$(this).attr('href');
	if(href!='#'){
	href=href+nstr;
	$(this).attr('href', href);
	}
}); */
}
});