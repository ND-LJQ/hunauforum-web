<template>
	<view class="register-body">
		<view class="container">
			<view class="register-box">
				<view class="register-title">
					<text>Register</text>
					<text>New Account</text>
				</view>
				<view class="register-table">
					<view class="register-info">
						<view class="register-username">
							<text>账号</text>
							<view class="username-input">
								<uni-easyinput class="uni-mt-5" :primaryColor="borderColor"  trim="all"  v-model="value" placeholder="请输入账号" @input="input"></uni-easyinput>
							</view>
						</view>
						
						<view class="register-passwd">
							<text>密码</text>
							<view class="passwd-input">
								<uni-easyinput type="password" :primaryColor="borderColor" v-model="password" placeholder="请输入密码"></uni-easyinput>
							</view>
						</view>
						
						<view class="register-repasswd">
							<text>确认密码</text>
							<view class="passwd-input">
								<uni-easyinput type="password" :primaryColor="borderColor" v-model="password" placeholder="请确认密码"></uni-easyinput>
							</view>
						</view>
						
						<view class="register-checkboxs">
							<view>
								<checkbox value="cb" checked="true" color="#42b883"  style="transform:scale(0.7)" />
								<text>我同意条款和条件</text>
							</view>
						</view>
						
						<view class="register-btn">
							<button hover-class="checkActive">注册</button>
						</view>
					</view>
				</view>
			</view>
			<view class="register-footer">
				<text>已有账号?</text><a href="#">立即登录!</a>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import { onLoad,onShow } from "@dcloudio/uni-app";
	const placeholderStyle = "border-color:#42b883"
	const borderColor = "#42b883";
	const styles = {
		color: '#2979FF',
		borderColor: '#2979FF'
	}
		
</script>

<style lang="scss" scoped>
	
		
	.register-body{
		display: flex;
		justify-content: center;
		// align-items: center;
		font-family: "Poppins","FZZhunYuan-M02S";
		height:calc(100vh - 44px) ;
	}
	
	.container{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 90%;
		margin-top: 50rpx;
	}
	
	.register-box{
		// flex: 1;
	
	}
	
	.register-title{
		width: 100%;
		// height: 147rpx;
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
	
	.register-table{
		width: 100%;
		// height: 910rpx;
		margin-top: 70rpx;
		// background-color: black;
	}
	
	.register-info{
		width: 100%;
		// height: 382rpx;
		// background-color: black;
		
	}
	
	.register-username{
		text{
			font-style: normal;
			font-weight: 500;
			font-size: 21rpx;
			line-height: 39rpx;
			color: #C5C5C5;
		}
	}
	
	.register-passwd,.register-repasswd{
		margin-top: 35rpx;
		text{
			font-style: normal;
			font-weight: 500;
			font-size: 21rpx;
			line-height: 39rpx;
			color: #C5C5C5;
		}
	}
	
	.register-checkboxs{
		display: flex;
		justify-content: space-between;
		margin-top: 35rpx;
		font-size: 24rpx;
		line-height: 39rpx;
		color: black;
	}
	
	.register-btn{
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
	
		
	.register-footer{
		width: 100%;
		margin-bottom: 50rpx;
		text-align: center;
	}
	
</style>
