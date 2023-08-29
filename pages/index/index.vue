<template>
	<view class="index-body">
		<uv-sticky>
			<view class="content" :style="{ 'height':barHeight+'px'}">
			</view>
		</uv-sticky>
		
		<view class="container">
			<view class="navbar">
				<view class="avatar-box">
					<!-- :text="userAvatar.text" 绑定text优先使用text -->
					<uv-avatar :src="userAvatar.src" size="30" ></uv-avatar>
				</view>
				<view class="search-box">
					<uv-search :disabled="true" :showAction="false" shape="round"></uv-search>
				</view>
				<view class="notification-box">
					<uni-icons type="notification" size="30"></uni-icons>
				</view>
			</view>
			<uv-sticky :offset-top="barHeight"> 
				 <view class="tabs-box">
				 	<view class="tabs-container">
				 		<uv-tabs :list="list1" @click="click"
				 		
				 		lineColor="var(--line-color)"
				 		
				 		:activeStyle="{
				 			color: 'var(--text-active-color)',
				 			fontWeight: 'bold',
				 			transform: 'scale(1.05)'
				 		}"
				 		:inactiveStyle="{
				 			color: 'var(--text-inactive-color)',
				 			transform: 'scale(1)'
				 		}"
				 		itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
				 		>></uv-tabs>
				 	</view>
				 </view>
			</uv-sticky>
			<view class="swiper-container">
				<uv-swiper
				   :list="list2"
				   height="150"
				   indicator
				   previousMargin="30"
				   nextMargin="30"
				   showTitle
				   bgColor="#fff"
				   radius="5"
				   key-name="image"
				   circular
				></uv-swiper>
			</view>
			
			<view class="scroll-box" >
				 <mxio-scroll-x   :dataSource="dataSource"  :colList="11" :column="5" :barShow="true" @scrollItemEmitsClick="scrollItemEmitsClick">
				        </mxio-scroll-x>
			</view>
			
			<view class="card-items-container">
				<view class="card-item" v-for="(item,index) in articleTestList">
					<uni-card :title="item.userName" :sub-title="`来自 📱${item.phoneName}`" extra="额外信息" :thumbnail="avatar"  @click="onClick">
						<view class="card-body">
							<view class="">
								<text class="uni-body">这是一个带封面和操作栏的卡片示例，此示例展示了封面插槽和操作栏插槽的用法。</text>
							</view>
							<view class="image-box">
								<view class="image-box-container" v-for="imgItem in item.imgSrcs">
									<image :src="imgItem.src" style="width: 100%;height: 100%;"></image>
								</view>
							</view>
							<view slot="actions" class="card-actions">
								<view class="card-actions-item" @click="actionsClick('点赞')">
									<uni-icons type="hand-up" size="18" color="#999"></uni-icons>
									<text class="card-actions-item-text">点赞</text>
								</view>
								<view class="card-actions-item" @click="actionsClick('评论')">
									<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
									<text class="card-actions-item-text">评论</text>
								</view>
								<view class="card-actions-item" @click="actionsClick('分享')">
									<uni-icons type="redo" size="18" color="#999"></uni-icons>
									<text class="card-actions-item-text">转发</text>
								</view>
							</view>
						</view>
					</uni-card>				
				</view>

			</view>

		</view>
		<uv-back-top :scroll-top="scrollTop"></uv-back-top>
	</view>



</template>

<script setup>
	import {
		onShow,
		onLoad,
		onReady,
		onPageScroll
	} from "@dcloudio/uni-app"
	import {
		ref,
		reactive,
		onMounted
	} from "vue";


	const testText = "测试"
	const avatar = 'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
	const cover = 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg'
	const barHeight = ref(0);
	const scrollTop = ref(0);
	const userAvatar = reactive({
		src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
		text: '无头像'					
	})
	
	const  list1 = [{
                    name: '关注',
                }, {
                    name: '推荐',
                }, {
                    name: '电影'
                }, {
                    name: '科技'
                }, {
                    name: '音乐'
                }, {
                    name: '美食'
                }, {
                    name: '文化'
                }, {
                    name: '财经'
                }, {
                    name: '手工'
                },{
                    name: '关注',
                }, {
                    name: '推荐',
                }, {
                    name: '电影'
                }, {
                    name: '科技'
                }, {
                    name: '音乐'
                }, {
                    name: '美食'
                }, {
                    name: '文化'
                }, {
                    name: '财经'
                }, {
                    name: '手工'
                }]

	const list2 = [

		{
			image: '../../static/banner1.jpg',
			title: '昨夜星辰昨夜风，画楼西畔桂堂东',
		},
		{
			image: '../../static/banner2.jpg',
			title: '身无彩凤双飞翼，心有灵犀一点通',
		},
		{
			image: '../../static/banner3.jpg',
			title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
		}
	]
	const articleTestList = [
		{
			userName:"小鲨鲨",
			phoneName:"小米",
			imgSrcs:[{
				src:"../../static/bg1.jpg"
			},{
				src:"../../static/bg1.jpg"
			},{
				src:"../../static/bg1.jpg"
			}]
		},
		{
			userName:"小呆呆",
			phoneName:"华为",
			imgSrcs:[{
				src:"../../static/bg1.jpg"
			}]
		},
		{
			userName:"霸气哥哥",
			phoneName:"iqoo10",
			imgSrcs:[{
				src:"../../static/bg1.jpg"
			}]
		},
		{
			userName:"嘻嘻",
			phoneName:"vivo",
			imgSrcs:[{
				src:"../../static/bg1.jpg"
			}]
		},
		{
			userName:"小呆呆",
			phoneName:"华为",
			imgSrcs:[{
				src:"../../static/bg1.jpg"
			}]
		}
	] 
	const dataSource = [
			{
				label: '信科院',// 文本
				icon: '../../static/images/academy/xinke.png',// 图标 ，默认image标签，使用slot可自定义
				id: 1
			},
			{
				label: '农学院',// 文本
				icon: '../../static/images/academy/nongxue.png',// 图标 ，默认image标签，使用slot可自定义
				id: 2
			},
			{
				label: '机电院',// 文本
				icon: '../../static/images/academy/jidian.png',// 图标 ，默认image标签，使用slot可自定义
				id: 3
			},
			{
				label: '体院',// 文本
				icon: '../../static/images/academy/tiyu.png',// 图标 ，默认image标签，使用slot可自定义
				id: 4
			},
			{
				label: '水土院',// 文本
				icon: '../../static/images/academy/tumu.png',// 图标 ，默认image标签，使用slot可自定义
				id: 5
			},
			{
				label: '景艺院',// 文本
				icon: '../../static/images/academy/jingyi.png',// 图标 ，默认image标签，使用slot可自定义
				id: 6
			},
			{
				label: '园艺院',// 文本
				icon: '../../static/images/academy/yuanyi.png',// 图标 ，默认image标签，使用slot可自定义
				id: 7
			},
			{
				label: '水产院',// 文本
				icon: '../../static/images/academy/shuichan.png',// 图标 ，默认image标签，使用slot可自定义
				id: 8
			},
			{
				label: '动医院',// 文本
				icon: '../../static/images/academy/dongyi.png',// 图标 ，默认image标签，使用slot可自定义
				id: 9
			},
			{
				label: '经济院',// 文本
				icon: '../../static/images/academy/jingji.png',// 图标 ，默认image标签，使用slot可自定义
				id: 10
			},
			{
				label: '马克思院',// 文本
				icon: '../../static/images/academy/makesi.png',// 图标 ，默认image标签，使用slot可自定义
				id: 11
			}
			,{
				label: '商学院',// 文本
				icon: '../../static/images/academy/shangxue.png',// 图标 ，默认image标签，使用slot可自定义
				id: 12
			},
			{
				label: '资环院',// 文本
				icon: '../../static/images/academy/zihuan.png',// 图标 ，默认image标签，使用slot可自定义
				id: 13
			},
			{
				label: '化材院',// 文本
				icon: '../../static/images/academy/huacai.png',// 图标 ，默认image标签，使用slot可自定义
				id: 14
			},
			{
				label: '生科院',// 文本
				icon: '../../static/images/academy/shengke.png',// 图标 ，默认image标签，使用slot可自定义
				id: 15
			},
			{
				label: '食科院',// 文本
				icon: '../../static/images/academy/shike.png',// 图标 ，默认image标签，使用slot可自定义
				id: 16
			},
			{
				label: '人外院',// 文本
				icon: '../../static/images/academy/renwai.png',// 图标 ，默认image标签，使用slot可自定义
				id: 17
			},
			{
				label: '植保院',// 文本
				icon: '../../static/images/academy/zhibao.png',// 图标 ，默认image标签，使用slot可自定义
				id: 18
			},
			{
				label: '公法院',// 文本
				icon: '../../static/images/academy/gongfa.png',// 图标 ，默认image标签，使用slot可自定义
				id: 19
			},
			{
				label: '教育院',// 文本
				icon: '../../static/images/academy/jiaoyu.png',// 图标 ，默认image标签，使用slot可自定义
				id: 20
			},
			{
				label: '动科院',// 文本
				icon: '../../static/images/academy/dongke.png',// 图标 ，默认image标签，使用slot可自定义
				id: 21
			},
			{
				label: '东方科技学院',// 文本
				icon: '../../static/images/academy/dongfang.png',// 图标 ，默认image标签，使用slot可自定义
				id: 22
			}
	]

	

	
	const click = (item) => {
	    console.log('item', item);
	}
	
	const onClick = () =>{
		console.log("被点击");
	}
	
	const scrollItemEmitsClick = (item, index, array) =>{
		console.log(item);
	}



	onShow(() => {
		barHeight.value = uni.getSystemInfoSync().statusBarHeight;
	})
	
	
	onPageScroll((e)=>{
		scrollTop.value = e.scrollTop;
		// #ifdef APP-NVUE
		scrollTop.value = e.detail.scrollTop;
		// #endif
	})



</script>

<style lang="scss" scoped>
	
	body{
		--line-color: #{$forum-color-primary};
		--text-inactive-color:#{$forum-text-color-inactive-light};
		--text-active-color:#{$forum-text-color-active-light};
	}
	
	
	.index-body{
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		
	}
	
	.content {
		width: 100vw;
		background-color: #fff;
	}
	
	.container{
		width: 95%;
	}
	
	.tabs-box{
		background-color: #fff;
	}
	
	.tabs-container{
		margin-top: 10rpx;
	}
	
	.scroll-box{
		font-size: 20px;
	}


	.navbar{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
		.avatar-box{
			// margin-left: 10rpx;
		}
		.search-box{
			flex-grow: 0.9;
		}
		
	}
	
	.swiper-container{
		margin-top: 15rpx;
		
	}
	
	.card-actions{
		display: flex;
		justify-content: space-around;
		margin-top: 20rpx;
	}
	
	.image-box{
		display: flex;
	}
	
	.image-box-container{
		flex-grow: 1;
		height: 300rpx;
	}
	
	.uni-card{
		font-family: "Poppins","FZZhunYuan-M02S";
		
	}
	
	:deep(.uni-card__header-avatar){
		border-radius: 50%!important;
		overflow: hidden!important;
	}
</style>