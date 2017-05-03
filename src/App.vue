<template>
    <div class="sell">
      <vHeader :seller="seller"></vHeader>
      <vNav :seller="seller"></vNav>
    </div>
</template>

<script type="">
  import vHeader from './components/header/header'
  import vNav from './components/nav/nav'

  export default{
      //头部ajax数据渲染的data,这时需要用到vue-resource
      data(){
        return {
          seller:{}
        }
      },
      created(){
        this.$http.get('/api/seller').then((response)=>{
            //成功的回调函数
            response=response.body;
            console.log("seller:"+response);
            //errno在dev-server里边定义的
            if(response.errno===0){
                this.seller=response.data;
            }
        },(response)=>{
            //失败的回调函数
        })
      },
      components:{
          vHeader,//其实就是vHeader：vHeader,es6支持这样的简写
          vNav
      }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
