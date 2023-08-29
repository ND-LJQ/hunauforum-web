<template>
	<view class="article-body">
		<view class="article-header-info">
			<view class="header-container">
				<view class="article-title">
					<text>
						浏览器缓存机制介绍与缓存策略剖析
					</text>
				</view>
				<view class="user-info">
					<view class="info-containner">
						<view class="user-avatar">
							<image src="../../static/logo.png" style="height: 100%;"  mode="heightFix"></image>
						</view>
						<view class="user-info-box">
							<view class="info-top">
								<view class="user-name">
									<text>测试最长长度啊</text>
								</view>
								<view class="user-level">
									<image src="../../static/level.webp" style="height: 100%;" mode="heightFix"></image>
								</view>
								<view class="user-badge">
									<image src="../../static/badge.svg" style="height: 100%;" mode="heightFix"></image>
								</view>
							</view>
							<view class="info-button">
								<view class="post-time">
									<text>一天前&nbsp</text>
								</view>
								<text>·</text>
								<view class="read-count">
									<text>&nbsp阅读 1000</text>
								</view>
							</view>
						</view>
					</view>
					<view class="user-button">
						<uv-button  type="success" size="small" :plain="true" :hairline="true" text="关注"></uv-button>
						<!-- <button class="follow-btn" type="default" size="mini">按钮</button> -->
					</view>
				</view>
			</view>
			<view class="article-content">
				<ua-markdown :source="mdvalue" />
			</view>
		</view>
	</view>
</template>

<script setup>
import artileText from '../../common/article.js'
const mdvalue = `${artileText}`	
</script>

<style lang="scss" scoped>
	
.article-body{
	display: flex;
	flex-direction: column;
	align-items: center;
}

	
.article-header-info{
	width: 95%;
}
	
.article-title{
	font-size: 30px;
	font-weight: 600;
}

.info-containner{
	display:flex;
	align-items: center;
}

.user-info{
	margin-top: 30rpx;
	display: flex;
	justify-content: space-between;
	height: 100rpx;
}

.user-info-box{
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 10px;
}

.user-avatar,.user-info-box,.info-button{
	height:100rpx;
	// width: 100rpx;
}


.user-name{
	color: #282c2f;
	// font-weight: 600;
	font-size: 15px;
}

.info-top,.info-button{
	display: flex;	
	height: 35%;
}


.info-button{
	color: #8b8f9b;
	font-size: 12px;
	margin-top: 5px;
}

.user-button{
	display: flex;
	align-items: center;
}

.article-content{
	margin-top: 50rpx;
}


</style>
<style>
	.ua__markdown img{
		max-width: 100%;
	}
	
	.ua__markdown p{
		margin-button: 12px;
	}
	
	.ua__markdown{
	    background-image: linear-gradient(90deg,rgba(50,0,0,.05) 3%,transparent 0),linear-gradient(1turn,rgba(50,0,0,.05) 3%,transparent 0);
		background-size: 20px 20px;
		background-position: 50%;
	}
</style>
