<template>
  <div class="userCustomDialogPage5">
    <div class="userCustomDialogPageContainer">
        <div class="uCDPageContainer_buttons">
            <el-button @click="viewOnShowEvent">查 看</el-button>
        </div>
        <div class="userCustomMobanPageContainer-msgDialog">
            <el-dialog title="弹窗模板5" :visible.sync="userCustomOfDialog" width="80%" :before-close="handleCloseDialog">
                <div class="userCustomMobanPageContainer-msgDialog__btns">
                    <el-button @click="viewOnAffirmEvent">确 认</el-button>
                    <el-button @click="viewOnCancelEvent">取 消</el-button>
                </div>
                <div class="userCustomMobanPageContainer-msgDialog__bodyTitle">弹窗模板5</div>
                <div class="userCustomMobanPageContainer-msgDialog__body">
                    <div class="userCustomMobanPageContainer-msgDialog__bodyContent">
                        <div class="userCustomMobanPageContainer-tabs">
                            <el-tabs v-model="activeName" type="card" @tab-click="tabsHandleClick">
                                <el-tab-pane label="信息列表" name="first">
                                    <div class="userCustomMobanPageContainer-conditions">
                                        <el-form label-width="35%" :inline="true" :model="conditionsForm" class="demo-form-inline userCustomMobanPageContainer-conditions__form">
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
                                            </el-row>
                                        </el-form>
                                    </div>
                                    <div class="userCustomMobanPageContainer-tables">
                                        <el-table :data="tableData" border style="width: 100%">
                                            <el-table-column prop="date" label="日期" align="center" width=""></el-table-column>
                                            <el-table-column prop="name" label="姓名" align="center" width=""></el-table-column>
                                            <el-table-column prop="address" label="地址" align="center" width=""></el-table-column>
                                            <el-table-column label="状态" align="center" width="">
                                                <template slot-scope="scope">
                                                    <span class="statusNormalColor" v-if="scope.row.status==1">正常</span>
                                                    <span class="statusAbnormalColor" v-if="scope.row.status==0">异常</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="操作" align="center">
                                                <template slot-scope="scope">
                                                    <el-button @click="viewOnShowEvent(scope.row)" type="text" size="small">查看</el-button>
                                                    <el-button @click="viewOnEditEvent(scope.row)" type="text" size="small">编辑</el-button>
                                                    <el-button @click="viewOnDelectEvent(scope.row)" class="operationAbnormalColor" type="text" size="small">删除</el-button>
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
                                </el-tab-pane>
                                <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                                <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                                <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                            </el-tabs>
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
// import HyhtMupSelect from '../../components/allConditionmodel/HyhtMupSelect'
// import HyhtCheckSel from '../../components/allConditionmodel/HyhtCheckSel'
// import HyhtCascader from '../../components/allConditionmodel/HyhtCascader'
// import HyhtDate from '../../components/allConditionmodel/HyhtDate'
// import HyhtDateTime from '../../components/allConditionmodel/HyhtDateTime'
// import HyhtDateWeek from '../../components/allConditionmodel/HyhtDateWeek'
// import HyhtDateMonth from '../../components/allConditionmodel/HyhtDateMonth'
// import HyhtDataYear from '../../components/allConditionmodel/HyhtDataYear'
// import HyhtDaterange from '../../components/allConditionmodel/HyhtDaterange'
// import HyhtRadio from '../../components/allConditionmodel/HyhtRadio'
export default {
    name: "userCustomDialogPage5",
    components:{
        HyhtInput,HyhtSelect
    },
    data() {
        return {
            userCustomOfDialog:false,
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
            currentPage: 1,
            total:20,
            pageSize:10, 
            pageNo:1,
            activeName:"first",
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                status:1
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                status:1
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                status:0
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                status:0
            }],
            
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
        viewOnShowEvent(){
            var that = this;
            that.userCustomOfDialog = true;

        },
        // 确认
        viewOnAffirmEvent(){
            var that = this;
            that.userCustomOfDialog = false;
            var conditionsForm = {
                input:that.input, //输入框
                intSelect:that.intSelect, //基础下拉框
            }
            that.conditionsForm = that.$mycommon.getcinditionForm(conditionsForm)
            console.log("that.conditionsForm",that.conditionsForm)
        },
        // 取消
        viewOnCancelEvent(){
            var that = this;
            that.userCustomOfDialog = false;
        },
        handleSizeChange(val) {
            var that = this;
            that.pageSize = val;
        },
        handleCurrentChange(val) {
            var that = this;
            that.pageNo = val;
        },
        tabsHandleClick(tab, event) {
            console.log(tab, event);
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
        handleCloseDialog(done){
            var that = this;
            that.$confirm('确认关闭？','提示')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
    }
};
</script>
