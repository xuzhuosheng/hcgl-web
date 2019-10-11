<template>

	<div class="changeWallPaper">
    <el-button @click="changeFunc">更换壁纸</el-button>
    <div class="changeBox"></div>
	</div>

</template>
<style>
  .changeWallPaper,.changeBox{
    width:100%;
  }
</style>
<script>
//引入组件
	import "../../../static/changeWallPaper/js/jquery-1.12.0.js"
	import "../../../static/changeWallPaper/js/changeWallPaper.js"
	import "../../../static/changeWallPaper/css/changeWallPaper.css"

	export default {
		name: "changeWallPaper",
		data() {
			return {

			};
		},
		methods: {
            changeFunc(){
                //图片路径（不同项目图片链接的地址不同，确保路径正常）
                var path = "../../../static/changeWallPaper/img/"; 
                // 数据
                var datalist=[
                    {"sortNo":3,"id":1,"path":path+"1.jpg","desc":"This is my image","isSelect":true},
                    {"sortNo":1,"id":2,"path":path+"2.jpg","desc":"This is my image","isSelect":false},
                    {"sortNo":2,"id":3,"path":path+"3.jpg","desc":"This is my image","isSelect":false},
                    {"sortNo":4,"id":4,"path":path+"4.jpg","desc":"This is my image","isSelect":false},
                    {"sortNo":5,"id":5,"path":path+"5.jpg","desc":"This is my image","isSelect":false},
                    {"sortNo":6,"id":6,"path":path+"6.jpg","desc":"This is my image","isSelect":false},
                    {"sortNo":7,"id":7,"path":path+"7.jpg","desc":"This is my image","isSelect":false},
                    {"sortNo":8,"id":8,"path":path+"8.jpg","desc":"This is my image","isSelect":false},
                    {"sortNo":9,"id":9,"path":path+"6.jpg","desc":"This is my image","isSelect":false},
                    {"sortNo":10,"id":10,"path":path+"1.jpg","desc":"This is my image","isSelect":false},
                ]
                //实例化对象
                var getChangeWallPagerHelper = $.fn.getChangeWallPagerHelper(); 
                //初始化数据
                getChangeWallPagerHelper.setData(datalist); 
                //容器
                getChangeWallPagerHelper.containerClass=".changeBox";
                // 图片路径（请传入正确路径）
                getChangeWallPagerHelper.setPath(path);
                //初始化方法
                getChangeWallPagerHelper.init(
                        //1. 点击关闭按钮
                        function (type,event,allData) {
                            console.log("点击关闭按钮",type,event,allData)
                            return {"success":true};
                        },
                        //2. 点击应用按钮
                        function (type,event,newSelectedObj,oldSelectedObj,allData) {
                            // 事件类型，事件，新选中的对象，旧选中的对象，所有数据
                            console.log("点击应用按钮",type,event,newSelectedObj,oldSelectedObj,allData)
                            return {"success":true};
                        },
                        //3. 点击恢复默认设置按钮
                        function (type,event,newSelectedObj,oldSelectedObj,allData) {
                            // 事件类型，事件，新选中的对象，默认选中的对象，所有数据
                            console.log("点击恢复默认设置按钮",type,event,newSelectedObj,oldSelectedObj,allData)
                            // 不回调setObj，组件将以初始化默认的设置
                            return {"success":true,"setObj":{"sortNo":5,"id":5,"path":"img/5.jpg","desc":"This is my image","isSelect":true}};
                        },
                        //4. 回调以后
                        function (type,event,newSelectedObj,oldSelectedObj,allData) {
                            console.log("回调以后",type,event,newSelectedObj,oldSelectedObj,allData)
                            return {'success':true}; //"success":true表示回调成功
                        }
                ); 
            console.log('getChangeWallPagerHelper', getChangeWallPagerHelper)
        }
    }
			
	}
</script>
