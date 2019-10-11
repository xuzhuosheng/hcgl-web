<template>
  <div class="userCustomMobanPage1">
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
                <el-form-item label="类型:">
                  <HyhtSelect :modelSelectValue='conditionsForm.type'></HyhtSelect>
                </el-form-item>

              </el-col>
              <el-col :span="8">
                <el-form-item label="品牌:">
                  <HyhtSelect :modelSelectValue='conditionsForm.brand'></HyhtSelect>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="型号:">
                  <HyhtSelect :modelSelectValue='conditionsForm.model'></HyhtSelect>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类别:">
                  <HyhtSelect :modelSelectValue='conditionsForm.classes'></HyhtSelect>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="数量小于:">
                <HyhtInput :inputValue='conditionsForm.min'></HyhtInput>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>

        <div class="userCustomMobanPageContainer-buttons">
          <el-button :disabled="multipleSel.length === 0" @click="batchGeneration()">批量生成采购计划</el-button>
          <el-button :disabled="multipleSel.length === 0" @click="intelligentizeGeneration()">智能生成采购计划</el-button>
        </div>
        <div class="userCustomMobanPageContainer-tables">
          <el-table
            :data="tableData"
            ref="multipleTable"
            @selection-change="selectionChange"
            border
            style="width: 100%">
            <el-table-column align="center" type="selection">
            </el-table-column>
            <el-table-column align="center"
                             prop="type"
                             label="类型">
            </el-table-column>
            <el-table-column align="center"
                             prop="brand"
                             label="品牌"
            >
            </el-table-column>
            <el-table-column align="center"
                             prop="model"
                             label="型号">
            </el-table-column>
            <el-table-column align="center"
                             prop="classes"
                             label="类别">
            </el-table-column>
            <el-table-column align="center"
                             prop="num"
                             label="数量">
            </el-table-column>
            <el-table-column align="center"
                             prop="price"
                             label="预计单价">
            </el-table-column>


            <el-table-column label="操作" align="center">
              <template slot-scope="scope">

                <el-button @click="amendPop(scope.row)"
                           size="small" type="text">修改
                </el-button>
                <el-button @click="purchase(scope.row)"
                           size="small"
                           type="text">采购
                </el-button>

                <!--<el-button @click="viewOnShowEvent(scope.row)" type="text" size="small">查看</el-button>-->
                <!--<el-button @click="viewOnEditEvent(scope.row)" type="text" size="small">编辑</el-button>-->
                <!--<el-button @click="viewOnDelectEvent(scope.row)" class="operationAbnormalColor" type="text" size="small">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <div class="userCustomMobanPageContainer-paginations">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>

      <!--弹窗-->
      <div class="userCustomMobanPageContainer-msgDialog">
        <el-dialog title="修改" :visible.sync="amendFormVisible" width="80%" :before-close="handleCloseDialog">
          <div class="userCustomMobanPageContainer-msgDialog__btns">
            <el-button @click="viewOnAffirmEvent">确 认</el-button>
            <el-button @click="viewOnCancelEvent">取 消</el-button>
          </div>
          <div class="userCustomMobanPageContainer-msgDialog__body">
            <div class="userCustomMobanPageContainer-msgDialog__bodyTitle">修改</div>
            <div class="userCustomMobanPageContainer-msgDialog__bodyContent">
              <div class="userCustomMobanPageContainer-conditions">
                <el-form label-width="35%" :inline="true" :model="amendForm" class="demo-form-inline userCustomMobanPageContainer-conditions__form">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="类型:">
                        <HyhtSelect :modelSelectValue='amendForm.type'></HyhtSelect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="品牌:">
                        <HyhtSelect :modelSelectValue='amendForm.brand'></HyhtSelect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="型号:">
                        <HyhtSelect :modelSelectValue='amendForm.model'></HyhtSelect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="类别:">
                        <HyhtSelect :modelSelectValue='amendForm.classes'></HyhtSelect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="数量:">
                        <HyhtInput :inputValue='input'></HyhtInput>
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
  export default {
    name: "userCustomMobanPage1",
    components:{
      HyhtInput,HyhtSelect,HyhtMupSelect,HyhtCheckSel,HyhtCascader,
      HyhtDate,HyhtDateTime,HyhtDateWeek,HyhtDateMonth,HyhtDataYear,
      HyhtDaterange
    },
    data() {
      return {
        // conditionsForm:{},
        //输入框
        input:{modelValue:"121"},

        // 下拉框
        selectOpt:{
          type:{
            modelValue:"1",
            selectOptions:[
              { value:'1', label:'打印机1'},
              { value:'2', label:'打印机2'},
              { value:'3', label:'打印机3'}
            ]
          },
          brand:{
            modelValue:"",
            selectOptions:[
              { value:'1', label:'品牌1'},
              { value:'2', label:'品牌2'},
              { value:'3', label:'品牌3'}
            ]
          },
          model:{
            modelValue:"",
            selectOptions:[
              { value:'1', label:'型号1'},
              { value:'2', label:'型号2'},
              { value:'3', label:'型号3'}
            ]
          },
          classes:{
            modelValue:"",
            selectOptions:[
              { value:'1', label:'类别1'},
              { value:'2', label:'类别2'},
              { value:'3', label:'类别3'}
            ]
          }
        },
        // 搜索条件表单
        conditionsForm: {
          // type:this.selectOpt.type.modelValue,
          // brand:this.selectOpt.brand,
          // model:this.selectOpt.model,
          // classes:this.selectOpt.classes,
          // min:''
        },



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


        tableData: [
          {
            id:0,
            type: '打印机',
            brand: '三星',
            model: 'MFC-8510N',
            classes: '类别',
            num: '18',
            price: '100'
          }, {
            id:1,
            type: '打印机',
            brand: '三星',
            model: 'MFC-8510N',
            classes: '类别',
            num: '18',
            price: '100'
          }, {
            id:2,
            type: '打印机',
            brand: '三星',
            model: 'MFC-8510N',
            classes: '类别',
            price: '100'
          }, {
            id:3,
            type: '打印机',
            brand: '三星',
            model: 'MFC-8510N',
            classes: '类别',
            num: '18',
            price: '100'
          }, {
            id:4,
            type: '打印机',
            brand: '三星',
            model: 'MFC-8510N',
            classes: '类别',
            price: '100'
          }, {
            id:5,
            type: '打印机',
            brand: '三星',
            model: 'MFC-8510N',
            classes: '类别',
            num: '18',
            price: '100'
          }, {
            id:6,
            type: '打印机',
            brand: '三星',
            model: 'MFC-8510N',
            classes: '类别',
            num: '18',
            price: '100'
          }
        ],
        multipleSel:[],//列表的已选项

        amendForm: {},
        amendFormVisible: false,

        currentPage: 1,
        total:20,
        pageSize:10,
        pageNo:1,
      };
    },
    created() {

      this.conditionsForm = {
        type:this.selectOpt.type,
        brand:this.selectOpt.brand,
        model:this.selectOpt.model,
        classes:this.selectOpt.classes,
        min:{modelValue:""}
      };

      console.log("why?",this.conditionsForm);


      var that = this;
      that.$notify({
        title: '用户自定义模板1',
        message: '按钮组+查询表单+操作表格+分页（路由：#/mobanPage1）',
        duration: 5000
      });
    },
    mounted() {
      // var that = this;
      console.log("表单",this.conditionsForm);
    },
    methods: {
      // 查询
      viewOnQueryEvent(){
        var that = this;
        // var conditionsForm = {
        //
        //
        //
        //   input:that.input, //输入框
        //   intSelect:that.intSelect, //基础下拉框
        //   cascaderSelect:that.cascaderSelect, //级联下拉框
        //   multiSelect:that.multiSelect, //多选下拉框
        //   checkAllMultiSelect:that.checkAllMultiSelect, //全选多选下拉框
        //   datePick:that.datePick,  //日期选择器
        //   monthPick:that.datePick,  //月选择器
        //   yearPick:that.yearPick,  //年选择器
        //   weekPick:that.weekPick,  //周选择器
        //   datetimePick:that.datetimePick, //日期时间选择器
        //   daterangePick:that.daterangePick,//时间范围选择器
        // }

        var conditionsForm = this.conditionsForm;
        that.conditionsForm = that.$mycommon.getcinditionForm(conditionsForm);
        console.log("that.conditionsForm",that.conditionsForm)
      },
      // 重置
      viewOnResetEvent(){
        var that = this;
        that.conditionsForm.type.modelValue = '';
        that.conditionsForm.brand.modelValue = '';
        that.conditionsForm.model.modelValue = '';
        that.conditionsForm.classes.modelValue = '';
        that.conditionsForm.min.modelValue = '';
      },

      // todo:不需要先确认
      //批量生成采购计划
      batchGeneration(){
        //获取 勾选的行id
        var rowIds = this.multipleSel.map(item => item.id).toString();
        // console.log("??:",rowId);

        this.$confirm('确认生成选中的第'+rowIds+'行记录吗？', '提示', {
          type: 'info'
        }).then(() => {
          // this.loading = true;

          // let para = {ids: rowIds};
          // batchGenerationPlan(para).then((res) => {
          //     this.loading = false;
          //
          //     this.$message({
          //         message: '生成成功',
          //         type: 'success'
          //     });
          //
          // });

          this.$message({
            message: '生成第'+rowIds+'行计划',
            type: 'success'
          });

          //清空多选内容
          this.toggleSelection();
          console.log("清空已选？",this.multipleSel)
        }).catch(() => {

        });


      },

      //todo:不需要先确认
      //智能生成采购计划
      intelligentizeGeneration(){
        //获取 勾选的行id
        var rowIds = this.multipleSel.map(item => item.id).toString();
        // console.log("??:",rowId);

        this.$confirm('确认智能生成选中的第'+rowIds+'行记录吗？', '提示', {
          type: 'info'
        }).then(() => {

          this.$message({
            message: '智能生成第'+rowIds+'行计划',
            type: 'success'
          });

          //清空多选内容
          this.toggleSelection();
          console.log("清空已选？",this.multipleSel)
        }).catch(() => {

        });


      },


      //列表多选
      selectionChange(row) {
        this.multipleSel = row;
        console.log(this.multipleSel.length)
      },
      toggleSelection(rows){
        if(rows){
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);

          })
        }else {
          this.$refs.multipleTable.clearSelection();
        }
      },


      // 弹出修改弹窗
      amendPop(data) {
        this.amendFormVisible = true;
        this.amendForm = data
      },
      // 确认修改
      viewOnAffirmEvent() {
        this.amendFormVisible = false;//关闭弹窗
        this.$message({
          message: '修改成功！',
          type: 'success'
        });
      },

      // 取消
      viewOnCancelEvent(){
        var that = this;
        that.userCustomOfDialog = false;
      },
      handleCloseDialog(done){
        var that = this;
        that.$confirm('确认关闭？','提示')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
<style scoped>
  .userCustomMobanPage1 .userCustomMobanPageContainer .userCustomMobanPageContainer-buttons .el-button{
    width: auto;
    padding: 0 10px;
  }
</style>
