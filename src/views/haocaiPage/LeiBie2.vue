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

              <el-col :span="8">
                <!--<el-form-item label="类型:">-->
                  <!--<HyhtInput :inputValue='initConditionsF.type'></HyhtInput>-->
                <!--</el-form-item>-->
                <el-form-item label="类型:">
                  <HyhtSelect :modelSelectValue='initConditionsF.type'></HyhtSelect>
                </el-form-item>

              </el-col>
              <el-col :span="8">
                <el-form-item label="品牌:">
                  <!--<HyhtInput :inputValue='initConditionsF.brand'></HyhtInput>-->
                  <HyhtSelect :modelSelectValue='initConditionsF.brand'></HyhtSelect>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="型号:">
                  <!--<HyhtInput :inputValue='initConditionsF.model'></HyhtInput>-->
                  <HyhtSelect :modelSelectValue='initConditionsF.model'></HyhtSelect>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>


        <div class="userCustomMobanPageContainer-buttons">
          <el-button :disabled="multipleSel.length === 0" @click="batchDel()">批量删除</el-button>
          <el-button  @click="addPop()">新增</el-button>

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
                             prop="type.label"
                             label="类型">
            </el-table-column>
            <el-table-column align="center"
                             prop="brand.label"
                             label="品牌">
            </el-table-column>
            <el-table-column align="center"
                             prop="model.label"
                             label="型号">
            </el-table-column>

            <el-table-column align="center"
                             prop="classes.label"
                             label="类别"
            >
            </el-table-column>
            <el-table-column align="center"
                             prop="price"
                             label="预算单价"
            >
            </el-table-column>
            <el-table-column align="center"
                             prop="threshold"
                             label="阈值"
            >
            </el-table-column>
            <el-table-column align="center"
                             prop="valid"
                             label="是否有效"
            >
            </el-table-column>



            <el-table-column label="操作" align="center">
              <template slot-scope="scope">

                <el-button @click="amendPop(scope.row)"
                           size="small" type="text">修改
                </el-button>
                <el-button @click="delRow(scope.row)"
                           size="small"
                           type="text"
                           class="operationAbnormalColor">删除
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

      <!--修改弹窗-->
      <div class="userCustomMobanPageContainer-msgDialog">
        <el-dialog title="修改" :visible.sync="amendFormVisible" width="80%" :before-close="handleCloseDialog">
          <div class="userCustomMobanPageContainer-msgDialog__btns">
            <el-button @click="viewOnAffirmEvent">确 认</el-button>
            <el-button @click="amendFormVisible = false">取 消</el-button>
          </div>
          <div class="userCustomMobanPageContainer-msgDialog__body">
            <div class="userCustomMobanPageContainer-msgDialog__bodyTitle">修改</div>
            <div class="userCustomMobanPageContainer-msgDialog__bodyContent">
              <div class="userCustomMobanPageContainer-conditions">
                <el-form label-width="35%" :inline="true" :model="amendForm"
                         class="demo-form-inline userCustomMobanPageContainer-conditions__form">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="类型:">
                        <HyhtSelect :disabled-val="true" :modelSelectValue='initAmendF.type'></HyhtSelect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="品牌:">
                        <HyhtSelect :disabled-val="true" :modelSelectValue='initAmendF.brand'></HyhtSelect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="型号:">
                        <HyhtSelect :disabled-val="true" :modelSelectValue='initAmendF.model'></HyhtSelect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="类别:">
                        <HyhtSelect :disabled-val="true" :modelSelectValue='initAmendF.classes'></HyhtSelect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="阈值:">
                        <HyhtInput :inputValue='initAmendF.threshold'></HyhtInput>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="预算单价:">
                        <HyhtInput :inputValue='initAmendF.price'></HyhtInput>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="是否有效:">

                        <HyhtSwitch :switchValue="initAmendF.valid" ></HyhtSwitch>
                      </el-form-item>
                    </el-col>


                  </el-row>
                </el-form>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>

      <!--新增弹窗-->

      <div class="userCustomMobanPageContainer-msgDialog">
        <el-dialog title="新增" :visible.sync="addFormVisible" width="80%" :before-close="handleCloseDialog">
          <div class="userCustomMobanPageContainer-msgDialog__btns">
            <el-button @click="confirmAdd()">确 认</el-button>
            <el-button @click="addFormVisible = false">取消</el-button>
          </div>
          <div class="userCustomMobanPageContainer-msgDialog__body">
            <div class="userCustomMobanPageContainer-msgDialog__bodyTitle">新增</div>
            <div class="userCustomMobanPageContainer-msgDialog__bodyContent">
              <div class="userCustomMobanPageContainer-conditions">
                <el-form label-width="35%" :inline="true" :model="addForm"
                         class="demo-form-inline userCustomMobanPageContainer-conditions__form">
                  <el-row>
                    <el-col :span="12">
                      <!--<el-form-item label="类型:">-->
                        <!--<HyhtSelect :modelSelectValue='initAddForm.type'></HyhtSelect>-->
                      <!--</el-form-item>-->
                      <el-form-item label="类型:">

                        <el-tooltip v-if="initAddForm.type.selectOptions.length <= 0" class="item" effect="dark" content="没有任何类型，请先到类型维护添加类型" placement="right">

                          <HyhtSelect :disabled-val="true" :modelSelectValue='initAddForm.type'></HyhtSelect>

                        </el-tooltip>
                        <HyhtSelect v-else :modelSelectValue='initAddForm.type'></HyhtSelect>


                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <!--<el-form-item label="品牌:">-->
                        <!--<HyhtSelect :modelSelectValue='initAddForm.brand'></HyhtSelect>-->
                      <!--</el-form-item>-->
                      <el-form-item label="品牌:">

                        <el-tooltip v-if="initAddForm.brand.selectOptions.length <= 0" class="item" effect="dark" content="没有任何品牌，请先到品牌维护添加品牌" placement="right">

                          <HyhtSelect :disabled-val="true" :modelSelectValue='initAddForm.brand'></HyhtSelect>

                        </el-tooltip>
                        <HyhtSelect v-else :modelSelectValue='initAddForm.brand'></HyhtSelect>

                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <!--<el-form-item label="型号:">-->
                        <!--<HyhtSelect :modelSelectValue='initAddForm.model'></HyhtSelect>-->
                      <!--</el-form-item>-->
                      <el-form-item label="型号:">

                        <el-tooltip v-if="initAddForm.model.selectOptions.length <= 0" class="item" effect="dark" content="没有任何型号，请先到品牌维护添加型号" placement="right">

                          <HyhtSelect :disabled-val="true" :modelSelectValue='initAddForm.model'></HyhtSelect>

                        </el-tooltip>
                        <HyhtSelect v-else :modelSelectValue='initAddForm.model'></HyhtSelect>

                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="类别:">
                        <!--<HyhtSelect :modelSelectValue='initAddForm.classes'></HyhtSelect>-->
                        <HyhtInput :inputValue='initAddForm.classes'></HyhtInput>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="阈值:">
                        <HyhtInput :inputValue='initAddForm.threshold'></HyhtInput>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="预算单价:">
                        <HyhtInput :inputValue='initAddForm.price'></HyhtInput>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="是否有效:">

                        <HyhtSwitch :switchValue="initAddForm.valid" ></HyhtSwitch>
                      </el-form-item>
                    </el-col>

                    <!--<el-col :span="12">-->
                      <!--<el-form-item label="创建时间:">-->
                        <!--<HyhtDate :modelHyhtDateVal='initAddForm.time'></HyhtDate>-->
                      <!--</el-form-item>-->

                    <!--</el-col>-->


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
  import HyhtSwitch from '../../components/allConditionmodel/HyhtSwitch'

  export default {
    name: "userCustomMobanPage1",
    components: {
      HyhtInput, HyhtSelect, HyhtMupSelect, HyhtCheckSel, HyhtCascader,
      HyhtDate, HyhtDateTime, HyhtDateWeek, HyhtDateMonth, HyhtDataYear,
      HyhtDaterange,HyhtSwitch
    },
    data() {
      return {

        // 联动下拉选项
        linkageObj:[
          {
            id:'1',
            name:'类型1',
            brand:[
              {
                id:'1',
                name:'t1_品牌1',
                model:[
                  {id:'1',name:'t1_b1_型号1'},
                  {id:'2',name:'t1_b1_型号2'},
                  {id:'3',name:'t1_b1_型号3'}
                ]
              },
              {
                id:'2',
                name:'t1_品牌2',
                model:[
                  {id:'1',name:'t1_b2_型号1'},
                  {id:'2',name:'t1_b2_型号2'},
                  {id:'3',name:'t1_b2_型号3'}
                ]
              },
              {
                id:'3',
                name:'t1_品牌3',
                model:[
                  {id:'1',name:'t1_b3_型号1'},
                  {id:'2',name:'t1_b3_型号2'},
                  {id:'3',name:'t1_b3_型号3'}
                ]
              },
            ]

          },
          {
            id:'2',
            name:'类型2',
            brand:[
              {
                id:'1',
                name:'t2_品牌1',
                model:[
                  {id:'1',name:'t2_b1_型号1'},
                  {id:'2',name:'t2_b1_型号2'},
                  {id:'3',name:'t2_b1_型号3'}
                ]
              },
              {
                id:'2',
                name:'t2_品牌2',
                model:[
                  {id:'1',name:'t2_b2_型号1'},
                  {id:'2',name:'t2_b2_型号2'},
                  {id:'3',name:'t2_b2_型号3'}
                ]
              },
              {
                id:'3',
                name:'t2_品牌3',
                model:[
                  {id:'1',name:'t2_b3_型号1'},
                  {id:'2',name:'t2_b3_型号2'},
                  {id:'3',name:'t2_b3_型号3'}
                ]
              },
            ]

          },
          {
            id:'3',
            name:'类型3',
            brand:[
              {
                id:'1',
                name:'t3_品牌1',
                model:[
                  {id:'1',name:'t3_b1_型号1'},
                  {id:'2',name:'t3_b1_型号2'},
                  {id:'3',name:'t3_b1_型号3'}
                ]
              },
              {
                id:'2',
                name:'t3_品牌2',
                model:[
                  {id:'1',name:'t3_b2_型号1'},
                  {id:'2',name:'t3_b2_型号2'},
                  {id:'3',name:'t3_b2_型号3'}
                ]
              },
              {
                id:'3',
                name:'t3_品牌3',
                model:[
                  {id:'1',name:'t3_b3_型号1'},
                  {id:'2',name:'t3_b3_型号2'},
                  {id:'3',name:'t3_b3_型号3'}
                ]
              },
            ]

          }
        ],

        // 搜索条件表单
        conditionsForm: {},
        //初始化搜索表单
        initConditionsF:{
          type:{
            modelValue:'',
            selectOptions: [
              {value: '1', label: '打印机1'},
              {value: '2', label: '打印机2'},
              {value: '3', label: '打印机3'}
            ]
          },
          brand:{
            modelValue:'',
            selectOptions: [
              {value: '1', label: '品牌1'},
              {value: '2', label: '品牌2'},
              {value: '3', label: '品牌3'}
            ]
          },
          model:{
            modelValue:'',
            selectOptions: [
              {value: '1', label: '型号1'},
              {value: '2', label: '型号2'},
              {value: '3', label: '型号3'}
            ]
          }
        },
        tableData: [
          {
            id:'1',
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model: {value:'1',label:'型号1'},
            classes: {value:'1',label:'类别1'},
            threshold:'50',
            price:'1090',
            valid:'true'

          }, {
            id:'2',
            type: {value:'2',label:'打印机2'},
            brand: {value:'2',label:'品牌2'},
            model: {value:'1',label:'型号1'},
            classes: {value:'2',label:'类别2'},
            threshold:'50',
            price:'1100',
            valid:'true'
          }, {
            id:'3',
            type: {value:'3',label:'打印机3'},
            brand: {value:'1',label:'品牌1'},
            model: {value:'2',label:'型号2'},
            classes: {value:'1',label:'类别1'},
            threshold:'50',
            price:'1002',
            valid:'true'
          }, {
            id:'4',
            type: {value:'1',label:'打印机1'},
            brand: {value:'3',label:'品牌3'},
            model: {value:'1',label:'型号1'},
            classes: {value:'1',label:'类别1'},
            threshold:'50',
            price:'105',
            valid:'true'
          }, {
            id:'5',
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model: {value:'2',label:'型号2'},
            classes: {value:'1',label:'类别1'},
            threshold:'50',
            price:'140',
            valid:'true'
          }, {
            id:'6',
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model: {value:'1',label:'型号1'},
            classes: {value:'1',label:'类别1'},
            threshold:'50',
            price:'200',
            valid:'true'
          }, {
            id:'7',
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model: {value:'1',label:'型号1'},
            classes: {value:'1',label:'类别1'},
            threshold:'50',
            price:'1200',
            valid:'true'
          }
        ],
        multipleSel: [],//列表的已选项
        currentPage: 1,
        total: 20,
        pageSize: 10,
        pageNo: 1,

        amendForm: {},
        amendFormVisible: false,
        //初始化修改表单
        initAmendF: {
          type: {
            modelValue: "",
            selectOptions: [
              {value: '1', label: '打印机1'},
              {value: '2', label: '打印机2'},
              {value: '3', label: '打印机3'}
            ]
          },
          brand: {
            modelValue: "",
            selectOptions: [
              {value: '1', label: '品牌1'},
              {value: '2', label: '品牌2'},
              {value: '3', label: '品牌3'}
            ]
          },
          model: {
            modelValue: "",
            selectOptions: [
              {value: '1', label: '型号1'},
              {value: '2', label: '型号2'},
              {value: '3', label: '型号3'}
            ]
          },
          classes: {
            modelValue: "",
            selectOptions: [
              {value: '1', label: '类别1'},
              {value: '2', label: '类别2'},
              {value: '3', label: '类别3'}
            ]
          },
          threshold:{modelValue:''},
          price:{modelValue:''},
          valid:{modelValue:'true'}
        },

        addForm:{},
        addFormVisible:false,
        initAddForm:{
          type: {
            modelValue: "",
            selectOptions: [
              {value: '1', label: '打印机1'},
              {value: '2', label: '打印机2'},
              {value: '3', label: '打印机3'}
            ]
          },
          brand: {
            modelValue: "",
            selectOptions: [
              {value: '1', label: '品牌1'},
              {value: '2', label: '品牌2'},
              {value: '3', label: '品牌3'}
            ]
          },
          model: {
            modelValue: "",
            selectOptions: [
              // {value: '1', label: '型号1'},
              // {value: '2', label: '型号2'},
              // {value: '3', label: '型号3'}
            ]
          },
          classes: {
            modelValue: "",
            // selectOptions: [
            //   {value: '1', label: '类别1'},
            //   {value: '2', label: '类别2'},
            //   {value: '3', label: '类别3'}
            // ]
          },
          threshold:{modelValue:''},
          price:{modelValue:''},
          valid:{modelValue:'true'}
        },



      };
    },
    created() {


      // var that = this;
      // this.$notify({
      //   title: '用户自定义模板1',
      //   message: '按钮组+查询表单+操作表格+分页（路由：#/mobanPage1）',
      //   duration: 5000
      // });
    },
    mounted() {
      // var that = this;

    },
    methods: {
      // 查询
      viewOnQueryEvent() {
        var conditionsForm = {
            type:this.initConditionsF.type,
            brand:this.initConditionsF.brand,
            model:this.initConditionsF.model,
        };

        this.conditionsForm = this.$mycommon.getcinditionForm(conditionsForm);
        console.log("条件查询表单：", this.conditionsForm);

        // 提交完成 重置表单
        // this.viewOnResetEvent();
      },
      // 重置
      viewOnResetEvent() {
        this.initConditionsF.type.modelValue = '';
        this.initConditionsF.brand.modelValue = '';
        this.initConditionsF.model.modelValue = '';
      },


      //批量删除
      batchDel(){
        //获取 勾选的行id
        var rowIds = this.multipleSel.map(item => item.id).toString();

        this.$confirm('确认删除第'+rowIds+'行数据吗？', '提示', {
          type: 'warning'
        }).then(() => {

          this.$message({
            message: '删除第'+rowIds+'行成功',
            type: 'success'
          });

          //清空多选内容
          this.toggleSelection();
          // console.log("清空已选？",this.multipleSelection)
        }).catch(() => {

        });
      },

      // 删除行
      delRow(data){
        // console.log(data.id);
        this.$confirm('确认删除'+data.id+'吗','提示',{type:'warning'}).then(() => {
          // todo:删除操作

          this.$message({message: '删除成功！', type: 'success'});

        });
      },

      // 新增
      addPop(){
        this.addFormVisible = true;

      },
      confirmAdd(){
        // console.log("新增表单",this.addForm);

        // todo:新增操作
        var addForm = {
          type: this.initAddForm.type,
          brand: this.initAddForm.brand,
          model:this.initAddForm.model,
          classes:this.initAddForm.classes,
          threshold:this.initAddForm.threshold,
          price:this.initAddForm.price
        };

        this.addForm = this.$mycommon.getFormVal(addForm);
        console.log("新增的表单",this.addForm);


        this.$message({message: '新增成功！', type: 'success'});

        this.addFormVisible = false;
      },








      //列表多选
      selectionChange(row) {
        this.multipleSel = row;
        // console.log(this.multipleSel.length)
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);

          })
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },


      // 弹出修改弹窗
      amendPop(data) {
        this.amendFormVisible = true;
        // console.log('修改的行数据',data,this.amendForm);
        this.initAmendF.type.modelValue = data.type.value;
        this.initAmendF.brand.modelValue = data.brand.value;
        this.initAmendF.model.modelValue = data.model.value;
        this.initAmendF.classes.modelValue = data.classes.value;
        this.initAmendF.threshold.modelValue = data.threshold;
        this.initAmendF.price.modelValue = data.price;
        this.initAmendF.valid.modelValue = data.valid;
      },
      // 确认修改
      viewOnAffirmEvent() {
        this.amendFormVisible = false;//关闭弹窗

        var amendForm = {
          type: this.initAmendF.type,
          brand: this.initAmendF.brand,
          model: this.initAmendF.model,
          classes: this.initAmendF.classes,
          threshold: this.initAmendF.threshold,
          price: this.initAmendF.price,
        };

        this.amendForm = this.$mycommon.getFormVal(amendForm);
        console.log("修改的表单",this.amendForm);


        this.$message({
          message: '修改成功！',
          type: 'success'
        });
      },

      // 取消
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
