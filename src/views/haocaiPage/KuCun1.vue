<template>
  <section class="hc_page table_page">
    <!--工具条-->
    <el-row class="button_bar">
      <el-button size="mini" @click="searchMaterials()" >查询</el-button>
      <el-button size="mini">重置</el-button>
    </el-row>
    <el-row class="top_bar">
      <el-form v-model="searchForm" :inline="true">
        <el-form-item label="类型：">
          <!--default-first-option-->
          <el-select
            size="mini"
            v-model="searchForm.type"
            placeholder="请选择">
            <el-option
              v-for="opt in selectOpt.type" :key="opt.value" :label="opt.label" :value="opt.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌：">
          <el-select size="mini" v-model="searchForm.brand" placeholder="请选择">
            <el-option
              v-for="opt in selectOpt.brand" :key="opt.value" :label="opt.label" :value="opt.value"
            ></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="型号：">
          <el-select size="mini" v-model="searchForm.model" placeholder="请选择">
            <el-option
              v-for="opt in selectOpt.model" :key="opt.value" :label="opt.label" :value="opt.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别：">
          <el-select size="mini" v-model="searchForm.classes" placeholder="请选择">
            <el-option
              v-for="opt in selectOpt.classes" :key="opt.value" :label="opt.label" :value="opt.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量小于：">
          <el-input size="mini" v-model="searchForm.min"></el-input>
        </el-form-item>
        <el-form-item>

        </el-form-item>

      </el-form>
    </el-row>


    <el-row class="button_bar">
      <!--type="primary"-->
      <el-button :disabled="multipleSelection.length === 0" @click="batchGeneration()" size="mini" >批量生成采购计划</el-button>
      <el-button :disabled="multipleSelection.length === 0" @click="intelligentizeGeneration()" size="mini">智能生成采购计划</el-button>
    </el-row>
    <!--列表-->
    <!--@select-all="selectAll()"-->
    <el-table
      v-loading="loading"
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
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">

          <el-button @click="amendPop(scope.row)"
                     size="mini" type="text">修改
          </el-button>
          <el-button @click="purchase(scope.row)"
                     size="mini"
                     type="text">采购
          </el-button>

        </template>
      </el-table-column>

    </el-table>


    <!--工具条-->
    <el-row class="pagin_bar">

      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <el-pagination
        background

        :current-page="1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        style="float: right"
      >
      </el-pagination>
    </el-row>


    <!--修改弹窗-->
    <el-dialog title="修改" :visible.sync="amendFormVisible">
      <el-form :model="amendForm" label-width="80px">
        <el-form-item label="类型">
          <el-input v-model="amendForm.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="amendForm.brand" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <el-input v-model="amendForm.model" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-input v-model="amendForm.classes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="amendForm.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="预算单价">
          <el-input v-model="amendForm.price" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="amendFormVisible = false">取 消</el-button>
        <!--<el-button size="medium" type="primary" @click="amendFormVisible = false">确 定</el-button>-->
        <el-button size="medium" type="primary" @click="amendData()">确 定</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>


  export default {
    data() {
      return {
        // searchForm: {
        //     type: '打印机1'
        // },
        // 下拉框 选项
        selectOpt:{
          type:[
            {
              value:'打印机1',
              label:'打印机1'
            },
            {
              value:'打印机2',
              label:'打印机3'
            },
            {
              value:'打印机3',
              label:'打印机3'
            }
          ],
          brand:[
            {
              value:'品牌1',
              label:'品牌1'
            },
            {
              value:'品牌2',
              label:'品牌2'
            },
            {
              value:'品牌3',
              label:'品牌3'
            }
          ],
          model:[
            {
              value:'型号1',
              label:'型号1'
            },
            {
              value:'型号2',
              label:'型号2'
            },
            {
              value:'型号3',
              label:'型号3'
            }
          ],
          classes:[
            {
              value:'类别1',
              label:'类别1'
            },
            {
              value:'类别2',
              label:'类别2'
            },
            {
              value:'类别3',
              label:'类别3'
            }
          ]
        },
        searchForm: {},
        // totalPage:'5',
        // page:'1',
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
        loading: false,
        currentPage:'1',

        multipleSelection: [],
        amendForm: {},
        amendFormVisible: false

      }
    },
    methods: {
      // 查询
      searchMaterials() {
        this.$message({
          message: '多条件查询……',
          type: 'success'
        });
        console.log("查询参数：", this.searchForm);
      },
      // 弹出修改弹窗
      amendPop(data) {
        this.amendFormVisible = true;
        this.amendForm = data
      },
      // 确认修改
      amendData() {
        this.amendFormVisible = false;//关闭弹窗
        this.$message({
          message: '修改成功！',
          type: 'success'
        });
      },
      //全选
      // selectAll(val) {
      //     this.$alert("多选");
      //
      // },

      selectionChange(row) {
        this.multipleSelection = row;
        console.log(this.multipleSelection.length)
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



      // todo:不需要先确认
      //批量生成采购计划
      batchGeneration(){
        //获取 勾选的行id
        var rowIds = this.multipleSelection.map(item => item.id).toString();
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
          console.log("清空已选？",this.multipleSelection)
        }).catch(() => {

        });


      },

      //todo:不需要先确认
      //智能生成采购计划
      intelligentizeGeneration(){
        //获取 勾选的行id
        var rowIds = this.multipleSelection.map(item => item.id).toString();
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
          console.log("清空已选？",this.multipleSelection)
        }).catch(() => {

        });


      },

      //采购
      purchase(data) {
        this.$message({
          message: '采购成功！',
          type: 'success'
        });
      },

      // 切换列表页
      handleCurrentChange(val) {
        this.page = val

      }

    },
    mounted() {

    }
  }

</script>

<style scoped>


</style>
