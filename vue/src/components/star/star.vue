<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasss" :class="itemClass" class="star-item" track-by="$index"></span>
	</div>
</template>
<script type="text/ecmascript-6">
const length = 5;
const cls_on = 'on';
const cls_half = 'half';
const cls_off = 'off';
export default {
	props:{//把size 和score暴露出去
		size:{
			type:Number
		},
		score:{
			type:Number
		}
	},
	computed:{
		starType(){//根据传过来的size 配合class属性来赋予星星的尺寸
			return 'star-' + this.size;
		},
		itemClasss(){ //星星算法
			let result = [];
			let score = Math.floor(this.score*2)/2;
			let hasDecimal = score % 1 !== 0;
			let integet = Math.floor(score);
			for(let i=0;i<integet;i++){//看有多少个整星
				result.push(cls_on)
			}
			if(hasDecimal){//看有多少个半星
				result.push(cls_half)
			}
			while(result.length<5){//看数组长度是不是5个如果不是填充0星
				result.push(cls_off)
			}
			return result;//上面定义的in是计算星星类型来定义的class名字来改变对应的星星
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minsty"
	.star
		text-align:center
		margin:16px 0 28px 0
		font-size:0
		.star-item
			display:inline-block
			background-repeat:no-repeat
		&.star-48
			.star-item
				width:20px
				height:20px
				margin-right:22px
				background-size:20px 20px !important
				&.on
					bg-image('star48_on')
				&.half
					bg-image('star48_half')
				&.off
					bg-image('star48_off')
		&.star-36
			.star-item
				width:15px
				height:15px
				margin-right:6px
				background-size:10px 10px !important
				&.on
					bg-image('star36_on')
				&.half
					bg-image('star36_half')
				&.off
					bg-image('star36_off')
		&.star-24
			.star-item
				width:10px
				height:10px
				margin-right:3px
				background-size:10px 10px !important
				&.on
					bg-image('star24_on')
				&.half
					bg-image('star24_half')
				&.off
					bg-image('star24_off')
</style>
