<template>
	<view class="sendcode-body">
		<view class="container">
			<view class="sendcode-title">
				<text class="code-title">输入短信验证码</text>
				<text class="contain">验证码已发送至xxxxxxx,请在下方输入框内输入4位数字验证码</text>
			</view>
			<view class="sendcode-table">
				<view class="sendcode-info">
					<uv-code-input size="100rpx" fontSize="40rpx" :focus="true" borderColor="#42b883" :maxlength="4" mode="box"></uv-code-input>
					<text class="count-seconds">60s后重新发送</text>
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

	.sendcode-body{
		display: flex;
		justify-content: center;
		// align-items: center;
		font-family: "Poppins","FZZhunYuan-M02S";
	}
	
	.container{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 80%;
		margin-top: 50rpx;
	}
	
	.sendcode-title{
		width: 100%;
		// height: 147rpx;
		// background-color: black;
		// color: #fff;
		text{
			display: block;
			
		}
		
		.code-title{
			font-style: normal;
			font-weight: 600;
			font-size: 56rpx;
			line-height: 73rpx;
		}
		
		.contain{
			color: #a7a7a7;
		}
		
		
	}
	
	.sendcode-table{
		margin-top: 100rpx;
	}
	
	.sendcode-info{
		text-align: center;
		.count-seconds{
			display: block;
			margin-top: 50rpx;
			color: #a7a7a7;
		}
	}
	


	
</style>
