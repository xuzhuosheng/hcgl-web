<template>
<!-- 税务机关下拉树 -->
    <el-popover
        ref="popover"
        popper-class="hyht-select-tree__popover"
        placement="bottom-start"
        trigger="click">
        <!-- 显示content -->
        <div >
            <el-input class="hyht-select-tree__input" v-if="filterable" placeholder="请输入关键字" v-model="searchValue" size="mini"></el-input>
            <el-tree 
                    ref="tree"
                    class="hyht-select-tree"
                    :style="{'width':treeWidth}"
                    :data="treeData"
                    :props="dynaDefProps"
                    :check-strictly="true"
                    :node-key="dynaDefProps.id"
                    @node-click="onNodeClick"
                    :highlight-current="!multiple"
                    :expand-on-click-node="false"
                    :default-expanded-keys="defaultExpandedKeys"
                    :show-checkbox="multiple"
                    :default-expand-all="defaultExpandAll"
                    :filter-node-method="onTreeFilter"
                    :render-content="renderContent"
                    @check="onCheck">
                 <span class="hyht-select-tree_label" slot-scope="{ node, data }">
                    <slot :node="node" :data="data">{{ node.label }}</slot>
                 </span>
            </el-tree>
        </div>
        <!-- 触发html -->
        <el-select ref="select" slot="reference"
            popper-class="hyht-select-tree__option"
            :style="{'width':width+'px'}"
            v-model="labelValue" :size="size"
            :multiple="multiple" :clearable="clearable"
            :collapse-tags="collapseTags" :placeholder="placeholder"
            @change="onChange" @clear="onClear">
        </el-select>
    </el-popover>
</template>
<style>
/* 下拉选option */
.hyht-select-tree__option {
  display: none;
  padding: 0 !important;
}

/* 弹出框 */
.hyht-select-tree__popover {
  margin-top: 0 !important;
  padding: 5px 0;
}

/* 搜索框 */
.hyht-select-tree__input {
  width: 94%;
  padding: 0 4px 4px !important;
}

/* tree树形控件 */
.hyht-select-tree {
  overflow-y: scroll;
  max-height: 350px;
}

.hyht-select-tree::-webkit-scrollbar {
  z-index: 11;
  width: 6px;
}

.hyht-select-tree::-webkit-scrollbar-track,
.hyht-select-tree::-webkit-scrollbar-corner {
  background: #fff;
}

.hyht-select-tree::-webkit-scrollbar-thumb {
  width: 6px;
  border-radius: 5px;
  background: #b4bccc;
}

.hyht-select-tree::-webkit-scrollbar-track-piece {
  width: 6px;
  background: #fff;
}

/* 覆盖默认高亮效果 */
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #409eff !important;
  color: #fff;
}
</style>
<script>
// import { validatenull } from '@/util/validate'
export default {
  // 设置绑定参数
  model: {
    prop: "value"
    // event: 'selected',
  },
  data() {
    return {
      // 传参的值
      modelValue: void 0,
      // 展示框的值
      labelValue: void 0,
      // 搜索框的值
      searchValue: void 0,
      // 树节点宽度
      treeWidth: "auto",
      // 扁平化数据
      options: [],
      treeData: [],
    };
  },
  props: {
    // data: Array,
    url: String,
    value: String | Array,
    defaultProps: Object,
    // 对外暴露的属性  宽度
    width: {
      type: String,
      default: "180"
    },
    size: {
      type: String,
      default: "mini"
    },
    //占位符
    placeholder: {
      type: String,
      default: "请选择"
    },
    //是否是多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否启用过滤检索
    filterable: {
      type: Boolean,
      default: false
    },
    // 根层级
    //SHJ，那么将省局节点作为根节点
    // SJ，那么将市局节点作为根节点，当前用户如果是省级用户，那么将省局节点作为根节点。
    GCJ: {
      type: String,
      default: ""
    },
    // 是否显示机关简称
    SFXSJC: {
      type: Boolean,
      default: false
    },
    //是否显示代码和名称
    SFDMHMC: {
      type: Boolean,
      default: false
    },
    // 是否显示完整的名称
    SFWZDMMC: {
      type: Boolean,
      default: false
    },
    // 选择层级
    // SJ，只能选择市级成员。QJ，只能选择区县级成员。KJ，只能选择科所级成员。
    XZCJ: {
      type: String,
      default: ""
    },
    // 显示层级
    // SJ，只能显示市级成员。QJ，只能显示区县级成员。KJ，只能显示科所级成员。
    XSCJ: {
      type: String,
      default: ""
    },
    //显示机关类型 01，是对税务局机关数据不做过滤，02，是取值属性为机关的数据。 
    JGLX:{
      type: String,
      default: "01"
    },
    //是否支持清空
    clearable: {
      type: Boolean,
      default: false
    },
    SFGLQX:{
      type: String,
      default: ""
    },
    defaultExpandedKeys: Array,
    // 默认展开所有
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 是否tag展示
    collapseTags: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    searchValue(val) {
      this.debounceQuery(val);
    },
    modelValue(val) {
      if (val && Array.isArray(this.options) && this.options.length > 0) {
        if (this.multiple)
          this.labelValue = this.options
            .filter(node => val.includes(node[this.dynaDefProps.id]))
            .map(node => node[this.dynaDefProps.label]);
        else
          this.labelValue = this.options.filter(
            node => node[this.dynaDefProps.id] === val
          )[0][this.dynaDefProps.label];
      }
      this.$emit("input", val);
    },
    value(val) {
      if (!val) this.labelValue = void 0;
    }
  },
  computed: {
    // 树节点配置选项
    dynaDefProps() {
      return Object.assign(
        {},
        {
          parentId: "parentId",
          id: "id",
          label: "name",
          children: "children",
          filter: "filter"
        },
        this.defaultProps
      );
    }
    // 树节点数据
    
  },
  mounted() {},
  created() {
    var that = this;
    this.$httpclient.notokenget(that.url, {JGLX:that.JGLX,SFGLQX:that.SFGLQX}, function(res) {
      if (res.success) {
         // 初始化树模型
        that.treeData = res.data;
        //SJ只选择市级 QJ只选择区县级 KJ只选择科级 空代表选择所有that.XZCJ
        console.log(that.XZCJ)
        that.ArrRender(that.treeData,that.XZCJ)

         //SJ只显示市级 QJ只显示区县级 KJ只显示科级 空代表选择所有that.XSCJ
        that.ShowTreeList(that.treeData,that.XSCJ)
        if (that.treeData.length > 0) {
          // 备份降维模型
          that.options = that.flattenTree(that.treeData);
          //  初始化绑定节点
          that.$nextTick(() => {
            if (that.multiple) {
              if (Array.isArray(that.value) && that.value.length > 0) {
                that.labelValue = that.options
                  .filter(node =>
                    that.value.includes(node[that.dynaDefProps.id])
                  )
                  .map(node => node[that.dynaDefProps.label]);
                that.$refs.tree.setCheckedKeys(that.value);
                that.modelValue = that.value;
              }
            } else {
              if (that.value) {
                that.labelValue = that.options
                  .filter(node => node[that.dynaDefProps.id] === that.value)
                  .map(node => node[that.dynaDefProps.label])[0];
                that.$refs.tree.setCurrentKey(that.value);
                that.modelValue = that.value;
              }
            }
          });
         
        }
      }
    });
    // 获取输入框宽度同步至树状菜单宽度
    this.$nextTick(() => {
      this.treeWidth = `${(this.width ||
        this.$refs.select.$refs.reference.$el.clientWidth) - 24}px`;
    });
  },
  methods: {
    /* 点击节点 */
    onNodeClick(node, data) {
      if (!this.multiple) {
        if(!node.disabled||this.XZCJ==""){
          //  绑定值
          this.modelValue = node[this.dynaDefProps.id];
          // 对外暴露绑定函数
          this.$emit("node-click", node, data);
          // 隐藏菜单
          this.onCloseTree();
        }else{
           var ss=""
          if(this.XZCJ=="SJ"){
            ss="只能选择市级成员"
          }else if(this.XZCJ=="QJ"){
            ss="只能选择区县级成员"
          }else if(this.XZCJ=="KJ"){
            ss="只能选择科所级成员"
          }
          // SJ，只能选择市级成员。QJ，只能选择区县级成员。KJ，只能选择科所级成员。
          this.$message.warning(ss);
        }
      }
    },
    /* 点击节点复选框 */
    onCheck(node,data) {
      if (this.multiple) {
        if(!this.modelValue){
            this.modelValue=[]
        }
        if(this.Isexist(node)){
            // 是取消节点选中
            this.labelValue = this.labelValue.filter((item, index, arr) => item != node.label)
            this.modelValue = this.modelValue.filter((item, index, arr) => item != node.value)
            
        }else{
            // 绑定值
            this.labelValue.push(node.label)
            this.modelValue.push(node.value)
        }
       
        // let juniorNodes = data.checkedNodes.filter(
        //   node => !node[this.dynaDefProps.children]
        // );
        // this.modelValue = juniorNodes.map(node => node[this.dynaDefProps.id]);
        // 对外暴露绑定函数
        this.$emit("check", node, data);
      }
    },
    // 判断节点存点则是取消
    Isexist(node){
        var flag = false
        this.modelValue.forEach(ele => {
            if(ele==node.value){
                flag = true
            }
        });
        return flag
    },
    /* 节点过滤函数 */
    onTreeFilter(value, data) {
      if (!value) return true;
      return data[this.dynaDefProps.filter]
        ? data[this.dynaDefProps.label].indexOf(value) !== -1 ||
            data[this.dynaDefProps.filter].indexOf(value.toUpperCase()) !== -1
        : data[this.dynaDefProps.label].indexOf(value) !== -1;
    },
    /* 延迟过滤节点 */
    debounceQuery(val) {
      var that = this;
      that.$refs.tree.filter(val);
    },
    /* popover菜单关闭 */
    onCloseTree() {
      this.$refs.popover.showPopper = false;
    },
    /* 下拉选value变化 */
    onChange(val) {
      if (this.multiple) {
        this.labelValue = val;
        this.modelValue = this.options
          .filter(node => val.includes(node[this.dynaDefProps.label]))
          .map(node => node[this.dynaDefProps.id]);
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.modelValue);
        });
      }
    },
    /* 单选模式下清空 */
    onClear() {
      this.modelValue = void 0;
    },
    /* 数组降维 */
    flattenTree(arr = []) {
      let result = [],
        copy = $.extend(true, [], arr); // 深度拷贝数组
      const fun = arr => {
        arr.forEach(node => {
          result.push(node);
          if (this.isArray(node)) fun(node[this.dynaDefProps.children]);
          delete node[this.dynaDefProps.children];
        });
      };
      fun(copy);
      return result;
    },
    /* 判断数组 */
    isArray(data) {
      return (
        data[this.dynaDefProps.children] &&
        Array.isArray(data[this.dynaDefProps.children]) &&
        data[this.dynaDefProps.children].length > 0
      );
    },
    //自定义渲染节点
    renderContent(h, { node, data, store }) {
      var that = this;
      return (
        <span class="custom-tree-node" title={node.label}>
          <span>{that.dealContent(node, data, store)}</span>
        </span>
      );
    },
    // 处理tree的渲染数据
    dealContent(node, data, store) {
      var that = this;
      var label = node.label;
      if (that.SFWZDMMC) {
        label = label.length > 12 ? label.slice(0, 11) + "..." : label;
      }
      if (that.SFDMHMC) {
        label = label + data.value;
      }
      if (that.SFXSJC) {
        label = "BM代替";
      }
      return label;
    },
    //按照参数来处理可以选择勾选的数据
    ArrRender(arr,code) {
      var that = this;
      let i = 0;
      let len = arr.length;
      for (i=0; i < len; i++) {
           if(code=="SJ"){
            if(arr[i].jgjcDm=="11"||arr[i].jgjcDm=="41"||arr[i].jgjcDm=="51"){
                arr[i].disabled = true
            }else{
                arr[i].disabled = false
            }
           }
           if(code=="QJ"){
            if(arr[i].jgjcDm=="11"||arr[i].jgjcDm=="31"||arr[i].jgjcDm=="51"){
                arr[i].disabled = true
            }else{
                arr[i].disabled = false
            }
           }
           if(code=="KJ"){ //51
            if(arr[i].jgjcDm=="11"||arr[i].jgjcDm=="31"||arr[i].jgjcDm=="41"){
                arr[i].disabled = true
            }else{
                arr[i].disabled = false
            }
           }
        if (arr[i].children && arr[i].children.length > 0) {
          that.ArrRender(arr[i].children,code);
        }
      }
    },
    //按照参数来处理可以显示示的Tree数据
    ShowTreeList(arr,code) {
      var that = this;
      let i = 0;
      let len = arr.length;
      for (i=0; i < len; i++) {
           if(code=="SJ"){
            if(arr[i].jgjcDm=="31"){
               delete arr[i].children
            }
           }
           if(code=="QJ"){
            if(arr[i].jgjcDm=="41"){
                 delete arr[i].children
            }
           }
           if(code=="KJ"){ //51
            if(arr[i].jgjcDm=="51"){
                 delete arr[i].children
            }
           }
        if (arr[i].children && arr[i].children.length > 0) {
          that.ShowTreeList(arr[i].children,code);
        }
      }
    },
    //懒加载
    loadNode1(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region" }]);
      }
      if (node.level > 1) return resolve([]);
      setTimeout(() => {
        const data = [
          {
            name: "leaf",
            leaf: true
          },
          {
            name: "zone"
          }
        ];

        resolve(data);
      }, 500);
    }
  }
};
</script>