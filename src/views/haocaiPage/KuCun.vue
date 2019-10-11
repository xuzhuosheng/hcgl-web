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
                <el-form-item label="类型:">
                  <!--<HyhtSelect :modelSelectValue='initConditionsF.type'></HyhtSelect>-->
                  <HyhtSelect @change-event="pushConditionsBrandOpt" :modelSelectValue='initConditionsF.type'></HyhtSelect>
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
              <el-col :span="8">
                <el-form-item label="数量小于:">
                  <!--<HyhtInput :inputValue='initConditionsF.min'></HyhtInput>-->
                  <!--<HyhtNumInput :inputValue='initConditionsF.min'></HyhtNumInput>-->
                  <HyhtNumInput :inputValue='initConditionsF.min'></HyhtNumInput>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>

        <div class="userCustomMobanPageContainer-buttons">
          <el-button :disabled="multipleSel.length === 0" @click="batchGeneration()">批量生成采购计划</el-button>
          <el-button @click="intelligentizeGeneration()">智能生成采购计划</el-button>
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
                             prop="price"
                             label="预计单价">
            </el-table-column>


            <el-table-column label="操作" align="center">
              <template slot-scope="scope">

                <el-button @click="amendPop(scope.row)"
                           size="small" type="text">修改
                </el-button>
                <!--<el-button @click="purchase(scope.row)"-->
                           <!--size="small"-->
                           <!--type="text">采购-->
                <!--</el-button>-->

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
            <!--<el-button @click="viewOnCancelEvent">取 消</el-button>-->
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
                      <el-form-item label="数量:">
                        <!--<HyhtInput :inputValue='initAmendF.num'></HyhtInput>-->
                        <HyhtNumInput :inputValue='initAmendF.num'></HyhtNumInput>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="预算单价:">
                        <HyhtInput :disabled-val="true" :inputValue='initAmendF.price'></HyhtInput>
                      </el-form-item>
                    </el-col>


                  </el-row>
                </el-form>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>


      <!--智能采购计划 弹窗-->
      <div class="userCustomMobanPageContainer-msgDialog">
        <el-dialog title="智能采购计划" :visible.sync="zncgjhVisible" width="80%" :before-close="handleCloseDialog">
          <div class="userCustomMobanPageContainer-msgDialog__btns">
            <el-button>生成采购计划</el-button>
            <el-button @click="zncgjhVisible = false">取 消</el-button>
          </div>
          <div class="userCustomMobanPageContainer-msgDialog__body">
            <div class="userCustomMobanPageContainer-msgDialog__bodyTitle">智能采购计划</div>
            <div class="userCustomMobanPageContainer-msgDialog__bodyContent">
              <div class="userCustomMobanPageContainer-conditions">
                <div class="userCustomMobanPageContainer-conditions">
                  <el-form label-width="35%" :inline="true" :model="zncgjhForm" class="demo-form-inline userCustomMobanPageContainer-conditions__form">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="采购计划名称:">
                          <HyhtInput :inputValue='initZncgjhF.planName'></HyhtInput>
                        </el-form-item>
                      </el-col>

                    </el-row>
                  </el-form>
                </div>
                <div class="userCustomMobanPageContainer-tables">
                  <el-table
                    :data="zncgjhTableData"
                    border
                    style="width: 96%; margin: 0 auto;">
                    <el-table-column prop="type.label" label="类型" align="center" width=""></el-table-column>
                    <el-table-column prop="brand.label" label="品牌" align="center" width=""></el-table-column>
                    <el-table-column prop="model.label" label="型号" align="center" width=""></el-table-column>
                    <el-table-column prop="classes.label" label="类别" align="center" width=""></el-table-column>
                    <el-table-column prop="stockNum" label="库存数量" align="center" width=""></el-table-column>
                    <el-table-column prop="buyNum" label="采购数量" align="center" width="">
                      <template slot-scope="scope">

                        <!--<HyhtInput :inputValue="scope.row.buyNum"></HyhtInput>-->
                        <HyhtNumInput :inputValue='scope.row.buyNum'></HyhtNumInput>
                      </template>
                    </el-table-column>
                    <el-table-column prop="price" label="预算单价" align="center" width=""></el-table-column>
                    <el-table-column prop="budgetPrice" label="预计金额" align="center" width=""></el-table-column>
                  </el-table>

                  <div style="width: 96%; margin:10px auto" class="userCustomMobanPageContainer-paginations">
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


                  <div style="width: 96%; margin: 0 auto; padding-top: 10px; text-align: right;">
                    预算总金额：{{totalMoney}} 元
                  </div>

                </div>

              </div>
            </div>
          </div>
        </el-dialog>
      </div>

      <!--todo: 列表要换-->
      <!--批量生成采购计划 弹窗-->
      <div class="userCustomMobanPageContainer-msgDialog">
        <el-dialog title="批量生成采购计划" :visible.sync="plscVisible" width="80%" :before-close="handleCloseDialog">
          <div class="userCustomMobanPageContainer-msgDialog__btns">
            <el-button>生成采购计划</el-button>
            <el-button @click="plscVisible = false">取 消</el-button>
          </div>
          <div class="userCustomMobanPageContainer-msgDialog__body">
            <div class="userCustomMobanPageContainer-msgDialog__bodyTitle">采购计划</div>
            <div class="userCustomMobanPageContainer-msgDialog__bodyContent">
              <div class="userCustomMobanPageContainer-conditions">
                <div class="userCustomMobanPageContainer-conditions">
                  <el-form label-width="35%" :inline="true" :model="plscForm" class="demo-form-inline userCustomMobanPageContainer-conditions__form">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="采购计划名称:">
                          <HyhtInput :inputValue='initPlscF.planName'></HyhtInput>
                        </el-form-item>
                      </el-col>

                    </el-row>
                  </el-form>
                </div>
                <div class="userCustomMobanPageContainer-tables">
                  <el-table
                    :data="zncgjhTableData"
                    border
                    style="width: 96%; margin: 0 auto;">
                    <el-table-column prop="type.label" label="类型" align="center" width=""></el-table-column>
                    <el-table-column prop="brand.label" label="品牌" align="center" width=""></el-table-column>
                    <el-table-column prop="model.label" label="型号" align="center" width=""></el-table-column>
                    <el-table-column prop="classes.label" label="类别" align="center" width=""></el-table-column>
                    <el-table-column prop="stockNum" label="库存数量" align="center" width=""></el-table-column>
                    <el-table-column prop="buyNum" label="采购数量" align="center" width="">
                      <template slot-scope="scope">
                        <!--<HyhtInput :inputValue="scope.row.buyNum"></HyhtInput>-->
                        <HyhtNumInput :inputValue='scope.row.buyNum'></HyhtNumInput>
                      </template>
                    </el-table-column>
                    <el-table-column prop="price" label="预算单价" align="center" width=""></el-table-column>
                    <el-table-column prop="budgetPrice" label="预计金额" align="center" width=""></el-table-column>
                  </el-table>

                  <div style="width: 96%; margin:10px auto" class="userCustomMobanPageContainer-paginations">
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
  import HyhtNumInput from "../../components/allConditionmodel/HyhtNumInput";

  import { Httpclient,auth,anycshttp } from '../../../src/util/httplient';

  export default {
    name: "userCustomMobanPage1",
    components: {
      HyhtNumInput,
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
          add:[],//新增表单中的
          amend:[]
        },
        disableVal:{
          searchBDV:true,
          searchMDV:true,
          addBDV:true,
          addMDV:true,
          amendBDV:false,
          amendMDV:false
        },

        // 搜索条件表单
        conditionsForm: {},
        //初始化搜索表单
        initConditionsF:{
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
          },
          min:{modelValue:''}
        },
        tableData: [
          {
            id: 1,
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            num: '18',
            price: '100'
          },
          {
            id: 2,
            type: {value:'2',label:'打印机2'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '2', label: '型号2'},
            classes:  {value: '1', label: '类别1'},
            num: '182',
            price: '20'
          },
          {
            id: 3,
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            num: '18',
            price: '100'
          },
          {
            id: 4,
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            num: '18',
            price: '100'
          },
          {
            id: 5,
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            num: '18',
            price: '100'
          },
          {
            id: 6,
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            num: '18',
            price: '100'
          },
          {
            id: 7,
            type: {value:'1',label:'打印机1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            num: '18',
            price: '100'
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
            modelValue: "1",
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
          num:{modelValue:''},
          price:{modelValue:''}

        },

        // 智能生成
        zncgjhVisible:false,
        zncgjhForm:{},
        initZncgjhF:{
          planName:{modelValue:''}
        },
        zncgjhTableData:[
          {
            id: 1,
            type: {value:'1',label:'类型1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            stockNum: '18',
            buyNum:{ modelValue: "120",},
            price: '100',
            budgetPrice:'0'
          },
          {
            id: 1,
            type: {value:'1',label:'类型1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            stockNum: '18',
            buyNum:{ modelValue: "100",},
            price: '100',
            budgetPrice:'0'
          },
          {
            id: 1,
            type: {value:'1',label:'类型1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            stockNum: '18',
            buyNum:{ modelValue: "100",},
            price: '100',
            budgetPrice:'0'
          },
          {
            id: 1,
            type: {value:'1',label:'类型1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            stockNum: '18',
            buyNum:{ modelValue: "100",},
            price: '100',
            budgetPrice:'0'
          },
          {
            id: 1,
            type: {value:'1',label:'类型1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            stockNum: '18',
            buyNum:{ modelValue: "100",},
            price: '100',
            budgetPrice:'0'
          },
          {
            id: 1,
            type: {value:'1',label:'类型1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            stockNum: '18',
            buyNum:{ modelValue: "100",},
            price: '100',
            budgetPrice:'0'
          },
          {
            id: 1,
            type: {value:'1',label:'类型1'},
            brand: {value:'1',label:'品牌1'},
            model:  {value: '1', label: '型号1'},
            classes:  {value: '1', label: '类别1'},
            stockNum: '18',
            buyNum:{ modelValue: "100",},
            price: '100',
            budgetPrice:'0'
          }

        ],
        totalMoney:0,

        // 批量生成
        plscVisible:false,
        plscForm:{},
        initPlscF:{
          planName:{modelValue:''}
        },



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

      var params = 'id=7';
      this.$httpclient.notokenpost("/he/selectById", params, function (res) {
        console.log("不用token的post",res);

      });

      // this.$httpclient.notokenget("/web/static/mock/menu.json", {}, function (res) {
      //   console.log("不用token的get",res);
      // });


      new Httpclient("/tbjkfxapi").notokenget('/web/static/mock/menu.json', {}, function (res) {
        console.log("不用token的get",res);
      })

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
            type: this.initConditionsF.type,
            brand: this.initConditionsF.brand,
            model: this.initConditionsF.model,
            classes: this.initConditionsF.classes,
            min:this.initConditionsF.min
        };

        // this.conditionsForm = this.$mycommon.getcinditionForm(conditionsForm);
        this.conditionsForm = this.$mycommon.getFormVal(conditionsForm);
        console.log("条件查询表单：", this.conditionsForm);

        // 提交完成 重置表单
        // this.viewOnResetEvent();
      },
      // 重置查询表单
      viewOnResetEvent() {
        this.initConditionsF.type.modelValue = '';
        this.initConditionsF.brand.modelValue = '';
        this.initConditionsF.model.modelValue = '';
        this.initConditionsF.classes.modelValue = '';
        this.initConditionsF.min.modelValue = '';
      },

      // todo:
      //批量生成采购计划
      batchGeneration() {
        //获取 勾选的行id
        var rowIds = this.multipleSel.map(item => item.id).toString();

        this.plscVisible = true;

        this.initPlscF.planName.modelValue = '['+this.$mycommon.format(new Date(), "yyyy-MM-dd HH:mm")+']采购计划';

        // 计算行的预计金额
        this.zncgjhTableData.forEach((item) => {

          item.budgetPrice = parseInt(item.buyNum.modelValue)*parseInt(item.price)
        });
        // 计算总金额
        this.totalMoney = 0;
        this.zncgjhTableData.forEach((item) => {

          this.totalMoney = this.totalMoney+item.budgetPrice;
        });



        //清空多选内容
        this.toggleSelection();

      },

      //todo:
      //智能生成采购计划
      intelligentizeGeneration() {

        this.zncgjhVisible = true;

        this.initZncgjhF.planName.modelValue = '['+this.$mycommon.format(new Date(), "yyyy-MM-dd HH:mm:ss")+']采购计划';

        // 计算行的预计金额
        this.zncgjhTableData.forEach((item) => {

          item.budgetPrice = parseInt(item.buyNum.modelValue)*parseInt(item.price)
        });

        // 计算总金额
        this.totalMoney = 0;
        this.zncgjhTableData.forEach((item) => {

          this.totalMoney = this.totalMoney+item.budgetPrice;
        });

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
        // console.log('修改的行数据',this.amendForm);

        this.initAmendF.type.modelValue = data.type.value;
        this.initAmendF.brand.modelValue = data.brand.value;
        this.initAmendF.model.modelValue = data.model.value;
        this.initAmendF.classes.modelValue = data.classes.value;
        this.initAmendF.num.modelValue = data.num;
        this.initAmendF.price.modelValue = data.price;

      },
      // 确认修改
      viewOnAffirmEvent() {
        this.amendFormVisible = false;//关闭弹窗

        var amendForm = {
          type: this.initAmendF.type,
          brand: this.initAmendF.brand,
          model: this.initAmendF.model,
          classes: this.initAmendF.classes,
          num:this.initAmendF.num,
          price:this.initAmendF.price
        };

        this.amendForm = this.$mycommon.getFormVal(amendForm);
        console.log("修改的表单：",this.amendForm);


        this.$message({
          message: '修改成功！',
          type: 'success'
        });
      },

      // 取消
      // viewOnCancelEvent() {
      //   // var that = this;
      //   this.amendFormVisible = false;
      // },
      //点击遮罩层时 提示是否关闭窗口
      handleCloseDialog(done) {
        var that = this;
        that.$confirm('确认关闭？', '提示')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },

      //采购
      purchase(data) {

        // todo:采购操作

        this.$message({
          message: '采购'+data.id+'成功！',
          type: 'success'
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
