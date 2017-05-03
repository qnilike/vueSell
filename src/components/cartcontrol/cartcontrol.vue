<template>
	<div class="cartcontrol">
		<div class="cart-decrease icon-remove_circle_outline" style="display:none;" transition="move">
			<span class="inner"></span>
		</div>
		<div class="cart-count">{{ food.length }}</div>
		<div class="cart-add icon-add_circle" @click="cartAdd">
			
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			cartAdd(event){
				if(!event._constructed){
					return;
				}
				console.log('click');
				if(!this.food.count){
					this.food.count=1;
				}else{
					this.food.count++;
				}
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.cartcontrol{
		font-size: 0;
		.cart-decrease{
			display:inline-block;
			padding: 6px;
			font-size:24px;
		}
		.cart-count{
			display:inline-block;
		}
		.cart-add{
			display:inline-block;
			line-height: 24px;
			font-size:24px;
		}
	}
</style>