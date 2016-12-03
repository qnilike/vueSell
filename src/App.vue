<template>
    <div class="sell">
      <vHeader></vHeader>
      <vNav></vNav>
    </div>
</template>

<script>
  import vHeader from './components/header/header'
  import vNav from './components/nav/nav'

  export default{
      components:{
          vHeader,//其实就是vHeader：vHeader,es6支持这样的简写
          vNav
      }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
