<template>
	<view class="comment-body">
		<view class="comment-container">
			<view class="input-box">
				<uv-textarea @blur="pointHandler" :cursorSpacing="corsurTop" v-model="textAreaValue" count placeholder="请输入内容"></uv-textarea>
			</view>
			<view class="function-list">
				<view class="left-list">
					<view class="emoji-box" @click="emojiBoxShow()">
						<uv-icon :name="showEmojiFlag?'pause-circle-fill':'pause-circle'" color="#6fca4f" size="35"></uv-icon>
					</view>
					<view class="img-upload" @click="uploadImg()">
						<uv-icon name="photo" color="#6fca4f" size="35"></uv-icon>
					</view>
				</view>
				<view class="right-list">
					<uv-button type="success" :plain="true" :hairline="true" text="发送"></uv-button>
				</view>
			</view>
			<view class="emoji-list" v-show="showEmojiFlag">
				<view class="emoji-list-container">
					<view class="emoji-item" @click="emojiClickHandle(item)" v-for="(item,index) in emojiList">
						{{item}}
					</view>
				</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const emojiList = [
		'😀','😃','😄','😁','😆','😅','🤣','🙂','🙃','😉','😊',
		'😇','🥰','😍','🤩','😘','😗','😚','😙','😋','😛','😜',
		'🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐'
	]
	

	const textAreaValue = ref('');
	const showEmojiFlag = ref(false);
	const corsurTop = ref(70);
	
	//光标位置
	const pointPosition = ref(0);
	const tempValue = ref('');
	//光标丢失后获取光标位置
	const pointHandler = (value,cursor) =>{
		pointPosition.value = value.detail.cursor;
		tempValue.value = value.detail.value
	}
	
	const emojiBoxShow = () =>{
		console.log(showEmojiFlag.value);
		showEmojiFlag.value = !showEmojiFlag.value;
		uni.hideKeyboard();
	}

	const emojiClickHandle = (item) => {
		console.log(item);
		const finishString = tempValue.value.slice(0,pointPosition.value) + item + tempValue.value.slice(pointPosition.value);
		console.log(finishString);
		pointPosition.value+= item.length;
		tempValue.value = finishString;
		textAreaValue.value = finishString;
		
	}
	
	
	
	// const textareaValue = ref('');
	const uploadImg = () =>{
		uni.chooseImage({
			success: (chooseImageRes) => {
				const tempFilePaths = chooseImageRes.tempFilePaths;
				uni.uploadFile({
					url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
					filePath: tempFilePaths[0],
					name: 'file',
					formData: {
						'user': 'test'
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
					}
				});
			}
		});
	}
	
</script>

<style lang="scss" scoped>
	
	.comment-body{
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.comment-container{
		width: 95%;
	}
	
	.input-box{
		margin-top: 15px;
	}
	
	.function-list{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 15px 0 15px 0;
		width: 100%;
	}
	
	.left-list{
		display: flex;
		align-items: center;
	}
	
	.img-upload{
		margin-left: 10px;
	}
	
	.right-list{
		display: flex;
		align-items: center;
	}
	
	.emoji-list{
		display: flex;
		justify-content: center;
		max-height: 200px;
		overflow:auto;
	}
	
	.emoji-item{
		width: 50px;
		height: 40px;
		margin-top: 10px;
		text-align:center;//水平居中
		line-height:20px;//跟高度一样
		font-size: 26px;
	}

	.emoji-list-container{
		// width: 80%;
		display: flex;
		flex-wrap: wrap;
	}
</style>