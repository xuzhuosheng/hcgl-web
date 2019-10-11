<template>
  <div class="echarts"></div>
</template>

<style>
.echarts {
  width: 600px;
  height: 400px;
}
</style>

<script>
import echarts from 'echarts'
import '../../node_modules/echarts/map/js/china'
import debounce from 'lodash.debounce'
// enumerating ECharts events for now
const ACTION_EVENTS = [
  'legendselectchanged',
  'legendselected',
  'legendunselected',
  'datazoom',
  'datarangeselected',
  'timelinechanged',
  'timelineplaychanged',
  'restore',
  'dataviewchanged',
  'magictypechanged',
  'geoselectchanged',
  'geoselected',
  'geounselected',
  'pieselectchanged',
  'pieselected',
  'pieunselected',
  'mapselectchanged',
  'mapselected',
  'mapunselected',
  'axisareaselected',
  'brush',
  'brushselected'
]

const MOUSE_EVENTS = [
  'click',
  'dblclick',
  'mouseover',
  'mouseout',
  'mousedown',
  'mouseup',
  'globalout'
]

export default {
  props: {
	options: Object,
	theme: String,
	initOptions: Object,
	group: String,
	autoResize: Boolean,
	autoPlay:Boolean,

  },
  data() {
	return {
	  chart: null
	}
  },
  computed: {
	// Only recalculated when accessed from JavaScript.
	// Won't update DOM on value change because getters
	// don't depend on reactive values
	width: {
	  cache: false,
	  get() {
		return this.chart.getWidth()
	  }
	},
	height: {
	  cache: false,
	  get() {
		return this.chart.getHeight()
	  }
	},
	isDisposed: {
	  cache: false,
	  get() {
		return this.chart.isDisposed()
	  }
	}
  },
  watch: {
	// use assign statements to tigger "options" and "group" setters
	options: {
	  handler(options) {
		if (!this.chart && options) {
		  this._init()
		} else {
		  this.chart.setOption(this.options, true)
		}
	  },
	  deep: true
	},
	group: {
	  handler(group) {
		this.chart.group = group
	  }
	},
	autoPlay:{
	  handler(flag){
		if(flag){
		  this.__play()
		}else{
		  this.__autoPlayId && clearTimeout(this.__autoPlayId)
		}
	  }
	}
  },
  methods: {
	// provide a explicit merge option method
	mergeOptions(options) {
	  this._delegateMethod('setOption', options)
	},
	// just delegates ECharts methods to Vue component
	// use explicit params to reduce transpiled size for now
	resize(options) {
	  this._delegateMethod('resize', options)
	},
	dispatchAction(payload) {
	  this._delegateMethod('dispatchAction', payload)
	},
	convertToPixel(finder, value) {
	  return this._delegateMethod('convertToPixel', finder, value)
	},
	convertFromPixel(finder, value) {
	  return this._delegateMethod('convertFromPixel', finder, value)
	},
	containPixel(finder, value) {
	  return this._delegateMethod('containPixel', finder, value)
	},
	showLoading(type, options) {
		options = options || {
				text: 'loading',
				color: '#3ad8fd',
				textColor: '#fff',
				maskColor: 'rgba(255, 255, 255, 0.1)',
				zlevel: 0
		}
	  this._delegateMethod('showLoading', type, options)
	},
	hideLoading() {
	  this._delegateMethod('hideLoading')
	},
	getDataURL(options) {
	  return this._delegateMethod('getDataURL', options)
	},
	getConnectedDataURL(options) {
	  return this._delegateMethod('getConnectedDataURL', options)
	},
	clear() {
	  this._delegateMethod('clear')
	},
	dispose() {
	  this._delegateMethod('dispose')
	},
	_delegateMethod(name, ...args) {
	  if (!this.chart) {
		console.error(`Cannot call [${name}] before the chart is initialized. Set prop [options] first.`)
		return
	  }
	  return this.chart[name](...args)
	},
	_init() {
	  if (this.chart) {
		return
	  }
	  let chart = echarts.init(this.$el, this.theme, this.initOptions)
	  chart.setOption(this.options, true)
	  // expose ECharts events as custom events
	  ACTION_EVENTS.forEach(event => {
		chart.on(event, params => {
		  this.$emit(event, params)
		})
	  })
	  MOUSE_EVENTS.forEach(event => {
		chart.on(event, params => {
		  this.$emit(event, params)

		  // for backward compatibility, may remove in the future
		  this.$emit('chart' + event, params)
		})
	  })

	  if (this.autoResize) {
		this.__resizeHanlder = debounce(() => {
		  chart.resize()
		}, 100, { leading: true })
		window.addEventListener('resize', this.__resizeHanlder)
	  }

	  var self = this;
	  this.__playIndex = 0;
	  this.__play = ()=>{
		this.__autoPlayId = setTimeout(function play(){
			if(self.options && self.options.series && self.options.series.length > 0){
				for(let i=0;i<self.options.series.length;i++){
					let len = self.options.series[i].data && self.options.series[0].data.length
					if(len>0){
							chart.dispatchAction({
								type: 'downplay',
								seriesIndex: i,
								dataIndex: self.__playIndex%len,
							})
							chart.dispatchAction({
								type: 'highlight',
								seriesIndex: i,
								dataIndex: (++self.__playIndex)%len,
							})
					}
				}
			}
			this.__autoPlayId = setTimeout(play,2000)
		},0)
	  }

	  if (this.autoPlay) {
		this.__play();
	  }

	  this.chart = chart
	}
  },
    destroyed () {
       this.chart=this.dispose 
    },
  mounted() {
	// auto init if `options` is already provided
	if (this.options) {
	  this._init()
	}
  },
  beforeDestroy() {
	if (!this.chart) {
	  return
	}
	if (this.autoResize) {
	  window.removeEventListener('resize', this.__resizeHanlder)
	}
	this.dispose()
  },
  connect(group) {
	if (typeof group !== 'string') {
	  group = group.map(chart => chart.chart)
	}
	echarts.connect(group)
  },
  disconnect(group) {
	echarts.disconnect(group)
  },
  registerMap(...args) {
	echarts.registerMap(...args)
  },
  registerTheme(...args) {
	echarts.registerTheme(...args)
  }
}
</script>
