<template>
    <div class="userCustomScreenPrintPage">
        <div class="userCustomScreenPrintPage-buttons">
            <el-button v-print="'#viewOnPrintEvent'">打印</el-button>
        </div>
        <!-- 打印容器 -->
        <div class="userCustomScreenPrintPage-container" id="viewOnPrintEvent">
            <div class="userCustomScreenPrintPage-container__text">
                1、图表组件（#/echartmodel）： 主要是各种echarts的图表控件（折线图，饼图，横向柱状图，纵向柱状图，环形图，面积图，雷达图，散点图）
                2、条件组件（#/conditionmodel）： 主要是各种条件控件（输入框，基础多选下拉框，级联下拉框，全选多选下拉框，时间选择控件，日期选择控件，日期范围选择控件）
                3、阿里云新项目页面模板（#/mobanPage1，#/mobanPage2，#/mobanPage3，#/mobanPage4，#/mobanPage5）： 主要是各个页面模板的整合（模板1-模板5）
                4、阿里云新项目弹窗模板（#dialogPage1，#dialogPage2，#dialogPage3，#dialogPage4）： 主要是各个页面弹窗模板的整合（模板1-模板4）
                5、消息提示组件（#/userCustomMessageTips）： 主要是各种消息提示的控件（msg，msgBox，notification，tooltip，popover五种类型）
                6、进度条组件（#/userCustomProgress）： 主要是各种进度条的控件（线性进度条，环形进度条两种类型）
                7、tab页组件（#/userCustomTabs）： 主要是各种tab页的控件（home项目交互，内容页选择两种类型）
                8、帮助组件（#/userCustomHelps）： 主要是项目的帮助控件
                9、锁屏组件（#/userCustomScreenLock）： 主要是项目的锁屏控件
                10、截图组件（#/userCustomScreenshotsPage）： 主要是项目的截图控件
            </div>
            <div class="userCustomScreenPrintPage-container__table">
                 <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="date" label="日期" width=""></el-table-column>
                    <el-table-column prop="name" label="姓名" width=""></el-table-column>
                    <el-table-column prop="address" label="地址" width=""></el-table-column>
                </el-table>
            </div>
            <div>
                <img style="width:300px;" src="../../../static/assets/screenlockImg/screenlock1.jpg" alt="">
                <img style="width:100px;" src="../../../static/assets/screenlockImg/screenlock2.jpg" alt="">
                <img style="width:100px;" src="../../../static/assets/screenlockImg/screenlock4.jpg" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    mounted() {
        var that = this;

        // 动态高度
        $(".userCustomScreenPrintPage").css("min-height",$("#app").height());

    },
    methods: {

    
    }
}
</script>
