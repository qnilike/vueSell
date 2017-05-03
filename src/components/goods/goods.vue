<template>
  <div class="goods">
    <!--商品左侧分类 START-->
    <div class="menus-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menus-item border-1px" :class="{'current':currentIndex===index}" @click="_selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <!--商品左侧分类 END-->
    <!--商品右侧分类 START-->
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" class="foods-list food-list-hook">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="food-img">
                <img :src="food.icon" width="57" height="57"/>
              </div>
              <div class="food-detail">
                <h2>{{ food.name }}</h2>
                <p>{{ food.description }}</p>
                <div class="extra">
                  <span>月销售{{ food.sellCount }}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="price-now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="price-old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--商品右侧分类 START-->
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from 'components/shopcart/shopcart'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  export default{
    props:{
      seller:{
        type:Object
      }
    },
    data(){
      return{
        goods:{},
        listHeight:[],
        scrollY:0,
      }
    },
    computed:{
      currentIndex(){
        for(let i=0;i<this.listHeight.length;i++){
          let height1=this.listHeight[i];
          let height2=this.listHeight[i+1];
          //listHeight:0,1026,1178,1298,1606,1820,2054,2362,2858,3548
          //!height2假如是最后一个索引
          if((!height2) || (this.scrollY >= height1 && this.scrollY < height2)){
            return i;
          }
        }
        return 0;
      }
    },
    created(){
      this.classMap=['decrease','discount','guarantee','invoice','special']
      this.$http.get('./api/goods').then((response)=>{
        //成功回调
        response=response.body;
        console.log("goods:"+response);
        if(response.errno===0){
          this.goods=response.data;
          this.$nextTick(()=>{
            this._initScroll();
            //DOM更新完成之后，计算右侧菜单的分类的，来完成点击切换左右两侧效果
            this._countHeight();
          })
        }
      },(response)=>{
        //失败回调
      })
    },
    methods:{
      //有时也需要在内联语句处理器中访问原生 DOM 事件。可以用特殊变量 $event 把它传入方法
      _selectMenu(index,event){
        if(!event._constructed){
          return;
        }
        console.log(index);
        let fooList=this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let el=fooList[index];
        //scrollToElement是better-scroll的一个方法，参数是el，时间
        this.foodsScroll.scrollToElement(el,800);
      },
      _initScroll(){
        //左侧的滚动,new里边接受2个参数一个是DOM，一个是json
        //默认只有touchmove,touchstart事件，click点击无效，利用一下办法传入click事件，但是在pc端click会执行两次，M端没事，
        //为了pc没有问题，点击方法传入一个参数$event,better-scroll M和PC端有一个event的区别地是_constructed，这个只是在M端有
        //自己派发事件的时候它为true，若是PC端则跳出
        this.menuScroll=new BScroll(this.$refs.menuWrapper,{
          click:true
        });
        //左侧的滚动,new里边接受2个参数一个是DOM，一个是json
        this.foodsScroll=new BScroll(this.$refs.foodWrapper,{
          click:true,
          probeType:3
        });
        this.foodsScroll.on('scroll',(pos) => {
          this.scrollY=Math.abs(Math.round(pos.y));
          console.log("scrollY:"+this.scrollY);
        });
      },
      _countHeight(){
        let fooList=this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let height=0;
        this.listHeight.push(height);
        for(let i=0;i<fooList.length;i++){
          height +=fooList[i].clientHeight;
          this.listHeight.push(height);
        }
        console.log("listHeight:"+this.listHeight);
        //listHeight:0,1026,1178,1298,1606,1820,2054,2362,2858,3548
      }
    },
    //注册组件
    components:{
      shopcart,
      cartcontrol
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/less/constLess';
  @import '../../common/less/icon';
  .goods{
    display: flex;
    position: absolute;
    top:174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menus-wrapper{
      flex:0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menus-item {
        display: table;
        padding:0 12px;
        width: 56px;
        height: 54px;
        line-height: 14px;
        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
          .border-none();
        }
        .border-1px(rgba(7, 17, 27, 0.1));
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            .bg-img('goods', 'decrease_3');
          }
          &.discount {
            .bg-img('goods', 'discount_3');
          }
          &.guarantee {
            .bg-img('goods', 'guarantee_3');
          }
          &.invoice {
            .bg-img('goods', 'invoice_3');
          }
          &.special {
            .bg-img('goods', 'special_3');
          }
        }
        .text {
          display: table-cell;
          vertical-align: middle;
          width: 56px;
          font-size: @f12;
        }
      }
    }
    .foods-wrapper{
      flex:1;
      .foods-list{
        .title{
          padding-left: 14px;
          background: #f3f5f7;
          border-left:2px solid #d9dde1;
          height:26px;
          line-height:26px;
          font-size: 12px;
          color:rgb(147,153,159);
        }
        .food-item{
          display: flex;
          margin:0 18px;
          padding: 18px 0;
          border-radius: 2px;
          position: relative;
          .border-1px(rgba(7,17,27,0.1));
          &:last-child{
            .border-none();
          }
          .food-img{
            flex:0 0 57px;
            width:57px;
          }
          .food-detail{
            flex:1;
            margin-left:10px;
            & > h2{
              margin-top: 2px;
              font-size: @f14;
              line-height:@f14;
              color:rgb(7,17,27);
            }
            & > p{
              margin:8px 0;
              font-size: @f10;
              line-height: @f10;
              color:rgb(147,153,159);
            }
            .extra{
              margin:8px 0;
              font-size: @f10;
              line-height: @f10;
              color:rgb(143,153,159);
              span{
                display: inline-block;
                margin-right: 12px;
              }
            }
            .price-now{
              font-size:@f14;
              color:#f01414;
              font-weight: 700;
              line-height: 14px;
            }
            .price-old{
              font-size:@f10;
              color:rgb(147,153,159);
              font-weight: 700;
              line-height: 14px;
              text-decoration: line-through;
            }
            .cartcontrol-wrapper{
              position: absolute;
              right: 0;
              top:20px;
            }
          }
        }
      }
    }
  }
</style>
