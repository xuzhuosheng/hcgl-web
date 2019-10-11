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
                <el-form-item label="申请部门:">
                  <HyhtSelect :modelSelectValue='initConditionsF.applyDepartmenet'></HyhtSelect>
                </el-form-item>

              </el-col>
              <el-col :span="8">
                <!--<el-form-item label="申请时间:">-->
                  <!--<HyhtDate :modelHyhtDateVal='initConditionsF.applyTime'></HyhtDate>-->
                <!--</el-form-item>-->
                <el-form-item label="申请时间:">
                  <HyhtDaterange :modelHyhtDaterangeVal='initConditionsF.applyTime'></HyhtDaterange>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型:">
                  <HyhtSelect :modelSelectValue='initConditionsF.type'></HyhtSelect>
                </el-form-item>

              </el-col>
              <el-col :span="8">
                <el-form-item label="品牌:">
                  <!--<HyhtSelect :modelSelectValue='initConditionsF.brand'></HyhtSelect>-->
                  <HyhtSelect :disabled-val="disableVal.searchBDV" @change-event="pushConditionsModelOpt" :modelSelectValue='initConditionsF.brand'></HyhtSelect>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="型号:">
                  <!--<HyhtSelect :modelSelectValue='initConditionsF.model'></HyhtSelect>-->
                  <HyhtSelect :disabled-val="disableVal.searchMDV" :modelSelectValue='initConditionsF.model'></HyhtSelect>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类别:">
                  <!--<HyhtSelect :modelSelectValue='initConditionsF.classes'></HyhtSelect>-->
                  <HyhtInput :inputValue='initConditionsF.classes'></HyhtInput>
                </el-form-item>
              </el-col>
              <!--<el-col :span="8">-->
                <!--<el-form-item label="数量小于:">-->
                  <!--<HyhtInput :inputValue='initConditionsF.min'></HyhtInput>-->
                <!--</el-form-item>-->
              <!--</el-col>-->

            </el-row>
          </el-form>
        </div>

        <!--<div class="userCustomMobanPageContainer-buttons">-->
          <!--<el-button :disabled="multipleSel.length === 0" @click="batchGeneration()">批量生成采购计划</el-button>-->
          <!--<el-button :disabled="multipleSel.length === 0" @click="intelligentizeGeneration()">智能生成采购计划</el-button>-->
        <!--</div>-->
        <div class="userCustomMobanPageContainer-buttons">
          <el-button :disabled="multipleSel.length === 0" @click="batchDel()">批量删除</el-button>


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
                             prop="applyDepartmenet.label"
                             label="申请部门">
            </el-table-column>
            <el-table-column align="center"
                             prop="applyTime"
                             label="申请时间">
            </el-table-column>
            <el-table-column align="center"
                             prop="proposer"
                             label="申请人">
            </el-table-column>

            <el-table-column align="center"
                             prop="type.label"
                             label="类型">
            </el-table-column>
            <el-table-column align="center"
                             prop="brand.label"
                             label="品牌"
            >
            </el-table-column>
            <el-table-column align="center"
                             prop="model.label"
                             label="型号">
            </el-table-column>
            <el-table-column align="center"
                             prop="classes.label"
                             label="类别">
            </el-table-column>
            <el-table-column align="center"
                             prop="num"
                             label="数量">
            </el-table-column>
            <el-table-column align="center"
                             prop="status"
                             label="申请状态">
              <template slot-scope="scope">
                <span class="status_color1" v-if="scope.row.status =='0'">审批中</span>
                <span class="status_color2" v-if="scope.row.status =='1'">审批通过</span>
                <span class="status_color3" v-if="scope.row.status =='2'">退回</span>
                <span class="status_color4" v-if="scope.row.status =='3'">中止</span>
              </template>
            </el-table-column>
            <!--<el-table-column align="center"-->
                             <!--prop="price"-->
                             <!--label="预计单价">-->
            <!--</el-table-column>-->


            <el-table-column label="操作" align="center">
              <template slot-scope="scope">

                <!--<el-button @click="delRow(scope.row)" class="operationAbnormalColor"-->
                           <!--size="small" type="text">删除-->
                <!--</el-button>-->
                <el-button :disabled="scope.row.status==='0'||scope.row.status==='1'" @click="delRow(scope.row)" class="operationAbnormalColor"
                           size="small" type="text">删除
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

        //搜索框的 联动下拉选项
        searchTypeObj: [
          {
            id: '0',
            name: '全部',
            checked: false,
            brand: [
              {
                id: '0',
                name: '全部',
                checked: false,
                model: [
                  {id: '0', name: '全部', checked: false},
                  {id: '1_1_1', name: 't1_b1_型号1', checked: false},
                  {id: '1_1_2', name: 't1_b1_型号2', checked: false},
                  {id: '1_1_3', name: 't1_b1_型号3', checked: false},


                  {id: '1_2_1', name: 't1_b2_型号1', checked: false},
                  {id: '1_2_2', name: 't1_b2_型号2', checked: false},
                  {id: '1_2_3', name: 't1_b2_型号3', checked: false},


                  {id: '1_3_1', name: 't1_b3_型号1', checked: false},
                  {id: '1_3_2', name: 't1_b3_型号2', checked: false},
                  {id: '1_3_3', name: 't1_b3_型号3', checked: false},

                  {id: '2_1_1', name: 't2_b1_型号1', checked: false},
                  {id: '2_1_2', name: 't2_b1_型号2', checked: false},
                  {id: '2_1_3', name: 't2_b1_型号3', checked: false},

                  {id: '2_2_1', name: 't2_b2_型号1', checked: false},
                  {id: '2_2_2', name: 't2_b2_型号2', checked: false},
                  {id: '2_2_3', name: 't2_b2_型号3', checked: false},

                  {id: '2_3_1', name: 't2_b3_型号1', checked: false},
                  {id: '2_3_2', name: 't2_b3_型号2', checked: false},
                  {id: '2_3_3', name: 't2_b3_型号3', checked: false},

                  {id: '3_1_1', name: 't3_b1_型号1', checked: false},
                  {id: '3_1_2', name: 't3_b1_型号2', checked: false},
                  {id: '3_1_3', name: 't3_b1_型号3', checked: false},

                  {id: '3_2_1', name: 't3_b2_型号1', checked: false},
                  {id: '3_2_2', name: 't3_b2_型号2', checked: false},
                  {id: '3_2_3', name: 't3_b2_型号3', checked: false},

                  {id: '3_3_1', name: 't3_b3_型号1', checked: false},
                  {id: '3_3_2', name: 't3_b3_型号2', checked: false},
                  {id: '3_3_3', name: 't3_b3_型号3', checked: false}




                ]
              },

              {
                id: '1_1',
                name: 't1_品牌1',
                checked: false,
                model: [
                  {id: '1_1_1', name: 't1_b1_型号1', checked: false},
                  {id: '1_1_2', name: 't1_b1_型号2', checked: false},
                  {id: '1_1_3', name: 't1_b1_型号3', checked: false}
                ]
              },
              {
                id: '1_2',
                name: 't1_品牌2',
                checked: false,
                model: [
                  {id: '1_2_1', name: 't1_b2_型号1', checked: false},
                  {id: '1_2_2', name: 't1_b2_型号2', checked: false},
                  {id: '1_2_3', name: 't1_b2_型号3', checked: false}
                ]
              },
              {
                id: '1_3',
                name: 't1_品牌3',
                checked: false,
                model: [
                  {id: '1_3_1', name: 't1_b3_型号1', checked: false},
                  {id: '1_3_2', name: 't1_b3_型号2', checked: false},
                  {id: '1_3_3', name: 't1_b3_型号3', checked: false}
                ]
              },

              {
                id: '2_1',
                name: 't2_品牌1',
                checked: false,
                model: [
                  {id: '2_1_1', name: 't2_b1_型号1', checked: false},
                  {id: '2_1_2', name: 't2_b1_型号2', checked: false},
                  {id: '2_1_3', name: 't2_b1_型号3', checked: false}
                ]
              },
              {
                id: '2_2',
                name: 't2_品牌2',
                checked: false,
                model: [
                  {id: '2_2_1', name: 't2_b2_型号1', checked: false},
                  {id: '2_2_2', name: 't2_b2_型号2', checked: false},
                  {id: '2_2_3', name: 't2_b2_型号3', checked: false}
                ]
              },
              {
                id: '2_3',
                name: 't2_品牌3',
                checked: false,
                model: [
                  {id: '2_3_1', name: 't2_b3_型号1', checked: false},
                  {id: '2_3_2', name: 't2_b3_型号2', checked: false},
                  {id: '2_3_3', name: 't2_b3_型号3', checked: false}
                ]
              },

              {
                id: '3_1',
                name: 't3_品牌1',
                checked: false,
                model: [
                  {id: '3_1_1', name: 't3_b1_型号1', checked: false},
                  {id: '3_1_2', name: 't3_b1_型号2', checked: false},
                  {id: '3_1_3', name: 't3_b1_型号3', checked: false}
                ]
              },
              {
                id: '3_2',
                name: 't3_品牌2',
                checked: false,
                model: [
                  {id: '3_2_1', name: 't3_b2_型号1', checked: false},
                  {id: '3_2_2', name: 't3_b2_型号2', checked: false},
                  {id: '3_2_3', name: 't3_b2_型号3', checked: false}
                ]
              },
              {
                id: '3_3',
                name: 't3_品牌3',
                checked: false,
                model: [
                  {id: '3_3_1', name: 't3_b3_型号1', checked: false},
                  {id: '3_3_2', name: 't3_b3_型号2', checked: false},
                  {id: '3_3_3', name: 't3_b3_型号3', checked: false}
                ]
              },
            ]

          },
          {
            id: '1',
            name: '类型1',
            checked: false,
            brand: [
              {
                id: '1_1',
                name: 't1_品牌1',
                checked: false,
                model: [
                  {id: '1_1_1', name: 't1_b1_型号1', checked: false},
                  {id: '1_1_2', name: 't1_b1_型号2', checked: false},
                  {id: '1_1_3', name: 't1_b1_型号3', checked: false}
                ]
              },
              {
                id: '1_2',
                name: 't1_品牌2',
                checked: false,
                model: [
                  {id: '1_2_1', name: 't1_b2_型号1', checked: false},
                  {id: '1_2_2', name: 't1_b2_型号2', checked: false},
                  {id: '1_2_3', name: 't1_b2_型号3', checked: false}
                ]
              },
              {
                id: '1_3',
                name: 't1_品牌3',
                checked: false,
                model: [
                  {id: '1_3_1', name: 't1_b3_型号1', checked: false},
                  {id: '1_3_2', name: 't1_b3_型号2', checked: false},
                  {id: '1_3_3', name: 't1_b3_型号3', checked: false}
                ]
              },
            ]

          },
          {
            id: '2',
            name: '类型2',
            checked: false,
            brand: [
              {
                id: '2_1',
                name: 't2_品牌1',
                checked: false,
                model: [
                  {id: '2_1_1', name: 't2_b1_型号1', checked: false},
                  {id: '2_1_2', name: 't2_b1_型号2', checked: false},
                  {id: '2_1_3', name: 't2_b1_型号3', checked: false}
                ]
              },
              {
                id: '2_2',
                name: 't2_品牌2',
                checked: false,
                model: [
                  {id: '2_2_1', name: 't2_b2_型号1', checked: false},
                  {id: '2_2_2', name: 't2_b2_型号2', checked: false},
                  {id: '2_2_3', name: 't2_b2_型号3', checked: false}
                ]
              },
              {
                id: '2_3',
                name: 't2_品牌3',
                checked: false,
                model: [
                  {id: '2_3_1', name: 't2_b3_型号1', checked: false},
                  {id: '2_3_2', name: 't2_b3_型号2', checked: false},
                  {id: '2_3_3', name: 't2_b3_型号3', checked: false}
                ]
              },
            ]

          },
          {
            id: '3',
            name: '类型3',
            checked: false,
            brand: [
              {
                id: '3_1',
                name: 't3_品牌1',
                checked: false,
                model: [
                  {id: '3_1_1', name: 't3_b1_型号1', checked: false},
                  {id: '3_1_2', name: 't3_b1_型号2', checked: false},
                  {id: '3_1_3', name: 't3_b1_型号3', checked: false}
                ]
              },
              {
                id: '3_2',
                name: 't3_品牌2',
                checked: false,
                model: [
                  {id: '3_2_1', name: 't3_b2_型号1', checked: false},
                  {id: '3_2_2', name: 't3_b2_型号2', checked: false},
                  {id: '3_2_3', name: 't3_b2_型号3', checked: false}
                ]
              },
              {
                id: '3_3',
                name: 't3_品牌3',
                checked: false,
                model: [
                  {id: '3_3_1', name: 't3_b3_型号1', checked: false},
                  {id: '3_3_2', name: 't3_b3_型号2', checked: false},
                  {id: '3_3_3', name: 't3_b3_型号3', checked: false}
                ]
              },
            ]

          }
        ],//类型下的/品牌/型号
        // 当前选中类型下的brand
        currentBrands:{
          search:[],//查询表单中的
          // add:[],//新增表单中的
          // amend:[]
        },
        disableVal:{
          searchBDV:true,
          searchMDV:true,
          // addBDV:true,
          // addMDV:true,
          // amendBDV:false,
          // amendMDV:false
        },

        // 搜索条件表单
        conditionsForm: {},
        //初始化搜索表单
        initConditionsF:{
          applyDepartmenet: {
            modelValue: "0",
            selectOptions: [
              {value: '0', label: '全部'},
              {value: '1', label: '部门1'},
              {value: '2', label: '部门2'},
              {value: '3', label: '部门3'}
            ]
          },
          applyTime:{ modelValue:["2019-10-12","2019-11-01"]},
          type: {
            modelValue: "0",
            selectOptions: [
              // {value: '1', label: '打印机1'},
              // {value: '2', label: '打印机2'},
              // {value: '3', label: '打印机3'}
            ]
          },
          brand: {
            modelValue: "0",
            selectOptions: [
              // {value: '1', label: '品牌1'},
              // {value: '2', label: '品牌2'},
              // {value: '3', label: '品牌3'}
            ]
          },
          model: {
            modelValue: "0",
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
          }

        },
        // status 0：审批中 1：审批通过 2：退回 3：中止
        tableData: [
          {
            id: 1,
            applyDepartmenet:{value:'1',label:'部门1'},
            applyTime:'2019-11-12',
            proposer:'张珊珊',
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            num: '18',
            status:'0'
            // price: '100'
          },
          {
            id: 2,
            applyDepartmenet:{value:'1',label:'部门1'},
            applyTime:'2019-11-12',
            proposer:'李思思',
            type: {value:'2',label:'打印机2'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            num: '58',
            status:'1'
            // price: '120'
          },
          {
            id: 3,
            applyDepartmenet:{value:'2',label:'部门2'},
            applyTime:'2019-11-12',
            proposer:'黄武武',
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            num: '18',
            status:'2'
            // price: '100'
          },
          {
            id: 4,
            applyDepartmenet:{value:'1',label:'部门1'},
            applyTime:'2019-11-12',
            proposer:'张珊珊',
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            num: '18',
            status:'3'
            // price: '100'
          },
          {
            id: 5,
            applyDepartmenet:{value:'1',label:'部门1'},
            applyTime:'2019-11-12',
            proposer:'张珊珊',
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            num: '18',
            status:'0'
            // price: '100'
          },
          {
            id: 6,
            applyDepartmenet:{value:'1',label:'部门1'},
            applyTime:'2019-11-12',
            proposer:'张珊珊',
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            num: '18',
            status:'0'
            // price: '100'
          },
          {
            id: 7,
            applyDepartmenet:{value:'1',label:'部门1'},
            applyTime:'2019-11-12',
            proposer:'张珊珊',
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            num: '18',
            status:'0'
            // price: '100'
          }

        ],
        multipleSel: [],//列表的已选项
        currentPage: 1,
        total: 20,
        pageSize: 10,
        pageNo: 1,



      };
    },
    created() {
      // 获取类型
      this.initConditionsF.type.selectOptions =this.$mycommon.initOpt(this.searchTypeObj);

      this.currentBrands.search =  this.$mycommon.pushBrandOpt('0',this.searchTypeObj,this.initConditionsF,this.currentBrands.search);
      this.disableVal.searchBDV = false; //品牌选项可用

      this.$mycommon.pushModelOpt('0',this.currentBrands.search,this.initConditionsF);
      this.disableVal.searchMDV = false; //型号选项可用



    },
    mounted() {
      // var that = this;

    },
    methods: {
      //查询表单添加品牌下拉项
      pushConditionsBrandOpt(value) {

        this.currentBrands.search = this.$mycommon.pushBrandOpt(value,this.searchTypeObj,this.initConditionsF,this.currentBrands.search);

        this.initConditionsF.brand.modelValue = '';
        this.initConditionsF.model.modelValue = '';
        this.disableVal.searchBDV = false; //品牌选项可用
        this.disableVal.searchMDV = true;
      },
      //查询表单添加型号下拉项
      pushConditionsModelOpt(value) {
        this.$mycommon.pushModelOpt(value,this.currentBrands.search,this.initConditionsF);
        this.initConditionsF.model.modelValue = '';
        this.disableVal.searchMDV = false; //型号选项可用
      },


      // 查询
      viewOnQueryEvent() {
        var conditionsForm = {
            applyDepartmenet: this.initConditionsF.applyDepartmenet,
            applyTime: this.initConditionsF.applyTime,
            type: this.initConditionsF.type,
            brand: this.initConditionsF.brand,
            model: this.initConditionsF.model,
            classes: this.initConditionsF.classes,
        };


        this.conditionsForm = this.$mycommon.getcinditionForm(conditionsForm);
        console.log("条件查询表单：", this.conditionsForm);

        // 提交完成 重置表单
        // this.viewOnResetEvent();
      },
      // 重置
      viewOnResetEvent() {
        this.initConditionsF.applyDepartmenet.modelValue = '';
        this.initConditionsF.applyTime.modelValue = '';
        this.initConditionsF.type.modelValue = '';
        this.initConditionsF.brand.modelValue = '';
        this.initConditionsF.model.modelValue = '';
        this.initConditionsF.classes.modelValue = '';
      },

      //批量删除
      batchDel() {
        //获取 勾选的行id
        var rowIds = this.multipleSel.map(item => item.id).toString();

        this.$confirm('确认删除第' + rowIds + '行数据吗？', '提示', {
          type: 'warning'
        }).then(() => {

          this.$message({
            message: '删除第' + rowIds + '行成功',
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




      //列表多选
      selectionChange(row) {
        this.multipleSel = row;
        console.log(this.multipleSel.length)
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
