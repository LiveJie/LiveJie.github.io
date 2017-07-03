window.onload = function(){
	for(var i=0;i<=10;i++){
		var boxDom = document.createElement("div");
		boxDom.className = "box";
		document.body.appendChild(boxDom);
		//挂载属性
		//初始化小球
		boxDom.x = 0;
		boxDom.y = 0;
		boxDom.xspeed = i+2;
		boxDom.yspeed = i+2;
	}
	var boxArr = document.getElementsByClassName("box");
	var arr = [].slice.call(boxArr);//使用[].slice.call()把一个类数组变成一个数组
	//console.log(Array.isArray(arr))
	function play(){
		for(var i = 0 ; i < arr.length ; i++){
			$(".box").eq(i).css({
					background:"-webkit-radial-gradient("+color16()+","+color16()+","+color16()+")",
					background:"radial-gradient("+color16()+","+color16()+","+color16()+")",
					'-webkit-boxShadow':"0 0 5em "+color16()+"",
					boxShadow:"0 0 5em "+color16()+""
			})
			var boxDom = arr[i];
			var maxWidth = window.innerWidth - boxDom.offsetWidth;
			var maxHeight = window.innerHeight - boxDom.offsetHeight;
			boxDom.x += boxDom.xspeed;
			boxDom.y += boxDom.yspeed;
			if(boxDom.x < 0){
				boxDom.x = 0;
				boxDom.xspeed = -boxDom.xspeed;
			}
			if(boxDom.x > maxWidth){
				boxDom.x = maxWidth;
				boxDom.xspeed = -boxDom.xspeed;
			}
			if(boxDom.y < 0){
				boxDom.y = 0;
				boxDom.yspeed = - boxDom.yspeed;
			}
			if(boxDom.y > maxHeight){
				boxDom.y = maxHeight;
				boxDom.yspeed = - boxDom.yspeed;
			}
			boxDom.style.left = boxDom.x + 'px';
			boxDom.style.top = boxDom.y + 'px';
		}
	}
	//play();
	//window.requestAnimationFrame(play);
	setInterval(play,1000/30)
    function color16(){
        var r = Math.floor(Math.random()*256).toString(16);
        var g = Math.floor(Math.random()*256).toString(16);
        var b = Math.floor(Math.random()*256).toString(16);
        if(r.length<2)r = 'a'+r;
        if(g.length<2)g = 'b'+r;
        if(b.length<2)b = 'c'+r;
        return "#"+r+g+b;
    }
	
}