	$(function(){
		//先定义每个图片距离

		var fx = 400 , fy = 400 ,fz = 800;
		var firstX = -2*fx;//定义第一个li的水平位移
		var firstY = -2*fy;//定义第一个li的垂直位移
		var firstZ = -2*fz;//定义第一个li的z位移
		var oM = $("#main");//获取节点
		var total=125;//
		init();
		function init(){
		for(var i=0;i<total;i++){
			var j=i;
			j = j%40;
			j++;
			var oLi = $("<li><img src='image/"+j+".jpg' width='120' height='160'></li>");//定义一个子标签
			//开始杂乱排序
			var x = (Math.random()-0.5)*5000;
			var y = (Math.random()-0.5)*5000;
			var z = (Math.random()-0.5)*5000;
			oLi.css({
				'transform':'translate3d('+x+'px,'+y+'px,'+z+'px)'
			});
			$("#main").append(oLi);
		}	
			setTimeout(function(){
				startP();
			},200);
			$("#styleBtn li").click(function(){
				var index = $(this).index();
				switch(index){
					case 0:
					Name();
					break;
					case 1:
					Sphere();
					break;
					case 2:
					Helix();
					break;
					case 3:
					startP();
					break;
				}
			})
		}
		//队列动画
		function startP(){
			$("#main li").each(function(i){//遍历数组 给每个li添加样式
				var xi = (i % 25) % 5 ;//满行重置
				var yi = parseInt((i % 25) / 5);
				var zi = parseInt(i / 25);
				$(this).css({
					transform:'translate3d('+(firstX+xi*fx)+'px,'+(firstY+yi*fy)+'px,'+(firstZ+zi*fz)+'px)',
					'transition':'3s ease-in-out'
				});
			});
		}
		//螺旋动画
		function Helix(){
			var roY = 10,tY =10;//考虑到长度是动态的 要保证动画是居中显示：保证中间的Y轴位移位移为0，根据中间为中心来排列
			var midLi = Math.floor($("#main li").length / 2);//找中间数
			var firstY = -10*midLi;//开始的位置
			$("#main li").each(function(i){//遍历数组 给每个li添加样式
				$(this).css({
					'transform':'rotateY('+(roY*i)+'deg) translateY('+(firstY+tY*i)+'px)  translateZ(1000px)'
				});
			});
		}
		//拖拽翻滚
		(function(){
			var nowX , lastX , difX=0 ,nowY , lastY , difY=0 ;//记录每次触发的数据  disX,disY=0 防止mouseover不触发undefild;
			var rotY=0 , rotX = 0 , tz = -2000;
			var timer1 , timer2;
			$(document).mousedown(function(e){
				e = e || window.event;
				lastX = e.clientX;//坐标
				lastY = e.clientY;
				$(this).on("mousemove",function(e){
					e = e || event;
					nowX = e.clientX;
					nowY = e.clientY;
					difX = nowX - lastX;//距离差
					difY = nowY - lastY;
					rotY += difX*0.05;
					rotX -= difY*0.05;
					$("#main").css({
						'transform' : 'translateZ('+ tz +'px) rotateX('+rotX+'deg) rotateY('+ rotY +'deg)'
					});
					lastX = nowX;//存放之前的位置
					lastY = nowY;
					return false;
			})
			}).mouseup(function(){
				$(this).off("mousemove");	
				timer1 = setInterval(function(){
					difX *= 0.95;//距离差
					difY *= 0.95;
					if(Math.abs(difX) < 0.5 && Math.abs(difY) < 0.5 )//Math平均数
					clearInterval( timer1 );
					console.log(difX);
					rotY += difX*0.05;
					rotX -= difY*0.05;
					$("#main").css({
						'transform' : 'translateZ('+ tz +'px) rotateX('+rotX+'deg) rotateY('+ rotY +'deg)'
					});
				},25)
			}).mousewheel(function( e , d ){//触发滚轮事件 d表示方向
				clearInterval( timer2 );
				timer2 = setInterval(function(){
					d *= 0.9;//滚动的距离
					if(Math.abs(d)<0.01)
					clearInterval( timer2 );
					tz += d*80;//累加每次移动80
					tz = Math.min( tz, 0);
					tz = Math.max( tz, -5000);
					console.log(tz);
					$("#main").css({
						'transform':'translateZ('+ tz +'px) rotateX('+rotX+'deg) rotateY('+ rotY +'deg)'
					})
				},25)
			});

		})();
		//圆形效果
	function Sphere(){
		var arr = [1,4,8,10,12,17,22,16,14,9,6,5,1];//设置球形的层级数量
		var roX = 180/arr.length;//得出每层的平均角度
		var fisrtRoX = 90;//初始的角度
		$('#main li').each(function(j){
			var sum = 0;
			var index , num;//index层  //num项的总和
			for ( var i=0;i<arr.length;i++ )
			{
				sum += arr[i];//当sum大于数组的值则变成下一层
				if ( sum >= j+1 )//根据等差数列公式//当前面的和大于后面的值才跳到下一层
				{
					index = i;//存储当前的项数
					num = arr[i] - (sum-j);//另num等于每层个数减去第几个
					break;
				}
			}
			var roY = 360/arr[index];//y轴的位移值
			var x = index%2?fisrtRoX+index*roX:fisrtRoX-index*roX;//判断层级的奇偶
			var y = num*roY;//同一层y轴旋转角度
			var z = 0;//定义初始角度
			if ( x > 90 && x < 270 )//判断边界  防止图片翻转
			{
				z = 180;
			}
			$(this).css({
				transform : 'rotateY('+y+'deg) rotateX('+x+'deg) rotateZ('+z+'deg) translateZ(800px)'//先旋转后位移
			});
		});
	}

	function Name(){

		var tX = 160 , tY = 200;//设置位移距离
		var firstX = -9*tX + 60;//设置左上角位置
		var firstY = -4*tY;//设置左上角位置
		var arr = [			//设置前面18个的位置
			//中间
			{x:firstX+9*tX , y:firstY+tY*2 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*5 },
			{x:firstX+9*tX , y:firstY+tY*6 },
			{x:firstX+9*tX , y:firstY+tY*7 },
			{x:firstX+9*tX , y:firstY+tY*8 },
			//5
			{x:firstX+9*tX,y:firstY},
			{x:firstX+9*tX,y:firstY},
			{x:firstX+9*tX, y:firstY+tY },
			{x:firstX+9*tX, y:firstY+tY},
			{x:firstX+9*tX , y:firstY+tY },
			{x:firstX+9*tX , y:firstY+tY },
			{x:firstX+9*tX , y:firstY+tY },
			{x:firstX+9*tX , y:firstY+tY },
			{x:firstX+9*tX , y:firstY+tY },
			//9
			//第三行
			{x:firstX+3*tX, y:firstY+tY*3 },
			{x:firstX+4*tX, y:firstY+tY*3 },
			{x:firstX+5*tX, y:firstY+tY*3 },
			{x:firstX+6*tX, y:firstY+tY*3},
			{x:firstX+7*tX , y:firstY+tY*3 },
			{x:firstX+8*tX , y:firstY+tY*3 },
			{x:firstX+9*tX , y:firstY+tY*3 },
			{x:firstX+10*tX , y:firstY+tY*3 },
			{x:firstX+11*tX , y:firstY+tY*3 },
			{x:firstX+12*tX , y:firstY+tY*3 },
			{x:firstX+13*tX , y:firstY+tY*3 },
			{x:firstX+14*tX , y:firstY+tY*3 },
			{x:firstX+15*tX , y:firstY+tY*3 },
			//9
			//第四行
			{x:firstX+8*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			//9
			{x:firstX+10*tX , y:firstY+tY*4 },
			{x:firstX+10*tX , y:firstY+tY*4 },
			//2
			//第五行
			{x:firstX+7*tX , y:firstY+tY*5 },
			{x:firstX+11*tX , y:firstY+tY*5 },
			//2
			//第六行
			{x:firstX+6*tX , y:firstY+tY*6 },
			{x:firstX+12*tX , y:firstY+tY*6 },
			//2
			//第七行
			{x:firstX+5*tX , y:firstY+tY*7 },
			{x:firstX+13*tX , y:firstY+tY*7 },
			//2
			//第八行
			{x:firstX+4*tX , y:firstY+tY*8 },
			{x:firstX+14*tX , y:firstY+tY*8 },
			//2
			//第九行
			{x:firstX+2*tX , y:firstY+tY*10 },
			{x:firstX+3*tX , y:firstY+tY*10},

			{x:firstX+6*tX , y:firstY+tY*10 },
			{x:firstX+7*tX , y:firstY+tY*10 },

			{x:firstX+11*tX , y:firstY+tY*10 },
			{x:firstX+12*tX , y:firstY+tY*10 },

			{x:firstX+15*tX , y:firstY+tY*10 },
			{x:firstX+16*tX , y:firstY+tY*10 },
			//8
			//第十行
			{x:firstX+2*tX , y:firstY+tY*11 },
			{x:firstX+3*tX , y:firstY+tY*11 },

			{x:firstX+6*tX , y:firstY+tY*11 },
			{x:firstX+7*tX , y:firstY+tY*11 },

			{x:firstX+11*tX , y:firstY+tY*11 },
			{x:firstX+12*tX , y:firstY+tY*11 },

			{x:firstX+15*tX , y:firstY+tY*11 },
			{x:firstX+16*tX , y:firstY+tY*11 },
			//8

			//合计 57
			{x:firstX+9*tX , y:firstY+tY*2 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*5 },
			{x:firstX+9*tX , y:firstY+tY*6 },
			{x:firstX+9*tX , y:firstY+tY*7 },
			{x:firstX+9*tX , y:firstY+tY*8 },
			//5
			{x:firstX+9*tX,y:firstY},
			{x:firstX+9*tX,y:firstY},
			{x:firstX+9*tX, y:firstY+tY },
			{x:firstX+9*tX, y:firstY+tY},
			{x:firstX+9*tX , y:firstY+tY },
			{x:firstX+9*tX , y:firstY+tY },
			{x:firstX+9*tX , y:firstY+tY },
			{x:firstX+9*tX , y:firstY+tY },
			{x:firstX+9*tX , y:firstY+tY },
			//9
			//第三行
			{x:firstX+3*tX, y:firstY+tY*3 },
			{x:firstX+4*tX, y:firstY+tY*3 },
			{x:firstX+5*tX, y:firstY+tY*3 },
			{x:firstX+6*tX, y:firstY+tY*3},
			{x:firstX+7*tX , y:firstY+tY*3 },
			{x:firstX+8*tX , y:firstY+tY*3 },
			{x:firstX+9*tX , y:firstY+tY*3 },
			{x:firstX+10*tX , y:firstY+tY*3 },
			{x:firstX+11*tX , y:firstY+tY*3 },
			{x:firstX+12*tX , y:firstY+tY*3 },
			{x:firstX+13*tX , y:firstY+tY*3 },
			{x:firstX+14*tX , y:firstY+tY*3 },
			{x:firstX+15*tX , y:firstY+tY*3 },
			//9
			//第四行
			{x:firstX+8*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			{x:firstX+9*tX , y:firstY+tY*4 },
			//9
			{x:firstX+10*tX , y:firstY+tY*4 },
			{x:firstX+10*tX , y:firstY+tY*4 },
			//2
			//第五行
			{x:firstX+7*tX , y:firstY+tY*5 },
			{x:firstX+11*tX , y:firstY+tY*5 },
			//2
			//第六行
			{x:firstX+6*tX , y:firstY+tY*6 },
			{x:firstX+12*tX , y:firstY+tY*6 },
			//2
			//第七行
			{x:firstX+5*tX , y:firstY+tY*7 },
			{x:firstX+13*tX , y:firstY+tY*7 },
			//2
			//第八行
			{x:firstX+4*tX , y:firstY+tY*8 },
			{x:firstX+14*tX , y:firstY+tY*8 },
			//2
			//第九行
			{x:firstX+2*tX , y:firstY+tY*10 },
			{x:firstX+3*tX , y:firstY+tY*10},

			{x:firstX+6*tX , y:firstY+tY*10 },
			{x:firstX+7*tX , y:firstY+tY*10 },

			{x:firstX+11*tX , y:firstY+tY*10 },
			{x:firstX+12*tX , y:firstY+tY*10 },

			{x:firstX+15*tX , y:firstY+tY*10 },
			{x:firstX+16*tX , y:firstY+tY*10 },
			//8
			//第十行
			{x:firstX+2*tX , y:firstY+tY*11 },
			{x:firstX+3*tX , y:firstY+tY*11 },

			{x:firstX+6*tX , y:firstY+tY*11 },
			{x:firstX+7*tX , y:firstY+tY*11 },

			{x:firstX+11*tX , y:firstY+tY*11 },
			{x:firstX+12*tX , y:firstY+tY*11 },

			{x:firstX+15*tX , y:firstY+tY*11 },
			{x:firstX+16*tX , y:firstY+tY*11 },
			//8

			//合计 114

			{x:firstX+12*tX , y:firstY+tY*10 },

			{x:firstX+15*tX , y:firstY+tY*10 },
			{x:firstX+16*tX , y:firstY+tY*10 },
			//8
			//第十行
			{x:firstX+2*tX , y:firstY+tY*11 },
			{x:firstX+3*tX , y:firstY+tY*11 },

			{x:firstX+6*tX , y:firstY+tY*11 },
			{x:firstX+7*tX , y:firstY+tY*11 },

			{x:firstX+11*tX , y:firstY+tY*11 },
			{x:firstX+12*tX , y:firstY+tY*11 },

			{x:firstX+15*tX , y:firstY+tY*11 },
			{x:firstX+16*tX , y:firstY+tY*11 },
			//合计125

		];
		$('#main li').each(function(i){
			var x , y;
			if ( i < 57 )
			{
				x = arr[i].x;
				y = arr[i].y;
				$(this).css({
				transform : 'translate('+x+'px,'+y+'px) translateZ(-80px)',
				transition:'ease 3s',
			});
			}else{
				x = arr[i].x;
				y = arr[i].y;
			$(this).css({
				transform : 'translate('+x+'px,'+y+'px)',
				transition:'ease 3s',
			});

			}
		});
	}
	})
