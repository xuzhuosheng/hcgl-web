<template>
    <div class="userCustomScreenshotsPage">
        <div class="userCustomScreenPrintPage-buttons">
            <el-button @click="viewOnScreenshotsEvent(pngContainer)" class="">截 图</el-button>
            <el-button @click="viewGetFileByPDFEvent(pdfContainer)" class="">生成pdf</el-button>
        </div>
        <!-- 截图内容 -->
        <div class="userCustomScreenshotsPage-container">
            <div class="userCustomScreenshotsPage-container__div">
                1、图表组件（#/echartmodel）： 主要是各种echarts的图表控件（折线图，饼图，横向柱状图，纵向柱状图，环形图，面积图，雷达图，散点图）
                2、条件组件（#/conditionmodel）： 主要是各种条件控件（输入框，基础多选下拉框，级联下拉框，全选多选下拉框，时间选择控件，日期选择控件，日期范围选择控件）
                3、阿里云新项目页面模板（#/mobanPage1-8）： 主要是各个页面模板的整合（模板1-模板5）
                4、阿里云新项目弹窗模板（#dialogPage1-5）： 主要是各个页面弹窗模板的整合（模板1-模板4）
                5、消息提示组件（#/userCustomMessageTips）： 主要是各种消息提示的控件（msg，msgBox，notification，tooltip，popover五种类型）
                6、进度条组件（#/userCustomProgress）： 主要是各种进度条的控件（线性进度条，环形进度条两种类型）
                7、tab页组件（#/userCustomTabs）： 主要是各种tab页的控件（home项目交互，内容页选择两种类型）
                8、帮助组件（#/userCustomHelps）： 主要是项目的帮助控件
                9、锁屏组件（#/userCustomScreenLock）： 主要是项目的锁屏控件
                10、截图组件（#/userCustomScreenshotsPage）： 主要是项目的截图控件
            </div>
            <div class="userCustomScreenshotsPage-container__div">
                1、图表组件（#/echartmodel）： 主要是各种echarts的图表控件（折线图，饼图，横向柱状图，纵向柱状图，环形图，面积图，雷达图，散点图）
                2、条件组件（#/conditionmodel）： 主要是各种条件控件（输入框，基础多选下拉框，级联下拉框，全选多选下拉框，时间选择控件，日期选择控件，日期范围选择控件）
                3、阿里云新项目页面模板（#/mobanPage1-8）： 主要是各个页面模板的整合（模板1-模板5）
                4、阿里云新项目弹窗模板（#dialogPage1-5）： 主要是各个页面弹窗模板的整合（模板1-模板4）
                5、消息提示组件（#/userCustomMessageTips）： 主要是各种消息提示的控件（msg，msgBox，notification，tooltip，popover五种类型）
                6、进度条组件（#/userCustomProgress）： 主要是各种进度条的控件（线性进度条，环形进度条两种类型）
                7、tab页组件（#/userCustomTabs）： 主要是各种tab页的控件（home项目交互，内容页选择两种类型）
                8、帮助组件（#/userCustomHelps）： 主要是项目的帮助控件
                9、锁屏组件（#/userCustomScreenLock）： 主要是项目的锁屏控件
                10、截图组件（#/userCustomScreenshotsPage）： 主要是项目的截图控件
            </div>
        </div>
    </div>
</template>
<script>

// 生成pdf -- 此代码已在mian.js入口文件中引入
// import htmlToPdf from './util/htmlToPdf'  
// Vue.use(htmlToPdf)  //生成pdf注册

import html2Canvas from 'html2canvas' //截图控件

export default {
    data() {
        return {
            pdfContainer: ".userCustomScreenshotsPage-container",  //生产pdf容器类名
            pngContainer:".userCustomScreenshotsPage-container", //生产png容器类名
        }
    },
    mounted() {
        var that = this;

        // 动态高度
        $(".userCustomScreenshotsPage").css("min-height",$("#app").height());

    },
    methods: {
        // 截图
        viewOnScreenshotsEvent(container){
            var that = this;
            function download(data, filename) {
                var download_a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
                download_a.href = data
                download_a.download = filename
                var event = document.createEvent("MouseEvents")
                event.initMouseEvent("click")
                download_a.dispatchEvent(event)
            }

            var jietuDiv = $(container)[0];
            html2Canvas(jietuDiv).then(function (canvas) {
                download(canvas.toDataURL(), "hyht"+new Date().getTime())
            });
        },
    
    }
}
</script>
