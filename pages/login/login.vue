<template>
	<view class="login-body">
		<view class="container">
			<view class="login-title">
				<text>Hello!</text>
				<text>Welcome Back</text>
			</view>
			<view class="login-table">
				<view class="login-info">
					<view class="login-username">
						<text>账号</text>
						<view class="username-input">
							<uni-easyinput class="uni-mt-5" :primaryColor="borderColor"  trim="all"  v-model="value" placeholder="请输入账号" @input="input"></uni-easyinput>
						</view>
					</view>
					
					<view class="login-passwd">
						<text>密码</text>
						<view class="passwd-input">
							<uni-easyinput type="password" :primaryColor="borderColor" v-model="password" placeholder="请输入密码"></uni-easyinput>
						</view>
					</view>
					
					<view class="login-checkboxs">
						<view>
							<checkbox value="cb" checked="true" color="#42b883" style="transform:scale(0.7)" />
							<text>记住我</text>
						</view>
						<view>
							<text>忘记密码?</text>
						</view>
					</view>
					
					<view class="login-btn">
						<button hover-class="checkActive">登录</button>
					</view>
					
					<view class="dividing-line">
						<view class="line-text">
							<text>Or</text>
						</view>
					</view>
					
					<view class="platforms-box">
						<view class="qq-box">
							<button><image src="../../static/images/qq.svg" mode="heightFix"></image>qq登录</button>
						</view>
						<view class="weChat-box">
							<button><image src="../../static/images/wechat.svg" mode="heightFix"></image>微信登录</button>
						</view>
					</view>
				</view>
			</view>
			<view class="login-footer">
				<text>没有账号?</text><a href="#">立即注册!</a>
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

	.login-body{
		display: flex;
		justify-content: center;
		// align-items: center;
		font-family: "Poppins","FZZhunYuan-M02S";
	}
	
	.container{
		width: 90%;
		margin-top: 50rpx;
	}
	
	.login-title{
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
	
	.login-table{
		width: 100%;
		height: 910rpx;
		margin-top: 70rpx;
		// background-color: black;
	}
	
	.login-info{
		width: 100%;
		height: 382rpx;
		// background-color: black;
		
	}
	
	.login-username{
		text{
			font-style: normal;
			font-weight: 500;
			font-size: 21rpx;
			line-height: 39rpx;
			color: #C5C5C5;
		}
	}
	
	.login-passwd{
		margin-top: 35rpx;
		text{
			font-style: normal;
			font-weight: 500;
			font-size: 21rpx;
			line-height: 39rpx;
			color: #C5C5C5;
		}
	}
	
	.login-checkboxs{
		display: flex;
		justify-content: space-between;
		margin-top: 35rpx;
		font-size: 24rpx;
		line-height: 39rpx;
		color: black;
	}
	
	.login-btn{
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
	
		
	.dividing-line{
		color: #838383;
		margin-top: 56rpx;
		font-size: 28rpx;
		line-height: 42rpx;
	}
	
	.line-text{
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		&::after{
			content: "";
			display: inline-block;
			border: 1px;
			border-color: #D9D9D9;;
			border-style: dotted;
			flex-grow: 1;
		}
		&::before{
			content: "";
			display: inline-block;
			border: 1px;
			border-color: #D9D9D9;;
			border-style: dotted;
			flex-grow: 1;
		}
	}
	
	.platforms-box{
		width: 100%;
		margin-top: 56rpx;
		button{
			display: flex;
			justify-content: center;
			align-items: center;
			height:94.6rpx;
			font-size: 28rpx;
			line-height: 42rpx;
			border: 0;
			background-color: #fff;
			&{
				image{
					// display: inline-block;
					height: 42rpx;
					margin-right: 14rpx;
				}
			}

		}
		
	}
	
	.qq-box{
		// border: 1px solid #EDEDED;
		border-radius: 12px;
		height: 94.6rpx;
	}
	
	.weChat-box{
		// border: 1px solid #EDEDED;
		border-radius: 12px;
		margin-top: 35.06rpx;
	}
	
	
	.login-footer{
		width: 100%;
		margin-top: 191rpx;
		text-align: center;
	}
	
</style>
