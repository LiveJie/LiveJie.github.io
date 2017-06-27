	//search start
		var oSearch = document.getElementById("s_search");
		var oList = document.getElementById("s_list");
		var oS;
		oSearch.onfocus = function(){
			oList.style.display = "block";
		}
		oSearch.onblur = function(){
			oList.style.display = "none";
		}
		oSearch.onkeyup = function(){
			var val = this.value;
			oSearch.style.color = getColor();
			oS = document.createElement("script");
			oS.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+val+"&cb=fly";
			document.body.appendChild(oS);
		}
	function fly ( mJson ){
		var s = mJson.s;
		var l = s.length;
		l = Math.min(l,4);
		oList.innerHTML = "";
		for(var i=0;i<l;i++)
		{
			oList.innerHTML += "<li><a href='https://www.baidu.com/s?wd="+s[i]+"'target='_blank' style='color:"+getColor()+"'>"+s[i]+"</a></li>";
		}
			if(oS.parentNode)
			{
				document.body.removeChild(oS);
			}
		}
	function getColor(){
		var r = parseInt(Math.random()*256);
		var g = parseInt(Math.random()*256);
		var b = parseInt(Math.random()*256);
		return "rgb("+r+","+g+","+b+")";
	}
$(function(){
	var width , a = true;/* 300  700  1100 1420*/
/*点击自动跑到相对应的地方*/
$(".left_nav_box").children().click(function(){
	var index = $(this).index();
	switch(index){
		case 0:$(window).scrollTop(300);
		break;
		case 1:$(window).scrollTop(700);
		break;
		case 2:$(window).scrollTop(1100);
		break;
		case 3:$(window).scrollTop(1420);
		break;
	}
	width = $(this).width();
})
//nav 进出效果
	$(".left_box").mouseenter(function(){
		width = $(this).width();
		var $color = $(this).attr("data-color");
		$(".box_text").hide()
		if(width=="30"){
			$(this).find(".box_icon").hide();
			$(this).css({
				transition:'0.5s',
				width:'60',
				borderRadius: '30',
				background:$color
			})
			$(this).find(".box_text").show().css({
				transition:'0.5s',
				width:'60',
				opacity:'1'
			});
		}else if(width == "60"){
			$(this).find(".box_icon").hide();
			$(this).find(".box_text").show()
		}

	})

	$(".left_box").mouseleave(function(){
			$(".box_text").hide();
			if(width=="30"){
				$(this).find(".box_icon").show();
				$(this).css({
					transition:'0.5s',
					width:'30',
					borderRadius: '30',
					background:'#f2f2f2'
				})
			}else{width > 35}{
				$(this).find(".box_icon").show();
			}
	})
})
	//导航随动
	$(window).scroll(function(){
		var sTop = $(window).scrollTop();
		console.log(sTop);
		(sTop>="300") ? $(".left_nav_box").show() : $(".left_nav_box").hide();
		if(sTop>='300' && sTop < '700'){
			var $color = $(".left_box").eq(0).attr("data-color");
			$(".left_box").eq(0).css({
				backgroundColor:$color,
				lineHeight:'60px',
				width:'60px',
				height:'60px'
			}).siblings().css({
				lineHeight:'30px',
				width:'30px',
				height:'30px',
				backgroundColor:'#d2d2d2',
			})
			$(".left_box").eq(0).find("i").css({
				color:"#fff"
			})
		}
		if(sTop >= "700" && sTop < '1100'){
			var $color = $(".left_box").eq(1).attr("data-color");
			$(".left_box").eq(1).css({
				lineHeight:'60px',
				width:'60px',
				height:'60px',
				backgroundColor:$color,
			}).siblings().css({
				lineHeight:'30px',
				width:'30px',
				height:'30px',
				backgroundColor:'#d2d2d2',
			}).find(".box_text").show();
			$(".left_box").eq(1).find("i").css({
				color:"#fff"
			})
		}
		if(sTop >= "1100" && sTop < '1420'){
			var $color = $(".left_box").eq(2).attr("data-color");
			$(".left_box").eq(2).css({
				lineHeight:'60px',
				width:'60px',
				height:'60px',
				backgroundColor:$color,
			}).siblings().css({
				lineHeight:'30px',
				width:'30px',
				height:'30px',
				backgroundColor:'#d2d2d2',
			}).find(".box_text").show();
			$(".left_box").eq(2).find("i").css({
				color:"#fff"
			})
		}else if(sTop >= '1420'){
			var $color = $(".left_box").eq(3).attr("data-color");
			$(".left_box").eq(3).css({
				lineHeight:'60px',
				width:'60px',
				height:'60px',
				backgroundColor:$color,
			}).siblings().css({
				lineHeight:'30px',
				width:'30px',
				height:'30px',
				backgroundColor:'#d2d2d2',
			}).find(".box_text").show();
			$(".left_box").eq(3).find("i").css({
				color:"#fff"
			})
		}

	})