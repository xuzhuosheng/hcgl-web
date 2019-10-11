<template>
  <div class="userCustomMobanPage3">
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
            <div class="userCustomMobanPageContainer-tables__show">
                <div class="userCustomMobanPageContainer-tables__showLeft">
                    <div class="userCustomMobanPageContainer-tables__showTitle">
                        <div class="userCustomMobanPageContainer-tables__showTitleName">
                            <span class="userCustomMobanPageContainer-tables__showTitleNameLine">&ensp;</span>
                            多个IP登录统计
                        </div>
                    </div>
                    <div class="userCustomMobanPageContainer-tables__showTable">
                        <div class="userCustomMobanPageContainer-tables__showTableType">前五排行</div>
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="date" label="排行" align="left" width=""></el-table-column>
                            <el-table-column prop="name" label="名称" align="left" width=""></el-table-column>
                            <el-table-column prop="address" label="次数" align="left" width=""></el-table-column>
                            <el-table-column label="占比" align="left" width="">
                                <template slot-scope="scope">
                                    <span class="statusNormalColor" v-if="scope.row.status>=0">{{scope.row.status}}%</span>
                                    <span class="operationAbnormalColor" v-if="scope.row.status<0">{{scope.row.status}}%</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="userCustomMobanPageContainer-tables__showRight">
                    <div class="userCustomMobanPageContainer-tables__showTitle">
                        <div class="userCustomMobanPageContainer-tables__showTitleName">
                            <span class="userCustomMobanPageContainer-tables__showTitleNameLine">&ensp;</span>
                            多个登录失败统计
                        </div>
                    </div>
                    <div class="userCustomMobanPageContainer-tables__showTable">
                        <div class="userCustomMobanPageContainer-tables__showTableType">前五排行</div>
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="date" label="排行" align="left" width=""></el-table-column>
                            <el-table-column prop="name" label="名称" align="left" width=""></el-table-column>
                            <el-table-column prop="address" label="次数" align="left" width=""></el-table-column>
                            <el-table-column label="占比" align="left" width="">
                                <template slot-scope="scope">
                                    <span class="statusNormalColor" v-if="scope.row.status>=0">{{scope.row.status}}%</span>
                                    <span class="operationAbnormalColor" v-if="scope.row.status<0">{{scope.row.status}}%</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
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
  name: "userCustomMobanPage3",
  components:{
      HyhtInput,HyhtSelect,HyhtMupSelect,HyhtCheckSel,HyhtCascader,
      HyhtDate,HyhtDateTime,HyhtDateWeek,HyhtDateMonth,HyhtDataYear,
      HyhtDaterange
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
            name: 'db001',
            address: '333次',
            status:"-22"
            },{
            date: '2',
            name: 'db002',
            address: '120次',
            status:"-12"
            },{
            date: '3',
            name: 'db003',
            address: '870次',
            status:"23"
            },{
            date: '4',
            name: 'db004',
            address: '548次',
            status:"15"
            },{
            date: '5',
            name: 'db004',
            address: '548次',
            status:"5"
        }],
        currentPage: 1,
        total:20,
        pageSize:10, 
        pageNo:1,
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
    handleSizeChange(val) {
        var that = this;
        that.pageSize = val;
    },
    handleCurrentChange(val) {
        var that = this;
        that.pageNo = val;
    },
    // 查看
    viewOnShowEvent(scope){
        var that = this;
        console.log(scope);
    },
    // 编辑
    viewOnEditEvent(scope){
        var that = this;
        console.log(scope);
    },
    // 删除
    viewOnDelectEvent(scope){
        var that = this;
        console.log(scope);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$message({
            type: 'success',
            message: '删除成功!'
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });   
        })
    },

  }
};
</script>
