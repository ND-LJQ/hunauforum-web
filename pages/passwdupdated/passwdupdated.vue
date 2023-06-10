<template>
	<view class="updated-body">
		<view class="updated-container">
			<view class="update-box">
				<view class="updated-img">
					<image src="../../static/images/changepwdsuccess.svg" mode=""></image>
				</view>
				<view class="updated-text">
					<view class="text-title">
						<text>密码已更新</text>
					</view>
					<view class="text-contain">
						<text>Your password has been setup successfully</text>
					</view>
				</view>
			</view>
			<view class="back-btn">
				<button hover-class="checkActive">返回登录</button>
			</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>

.updated-body{
	display: flex;
	justify-content: center;
	// align-items: center;
	// font-family: "Poppins","FZZhunYuan-M02S";
	height: 100vh;
}

.updated-container{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 90%;
}

.updated-img{
	width:280rpx;
	height: 280rpx;
	image{
		height:100%;
		width:100%;
	}
}

.update-box{
	flex:1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.updated-text{
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	.text-title{
		font-weight: 600;
		font-size: 42rpx;
		line-height: 70.9rpx;
	}
	.text-contain{
		// margin-top: 14rpx;
		width: 90%;
		font-weight: 400;
		font-size: 28rpx;
		line-height: 45.56rpx;
		color: #838383;

	}
}

.back-btn{
	// margin-top: 471.37rpx;
	width: 100%;
	margin-bottom: 60rpx;
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
