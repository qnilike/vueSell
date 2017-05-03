<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
  const LENGTH=5;
  const CLI_ON='on';
  const CLI_HALF='half';
  const CLI_OFF='off';
  export default{
    props:{
      size:{
        type:Number
      },
      score:{
        type:Number
      }
    },
    computed:{
      starType(){
        return 'star-'+this.size
      },
      itemClasses(){
        var result=[];
        var score=Math.floor( this.score * 2 ) / 2;
        var hasDecimal=score % 1 !==0;//判断有没有半星
        var Integer=Math.floor(score);//判断有几个正星
        for(var i=0;i<Integer;i++){
          result.push(CLI_ON);
        }
        if(hasDecimal){
          result.push(CLI_HALF);
        }
        while(result.length<LENGTH){
          result.push(CLI_OFF);
        }
        return result;
        alert(result);
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/less/constLess';

  .star{
    font-size: 0;
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48{
      .star-item{
        margin-right: 22px;
        width:20px;
        height: 20px;
        background-size: 20px 20px;
        background-repeat: no-repeat;
        &:last-child{
          margin-right:0;
        }
        &.on{
          .bg-img('star','star48_on');
        }
        &.half{
          .bg-img('star','star48_half');
        }
        &.off{
          .bg-img('star','star48_off');
        }
      }
    }
    &.star-36{
      .star-item{
        margin-right:6px;
        width:15px;
        height: 15px;
        background-size: 15px 15px;
        background-repeat: no-repeat;
        &:last-child{
          margin-right:0;
        }
        &.on{
          .bg-img('star','star36_on');
        }
        &.half{
          .bg-img('star','star36_half');
        }
        &.off{
          .bg-img('star','star36_off');
        }
      }
    }
    &.star-24 {
      .star-item {
        margin-right:3px;
        width: 10px;
        height: 10px;
        background-size: 10px 10px;
        background-repeat: no-repeat;
        &:last-child {
          margin-right: 0;
        }
        &.on{
          .bg-img('star','star24_on');
        }
        &.half{
          .bg-img('star','star24_half');
        }
        &.off{
          .bg-img('star','star24_off');
        }
      }
    }
  }
</style>
