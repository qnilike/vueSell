<template>
  <div class="nav-content">
      <nav class="tab border-1px">
        <div class="tab-item">
          <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
      </nav>
      <div class="contentTab">
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view :seller="seller"></router-view>
      </div>
  </div>
</template>

<script>
    export default{
      props:{
        seller:{
          type:Object
        }
      }
    };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/less/constLess';

  .tab{
    display: flex;
    width:100%;
    height:40px;
    line-height:40px;
    /*border-bottom: 1px solid rgba(7,17,27,0.1);*/
    .border-1px(#ccc);
    .tab-item{
      flex:1;
      text-align:center;
    }
    & a{
      display:block;
      color:#333;
      font-size:@f14;
      &:hover{
        color:@activeCol;
      }
      &.active{
        color:@activeCol;
      }
    }
  }
</style>
