export default {
	props: {
		// 是否展示picker弹窗
		show: {
			type: Boolean,
			default: false
		},
		// 是否展示顶部的操作栏
		showToolbar: {
			type: Boolean,
			default: true
		},
		// 顶部标题
		title: {
			type: String,
			default: ''
		},
		// 对象数组，设置每一列的数据
		columns: {
			type: Array,
			default: () => []
		},
		// 是否显示加载中状态
		loading: {
			type: Boolean,
			default: false
		},
		// 各列中，单个选项的高度
		itemHeight: {
			type: [String, Number],
			default: 44
		},
		// 取消按钮的文字
		cancelText: {
			type: String,
			default: '取消'
		},
		// 确认按钮的文字
		confirmText: {
			type: String,
			default: '确定'
		},
		// 取消按钮的颜色
		cancelColor: {
			type: String,
			default: '#909193'
		},
		// 确认按钮的颜色
		confirmColor: {
			type: String,
			default: '#3c9cff'
		},
		// 每列中可见选项的数量
		visibleItemCount: {
			type: [String, Number],
			default: 5
		},
		// 选项对象中，需要展示的属性键名
		keyName: {
			type: String,
			default: 'text'
		},
		// 是否允许点击遮罩关闭选择器
		closeOnClickOverlay: {
			type: Boolean,
			default: false
		},
		// 各列的默认索引
		defaultIndex: {
			type: Array,
			default: () => [],
		},
		// 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，只在微信2.21.1及以上有效
		immediateChange: {
			type: Boolean,
			default: false
		},
		...uni.$uv?.props?.picker
	}
}