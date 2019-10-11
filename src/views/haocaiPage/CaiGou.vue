<template>
  <div class="userCustomMobanPage1">
    <div class="userCustomMobanPageContainer">
      <div class="userCustomMobanPageContainer-buttons">
        <el-button @click="viewOnQueryEvent">查 询</el-button>
        <el-button @click="viewOnResetEvent">重 置</el-button>
      </div>
      <div class="userCustomMobanPageContainer-contents">
        <div class="userCustomMobanPageContainer-conditions">
          <el-form label-width="30%" :inline="true" :model="conditionsForm"
                   class="demo-form-inline userCustomMobanPageContainer-conditions__form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="采购计划名称:">
                  <HyhtInput :inputValue='initConditionsF.planName'></HyhtInput>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="创建时间:">
                  <HyhtDaterange :modelHyhtDaterangeVal='initConditionsF.daterangePick'></HyhtDaterange>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>

        <!--<div class="userCustomMobanPageContainer-buttons">-->
          <!--<el-button :disabled="multipleSel.length === 0" @click="batchGeneration()">批量生成采购计划</el-button>-->
          <!--<el-button :disabled="multipleSel.length === 0" @click="intelligentizeGeneration()">智能生成采购计划</el-button>-->
        <!--</div>-->
        <div class="userCustomMobanPageContainer-tables">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column

              prop="plan"
              label="计划名称">
            </el-table-column>
            <el-table-column align="center"
                             width="180"
                             prop="createTime"
                             label="创建时间">
            </el-table-column>
            <el-table-column
              align="center"
              width="100"
              prop="num"
              label="数量">
            </el-table-column>
            <el-table-column
              align="center"
              width="100"
              prop="rowTotalMoney"
              label="总金额">
            </el-table-column>
            <el-table-column
              align="center"
              width="180"
              prop="finishTime"
              label="完成时间">
            </el-table-column>

            <el-table-column width="160" label="操作" align="center">
              <template slot-scope="scope">

                <el-button v-if="scope.row.finish" class="status_finished"
                           size="small"
                           type="text">已完成
                </el-button>
                <el-button v-else @click="toFinish(scope.row)"
                           size="small"
                           type="text">完成
                </el-button>

                <!--<span class="statusNormalColor" v-if="scope.row.status==1">正常</span>-->



                <el-button @click="viewOnShowEvent(scope.row)"
                           size="small"
                           type="text">详情
                </el-button>

              </template>
            </el-table-column>
          </el-table>
          <div class="userCustomMobanPageContainer-paginations">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="total"
              background>
            </el-pagination>
          </div>
        </div>
      </div>

      <!--采购计划 弹窗-->
      <div class="userCustomMobanPageContainer-msgDialog">
        <el-dialog title="采购计划" :visible.sync="detailsPageVisible" width="80%" :before-close="handleCloseDialog">
          <div class="userCustomMobanPageContainer-msgDialog__btns">
            <!--<el-button @click="queryPlan">查询</el-button>-->
            <el-button>导出</el-button>
            <el-button @click="detailsPageVisible = false">取 消</el-button>
          </div>
          <div class="userCustomMobanPageContainer-msgDialog__body">
            <div class="userCustomMobanPageContainer-msgDialog__bodyTitle">采购计划</div>
            <div class="userCustomMobanPageContainer-msgDialog__bodyContent">
              <div class="userCustomMobanPageContainer-conditions">
                <div class="userCustomMobanPageContainer-conditions">
                  <el-form label-width="35%" :inline="true" :model="conditionsForm" class="demo-form-inline userCustomMobanPageContainer-conditions__form">
                    <el-row>
                      <el-col :span="14">
                        <el-form-item label="采购计划名称:">
                          <HyhtInput style="width: 300px" :inputValue='initDetailsPageF.planName'></HyhtInput>
                        </el-form-item>
                      </el-col>

                    </el-row>
                  </el-form>
                </div>
                <div class="userCustomMobanPageContainer-tables">
                  <el-table
                    :data="detailsTableData"
                    border
                    style="width: 96%; margin: 0 auto;">
                    <el-table-column prop="type.label" label="类型" align="center" width=""></el-table-column>
                    <el-table-column prop="brand.label" label="品牌" align="center" width=""></el-table-column>
                    <el-table-column prop="model.label" label="型号" align="center" width=""></el-table-column>
                    <el-table-column prop="classes.label" label="类别" align="center" width=""></el-table-column>
                    <el-table-column prop="buyNum" label="数量" align="center" width=""></el-table-column>
                    <el-table-column prop="price" label="预算单价" align="center" width=""></el-table-column>
                    <el-table-column prop="budgetPrice" label="预算金额" align="center" width=""></el-table-column>

                  </el-table>
                  <div style="width: 96%; margin: 0 auto; padding-top: 10px; text-align: right;">
                    预算总金额：{{totalMoney}} 元
                  </div>

                </div>

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

  export default {
    name: "userCustomMobanPage1",
    components: {
      HyhtInput, HyhtSelect, HyhtMupSelect, HyhtCheckSel, HyhtCascader,
      HyhtDate, HyhtDateTime, HyhtDateWeek, HyhtDateMonth, HyhtDataYear,
      HyhtDaterange
    },
    data() {
      return {

        // 搜索条件表单
        conditionsForm: {},
        //初始化搜索表单
        initConditionsF:{

          planName:{modelValue:''},
          daterangePick:{
            // modelValue:['2019-10-12','2019-10-19']
            modelValue:[]
          }
        },
        tableData: [
          {
            id:1,
            createTime:'2019-09-30 10:15',
            plan:'2019-09-30 10:15采购计划',
            num:'100',
            rowTotalMoney:'0',
            finishTime:'2019-09-30 10:15',
            finish:true
          },
          {
            id:2,
            createTime:'2019-09-30 10:15',
            plan:'2019-05-30 10:15采购计划',
            num:'100',
            rowTotalMoney:'0',
            finishTime:'/',
            finish:false
          },
          {
            id:3,
            createTime:'2019-09-30 10:15',
            plan:'采购计划采购计划采购计划采购计划采购计划3',
            num:'100',
            rowTotalMoney:'0',
            finishTime:'/',
            finish:false
          }
        ],
        // multipleSel: [],//列表的已选项
        currentPage: 1,
        total: 20,
        pageSize: 10,
        pageNo: 1,

        // finish:false,

        // detailsPageForm: {},
        detailsPageVisible: false,
        //
        initDetailsPageF: {
          planName:{modelValue:''}

        },

        detailsTableData:[
          {
            id: 1,
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            buyNum: '18',
            price: '100',
            budgetPrice:'0'
          },
          {
            id: 2,
            type: {value:'2',label:'打印机2'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '2', label: '型号2'},
            classes:  {value: '1', label: '类别1'},
            buyNum: '18',
            price: '20',
            budgetPrice:'0'
          },
          {
            id: 3,
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            buyNum: '16',
            price: '40',
            budgetPrice:'0'
          },
          {
            id: 4,
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            buyNum: '18',
            price: '100',
            budgetPrice:'0'
          },
          {
            id: 5,
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            buyNum: '18',
            price: '130',
            budgetPrice:'0'
          },
          {
            id: 6,
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            buyNum: '18',
            price: '11',
            budgetPrice:'0'
          },
          {
            id: 7,
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            buyNum: '98',
            price: '100',
            budgetPrice:'0'
          }
        ],
        totalMoney:0


      };
    },
    created() {


    },
    mounted() {
      // var that = this;

    },
    methods: {
      // 查询
      viewOnQueryEvent() {
        var conditionsForm = {
          planName: this.initConditionsF.planName,
          daterangePick: this.initConditionsF.daterangePick,
        };

        this.conditionsForm = this.$mycommon.getcinditionForm(conditionsForm);
        console.log("条件查询表单：", this.conditionsForm);

        // 提交完成 重置表单
        // this.viewOnResetEvent();
      },
      // 重置查询表单
      viewOnResetEvent() {
        this.initConditionsF.planName.modelValue = '';
        this.initConditionsF. daterangePick.modelValue = '';
      },




      //完成
      toFinish(status){
        this.$confirm('“ '+status.plan+' ” 这批耗材已经入库完成了吗？', '提示',{ type: 'warning'})
          .then(_ => {
            status.finish = true;
            status.finishTime = this.$mycommon.format(new Date(), "yyyy-MM-dd HH:mm");
            // todo:更新相对于的耗材的库存量
          })
          .catch(_ => {
          });



      },

      // 查看
      viewOnShowEvent(data){
        console.log("查看详情");
        this.detailsPageVisible = true;

        console.log(data.finish);

        this.initDetailsPageF.planName.modelValue = data.finish?data.plan+'[已完成]':data.plan;

        // 计算行的预计金额
        this.detailsTableData.forEach((item) => {

          console.log(item);
          item.budgetPrice = parseInt(item.buyNum)*parseInt(item.price)
        });

        // 计算总金额
        this.totalMoney = 0;
        this.detailsTableData.forEach((item) => {
          // this.totalMoney = this.totalMoney+(item.price*item.num);
          this.totalMoney = this.totalMoney+item.budgetPrice;
        });

      },

      //查询 采购计划
      // queryPlan(){
      //   var detailsPageForm = {
      //     planName:this.initDetailsPageF.planName
      //   };
      //   this.detailsPageForm = this.$mycommon.getcinditionForm(detailsPageForm);
      //   console.log("采购计划查询表单：", this.detailsPageForm);
      // },


      // // 弹出修改弹窗
      // amendPop(data) {
      //   this.amendFormVisible = true;
      //   // console.log('修改的行数据',this.amendForm);
      //
      //   this.initAmendF.type.modelValue = data.type.value;
      //   this.initAmendF.brand.modelValue = data.brand.value;
      //   this.initAmendF.model.modelValue = data.model.value;
      //   this.initAmendF.classes.modelValue = data.classes.value;
      //   this.initAmendF.num.modelValue = data.num;
      //   this.initAmendF.price.modelValue = data.price;
      //
      // },
      // // 确认修改
      // viewOnAffirmEvent() {
      //   this.amendFormVisible = false;//关闭弹窗
      //
      //   var amendForm = {
      //     type: this.initAmendF.type,
      //     brand: this.initAmendF.brand,
      //     model: this.initAmendF.model,
      //     classes: this.initAmendF.classes,
      //     num:this.initAmendF.num,
      //     price:this.initAmendF.price
      //   };
      //
      //   this.amendForm = this.$mycommon.getFormVal(amendForm);
      //   console.log("修改的表单",this.amendForm);
      //
      //
      //   this.$message({
      //     message: '修改成功！',
      //     type: 'success'
      //   });
      // },

      // // 取消
      // viewOnCancelEvent() {
      //   // var that = this;
      //   this.userCustomOfDialog = false;
      // },
      handleCloseDialog(done) {
        var that = this;
        that.$confirm('确认关闭？', '提示')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },


      handleSizeChange(val) {
        var that = this;
        that.pageSize = val;
      },
      handleCurrentChange(val) {
        var that = this;
        that.pageNo = val;
      },


    }
  };
</script>
<style scoped>

</style>
