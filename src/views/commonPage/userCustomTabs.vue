<template>
    <div class="userCustomTabsPage">
        <div class="userCustomMessageTipsPage-tabs">
        <el-tabs tab-position="top" style="height: 200px;">
            <el-tab-pane label="home项目tab">
                <div class="userCustomMessageTipsPage-tabs__homeType">
                    <div>
                        <div class="userCustomMessageTipsPage-tabs__title">1.home项目tab，带事件逻辑</div>
                        <el-tabs v-model="tabActiveName" type="card" editable @edit="tabHomeHandleClick">
                            <el-tab-pane
                                :key="item.name"
                                v-for="item in editableTabs"
                                :label="item.title"
                                :name="item.name">
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="内容页tab">
                <div class="userCustomMessageTipsPage-tabs__content">
                    <div class="div">
                        <div class="userCustomMessageTipsPage-tabs__title">1.基础类型：</div>
                        <el-tabs tab-position="top" v-model="initActiveName" @tab-click="initHandleClick">
                            <el-tab-pane label="基础1" name="first">页面1</el-tab-pane>
                            <el-tab-pane label="基础2" name="second">页面2</el-tab-pane>
                        </el-tabs>
                    </div>
                    <div  class="div">
                        <div class="userCustomMessageTipsPage-tabs__title">2.选项卡类型：</div>
                        <el-tabs v-model="chooseCardActiveName" type="card" @tab-click="chooseCardHandleClick">
                            <el-tab-pane label="选项卡1" name="first">内容1</el-tab-pane>
                            <el-tab-pane label="选项卡2" name="second">内容2</el-tab-pane>
                        </el-tabs>
                    </div>
                    <div  class="div">
                        <div class="userCustomMessageTipsPage-tabs__title">3.卡片化类型：</div>
                        <el-tabs v-model="cardActiveName" type="border-card" @tab-click="cardHandleClick">
                            <el-tab-pane label="卡片1" name="first">内容1</el-tab-pane>
                            <el-tab-pane label="卡片2" name="second">内容2</el-tab-pane>
                        </el-tabs>
                    </div>
                    <div  class="div">
                        <div class="userCustomMessageTipsPage-tabs__title">4.自定义类型：</div>
                        <el-button
                            style="margin:2px;"
                            size="small"
                            @click="addTab(editableTabsValue2)">
                            <i class="el-icon-plus"></i>
                        </el-button>
                        <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
                            <el-tab-pane
                                v-for="item in editableTabs2"
                                :key="item.name"
                                :label="item.title"
                                :name="item.name">
                                {{item.content}}
                            </el-tab-pane>
                        </el-tabs>
                    </div>
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
            tabActiveName:"first",
            initActiveName:"first",
            chooseCardActiveName:"first",
            cardActiveName:"first",
            editableTabs: [{
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content'
            }, {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2 content'
            }, {
            title: 'Tab 3',
            name: '3',
            content: 'Tab 3 content'
            }],
            tabIndex: 1,
            editableTabsValue2: '2',
            editableTabs2: [{
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content'
            }, {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2 content'
            }],
        }
    },
    mounted() {
        var that = this;
        
        $(".userCustomTabsPage").css("min-height",$("#app").height()-32);
        $(".userCustomMessageTipsPage-tabs").css("min-height",$("#app").height()-32);
        $(".userCustomMessageTipsPage-tabs .el-tabs__content").css("max-height",$("#app").height()-86).css("overflow","auto")
        
    },
    methods: {
        tabHomeHandleClick(targetName, action){
            if (action === 'add') {
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
                title: 'New Tab',
                name: newTabName,
                content: 'New Tab content'
            });
            this.editableTabsValue = newTabName;
            }
            if (action === 'remove') {
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                    activeName = nextTab.name;
                    }
                }
                });
            }
            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            }
        },
        initHandleClick(tab,evt){
            console.log(tab,evt)
        },
        cardHandleClick(tab,evt){
            console.log(tab,evt)
        },
        chooseCardHandleClick(tab,evt){
            console.log(tab,evt)
        },
        addTab(targetName) {
            let newTabName = ++this.tabIndex + '';
            this.editableTabs2.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
            });
            this.editableTabsValue2 = newTabName;
        },
        removeTab(targetName) {
            let tabs = this.editableTabs2;
            let activeName = this.editableTabsValue2;
            if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                    activeName = nextTab.name;
                }
                }
            });
            }
            
            this.editableTabsValue2 = activeName;
            this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
        }
    }
}
</script>
