<template>
  <div>
    <h3>d3实例-v5版本</h3>
    <div class="initDiv"></div>
  </div>
</template>
<style>
.initDiv {
  border: 1px solid #e9e9e9;
  width: 800px;
  height: 530px;
  background: #fff;
  margin-left:20px;
}
</style>
<script>

//vue项目需要单独npm下载d3依赖包引入
import * as d3 from 'd3'

//vue项目需要单独npm下载截图save-svg-as-png依赖包引入
import saveSvg from "save-svg-as-png"; 

//下列文件正常导入
import "../../../static/D3Template/js/d3networkhelper.js";
import "../../../static/D3Template/css/d3networkhelper.css";
import "../../../static/D3Template/css/element.min.new.css";

export default {
  data() {
    return {};
  },
  mounted(){
    var vueThis = this;
    //实例化方法
	console.log('tag', $(".initDiv"))
	this.init(vueThis);

  },
  methods:{
    init(vueThis){
        //右键菜单（对象定义三个字段：rOperateNodeMenuList，rOperateLineMenuList，rOperatePanelMenuList）
		var rightMenuListObj = {
			//节点右键菜单
			"rOperateNodeMenuList":[
				{"class": "addLinksNode", "name": "新增关系节点"},
				{"class": "addLinks", "name": "新增关系"},
				{"class": "delCurClickNode", "name": "删除节点"},
				{"class": "associatedNode", "name": "节点关联节点"},
				{"class": "reviewNode", "name": "查看当前节点"},
				{"class": "addNodeTag", "name": "添加标签"},
				{"class": "cancelNodeTag", "name": "取消标签"},
			],
			//关系右键菜单
			"rOperateLineMenuList":[
				{"class": "delCurClickLine", "name": "删除关系"},
				{"class": "associatedLine", "name": "关系关联节点"}
			],
			//面板右键菜单
			"rOperatePanelMenuList":[
				{"class": "futureNode", "name": "全选节点"},
				{"class": "futureLine", "name": "全选关系"},
				{"class": "addCurNode", "name": "新增独立节点"},
			]
		}
		
		//实例化组件 (vueThis：是否在vue-element项目使用组件，如果是，一定要传此参数，将vue实例传到组件)（必录）
		var getD3NetworkHelper = $.fn.getD3NetworkHelper(d3,saveSvg,vueThis,$);

		//是否在vue,element项目使用，如果是，一定要传此参数，将vue指向传到组件（必录）
		getD3NetworkHelper.vueElemnet = this;
		//实例化将要渲染的容器（取到容器的类或id或独立的标签）（必录）
		getD3NetworkHelper.container = ".initDiv";

		//节点支持图标展示,1是启用，0是不启用
		getD3NetworkHelper.showNodeOnIcon = 1; 
		//节点支持图标展示的图标大小
		// getD3NetworkHelper.showNodeOnIconSize = 20; 
		//圆形节点，设置的半径
		// getD3NetworkHelper.radian = 10; 
		//用户定义的图片的path(按照格式，给出存放图片的能链接到图片的路径)
		getD3NetworkHelper.setShowNodeOnIconOfPath("../../../static/D3Template/img/");
		
		//节点展示的图标列表：[["高亮图","淡化图"],[],[]...] (定义组件js链接到图片的路径,一个高亮图，一个淡化图)
		getD3NetworkHelper.setShowNodeOnIconOfListObj([
			[getD3NetworkHelper.showNodeOnIconOfPath+"1.png",getD3NetworkHelper.showNodeOnIconOfPath+"1-1.png"],
			[getD3NetworkHelper.showNodeOnIconOfPath+"2.png",getD3NetworkHelper.showNodeOnIconOfPath+"2-2.png"],
			[getD3NetworkHelper.showNodeOnIconOfPath+"3.png",getD3NetworkHelper.showNodeOnIconOfPath+"3-3.png"],
			[getD3NetworkHelper.showNodeOnIconOfPath+"4.png",getD3NetworkHelper.showNodeOnIconOfPath+"4-4.png"]
		])

		//开启颜色层次(0默认不开启,1默认开启),此情况是节点是圆圈的情况下有效
		// getD3NetworkHelper.userColorKpi = 1; 
		
		//右键菜单显示设置
		// getD3NetworkHelper.isShowRightNodeMenu = 1; //节点右键：1显示，0不显示
		// getD3NetworkHelper.isShowRightLineMenu = 1; //关系右键：1显示，0不显示
		// getD3NetworkHelper.isShowRightPanelMenu = 1; //面板右键：1显示，0不显示

		//用户定义节点文字的位置[x,y]（距离节点的位置，不定义会根据系统自动设置）
		// getD3NetworkHelper.nodetextPosition=[15,10]

		//关系是否展示箭头(1是显示，0是不显示)
		getD3NetworkHelper.showMarker = 0; 

		// 

		//节点标签的图标( [图标icon,标签name]  默认是["../../../static/D3Template/img/tag3.png","我的标签"])
		// getD3NetworkHelper.setShowNodeTagOnIcon([getD3NetworkHelper.showNodeOnIconOfPath+"tag3.png","user标签类"])

		//关系线有曲线和折线两种方式（直线：liner, 曲线：curve）
		// getD3NetworkHelper.linksShowWay = "curve";

		//用户定义颜色板块(userColor)
		getD3NetworkHelper.colorsGraph={
			//色板
			"red":{"highlight":"rgb(255,0,0)","light":"rgb(253, 236, 236)"}, //红色 -- 1
			"orange":{"highlight":"rgb(255,127,0)","light":"rgb(253, 238, 224)"}, //橙色  --2
			"yellow":{"highlight":"rgb(255,255,0)","light":"rgb(253, 245, 237)"}, //黄色 --3
			"green":{"highlight":"rgb(0,255,0)","light":"rgb(232, 253, 232)"},  //绿色 --4
			"cyan":{"highlight":"rgb(0,255,255)","light":"rgb(225,255,255)"}, //青色 --5
			"turquoise":{"highlight":"rgb(0,255,127)","light":"rgb(226, 253, 240)"}, //青绿色 --6
			"blue":{"highlight":"rgb(0,0,255)","light":"rgb(235, 235, 253)"},  //蓝色 --7
			"purple":{"highlight":"rgb(127,0,255)","light":"rgb(241, 232, 251)"},  //紫色 --8
			"magenta":{"highlight":"rgb(255,0,255)","light":"rgb(253, 232, 253)"},  //品红色 --9
			"amaranth":{"highlight":"rgb(255,0,127)","light":"rgb(253, 236, 239)"},  //紫红色 --10
		};
		//节点关系数据
		var data = {
			"nodes": [
				{ "x": 10, "y": 30 ,"id":"1","name":"1中国","parentId": "0","userColor":getD3NetworkHelper.colorsGraph.red,"userIcon":getD3NetworkHelper.showNodeOnIconOfListObj[0]},
				{ "x": 17, "y": 370 ,"id":"2","name":"2广西","parentId": "1","userIcon":getD3NetworkHelper.showNodeOnIconOfListObj[1]},
				{ "x": 303, "y": 474 ,"id":"21","name":"21南宁","parentId": "2","userIcon":getD3NetworkHelper.showNodeOnIconOfListObj[2]},
				{ "x": 362, "y": 335 ,"id":"22","name":"22梧州","parentId": "2","userIcon":getD3NetworkHelper.showNodeOnIconOfListObj[2]},
				{ "x": 500, "y": 384 ,"id":"221","name":"221梧州南藤县","parentId": "22","userIcon":getD3NetworkHelper.showNodeOnIconOfListObj[3]},
				{ "x": 190, "y": 278 ,"id":"3","name":"3广东","parentId": "1","userColor":getD3NetworkHelper.colorsGraph.green,"userIcon":getD3NetworkHelper.showNodeOnIconOfListObj[1]},
				{ "x": 245, "y": 87 ,"id":"31","name":"31广州","parentId": "3","userColor":getD3NetworkHelper.colorsGraph.cyan,"userIcon":getD3NetworkHelper.showNodeOnIconOfListObj[2]},
				{ "x": 339, "y": 20 ,"id":"311","name":"311广州番禺","parentId": "31","userColor":getD3NetworkHelper.colorsGraph.turquoise,"userIcon":getD3NetworkHelper.showNodeOnIconOfListObj[3]},
				{ "x": 690, "y": 92 ,"id":"312","name":"312广州增城","parentId": "31","userColor":getD3NetworkHelper.colorsGraph.blue,"userIcon":getD3NetworkHelper.showNodeOnIconOfListObj[3]},
				{ "x": 589, "y": 150 ,"id":"313","name":"313广州白云","parentId": "31","userColor":getD3NetworkHelper.colorsGraph.purple,"userIcon":getD3NetworkHelper.showNodeOnIconOfListObj[3]},
				{ "x": 589, "y": 180 ,"id":"314","name":"314广州黄埔","parentId": "31","userColor":getD3NetworkHelper.colorsGraph.magenta,"userIcon":getD3NetworkHelper.showNodeOnIconOfListObj[3]},
				{ "x": 589, "y": 220 ,"id":"315","name":"315广州南沙","parentId": "0","userColor":getD3NetworkHelper.colorsGraph.amaranth,"userIcon":getD3NetworkHelper.showNodeOnIconOfListObj[3]},
				{ "x": 462, "y": 285 ,"id":"32","name":"32深圳","parentId": "3","userColor":getD3NetworkHelper.colorsGraph.orange,"userIcon":getD3NetworkHelper.showNodeOnIconOfListObj[2]},
				{ "x": 700, "y": 330 ,"id":"321","name":"321深圳南山区","parentId": "32","userColor":getD3NetworkHelper.colorsGraph.orange,"userIcon":getD3NetworkHelper.showNodeOnIconOfListObj[3]},
			],
			"links":[
				{"source":"1","target":"2","name":"mylink1"},
				{"source":"3","target":"1","name":"mylink2"},
				{"source":"2","target":"3","name":"mylink3"},
				{"source":"2","target":"21","name":"mylink3"},
				{"source":"2","target":"22","name":"mylink4"},
				{"source":"22","target":"221","name":"mylink5"},
				{"source":"3","target":"31","name":"mylink6"},
			]
		};

		//用户自定义布局还是层次布局（userlayer:用户自定义布局-按照节点实际的坐标渲染,systemlayer:系统默认布局-忽略节点坐标，自动生成level，层次布局）
		getD3NetworkHelper.showLayer = "userlayer";

		//是否由外部传关系数据(1:外部传入，0：内部根据节点关系自动生成)
		getD3NetworkHelper.isOutsideIncomeLinks = 0;  
		//处理渲染的数据（必录）
		getD3NetworkHelper.setGraph(data);
		//画布的宽（必录）
		getD3NetworkHelper.svgWidth = 800;
		//画布的高（必录）
		getD3NetworkHelper.svgHeight = 530; 
		
		//初始化执行绘画（必录）  
		getD3NetworkHelper.init(
			//1. 弹窗创建方式（system：系统创建新增弹窗，customer:用户自己创建弹窗）
			"system",
			//2. 右键菜单
			rightMenuListObj,
			//3. 点击事件回调函数
			function (type,event,selectedObj) {
				console.log(type,event,selectedObj)
			},
			//4. 右键选中菜单事件回调函数
			function (type,event,selectedObj,data) {
				console.log(type,event,selectedObj,data)
				return {
					//1. 回调状态（必录）
					'success':true,
					//2. 回调数据
					"passData":{
							//2.1 单个节点
							"node":{
								"name": "用户定义-新增节点",
								"id": "add_27c99fc5b474ed0c594bb72cafb22505",
								"parentId": "pid_add_27c99fc5b474ed0c594bb72cafb22505",
								"fx": 132,
								"fy": 35.5625,
								"x": 132,
								"y": 35.5625,
								"index": 14,
								"level": 0,
								"type": "node"
							},
							//2.2 多个节点
							"nodes":[{},{},{}],
							//2.3 单组关系
							"link":{
								"name": "用户定义—新增关系",
								"source": "31", //(来源节点的id)
								"target":"1" , //(目标节点的id)
								"type": "line"
							},
							//2.4 多组关系
							"links":[{},{},{}]
						}
					}; 
					//"success":true表示回调成功，将数据传到组件中
			},
			//5. 右键选中菜单处理完事件回调函数
			function (type,event,selectedObj,data) {
				console.log(type,event,selectedObj,data)
				return {'success':true,"passData":null}; //"success":true表示回调成功，将数据传到组件中
			}
		)
    }

  }
};
</script>
