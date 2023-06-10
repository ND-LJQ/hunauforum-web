<template>
    <view class="scroll-wrap" :style="getScrollWrapStyle">
        <!-- #ifdef MP-WEIXIN -->
        <scroll-view
            v-if="!isShowList"
            class="scroll-view_hold"
            scroll-x="true"
            scroll-with-animation="true"
            :scroll-left="position"> 
            <view
                v-for="(item, index) in list"
                :key="index"
                class="scroll-view-item"
                :style="choseInd === index ? getActiveStyle : getDefaultStyle" 
                @click="onClickScrollItem(index, item)">
                {{ item }}
            </view>
            <view
                v-if="isUseOpenList" 
                style="width: 62rpx; display: inline-block;">
            </view>
        </scroll-view>
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <scroll-view
            v-show="!isShowList"
            class="scroll-view_hold"
            scroll-x="true"
            scroll-with-animation="true"
            :scroll-left="position"> 
            <view
                v-for="(item, index) in list"
                :key="index"
                class="scroll-view-item"
                :style="choseInd === index ? getActiveStyle : getDefaultStyle" 
                @click="onClickScrollItem(index, item)">
                {{ item }}
            </view>
            <view
                v-if="isUseOpenList" 
                style="width: 62rpx; display: inline-block;">
            </view>
        </scroll-view>
        <!-- #endif -->
        <view 
            v-if="isUseOpenList && !isShowList" 
            class="open-list"
            @click="handleShowList">
            <slot name="icon-unfold">
                <img class="icon-unfold" :src="icon_unfold" />
            </slot>
        </view>
        <view
            v-show="isShowList" 
            class="list-wrap bg-fff">
            <slot name="open-list-tit">
                <view class="open-list-tit flex justify-between border-bottom-solid-ccc">
                    <view class="text-lineheight-lg padding-lr size-28">{{
                            openListTit
                    }}</view>
                    <view 
                        class="flex align-center text-lineheight-lg padding-lr"
                        @click="handleShowList">
                        <slot name="icon-fold">
                            <img class="icon-fold" :src="icon_fold"/>
                        </slot>
                    </view>
                </view>
            </slot>

            <view class="open-list-content flex flex-wrap padding-lr padding-bottom-sm">
                <view
                    v-for="(item, index) in list" 
                    :key="index"
                    :style="choseInd === index ? getActiveStyle : getDefaultStyle" 
                    class="scroll-view-item_wrap"
                    @click="onClickListItem(index, item)">
                    {{ item }}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import icon_unfold from '../static/vgt-tab/icon-unfold.svg'
import icon_fold from '../static/vgt-tab/icon-fold.svg'

export default {
    name: "vgt-tab",
    props: {
        list: {
            type: Array,
            required: true,
            default: [],
        },
        isUseOpenList: {
            type: Boolean,
            default: true,
        },
        openListTit: {
            type: String,
            default: "切换",
        },
        itemStyleDefault: {
            type: Object,
            default: () => ({}),
        },
        itemStyleActive: {
            type: Object,
            default: () => ({}),
        },
        scrollWrapStyle: {
            type: Object,
            default: () => ({}),
        },
        defaultChoseInd: {
            type: Number,
            default: 0,
        },
        defaultChoseItem: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            icon_unfold: icon_unfold,
            icon_fold: icon_fold,
            scrollViewLeftArr: [], // 存储scroll信息
            choseInd: 0, // 当前选中项下标
            position: 0, // 滑动位置
            windowWidth: 0, // 页面宽度
            isShowList: false, // 是否展示为列表形式
        }
    },
    computed: {
        getDefaultStyle() {
            const {
                itemStyleDefault
            } = this
            const defaultStyleObj = {
                color: "#393939",
                background: "#f4f4f4",
            }
            return this.setStyle(defaultStyleObj, itemStyleDefault)
        },
        getActiveStyle() {
            const { 
                itemStyleActive
            } = this
            const activeStyleObj = {
                color: "#3555fc",
                border: "1rpx solid #3555fc;",
            }
            return this.setStyle(activeStyleObj, itemStyleActive)
        },
        getScrollWrapStyle() {
            const { 
                scrollWrapStyle
            } = this

            return this.setStyle({}, scrollWrapStyle)
        }
    },
    watch: {
        list: {
            handler: function() {
                if(!this.scrollViewLeftArr.length) {
                    this.getListItemScorllPos()
                    this.calcDefaultChosePos()
                }
            },
            immediate: true,
            deep: true
        },
        defaultChoseInd: {
            handler: function() {
                this.calcDefaultChosePos()
            },
            immediate: true,
        },
        defaultChoseItem: {
            handler: async function() {
                this.calcDefaultChosePos()
            },
            immediate: true,
        },
        // #ifdef MP-WEIXIN
        scrollViewLeftArr: {
            handler: function(scrollViewList) {
                if(scrollViewList.length) {
                    this.calcDefaultChosePos()
                    console.log(scrollViewList, 'scroll')
                }
            },
        }
        // #endif
    },
    mounted() {
        this.getListItemScorllPos()
    },
    methods: {
        calcDefaultChosePos() {
            const {
                defaultChoseInd, 
                defaultChoseItem
            } = this || {}

            if (defaultChoseItem) {
                const defaultItemInd = this.list.findIndex((item) => item === defaultChoseItem)
                const choseInd = defaultItemInd !== -1 ? defaultItemInd : 0
                this.calcPos(choseInd)
                return
            }

            this.calcPos(defaultChoseInd)
        },
        calcPos(choseInd) {
            setTimeout(()=>{
                const currentListItem = this.scrollViewLeftArr[choseInd]
                if(currentListItem) {
                    const halfPos = this.windowWidth / 2 - 30
                    const currentPosition = currentListItem.left - halfPos
                    this.position = currentPosition < 0 ? 1 : currentPosition
                    this.choseInd = choseInd
                }
            }, 0)
        },
        async getListItemScorllPos() {
            const [_, { windowWidth }] = (await uni.getSystemInfo()) || {}
            this.windowWidth = windowWidth
            // 获取列表每个dom的偏移量
            const query = uni.createSelectorQuery().in(this)
            query.selectAll(".scroll-view-item").boundingClientRect()
            query.exec((res) => {
                res &&
                res.length &&
                res[0].forEach((element, i) => {
                    const { left } = element || {}
                    const posObj = {
                        left: left,
                    }
                    this.scrollViewLeftArr.push(posObj)
                })
            })
            
        },
        onClickListItem(index, data) {
            this.isShowList = false
            this.calcPos(index)
            this.$emit("onValueChange",
                {
                    currentInd: index,
                    currentItem: data
                }
            )
            this.$emit("onListShow", true)
        },
        onClickScrollItem(index, data) {
            this.calcPos(index)
            this.$emit("onValueChange",
                {
                    currentInd: index,
                    currentItem: data
                }
            )
        },
        handleShowList() {
            this.isShowList = !this.isShowList
            this.$emit("onListShow", !this.isShowList)
        },
        setStyle(DefaultStyleObj, CurrentStyleObj) {
            Object.assign(DefaultStyleObj, CurrentStyleObj)
            let style = ""
            Object.keys(DefaultStyleObj).forEach((e) => {
                style += `${e}: ${DefaultStyleObj[e]};`
            });
            return style;
        },
    },
};
</script>

<style scoped>
.flex {
    display: flex;
}

.flex-wrap {
    flex-wrap: wrap;
}

.padding-lr {
    padding: 0 30rpx;
}

.padding-bottom-sm {
    padding-bottom: 20rpx;
}

.justify-between {
    justify-content: space-between;
}

.align-center {
    align-items: center;
}

.text-lineheight-lg {
    line-height: 80rpx;
}

.border-bottom-solid-ccc {
    position: relative;
}

.border-bottom-solid-ccc::after {
    content: '';
    position: absolute;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 1rpx;
    background: #ccc;
    border-radius: 4px;
    transform: scale(0.5);
    transform-origin: left top;
}

.size-28 {
    font-size: 28rpx;
}

.default_icon {
    width: 32rpx;
    height: 32rpx;
}
.scroll-view_hold {
    position: relative;
    padding: 30rpx 0 30rpx 0;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    background: #fff;
}

.scroll-view_hold ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
}

.scroll-view-item {
    min-width: 120rpx;
    padding: 0 20rpx;
    display: inline-block;
    text-align: center;
    line-height: 60rpx;
    font-size: 25rpx;
    border-radius: 32rpx;
    margin: 0 0 0 20rpx;
}

.scroll-wrap {
    position: relative;
    width: 100%;
}

.open-list {
    position: absolute;
    right: 0;
    top: 0;
    width: 60rpx;
    height: 100%;
    text-align: center;
    font-weight: 600;
    color: #585858;
    background: rgba(255, 255, 255, 0.7);
}

.scroll-view-item_wrap {
    min-width: 140rpx;
    text-align: center;
    line-height: 60rpx;
    font-size: 25rpx;
    border-radius: 32rpx;
    margin: 20rpx 0 0 30rpx;
}

.icon-unfold {
    width: 30rpx;
    height: 60rpx;
    padding: 30rpx 0 30rpx 0;
}

.icon-fold {
    width: 30rpx;
    height: 60rpx;
}
</style>
