<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{ 'highlight':totalCount > 0 }">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{'highlight':totalCount>0}">￥{{ totalPrice }}</div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{ payDesc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props:{
      selectFoods:{
        type:Array,
        default(){
          return [{
            price:10,
            count:1
          }];
        }
      },
      deliveryPrice:{
        type:Number,
        default:0
      },
      minPrice:{
        type:Number,
        default:0
      }
    },
    computed:{
      totalPrice(){
        let total=0;
        this.selectFoods.forEach((food)=>{
          total+=food.price * food.count;
        });
        return total;
      },
      totalCount(){
        let count=0;
        this.selectFoods.forEach((food)=>{
          count+=food.count;
        });
        return count;
      },
      payDesc(){
        if(this.totalPrice===0){
          return `￥${this.minPrice}元起送`;
        }
        else if(this.totalPrice < this.minPrice){
          let diff=this.minPrice-this.totalPrice;
          return `还差￥${diff}元起送`;
        }else{
          return `去结算`;
        }
      },
      payClass(){
        if(this.totalPrice < this.minPrice){
          return `not-enough`;
        }else{
          return `enough`;
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/less/constLess';
  @import '../../common/less/icon';

  .shopcart{
    position: fixed;
    left:0;
    bottom:0;
    z-index: 999;
    width: 100%;
    height: 48px;
  }
  .content{
    display: flex;
    background: #141d27;
    .content-left{
      flex:1;
      font-size: 0;
      .logo-wrapper{
        display: inline-block;
        position: relative;
        top:-10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing:border-box;
        border-radius: 50%;
        background: #141d27;
        .logo{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background:#2b343c;
          text-align: center;
          &.highlight{
            background:rgb(0,160,220);
          }
          .icon-shopping_cart{
            font-size: 24px;
            line-height: 48px;
            color:#808a85;
            &.highlight{
              color:#fff;
            }
          }
        }
      }
      .num{
        position: absolute;
        top:0;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 400;
        color:#fff;
        background: rgba(240, 20, 20,1);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
      }
      .price{
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        padding-right: 12px;
        box-sizing: border-box;
        line-height: 24px;
        border-right: 1px solid rgba(255,255,255,0.1);
        font-size: 16px;
        font-weight: 700;
        color:rgba(255,255,255,0.4);
        &.highlight{
          color:#fff;
        }
      }
      .desc{
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        color:rgba(255,255,255,0.4);
        font-size: 10px;
      }
    }
    .content-right{
      flex:0 0 88px;
      width: 88px;
      text-align: center;
      .pay{
        line-height: 48px;
        font-size: 12px;
        font-weight: 700;
        color:rgba(255,255,255,0.4);
        background: #2b333b;
        &.not-enough{
          background: #2b333b;
        }
        &.enough{
          background:#00b43c;
          color:#fff;
        }
      }
    }
  }
</style>
