<template>
    <div class="userCustomHelpsPage"> 
        <div class="userCustomHelpsPageContent">
            <el-tabs v-model="activeName" @tab-click="handleClickHelpTabs">
                <el-tab-pane label="多指标帮助" name="first">
                    <div class="userCustomHelpsPageContent-moreIndicators">
                        <div class="userCustomHelpsPageContent-paragraphs">
                            <div class="userCustomHelpsPageContent-moreIndicators__left" >
                                <el-input
                                class="userCustomHelpsPageContent-filterSearchInput"
                                icon="search"
                                placeholder="输入关键字进行搜索"
                                clearable
                                v-model="filterText">
                                </el-input>				
                                <el-tree
                                class="filter-tree userCustomHelpsPageContent-filterTree"
                                :data="dataTree"
                                node-key="id"
                                highlight-current
                                :props="defaultProps"
                                default-expand-all
                                :expand-on-click-node=false
                                :filter-node-method="filterNode"
                                @node-click="filterNodeHandleClick"
                                ref="tree">
                                </el-tree>
                            </div>
                            <div class="userCustomHelpsPageContent-moreIndicators__right" >
                                <div v-if="currentNode.apiName" class="userCustomHelpsPageContent-moreIndicators__rightTitle">
                                    {{currentNode.apiName}}
                                </div>
                                <div class="userCustomHelpsPageContent-moreIndicators__content">
                                    <el-table
                                        :data="tbody"
                                        border
                                        :height="indicatorsTableHeight"
                                        class="indicatorsTable"
                                        style="width: 100%">
                                        <el-table-column 
                                            align="center" 
                                            v-for="item in theader" 
                                            :key="item.id" 
                                            :prop="item.prop" 
                                            :label="item.label" 
                                            :width="item.width">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="段落描述帮助" name="second">
                    <div class="userCustomHelpsPageContent-paragraphs">
                        <div class="userCustomHelpsPageContent-paragraghs__left" >
                            <el-input
                            class="userCustomHelpsPageContent-filterSearchInput"
                            icon="search"
                            placeholder="输入关键字进行搜索"
                            clearable
                            v-model="filterText2">
                            </el-input>				
                            <el-tree
                            class="filter-tree userCustomHelpsPageContent-filterTree"
                            :data="dataTree2"
                            node-key="id"
                            highlight-current
                            :props="defaultProps2"
                            default-expand-all
                            :expand-on-click-node=false
                            :filter-node-method="filterNode2"
                            @node-click="filterNodeHandleClick2"
                            ref="tree2">
                            </el-tree>
                        </div>
                        <div class="userCustomHelpsPageContent-paragraghs__right" >
                            <div v-if="currentNode2.apiName" class="userCustomHelpsPageContent-paragraghs__rightTitle">
                                {{currentNode2.apiName}}
                            </div>
                            <div v-if="currentNode2.apiDescription" class="userCustomHelpsPageContent-paragraghs__rightContent">
                                {{currentNode2.apiDescription}}
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="单句简述帮助" name="third">
                    <div class="userCustomHelpsPageContent-oneIndicators">
                        <p>
                            <el-tooltip class="item" effect="dark" content="一句话简述帮助（路由：#/userCustomHelps）" placement="left-start">
                                <i class="el-icon-question pageTipsIcon"></i>
                            </el-tooltip>
                        </p>
                        <p>
                            <el-tooltip class="item" effect="light" content="一句话简述帮助（路由：#/userCustomHelps）" placement="left-start">
                                <i class="el-icon-question pageTipsIcon"></i>
                            </el-tooltip>

                        </p>
                        <p>
                            <el-tooltip class="item" effect="light" content="一句话简述帮助（路由：#/userCustomHelps）" placement="bottom">
                                <i class="el-icon-question pageTipsIcon"></i>
                            </el-tooltip>
                        </p>
                        <p>
                            <el-tooltip class="item" effect="light" content="一句话简述帮助（路由：#/userCustomHelps）" placement="top">
                                <i class="el-icon-question pageTipsIcon"></i>
                            </el-tooltip>
                        </p>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="图文帮助" name="fourth">
                    <div class="userCustomHelpsPageContent-graphic">
                        <ul class="userCustomHelpsPageContent-graphic__ul" v-if="graphicData.length>0">
                            <li class="userCustomHelpsPageContent-graphic__li"  v-for="(item,index) in graphicData" :key="index"  @click="openImgInnerDialog(item)">
                                <div class="userCustomHelpsPageContent-graphic__liTitle" v-if="item.apiName" v-html="item.apiName"></div>
                                <div class="userCustomHelpsPageContent-graphic__content">
                                    <div class="userCustomHelpsPageContent-graphic__imgBox">
                                        <img v-if="item.apiImg" class="userCustomHelpsPageContent-graphic__img" :src="item.apiImg" alt="item.apiName" srcset="">
                                    </div>
                                    <div class="userCustomHelpsPageContent-graphic__contentText" v-if="item.apiDescription.length>200">
                                        <span v-if="item.apiDescription" v-html="item.apiDescription.substring(0,200)+'...'"></span>
                                    </div>
                                    <div class="userCustomHelpsPageContent-graphic__contentText" v-else>
                                        <span v-if="item.apiDescription" v-html="item.apiDescription"></span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <el-dialog
                            width="98%"
                            top="2%"
                            :title=openDialogObj.apiName
                            :visible.sync="imgInnerVisible"
                            class="userCustomHelpsPageContent-graphic__dialog"
                            append-to-body>
                            <div class="userCustomHelpsPageContent-graphic__imgInnerVisible">
                                <img v-if="openDialogObj.apiName" class="userCustomHelpsPageContent-graphic__img" :src="openDialogObj.apiImg" alt="openDialogObj.apiName" srcset="">
                                <div v-if="openDialogObj.apiDescription" class="userCustomHelpsPageContent-graphic__contentText" v-html="openDialogObj.apiDescription"></div>
                            </div>
                        </el-dialog>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataTree: [],
            dataTree2:[],
            headerdata: [],
            tbodydata: [],
            graphicData:[],
            defaultProps: {
                "label": "apiName",
                "children": "children"
            },
            defaultProps2: {
                "label": "apiName",
                "children": "children"
            },
            filterText:"",
            filterText2:"",
            currentNode:{},
            currentNode2:{},
            activeName:"first",
            theader:[],
            tbody:[],
            indicatorsTableHeight:"100",
            imgInnerVisible: false,
            openDialogObj:{}
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        filterText2(val) {
            this.$refs.tree2.filter(val);
        }
    },
    mounted() {
        var that = this;

        // 默认选中
        this.$nextTick(function(){
            this.$refs.tree.setCurrentKey(1);  
        })
        

        // 动态高度
        $(".userCustomHelpsPage").css("min-height",$("#app").height()-40);
        $(".userCustomHelpsPageContent").css("min-height",$("#app").height()-60);
        $(".userCustomHelpsPageContent-moreIndicators__left").css("min-height",$("#app").height()-80);
        $(".userCustomHelpsPageContent-moreIndicators__right").css("min-height",$("#app").height()-80);
        $(".userCustomHelpsPageContent-paragraghs__left").css("min-height",$("#app").height()-80);
        $(".userCustomHelpsPageContent-paragraghs__right").css("min-height",$("#app").height()-80);
        $(".userCustomHelpsPageContent-filterTree").css("max-height",$("#app").height()-85);
        $(".userCustomHelpsPageContent-paragraghs__rightContent").css("max-height",$("#app").height()-75)

        // 多指标帮助
        that.$httpclient.notokenget('../../../static/mock/dataTree.json', {}, function (res) { 
            if (res.success) {
                that.dataTree = res.dataTree;
                that.currentNode = that.dataTree[0];
            }else{
                that.$message.error("获取数据失败！")
            }
        })
        // 段落描述帮助
        that.$httpclient.notokenget('../../../static/mock/dataTree2.json', {}, function (res) { 
            if (res.success) {
                that.dataTree2 = res.dataTree2;
                that.currentNode2 = that.dataTree2[0];
            }else{
                that.$message.error("获取数据失败！")
            }
        })
        // 图文帮助
        that.$httpclient.notokenget('../../../static/mock/graphicData.json', {}, function (res) { 
            debugger
            if (res.success) {
                that.graphicData = res.graphicData;
            }else{
                that.$message.error("获取数据失败！")
            }
        })
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            if (data&&data.apiName) {
                return data.apiName.indexOf(value) !== -1;
            }
        },
        filterNode2(value, data) {
            if (!value) return true;
            if (data&&data.apiName) {
                return data.apiName.indexOf(value) !== -1;
            }
        },
        filterNodeHandleClick(data) {
            var that = this;
            that.currentNode = data;
            if(data){
                //todo 请求数据
                that.$httpclient.notokenget('../../../static/mock/moreTableData.json', {}, function (res) { 
                    if (res.success) {
                        that.theader = res.headerdata;
                        that.tbody = res.tbodydata;
                    }else{
                        that.$message.error("获取数据失败！")
                    }
                })
            }
            that.indicatorsTableHeight = $("#app").height()-145;
        },
        filterNodeHandleClick2(data) {
            var that = this;
            that.currentNode2 = data;
        },
        handleClickHelpTabs(){
            var that = this;

        },
        openImgInnerDialog(data){
            var that = this;
            that.imgInnerVisible = true;
            that.openDialogObj = data;

        }
    
    }
}
</script>
