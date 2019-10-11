<template>
    <div class="userCustomTransferPage">
        <div class="userCustomTransferPageContainer">
            <el-tabs v-model="activeName" @tab-click="handleClickTransferTabs">
                <el-tab-pane label="element穿梭框" name="first">
                    <div class="userCustomTransferPageContainer-tranferType">
                        <div class="userCustomMobanPageContainer-buttons">
                            <el-button @click="viewOnAffirmEvent">确 认</el-button>
                            <el-button @click="viewOnCancelEvent">取消</el-button>
                        </div>
                        <el-transfer 
                            v-model="selectedAccount" 
                            filterable 
                            :titles="['待选人员', '已选人员']" 
                            :props="{key: 'userIdentityid', label: 'userName'}" 
                            :data="selectData">
                        </el-transfer>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="tree组合穿梭框" name="second">
                    <div class="userCustomTransferPageContainer-treeType">
                        <div class="userCustomMobanPageContainer-buttons">
                            <el-button @click="viewOnAffirmEvent2">确 认</el-button>
                            <el-button @click="viewOnCancelEvent2">取消</el-button>
                        </div>
                        <el-input class="userCustomMobanPageContainer-searchInput" clearable placeholder="输入关键字过滤" v-model="filterText"></el-input>
                        <div class="userCustomMobanPageContainer-searchTree">
                            <el-card class="box-card">
                                <div slot="header"><span>搜索功能</span></div>
                                <div class="text item">
                                    <el-tree
                                        style="border:none;"
                                        :data="treeData"
                                        :showCheckbox="true"
                                        node-key="id"
                                        :props="defaultProps1"
                                        :default-expand-all="true"
                                        :expand-on-click-node="false"
                                        :filter-node-method="filterNode"
                                        ref="tree1">
                                    </el-tree>
                                </div>
                            </el-card>
                        </div>
                        <div class="userCustomMobanPageContainer-treeType__buttons">
                            <el-button @click="addTreeNode"><i class="el-icon-arrow-right"></i></el-button>
                            <el-button @click="delTreeNode"><i class="el-icon-arrow-left"></i></el-button>
                        </div>
                        <div class="userCustomMobanPageContainer-selectTree">
                            <el-card class="box-card">
                                <div slot="header"><span>选中功能</span></div>
                                <div class="text item">
                                    <el-tree
                                        style="border:none;"
                                        :data="treeData2"
                                        :props="defaultProps2"
                                        show-checkbox
                                        ref="tree2"
                                        node-key="id"
                                        :default-expand-all="true"
                                        :expand-on-click-node="false">
                                    </el-tree>
                                </div>
                            </el-card>
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
            selectedAccount: [],
            selectData : [
                {
                    "userIdentityid":"cbf36b88fc2f11e1140568cc6ee12787",
                    "userName":"张建"
                },{
                    "userIdentityid":"eef36b88fc2f11e1140568cc6ee12787",
                    "userName":"张树杰"
                },{
                    "userIdentityid":"c2f36b88fc2f11e1140568cc6ee12787",
                    "userName":"刘玉是"
                },{
                    "userIdentityid":"eef36b887hhf11e1140568cc6ee12787",
                    "userName":"李贺拿"
                },{
                    "userIdentityid":"c2f36b88fc2f00e1140568cc6ee12711",
                    "userName":"李玖哲"
                },{
                    "userIdentityid":"eef36b88fc2f11e1140568cc6ee12722",
                    "userName":"ddd"
                },{
                    "userIdentityid":"c2f36b88fc2f11e1140568cc6ee12744",
                    "userName":"展架"
                },{
                    "userIdentityid":"eef36b887hhf11e1140568cc6ee12733",
                    "userName":"niubility"
                },{
                    "userIdentityid":"c2f36b88fc2f00e1140568cc6ee12766",
                    "userName":"师德"
                },{
                    "userIdentityid":"cbf36b88fc2f11e114568cc6ee127827",
                    "userName":"7777"
                },{
                    "userIdentityid":"eef36b88fc2f11e114058cc6ee1278217",
                    "userName":"vvvv"
                },{
                    "userIdentityid":"c2f36b88fc2f11e1140508cc6ee12787",
                    "userName":"ssss"
                },{
                    "userIdentityid":"eef36b887hhf11e1140768cc6ee12787",
                    "userName":"44"
                },{
                    "userIdentityid":"c2f36b88fc2f00e114054468cc6ee111",
                    "userName":"3111"
                },{
                    "userIdentityid":"eef36b88fc2f11e1140568cc6ee12222",
                    "userName":"22"
                },{
                    "userIdentityid":"c2f36b88fc2f11e1140568cc6ee15544",
                    "userName":"3333"
                },{
                    "userIdentityid":"eef36b887hhf11e1140568cc6ee12733",
                    "userName":"niubility"
                },{
                    "userIdentityid":"c2f36b88fc2f00e1140568cc6ee12766",
                    "userName":"师德"
                }
            ],
            activeName:"first",
            treeData: [
                {
                id: 1,
                pid: 0,
                path: "xxxx",
                label: "我的项目",
                children: [
                    {
                    id: 2,
                    pid: 1,
                    path: "xxxx",
                    label: "项目1",
                    children: [
                        {
                        id: 3,
                        pid: 2,
                        path: "xxxx",
                        label: "项目1详情"
                        },
                        {
                        id: 4,
                        pid: 2,
                        path: "xxxx",
                        label: "项目1图片"
                        }
                    ]
                    }
                ]
                },
                {
                id: 5,
                pid: 0,
                path: "xxxx",
                label: "我的管理",
                children: [
                    {
                    id: 6,
                    pid: 5,
                    path: "xxxx",
                    label: "管理层1"
                    },
                    {
                    id: 7,
                    pid: 5,
                    path: "xxxx",
                    label: "管理层2"
                    }
                ]
                },
                {
                id: 8,
                pid: 0,
                path: "xxxx",
                label: "我的阶层",
                children: [
                    {
                    id: 9,
                    pid: 8,
                    path: "xxxx",
                    label: "阶层1"
                    },
                    {
                    id: 10,
                    pid: 8,
                    path: "xxxx",
                    label: "阶层2"
                    }
                ]
                },
                {
                id: 11,
                pid: 0,
                path: "xxxx",
                label: "我的设计",
                children: [
                    {
                    id: 12,
                    pid: 11,
                    path: "xxxx",
                    label: "设计项目1"
                    },
                    {
                    id: 13,
                    pid: 11,
                    path: "xxxx",
                    label: "设计项目2",
                    children: [
                        {
                        id: 14,
                        pid: 13,
                        path: "xxxx",
                        label: "细节1"
                        }
                    ]
                    }
                ]
                }
            ],
            treeData2: [
                {
                id: 2,
                pid: 1,
                path: "xxxx",
                label: "项目1"
                },
                {
                id: 8,
                pid: 0,
                path: "xxxx",
                label: "我的阶层"
                }
            ],
            filterText: "",
            defaultProps1: {
                children: "children",
                label: "label"
            },
            defaultProps2: {
                children: "children",
                label: "label"
            },
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree1.filter(val);
        }
    },
    mounted() {
        var that = this;
        // 动态高度
        $(".userCustomTransferPage").css("min-height",$("#app").height()-40);

    },
    methods: {
        // 确认
        viewOnAffirmEvent(){
            var that = this;
            console.log("已选人员的id",that.selectedAccount)
        },
        handleClickTransferTabs(data){
            var that = this;

        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        // 搜索功能高亮选中节点
        treeNodeCheckedHigh() {
            var that = this;
            // 1.选中功能-树形数据转成数组
            var arr = that.getIdsArr(that.treeData2).arr;
            // 2.选中功能-所有的数据id
            var idsArr = that.getIdsArr(that.treeData2).idsArr;

            // 3.所有功能-树形转数组
            var treeDataArr = that.getIdsArr(that.treeData).arr;

            // 4.已被勾选-禁止勾选
            for (let i = 0; i < treeDataArr.length; i++) {
                const element = treeDataArr[i];
                element["disabled"]=false;
            }
            for (let i = 0; i < treeDataArr.length; i++) {
                const element = treeDataArr[i];
                for (const j in idsArr) {
                if (idsArr[j]==element.id) {
                    element["disabled"]=true;
                }
                }
            }
            var copydata = that.deepCopy(treeDataArr); //拷贝
            var treedata = that.arrayToTree(copydata, "children");
            that.treeData = treedata;
        
        },
        // 添加功能
        addTreeNode() {
            var that = this;
            // var checkArr1 = that.$refs.tree1.getCheckedKeys().toString().split(",");
            // 1. 获取勾选的对象数组
            var getNodes = that.$refs.tree1.getCheckedNodes();
            // 2. 将勾选的数据push到之前的数据中
            getNodes = that.treeData2.concat(getNodes);
            // 3. 树形数据转成数组
            // 4. 数组去重
            // 5. 筛选出勾选的数据id
            var arr = that.getIdsArr(getNodes).arr;
            var idsArr = that.getIdsArr(getNodes).idsArr;
            // 6. 数组转成树形数据
            var copydata = that.deepCopy(arr); //拷贝
            var treedata = that.arrayToTree(copydata, "children");
            that.treeData2 = treedata;
            that.treeNodeCheckedHigh();

        },
        // 删除功能
        delTreeNode() {
            var that = this;
            //1. 已选功能-获取勾选的对象数组
            var getNodes = that.$refs.tree2.getCheckedNodes();
            // 2. 已选功能-所有数据
            var arr = that.getIdsArr(that.treeData2).arr;
            // 3. 已选功能-当前被勾选的数据
            var idsArr = that.getIdsArr(getNodes).idsArr;
            // 4. 已选功能-剔除勾选的数据
            var ridArr = arr.filter(function (item) {
            return idsArr.indexOf(item.id)==-1;
            })
            //6. 数组转成树形数据
            var copydata = that.deepCopy(ridArr); //拷贝
            var treedata = that.arrayToTree(copydata, "children");

            that.treeData2 = treedata;
            that.treeNodeCheckedHigh();

        },
        // 应用按钮
        viewOnAffirmEvent2(){
            var that = this;
            var idsArr1 = that.getIdsArr(that.treeData).idsArr;
            var idsArr2 = that.getIdsArr(that.treeData2).idsArr;
            console.log("待选",idsArr1,"已选",idsArr2)
            console.log(that.treeData,that.treeData2)
        },
        // 获取处理后的数组和id
        getIdsArr(treeDataArr){
            var that = this;
            // 1.将树形数据转为数组
            var arr = [];
            for (let i = 0; i < treeDataArr.length; i++) {
                const element = treeDataArr[i];
                arr = arr.concat(that.treeToArray(element, "children"));
            }
            // 2.数组去重
            var hash = {};
            arr = arr.reduce(function(item, next) {
                hash[next.id] ? "" : (hash[next.id] = true && item.push(next));
                return item;
            }, []);
            // 3.筛选出勾选的数据id
            var idsArr = [];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                idsArr.push(element.id);
            }
            return {"arr":arr,"idsArr":idsArr}
            },
            handleClose(done) {
            this.$confirm("确认关闭？", "提示")
                .then(_ => {
                done();
                })
                .catch(_ => {});
            },
            // 处理成树形
            arrayToTree(treeArray, children) {
            var r = [];
            var tmpMap = {};

            for (var i = 0, l = treeArray.length; i < l; i++) {
                // 以每条数据的id作为obj的key值，数据作为value值存入到一个临时对象里面
                tmpMap[treeArray[i]["id"]] = treeArray[i];
            }

            for (i = 0, l = treeArray.length; i < l; i++) {
                var key = tmpMap[treeArray[i]["pid"]];

                //循环每一条数据的pid，假如这个临时对象有这个key值，就代表这个key对应的数据有children，需要Push进去
                if (key) {
                if (!key[children]) {
                    key[children] = [];
                    key[children].push(treeArray[i]);
                } else {
                    key[children].push(treeArray[i]);
                }
                } else {
                //如果没有这个Key值，那就代表没有父级,直接放在最外层
                r.push(treeArray[i]);
                }
            }
            return r;
        },
        // 深度拷贝
        deepCopy(obj) {
            var that = this;
            var object;
            if (Object.prototype.toString.call(obj) == "[object Array]") {
                object = [];
                for (var i = 0; i < obj.length; i++) {
                object.push(that.deepCopy(obj[i]));
                }
                return object;
            }

            if (Object.prototype.toString.call(obj) == "[object Object]") {
                object = {};
                for (var p in obj) {
                object[p] = obj[p];
                }
                return object;
            }
        },
        //将树型结构转为平面数组结构
        treeToArray(treeObject, childrenKey, saveKey) {
            var that = this;
            //  * @param treeObject 树形数据
            //  * @param childrenKey  子节点的归属字段children...
            //  * @returns {Array}
            //  */
            var arr = [];
            if (treeObject == null || childrenKey == null || childrenKey == "") {
                return arr;
            }
            var obj = that.copyObject(treeObject);
            var children = obj[childrenKey];
            delete obj[childrenKey];
            arr.push(obj);
            if (children == null || children.length == 0) {
                return arr;
            }
            for (var i = 0; i < children.length; i++) {
                var o = that.copyObject(children[i]);
                var arr1 = that.treeToArray(o, childrenKey);
                arr = arr.concat(arr1);
            }
            return arr;
        },
        //拷贝对象
        copyObject(obj) {
            var newObj = {};
            for (var key in obj) {
                newObj[key] = obj[key];
            }
            return newObj;
        },
        viewOnCancelEvent2(){
            var that = this;
            that.functionsDialog = false;
        },
        viewOnCancelEvent(){
            var that = this;

        }
    
    }
}
</script>
