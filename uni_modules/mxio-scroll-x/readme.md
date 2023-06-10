#mxio-scroll-x

当前版本是 vue3+ts，想使用vue2版本请到[仓库地址查看](https://maxiong.coding.net/public/mxio-uni-app-modules/mxio-scroll-x/git/files)



### 使用方法

#### 属性

| 属性        | 类型           | 默认值  |描述  |
| ------------- |:-------------:|:-------------:| -----|
|barWidth|number|80|滑块宽度|
|barSHow|boolean|false |滑块是否展示|
|dataSource|array、slot| [] |数据源|
|column|number|5|第一屏展示几列|
|colList|number|5|整个scrollView，你想展示多少列。默认5列,如果想展示单行值为数组长度|

#### 数据源dataSource

``` js
[
	{
		label: '',// 文本
		icon: '',// 图标 ，默认image标签，使用slot可自定义
	}
]

```



#### 案例

``` vue
<template>
	<view class="">
		传入dataSource数据源
	</view>
	<view class="" style="padding:20rpx">
		<view class="">
			第一屏4列,单行
		</view>
		<mxio-scroll-x :dataSource="dataSource" :barWidth="barWidth" :colList="11" :column="4" :barShow="barShow" @scrollItemEmitsClick="scrollItemEmitsClick">
		</mxio-scroll-x>
		<view class="">
			第一屏5列,单行
		</view>
		<mxio-scroll-x :dataSource="dataSource" :barWidth="barWidth" :colList="11" :column="5" :barShow="barShow" @scrollItemEmitsClick="scrollItemEmitsClick">
		</mxio-scroll-x>
		<view class="">
			第一屏5列,多行
		</view>
		<mxio-scroll-x :dataSource="dataSource" :barWidth="barWidth" :colList="7" :column="5" :barShow="barShow" @scrollItemEmitsClick="scrollItemEmitsClick">
		</mxio-scroll-x>
	</view>
	<view class="">
		自定义 slot
	</view>
	<view class="" style="padding:20rpx">
		<mxio-scroll-x :barWidth="barWidth" :colList="5" :column="5" :barShow="false" @scrollItemEmitsClick="scrollItemEmitsClick">
			<view v-for="(item, index) in dataSource" :key="index"
				:style="{'background':item.color}"  class="demo-scrollx-item">
				<image src="@/static/logo.png" mode="scaleToFill" class="demo-scrollx-item_img"></image>
				<view class="demo-scrollx-item_txt">{{item.label}}</view>
			</view>
		</mxio-scroll-x>
	</view>
</template>
<style lang="scss" scoped>
	.demo-scrollx-item{
		font-size: 24rpx;
		padding: 24rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		.demo-scrollx-item_img{
			display: block;
			width: 60rpx;
			height: 60rpx;
			margin-bottom: 12rpx;
		}
	}
</style>

```

+ 会有两个版本
	- vue3+ts
	- vue2