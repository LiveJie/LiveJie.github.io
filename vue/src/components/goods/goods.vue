<template>
  <div class="goods">
    <div class="menus-wrapper" ref="munusWrapper">
    	<ul class="menus-item">
    		<li v-for="(item,index) in goods" class="menus-list" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
    			<span class="text">
    				<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
    			</span>
    		</li>
		</ul>
	</div>
    <div class="foods-wrapper" ref="foodsWrapper">
    	<ul>
    		<li v-for="(item,index) in goods" class="foods-list food-list-hook">
    			<h1 class="title">{{item.name}}</h1>
    			<ul>
    				<li v-for="(food,index) in item.foods" class="food-item">
    					<div class="icon">
    						<img :src="food.icon" alt="">
    					</div>
    					<div class="content">
    						<h2 class="name">{{food.name}}</h2>
    						<p class="desc">{{food.description}}</p>
    						<div class="extra">
    							<span>月售{{food.sellCount}}份</span>
    							<span>好评率{{food.rating}}%</span>
    						</div>
    						<div class="price">
    							<span class="now">￥{{food.price}}</span>
    							<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
    						</div>
    					</div>
    				</li>
    			</ul>
    		</li>
    	</ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScoll from 'better-scroll';
const errno = 0;
  export  default{
  	props:{
  		good:{
  			type:Object
  		}
  	},
  	data(){
  		return {
  			goods:[],
  			listHeight:[],//定义一个存放右边每个li高度的数组
  			scrollY:0
  		}
  	},
	 created() {
		this.classMap = ['decrease','discount','guarantee','invoice','special'];
		this.$http.get('/goods').then((res)=>{
		res = res.body;
		if(res.errno === 0){
		  this.goods = res.data
		  this.$nextTick(() =>{
		  	this._initScroll();
		  	this._culculateHeight();
		  });
		  //console.log(this.goods)
		}
	  });
	},
	computed: {
		currentIndex(){
			for(let i=0;i<this.listHeight.length;i++){//用scrollY和 listHeight数组的区间作对比 看下是那个区间 然后return对应索引i
				let height1 = this.listHeight[i];
				let height2 = this.listHeight[i+1];
				if(!height2 || this.scrollY >= height1 && this.scrollY < height2){
					return i;
				}
			}
			return 0;
		}
	},
	methods: {
		_initScroll(){
			this.menusScroll = new BScoll(this.$refs.munusWrapper,{
				click: true//允许浏览器默认事件 默认是阻止
			});
			this.foodsScroll = new BScoll(this.$refs.foodsWrapper,{
				probeType:3//实时监测滚动的位置
			});
			this.foodsScroll.on('scroll',(pos)=>{//监听scroll的位置 pos有x y轴距离
				this.scrollY = Math.abs(Math.round(pos.y))
			})
		},
		_culculateHeight(){
			let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');//获取所有的li节点
			let height = 0;
			this.listHeight.push(height);//先把第一个高度push进去
			for(let i = 0;i < foodList.length;i++){
				let item = foodList[i];
				height += item.clientHeight;//获取每个li元素的高度 然后累加
				this.listHeight.push(height);//然后把每个节点的高度push进去
			}
		},
		selectMenu(index){
			let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');//获取所有的li节点
			let el = foodList[index];
			this.foodsScroll.scrollToElement(el ,300);
			//console.log(index)
		}
	}
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/minsty"
	.goods
		display:flex
		position:absolute
		top:174px
		bottom:46px
		width:100%
		overflow:hidden
		.menus-wrapper
			flex:0 0 80px
			width:80px
			background:#f3f5f7
			overflow:hidden
			.menus-list
				display:table
				height:54px
				width:56px
				line-height:14px
				padding:0 12px
				font-size:0
				border-bottom: 1px solid #ddd
				&.current
					position:relative
					z-index:10
					margin-top:-1px
					background:#fff
					font-weight:700
					border:1px solid transparent
				&:last-of-type
					border-bottom:1px solid transparent
				.text
					width:56px
					vertical-align:middle
					font-size:12px
					display:table-cell
					.icon
						display:inline-block
						width:12px
						height:12px
						margin-right:2px
						vertical-align:middle
						background-size:12px 12px !important
						background-repeat:no-repeat
						&.decrease
							bg-image('decrease_3')
						&.discount
							bg-image('discount_3')
						&.guarantee
							bg-image('guarantee_3')
						&.invoice
							bg-image('invoice_3')
						&.special
							bg-image('special_3')
		.foods-wrapper
			flex:1
			.title
				padding-left:14px
				height:26px
				line-height:26px
				border-left:2px solid #d9dde1
				font-size:12px
				color:rgb(147,153,159)
				background:#f3f5f7
			.food-item
				display:flex
				margin:18px
				padding-bottom:18px
				border-bottom:1px solid #ddd
				&:last-of-type
					border:0
				.icon
					flex:0 0 57px
					margin-right:10px
					&>img
						width:57px
						height:57px
				.content
					flex:1
					.name
						margin:2px 0 8px 0
						height:14px
						line-height:14px
						font-size:14px
						color:rgb(7,17,27)
					.desc , .extra
						line-height:10px
						font-size:10px
						color:rgb(147,153,159)
						&.desc
							margin-bottom:8px
						&.extra
							margin-right:12px
					.price
						font-weight:700
						line-height:24px
						.now
							margin-right:8px
							font-size:14px
							color:rgb(240,20,20)
						.old
							text-decoration:line-throungh
							font-size:10px
</style>
