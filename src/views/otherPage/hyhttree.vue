<template>
  <div>
  	<!--普通菜单-->
    <div style="width: 30%;float: left;" id="treeDemo1" ></div>
    <!--右键可以编辑菜单-->
    <div style="width: 30%;float: left;" id="treeDemo2" ></div>
    <!--home项目菜单-->
    <div style="width: 260px;float: left;" id="treeDemo3" ></div>
    <!-- 普通菜单，有加号图标 -->
    <div style="width: 200px;float: left;" id="treeDemo4" ></div>
    <!-- 创建菜单，有加号图标,可操作右键菜单 -->
    <div style="width: 30%;float: left;" id="treeDemo5" ></div>
  </div>
</template>

<script>
  import  "../../../static/ztree/js/jquery.ztree.all.js"
  import  "../../../static/ztree/ztreehelper.js"
  import  "../../../static/ztree/css/zTreeStyle.css"

  export default {
    props:{
      treeid:'',
      rMenu:''
    },
    data() {
        return{}
    },
    mounted(){
      var that = this;
      var zNodes =[
        {id:1, name:"常用菜单", noR:false,
          children:[
            {id:11, name:"节点 1-1-1", noR:false},
            {id:12, name:"节点 1-2", noR:false}

          ]},
        {id:2, name:"常用功能 ",
          children:[
            {id:21, name:"节点 2-1",
            children:[
	            {id:211, name:"节点 2-1-1"},
	            {id:212, name:"节点 2-1-2"},
	            {id:213, name:"节点 2-1-3"},
	            {id:214, name:"节点 2-1-4",
	            children:[
		            {id:2141, name:"节点 2-1-4-1"},
		            {id:2142, name:"节点 2-1-4-2"},
		            {id:2143, name:"节点 2-1-4-3"},
		            {id:2144, name:"节点 2-1-4-4"}
		          ]}
	          ]},
            {id:21, name:"节点 2-1",
              children:[
                {id:211, name:"节点 2-1-1"},
                {id:212, name:"节点 2-1-2"},
                {id:213, name:"节点 2-1-3"},
                {id:214, name:"节点 2-1-4",
                  children:[
                    {id:2141, name:"节点 2-1-4-1"},
                    {id:2142, name:"节点 2-1-4-2"},
                    {id:2143, name:"节点 2-1-4-3"},
                    {id:2144, name:"节点 2-1-4-4"}
                  ]}
              ]},
            {id:22, name:"节点 2-2"},
            {id:23, name:"节点 2-3"},
            {id:24, name:"节点 2-4"}
          ]},
        {id:3, name:"系统功能",
          children:[
            {id:31, name:"节点 3-1",
            children:[
	            {id:311, name:"节点 3-1-1"},
	            {id:312, name:"节点 3-1-2"},
	            {id:313, name:"节点 3-1-3"},
	            {id:314, name:"节点 3-1-4"}
	          ]},
            {id:32, name:"节点 3-2"},
            {id:33, name:"节点 3-3"},
            {id:34, name:"节点 3-4"}
          ]}
      ];
      var zNodes2 =[
        {id:1, name:"常用菜单", noR:false,
          children:[
            {id:11, name:"节点 1-1-1", noR:false},
            {id:12, name:"节点 1-2", noR:false}

          ]},
        {id:2, name:"常用功能 ",
          children:[
            {id:21, name:"节点 2-1",
            children:[
	            {id:211, name:"节点 2-1-1"},
	            {id:212, name:"节点 2-1-2"},
	            {id:213, name:"节点 2-1-3"},
	            {id:214, name:"节点 2-1-4",
	            children:[
		            {id:2141, name:"节点 2-1-4-1"},
		            {id:2142, name:"节点 2-1-4-2"},
		            {id:2143, name:"节点 2-1-4-3"},
		            {id:2144, name:"节点 2-1-4-4"}
		          ]}
	          ]},
            {id:21, name:"节点 2-1",
              children:[
                {id:211, name:"节点 2-1-1"},
                {id:212, name:"节点 2-1-2"},
                {id:213, name:"节点 2-1-3"},
                {id:214, name:"节点 2-1-4",
                  children:[
                    {id:2141, name:"节点 2-1-4-1"},
                    {id:2142, name:"节点 2-1-4-2"},
                    {id:2143, name:"节点 2-1-4-3"},
                    {id:2144, name:"节点 2-1-4-4"}
                  ]}
              ]},
            {id:22, name:"节点 2-2"},
            {id:23, name:"节点 2-3"},
            {id:24, name:"节点 2-4"}
          ]},
        {id:3, name:"系统功能",
          children:[
            {id:31, name:"节点 3-1",
            children:[
	            {id:311, name:"节点 3-1-1"},
	            {id:312, name:"节点 3-1-2"},
	            {id:313, name:"节点 3-1-3"},
	            {id:314, name:"节点 3-1-4"}
	          ]},
            {id:32, name:"节点 3-2"},
            {id:33, name:"节点 3-3"},
            {id:34, name:"节点 3-4"}
          ]}
      ];
      var zNodes3 =[
        {id:1, name:"常用菜单", noR:false,
          children:[
            {id:11, name:"节点 1-1-1", noR:false},
            {id:12, name:"节点 1-2", noR:false}

          ]},
        {id:2, name:"常用功能 ",
          children:[
            {id:21, name:"节点 2-1",
            children:[
	            {id:211, name:"节点 2-1-1"},
	            {id:212, name:"节点 2-1-2"},
	            {id:213, name:"节点 2-1-3"},
	            {id:214, name:"节点 2-1-4",
	            children:[
		            {id:2141, name:"节点 2-1-4-1"},
		            {id:2142, name:"节点 2-1-4-2"},
		            {id:2143, name:"节点 2-1-4-3"},
		            {id:2144, name:"节点 2-1-4-4"}
		          ]}
	          ]},
            {id:21, name:"节点 2-1",
              children:[
                {id:211, name:"节点 2-1-1"},
                {id:212, name:"节点 2-1-2"},
                {id:213, name:"节点 2-1-3"},
                {id:214, name:"节点 2-1-4",
                  children:[
                    {id:2141, name:"节点 2-1-4-1"},
                    {id:2142, name:"节点 2-1-4-2"},
                    {id:2143, name:"节点 2-1-4-3"},
                    {id:2144, name:"节点 2-1-4-4"}
                  ]}
              ]},
            {id:22, name:"节点 2-2"},
            {id:23, name:"节点 2-3"},
            {id:24, name:"节点 2-4"}
          ]},
        {id:3, name:"系统功能",
          children:[
            {id:31, name:"节点 3-1",
            children:[
	            {id:311, name:"节点 3-1-1"},
	            {id:312, name:"节点 3-1-2"},
	            {id:313, name:"节点 3-1-3"},
	            {id:314, name:"节点 3-1-4"}
	          ]},
            {id:32, name:"节点 3-2"},
            {id:33, name:"节点 3-3"},
            {id:34, name:"节点 3-4"}
          ]}
      ];
      setTimeout(function () {
          //使用默认菜单
          var treeHelper1  = new $.fn.getTreeHelper();
          treeHelper1.createSimpleMenu(
            "treeDemo1",//对应div的id
            zNodes,//数据
            //点击事件回调函数
            function (event, treeId, treeNode) {
              console.log(event, treeId, treeNode)
            }
          )
          
          //使用默认菜单，带默认增删菜单
          var treeHelper2  = new $.fn.getTreeHelper();
          treeHelper2.createOperateMenu(
            "treeDemo2",//对应div的id
            zNodes2,//数据
            //点击事件回调函数
            function (event, treeId, treeNode) {
              console.log(event, treeId, treeNode)
            },
            //右键选中菜单事件
            function (type, selectedNode) {
              console.log(type, selectedNode)
              return {'success':true,"node":{id:34, name:"节点 3-4"}};
            },
            //右选中菜单处理完事件
            function (type, selectedNode,data) {
              console.log(type, selectedNode,data)
              return {'success':true,"node":{id:34, name:"节点 3-4"}};
            }
          )
          //使用home项目菜单
          var treeHelper3  = new $.fn.getTreeHelper();
          treeHelper3.createSystemMenu(
            "treeDemo3",//对应div的id
            zNodes3,//数据
            //点击事件回调函数
            function (event, treeId, treeNode) {
            //  console.log(event, treeId, treeNode)
            },
            //右键选中菜单事件
            function (type, selectedNode) {
            //  console.log(type, selectedNode)
              return {'success':true,"node":{id:34, name:"节点 3-4"}};
            },
            //右选中菜单处理完事件
            function (type, selectedNode,data) {
            //  console.log(type, selectedNode,data)
              return {'success':true,"node":{id:34, name:"节点 3-4"}};
            }
          )

          //使用默认菜单,带有加减号图标
          var treeHelper4 = new $.fn.getTreeHelper();
          treeHelper4.createSimpleOfIconMenu(
            "treeDemo4",//对应div的id
            zNodes,//数据
            //点击事件回调函数
            function (event, treeId, treeNode) {
              console.log(event, treeId, treeNode)
            }
          )

          //创建菜单，有加号图标,可操作右键菜单
          var treeHelper5 = new $.fn.getTreeHelper();
          treeHelper5.createSimpleOfIconOperateMenu(
            "treeDemo5",//对应div的id
            zNodes,//数据
            //点击事件回调函数
            function (event, treeId, treeNode) {
              console.log(event, treeId, treeNode)
            },
            //右键选中菜单事件
            function (type, selectedNode) {
              console.log(type, selectedNode)
              return {'success':true,"node":{id:34, name:"节点 3-4"}};
            },
            //右选中菜单处理完事件
            function (type, selectedNode,data) {
              console.log(type, selectedNode,data)
              return {'success':true,"node":{id:34, name:"节点 3-4"}};
            }
          )


        },100)



    },
    methods: {

    }

  }

</script>

<style>
</style>
