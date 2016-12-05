<template>
  <div class="aa">
      <nav class="tab">
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
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
    export default{};
</script>

<style lang="less" rel="stylesheet/less">
  .tab{
    display: flex;
    width:100%;
    height:40px;
    line-height:40px;
    .tab-item{
      flex:1;
      text-align:center
    }
  }
</style>
