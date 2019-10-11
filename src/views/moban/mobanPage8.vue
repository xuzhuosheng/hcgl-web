<template>
  <div class="userCustomMobanPage8">
    <div class="userCustomMobanPageContainer">
        <div class="userCustomMobanPageContainer-partLeft">
            <div id="ztreeContainer"></div>
        </div>
        <div class="userCustomMobanPageContainer-partRight">
            <div class="userCustomMobanPageContainer-buttons">
                <el-button @click="viewOnQueryEvent">查 询</el-button>
                <el-button @click="viewOnResetEvent">重 置</el-button>
            </div>
            <div class="userCustomMobanPageContainer-contents">
                <div class="userCustomMobanPageContainer-conditions">
                    <div class="uCMPageContainer_conditions__title">纳税人信息</div>
                    <el-form label-width="30%" :inline="true" :model="conditionsForm" class="demo-form-inline userCustomMobanPageContainer-conditions__form">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="纳税人识别号:">
                                    <HyhtInput :inputValue='nsrsbh'></HyhtInput>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="纳税人名称:">
                                    <HyhtInput :inputValue='nsrmc'></HyhtInput>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="纳税人编码:">
                                    <HyhtInput :inputValue='nsrbm'></HyhtInput>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="纳税人信息:">
                                    <HyhtInput :inputValue='nsrxx'></HyhtInput>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item class="form_HyhtTextArea" label-width="15%" label="描述:">
                                    <HyhtTextArea :modelHyhtTextAreaVal='nsrms'></HyhtTextArea>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div class="userCustomMobanPageContainer-tables">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="date" label="功能编码" align="center" width=""></el-table-column>
                        <el-table-column prop="name" label="功能类型" align="center" width=""></el-table-column>
                        <el-table-column prop="address" label="反馈类型" align="center" width=""></el-table-column>
                        <el-table-column label="状态" align="center" width="">
                            <template slot-scope="scope">
                                <span class="statusNormalColor" v-if="scope.row.status==1">正常</span>
                                <span class="statusAbnormalColor" v-if="scope.row.status==0">异常</span>
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
        </div>
    </div>
  </div>
</template>
<script>
import HyhtInput from '../../components/allConditionmodel/HyhtInput'
import HyhtTextArea from '../../components/allConditionmodel/HyhtTextArea'
// import HyhtSelect from '../../components/allConditionmodel/HyhtSelect'
// import HyhtMupSelect from '../../components/allConditionmodel/HyhtMupSelect'
// import HyhtCheckSel from '../../components/allConditionmodel/HyhtCheckSel'
// import HyhtCascader from '../../components/allConditionmodel/HyhtCascader'
// import HyhtDate from '../../components/allConditionmodel/HyhtDate'
// import HyhtDateTime from '../../components/allConditionmodel/HyhtDateTime'
// import HyhtDateWeek from '../../components/allConditionmodel/HyhtDateWeek'
// import HyhtDateMonth from '../../components/allConditionmodel/HyhtDateMonth'
// import HyhtDataYear from '../../components/allConditionmodel/HyhtDataYear'
// import HyhtDaterange from '../../components/allConditionmodel/HyhtDaterange'

// ztree组件
import "../../../static/ztree/ztreehelper.js"
import "../../../static/ztree/js/jquery.ztree.all.js"
import "../../../static/ztree/css/zTreeStyle.css"

export default {
  name: "userCustomMobanPage8",
  components:{
    //   HyhtSelect,HyhtMupSelect,HyhtCheckSel,HyhtCascader,
    //   HyhtDate,HyhtDateTime,HyhtDateWeek,HyhtDateMonth,HyhtDataYear,
    //   HyhtDaterange,
    HyhtInput,
    HyhtTextArea
  },
  data() {
    return {
        conditionsForm:{},
        //纳税人识别号
        nsrsbh:{modelValue:""},
        //纳税人名称
        nsrmc:{modelValue:""},
        //纳税人编码
        nsrbm:{modelValue:""},
        //纳税人信息
        nsrxx:{modelValue:""},
        //纳税人描述
        nsrms:{modelValue:""},
        tableData: [{
            date: '244400022223',
            name: '反馈类型',
            address: '反馈类型',
            status:1
            }, {
            date: '244400022223',
            name: '反馈类型',
            address: '反馈类型',
            status:1
            },{
            date: '244400022223',
            name: '反馈类型',
            address: '反馈类型',
            status:1
            },{
            date: '244400022223',
            name: '反馈类型',
            address: '反馈类型',
            status:1
            }
        ],
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
    $(".userCustomMobanPageContainer-partLeft").css("height",$("#app").height()-26).css("overflow","auto");
    $("#ztreeContainer").css("height",$("#app").height()-26).css("overflow","auto");
    $(".userCustomMobanPageContainer-partRight").css("height",$("#app").height()-26).css("overflow","auto");

    that.$httpclient.notokenget('../../../static/mock/ztreeList.json', {}, function (res) { 
        var treeHelper3 = new $.fn.getTreeHelper()
        treeHelper3.isExpandAll = true;  //是否全部展开子节点
        treeHelper3.setLimitZtreeHeight($("#ztreeContainer").height(),"tree");  //限制树的高度,当前类型：tree-树，menuTree-菜单树
        treeHelper3.createSimpleMenu(
          'ztreeContainer',//对应div的id
           res.path0,//数据
          //点击事件回调函数
          function (event, treeId, treeNode) {
            that.viewOnClickObjectEvent(treeNode,treeId,event)
          }
        )
      })
  },
  methods: {
    // 查询
    viewOnQueryEvent(){
        var that = this;
        var conditionsForm = {
            nsrsbh:that.nsrsbh, //纳税人识别号
            nsrmc:that.nsrmc, //纳税人名称
            nsrbm:that.nsrbm, //纳税人编码
            nsrxx:that.nsrxx, //纳税人信息
            nsrms:that.nsrms, //纳税人描述
        }
        that.conditionsForm = that.$mycommon.getcinditionForm(conditionsForm)
        console.log("that.conditionsForm",that.conditionsForm)
    },
    // 重置
    viewOnResetEvent(){
        var that = this;
        that.nsrsbh.modelValue = ""; //纳税人识别号
        that.nsrmc.modelValue = ""; //纳税人名称
        that.nsrbm.modelValue  = ""; //纳税人编码
        that.nsrxx.modelValue  = ""; //纳税人信息
        that.nsrms.modelValue  = ""; //纳税人描述
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
    // 单击树节点
    viewOnClickObjectEvent(treeNode,treeId,event){
        var that = this;
        // 模拟数据
        var obj = {
            "nsrshb":"276445451383238327544",
            "nsrmc":"程亮",
            "nsrbm":"023",
            "nsrxx":"广东省税务局信息科员",
            "nsrms":"在职人员"
        }
        that.nsrsbh.modelValue = obj.nsrshb;
        that.nsrmc.modelValue = obj.nsrmc;
        that.nsrbm.modelValue = obj.nsrbm;
        that.nsrxx.modelValue = obj.nsrxx;
        that.nsrms.modelValue = obj.nsrms;
        console.log(treeNode,treeId,event)

    },

  }
};
</script>
