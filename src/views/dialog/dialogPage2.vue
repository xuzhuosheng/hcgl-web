<template>
  <div class="userCustomDialogPage2">
    <div class="userCustomDialogPageContainer">
      <div class="userCustomMobanPageContainer-buttons">
        <el-button @click="viewOnShowEvent">查 看</el-button>
      </div>
      <div class="userCustomMobanPageContainer-msgDialog">
        <el-dialog title="弹窗模板2" :visible.sync="userCustomOfDialog" width="80%" :before-close="handleCloseDialog">
          <div class="userCustomMobanPageContainer-msgDialog__btns">
            <el-button @click="viewOnAffirmEvent">确 认</el-button>
            <el-button @click="viewOnCancelEvent">取 消</el-button>
          </div>
          <div class="userCustomMobanPageContainer-msgDialog__body">
            <div class="userCustomMobanPageContainer-msgDialog__bodyTitle">弹窗模板2</div>
            <div class="userCustomMobanPageContainer-msgDialog__bodyContent">
              <div class="userCustomMobanPageContainer-conditions">
                <el-form label-width="35%" :inline="true" :model="conditionsForm"
                         class="demo-form-inline userCustomMobanPageContainer-conditions__form">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="输入框:">
                        <HyhtInput :inputValue='input'></HyhtInput>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="基础下拉框:">
                        <HyhtSelect :modelSelectValue='intSelect'></HyhtSelect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="级联下拉框:">
                        <HyhtCascader :modelCascaderData='cascaderSelect'></HyhtCascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="多选下拉框:">
                        <HyhtMupSelect :modelMupSelectValue='multiSelect'></HyhtMupSelect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="全选多选下拉框:">
                        <HyhtCheckSel :modelChkSelectVal='checkAllMultiSelect'></HyhtCheckSel>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="日期选择器:">
                        <HyhtDate :modelHyhtDateVal='datePick'></HyhtDate>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="月选择器:">
                        <HyhtDateMonth :modelHyhtDateMonthVal='monthPick'></HyhtDateMonth>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="周选择器:">
                        <HyhtDateWeek :modelHyhtDateWeekVal='weekPick'></HyhtDateWeek>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="年选择器:">
                        <HyhtDataYear :modelHyhtDateYearVal='yearPick'></HyhtDataYear>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="日期时间选择器:">
                        <HyhtDateTime :modelHyhtDateTimeVal='datetimePick'></HyhtDateTime>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="日期范围选择器:">
                        <HyhtDaterange :modelHyhtDaterangeVal='daterangePick'></HyhtDaterange>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="单选:">
                        <HyhtRadio :modelRadioValue='radioPick'></HyhtRadio>
                      </el-form-item>
                    </el-col>

                  </el-row>
                </el-form>
              </div>
            </div>
          </div>
        </el-dialog>
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
  import HyhtRadio from '../../components/allConditionmodel/HyhtRadio'

  export default {
    name: "userCustomDialogPage2",
    components: {
      HyhtInput, HyhtSelect, HyhtMupSelect, HyhtCheckSel, HyhtCascader,
      HyhtDate, HyhtDateTime, HyhtDateWeek, HyhtDateMonth, HyhtDataYear,
      HyhtDaterange, HyhtRadio
    },
    data() {
      return {
        userCustomOfDialog: false,
        conditionsForm: {},
        //输入框
        input: {modelValue: "121"},
        //下拉框
        intSelect: {
          modelValue: "1",
          selectOptions: [{
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
        multiSelect: {
          modelValue: ['1', '2'],
          selectOptions: [{
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
        checkAllMultiSelect: {
          modelValue: ['1', '2'],
          selectOptions: [{
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
        cascaderSelect: {
          modelValue: [],
          selectOptions: [
            {
              value: 'zhinan',
              label: '指南',
              children: [
                {value: 'yizhi', label: '一致'}, {value: 'fankui', label: '反馈'},
                {value: 'xiaolv', label: '效率'},
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {value: 'cexiangdaohang', label: '侧向导航'},
                {value: 'dingbudaohang', label: '顶部导航'}
              ]
            }
          ]
        },
        //日期选择器
        datePick: {
          modelValue: "2019-10-12"
        },
        //日期时间选择器（含有时分秒）
        datetimePick: {
          modelValue: "2019-10-12 12:12:33"
        },
        //周选择器
        weekPick: {
          modelValue: "2019w10"
        },
        //月选择器
        monthPick: {
          modelValue: "2019-10"
        },
        //年选择器
        yearPick: {
          modelValue: "2018"
        },
        //日期范围选择器
        daterangePick: {
          modelValue: ['2019-10-12', '2019-10-19']
        },
        // 单选
        radioPick: {
          modelValue: "1",
          RadioOptions: [
            {
              label: "1",
              name: '是'
            }, {
              label: "0",
              name: '否'
            }
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

      // 弹窗
      viewOnShowEvent() {
        var that = this;
        that.userCustomOfDialog = true;

      },
      // 确认
      viewOnAffirmEvent() {
        var that = this;
        that.userCustomOfDialog = false;
        var conditionsForm = {
          input: that.input, //输入框
          intSelect: that.intSelect, //基础下拉框
          cascaderSelect: that.cascaderSelect, //级联下拉框
          multiSelect: that.multiSelect, //多选下拉框
          checkAllMultiSelect: that.checkAllMultiSelect, //全选多选下拉框
          datePick: that.datePick,  //日期选择器
          monthPick: that.datePick,  //月选择器
          yearPick: that.yearPick,  //年选择器
          weekPick: that.weekPick,  //周选择器
          datetimePick: that.datetimePick, //日期时间选择器
          daterangePick: that.daterangePick,//时间范围选择器
          radioPick: that.radioPick, //单选
        }
        that.conditionsForm = that.$mycommon.getcinditionForm(conditionsForm)
        console.log("that.conditionsForm", that.conditionsForm)
      },
      // 取消
      viewOnCancelEvent() {
        var that = this;
        that.userCustomOfDialog = false;
      },
      handleCloseDialog(done) {
        var that = this;
        that.$confirm('确认关闭？', '提示')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
    }
  };
</script>
