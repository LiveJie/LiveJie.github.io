$(function(){
	init();
})
function init(){
	//视频
	audio();
	//banner图
	banner();
	//导航栏
	nav();
	//搜索框
	search();
	//楼梯 下拉搜索框
	scrollT();
}
//登录 注册
$("#lete_login").click(function(){
	$('.regist-btn').trigger("click");
	$("#login_zhezhao").show();
	$("body").css({
		height:'100%',
		overflow:'hidden'
	})
})
$("#lete_register").click(function(){
	$('.login-btn').trigger("click");
	$("#login_zhezhao").show();
})
$(".packet").click(function(){
	$('.login-btn').trigger("click");
	$("#login_zhezhao").show();
})
/* 登录按钮被点击 */
$('.login-btn').on('click', function() {
	$('.regist-btn').removeClass('active');
	$(this).addClass('active');
	$(this).find('label').hide();
	$('.content').css('left', '-372px');
})
/* 注册按钮被点击 */
$('.regist-btn').on('click', function() {
	$('.login-btn').removeClass('active');
	$(this).addClass('active');
	$('.login-btn').find('label').show();
	$('.content').css('left', '0');
})
/* 保持登录按钮被点击切换状态 */
$('.keep-login').on('click', function() {
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
	} else {
		$(this).addClass('active');
	}
})
$("#yunfei_tap11").on("click", function() {
	$(".yunfei-search-form-main-top11").removeClass("lete-active");
	$(this).addClass("lete-active");
	$(".yunfei-search-form-main-content11").hide();
	$("#yunfei-content11").show();
})
$("#yunfei_tap12").on("click", function() {
	$(".yunfei-search-form-main-top11").removeClass("lete-active");
	$(this).addClass("lete-active");
	$(".yunfei-search-form-main-content11").hide();
	$("#yunfei-content12").show();
})
$("#yunfei_tap13").on("click", function() {
	$(".yunfei-search-form-main-top11").removeClass("lete-active");
	$(this).addClass("lete-active");
	$(".yunfei-search-form-main-content11").hide();
	$("#yunfei-content13").show();
})
$("#yunfei_tap14").on("click", function() {
	$(".yunfei-search-form-main-top11").removeClass("lete-active");
	$(this).addClass("lete-active");
	$(".yunfei-search-form-main-content11").hide();
	$("#yunfei-content14").show();
})
$("#yunfei_tap15").on("click", function() {
	$(".yunfei-search-form-main-top11").removeClass("lete-active");
	$(this).addClass("lete-active");
	$(".yunfei-search-form-main-content11").hide();
	$("#yunfei-content15").show();
})
$(".yunfei-search-form-main").on("click", "a", function() {
	$("#address").val($(this).text());
	$("#address").attr("data-text",$(this).attr("data-text"));
	$(".yunfei-search-form-main").hide();
	$("#address").css("background-position", "right 12px")
})
$("#address").on("click", function() {
	if($(".yunfei-search-form-main").css("display") == "none") {
		$(".yunfei-search-form-main").show();
		$(this).css("background-position", "right -15px")
	} else {
		$(".yunfei-search-form-main").hide();
		$(this).css("background-position", "right 12px")
	}
})
$("#register_tap").on("click",function(){
	$("#register_tap").addClass("active");
	$("#login_tap").removeClass("active");
	$(".register_div").css("display","block");
	$(".login_div").css("display","none");
	 
})
$("#login_tap").on("click",function(){
	$("#login_tap").addClass("active");
	$("#register_tap").removeClass("active");
	$(".login_div").css("display","block");
	$(".register_div").css("display","none");
	 
})
function change_type(id){
	var type;
	type=$("#"+id).parent().children("input").attr("type");
	if(type=='password'){
		$("#"+id).parent().children("input").attr("type","text");
		$("#"+id).children("img").attr("src","themes/new_lete/mall/images/open-eye.png")
	}else{
		$("#"+id).parent().children("input").attr("type","password");
		$("#"+id).children("img").attr("src","themes/new_lete/mall/images/moustache.png")
	}
}
//显示登录注册页面
$("#cancel").on("click",function(){
	$("#login_zhezhao").css("display","none");
	$("body").css({
		height:'100%',
		overflow:'auto'
	})
})
//banner开始
function banner(){
	var _index;
	var timer = setInterval(change,3000);
	var index = 0;
	var length = $("#banner").find("li").length;
	$("#banner").find("li").click(function(){
		_index = $(this).index();
		index = _index;
		$(this).addClass('on').siblings().removeClass('on');
		$(".l_top").find("img").hide().eq(_index).fadeIn("slow");
	})
	//自动轮播
	function change(){
		//小按钮自动向前
		index++;
		//判断边界
		if(index > length-1)index=0;
		$(".btn").eq(index).addClass('on').siblings().removeClass('on');
		$(".btn_img").hide().eq(index).fadeIn("slow");
	}
	//经过停止
	$(".l_top").mouseover(function(){
		clearInterval(timer);
	})
	$(".l_top").mouseout(function(){
		timer = setInterval(change,3000);
	})

}
window.onresize = function(){
	var $w = $(window).width();
	var $t = $(window).scrollTop();
	$w>1350&&$t>=1045?$("#move_left .m_ul").show("show"):$("#move_left .m_ul").hide("show")
}
function scrollT(){
	$(window).scroll(function(){
		var $t = $(this).scrollTop();
		$t>=700?$("#move_nav").css("top",0):$("#move_nav").css("top",-80);
		$(window).width() > 1350 && $t>=1045?$("#move_left .m_ul").show("show"):$("#move_left .m_ul").hide("show");
		//1145 1675 2205 2735 3265 3795 4325 4855 5345  all-200
		if($t > 1030){
			$("#move_ul").find("li").eq(1).css("background","#974676").siblings().css("background","");
		}
		if($t > 1475){
			$("#move_ul").find("li").eq(2).css("background","#9548AD").siblings().css("background","");
		}
		if($t > 2005){
			$("#move_ul").find("li").eq(3).css("background","#EEB924").siblings().css("background","");
		}
		if($t > 2535){
			$("#move_ul").find("li").eq(4).css("background","#4897AC").siblings().css("background","");
		}
		if($t > 3065){
			$("#move_ul").find("li").eq(5).css("background","#246DEE").siblings().css("background","");
		}
		if($t > 3595){
			$("#move_ul").find("li").eq(6).css("background","#476DAC").siblings().css("background","");
		}
		if($t > 4125){
			$("#move_ul").find("li").eq(7).css("background","#EE2467").siblings().css("background","");
		}
		if($t > 4655){
			$("#move_ul").find("li").eq(8).css("background","#AD4895").siblings().css("background","");
		}
		if($t > 5145){
			$("#move_ul").find("li").eq(9).css("background","#000").siblings().css("background","");
		}
	})
}
//左边导航栏 //1145 1675 2205 1735 3265 3795 4325 4855 5345
function nav(){
	var oLi = $("#move_ul").children();
	var length = oLi.length;
	$("#move_ul").find("li").click(function(){
	var index = $(this).index();
	switch(index){
		case 1:
		$("body,html").animate({"scrollTop":1145},200);
		break;
		case 2:
		$("body,html").animate({"scrollTop":1675},200);
		break;
		case 3:
		$("body,html").animate({"scrollTop":2205},200);
		break;
		case 4:
		$("body,html").animate({"scrollTop":2735},200);
		break;
		case 5:
		$("body,html").animate({"scrollTop":3265},200);
		break;
		case 6:
		$("body,html").animate({"scrollTop":3795},200);
		break;
		case 7:
		$("body,html").animate({"scrollTop":4325},200);
		break;
		case 8:
		$("body,html").animate({"scrollTop":4855},200);
		break;
		case 9:
		$("body,html").animate({"scrollTop":5345},200);
		break;
		case 10:
		$("body,html").animate({"scrollTop":0},300);
		break;
	}
	})
}

//audio自动切换图片
function audio(){
	var timer = setInterval(change,3000);
	var len = $(".c_list").children();
	var index = 0;	
	function change(){
		index++;
		if(index==3){
			$(".c_list").animate({"left":-480});	
			$(".c_next").hide();
			$(".c_pre").show();
		}
		if(index>=len.length){
			index = 0;
			$(".c_list").animate({"left":0});
			$(".c_next").show();
			$(".c_pre").hide();
		}
		$(".c_play").find("img").hide().eq(index).fadeIn("show");
	}
	
	//经过切换
	$(".c_img").mouseenter(function(){
		var _index = $(this).index();
		index = _index;
		clearInterval(timer);
		//图片联动大图片
		$(this).parents(".c_audio").find(".c_play").find("img").hide().eq(_index).fadeIn("show");
	})
	$(".c_box").mouseleave(function(){
		timer = setInterval(change,3000);
	});
	$(".c_play").mouseenter(function(){
		clearInterval(timer);
	})
	$(".c_play").mouseleave(function(){
		timer = setInterval(change,3000);
	})
	//点击下一页
	$(".c_next").click(function(){
		$(".c_list").animate({"left":-480});
		$(this).hide();
		$(".c_pre").show();
	})
	//点击上一页
	$(".c_pre").click(function(){
		$(".c_list").animate({"left":0});
		$(this).hide();
		$(".c_next").show();
	})
	//audio 新闻
	var times = setInterval(up,5000);
	var clength = $("#c_up").children().length;
	var i = 0;
	function up(){
	i++;
	if(i>clength-1)i=0;
		$("#c_up").animate({"top":-41*i});
	}
	$(".c_new").mouseover(function(){
		clearInterval(times);
	})
	$(".c_new").mouseout(function(){
		times = setInterval(up,5000);
	})

}
//search start
var oSearch = document.getElementById("s_search");
var oList = document.getElementById("s_list");
var oS;
function search(){
	oSearch.onfocus = function(){
		oList.style.display = "block";
	}
	oSearch.onblur = function(){
		oList.style.display = "none";
	}
	oSearch.onkeyup = function(){
		var val = this.value;
		oS = document.createElement("script");
		oS.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+val+"&cb=fly";
		document.body.appendChild(oS);
	}
}
function fly ( mJson ){
	var s = mJson.s;
	var l = s.length;
	l = Math.min(l,4);
	oList.innerHTML = "";
	for(var i=0;i<l;i++)
	{
		oList.innerHTML += "<li><a href='https://www.baidu.com/s?wd="+s[i]+"'target='_blank''>"+s[i]+"</a></li>";
	}
	if(oS.parentNode)
	{
		document.body.removeChild(oS);
	}
}

