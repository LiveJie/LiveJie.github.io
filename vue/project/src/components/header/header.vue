<template>
  <div class="header">
    <div class="seller-items">
      <div class="seller-avatar">
        <img class="avatar" width="64" height="64" :src="seller.avatar">
      </div>
    </div>
    <div class="content">
      <div class="title">
        <span class="header-img">
          <img class="brand" width="30" height="18" src="" alt="">
        </span>
        <span class="header-name">{{seller.name}}</span>
      </div>
      <div class="send-method">
        {{seller.description}}/{{seller.deliveryTime}}分钟送达
      </div>
      <div v-if="seller.supports" class="discounts">
        <span class="icon" :class="classMap[seller.supports[0].type]"></span>
        <span class="text">{{seller.supports[0].description}}</span>
      </div>
      <div class="coupon-items">
        <span v-if="seller.supports" @click="showDetail">{{seller.supports.length}}个</span>
        <span>&gt</span>
        <transition name="fade">
          <div class="coupon-wrapper" v-show="detailShow" >
            <div class="coupon-wrapper-cover">
              <div class="coupon-wrapper-content">
                <h1 class="wrapper-h1">{{seller.name}}</h1>
                <star :score="seller.score" :size="48"></star>
                <h2 class="wrapper-h2">优惠信息</h2>
                <ul v-if="seller.supports" class="supports">
                  <li v-for="(item , index) in seller.supports" class="support-item">
                    <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                    <span class="text">{{seller.supports[index].description}}</span>
                  </li>
                </ul>
                <h2 class="wrapper-h2 hotel-info">商家公告</h2>
                <div class="hotel-bulletin"  v-if="seller.bulletin">{{seller.bulletin}}</div>
              </div>
              <div class="coupon-wrapper-back" @click="backDetail">
                <div class="back">返回</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="seller-bulletin"  @click="showDetail" >
      <span class="seller-bulletin-img"></span>
      <span v-if="seller.bulletin" class="notice">{{seller.bulletin}}</span>
    </div>
    <img :src="seller.avatar" class="img-bg" alt="">
  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../../components/star/star.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data(){//建立一个临时的数据中转站来存储上面需要用到的数据
      return {
        detailShow:false
      };
    },
    methods:{//在里面定义一些需要用到的方法 来改变一些数据
      showDetail(){
        this.detailShow = true
      },
      backDetail(){
        this.detailShow = false
      }
    },
    created() {
      this.classMap = ['decrease','discount','guarantee','invoice','special'];
    },
    components:{
      star
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minsty"
@import "../../common/stylus/base"
  .header
      font-size:0
      position:relative
      overflow:hidden
      .img-bg
        width:100%
        height:100%
        position:absolute
        top:0
        left:0
        z-index:-1
        filter:blur(10px)
      .seller-items
        display:inline-block
        vertical-align:top
        margin:24px 0 18px 24px
        .avatar
          border-radius:2px
      .content
        display:inline-block
        color:rgb(255,255,255)
        padding:24px 12px 18px 16px;
        .coupon-items
          font-size:10px
          height:12px
          color:rgb(255,255,255)
          font-weight:200
          line-height:12px
          background:rgba(0,0,0,0.2)
          position:absolute
          bottom:40px
          right:12px
          border-radius:10px
          padding:7px 8px
          & > span:nth-of-type(2)
            font-family: cursive;
          .coupon-wrapper
            width:100%
            height:100%
            overflow:hidden
            position:fixed
            top:0
            left:0
            opacity:1
            background:rgba(7,17,27,0.8)
            z-index: 10;
            //filter:blur(5px)
            &.fade-enter-active, &.fade-leave-active
              transition: all 0.5s ease     
            &.fade-enter, &.fade-leave-active
              opacity: 0 
              background:rgba(7,17,27,0)
            font-size:18px
            .coupon-wrapper-cover
              height:100%
              overflow:auto
              .coupon-wrapper-content
                width:100%
                padding-bottom:60px
                .wrapper-h1
                  font-size:16px
                  fint-weight:700
                  color:#fff
                  line-height:16px
                  margin:64px auto 16px auto
                  text-align:center
                .wrapper-h2
                  font-size:14px
                  text-align:center
                  position:relative
                  &.hotel-info
                    margin:28px 0 24px 0
                .hotel-bulletin
                  width:80%
                  font-size:12px
                  font-weight:200
                  line-height:24px
                  color:#fff
                  margin:0 auto
                .wrapper-h2:after
                  content:''
                  width:30%
                  height:1px
                  background:rgba(255,255,255,0.9)
                  position:absolute
                  left:0
                  margin-top:6px
                  margin-left:36px
                .wrapper-h2:before
                  content:''
                  width:30%
                  height:1px
                  background:rgba(255,255,255,0.9)
                  position:absolute
                  right:0
                  margin-top:6px
                  margin-right:36px
                .supports
                  width:80%
                  display:block
                  margin:0 auto
                  margin-top:24px
                  .support-item
                    padding:0 12px
                    margin-bottom:12px
                    font-size:0
                    .icon
                      display:inline-block
                      width:16px
                      height:16px
                      vertical-align:middle
                      background-size:16px 16px !important
                      background-repeat:no-repeat
                      margin-right:6px
                      &.decrease
                        bg-image('decrease_2')
                      &.discount
                        bg-image('discount_2')
                      &.guarantee
                        bg-image('guarantee_2')
                      &.invoice
                        bg-image('invoice_2')
                      &.special
                        bg-image('special_2')
                    .text
                      vertical-align:middle
                      font-size:12px
                      color:#fff
              .coupon-wrapper-back
                position:relative
                width:100%
                height:32px
                margin:-50px auto 0 auto
                .back
                  text-align:center
                  line-height:32px
                  font-size:16px
                  max-width:60px
                  padding:0 10px
                  margin:0 auto
                  border-radius:20px
                  border:1px solid #f60
        .title
          margin:2px 0 8px 0
          .header-img
            display:inline-block
            width:30px
            height:18px
            margin-right:6px
            vertical-align:middle
            .brand
              display:inline-block
              width:30px
              height:18px
              bg-image('brand')
              //background-image:url(brand@2x.png)
              background-size:30px 18px
              background-repeat:no-repeat
          .header-name
            font-size:16px
            font-weight:bold
            line-height:18px
            vertical-align:middle
        .send-method
          font-size:12px
          font-weight:200
          line-height:12px
        .discounts
          font-size:10px
          font-weight:200
          line-height:12px
          margin-top:10px
          .icon
            display:inline-block
            width: 12px
            height: 12px
            margin-right:4px
            background-size:12px 12px !important
            background-repeat: no-repeat !important
            vertical-align:middle
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            vertical-align:middle
      .seller-bulletin
        font-size:10px
        color:rgb(255,255,255)
        font-weight:200
        line-height:28px
        background-color:rgba(7,17,28,0.2)
        padding:0 12px
        height:28px
        .seller-bulletin-img
          display:inline-block
          width:22px
          height:12px
          line-height:28px
          bg-image(bulletin)
          background-size:22px 12px
          background-repeat:no-repeat
          vertical-align:top
          margin-top:8px
        .notice
          display:inline-block
          width:85%
          height:28px
          font-size:10px
          font-weight:200
          line-height:28px
          margin-left:4px
          white-space:nowrap
          text-overflow:ellipsis
          overflow:hidden
</style>
