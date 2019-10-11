<template>
  <div class="userCustomDialogPage4">
    <div class="userCustomDialogPageContainer">
        <div class="uCDPageContainer_buttons">
            <el-button @click="viewOnShowEvent">查 看</el-button>
        </div>
        <div class="userCustomMobanPageContainer-msgDialog">
            <el-dialog title="弹窗模板4" :visible.sync="userCustomOfDialog" width="70%">
                <div class="userCustomMobanPageContainer-msgDialog__btns">
                    <el-button @click="viewOnAffirmEvent">确 认</el-button>
                    <el-button @click="viewOnAffirmEvent">取 消</el-button>
                </div>
                <div class="userCustomMobanPageContainer-msgDialog__body">
                    <div class="userCustomMobanPageContainer-msgDialog__bodyTitle">弹窗模板4</div>
                    <div class="userCustomMobanPageContainer-msgDialog__bodyContent">
                        <div class="userCustomMobanPageContainer-conditions">
                            <el-row>
                                <el-col :span="conditionsForm.input.length>16?24:12">
                                    <div :class="conditionsForm.input.length>16?'conditionsLabelLonger':'conditionsLabel'">输入框:</div>
                                    <div :class="conditionsForm.input.length>16?'conditionsContentLonger':'conditionsContent'">{{conditionsForm.input}}</div>
                                </el-col>
                                <el-col :span="conditionsForm.intSelect.length>16?24:12">
                                    <div :class="conditionsForm.intSelect.length>16?'conditionsLabelLonger':'conditionsLabel'">基础下拉框:</div>
                                    <div :class="conditionsForm.intSelect.length>16?'conditionsContentLonger':'conditionsContent'">{{conditionsForm.intSelect}}</div>
                                </el-col>
                                <el-col :span="conditionsForm.input.length>16?24:12">
                                    <div :class="conditionsForm.input.length>16?'conditionsLabelLonger':'conditionsLabel'">输入框:</div>
                                    <div :class="conditionsForm.input.length>16?'conditionsContentLonger':'conditionsContent'">{{conditionsForm.input}}</div>
                                </el-col>
                                <el-col :span="conditionsForm.intSelect.length>16?24:12">
                                    <div :class="conditionsForm.intSelect.length>16?'conditionsLabelLonger':'conditionsLabel'">基础下拉框:</div>
                                    <div :class="conditionsForm.intSelect.length>16?'conditionsContentLonger':'conditionsContent'">{{conditionsForm.intSelect}}</div>
                                </el-col>
                                <el-col :span="conditionsForm.datetimePick.length>16?24:12">
                                    <div :class="conditionsForm.datetimePick.length>16?'conditionsLabelLonger':'conditionsLabel'">日期时间选择器:</div>
                                    <div :class="conditionsForm.datetimePick.length>16?'conditionsContentLonger':'conditionsContent'">{{conditionsForm.datetimePick}}</div>
                                </el-col>
                                <el-col :span="conditionsForm.datetimePick.length>16?24:12">
                                    <div :class="conditionsForm.datetimePick.length>16?'conditionsLabelLonger':'conditionsLabel'">日期时间选择器:</div>
                                    <div :class="conditionsForm.datetimePick.length>16?'conditionsContentLonger':'conditionsContent'">{{conditionsForm.datetimePick}}</div>
                                </el-col>
                                <el-col :span="conditionsForm.content.length>16?24:12">
                                    <div :class="conditionsForm.content.length>16?'conditionsLabelLonger':'conditionsLabel'">内容:</div>
                                    <div :class="conditionsForm.content.length>16?'conditionsContentLonger':'conditionsContent'">{{conditionsForm.content}}</div>
                                </el-col>
                                <el-col :span="conditionsForm.content.length>16?24:12">
                                    <div :class="conditionsForm.content.length>16?'conditionsLabelLonger':'conditionsLabel'">内容:</div>
                                    <div :class="conditionsForm.content.length>16?'conditionsContentLonger':'conditionsContent'">{{conditionsForm.content}}</div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    name: "userCustomDialogPage4",
    data() {
        return {
            userCustomOfDialog:false,
            conditionsForm:{
                input:"this is input",
                intSelect:"shanghai",
                content:"纳税人【广州***公司】存在虚开发纳税人【广州***公司】存在虚开发票的问题，请核查纳税人【广州***公司】存在虚开发票的问题，请核查票的问题，请核查",
                datetimePick:"2018.01.01 00:00:00",
            },
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
        },
        // 取消
        viewOnAffirmEvent(){
            var that = this;
            that.userCustomOfDialog = false;
        },
        cascaderHandleChange(val){
            var that = this;

        },
       

    }
};
</script>
