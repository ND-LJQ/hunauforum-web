<template>
	<view class="search-body">
		<uv-sticky>
			<view class="content" :style="{ 'height':barHeight+'px'}">
			</view>
			<view class="search-input">
				<view class="search-icon-box">
					<uni-icons type="back"></uni-icons>
				</view>
				<uv-search placeholder="日照香炉生紫烟" :animation="true" v-model="keyword"></uv-search>
			</view>
		</uv-sticky>
		
		
	</view>
</template>

<script setup>
	import {
		onShow,
		onLoad,
		onReady,
		onPageScroll
	} from "@dcloudio/uni-app"

	import { ref } from 'vue'
	const barHeight = ref(0)
	onShow(() => {
		barHeight.value = uni.getSystemInfoSync().statusBarHeight;
	})
</script>

<style scoped>
.search-input{
	display: flex;
	align-items: center;
}

.search-icon-box{
	display: flex;
	flex-grow: 0.1;
	justify-content: center;
}
</style>
