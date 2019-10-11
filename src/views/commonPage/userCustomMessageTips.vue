<template>
    <div class="userCustomMessageTipsPage">
        <div class="userCustomMessageTipsPage-tabs">
        <el-tabs tab-position="top" style="height: 200px;">
            <el-tab-pane label="msg消息提示">
                <div class="userCustomMessageTipsPage-tabs__msg">
                    <div>
                        <span>1.基础类型：</span>
                        <el-button :plain="true" @click="openMsgVnEevnt">基础类型</el-button>
                        <el-button :plain="true" @click="openMsgEevnt">接受参数</el-button>
                    </div>
                    <div>
                        <span>2.状态展示操作反馈：</span>
                        <el-button :plain="true" @click="openMsgInfoEevnt">消息</el-button>
                        <el-button :plain="true" @click="openMsgSuccessEevnt">成功</el-button>
                        <el-button :plain="true" @click="openMsgWarningEevnt">警告</el-button>
                        <el-button :plain="true" @click="openMsgErrorEevnt">错误</el-button>
                    </div>
                    <div>
                        <span>3.状态展示操作反馈，可手动关闭：</span>
                        <el-button :plain="true" @click="openMsgInfoCanCloseEevnt">消息</el-button>
                        <el-button :plain="true" @click="openMsgSuccessCanCloseEevnt">成功</el-button>
                        <el-button :plain="true" @click="openMsgWarningCanCloseEevnt">警告</el-button>
                        <el-button :plain="true" @click="openMsgErrorCanCloseEevnt">错误</el-button>
                    </div>
                    <div>
                        <span>4.文字居中：</span>
                        <el-button :plain="true" @click="openMsgTextCenterEvent">文字居中</el-button>
                    </div>
                    <div>
                        <span>5.使用HTML片段，自定义格式(不建议使用，不安全)：</span>
                        <el-button :plain="true" @click="openMsgUseHtmlCodeEvent">HTML片段</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="msgBox弹框">
                <div class="userCustomMessageTipsPage-tabs__msgBox">
                    <div>
                        <span>1.基础类型消息通知：</span>
                        <el-button  @click="openMsgBoxEvent">确认信息</el-button>
                    </div>
                    <div>
                        <span>2.用户询问确认消息：</span>
                        <el-button  @click="openUserAskMsgBoxEvent">询问 / 确认信息</el-button>
                    </div>
                    <div>
                        <span>3.用户输入信息确认：</span>
                        <el-button  @click="openUserInputMsgBoxEvent">输入框 / 确认信息</el-button>
                    </div>
                    <div>
                        <span>4.用户自定义内容确认：</span>
                        <el-button  @click="openUserCustomMsgBoxEvent">自定义确认信息</el-button>
                    </div>
                    <div>
                        <span>5.区分取消与关闭：</span>
                        <el-button  @click="openCancelCloseMsgBoxEvent">取消 / 关闭</el-button>
                    </div>
                    <div>
                        <span>6.内容居中布局：</span>
                        <el-button  @click="openCenterTextMsgBoxEvent">内容居中布局</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="notification通知">
                <div class="userCustomMessageTipsPage-tabs__notification">
                    <div>
                        <span>1.基础用法：</span>
                        <el-button plain @click="openNotificationCanCloseEvent">可自动关闭</el-button>
                        <el-button plain @click="openNotificationDonntCanCloseEvent">不会自动关闭</el-button>
                    </div>
                    <div>
                        <span>2.状态显示（带icon）：</span>
                        <el-button :plain="true" @click="openNotificationInfoEevnt">消息</el-button>
                        <el-button :plain="true" @click="openNotificationSuccessEevnt">成功</el-button>
                        <el-button :plain="true" @click="openNotificationWarningEevnt">警告</el-button>
                        <el-button :plain="true" @click="openNotificationErrorEevnt">错误</el-button>
                    </div>
                    <div>
                        <span>3.显示位置：</span>
                        <el-button :plain="true" @click="openNotificationOnLeftTopEevnt">左上角</el-button>
                        <el-button :plain="true" @click="openNotificationOnLeftBottomEevnt">左下角</el-button>
                        <el-button :plain="true" @click="openNotificationOnRightTopEevnt">右上角</el-button>
                        <el-button :plain="true" @click="openNotificationOnRightBottomEevnt">右下角</el-button>
                    </div>
                    <div>
                        <span>4.带偏移信息：</span>
                        <el-button :plain="true" @click="openNotificationOffsetEevnt">带偏移</el-button>
                    </div>
                    <div>
                        <span>5.HTML内容（不建议使用，不安全）：</span>
                        <el-button :plain="true" @click="openNotificationHtmlEevnt">HTML内容</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="tooltip文字提示">
                <div class="userCustomMessageTipsPage-tabs__tooltip">
                    <span>1.基础用法：</span>
                    <div class="userCustomMessageTipsPage-tabs__tooltipBox">
                        <div class="top">
                            <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                                <el-button>上左</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                                <el-button>上边</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
                                <el-button>上右</el-button>
                            </el-tooltip>
                        </div>
                        <div class="left">
                            <el-tooltip class="item" effect="dark" content="Left Top 提示文字" placement="left-start">
                                <el-button>左上</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Left Center 提示文字" placement="left">
                                <el-button>左边</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Left Bottom 提示文字" placement="left-end">
                                <el-button>左下</el-button>
                            </el-tooltip>
                        </div>
                        <div class="right">
                            <el-tooltip class="item" effect="dark" content="Right Top 提示文字" placement="right-start">
                                <el-button>右上</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                                <el-button>右边</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Right Bottom 提示文字" placement="right-end">
                                <el-button>右下</el-button>
                            </el-tooltip>
                        </div>
                        <div class="bottom">
                            <el-tooltip class="item" effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
                                <el-button>下左</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
                                <el-button>下边</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Bottom Right 提示文字" placement="bottom-end">
                                <el-button>下右</el-button>
                            </el-tooltip>
                        </div>
                    </div>
                    <span>2.主题：</span>
                    <div class="userCustomMessageTipsPage-tabs__tooltipBox">
                        <el-tooltip content="Top center" placement="top">
                            <el-button>Dark</el-button>
                        </el-tooltip>
                        <el-tooltip content="Bottom center" placement="bottom" effect="light">
                            <el-button>Light</el-button>
                        </el-tooltip>
                    </div>
                    <span>3.多行Content：</span>
                    <div class="userCustomMessageTipsPage-tabs__tooltipBox">
                        <el-tooltip placement="top">
                            <div slot="content">多行信息<br/>第二行信息</div>
                            <el-button>Top center</el-button>
                        </el-tooltip>
                    </div>
                    <span>4.高级用法：</span>
                    <div class="userCustomMessageTipsPage-tabs__tooltipBox">
                        <el-tooltip :disabled="tooltipDisabled" content="点击关闭 tooltip 功能" placement="bottom" effect="light">
                            <el-button @click="tooltipDisabled = !tooltipDisabled">点击{{tooltipDisabled ? '开启' : '关闭'}} tooltip 功能</el-button>
                        </el-tooltip>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="popover弹出框">
                <div class="userCustomMessageTipsPage-tabs__popover">
                    <div>
                        <span>1.基础用法：</span>
                        <el-popover
                            placement="top-start"
                            title="标题"
                            width="200"
                            trigger="hover"
                            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                            <el-button slot="reference">hover 激活</el-button>
                        </el-popover>
                        <el-popover
                            placement="bottom"
                            title="标题"
                            width="200"
                            trigger="click"
                            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                            <el-button slot="reference">click 激活</el-button>
                        </el-popover>
                        <el-popover
                            ref="popover"
                            placement="right"
                            title="标题"
                            width="200"
                            trigger="focus"
                            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                        </el-popover>
                        <el-button v-popover:popover>focus 激活</el-button>
                        <el-popover
                            placement="bottom"
                            title="标题"
                            width="200"
                            trigger="manual"
                            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                            v-model="popoverVisible">
                            <el-button slot="reference" @click="popoverVisible = !popoverVisible">手动激活</el-button>
                        </el-popover>
                    </div>
                    <div>
                        <span>2.嵌套信息：</span>
                        <el-popover
                            placement="right"
                            width="400"
                            trigger="click">
                            <el-table :data="gridData">
                                <el-table-column width="150" property="date" label="日期"></el-table-column>
                                <el-table-column width="100" property="name" label="姓名"></el-table-column>
                                <el-table-column width="300" property="address" label="地址"></el-table-column>
                            </el-table>
                            <el-button slot="reference">click 激活</el-button>
                        </el-popover>
                    </div>
                    <div>
                        <span>3.嵌套操作：</span>
                        <el-popover
                            placement="top"
                            width="160"
                            v-model="popoverVisible2">
                            <p>这是一段内容这是一段内容确定删除吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="popoverVisible2 = false">取消</el-button>
                                <el-button type="text" size="mini" @click="popoverVisible2 = false">确定</el-button>
                            </div>
                            <el-button slot="reference">删除</el-button>
                        </el-popover>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="msg消息提示、js组件">
                <div class="userCustomMessageTipsPage-tabs__msg">
                    <div>
                        <span>1.状态展示操作反馈：</span>
                        <!-- 提示容器 -->
	                    <div class="hyhtContainerTipsContainer"></div>
                        <el-button :plain="true" @click="openMsgTypeEevnt('info')">消息</el-button>
                        <el-button :plain="true" @click="openMsgTypeEevnt('success')">成功</el-button>
                        <el-button :plain="true" @click="openMsgTypeEevnt('warning')">警告</el-button>
                        <el-button :plain="true" @click="openMsgTypeEevnt('error')">错误</el-button>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        </div>
    </div>
</template>
<script>
import "../../../static/alertTips/alertTips.js"
export default {
    data() {
        return {
            tooltipDisabled:true,
            popoverVisible: false,
            popoverVisible2: false,
            gridData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }]
        }
    },
    mounted() {
        var that = this;
        $(".userCustomMessageTipsPage").css("min-height",$("#app").height()-32);
        $(".userCustomMessageTipsPage-tabs").css("min-height",$("#app").height()-32);
        $(".userCustomMessageTipsPage-tabs .el-tabs__content").css("max-height",$("#app").height()-84).css("overflow","auto")
        
    },
    methods: {
        openMsgTypeEevnt(type){
            var intGetAlertTips = $.fn.getAlertTips(); //实例化提示对象
            intGetAlertTips.init(".hyhtContainerTipsContainer"); //传提示容器
            var text  = "提示文本";
            var type = type;
            if(type=="info"){
                text = "提示文本！";
            }else if(type=="success"){
                text = "恭喜你，成功提示";
            }else if(type=="warning"){
                text = "警告提示";
            }else if(type=="error"){
                text = "错误提示";
            }
            intGetAlertTips.alertTips(type, text); //提示类型和文字
        },
        openMsgEevnt(){
            this.$message('这是一条消息提示');
        },
        openMsgVnEevnt(){
            const h = this.$createElement;
            this.$message({
                message: h('p', null, [
                    h('span', null, '内容可以是 '),
                    h('i', { style: 'color: teal' }, 'VNode')
                ])
            });
        },
        openMsgSuccessEevnt(){
            this.$message('这是一条消息提示');
        },
        openMsgWarningEevnt(){
            this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success'
            });
        },
        openMsgInfoEevnt(){
            this.$message({
                message: '警告哦，这是一条警告消息',
                type: 'warning'
            });
        },
        openMsgErrorEevnt(){
            this.$message.error('错了哦，这是一条错误消息');
        },
        openMsgInfoCanCloseEevnt(){
            this.$message({
                showClose: true,
                message: '这是一条消息提示,可关闭'
            });
        },
        openMsgSuccessCanCloseEevnt(){
            this.$message({
                showClose: true,
                message: '恭喜你，这是一条成功消息,可关闭',
                type: 'success'
            });
        },
        openMsgWarningCanCloseEevnt(){
            this.$message({
                showClose: true,
                message: '警告哦，这是一条警告消息,可关闭',
                type: 'warning'
            });
        },
        openMsgErrorCanCloseEevnt(){
            this.$message({
                showClose: true,
                message: '错了哦，这是一条错误消息,可关闭',
                type: 'error'
            });
        },
        openMsgTextCenterEvent(){
            this.$message({
                message: '居中的文字',
                center: true
            });
        },
        openMsgUseHtmlCodeEvent(){
            this.$message({
                dangerouslyUseHTMLString: true,
                message: '<strong>这是 <i>HTML</i> 片段</strong>'
            });
        },
        openMsgBoxEvent(){
            this.$alert('这是一段内容', '标题名称', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                    });
                }
            });
        },
        openUserAskMsgBoxEvent(){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '系统温馨提示', {
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
            });
        },
        openUserInputMsgBoxEvent(){
            this.$prompt('请输入邮箱', '系统温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                inputErrorMessage: '邮箱格式不正确'
            }).then(({ value }) => {
                this.$message({
                    type: 'success',
                    message: '你的邮箱是: ' + value
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
        openUserCustomMsgBoxEvent(){
            const h = this.$createElement;
            this.$msgbox({
                title: '系统温馨消息',
                message: h('p', null, [
                    h('span', null, '内容可以是 '),
                    h('i', { style: 'color: teal' }, 'VNode')
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        setTimeout(() => {
                                done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 300);
                        }, 3000);
                    } else {
                        done();
                    }
                }
            }).then(action => {
                this.$message({
                    type: 'info',
                    message: 'action: ' + action
                });
            });
        },
        openUserHtmlMsgBoxEvent(){
            this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', '系统温馨提示', {
            dangerouslyUseHTMLString: true
            });
        },
        openCancelCloseMsgBoxEvent(){
            this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '保存',
            cancelButtonText: '放弃修改'
            })
            .then(() => {
                this.$message({
                type: 'info',
                message: '保存修改'
                });
            })
            .catch(action => {
                this.$message({
                type: 'info',
                message: action === 'cancel'
                    ? '放弃保存并离开页面'
                    : '停留在当前页面'
                })
            });
        },
        openCenterTextMsgBoxEvent(){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
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
            });
        },
        openNotificationCanCloseEvent(){
            const h = this.$createElement;
                this.$notify({
                title: '标题名称',
                message: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
            });
        },
        openNotificationDonntCanCloseEvent(){
            this.$notify({
                title: '提示',
                message: '这是一条不会自动关闭的消息',
                duration: 0
            });
        },
        openNotificationInfoEevnt(){
            this.$notify.info({
                title: '消息',
                message: '这是一条消息的提示消息'
            });
        },
        openNotificationSuccessEevnt(){
            this.$notify({
                title: '成功',
                message: '这是一条成功的提示消息',
                type: 'success'
            });
        },
        openNotificationWarningEevnt(){
            this.$notify({
                title: '警告',
                message: '这是一条警告的提示消息',
                type: 'warning'
            });
        },
        openNotificationErrorEevnt(){
            this.$notify.error({
                title: '错误',
                message: '这是一条错误的提示消息'
            });
        },
        openNotificationOnLeftTopEevnt(){
            this.$notify({
                title: '自定义位置',
                message: '左上角弹出的消息',
                position: 'top-left'
            });
        },
        openNotificationOnLeftBottomEevnt(){
            this.$notify({
                title: '自定义位置',
                message: '左下角弹出的消息',
                position: 'bottom-left'
            });
        },
        openNotificationOnRightTopEevnt(){
            this.$notify({
                title: '自定义位置',
                message: '右上角弹出的消息'
            });
        },
        openNotificationOnRightBottomEevnt(){
            this.$notify({
                title: '自定义位置',
                message: '右下角弹出的消息',
                position: 'bottom-right'
            });
        },
        openNotificationOffsetEevnt(){
            this.$notify({
                title: '偏移',
                message: '这是一条带有偏移的提示消息',
                offset: 100
            });
        },
        openNotificationHtmlEevnt(){
            this.$notify({
                title: 'HTML 片段',
                dangerouslyUseHTMLString: true,
                message: '<strong>这是 <i>HTML</i> 片段</strong>'
            });
        }

    }
}
</script>
