<template>
  <div class="hello">
    <h2>图表组件</h2>
    <div style="display: inline-block;">
     <HyhtArea ref="HyhtArea" :initOptions='AreaOptions' :style="{'width':'600px','height':'260px'}">
     </HyhtArea>
    </div>
    <div style="display: inline-block;">
     <HyhtLine ref="HyhtLine" :initOptions='LineOptions' :style="{'width':'600px','height':'260px'}">
     </HyhtLine>
    </div>
    <div style="display: inline-block;">
     <HyhtPie ref="HyhtPie" :initOptions='PieOptions' :style="{'width':'600px','height':'260px'}">
     </HyhtPie>
    </div>
    <div style="display: inline-block;">
     <HyhtBarX ref="HyhtBarX" :initOptions='BarXOptions' :style="{'width':'600px','height':'260px'}">
     </HyhtBarX>
    </div>
    <div style="display: inline-block;">
     <HyhtBarY ref="HyhtBarY" :initOptions='BarYOptions' :style="{'width':'600px','height':'360px'}">
     </HyhtBarY>
    </div>
    <div style="display: inline-block;">
     <HyhtRadar ref="HyhtRadar" :initOptions='RadarOptions' :style="{'width':'600px','height':'260px'}">
     </HyhtRadar>
    </div>
    <div style="display: inline-block;">
     <HyhtRing ref="HyhtRing" :initOptions='RingOptions' :style="{'width':'600px','height':'260px'}">
     </HyhtRing>
    </div>
    <div style="display: inline-block;">
     <HyhtGauge ref="HyhtGauge" :initOptions='GaugeOptions' :style="{'width':'600px','height':'260px'}">
     </HyhtGauge>
    </div>
    <div style="display: inline-block;">
     <HyhtScatter ref="HyhtScatter" :initOptions='ScatterOptions' :style="{'width':'600px','height':'260px'}">
     </HyhtScatter>
    </div>
  </div>
</template>

<script>
import HyhtArea from '../components/allechartmoulde/HyhtArea'
import HyhtLine from '../components/allechartmoulde/HyhtLine'
import HyhtPie from '../components/allechartmoulde/HyhtPie'
import HyhtBarX from '../components/allechartmoulde/HyhtBarX'
import HyhtBarY from '../components/allechartmoulde/HyhtBarY'
import HyhtRadar from '../components/allechartmoulde/HyhtRadar'
import HyhtRing from '../components/allechartmoulde/HyhtRing'
import HyhtGauge from '../components/allechartmoulde/HyhtGauge'
import HyhtScatter from '../components/allechartmoulde/HyhtScatter'
export default {
  name: 'HelloWorld',
  components:{
    HyhtArea,HyhtLine,HyhtPie,HyhtBarX,
    HyhtBarY,HyhtRadar,HyhtRing,HyhtGauge,HyhtScatter
  },
  data () {
    return {
      AreaOptions:{
        legend:["幸福指标", "最高工资", "人均纳税"],
        xAxis:["广东", "广西", "湖北", "湖南"],
        series:[
          {name:'幸福指标',data:[121, 2477.82, 4032.9, 816.09,1513]},
          {name:'最高工资',data:[121, 2717.82, 4032.9, 816.09,2213]},
          {name:'人均纳税',data:[211, 2477.82, 4032.9, 186.09,213]},
        ],
        title:"面积图",

      },
      LineOptions:{
        legend:["幸福指标", "最高工资", "人均纳税"],
        xAxis:["广东", "广西", "湖北", "湖南"],
        series:[
          {name:'幸福指标',data:[121, 2477.82, 4032.9, 816.09,1513]},
          {name:'最高工资',data:[121, 2717.82, 4032.9, 816.09,2213]},
          {name:'人均纳税',data:[211, 2477.82, 4032.9, 186.09,213]},
        ],
        title:"折线图",

      },
      PieOptions:{
        legend:["湖南", "广西", "湖北", "广东"],
        series:[
          {name: "湖南",value: 5454.00},
          {name: "广西",value: 4824.00}, 
          {name: "湖北", value: 4000.00},
          {name: "广东",value: 3100.00}
        ],
        title:"饼图",
      },
      RingOptions:{
        legend:["湖南", "广西", "湖北", "广东"],
        series:[
          {name: "湖南",value: 5454.00},
          {name: "广西",value: 4824.00}, 
          {name: "湖北", value: 4000.00},
          {name: "广东",value: 3100.00}
        ],
        title:"环形图",
      },
      BarXOptions:{
        legend:["平均收入", "行业人数", "人均收入", "幸福指标", "最高工资", "人均纳税", "新增日期"],
        xAxis:["服装", "餐饮","互联网"],    
        series:[
          {name:'平均收入',data:[121,277,987]},{name:'行业人数',data:[161,477,487]},{name:'人均收入',data:[321, 577,807]},
          {name:'幸福指标',data:[213,827,187]},{name:'最高工资',data:[781, 542,387]},{name:'人均纳税',data:[321, 782,677]},
          {name:'新增日期',data:[129,653,287]},
        ],
        title:"纵向柱状图",
        unit:""
      },
      BarYOptions:{
        legend:["平均收入", "行业人数", "人均收入", "幸福指标", "最高工资", "人均纳税", "新增日期"],
        yAxis:["服装", "餐饮","互联网"],    
        series:[
          {name:'平均收入',data:[121,277,987]},{name:'行业人数',data:[161,477,487]},{name:'人均收入',data:[321, 577,807]},
          {name:'幸福指标',data:[213,827,187]},{name:'最高工资',data:[781, 542,387]},{name:'人均纳税',data:[321, 782,677]},
          {name:'新增日期',data:[129,653,287]},
        ],
        title:"纵向柱状图",
        unit:""
      },
      RadarOptions:{
        legend:["广东", "广西", "湖北", "湖南"],
        indicatorList:[
          {max: 5000,name: "平均收入"},{max: 5000,name: "上级代码"},
          {max: 5000,name: "人均纳税"},{max: 5000,name: "幸福指标"}, {max: 5000,name: "人均收入"}
        ],
        series:[
          {name:"广东",value:[4596, 334, 564, 2111, 3100]},{name:"广西",value:[276, 634, 874, 1211, 3100]},
          {name:"湖北",value:[576, 134, 964, 311, 800]},{name:"湖南",value:[3176, 3124, 524, 987, 4812]},
        ],
        title:"雷达图",
        
      },
      GaugeOptions:{
        value:"88.12%",
        name:"幸福指标"
      },
      ScatterOptions:{
        xAxis:["1月", "2月", "3月", "4月","5月", "6月", "7月", "8月","9月", "10月", "11月", "12月"],
        xAxisName:"月",
        series:[
          {name: '1月',sales: 142},{name: '2月',sales: 22},{name: '3月',sales: 212},
          {name: '4月',sales: 871},{name: '5月',sales: 123},{name: '6月',sales: 871},
          {name: '7月',sales: 812},{name: '8月',sales: 567},{name: '9月',sales: 345},
          {name: '10月',sales: 222},{name: '11月',sales: 444},{name: '12月',sales: 654},
        ]
      }
    }
  },
  created(){

  },
  mounted() {
  //  this.$refs.HyhtArea.showLoading()
  },
  methods: {
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
