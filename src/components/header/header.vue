<template>
  <header class="header">
    <!--header的顶部内容 START-->
    <div class="header-content">
        <div class="header-img">
            <img width="64" height="64" :src="seller.avatar">
        </div>
        <div class="header-desc">
            <div class="hd-title">
                <span class="hd-brand"></span>
                <div class="hd-name">{{ seller.name }}</div>
            </div>
            <div class="hd-express">
                {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
            </div>
            <!--//这里不适用v-if会报错的,因为开始supports是undefined-->
            <div v-if="seller.supports" class="hd-supports">
                <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                <div class="hd-supportsDesc">
                    {{seller.supports[0].description}}
                </div>
            </div>
        </div>
        <div v-if="seller.supports" class="supports-count" @click="isShowDetail" >
            <span>{{ seller.supports.length }}个</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <!--header的顶部内容 END-->
    <!--header下边的公告 START-->
    <div class="header-notice">
      <span class="notice-icon"></span><span class="notice-con">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--header下边的公告 START-->
    <!--header的模糊背景 END-->
    <div class="header-bg">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!--header的模糊背景 END-->
    <!--header点击优惠个数的弹层 START-->

    <transition name="fade">
      <div v-show="detailShow" class="header-detail">
        <!--弹层的主要内容 START-->
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <!--标题 START-->
            <h1 class="seller-name">{{ seller.name }}</h1>
            <!--标题 END-->
            <!--评价星级 START-->
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <!--评价星级 END-->
            <!--二级title  优惠信息 START-->
            <div class="small-title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <!--二级title  优惠信息 END-->
            <!-- 优惠信息的内容 START-->
            <ul v-if="seller.supports" class="supports">
              <li v-for="(item,index) in seller.supports" class="support-item">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <!-- 优惠信息的内容 END-->
            <!--二级title  商家公告 START-->
            <div class="small-title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <!--二级title  商家公告 END-->
            <!--  商家公告内容 START-->
            <div class="seller-notice">
              <p>周密想安抚好卡卡奥康达看到的打卡打卡打就打开大道分手快乐的看到了附近可浪费了开发的来昂克赛拉奥康达卡六大卡伦大陆扩大程序可辛周密想安抚好卡卡奥康达看到的打卡打卡打就打开大道分手快乐的看到了附近可浪周密想安抚好卡卡奥康达看到的打卡打卡打就打开大道分手快乐的看到了附近可浪周密想安抚好卡卡奥康达看到的打卡打卡打就打开大道分手快乐的看到了附近可浪苦</p>
            </div>
            <!--  商家公告内容 END-->
          </div>
        </div>
        <!--关闭按钮 START-->
        <div class="detail-close">
          <i class="icon-close" @click="closePopDetail"></i>
        </div>
        <!--关闭按钮 END-->
        <!--弹层的主要内容 END-->
      </div>
    </transition>
    <!--header点击优惠个数的弹层 END-->
  </header>
</template>

<script>
    import star from '../../components/star/star'

    export default{
        //接受App.vue中header的seller
        props:{
          seller:{
             type:Object
          }
        },
        data(){
          return{
            detailShow:false
          }
        },
        methods:{
          isShowDetail(){
              this.detailShow=true
          },
          closePopDetail(){
              this.detailShow=false
          }
        },
        created(){
          this.classMap=['decrease','discount','guarantee','invoice','special']
        },
        //注册组件star
        components:{
          star
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/less/constLess';
  @import '../../common/less/icon';

  .header{
    color:#fff;
    background:rgba(7,17,27,0.5);
    position: relative;
    .header-content{
      padding:24px 12px 18px 24px;
      font-size:0;
      position: relative;
    }
    .header-notice{
      height:28px;
      line-height: 28px;
      padding: 0 12px;
      background: rgba(7,17,27,0.2);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      position: relative;
    }
    .header-bg{
      position: absolute;
      left:0;
      top:0;
      width: 100%;
      height: 100%;
      z-index:-1;
      filter:blur(10px);
      -webkit-filter:blur(10px);
      overflow:hidden;
    }
    .header-detail{
      position: fixed;
      top:0;
      z-index:100000;
      width: 100%;
      height: 100%;
      overflow: auto;
      background:rgba(7,17,27,0.8);
      transition: all 1s ease;
      &.fade-enter, &.fade-leave-active{
        opacity: 0;
      }
    }
  }
  .header-content{
    .header-img{
      display:inline-block;
      vertical-align: top;
      & img{
        border-radius: 2px;
      }
    }
    .header-desc{
      display:inline-block;
      margin-left:@f16;
      font-size:@f14;
      .hd-title{
        margin:2px 6px 8px 0;
        .hd-brand{
          display:inline-block;
          width:30px;
          height:18px;
          .bg-img('header','brand');
          background-size:30px 18px;
          background-repeat: no-repeat;
          vertical-align: top;
          background-color: aquamarine;
        }
        .hd-name{
          display:inline-block;
          font-size:@f16;
          color:#fff;
          line-height:16px;
          font-weight: bold;
        }
      }
      .hd-express{
        line-height:12px;
        font-weight: 200;
        margin-bottom:10px;
      }
      .hd-supports{
        font-size:0;
        .icon{
          display: inline-block;
          vertical-align:top;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease{
            .bg-img('header','decrease_1');
            background-color: aqua;
          }
          &.discount{
            .bg-img('header','discount_1');
          }
          &.guarantee{
            .bg-img('header','guarantee_1');
            background-color: aqua;
          }
          &.invoice{
            .bg-img('header','invoice_1');
          }
          &.special{
            .bg-img('header','special_1');
          }
        }
        .hd-supportsDesc {
          display: inline-block;
          margin-left:4px;
          font-size: @f10;
          font-weight: 200;
        }
      }
    }
    .supports-count{
      position: absolute;
      right: 12px;
      bottom:18px;
      padding: 0 8px;
      height:24px;
      line-height: 24px;
      background: rgba(0,0,0,0.2);
      text-align: center;
      border-radius: 7px;
      & span{
        font-size:@f10;
        vertical-align: super;
      }
      & i{
        line-height: 24px;
        margin-left:2px;
        font-size:@f14;
      }
    }
  }
  .header-notice{
    .notice-icon{
      display: inline-block;
      vertical-align: top;
      margin-top:8px;
      width: 22px;
      height: 12px;
      .bg-img('header','bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
      background-color: antiquewhite;
    }
    .notice-con{
      margin-left:4px;
      font-size: @f10;
    }
    .icon-keyboard_arrow_right{
      position: absolute;
      right: 5px;
      top:10px;
      font-size:@f10;
    }
  }
  .header-detail{
    .detail-wrapper{
      min-height: 100%;
      width: 100%;
      text-align: center;
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
        h1{
          line-height: 16px;
          font-size: 16px;
          font-weight:700;
        }
      }
      .star-wrapper{
        margin-top:16px;
        padding:2px 0;
      }
      .small-title{
        display:flex;
        margin:28px auto 24px auto;
        width: 80%;
        .line{
          flex:1;
          position: relative;
          top:-6px;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .text{
          padding: 0 12px;
        }
      }
      .supports{
        width: 80%;
        margin:0 auto;
        .support-item{
          padding: 0 12px;
          margin-bottom: 12px;
          text-align: left;
          font-size:0;
          color:#fff;
          &:last-child{
            margin-bottom: 0;
          }
          .icon{
            display: inline-block;
            width: 16px;
            height:16px;
            margin-right: 6px;
            background-size: 16px 16px;
            vertical-align: top;
            &.decrease{
              .bg-img('header','decrease_1');
              background-color: aqua;
            }
            &.discount{
              .bg-img('header','discount_1');
            }
            &.guarantee{
              .bg-img('header','guarantee_1');
              background-color: aqua;
            }
            &.invoice{
              .bg-img('header','invoice_1');
            }
            &.special{
              .bg-img('header','special_1');
            }
          }
          .text{
            font-size: @f12;
            font-weight: 100;
            color:#fff;
          }
          }
        }
      .seller-notice{
        width: 80%;
        margin: 0 auto;
        & > p{
          padding: 0 12px;
          text-align: left;
          font-size: 12px;
          font-weight: 200;
          line-height: 24px;
        }
      }
    }
    .detail-close{
      position: relative;
      margin: -64px auto 0 auto;
      width:32px;
      height: 32px;
      font-size:32px;
    }
  }
</style>
