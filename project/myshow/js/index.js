	window.onload = function(){
	setTimeout(function(){
		$(document).scrollTop(0);
	},50);
	var $part  = $(".part");
	var $li = $("#list li");
	var w = $(window).width();
	ph();
	function ph(){
		w = $(window).width();
		var h = $(window).height();
		if(w<=600){
			$(".part").css("height",h+'px')
		}
	}
	//屏幕改变时候
	$(window).resize(function(){
		ph();
	});
	//头部导航点击
	$(".s-span").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		if($(this).hasClass('change')){
			$(this).removeClass('change');
			$("#list").fadeOut();
		}else{
			$(this).addClass('change');
			$("#list").fadeIn();
		}
	})
	//绑定touch事件
	var oBox = document.getElementById("#wrap");
    var y, Y, dell,top,_index = 0;
    var h = $(window).height();
	$part.each(function(i){
		$part[i].addEventListener('touchstart',function(e){
			$(".s-span").removeClass('change');
			$("#list").fadeOut();
			_index = $(this).index();
			var e = e || window.event;
			var top = $("#wrap").offset().top;
		  	y = e.changedTouches[0].clientY;
			document.addEventListener('touchmove',function(c){
				c.preventDefault();
    			c.stopPropagation();
				var h = $(window).height();
				var maxh = h * 5;
				var c = c || window.event;
				Y = event.changedTouches[0].clientY;
			    dell = Y - y;
			    var l = top + dell;
				//$("#wrap").css("top", " "+ l + "px");
				$("#wrap").animate({'top':""+ l + "px"},0);
				if($("#wrap").offset().top>0){
					$("#wrap").css("top", 0);
				}
				if(Math.abs($("#wrap").offset().top)>=maxh){
					$("#wrap").css("top", " "+ -maxh + "px");
				}
			});
			document.addEventListener('touchend',function(c){
				var h = $(window).height();
				if(Math.abs(dell)>20){
					if(dell<0){
						if(_index==4){
							priInter();
							$(".footer").hide();
						}
						_index++;
						if(_index>5)_index=5;
					}else{
						$(".footer").show();
						_index--
						if(_index<=0)_index=0
					}
					$("#wrap").css("top", " "+ (-h*_index) + "px");
				}else{
					return
				}
				var text = $li.eq(_index).attr("data-id");
				$(".s-span").text(text);
				$(".l-em").removeClass('color');
				$(".l-em").eq(_index).addClass("color");
				dell=null;
			});
	});
	});
	(function(){
		$part.append('<div class="logo"></div>');
		$(".l-box").mouseover(function(){
			$(this).next(".l-left").addClass('l-on');
		})
		$(".l-box").mouseout(function(){
			$(this).next(".l-left").removeClass('l-on');
		});
	})();
	//页面滚动
	(function(){
		var index = 0;
		var nowTime = new Date();
		var wH = $(window).height();
		$(window).resize(function(){
			wH = $(window).height();
		});
		$li.click(function(){
			var text = $(this).attr("data-id");
			var h = $(window).height();
			$(".s-span").text(text);
			index = $(this).index();
			if(w>600){
				move();
			}else{
				$("#wrap").css("top", " "+ (-h*index) + "px");
				$(".l-em").removeClass('color');
				$(this).find(".l-em").addClass("color");
			}
			if(index==5){
				priInter();
			}
			//模拟点击
			$(".s-span").trigger("click");
		});
		$(document).mousewheel(function(){
			if(new Date() - nowTime > 500 ){
				nowTime = new Date();
				var d = arguments[1];
				d<0?(index >= $li.length-1 ? index = ($li.length-1):index++):(index <= 0 ? index = 0 : index --);
				if(index == 3){
					$(".p4-box").addClass('lr');
				}
				move();
			}
		});
		function move(){
			$(".l-box").removeClass('l-add');
			$li.eq(index).find(".l-box").addClass('l-add');
			$("body,html").animate({
				scrollTop:index * wH
			},500);
			if(index == $li.length-1){
				priInter();
			}
		};
	})();

		var wrap = document.getElementById("print");
		var arr = [];
        arr.push('偏爱前端,期待未来');
        arr.push('注重效率,偏爱敏捷开发');
        arr.push('喜欢尝试,期待新鲜事物');
        arr.push('良好的笔记习惯');
        arr.push('利用休闲时间充电');
        arr.push('带上我吧,我需要一个舞台');
        arr.push('感谢查看');
        var arrL = arr.length;
        var index = 0;
        var post = 0;
        var timer = null;
        var html = "";
        var row = 0;
	    var L = arr[0].length;
        function priInter(){
        	while(row<index){
        		html += arr[row++] + '<br/>';
        	}
        	wrap.innerHTML = html + arr[index].substring(0,post);
        	if(L==post){
    			index++;
    			post = 0;
        		if(index<arrL){
	        		L = arr[index].length;
        			timer = setTimeout(priInter,150);
        		}else{
        			clearTimeout(timer);
        			index = 0;
        			post = 0;
        			row = 0;
        			html = "";
        		}
        	}else{
        		post++;
        		timer = setTimeout(priInter,100);
        	}
        }
		
	}