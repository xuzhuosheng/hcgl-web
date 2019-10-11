<template>
  <div class="hello" style="padding: 10px;">
    <div style="display: inline-block;">
        <h4>输入框</h4>
        <HyhtInput v-model='inputValue'></HyhtInput>
    </div>
    <div style="display: inline-block;">
      <h4>下拉框</h4>
      <HyhtSelect :options="selectOptions" v-model='HyhtSelectmodelValue'></HyhtSelect>
    </div>
    <div style="display: inline-block;">
      <h4>多选下拉框</h4>
       <HyhtSelect :options="selectOptions" :multiple="true" v-model='HyhtSelectmodelValueMpu'></HyhtSelect>
      <!-- <HyhtMupSelect :modelMupSelectValue='mupSelectData'></HyhtMupSelect> -->
    </div>
    <div style="display: inline-block;">
      <h4>全选下拉框</h4>
      <HyhtCheckSel :options="selectOptions" v-model='chkselectData'></HyhtCheckSel>
      <!-- <HyhtCheckSel :options="selectOptions" v-model='chkselectData'></HyhtCheckSel> -->
    </div>
    <div style="display: inline-block;">
      <h4>级联下拉</h4>
      <HyhtCascader :modelCascaderData='cascaderData'></HyhtCascader>
    </div>
    <div style="display: inline-block;">
      <h4>日期选择器（不含时分秒）</h4>
      <HyhtDate :modelHyhtDateVal='hyhtDateVal'></HyhtDate>
    </div>
    <div style="display: inline-block;">
      <h4>日期时间选择器（含时分秒）</h4>
      <HyhtDateTime :modelHyhtDateTimeVal='hyhtDateTime'></HyhtDateTime>
    </div>
    <div style="display: inline-block;">
      <h4>周选择器</h4>
      <HyhtDateWeek :modelHyhtDateWeekVal='hyhtDateWeek'></HyhtDateWeek>
    </div>
    <div style="display: inline-block;">
      <h4>月选择器</h4>
      <HyhtDateMonth :modelHyhtDateMonthVal='hyhtDateMonthVal'></HyhtDateMonth>
    </div>
    <div style="display: inline-block;">
      <h4>年选择器</h4>
      <HyhtDataYear :modelHyhtDateYearVal='hyhtDateYearVal'></HyhtDataYear>
    </div>
    <div style="display: inline-block;">
      <h4>日期范围选择器</h4>
      <HyhtDaterange :modelHyhtDaterangeVal='hyhtDaterangeVal'></HyhtDaterange>
    </div>
    <div style="display: inline-block;">
      <h4>文本域</h4>
      <HyhtTextArea :modelHyhtTextAreaVal='modelHyhtTextAreaVal'></HyhtTextArea>
    </div>
    <div style="display: inline-block;">
      <h4>单选框组</h4>
      <HyhtRadio :modelRadioValue='modelHyhtRadioVal'></HyhtRadio>
    </div>
  </div>
</template>
<script>
import HyhtInput from '../components/allConditionmodel/HyhtInput'
import HyhtSelect from '../components/allConditionmodel/HyhtSelect'
import HyhtMupSelect from '../components/allConditionmodel/HyhtMupSelect'
import HyhtCheckSel from '../components/allConditionmodel/HyhtCheckSel'
import HyhtCascader from '../components/allConditionmodel/HyhtCascader'
import HyhtDate from '../components/allConditionmodel/HyhtDate'
import HyhtDateTime from '../components/allConditionmodel/HyhtDateTime'
import HyhtDateWeek from '../components/allConditionmodel/HyhtDateWeek'
import HyhtDateMonth from '../components/allConditionmodel/HyhtDateMonth'
import HyhtDataYear from '../components/allConditionmodel/HyhtDataYear'
import HyhtDaterange from '../components/allConditionmodel/HyhtDaterange'
import HyhtTextArea from '../components/allConditionmodel/HyhtTextArea'
import HyhtRadio from '../components/allConditionmodel/HyhtRadio'
export default {
  name: 'condtionmodel',
  components:{
      HyhtInput,HyhtSelect,HyhtMupSelect,HyhtCheckSel,HyhtCascader,
      HyhtDate,HyhtDateTime,HyhtDateWeek,HyhtDateMonth,HyhtDataYear,
      HyhtDaterange,HyhtTextArea,HyhtRadio,
  },
  data () {
    return{
      //输入框
      inputValue:"输入框",
      //下拉框
      HyhtSelectmodelValueMpu:['1','2'],
      HyhtSelectmodelValue:"1",
       //带有全选功能的多选下拉框
      chkselectData:['1','2'],
      selectOptions:[{
          value: '1',
          label: '黄金糕'
        }, {
          value: '2',
          label: '双皮奶'
        }, {
          value: '3',
          label: '蚵仔煎'
        }, {
          value: '4',
          label: '龙须面'
        }, {
          value: '5',
          label: '北京烤鸭'
        }
      ],
      selectData:{
        modelValue:"",
      },
     
      //级联下拉（选择框）
      cascaderData:{
        modelValue:[],
        selectOptions:[
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {value: 'yizhi',label: '一致'},{ value: 'fankui',label: '反馈'}, 
              {value: 'xiaolv',label: '效率'}, 
            ]
          },
          {
            value: 'daohang',
            label: '导航',
            children: [
              {value: 'cexiangdaohang',label: '侧向导航'}, 
              { value: 'dingbudaohang',label: '顶部导航'}
            ]
          }
        ]
      },
      //日期选择器
      hyhtDateVal:{
        modelValue:"2019-10-12"
      },
      //日期时间选择器（含有时分秒）
      hyhtDateTime:{
        modelValue:"2019-10-12 12:12:33"
      },
      //周选择器
      hyhtDateWeek:{
        modelValue:"2019w10"
      },
      //月选择器
      hyhtDateMonthVal:{
        modelValue:"2019-10"
      },
      //年选择器
      hyhtDateYearVal:{
        modelValue:"2018"
      },
       //日期范围选择器
      hyhtDaterangeVal:{
        modelValue:['2019-10-12','2019-10-19']
      },
      // 文本域
      modelHyhtTextAreaVal:{ modelValue:"121"},
      //单选框组
      modelHyhtRadioVal:{ 
        modelValue:"1",
        RadioOptions:[{
            label: "1",
            name: '广州'
          }, {
            label: "2",
            name: '上海'
          }, {
            label: "3",
            name: '深圳'
          }
        ],
      },
      FormObj:{}
    }
  },
  created(){
   
  },
  mounted() {
    
    // this. getform()
  },
  methods: {
    onChange(value) {
      console.log(value)
    },
    clickMe02() {
      this.$message.warning(this.value02.toString());
    },
    getform(){
      var that = this
      var deal ={
        "VmodelInput":that.inputValue,
        "VmodelselectVal":that.selectData,
        "VmodelMupVal":that.mupSelectData
      }
      that.FormObj = that.$mycommon.getcinditionForm(deal)
      console.log(that.FormObj)
    }
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
