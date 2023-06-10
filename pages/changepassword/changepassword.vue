<template>
	<view class="changepwd-body">
		<view class="container">
			<view class="changepwd-box">
				<view class="changepwd-title">
					<text>Create password</text>
					<text class="contain">Enter the email associated with your account and we’ll send an email with code to reset your password.</text>
				</view>
				<view class="changepwd-table">
					<view class="changepwd-info">
						<view class="changepwd-username">
							<text>密码</text>
							<view class="username-input">
								<uni-easyinput class="uni-mt-5" :primaryColor="borderColor" type="password"  trim="all"  v-model="value" placeholder="请输入原密码" @input="input"></uni-easyinput>
							</view>
						</view>
						
						<view class="changepwd-passwd">
							<text>新密码</text>
							<view class="passwd-input">
								<uni-easyinput type="password" :primaryColor="borderColor" v-model="password" placeholder="请输入新密码"></uni-easyinput>
							</view>
						</view>
						
						<view class="changepwd-repasswd">
							<text>确认新密码</text>
							<view class="passwd-input">
								<uni-easyinput type="password" :primaryColor="borderColor" v-model="password" placeholder="请确认新密码"></uni-easyinput>
							</view>
						</view>
						
						<view class="conditions">
							<view class="conditions-1">
								<image src="../../static/images/勾.svg" mode="heightFix"></image>
								<text>8 to 20 strong characters</text>
							</view>
							<view class="conditions-2">
								<image src="../../static/images/叉.svg" mode="heightFix"></image>
								<text>Strong letters, numbers, and special characters</text>
							</view>
						</view>
						

						
						<view class="changepwd-btn">
							<button hover-class="checkActive">修改密码</button>
						</view>
					</view>
				</view>
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
	
	const conditions = [{
		text:'8 to 20 strong characters',
		value:1
	},{
		text:"Strong letters, numbers, and special characters",
		value:2
	}]
		
</script>

<style lang="scss" scoped>
	
		
	.changepwd-body{
		display: flex;
		justify-content: center;
		// align-items: center;
		// font-family: "Poppins","FZZhunYuan-M02S";
		height:calc(100vh - 44px) ;
	}
	
	.container{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 90%;
		margin-top: 50rpx;
	}
	
	.changepwd-box{
		// flex: 1;
	
	}
	
	.changepwd-title{
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
		
		.contain{
			font-weight: 500;
			font-weight: 400;
			font-size: 16px;
			line-height: 24px;
			color: #838383;

		}
	}
	
	.changepwd-table{
		width: 100%;
		// height: 910rpx;
		margin-top: 70rpx;
		// background-color: black;
	}
	
	.changepwd-info{
		width: 100%;
		// height: 382rpx;
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
	
	.changepwd-passwd,.changepwd-repasswd{
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
	
	.conditions{
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-weight: 400;
		font-size: 12px;
		line-height: 20px;
		/* identical to box height, or 167% */
		/* Gray 1 */
		color: #838383;
		margin-top: 10px;
		image{
			height: 15px;
			margin-right: 3px;
		}
		.conditions-1{
			display: flex;
			align-items: center;
		}
		.conditions-2{
			margin-top: 10px;
			display: flex;
			// align-items: center;
		}
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
