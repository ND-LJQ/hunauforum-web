<template>
	<view class="mxio-scrollx-warpper">
		<scroll-view class="mxio-scrollx-box" scroll-x="true" @scroll="scroll" scroll-left="0">
			<view class="mxio-scrollx-box-grid">
				<template v-if="dataSource.length > 0">
					<view v-for="(item, index) in dataSource" :key="index"
						class="mxio-scrollx-box-grid_item" @click.stop="scrollItemClick(item,index,dataSource)">
						<image :src="item.icon" :mode="imgMode" class="mxio-scrollx-box-grid_img">
						</image>
						<view class="mxio-scrollx-box-grid_txt">{{item.label}}</view>
					</view>
				</template>
				<template v-else>
					<slot></slot>
				</template>
			</view>
		</scroll-view>
		<view class="mxio-scrollx-bar-box" v-if="barShow">
			<view class="mxio-scrollx-bar-item" :style="{
				transform: `translateX(${scrollViewLeft}px)`
			}">
				<view class="mxio-scrollx-bar-item_H"></view>
			</view>
		</view>
	</view>
</template>
<script setup lang="ts">
	import {
		ref,
		getCurrentInstance,
		computed,
		onMounted
	} from 'vue';
	
	const emits = defineEmits<{
	  (e: 'scrollItemEmitsClick', item:object, index:number, obj:object[]): void
	}>();

	// props 2022-08-17 16:26:45
	interface Props {
		barWidth?: number,
		barColor?: string,
		barBackground?: string,
		barShow?: boolean,
		dataSource?: object[],
		column?: number,
		colList?: number,
		imgMode?: string
	}
	const props = withDefaults(defineProps <Props> (), {
		barWidth: 80,
		barColor: '#42b883',
		barBackground: '#ccc',
		barShow: true,
		dataSource: () => [],
		column: 5,
		colList: 5,
		imgMode:'scaleToFill'
	});
	
	const barBackground = props.barBackground;
	const barColor = props.barColor;
	// bar宽度 2022-08-17 16:26:57
	const barWidthPx = uni.upx2px(props.barWidth);
	const barWidthHalfCopy = barWidthPx / 2;
	const barWidthRpx = barWidthPx + 'px';
	const barWidthHalfRpx = barWidthHalfCopy + 'px';

	// 列个数
	let dataSourceLen = props.dataSource.length;
	let colList  = 0;
	if(!dataSourceLen){
		colList = props.colList
	}else{
		colList = props.colList > dataSourceLen ? dataSourceLen : props.colList
	}
	let colListNum = Math.ceil(dataSourceLen / colList);

	// 可视区域宽度
	let scrollInnerWidth = 0;
	const scrollColumnWidth: any = ref('0px')
	const scroll_view_H = ref(null);
	const getCurrentInstanceComputed = computed(() => getCurrentInstance())
	const scrollViewDOM = () => {
		return new Promise((resolve) => {
			const query = uni.createSelectorQuery().in(getCurrentInstanceComputed.value);
			query.select('.mxio-scrollx-box-grid').boundingClientRect(data => {
				resolve(data);
			}).exec();
		})
	}
	const scrollViewDOMCal = async () => {
		let p: any = await scrollViewDOM();
		scrollInnerWidth = p.width;
		let column = props.column <= 0 ? 5 : props.column;
		scrollColumnWidth.value = scrollInnerWidth / column + 'px';
	}
	onMounted(()=>{
		scrollViewDOMCal();
	})
	const scrollViewLeft: any = ref(0);

	// 滚动时触发
	type scrollTs = (e) => any;
	const scroll: scrollTs = (e) => {
		let scrollLeft = e.detail.scrollLeft;
		let scrollWidth = e.detail.scrollWidth;
		let scrollItem = scrollWidth - scrollInnerWidth;
		let scrollItemCal = scrollLeft / scrollItem;
		let maxLeft = scrollItem;
		let nowLeft = scrollItemCal * barWidthHalfCopy;
		if (scrollLeft <= 0) nowLeft = 0;
		scrollViewLeft.value = nowLeft;
	}
	const scrollItemClick = (item, index, obj) => {
		emits('scrollItemEmitsClick',item, index, obj)
	}
</script>
<style lang="scss" scoped>
	.mxio-scrollx-warpper {
		.mxio-scrollx-box {
			white-space: nowrap;
			::v-deep.uni-scroll-view{
				&::-webkit-scrollBar{
					display: none;
				}
			}
			.mxio-scrollx-box-grid {
				display: grid;
				grid-template-columns: repeat(v-bind(colList), v-bind(scrollColumnWidth));
				.mxio-scrollx-box-grid_item{
					display: flex;
					align-items: center;
					flex-direction: column;
					padding: 24rpx 0;
					font-size: 24rpx;
					overflow: hidden;
				}
				.mxio-scrollx-box-grid_txt{
					color: #333;
				}
				.mxio-scrollx-box-grid_img {
					display: block;
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 12rpx;
				}
			}
		}
		.mxio-scrollx-bar-box {
			width: v-bind(barWidthRpx);
			height: 6rpx;
			background: v-bind(barBackground);
			margin: 10rpx auto;
			border-radius: 6rpx;
			.mxio-scrollx-bar-item {
				transition-property: transform;
				transition-delay: 0;
				transition-duration: 0.05s;
				transition-timing-function: linear;
				transform: translateX(0px);
				.mxio-scrollx-bar-item_H {
					width: v-bind(barWidthHalfRpx);
					height: 6rpx;
					background: v-bind(barColor);
					border-radius: 6rpx;
				}
			}
		}
	}
</style>
