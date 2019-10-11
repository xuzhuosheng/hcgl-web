<template>
  <div class="userCustomMobanPage4">
    <div class="userCustomMobanPageContainer">
        <div class="userCustomMobanPageContainer-buttons">
            <el-button @click="viewOnQueryEvent">查 询</el-button>
            <el-button @click="viewOnResetEvent">重 置</el-button>
        </div>
        <div class="userCustomMobanPageContainer-contents">
            <div class="userCustomMobanPageContainer-conditions">
                <el-form label-width="30%" :inline="true" :model="conditionsForm" class="demo-form-inline userCustomMobanPageContainer-conditions__form">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="输入框:">
                                <HyhtInput :inputValue='input'></HyhtInput>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="基础下拉框:">
                                <HyhtSelect :modelSelectValue='intSelect'></HyhtSelect>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="级联下拉框:">
                            <HyhtCascader :modelCascaderData='cascaderSelect'></HyhtCascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="多选下拉框:">
                                <HyhtMupSelect :modelMupSelectValue='multiSelect'></HyhtMupSelect>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="全选多选下拉框:">
                                <HyhtCheckSel :modelChkSelectVal='checkAllMultiSelect'></HyhtCheckSel>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="日期选择器:">
                                <HyhtDate :modelHyhtDateVal='datePick'></HyhtDate>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="月选择器:">
                                <HyhtDateMonth :modelHyhtDateMonthVal='monthPick'></HyhtDateMonth>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="周选择器:">
                                <HyhtDateWeek :modelHyhtDateWeekVal='weekPick'></HyhtDateWeek>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="年选择器:">
                                <HyhtDataYear :modelHyhtDateYearVal='yearPick'></HyhtDataYear>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="日期时间选择器:">
                                <HyhtDateTime :modelHyhtDateTimeVal='datetimePick'></HyhtDateTime>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="日期范围选择器:">
                                <HyhtDaterange :modelHyhtDaterangeVal='daterangePick'></HyhtDaterange>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="userCustomMobanPageContainer-charts">
                <div class="userCustomMobanPageContainer-charts__showBox">
                    <div class="userCustomMobanPageContainer-charts__showTitle">
                            <div class="uCMPageContainer_charts_showTitleName">
                                <span class="emptyBorder">&ensp;</span>
                                人员操作统计排行
                            </div>
                        </div>
                    <div class="userCustomMobanPageContainer-charts__box">
                        <div class="userCustomMobanPageContainer-charts__boxLeft">
                            <div class="uCMPageContainer_charts_personBtns">
                                <el-button class="btn1" @click="currentChangeDataEvent('week')">周</el-button>
                                <el-button class="btn2" @click="currentChangeDataEvent('month')">月</el-button>
                                <el-button class="btn3" @click="currentChangeDataEvent('year')">年</el-button>
                            </div>
                            <img class="uCMPageContainer_charts_personIcon" src="../../../static/assets/img/moban4_personIcon.jpg" alt="" srcset="">
                            <div class="uCMPageContainer_charts_personText">
                                <div class="uCMPageContainer_charts_personTextName">运行功能数：<span>{{chartsObj.runningFunctionsNum}}</span></div>
                                <div class="uCMPageContainer_charts_personTextName">运行功能：<span>{{chartsObj.runningFunctions}}</span></div>
                            </div>
                        </div>
                        <div class="userCustomMobanPageContainer-charts__boxRIght">
                        <!-- echarts1 -->
                            <HyhtScatter ref="HyhtScatter" :initOptions='Scatteroptions' :style="{'width':'100%','height':'265px'}">
                            </HyhtScatter>
                        </div>
                    </div>
                </div>
                <div class="userCustomMobanPageContainer-charts__showBox">
                    <div class="userCustomMobanPageContainer-charts__showTitle">
                            <div class="uCMPageContainer_charts_showTitleName">
                                <span class="emptyBorder">&ensp;</span>
                                功能列表运行排行
                            </div>
                        </div>
                    <div class="userCustomMobanPageContainer-charts__box">
                        <div class="userCustomMobanPageContainer-tables">
                            <el-table :data="tableData" border style="width: 100%">
                                <el-table-column prop="date" label="排行" align="center" width=""></el-table-column>
                                <el-table-column prop="name1" label="应用系统" align="center" width=""></el-table-column>
                                <el-table-column prop="name2" label="应用功能" align="center" width=""></el-table-column>
                                <el-table-column prop="address" label="运行次数" align="center" width=""></el-table-column>
                                <el-table-column prop="status" label="占比" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div> 
</template>
<script>
import HyhtScatter from '../../components/allechartmoulde/HyhtScatter'
import HyhtInput from '../../components/allConditionmodel/HyhtInput'
import HyhtSelect from '../../components/allConditionmodel/HyhtSelect'
import HyhtMupSelect from '../../components/allConditionmodel/HyhtMupSelect'
import HyhtCheckSel from '../../components/allConditionmodel/HyhtCheckSel'
import HyhtCascader from '../../components/allConditionmodel/HyhtCascader' 
import HyhtDate from '../../components/allConditionmodel/HyhtDate'
import HyhtDateTime from '../../components/allConditionmodel/HyhtDateTime'
import HyhtDateWeek from '../../components/allConditionmodel/HyhtDateWeek'
import HyhtDateMonth from '../../components/allConditionmodel/HyhtDateMonth'
import HyhtDataYear from '../../components/allConditionmodel/HyhtDataYear'
import HyhtDaterange from '../../components/allConditionmodel/HyhtDaterange'

export default {
  name: "userCustomMobanPage4",
  components:{
      HyhtInput,HyhtSelect,HyhtMupSelect,HyhtCheckSel,HyhtCascader,
      HyhtDate,HyhtDateTime,HyhtDateWeek,HyhtDateMonth,HyhtDataYear,
      HyhtDaterange,HyhtScatter
  },
  data() {
    return {
        conditionsForm:{},
        //输入框
        input:{modelValue:"121"},
        //下拉框
        intSelect:{
            modelValue:"1",
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
            ]
        },
        //多选下拉框
        multiSelect:{
            modelValue:['1','2'],
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
            ]
        },
        //带有全选功能的多选下拉框
        checkAllMultiSelect:{
            modelValue:['1','2'],
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
            ]
        },
        //级联下拉（选择框）
        cascaderSelect:{
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
        datePick:{
            modelValue:"2019-10-12"
        },
        //日期时间选择器（含有时分秒）
        datetimePick:{
            modelValue:"2019-10-12 12:12:33"
        },
        //周选择器
        weekPick:{
            modelValue:"2019w10"
        },
        //月选择器
        monthPick:{
            modelValue:"2019-10"
        },
        //年选择器
        yearPick:{
            modelValue:"2018"
        },
        //日期范围选择器
        daterangePick:{
            modelValue:['2019-10-12','2019-10-19']
        },
        tableData: [{
            date: '1',
            name1: '核心征管系统',
            name2: '纳税人发票',
            address: '5443次',
            status:23
            },{
            date: '2',
            name1: '核心征管系统',
            name2: '纳税人发票',
            address: '5443次',
            status:23
            },{
            date: '3',
            name1: '核心征管系统',
            name2: '纳税人发票',
            address: '5443次',
            status:23
            },{
            date: '4',
            name1: '核心征管系统',
            name2: '纳税人发票',
            address: '5443次',
            status:23
            },{
            date: '5',
            name1: '核心征管系统',
            name2: '纳税人发票',
            address: '5443次',
            status:23
            }
        ],
        currentPage: 1,
        total:20,
        pageSize:10, 
        pageNo:1,
        chartsObj:{
            runningFunctionsNum:"20", //运行功能数
            runningFunctions:"40", //运行功能
            runningChartsDate:"", //echarts数据
        },
        Scatteroptions:{
            xAxis:["1月", "2月", "3月", "4月","5月", "6月", "7月", "8月","9月", "10月", "11月", "12月"],
            xAxisName:"月",
            series:[
            {name: '1月',sales: 142},{name: '2月',sales: 22},{name: '3月',sales: 212},
            {name: '4月',sales: 871},{name: '5月',sales: 123},{name: '6月',sales: 871},
            {name: '7月',sales: 812},{name: '8月',sales: 567},{name: '9月',sales: 345},
            {name: '10月',sales: 222},{name: '11月',sales: 444},{name: '12月',sales: 654},
            ]
        }
    };
  },
  created() {
    var that = this;

  },
  mounted() {
    var that = this;
  },
  methods: {
    // 查询
    viewOnQueryEvent(){
        var that = this;
        var conditionsForm = {
            input:that.input, //输入框
            intSelect:that.intSelect, //基础下拉框
            cascaderSelect:that.cascaderSelect, //级联下拉框
            multiSelect:that.multiSelect, //多选下拉框
            checkAllMultiSelect:that.checkAllMultiSelect, //全选多选下拉框
            datePick:that.datePick,  //日期选择器
            monthPick:that.datePick,  //月选择器
            yearPick:that.yearPick,  //年选择器
            weekPick:that.weekPick,  //周选择器
            datetimePick:that.datetimePick, //日期时间选择器
            daterangePick:that.daterangePick,//时间范围选择器
        }
        that.conditionsForm = that.$mycommon.getcinditionForm(conditionsForm)
        console.log("that.conditionsForm",that.conditionsForm)
    },
    // 重置
    viewOnResetEvent(){
        var that = this;
        that.input.modelValue = ""; //输入框
        that.intSelect.modelValue = ""; //基础下拉框
        that.cascaderSelect.modelValue  = []; //级联下拉框
        that.multiSelect.modelValue  = []; //多选下拉框
        that.checkAllMultiSelect.modelValue  = []; //全选多选下拉框
        that.datePick.modelValue  = "";  //日期选择器
        that.monthPick.modelValue  = "";  //月选择器
        that.yearPick.modelValue  = "";  //年选择器
        that.weekPick.modelValue  = "";  //周选择器
        that.datetimePick.modelValue  = ""; //日期时间选择器
        that.daterangePick.modelValue  = [];//时间范围选择器
    },
    cascaderHandleChange(value){
        console.log(value)
    },
    // 切换年月周的数据
    currentChangeDataEvent(type){
        console.log(type)
        if (type=="week") {
            // 周
            
        }else if(type=="month"){
            // 月
            
        }else if(type=="year"){
            // 年
            
        }
    }

  }
};
</script>
