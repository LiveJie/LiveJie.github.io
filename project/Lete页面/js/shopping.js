$(document).ready(function() {
	init();
});
function init(){
	search();
	infoTab();
	number();
}
var oSearch = document.getElementById("s_search");
var oList = document.getElementById("s_list");
var oS;
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

function search(){
//search start
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
//加减 items_sub -  items_num  items_add+
function number(){
	var $num = $(".items_num").val();
	$(".items_sub").click(function(){
		$num = $(".items_num").val();
		$num--;
		if($num<=1)$num=1;
		$(".items_num").val($num);
	})
	$(".items_add").click(function(){
		$num = $(".items_num").val();
		$num++;
		$(".items_num").val($num);
	})
}
//点击选择样式 添加class
$(".items_colors").click(function(){
	$(".items_colors").removeClass("items_colors_on");
	$(this).addClass('items_colors_on');
})
$(".items_num_box").find("span").click(function(){
	if($(this).hasClass('num_no_choose')) return;
	$(".items_num_box").find("span").removeClass('num_on');
	$(this).addClass('num_on');
})
//信息转换
function infoTab(){
	$("#else_tab").find("li").mouseover(function(){
		$(this).css({
			background: '#fff',
			borderBottom:'0',
			borderLeft:'1px solid #dd2727',
			borderTop:'3px solid #dd2727',
		}).siblings().css({
			background:'#F7F7F7',
			color:'#000',
			border:'1px solid #d2d2d2',
			borderRight:'0'
		})
		$(".else_espacially").css({
			borderRight:'1px solid #d2d2d2'
		})
		$("#else_tab").find("div").hide();
		$(this).find("div").show();
	})
}
//购物车显示删除
$(".c_com_list").mouseover(function(){
	$(".c_com_del").hide();
	$(this).find(".c_com_del").show();
})
$(".c_com_list").mouseout(function(){
	$(".c_com_del").hide();
})
$(".c_com_del").click(function(){
	$(this).parents(".c_com_list").remove();
})
