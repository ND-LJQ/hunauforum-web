<template>
  <view class="uni-tab-bar">
    <scroll-view class="uni-swiper-tab" scroll-x>
      <block v-for="(tab, index) in tabBars" :key="tab.id">
        <view
          class="swiper-tab-list"
          :class="{'active': tabIndex === index}"
          @click="tabtap(index)"
        >
          {{ tab.name }}
          <view class="swiper-tab-line"></view>
        </view>
      </block>
    </scroll-view>
  </view>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  tabBars: Array,
  tabIndex: Number,
  scrollStyle: {
    type: String,
    default: '',
  },
  scrollItemStyle: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(["tabtap"])

const tabtap = (index) => {
  emit('tabtap', index);
};
</script>

<style scoped>
.uni-swiper-tab {
  border-bottom: 1px solid #eeeeee;
}

.active {
  color: #343434;
}

.active .swiper-tab-line {
  border-bottom: 6px solid #5598e7;
  width: 70px;
  margin: auto;
  border-top: 6px solid #5598e7;
  border-radius: 20px;
}
</style>
