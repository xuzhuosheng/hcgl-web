<template>
  <div class="addCustomFunctionsDialog">
    <h1>添加功能弹窗</h1>
    <el-dialog
      class="addCustomFunctionsDialogAdd"
      title="添加功能-我的桌面"
      :visible.sync="functionsDialog"
      :modal="false"
      :before-close="handleClose"
    >
      <div class="functionsDialogContent">
        <!-- <div class="funcDC_title">添加功能-<span style="color:#3491eb;">我的桌面</span></div> -->
        <el-input class="func_searchinput" placeholder="输入关键字过滤" v-model="filterText"></el-input>
        <div class="func_searchtree">
          <el-card class="box-card func_searchCard">
            <div slot="header">
              <span style="color:#3491eb;">搜索功能</span>
            </div>
            <div class="text item">
              <el-tree
                style="border:none;"
                :data="treeData"
                :showCheckbox="true"
                node-key="id"
                :props="defaultProps1"
                :default-expand-all="true"
                :expand-on-click-node="false"
                :default-checked-keys="defaultcheckedNodes"
                :filter-node-method="filterNode"
                ref="tree1"
              ></el-tree>
            </div>
          </el-card>
        </div>
        <div class="func_btns">
          <el-button class="func_btn_add" @click="addTreeNode">
            <i class="el-icon-arrow-right"></i>
          </el-button>
          <el-button class="func_btn_del" @click="delTreeNode">
            <i class="el-icon-arrow-left"></i>
          </el-button>
        </div>
        <div class="func_selecttree">
          <el-card class="box-card func_selectCard">
            <div slot="header">
              <span>选中功能</span>
            </div>
            <div class="text item">
              <el-tree
                style="border:none;"
                :data="treeData2"
                :props="defaultProps2"
                show-checkbox
                ref="tree2"
                node-key="id"
                :default-expand-all="true"
                :expand-on-click-node="false"
                :accordion="true"
              ></el-tree>
            </div>
          </el-card>
        </div>
        <div class="func_btns2">
          <el-button class="func_btn_apply" type="primary" @click="applyPostData">应用</el-button>
          <el-button class="func_btn_cancel">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.addCustomFunctionsDialog {
  padding: 20px;
}
</style>
<script>

export default {
  data() {
    return {
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
      functionsDialog: true,
      defaultcheckedNodes:[]
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree1.filter(val);
    }
  },
  created() {
    var that = this;
    that.treeNodeCheckedHigh();
  },
  methods: {
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

      // 3.搜索功能-默认选中
      // that.defaultcheckedNodes=idsArr; 
      
      var treeData = JSON.parse(JSON.stringify(that.treeData));
      that.treeData= [];
      that.treeData = treeData;
      
      // console.log('defaultcheckedNodes', that.defaultcheckedNodes)
      // console.log('idsArr', idsArr)
      
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
    applyPostData(){
      var that = this;
      var idsArr1 = that.getIdsArr(that.treeData).idsArr;
      var idsArr2 = that.getIdsArr(that.treeData2).idsArr;
      console.log(idsArr1, idsArr2)
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
  }
};
</script>