<template>
	<view class="bottom_input_box" :style="show?'bottom:430rpx':''">
		<image src="../static/audio.png" mode=""></image>
		<view class="input_ " @click="focus = true">
			<input v-if="focus||show" type="text" v-model="inputValue" @blur="areablur" placeholder="请输入评论"
				:focus="focus" confirm-type="send" @confirm="confirm" />
		</view>
		<image src="../static/emoji.png" v-if="!show" @click="emojichet" mode=""></image>
		<image src="../static/jianpan.png" v-else @click="keychange" mode=""></image>
		<image src="../static/add.png" mode=""></image>
	</view>
	<Emoji :show="show" @emoji="emojiChange" @emojiblur="emojiblur" />
</template>

<script setup>
	import {
		defineEmits,
		ref,
		defineExpose,
		nextTick
	} from 'vue'
	import Emoji from './emoji.vue'
	defineExpose({
		openfocus
	})
	let show = ref(false)
	const emit = defineEmits(["inputvalue", "changebulur"])
	let inputValue = ref('')
	const confirm = () => {
		emit('inputvalue', inputValue.value) //点击发送按钮时，把input的值传递给父组件
	}

	let focus = ref(false) 

	let itvalue = ref()

 

 

	function emojiblur() {
		show.value = false
	}

	function emojiChange(e) {
	 
		inputValue.value = inputValue.value + e
	}
	// 关掉emoji列表打开键盘
	function keychange() {
		show.value = false
		focus.value = true
	}
	// 打开emoji列表也获取焦点
	function emojichet() {
		show.value = true
	}
</script>

<style lang="less" scoped>
	.bottom_input_box {
		position: fixed;
		bottom: 0;
		height: 160rpx;
		width: 100%;
		z-index: 99;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-radius: 20rpx 20rpx 0px 0px;

		image {
			height: 62rpx;
			width: 62rpx;
		}

		.input_ {
			height: 62rpx;
			width: calc(100% - 300rpx);
			border: 1rpx solid #bbbbbb;
			border-radius: 30rpx;

			input {
				width: 90%;
				height: 100%;
				margin: 0 auto;
			}
		}
	}
</style>