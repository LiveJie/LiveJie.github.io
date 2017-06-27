		//右侧导航条提示.r_img .r_slider
		$(".r_img").mouseenter(function(){
			$(this).find(".r_slider").css("display","block").animate({"left":-100})
		})
		$(".r_img").mouseleave(function(){
			$(this).find(".r_slider").css("display","none").animate({"left":-150})
		})
		//购物车
		$(".r_buy").click(function(){
			//购物车伸缩
			var left = $("#right_nav").css("right");
			(parseInt(left)==0)?$("#right_nav").animate({"right":-265}):$("#right_nav").animate({"right":-0});
		})
		/*
			<li><a href="javascript:;"><img src="images/l11.jpg" width="80" height="80" alt="" /><span>￥ 500</span></a></li>
		*/
		//点击购买添加到购物车
		$(".c_add").click(function(e){
			console.log($(".r_buy").offset())
			var carSrc = $(this).parent().find("img").attr("src");
			var carPrice = $(this).parent().find(".c_price span").text();
			//添加到右侧购车
			$(".r_module").append("<li><a href='javascript:;'><img src='"+carSrc+"' width='80' height='80' alt='' /><span>￥ "+carPrice+"</span></a></li>")
			addProduct(e);
		})
		// 添加抛物线
		function addProduct(event){
			// 设置落脚点
			var offset = $(".r_buy").offset();
			// 获取购物车的top属性
			var bTop = parseInt($(".r_ul").css("top"));
			// 获取当前点击的js对象
			var src = $(event.target).parent().find("img").attr("src");
			var flyer = $("<img src='"+src+"' alt='预览图' width='50' height='50' class='fly'/>");
			flyer.fly({
				start:{
					left:event.clientX,
					top:event.clientY
				},
				end:{
					left:offset.left,
					top:bTop+63,//150 63
					width:20,
					height:20
				},
				onEnd:function(){
					flyer.fadeOut("slow",function(){
						$(this).remove();
					});
				}
			
			});
		}
	//audio自动切换图片
		var timer = setInterval(change,1000);
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
			$(".c_list .c_img").eq(index).find(".c_img_list").css({"display":"block"}).parents(".c_img").siblings().find(".c_img_list").css({"display":"none"});
			$(".c_play").find(".c_pic").eq(index).fadeIn("show").siblings().hide();
			$(".c_play").find(".c_mag").css({"display":"block"});	 
		}
		
		//经过切换
		$(".c_list").find(".c_img").mouseenter(function(){
			var _index = $(this).index();
			index = _index;
			clearInterval(timer);
			//小audio图标
			$(this).find(".c_img_list").css({"display":"block"}).parents(".c_img").siblings().find(".c_img_list").css({"display":"none"});
			//图片联动大图片
			$(".c_play").find(".c_pic").eq(_index).fadeIn("show").siblings().hide();
			$(".c_play").find(".c_mag").css({"display":"block"});	
			console.log(_index)
		})
		$(".c_list").mouseleave(function(){
			timer = setInterval(change,1000);
		});
		
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
		var times = setInterval(up,2000);
		var clength = $("#c_up").children().length;
		var i = 0;
		function up(){
		i++;
		if(i>clength-1)i=0;
			$("#c_up").animate({"top":-41*i});
		}
		//左边导航栏 //1510 2166  2704  3338  3838  4360
		var oLi = $("#move_ul").children();
		var length = oLi.length;
			$("#move_ul").find("li").click(function(){
			var index = $(this).index();
			switch(index){
				case 1:
				$("body,html").animate({"scrollTop":2166},200);
				$(this).css("background","#EA5F8D").siblings().css("background","");
				break;
				case 2:
				$("body,html").animate({"scrollTop":2704},200);
				$(this).css("background","#64C333").siblings().css("background","");
				break;
				case 3:
				$("body,html").animate({"scrollTop":3338},200);
				$(this).css("background","#19C8A9").siblings().css("background","");
				break;
				case 4:
				$("body,html").animate({"scrollTop":3838},200);
				$(this).css("background","#5D05A9").siblings().css("background","");
				break;
				case 5:
				$("body,html").animate({"scrollTop":4365},200);
				$(this).css("background","#000").siblings().css("background","");
				break;
				case 6:
				$("body,html").animate({"scrollTop":0},300);
				break;
			}
			})	
		//左边导航栏新闻
		//.d_tbox .slide_item
		var dTime = setInterval(dChange,2000);
		var aindex = 0;
		function dChange(){
			aindex++;
			if(aindex>=3)aindex = 0;
			$(".d_tbox").animate({"top":-25*aindex});
		};
		//nav-top start
		$("#r_top").click(function(){
			$("body,html").animate({"scrollTop":0},300);
		})
		//nav-top end
		//move search
		$(function(){
			$(window).scroll(function(){
				console.log($(window).innerHeight());
				console.log($(".r_buy").offset().top)
				$(this).scrollTop()>=700?$("#move_nav").css("top",0):$("#move_nav").css("top",-50);
				$(this).scrollTop()>=1520?$("#move_left .m_ul").show("show"):$("#move_left .m_ul").hide("show");
			})
		});
		//banner start

		$(function(){
			var index = 0;
				$("#b_ul li").mouseover(function(){
					clearInterval(timer);
					$(this).addClass("b_on").siblings().removeClass("b_on");
					index = $(this).index();
					$(".b_box li").eq(index).fadeIn("show").siblings().hide();
					var background = $("#b_ul li").eq(index).data("a");
					$(".m_banner").css("background",background);
					
				});
			var timer = setInterval(time,2000);
			function time(){
			index++;
			var len = $("#b_ul li").length;
			if(index>=len)index = 0;
			$("#b_ul li").eq(index).addClass("b_on").siblings().removeClass("b_on");
			
			$(".b_box li").eq(index).fadeIn("show").siblings().hide();
			var background = $("#b_ul li").eq(index).data("a");
			$(".m_banner").css("background",background);
			}
			$(".b_box").mouseenter(function(){
				clearInterval(timer);
			});
			$(".b_box").mouseleave(function(){
				timer = setInterval(time,2000);
			});
			
		});
		//banner end
				/*搜索引擎*/
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