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
            oList.innerHTML += "<li><a href='https://www.baidu.com/s?wd="+s[i]+"'target='_blank' '>"+s[i]+"</a></li>";
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
/*        var pages = 100 , _index;*/
    //pag_number_pre pag_number_next
    //点击选中样式 获取首尾数值来判断点击是否有效
   $(".pag_number").click(function(){
        $(this).addClass('pag_on').siblings().removeClass('pag_on');
        $(".last_page").css({
            borderRight:'1px solid #d2d2d2'
        })
   })
    //添加选择产品
    $(".c_m_ul").find("label").click(function(){
        var $text = $(this).text();
        var html = '<span class="f_shop">'+$text+'<i class="iconfont f_cel">&#xe61e;</i></span>'
        $(".filter").append(html);
    })
    $(".filter").on("click",'.f_cel',function(){
        $(this).parents(".f_shop").remove();
    });
    //点击收起筛选
    $(".f_right").click(function(){
        if($("#brand_box").hasClass('on')){
            $("#brand_box").removeClass("on").css({
                transition:'0.5s',
                overflow:'visible'
            })
            $(".f_right").find("span").text("收起筛选")
            $(".f_right").find("i").css({
                transform:'rotate(180deg)',
            })
        }else{
            $("#brand_box").addClass('on').css({
                transition:'0.5s',
                height:'0',
                overflow:'hidden'
            })
            $(".f_right").find("span").text("显示筛选")
            $(".f_right").find("i").css({
                transform:'rotate(360deg)',
            })
        }
    })
    //综合排序选择样式
    $(".s_left").find("a").click(function(){
        $(".s_left").find("a").css({
            background:'rgba(242,242,242,1)',
            color:'#000',
            fontWeight:'400'
        })
        $(this).css({
            background:'#fff',
            color:'#dd2727',
            fontWeight:'bold'
        })
    })
       //点击到上一页
/*       $(".pag_number_pre").click(function(){
            var firstT = $('div.pag_number:first-child').text();
            var lastT = $('div.pag_number:last-child').text();
            var newT = $(".pag_number").eq(_index).text();
            var nine = $(".pag_number").eq(8).text();
            //判断是否是第一页
            if(firstT>1){
                if(nine > 9){
                    var length = $(".pag_number").length;
                    for(var i=0; i<length-1; i++){
                        var num = parseInt($(".pag_number").eq(i).text()) - 1;
                        $(".pag_number").eq(i).text(num);
                    }
                }
            }

       })*/
       //点击到下一页
/*       $(".pag_number_next").click(function(){
            var firstT = $('div.pag_number:first-child').text();
            var lastT = $('div.pag_number:last-child').text();
            var newT = $(".pag_number").eq(_index).text();
            var nine = $(".pag_number").eq(8).text();
            //判断是否是最后一页
            if(nine=pages){
                $(".pag_ellipsis").remove();
                $(".pag_number").eq(10).remove();
            }
            if(nine<pages){
                var length = $(".pag_number").length;
                for(var i=0; i<length-1; i++){
                    var num = parseInt($(".pag_number").eq(i).text()) + 1;
                    $(".pag_number").eq(i).text(num);
                }
            }
       })*/


    //s_right_min  s_right_max s_direction_left s_direction_right commodity_list
    //点击向左移动
    //获取最大页数
    var maxP = $(".s_right_max").text();
    var minP = $(".s_right_min").text();

    $(".s_direction_left").click(function(){
        minP--;
        if(minP<1)minP=maxP;
        $(".s_right_min").text(minP);
    });
    //点击向右移动
    $(".s_direction_right").click(function(){
        minP++;
        //判断边界
        if(minP>maxP)minP=1;
        $(".s_right_min").text(minP);
    })
    //多选
    $(".c_r_checked").click(function(){
      var length = $(this).parents(".b_c_commodity_box").find(".c_m_ul").children().length;
      //显示兄弟按钮 模拟兄弟点击 改变兄弟按钮位置
      $(this).parents(".b_c_commodity_box").siblings().find(".c_r_checked").show().next(".c_r_more").css({marginLeft:'5px'}).parents(".b_c_commodity_box").find(".c_m_cencel").trigger("click");

      //模拟更多切换
      $(this).parents(".b_c_commodity_box").siblings().find(".c_r_more").removeClass("m_show").find("span").text("更多").next("i").css({
                transform:'rotate(0deg)',
                transition:'0.5',
            });
      $(this).parents(".b_c_commodity_box").find(".c_r_more").trigger("click");
      //兄弟元素显示更多
      if(length>=20){
        $(this).hide().parents(".b_c_commodity_box").css({height:'150px'}).find(".c_middle_box").css({height:'150px',overflow:'auto'}).find(".c_m_botton").css({display:'inline-block'}).parents(".b_c_commodity_box").find("input").css({display:'inline-block'});
      }else{
        $(this).hide().parents(".b_c_commodity_box").css({height:'100px'}).find(".c_middle_box").css({height:'100px',overflow:'auto'}).find(".c_m_botton").css({display:'inline-block'}).parents(".b_c_commodity_box").find("input").css({display:'inline-block'});
      }
    })
    //点击确定
    var _this, _length;
    //点击取消
    $(".c_m_cencel").click(function(){
        //模拟点击
        //判断是否是收起状态
        $(this).parents(".b_c_commodity_box").find(".c_r_more").find("span").text("更多").next("i").css({
                transform:'rotate(0deg)',
                transition:'0.5',
        });
        //点击取消展现按钮
      var length = $(this).parents(".b_c_commodity_box").find(".c_m_ul").children().length;
          if(length>=20){
            $(this).removeClass("c_input").parents(".b_c_commodity_box").css({height:'100px'}).find(".c_middle_box").css({height:'100px',overflow:'hidden'}).find(".c_m_botton").hide().parents(".b_c_commodity_box").find("input").hide();
          }else{
            $(this).addClass("c_input").parents(".b_c_commodity_box").css({height:'50px'}).find(".c_middle_box").css({lineHeight:'50px',overflow:'hidden'}).find(".c_m_botton").hide().parents(".b_c_commodity_box").find("input").hide();
          }
          $(this).parents(".b_c_commodity_box").find(".c_r_checked").show().next(".c_r_more").css({marginLeft:'5px'});
    })
    //更多
    $(".c_r_more").click(function(){
        var length = $(this).parents(".b_c_commodity_box").find(".c_m_ul").children().length;
        //让他兄弟元素收起来
        if(!$(this).hasClass("m_show")){
            $(this).addClass("m_show").find("span").text("收起").next("i").css({
                transform:'rotate(180deg)',
                transition:'0.5',
            })
            if(length>=20){
                $(this).parents(".b_c_commodity_box").css({height:'150px'}).find(".c_middle_box").css({height:'150px',overflow:'auto'});
            }else{
                $(this).parents(".b_c_commodity_box").css({height:'100px'}).find(".c_middle_box").css({height:'100px',overflow:'auto'});
            }
        }else{
            $(this).css({marginLeft:'5px'}).removeClass("m_show").find("span").text("更多").next("i").css({
                transform:'rotate(0deg)',
                transition:'0.5',
            });
            if(length>=20){
                $(this).parents(".b_c_commodity_box").css({height:'100px'}).find(".c_middle_box").css({height:'100px',overflow:'hidden'});
            }else{
                $(this).parents(".b_c_commodity_box").css({height:'50px'}).find(".c_middle_box").css({height:'50px',overflow:'hidden'});
            }
            //显示多选
            $(this).parents(".b_c_commodity_box").find(".c_r_checked").show();
            //隐藏input
            $(this).parents(".b_c_commodity_box").find("input").hide();
            //隐藏确定 取消
            $(this).parents(".b_c_commodity_box").find(".c_m_botton").hide();
        }
            //模拟点击取消
            $(this).parents(".b_c_commodity_box").siblings().find(".c_m_cencel").trigger("click");
    })
    //帅选条件
    $(".c_m_li").mouseenter(function(){
        $(".c_m_tab").hide();
        $(this).css('background','#ddd').siblings().css('background','#fff');
        $(this).find(".c_m_tab").show().find(".c_m_tab").siblings().hide();
    })
    $(".c_m_tab").mouseleave(function(){
        $(".c_m_tab").hide();
    })

