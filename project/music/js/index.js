$(function(){
	document.getElementsByTagName('body')[0].style.width = window.innerWidth+'px'; 
	$(".player").style.width = window.innerWidth+'px'; 
	//创建播放器
	var Music = document.getElementById("audio");
	//添加路径
	Music.src = "mp3/田馥甄-小幸运.mp3";
	//音量
	Music.volume = 0.5;
	//自动播放
	//Music.autoplay = "autoplay";
	function Lyric(){
	//获取歌词
	var lrc = $("#lrc").val();
	//分割歌词
	var flrc = lrc.split("[");
	//添加容器
	var html = "";
	//二次分割
	for(var i = 0 ; i < flrc.length; i++){
	var lyricText = flrc[i].split("]");
	//获取歌词
	var lyric = lyricText[1];
	//获取时间分割
	var stime = lyricText[0].split(".");
	//再次分割
	var ftime = stime[0].split(":");
	//格式化时间
	var ms = ftime[0]*60+ftime[1]*1;
	//判断
	if(lyric){
		html += "<li class='l_"+ms+"'><div class='l_text'>"+lyric+"</div><div class='l_cover'>"+lyric+"</div></li>"
	}
	}
	//添加歌词
	$("#lyrics").html(html);
	}


	//监听歌词
	Music.addEventListener("timeupdate",function(){
	//获取当前时间
	var time = this.currentTime;
	//格式化时间
	var m = parseInt(time/60);
	var s = parseInt(time);
	//同步歌词 利用ms=s
	//先清除当前l_cover 的兄弟元素
	$(".l_"+s).siblings().find(".l_cover").removeAttr("style");
	//加上元素
	$(".l_"+s).addClass("l_sel").siblings().removeClass("l_sel").end().find(".l_cover").css("transition","width 1s linear").width("100%");
	//自动同步
	$(".l_con").scrollTop(($(".l_sel").index()-1)*30);
	})
	

	//点击拖动进度条
	$(".c_round").mousedown(function(e){
	//获取对象 
	var _this = $(this);
	//获取距离左边距离 或上面
	var x = e.licentX || e.pageX;
	//获取和上级元素距离
	var left = _this.position().left;
	//获取总距离
	var maxLeft = _this.parent().width();
	$(document).mousemove(function(e){
	//获取最终鼠标距离
	var n = (e.licentX || e.pageX) -x +left;
	//限制边界
	if(n<0){
		n=0;
	}
	if(n>=maxLeft){
		n=maxLeft;
	}
	//赋值
	//赋值
	_this.css("left",n);
	//获取百分比
	var percent = (n/maxLeft)*100;
	$(".c_new").width(percent+"%");
	//同步歌词
	Music.currentTime = Music.duration*(n/maxLeft);
	}).mouseup(function(){
	//清除事件
	$(document).unbind("mouseup");
	$(document).unbind("mousemove");
	});
	});

	//点击进度条
	$(".c_play").click(function(e){
	//获取对象
	var _this = $(this);
	//获取当前位置
	var x = e.licentX || e.pageX;
	//获取左边距
	var left = _this.parent().offset().left;
	//获取差
	var w = x - left;
	//获取最大宽度
	var maxWidth = _this.parent().width();
	//获取百分比
	var percent = (w/maxWidth)*100;
	//赋值
	$(".c_round").css("left",percent+"%");
	$(".c_new").width(percent+"%");
	//同步歌词
	Music.currentTime = Music.duration*(w/maxWidth);
	})
	
	//自动进度条
	Music.ontimeupdate =function(){
	//获取当前时间
	var time = this.currentTime;
	//格式化时间
	var ftime = formartTime(time);
	//获取总时间
	var stime = this.duration;
	//格式化时间
	var fstime = formartTime(stime);
	//获取百分比
	var percent = (time/stime)*100;
	//赋值
	$(".c_round").css("left",percent+"%");
	$(".c_new").width(percent+"%");
	//动态获取当前时间
	$(".t_left").text(ftime);
	//动态获取总时间
	$(".t_right").text(fstime);
	}
	//自定义格式化时间
	function formartTime(time){
	var m = Math.floor(time/60);
	var s = Math.floor(time%60);
	return(m<10?"0"+m:m)+":"+(s<10?"0"+s:s);
	}
	//人工模拟下一首
	Music.onended = function(){
	$(".p_next").trigger("click");
	}

	//点击拖动喇叭
	$(".a_round").mousedown(function(e){
	//获取对像
	var _this = $(this);
	//获取当前鼠标位置
	var x = e.licentX || e.pageX;
	//获取左边位置
	var left = _this.position().left;
	//获取总长度
	var maxLeft = _this.parent().width();
	$(document).mousemove(function(e){
	//获取最终位置
	var n = (e.licentX || e.pageX)-x +left;
	//限制位置
	if(n<0){
		n=0;
	}
	if(n>maxLeft){
		n=maxLeft;
	}
	//赋值
	_this.css("left",n)
	//获取百分比
	var percent = (n/maxLeft)*100;
	$(".a_new").width(percent+"%")
	//同步音量
	Music.volume = n/maxLeft;
	}).mouseup(function(){
	//去除事件
	$(document).unbind("mouseup");
	$(document).unbind("mousemove");
	});
	});

	//音量点击
	$(".a_play").click(function(e){
	//获取当前对象
	var _this = $(this);
	//获取鼠标距离
	var x = e.licentX || e.pageX;
	//获取鼠标距离左边距离
	var left = _this.parent().offset().left;
	//获取差
	var x = x - left;
	//获取总长度
	var maxWidth = _this.parent().width();
	//获取百分比
	var percent = (x/maxWidth)*100;
	//赋值
	$(".a_round").css("left",percent+"%");
	$(".a_new").width(percent+"%");
	//同步音量
	Music.volume = x/maxWidth;
	});
	//点击喇叭静音
	$(".p_horn").click(function(){
	$(this).toggleClass("p_horn s_horn");
	if(!$(this).hasClass("p_horn")){
		Music.volume = 0;
		$(".a_round").css("left",0);
		$(".a_new").width(0);
	}else{
		Music.volume = 0.4;
		$(".a_round").css("left",40+"%")
		$(".a_new").width(40+"%");
	}
	})


	//创建获取音乐循环列表
	var children = $(".m_list").children();
	//获取长度
	var length = children.length;
	//创建数组
	var Arrmusic = [];
	//创建索引
	var playIndex = -1 ;

	//循环列表
	children.each(function(){
	//同步音乐路径
	Arrmusic.push($(this).data("link"));
	}).click(function(){
	//通过索引同步音乐
	playIndex = $(this).index();
	//使用索引
	Music.src = Arrmusic[playIndex];
	//播放音乐
	playMusic(playIndex);

	})
	//定义播放音乐
	function playMusic(playIndex){
	Music.play();
	//播放音乐时添加样式
	children.eq(playIndex).addClass("select").siblings().removeClass("select");
	//添加动画
	children.eq(playIndex).find(".s_number span").addClass("s_num").parents(".m_song").siblings().find(".s_number span").removeClass("s_num");

	//切换按钮
	$(".p_play").hide();
	$(".p_stop").show();
	
	//加载歌词
	Lyric();
	}

	//点击按钮播放
	$(".p_play").click(function(){
	//默认播放第一首
	if(playIndex == -1){
		playIndex = 0;
	}
	//同步地址
	Music.src = Arrmusic[playIndex];
	playMusic(playIndex);
	
	});
	//暂停音乐
	$(".p_stop").click(function(){
	//调用方法
	stopMusic();
	//切换按钮
	$(".p_stop").hide();
	$(".p_play").show();
	})
	
	//定义暂停方法
	function stopMusic(){
	Music.pause();
	//去除样式
	children.eq(playIndex).removeClass("select");
	//添加动画
	children.eq(playIndex).find(".s_number span").removeClass("s_num");
	}
	//上一首
	$(".p_pre").click(function(){
	//判断边界
	playIndex =(playIndex <=0 ? "0" : --playIndex);
	//同步地址
	Music.src = Arrmusic[playIndex];
	//播放
	playMusic(playIndex);
	})
	//下一首
	$(".p_next").click(function(){
	//判断边界
	playIndex = (playIndex >= (length-1) ? "0" :++playIndex);
	//同步歌曲
	Music.src = Arrmusic[playIndex];
	//播放
	playMusic(playIndex);
	});

})