<template>
<div class="Hyeldatepicker">
    <el-popover class="popoverClass" placement="bottom" trigger="manual" width="60" v-model="visible">
      <p class="BtnList" style="width:60px;height:260px;"><ul>
        <li :style='timeType=="month"?"color:#409eff":""' @click='timeTypeClick("month")'>按月份</li>
        <li :style='timeType=="year"?"color:#409eff":""' @click='timeTypeClick("year")'>按年度</li>
      </ul></p>
    </el-popover>
      <el-date-picker ref="pickerinputyear" class='pickerinput' v-if='timeType=="year"'  type="year"  
      v-model="labelValue"  slot="reference" format="yyyy年"
        :style="{'width':width+'px'}" :picker-options="pickerOptions0"
        placeholder="选择日期" @change="Timechange" @blur="PickerBlur" @focus="PickerFocus">
      </el-date-picker>
       <el-date-picker ref="pickerinputmonth" class='pickerinput' v-if='timeType=="month"' type="month"  
       v-model="labelValue"  slot="reference" format="yyyy年MM月"  
        :style="{'width':width+'px'}" :picker-options="pickerOptions0"
        placeholder="选择日期" @change="Timechange" @blur="PickerBlur" @focus="PickerFocus">
      </el-date-picker>
</div>
</template>
<style>
    .Hyeldatepicker{
      display: inline-block;
      position: relative;
      margin-left: 60px;
      width: 300px;
    }
    .popoverClass .el-popover{
      min-width: 50px;
      top:52px!important;
      left:-64px!important;
      padding-right: 0px;
    }
    .el-picker-panel{
    }
    .BtnList ul>li{
      list-style-type:none ;
      cursor: pointer;
    }
     .BtnList ul>li:hover{
       color: #409eff;
    }
    
</style>

<script>
import moment from 'moment'
export default {
  // 设置绑定参数
  model: {
    prop: "value",
    event: 'change',
  },
  data() {
    return {
      // 传参的值
      modelValue: void 0,
      // 展示框的值
      labelValue: void 0,
      visible: false,
      timeType:"year",
      pickerOptions0: {
        disabledDate(time) {
            return time.getTime() > Date.now();
        },
      }, 
    };
  },
  props: {
    // data: Array,
    InitData: String,
    value: String | Array,
    // 对外暴露的属性  宽度
    width: {
      type: String,
      default: "350"
    },
    // 时间格式
    GS:{
        type: String,
        default: "YYYYMMDD" 
    },
    // 提示语
    TSY:{
        type: String,
        default: "所属期必须是正确格式的时间" 
    },
    disabled:{
        type: Boolean,
        default: false 
    }
   
  },
  watch: {
    modelValue(val) {
      this.labelValue  = val
      this.$emit("DatePicker", val);
    },
    value(val) {
      if (!val) this.labelValue = void 0;
    }
  },
  computed: {
    
  },
  mounted() {},
  created() {
    var that = this;
    //  初始化绑定值
    that.$nextTick(() => {
        // that.labelValue = that.value
        // that.modelValue = that.value
    })
  },
  methods:{
    timeTypeClick(val){
      var that = this;
      that.timeType = val
      setTimeout(function(){
        that.$nextTick(function(){
          if(val=="year"){
            that.$refs.pickerinputyear.focus()
            that.visible = true
          }else{
            that.$refs.pickerinputmonth.focus()
            that.visible = true
          }
        })  
      },100)

    },
    // 用户确认选定的值时触发
    Timechange(val){
        var that = this;
         that.visible = false
         // 对外暴露绑定函数
        that.$emit("change", val);
        that.modelValue = val

    },
    //当 input 失去焦点时触发
    PickerBlur(val){
        var that = this;
        that.visible = false
    },
    //当 input 获得焦点时触发
    PickerFocus(val){
      var that = this;
      that.visible = true
    }
  },
};
</script>