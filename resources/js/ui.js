$(function(){
    headerUI();
    btnUi();
    searchUi();
    tapMotion();
	popupUI();
	etcUI();
	layerHeight();
})
var headerUI = function(){
    //top_gnb_swiper
    $(window).load(function(){
        tabSwiper = $('.hd_gnb_area .swiper-container').swiper({		
            calculateHeight: true,
            slidesPerView: 'auto',
            //resizeReInit: true,
            onFirstInit: function(swiper){
                var $width = swiper.wrapper.clientWidth;
                $(swiper.wrapper).css('width',$width+5);
            },
            onInit: function(swiper){
                var $width = swiper.wrapper.clientWidth;
                $(swiper.wrapper).css('width',$width+5);
            }
        });
    })
    var $tit = $('#title'),
        $container = $('.swiper-container');
        $liTxt = $container.find('span'),
        $btmNavi =  $('.header_btm>ul'),
        $pageTit = $('#pageTit');
    $liTxt.each(function(){
        if($(this).text() == $tit.text()){
            $(this).parents('.swiper-slide').addClass('on');
            tabSwiper.swipeTo($container.find('.swiper-slide.on').index());
        }
    })
    /*
    if($pageTit.length > 0 && !$('#container').hasClass('main')){
		var $current = $.trim($pageTit.text());
		document.title = $current + ' | 경동시장';			//#pageTit 가 title태그에 삽입
    }
    */
    // left_gnb_open
    $('.menu_nav>a').click(function(){
        $('body').addClass('nav_open');
        $btmNavi.find('li.on').removeClass('on')
        $('.menu_nav').addClass('on')
    })
    $('.navClose').click(function(){
        $('body').removeClass('nav_open');
        $('.menu_nav').removeClass('on')
        navUi();
    })
    // gnb submenu_open
    $('.nav_list>ul>li>a').on('click', function(e){
		if(!$(this).hasClass('link')){
			e.preventDefault();
			$(this).next('.sub_menu').stop().slideToggle();
			$(this).parent().toggleClass('on').siblings().removeClass('on').find('.sub_menu').slideUp();
		}
    });
    //container height setting
    var $winH = $(window).height(),
        $headerH = $('#header').outerHeight(),
        $footerH = $('#footer').innerHeight();
        
    if($pageTit.text() == '홈' || $pageTit.text() == '상품문의'|| $pageTit.text() == '주문하기' || $pageTit.text() == '회원' || $pageTit.text() == '에러페이지' || $pageTit.hasClass('header_no')){
        $('#container').css({
            'min-height':Math.max(0,($winH-$headerH-$footerH))
        });
    }else {
        $('#container').css({
            'min-height':Math.max(0,($winH-55))
        });
    }
	navUi();
	//메인검색인풋이동
	$('.main_inp').on('click',function(){
		var $link = $('.sch_nav a').attr('href');
		location.href=$link;
	})

}
var spinnerUi = function(max){
	//spinner
	if ($('.spinner').size() > 0) {

		//max값이 지정되있을때
		if (null != max && 0 < max) {
			$('.spinner').spinner({
				min: 0,
				max: max,
				create: function (event, ui) {
					//add custom classes and icons
					$(this)
						.next().html('<i class="icon icon-plus">더하기</i>')
						.next().html('<i class="icon icon-minus">빼기</i>');
				}
			});
		} else {
			$('.spinner').spinner({
				min: 0,
				create: function (event, ui) {
					//add custom classes and icons
					$(this)
						.next().html('<i class="icon icon-plus">더하기</i>')
						.next().html('<i class="icon icon-minus">빼기</i>');
				}
			});
		}

	}
}
var navUi = function(){
    var $navA = $btmNavi.find('li a');
    //gnb btm on effect
    $navA.each(function(){
        if($(this).text() == $.trim($pageTit.text())){
            $(this).parent('li').addClass('on');
        }
    })
    
}
var btnUi = function(){
    //btn effect
	$(document).on('click', '.prd_link', function(e){
		var $btnEl = $(this),
			$delay = 650,
			$href = $btnEl.attr('href');
		if($href == '#' || $href == '#none')e.preventDefault();

		//if(!$btnEl.hasClass('disabled') && $btnEl.closest('.btn_wrap').size() > 0){
		if(!$btnEl.is('.disabled')){
			if($btnEl.find('.btn_click_in').length == 0) $btnEl.prepend('<i class="btn_click_in"></i>');
			var $btnIn = $btnEl.find('.btn_click_in'),
				$btnMax = Math.max($btnEl.outerWidth(),$btnEl.outerHeight()),
				$btnX = e.pageX - $btnEl.offset().left - $btnMax/2,
				$btnY = e.pageY - $btnEl.offset().top - $btnMax/2;

			$btnIn.css({
				'left':$btnX,
				'top':$btnY,
				'width':$btnMax,
				'height':$btnMax
			}).addClass('animate').delay($delay).queue(function(next){
				$btnIn.remove(); 
				next();
			});
		}
    });
    //footer info toggle
    $('.btn_info_tit').click(function(){
        $('.foot_info').toggleClass('open')
        $('.info_detail').slideToggle();
    })
}
var searchUi = function(){
    $('.sch_inp .input').focus(function(){
        $(this).closest('.sch_inp').addClass('focus');
    }).blur(function(){
        if($(this).val() == ''){
            $(this).closest('.sch_inp').removeClass('focus');
        }
    });
    $('.btnDel').click(function(){
        $(this).prev('.input').val('').focus();
    });
}
function tapMotion(){
	var $tab = $('.tab_motion'),
		$wrap = $('.tab_wrap');
	$tab.on('click','a',function(e) {
		if(!$(this).parent().hasClass('on')){
			var href = $(this).attr('href');		
			$(href).show().siblings('.tab_cont').hide();
			$(this).parent().addClass('on').siblings().removeClass('on');
			$(this).parents('.tabmenu').removeClass('tab_open')
		}else{
			$(this).parents('.tabmenu').toggleClass('tab_open')
		}
		e.preventDefault();
	});
	if($('.tab_motion').size() > 0){
		$(window).load(function(){
			$('.tab_motion').each(function() {
				$(this).children('li').eq(0).children('a').trigger('click');	
			}); 		
		});
	}
}

/* 레이어 팝업 */
var $popSpeed = 300,
	$popOpenBtn = '';
var popupUI = function(){
	$(document).on('click','.ui-pop-open',function(e) {
		e.preventDefault();
		var $pop = $(this).attr('href');
		popOpen($pop,this);
	});
	$(document).on('click','.ui-pop-close',function(e) {
		e.preventDefault();
		var $pop = $(this).closest('.pop_wrap');
		popClose($pop);
	});

	/*
	//팝업 bg 클릭시 닫힘 기능
	$('.pop_wrap').on('click',function(){
		var $pop = $(this);
		if(!$pop.hasClass('close_none')){popClose($pop);} 	//배경 클릭시 안닫히게 할때는 close_none 클래스 추가로 처리
	}).on('click','.popup',function(e) {
		e.stopPropagation();
	});
	*/
};
var popOpen = function(tar,btn){
	if($(tar).length < 1 || $(tar).children('.popup').length < 1) return console.log('해당팝업없음');
	var $visible = $('.pop_wrap:visible').size();
	if(btn != null || btn != window)$popOpenBtn = $(btn);
	if($visible > 0){
		$(tar).css('z-index','+='+$visible);
	}
	$('body').addClass('pop_open');	
	$(tar).fadeIn($popSpeed,function(){
		$(this).attr({'tabindex':0}).focus();
	});
};
var popClose = function(tar){
	var $visible = $('.pop_wrap:visible').size();
	if($visible == 1){
		$('body').removeClass('pop_open');
	}
	$(tar).find('.popup').animate({'margin-top':0},$popSpeed,function(){
		$(this).removeAttr('style');
	});
	$(tar).fadeOut($popSpeed,function(){
		$(tar).removeAttr('tabindex');
		if($popOpenBtn != ''){
			if($popOpenBtn != window){
				$popOpenBtn.focus();
			}
			$popOpenBtn = '';
		}
	});
};
//pink alert 
var popAlertMoment = function(txt){
    $('body').append('<div id="alertMoment" class="pop_alert"><p>'+txt+'</p></div>');
	var $alert = $(document).find('#alertMoment');
	$alert.show();
	setTimeout(function(){$alert.fadeOut();},3000);
	setTimeout(function(){$alert.remove();},4000);
}
var etcUI = function(){
	//faq_list
	$(document).on('click','.faq-ui > li > a',function(e){
		e.preventDefault();
		$(this).next('div').slideToggle(300).parent().toggleClass('on').siblings('li').removeClass('on').children('div').slideUp(300);
	});
	var $li =  $(document).find('.terms_cont li');
	if($li.length >= 1){
		$($li).each(function(){
			var $thisNum = $(this).index()+1;
			$(this).find('i').text($thisNum);
		})
	}
};
//공통 안내 팝업
function popAlert(msg, func){
	var tar = '#popAlert';
	var $speed = 300,
		$ease = 'easeOutQuart',
		$pop = $(tar).find('.pop_wrap');
	var $wrapH,$popH,$mT
	
	if(msg !== undefined){
		$('#alert_msg').html(msg);
	}
	if(func !== undefined){
		$('#alert_func').attr('onclick', func);
	}
	
	// 7번가 버전
	// $('body').addClass('hidden');
	// 경동시장 버전
	$('body').addClass('pop_open');
	$(tar).fadeIn($speed);
	$(tar).css('z-index', 600);
}
// slide layer pop height control
var layerHeight = function(){
	$(window).on('load resize',function(){
		var $winH = $(window).outerHeight() / 4 * 3,
		$layerP = $('.layer_inner');
		$layerP.each(function(){
			var $layerH = $(this).outerHeight();
			if($winH < $layerH){
				$(this).css({'max-height':$winH});
			}
		}) 
	})
}