<template>
	<view class="changepwd-body">
		<view class="container">
			<view class="changepwd-title">
				<text>Confirm</text>
				<text>Your Phone number</text>
			</view>
			<view class="changepwd-table">
				<view class="changepwd-info">
					<view class="changepwd-username">
						<text>手机号</text>
						<view class="username-input">
							<uni-easyinput class="uni-mt-5" :primaryColor="borderColor"  trim="all"  v-model="value" placeholder="请输入手机号" @input="input"></uni-easyinput>
						</view>
					</view>
					
					
					<view class="changepwd-btn">
						<button hover-class="checkActive">发送验证码</button>
					</view>
					
				
					

				</view>
			</view>

		</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	const placeholderStyle = "border-color:#42b883"
	const borderColor = "#42b883";
	const styles = {
		color: '#2979FF',
		borderColor: '#2979FF'
	}
</script>

<style lang="scss" scoped>

	.changepwd-body{
		display: flex;
		justify-content: center;
		// align-items: center;
		// font-family: "Poppins","FZZhunYuan-M02S";
	}
	
	.container{
		width: 90%;
		margin-top: 50rpx;
	}
	
	.changepwd-title{
		width: 100%;
		height: 147rpx;
		// background-color: black;
		// color: #fff;
		text{
			display: block;
			font-style: normal;
			font-weight: 600;
			font-size: 56rpx;
			line-height: 73rpx;
		}
	}
	
	.changepwd-table{
		width: 100%;
		height: 910rpx;
		margin-top: 70rpx;
		// background-color: black;
	}
	
	.changepwd-info{
		width: 100%;
		height: 382rpx;
		// background-color: black;
		
	}
	
	.changepwd-username{
		text{
			font-style: normal;
			font-weight: 500;
			font-size: 21rpx;
			line-height: 39rpx;
			color: #C5C5C5;
		}
	}
	
	.changepwd-passwd{
		margin-top: 35rpx;
		text{
			font-style: normal;
			font-weight: 500;
			font-size: 21rpx;
			line-height: 39rpx;
			color: #C5C5C5;
		}
	}
	
	.changepwd-checkboxs{
		display: flex;
		justify-content: space-between;
		margin-top: 35rpx;
		font-size: 24rpx;
		line-height: 39rpx;
		color: black;
	}
	
	.changepwd-btn{
		margin-top:56rpx ;
		button{
			color: #fff;
			background-color:#42b883;
		}
		button::after {
			 border: none;
		}		
		.checkActive{
			color:#fff;
			background-color:#33a06f;
		}
	}

	

	
</style>
