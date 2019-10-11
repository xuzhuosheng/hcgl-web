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
                <el-form-item label="类型名称:">
                  <HyhtInput :inputValue='initConditionsF.type'></HyhtInput>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>


        <div class="userCustomMobanPageContainer-buttons">
          <el-button :disabled="multipleSel.length === 0" @click="batchDel()">批量删除</el-button>
          <el-button @click="addPop()">新增</el-button>

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
                             label="类型名称">
            </el-table-column>
            <el-table-column align="center"
                             prop="time"
                             label="创建时间"
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
        <el-dialog title="修改" :visible.sync="amendFormVisible" width="40%" :before-close="handleCloseDialog">
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
                    <el-col :span="24">
                      <el-form-item label="类型:">
                        <HyhtInput :inputValue='initAmendF.type'></HyhtInput>
                      </el-form-item>
                    </el-col>

                    <!--<el-col :span="24">-->
                    <!--<el-form-item label="创建时间:">-->
                    <!--<HyhtDate :modelHyhtDateVal='initAmendF.time'></HyhtDate>-->
                    <!--</el-form-item>-->

                    <!--</el-col>-->


                  </el-row>
                </el-form>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>

      <!--新增弹窗-->

      <div class="userCustomMobanPageContainer-msgDialog">
        <el-dialog title="新增" :visible.sync="addFormVisible" width="40%" :before-close="handleCloseDialog">
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
                    <el-col :span="24">
                      <el-form-item label="类型:">
                        <HyhtInput :inputValue='initAddForm.type'></HyhtInput>
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
        initConditionsF: {
          type: {modelValue: ''}
        },
        tableData: [
          {
            id: '1',
            type: {value: '1', label: '打印机1'},
            time: '2019-08-28 10:00'

          }, {
            id: '2',
            type: {value: '2', label: '打印机2'},
            time: '2019-08-28 10:00'
          }, {
            id: '3',
            type: {value: '3', label: '打印机3'},
            time: '2019-08-28 10:00'
          }, {
            id: '4',
            type: {value: '1', label: '打印机1'},
            time: '2019-08-28 10:00'
          }, {
            id: '5',
            type: {value: '1', label: '打印机1'},
            time: '2019-08-28 10:00'
          }, {
            id: '6',
            type: {value: '1', label: '打印机1'},
            time: '2019-08-28 10:00'
          }, {
            id: '7',
            type: {value: '1', label: '打印机1'},
            time: '2019-08-28 10:00'
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
            // selectOptions: [
            //   {value: '1', label: '打印机1'},
            //   {value: '2', label: '打印机2'},
            //   {value: '3', label: '打印机3'}
            // ]
          },

          time: {modelValue: ''}

        },

        addForm: {},
        addFormVisible: false,
        initAddForm: {
          type: {
            modelValue: "",
          },

          time: {modelValue: ""}

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
      var params = 'id=7';
      this.$httpclient.notokenpost("/he/selectById", params, function (res) {
        console.log("不用token的post",res);

      })
    },

    methods: {
      // 查询
      viewOnQueryEvent() {
        var conditionsForm = {
          type: this.initConditionsF.type
        };

        this.conditionsForm = this.$mycommon.getFormVal(conditionsForm);
        console.log("条件查询表单：", this.conditionsForm);

        // 提交完成 重置表单
        // this.viewOnResetEvent();
      },
      // 重置
      viewOnResetEvent() {
        this.initConditionsF.type.modelValue = '';
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
      delRow(data) {
        // console.log(data.id);
        this.$confirm('确认删除' + data.id + '吗', '提示', {type: 'warning'}).then(() => {
          // todo:删除操作

          this.$message({message: '删除' + data.id + '成功！', type: 'success'});

        });
      },

      // 新增
      addPop() {
        this.addFormVisible = true;

      },
      confirmAdd() {

        // todo:新增操作

        // 获取当前时间
        this.initAddForm.time.modelValue = this.getNewFormatDate();

        var addForm = {
          type: this.initAddForm.type,
          time: this.initAddForm.time
        };

        console.log("新增表单：", this.addForm);
        this.addForm = this.$mycommon.getFormVal(addForm);
        console.log("新增表单：", this.addForm);


        this.$message({message: '新增成功！', type: 'success'});

        this.addFormVisible = false;


        // 清空新增表单
        this.initAddForm.type.modelValue = ''
        this.initAddForm.time.modelValue = ''
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


      // 弹出修改弹窗
      amendPop(data) {
        this.amendFormVisible = true;
        console.log('修改的行数据', data, this.amendForm);
        this.initAmendF.type.modelValue = data.type.label;
        // this.initAmendF.time.modelValue = data.time;


      },
      // 确认修改
      viewOnAffirmEvent() {
        this.amendFormVisible = false;//关闭弹窗

        var amendForm = {
          type: this.initAmendF.type,
          time: this.initAmendF.time
        };

        this.amendForm = this.$mycommon.getFormVal(amendForm);
        console.log("修改的表单：", this.amendForm);


        this.$message({
          message: '修改成功！',
          type: 'success'
        });


      },

      // 取消
      viewOnCancelEvent() {
        // var that = this;
        this.userCustomOfDialog = false;
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


      handleSizeChange(val) {
        var that = this;
        that.pageSize = val;
      },
      handleCurrentChange(val) {
        var that = this;
        that.pageNo = val;
      },


      // 获取当前时间
      getNewFormatDate() {
        var date = new Date(),
          year = date.getFullYear(),
          month = date.getMonth() + 1,
          strDate = date.getDate(),
          hour = date.getHours(),
          minute = date.getMinutes(),
          second = date.getSeconds(),
          seperator1 = '-',
          seperator2 = ':';
        if (month >= 1 && month <= 9) {
          month = '0' + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate;
        }
        if (hour >= 0 && hour <= 9){
          hour = '0' + hour;
        }
        if(second >= 0 && second <= 9){
          second = '0' + second
        }
        var currentDate = year + seperator1 + month + seperator1 + strDate + ' ' + hour + seperator2 + minute;
        return currentDate;
      }


    }
  };
</script>
<style scoped>

</style>
