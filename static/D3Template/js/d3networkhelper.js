var D3NetworkHelper = function(od3,saveSvg,vueThis) {
	if(this instanceof D3NetworkHelper) {
        var that = this;
        
        var treeCoordinate = new TreeCoordinate();
        var commonUtil = new CommonUtil();
        var calculateLayoutCoordinate = new CalculateLayoutCoordinate();
        
        var d3= od3;//将d3组件传进来
        var saveSvgContainer = saveSvg; //截图模块传进来
        var vueThis = vueThis; //vue实例
        this.vueElemnet = vueThis; //引入的vue，element实例
        
        this.container = "";  //d3作用的容器，传类或id或独立的标签,如：".box" "#box" "div"
		this.svgWidth = 800; //d3画布的宽
        this.svgHeight = 500; //d3画布的高
        this.radian = 10; //圆形节点，设置的半径
        this.layoutFlag = "";  //布局指标coord(坐标布局(默认)),circle圆形布局，rect(矩形布局),tree(树形布局),level(层次布局)
        this.nodetextPosition = []; //节点文字的位置[x,y]
        
        this.linksShowWay = "liner"; //关系线有曲线和折线两种方式，默认是直线（直线：liner, 曲线：curve）

        this.treeMergeShowType = 1;  //设置树形展示类型，1(合并到一个svg)，0(分开多个svg)
        this.selectButtonShow = 1;  //默认显示按钮组，1显示，其他不显示
        this.isShowRightNodeMenu = 1; //节点右键：1显示，其他不显示
        this.isShowRightLineMenu = 1; //关系右键：1显示，其他不显示
        this.isShowRightPanelMenu = 1; //面板右键：1显示，其他不显示
        // this.mouseObjHighlighted = 1;  //是否启动鼠标滑过高亮事件（1高亮，0不高亮）
        this.userColorKpi = 0; //开启节点颜色层次（1开启，0不开启）
        this.isOutsideIncomeLinks = 0;  //是否由外部传关系数据(1:外部传入，0：内部根据节点数据自动生成)
        
		this.mianbanRight = {};  //右键选择面板
        this.rightSelLink = "";  //右键选择的关系菜单
        this.rightSelNode = "";  //右键选择的节点菜单

        this.selLink = null; //选中的关系
        this.selNode = null;  //选中的节点

        this.intSelectNodes = 0; //全选节点数量
        this.intSelectLines = 0;  //全选关系数量
        this.intNodehasNodesArray = [];  //关系-关联节点的数组（筛选以后）
        this.linkNodeArray = [];  //节点-关联节点的数组(筛选以后)

        this.intNodehasLinksArray = []; //当前节点-有多少关系
        this.addFlag = false;  //新增指标

        this.showNodeOnIcon = 0;  //节点支持图标展示,1是启用，0是不启用
	    this.showNodeOnIconSize = 20;  //节点支持图标展示的图标大小
        this.showNodeOnIconOfPath = "../img/"; //默认图片路径path(按照格式，给出存放图片的文件路径)
        this.showNodeTagOnIcon = [that.showNodeOnIconOfPath+"tag2.png","我的标签"];  //节点标签的图标( [图标icon,标签name]  默认是["../img/tag2.png","我的标签"])
        // 自定义图片路径的方法
        this.setShowNodeOnIconOfPath=function(path){
            if (path) {
                that.showNodeOnIconOfPath = path; 
            } else {
                that.showNodeOnIconOfPath = "../img/"; 
            }
            that.showNodeTagOnIcon = [that.showNodeOnIconOfPath+"tag2.png","我的标签"];  //节点标签的图标( [图标icon,标签name]  默认是["../img/tag2.png","我的标签"])
        }
        this.showNodeOnIconOfListObj = []; //节点展示的图标列表：[["高亮图","淡化图"],[],[]...]
        this.defShowNodeOnIconOfListObj = []; //默认节点图标
        this.setShowNodeOnIconOfListObj =function(arr){
            if (arr) {
              that.showNodeOnIconOfListObj = arr;
            }else{
                that.showNodeOnIconOfListObj = [ 
                    [that.showNodeOnIconOfPath+"1.png",that.showNodeOnIconOfPath+"1-1.png"],
                    [that.showNodeOnIconOfPath+"2.png",that.showNodeOnIconOfPath+"2-2.png"],
                    [that.showNodeOnIconOfPath+"3.png",that.showNodeOnIconOfPath+"3-3.png"],
                    [that.showNodeOnIconOfPath+"4.png",that.showNodeOnIconOfPath+"4-4.png"]
                ]
            }
            that.defShowNodeOnIconOfListObj = that.showNodeOnIconOfListObj[0]; //默认节点图标
        }
        this.showMarker = 0;  //关系是否展示箭头(1是显示，0是不显示)
        this.setShowNodeTagOnIcon = function(arr){ //处理初始化
            if (arr) {
                that.showNodeTagOnIcon = arr;
            } else {
                that.showNodeTagOnIcon = [that.showNodeOnIconOfPath+"tag2.png","我的标签"];
            }
        }
        this.showLayer = "systemlayer";  //用户自定义布局还是层次布局（userlayer:用户自定义布局,systemlayer:系统默认布局）
        
        //色板
        this.colorsGraph={
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
        //默认色
        this.defcolors={"highlight":"rgb(55, 162, 218)","light":"rgb(242, 246, 255)"};
        this.graph = {"nodes":[],"links":[]}; //渲染d3的数据
        //初始化数据
        this.setGraph = function(data){ 
            if (data) {
               //1. 节点必要字段
               if (data.nodes&&data.links) {
                   for (let i = 0; i < data.nodes.length; i++) {
                       const element = data.nodes[i];
                       if(!element.id){
                           console.log("下标为"+i+"对象:缺少id，将不被渲染")
                       }
                       if(!element.parentId){
                           console.log("下标为"+i+"对象:缺少parentId，将不能产生关系")
                       }
                   }
                   //2. 处理节点数据(加index,level,nodetag)
                   data.nodes = commonUtil.initDealNodes(data.nodes);

                   //3. 初始化关系判断
                   if (that.isOutsideIncomeLinks==1) {
                       //3.1 处理节点的parentId和level
                       commonUtil.dealLevelOfNode(data);
    
                       //3.1 外部传入关系数组Links:关系处理判断必要字段
                       var noIds = commonUtil.dealLinks(data);
                       if (noIds&&noIds.length>0) {
                           console.log('请检查：关系id ['+noIds+"],在节点中无对应id!")
                           return false;
                       }
                   }else{
                       //2.2 内部产生关系数组Links：根据id-parentId产生关系
                       data.links = [];
                       for (var i = 0; i < data.nodes.length; i++) {
                           var ele1 = data.nodes[i];
                           for (var j=0; j < data.nodes.length; j++) {
                               var obj = {};
                               var ele2 = data.nodes[j];
                               if(ele2.parentId){ //有上下关系
                                   if(ele2.parentId == ele1.id&&ele1.id!=ele1.parentId&&ele2.id!=ele2.parentId){
                                       obj.target = ele2.id;
                                       obj.source = ele1.id;
                                       obj.type = "line";
                                       obj.name = i+"->"+j;
                                       data.links.push(obj);
                                       // that.graph.links.push(obj);
                                   }
                               }
                           }
                       }
                       // that.graph.links = that.deteleRepeatObjectOfArray(that.graph.links);  //数组关系去重
                       data.links = commonUtil.deteleRepeatObjectOfArray(data.links); //数组关系去重
                   }

                   //4. 处理颜色块，为高亮准备
                   commonUtil.initDealColor(data,that.userColorKpi,d3);

                   //5. 布局初始化
                   if(that.showLayer == "userlayer"){ 
                       //用户定义布局
                       that.graph = data;
                   } else if(that.showLayer == "systemlayer"){ 
                       //系统默认布局（显示层次布局）
                       that.changeInitLayaout()
                       that.graph = calculateLayoutCoordinate.coordLayout(data,that.container,that.radian,that.svgHeight);
                       that.layoutFlag="level";
                   } 
               }
            }else{
                that.graph = {"nodes":[],"links":[]}
                console.log('节点关系数据提取为空！')
                return false;
            }
        };
        //节点关系的文字颜色(默认是#666)
        this.linksTextColor = "#666";
        //节点的文字颜色(默认是#666)
        this.nodesTextColor = "#666";


        //按钮组列表
        this.containerButtonGroupList = [
            {"class": "reDrawSvg", "name": "刷新"},
            {"class": "jietuCanvasPng", "name": "截图"},
            {"class": "changeInitLayaout", "name": "层次布局"},
            {"class": "changeCircleLayaout", "name": "圆形布局"},
            {"class": "changeRectLayaout", "name": "矩形布局"},
            {"class": "changeTreeLayaout", "name": "树形布局"}
        ];
        //节点列表
        this.rOperateNodeMenuList = [
            {"class": "addLinksNode", "name": "新增关系节点"},
            {"class": "addLinks", "name": "新增关系"},
            {"class": "delCurClickNode", "name": "删除节点"},
            {"class": "associatedNode", "name": "节点关联节点"},
            {"class": "reviewNode", "name": "查看当前节点"},
            {"class": "addNodeTag", "name": "添加标签"},
            {"class": "cancelNodeTag", "name": "取消标签"}
        ];
        //关系列表
        this.rOperateLineMenuList = [
            {"class": "delCurClickLine", "name": "删除关系"},
            {"class": "associatedLine", "name": "关系关联节点"},
        ];
        //面板列表
        this.rOperatePanelMenuList = [
            {"class": "futureNode", "name": "全选节点"},
            {"class": "futureLine", "name": "全选关系"},
            {"class": "addCurNode", "name": "新增独立节点"},
        ];

        this.creatDialogType = "system"; //customer:用户自己创建弹窗, system:系统创建

        this.clickLeftThings = null; //左键回调
        this.clickRightBeforeThings = null; //右键点击回调前
        this.clickRightAfterThings = null;  //右键点击回调后

        

        //接收回调事件
        this.creatNodeFuction=function(creatDialogType,clickLeftThings,clickRightBeforeThings,clickRightAfterThings,rightMenuListObj){
            that.creatDialogType = creatDialogType; //创建弹窗方式
            that.clickLeftThings = clickLeftThings; //左键回调
            that.clickRightBeforeThings = clickRightBeforeThings; //右键回调
            that.clickRightAfterThings = clickRightAfterThings; //点击左右键，回调事件
            if(rightMenuListObj){
                //节点右键菜单
                rightMenuListObj.rOperateNodeMenuList?that.rOperateNodeMenuList=rightMenuListObj.rOperateNodeMenuList:that.rOperateNodeMenuList=that.rOperateNodeMenuList;
                //关系右键菜单
                rightMenuListObj.rOperateLineMenuList?that.rOperateLineMenuList=rightMenuListObj.rOperateLineMenuList:that.rOperateLineMenuList=that.rOperateLineMenuList;
                //面板右键菜单
                rightMenuListObj.rOperatePanelMenuList?that.rOperatePanelMenuList=rightMenuListObj.rOperatePanelMenuList:that.rOperatePanelMenuList=that.rOperatePanelMenuList;
            }
        };

        //点击回调事件
        this.callbackClickFn=function(dThis){ 
            //1.左击行为
            if (d3.event.button==0) {
                if (d3.event.target.localName=="svg") { 
                    // //1.1面板
                    if (commonUtil.isFunc(that.clickLeftThings)) {
                        that.clickLeftThings("click_panel",d3.event,dThis);
                    }
                }else if (d3.event.target.localName=="circle"||d3.event.target.localName=="image") {
                    //1.1节点
                    if (commonUtil.isFunc(that.clickLeftThings)) {
                        that.clickLeftThings("click_node",d3.event,dThis);
                    }
                }else if (d3.event.target.localName=="line"){ 
                    //1.2关系
                    if (commonUtil.isFunc(that.clickLeftThings)) {
                        that.clickLeftThings("click_line",d3.event,dThis);
                    }
                }
                d3.event.preventDefault();
                d3.event.stopPropagation();
                //return false阻止系统自带的菜单，return false必须写在最后，否则自定义的右键菜单也不会出现
                return false;
            }else if(d3.event.button==2) {
            //2.右击行为
                if (d3.event.target.localName=="svg"||d3.event.target.localName=="rect") { 
                    //2.1面板
                    if (that.isShowRightPanelMenu==1) { //（1:显示菜单，0：不显示菜单）
                        that.popUpPanelMenuList(dThis);
                    }
                }else if (d3.event.target.localName=="circle"||d3.event.target.localName=="image") { 
                    //2.2节点
                    if (that.isShowRightNodeMenu==1) { //（1:显示菜单，0：不显示菜单）
                        that.popUpNodeMenuList(); 
                    }
                }else if (d3.event.target.localName=="line"){ 
                    //2.3关系
                    if (that.isShowRightLineMenu==1) { //（1:显示菜单，0：不显示菜单）
                        that.popUpNodeMenuList();
                    }

                }
                d3.event.preventDefault();
                d3.event.stopPropagation();
                //return false阻止系统自带的菜单，return false必须写在最后，否则自定义的右键菜单也不会出现
                return false;
            }
        };
        //右键菜单点击回调事件
        this.callbackToUserDataInFun=function(e,parentContainerClass){
            var event = e;
            var type = event.target.className;
            var data = null; 
            var selectData = null; //选择对象
            //1. 右键菜单点击
            if (event.button==0) {
                if (event.target.className=="futureNode") {
                    //1.1 全选节点
                    if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                        data = that.clickRightBeforeThings(type,e,that.graph.nodes);
                        selectData = that.graph.nodes;
                    }
                    if (data && data.success == true) {
                        that.futureNode();
                    }
                }else if (event.target.className=="futureLine") {
                    //1.2 全选关系
                    if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                        data = that.clickRightBeforeThings(type,e,that.graph.links);
                        selectData = that.graph.links;
                    }
                    if (data && data.success == true) {
                        that.futureLine(parentContainerClass);
                    }

                }else if (event.target.className=="associatedNode") {
                    //1.3 节点关联节点
                    if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                        if (that.rightSelNode) {
                            that.selectNodeFun(that.intNodehasLinksArray,that.rightSelNode); //筛选出相关的节点
                        }
                        data = that.clickRightBeforeThings(type,e,that.rightSelNode,that.linkNodeArray);
                        selectData = that.rightSelNode;
                    }
                    if (data && data.success == true) {
                        that.associatedNode(parentContainerClass);
                    }
                }else if (event.target.className=="associatedLine") {
                    //1.4 关系关联节点
                    if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                        data = that.clickRightBeforeThings(type,e,that.rightSelLink,that.intNodehasNodesArray);
                        selectData = that.rightSelLink;
                    }
                    if (data && data.success == true) {
                        that.associatedLine(parentContainerClass);
                    }
                }else if (event.target.className=="delCurClickNode") {
                    //1.5 删除节点
                    if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                        data = that.clickRightBeforeThings(type,e,that.rightSelNode);
                        selectData = that.rightSelNode;
                    }
                    if (data && data.success == true) {
                        that.delCurClickNode(parentContainerClass);
                    }

                }else if (event.target.className=="delCurClickLine") {
                    //1.6 删除关系
                    if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                        data = that.clickRightBeforeThings(type,e,that.rightSelLink);
                        selectData = that.rightSelLink;
                    }
                    if (data && data.success == true) {
                        that.delCurClickLine(parentContainerClass);
                    }

                }else if (event.target.className=="addCurNode") {
                    //1.7 新增独立节点
                    //1) 系统新建弹窗(system)
                    if (that.creatDialogType=="system") {
                        //1.7.1弹窗
                        that.addCurNode(parentContainerClass);
                        //1.7.2 确认新增节点
                        $("."+parentContainerClass+"_submitAddNodeForm").unbind(); 
                        $("."+parentContainerClass+"_submitAddNodeForm").click(function(){
                            if (that.userInfoNewNode(parentContainerClass)) {
                                //1.7.2.1获取新增节点的信息
                                var newNode = that.userInfoNewNode(parentContainerClass); 
                                //1.7.2.2新增确认前新增节点的回调
                                if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                                    data = that.clickRightBeforeThings(type,e,newNode);
                                    selectData = newNode;
                                }
                                if (data && data.success == true) {
                                    that.saveNodeDialogData(newNode,parentContainerClass);
                                }

                                //1.7.2.3 执行完成后,回调
                                if (commonUtil.isFunc(that.clickRightAfterThings)) {
                                    that.clickRightAfterThings(type,event,data,selectData);
                                }
                            }
                        }) 
                    } else {
                        //2) 用户自定义弹窗(customer)
                        that.hiddenPanelMenuList();
                        var newNode = null; //新增对象
                        d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "crosshair"); //修改鼠标样式为"+"
                        that.addFlag = true;  //新增开
                        d3.select('.svg_'+parentContainerClass+"_containerSvg").on('click', function() {
                            if(that.addFlag){
                                that.addFlag =false;
                                if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                                    //1.7.1.1 新增确认前新增节点的回调
                                    data = that.clickRightBeforeThings(type,e,that.rightSelNode);
                                    data&&data.passData.node?selectData=data.passData.node:selectData="";
                                }
                            }
                            if (data && data.success == true) {
                                newNode=selectData;
                                that.saveNodeDialogData(newNode,parentContainerClass);
                            }
                            //1.7.1.2 执行完成后,回调
                            if (commonUtil.isFunc(that.clickRightAfterThings)) {
                                that.clickRightAfterThings(type,event,data,selectData);
                            }
                        })
                        that.rightSelNode = ""; //清除右键选择
                    }
                    
                }else if (event.target.className=="addLinksNode") {
                    //1.8 新增关系节点

                    //1)系统新建弹窗(system)
                    if (that.creatDialogType=="system") {
                        //1.8.1 弹窗
                        that.addLinksNode(parentContainerClass);
                        //1.8.2 确认新增关系节点
                        $("."+parentContainerClass+"_submitAddNodeForm").unbind(); 
                        $("."+parentContainerClass+"_submitAddNodeForm").click(function(){
                            if (that.userInfoNewNode()) {
                                //1.8.2.1 获取新增节点的信息
                                var newNode = that.userInfoNewNode(parentContainerClass); 
                                //1.8.2.2 新增确认前新增节点的回调
                                if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                                    data = that.clickRightBeforeThings(type,e,newNode);
                                    selectData = newNode;
                                }
                                if (data && data.success == true) {
                                    that.saveNodeDialogData(newNode,parentContainerClass);
                                }
                                //1.8.2.3 执行完成后,回调
                                if (commonUtil.isFunc(that.clickRightAfterThings)) {
                                    that.clickRightAfterThings(type,event,data,selectData);
                                }
                            }
                        }) 
                    } else {
                        //2) 用户自定义弹窗(customer)
                        that.hiddenPanelMenuList();
                        var newNode = null; //新增对象
                        if(that.rightSelNode != ""){  //右键选中的节点
                            d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "default"); //修改鼠标样式为"+"
                            if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                                data = that.clickRightBeforeThings(type,e,that.rightSelNode);
                                data&&data.passData.node?selectData=data.passData.node:selectData="";
                            }
                            if (data && data.success == true) {
                                newNode=selectData;
                                newNode.parentId = that.rightSelNode.id;
                                that.saveNodeDialogData(newNode,parentContainerClass);
                            }
                            //1.7.1.2 执行完成后,回调
                            if (commonUtil.isFunc(that.clickRightAfterThings)) {
                                that.clickRightAfterThings(type,event,data,selectData);
                            }
                        }
                    }
                }else if (event.target.className=="addLinks") {
                    //1.9 新增关系
                    // console.log("1",JSON.parse(JSON.stringify(that.graph.nodes)))
                    //1)系统新建弹窗(system)
                    if (that.creatDialogType=="system") {
                        //1.9.1 弹窗
                        that.addLinks(parentContainerClass);
                        //1.9.2 确认新增关关系
                        $("."+parentContainerClass+"_submitAddLineForm").unbind(); 
                        $("."+parentContainerClass+"_submitAddLineForm").click(function(){

                            var sourceId =  $('#'+parentContainerClass+'_lineSource').val(); //来源value
                            var addLineName =  $('.'+parentContainerClass+'_addLineName').val(); //来源name
                            var targetId =  $('#'+parentContainerClass+'_lineTarget').find("option:selected").val();; //目标value

                            //1.9.2.1 获取新增节点的信息
                            var newLineObj = that.userInfoNewLineFromNode(sourceId,targetId,addLineName); 
                            //1.9.2.2 新增确认前新增节点的回调
                            if (newLineObj||JSON.stringify(newLineObj)=="{}") { //不能构成回路
                                if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                                    data = that.clickRightBeforeThings(type,e,newLineObj);
                                    selectData = newLineObj;
                                }
                                if (data && data.success == true) {
                                    that.saveLineDialogData(parentContainerClass,newLineObj);
                                }
                                //1.9.2.3 执行完成后,回调
                                if (commonUtil.isFunc(that.clickRightAfterThings)) {
                                    that.clickRightAfterThings(type,event,selectData,data);
                                }
                            }
                        }) 

                    }else{
                        //2) 用户自定义弹窗(customer)
                        that.hiddenPanelMenuList();
                        if(that.rightSelNode != ""){  //右键选中的节点
                            d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "default"); //修改鼠标样式为"+"
                            var name = "";
                            //1.9.3.1 新增确认前新增关系的回调
                            if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                                data = that.clickRightBeforeThings(type,e,that.rightSelNode);
                                data&&data.passData.link?selectData=data.passData.link:selectData="";
                            }
                            if (data && data.success == true) {
                                sourceId = selectData.source;
                                targetId = selectData.target;
                                
                                if(selectData.name){
                                    name = selectData.name;
                                }
                                selectData = that.userInfoNewLineFromNode(sourceId,targetId,name); 
                                that.saveLineDialogData(parentContainerClass,selectData);
                            }
                            //1.9.3.2 执行完成后,回调
                            if (commonUtil.isFunc(that.clickRightAfterThings)) {
                                that.clickRightAfterThings(type,event,data,selectData);
                            }
                        }
                    }

                }else if (event.target.className=="reviewNode") {
                    //1.10 查看当前节点

                    var showArray = that.reviewNode(parentContainerClass,that.userColorKpi,that.showLayer);
                    if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                        data = that.clickRightBeforeThings(type,e,showArray);
                    }

                }else if(event.target.className=="addNodeTag"){
                    //1.11 添加节点标签
                    if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                        data = that.clickRightBeforeThings(type,e,that.rightSelNode);
                    }
                    if (data && data.success == true) {
                        selectData = that.addNodeTag(); //返回当前已加入标签的数组
                    }
                }else if(event.target.className=="cancelNodeTag"){
                    //1.12 取消节点标签
                    if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                        data = that.clickRightBeforeThings(type,e,that.rightSelNode);
                    }
                    if (data && data.success == true) {
                        selectData = that.cancelNodeTag();
                    }
                }else{
                    //1.13 不执行任何点击操作
                    if (commonUtil.isFunc(that.clickRightBeforeThings)) {
                        if (that.rightSelLink) {
                            data = that.clickRightBeforeThings(type,e,that.rightSelLink);
                        }else if(that.rightSelNode){
                            data = that.clickRightBeforeThings(type,e,that.rightSelNode);
                        }else{
                            data = that.clickRightBeforeThings(type,e);
                        }
                    }
                }

                //2. 执行完成后,回调(新增节点，新增关系，都是点击按钮以后才执行回调)
                if (event.target.className!="addCurNode"&&event.target.className!="addLinksNode"&&event.target.className!="addLinks") {
                    if (commonUtil.isFunc(that.clickRightAfterThings)) {
                        that.clickRightAfterThings(type,event,data,selectData);
                    }
                }
            }
        };


		//初始化执行绘画
		this.init=function(creatDialogType,rightMenuListObj,clickLeftThings,clickRightBeforeThings,clickRightAfterThings){
            //构造vue绑定ele元素,如果外部传入就不必实例，否则就在内部实例一个
            if(vueThis==null||vueThis==undefined||vueThis==""||vueThis==" "){
                that.vueElemnet = new Vue({
                    el: that.container,
                    data:function(){
                        return{}
                    },
                    mounted(){},
                    methods:{}
                })
            }else{
                that.vueElemnet = vueThis;
            }
            
            //初始化回调
            that.creatNodeFuction(creatDialogType,clickLeftThings,clickRightBeforeThings,clickRightAfterThings,rightMenuListObj);
            
            //创建元素容器
			that.createContainerHtml(that.container);
            
            //有按钮减去按钮高度
           if(that.selectButtonShow==1){that.svgHeight=that.svgHeight-36;}

           //准备容器
           that.initContainer(that.svgWidth,that.svgHeight);

		};
		//为画布准备容器
		this.initContainer=function(width,height,datas){
            
            var parentContainerClass = that.container.substr(1,that.container.length-1)
            var svgContainerClass = parentContainerClass+"_containerSvg";
            var svgContainer = "."+svgContainerClass;
            if ($("#id_"+svgContainerClass)) {
                d3.selectAll("#id_"+svgContainerClass).remove();//清空已经绘图的元素
            }
            //树形布局
            var height2 = height*0.7;
			if(that.layoutFlag == "tree"&&datas){
				for(var index=0;index<datas.length;index++){
                    var list = datas[index];
                    //2. 生成关系
                    if (that.isOutsideIncomeLinks==0) {
                        //2.1内部生产
                        for (var i = 0; i < list.nodes.length; i++) {
                            var ele1 = list.nodes[i];
                            for (var j=0; j < list.nodes.length; j++) {
                                var obj = {};
                                var ele2 = list.nodes[j];
                                if(ele2.parentId){ //有上下关系
                                    if(ele2.parentId == ele1.id&&ele1.id!=ele1.parentId&&ele2.id!=ele2.parentId){
                                        obj.target = ele2.id;
                                        obj.source = ele1.id;
                                        obj.type = "line";
                                        obj.name = ele1.index+"-"+ele2.index;
                                        list.links.push(obj);
                                    }
                                }
                            }
                        }
                    }else{
                        //2.2外部传递(已处理)
                    }
                    if(datas.length>1){
                        //多棵树
                        that.drawSvg(width,height2,svgContainerClass,svgContainer,parentContainerClass,list);
                    }else{
                    	//一棵树
                        that.drawSvg(width,height,svgContainerClass,svgContainer,parentContainerClass,list);
                    }
                }
			}else{
				//其他布局
				that.drawSvg(width,height,svgContainerClass,svgContainer,parentContainerClass);
			}
		};
		//画布绘画
		this.drawSvg=function(svgWidth,svgHeight,svgContainerClass,container,parentContainerClass,list){ //svg宽，svg高，svgId,svg所属容器，list处理过的树形数据
            var graph = {};
			if(that.layoutFlag == "tree"){ //树形布局
                list?graph = list:graph = that.graph; //{nodes:[],links:[]}
            }else{ //其他布局
                graph = that.graph;
            }

            //开始绘画
            //1.创建svg画布
            

            var svg = d3.select(container)
                .append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("class","svg_"+svgContainerClass)
                .attr("id", "id_"+svgContainerClass)
                .attr("fill","#fff")
                .on("contextmenu", function () {
                    let [x,y] = d3.mouse(this);
                    var panel = this;
                    that.mianbanRight = panel;  //面板右键指标{}
                    that.rightSelLink = "";  //关系右键选择的菜单""
                    that.rightSelNode = "";  //右键选择的菜单""
                    that.showMenuList(parentContainerClass); //右键菜单内容
                    // that.popUpPanelMenuList(d3,panel,x,y);
                    that.callbackClickFn(panel);
                })
                .on("click",function(){
                    var panel = this;
                    that.callbackClickFn(panel);
                    
                })
            
            //截图背景
            svg
                .append('rect')
                .attr('x',0)
                .attr('y',0)
                .attr('width',svgWidth)
                .attr('height',svgHeight)
                .attr('fill',"#fff")
            

            //2.新建一个力导向图
            var force = d3.forceSimulation()     //新建一个力导向图， d3.forceSimulation().force(name)  name是一个参数，也是一种力
                    .force("charge", d3.forceManyBody())   //d3.forceSimulation().force(),添加或者移除一个力
                    // .force("center", d3.forceCenter(width / 2, height / 2))   //设置图形的中心位置
                    .nodes(graph.nodes)       //d3.forceSimulation().nodes()，输入是一个数组，然后将这个输入的数组进行一定的数据转换
                    .force("link", d3.forceLink(graph.links)
                    .distance(0)  //设置边的距离200//d3.forceLink.links()，这里输入的也是一个数组（边集），然后对输入的边集进行转换
                    .strength(function (link) { return 0 }) //设置力之间的强度函数,影响拖拽
                    .id((d, i) => d.id)
                )
                .on("tick", tick)   //tick函数，这个函数对于力导向图来说非常重要，因为力导向图是不断运动的，每一时刻都在发生更新，所以需要不断更新节点和连线的位置

			//3.设置线条箭头
            var marker = svg.append("marker")
                .attr("id", "line")
                .attr("markerUnits", "userSpaceOnUse")
                .attr("viewBox", "0 -6 12 10") //坐标系的区域(箭头区域)
                .attr("refX", 18) //箭头坐标
                .attr("refY", 0)
                .attr("markerWidth", 12) //标识的大小
                .attr("markerHeight", 12)
                .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
                .attr("stroke-width", 1) //箭头宽度
                .append("path")
                .attr("d", "M0,-5L10,0L0,5") //箭头的路径
                .attr('fill', '#dbe5f9') //箭头颜色

            //4. 绘制边线关系(有了节点和边的数据后)- 直线或曲线
            if(this.linksShowWay=="liner"){
                //4.1 绘制直线
                var links_g = svg.append("g").attr("class","links_g")  //关系容器
                var svg_links = links_g
                    .selectAll(".link")
                    .data(graph.links)
                    .enter()
                    .append("line")
                    .attr("class", "nodeline")
                    if (that.showMarker==1) { //显示箭头
                        svg_links.each(function(){
                            d3.select(this).attr("marker-end", "url(#line)") //根据箭头标记的id号标记箭头
                        })
                    }
            }else if(this.linksShowWay=="curve"){
                //4.2 绘制曲线
                var links_g = svg.append("g").attr("class","links_g")  //关系容器
                var svg_links = links_g
                    .selectAll("path")
                    .data(graph.links)
                    .enter()
                    .append("path")
                    .attr("class", "nodeline")
                    that.dragBSELine(svg_links);  //绘制曲线
            }
            svg_links
                //点击关系
                .on("click", function(line,i) {
                    that.nodeLinkSetHighNohasTrsanform(); //让所有的节点和文字高亮
                    that.selLink = line; //选中的关系
                    that.intSelectNodes = 0; //全选节点数量
                    that.intSelectLines = 0;  //全选关系数量
                    that.selNode = "";  //选中的节点
                    that.rightSelNode = "";  //右键选择节点清空
                    that.rightSelLink = "";  //右键选择关系清空
                    that.mianbanRight = {};  //面板右键指标
                    
                    that.callbackClickFn(line); //点击回调
                    that.mouseClickLineEvent(this,line); //鼠标点击，加标识
                    that.nodeHighLight(this); //标识节点高亮

                    //关联的数据
                    that.intNodehasNodesArray = [];
                    line.source?that.intNodehasNodesArray.push(line.source):"";
                    line.target?that.intNodehasNodesArray.push(line.target):"";
                })
                //鼠标滑过关系，样式变化
                .on("mouseover",function(d){
                    d3.select(this).attr("stroke-width", 4)
                })
                .on("mouseout",function(d){
                    d3.select(this).attr("stroke-width", 2)
                })
                //关系右键菜单
                .on("contextmenu", function (line) {
                    //自定义的菜单显示
                    that.rightSelLink = line;  //关系右键
                    that.rightSelNode = "";  //右键选择的节点菜单
                    that.mianbanRight = {};  //面板右键指标
                    that.showMenuList(parentContainerClass); //右键菜单内容
                    that.callbackClickFn(); //右键回调

                    that.intNodehasNodesArray = [];
                    line.source?that.intNodehasNodesArray.push(line.source):"";
                    line.target?that.intNodehasNodesArray.push(line.target):"";
                })
            
            //5.绘制节点
            var nodes_g = svg.append("g").attr("class","nodes_g") //节点容器
            var svg_nodes_g = nodes_g
                .selectAll(".node")
                .data(graph.nodes)
                .enter()
                .append("g")
                .attr("class", "a_node_g")

                // svg.append('rect')
                //     .attr({
                //         'x': 0,
                //         'y': 0,
                //         'width': width,
                //         'height': height,
                //         'fill': colors.background,
                //         'stroke': colors.backgroundStroke,
                //         'cursor': 'crosshair'
                //     })

                // 添加节点的拖拽事件，同时他会触发simulation的tick事件，重新布局该区域
                .call(d3.drag()
                    .on('start', function (d) {
                        if (!d3.event.active) {
                            //这个方法可以用在交互时重新启动仿真，比如拖拽了某个节点，重新进行布局。这个必须要进行设置不然会拖动不了
                            // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
                            force.alphaTarget(0.1).restart();
                        }
                        d.fx = d.x;    //节点当前默认位置（x - 节点当前的x位置，如果要为某个节点设置默认的位置，则需要为该节点设置如下两个属性:fx =x位置）
                        d.fy = d.y;
                        //更新曲线
                        if(that.linksShowWay=="curve"){
                            that.dragBSELine(svg_links); 
                        }
                    })
                    .on('drag', function (d) {
                        d.fx = d3.event.x;   //拖动时，设置拖动后默认位置的x，y
                        d.fy = d3.event.y; 
                        //更新曲线
                        if(that.linksShowWay=="curve"){
                            that.dragBSELine(svg_links); 
                        }
                    })
                    .on('end', function (d) {
                        if (!d3.event.active) {
                            force.alphaTarget(0);
                        }
                        //更新曲线
                        if(that.linksShowWay=="curve"){
                            that.dragBSELine(svg_links); 
                        }
                        // d.fx = null;
                        // d.fy = null;
                    })
                )

                //点击节点
                .on("click", function(node) {
                    // console.log("点击节点",this,node)
                    that.nodeLinkSetHighNohasTrsanform(); //让所有的节点和文字高亮
                    that.hiddenPanelMenuList();
                    that.selNode = node;
                    that.intSelectNodes = 0; //全选节点数量
                    that.intSelectLines = 0;  //全选关系数量
                    that.intNodehasLinksArray = [];  //当前节点有多少关系数组
                    that.selLink = null; //选中的关系
                    that.rightSelNode = "";  //右键选择节点清空
                    that.rightSelLink = "";  //右键选择关系清空
                    that.mianbanRight = {};  //面板右键指标

                    that.callbackClickFn(node);

                    that.mouseClickNodeEvent(this,node); //鼠标点击，加标识
                    that.nodeHighLight(this); //标识节点高亮


                })
                //节点右键菜单
                .on("contextmenu", function (node) {
                    //自定义的菜单显示
                    var evtX = d3.event.x - $(container).offset().left + 10;
                    var evtY = d3.event.y - $(container).offset().top + 10;
                    that.rightSelNode = node;  //节点右键
                    that.rightSelLink = "";  //右键选择的关系菜单
                    that.mianbanRight = {};  //面板右键指标
                    that.showMenuList(parentContainerClass); //右键菜单内容
                    that.callbackClickFn(); //右键回调

                    that.intNodehasLinksArray = [];  //清空关联的节点
                    svg_links.each(function(line){
                        if(line.source.name==node.name || line.target.name==node.name){  //当与连接点连接时变粗 
                            that.intNodehasLinksArray.push(line);
                        }
                    })
                })
                //双击节点
                .on("dblclick",function(d){
                })
                //节点展示类型
                if (that.showNodeOnIcon==1) {
                    //1. 节点支持图标展示
                    var svg_nodes = svg_nodes_g
                        .append("image")
                        .attr("class","node nodeImage")
                        .attr("height",that.showNodeOnIconSize+"px")
                        .attr("width",that.showNodeOnIconSize+"px")
                        .attr("href",function(d){
                            var arg = d["userIcon"];
                            return arg ? arg[0] : that.defShowNodeOnIconOfListObj[0] ;
                        })

                        //鼠标滑过节点，样式变化
                    svg_nodes
                        .on("mouseover",function(d){ //鼠标移入
                            d3.select(this).attr("height",that.showNodeOnIconSize+5+"px")
                            d3.select(this).attr("width",that.showNodeOnIconSize+5+"px")
                            if (this.localName=="image") {
                                d3.select(this).attr("href",function(d){
                                    var arg = d["userIcon"];
                                    return arg ? arg[0] : that.defShowNodeOnIconOfListObj[0] ;
                                })
                            }
                        })
                        .on("mouseout",function(d){ //鼠标移除
                            d3.select(this).attr("width",that.showNodeOnIconSize+"px")
                            d3.select(this).attr("height",that.showNodeOnIconSize+"px")
                            if (this.localName=="image") {
                                if (this.className.baseVal=="node nodeImage node_active"||this.className.baseVal=="node nodeImage") {
                                    d3.select(this).attr("href",function(d){
                                        var arg = d["userIcon"];
                                        return arg ? arg[0] : that.defShowNodeOnIconOfListObj[0] ;
                                    })
                                } else {
                                    d3.select(this).attr("href",function(d){
                                        var arg = d["userIcon"];
                                        return arg ? arg[1] : that.defShowNodeOnIconOfListObj[1] ;
                                    })
                                }
                            }
                        })
                        
                } else {
                    //2. 节点设置圆圈形状 
                    var svg_nodes = svg_nodes_g
                        .append("circle")    
                        .attr("class", "node nodeCircle")                 
                        .attr("r", that.radian)    //半径

                    //鼠标滑过节点，样式变化
                    svg_nodes
                        .on("mouseover",function(d){
                            d3.select(this).attr("r", that.radian+5)
                            if (this.localName=="circle") {
                                d3.select(this).attr("fill",d.userColor);
                            }
                        })
                        .on("mouseout",function(d){
                            d3.select(this).attr("r", that.radian)
                            if (this.className.baseVal=="node nodeCircle node_active"||this.className.baseVal=="node nodeCircle") {
                                d3.select(this).attr("fill",d.userColor)
                            } else {
                                d3.select(this).attr("fill",d.userColorDesalt)
                            }
                        })

                    //开启节点颜色层次
                    d3.selectAll(".node").each(function(c){
                        if (c.userColor) {
                            d3.select(this).attr("fill",c.userColor);
                            // d3.select(this).attr("fill",c.userColorDesalt);
                        }
                    })
                }

                //6.设置节点文字
                var nodes_text = svg_nodes_g
                    .append("text")
                    .attr("x", 12)
                    .attr("dy", ".35em")
                    .attr("class","nodetext")
                    .attr("fill",that.nodesTextColor)
                    .text(function(d) { return d.name; });

                //6.设置节点文字
                // var nodes_text = svg.selectAll("text")
                //         .data(graph.nodes)
                //         .enter()
                //         .append("text")
                //         .style("fill","#666")
                //         .style("font-size","12")
                //         .attr("class","nodetext")
                //         .text(function(d){
                //             return d.name;
                //         })
                //节点文字位置
                if(that.nodetextPosition.length>0){
                    //用户自定义
                    var text_x ,text_y;
                    that.nodetextPosition[0]? text_x = that.nodetextPosition[0]:text_x = 0;
                    that.nodetextPosition[1]? text_y = that.nodetextPosition[1]:text_y = 0;
                    nodes_text
                        .attr("dx",text_x)   //中心位置偏移x
                        .attr("dy",text_y)   //中心位置偏移y
                }else{
                    //系统定义
                    if (that.layoutFlag==""||that.layoutFlag=="coord") {
                        nodes_text
                        .attr("dx",11)   //中心位置偏移x
                        .attr("dy",5)   //中心位置偏移y
                    } else if (that.layoutFlag=="tree"){
                        nodes_text
                        .attr("dx",-12)   //中心位置偏移x
                        .attr("dy",21)   //中心位置偏移y
                    } else if (that.layoutFlag=="circle"){
                        nodes_text
                        .attr("dx",function(d){
                            if (d.x>500) {
                                return 11;
                            } else {
                                return -38;
                            }
                        })   //中心位置偏移x
                        .attr("dy",function(d){
                            if (d.x>500) {
                                return 5;
                            } else {
                                return -13;
                            }
                        })   //中心位置偏移x
                    } else if (that.layoutFlag=="rect"){
                        nodes_text
                        .attr("dx",-12)   //中心位置偏移x
                        .attr("dy",21)   //中心位置偏移y
                    } else if(that.layoutFlag=="level"){
                        nodes_text
                        .attr("dx",12)   //中心位置偏移x
                        .attr("dy",10)   //中心位置偏移y
                    } 
                }

                //节点标签
                var nodes_tag = svg_nodes_g
                    .append("image")
                    .attr("class","nodetag")
                    .attr("height",function(d){
                        if (d.nodeTagImage) {
                            return "14px";
                        }else{
                            return "0"
                        }
                    })
                    .attr("width",function(d){
                        if (d.nodeTagImage) {
                            return "14px";
                        }else{
                            return "0"
                        }
                    })
                    .attr("xlink:href",function(d){
                        if (d.nodeTagImage) {
                            return d.nodeTagImage;
                        } else {
                            return ""
                        }
                    })
                

                //7.设置线条文字  
                var links_text_g = svg.append("g").attr("class","links_text_g") //节点关系容器
                var links_text = links_text_g
                    .selectAll(".linetext")                           
                    .data(graph.links)                           
                    .enter()                           
                    .append("text")                           
                    .attr("class","linetext")                     
                    .style("fill",that.linksTextColor) 
                    .attr("dx",2)   //中心位置偏移x
                    .attr("dy",-2)   //中心位置偏移y                    
                    .text(function(d){
                        return d.name;                           
                    })


                //8.实时更新绘制信息(更新节点坐标位置)
                function tick() {
                    //线条位置
                    svg_links.attr("x1", function (d) {return d.source.x;})
                        .attr("y1", function (d) {return d.source.y;})
                        .attr("x2", function (d) {return d.target.x;})
                        .attr("y2", function (d) {return d.target.y;});

                    //节点位置
                    svg_nodes
                        .attr("cx", function (d) {
                            d.fx = d.x;  //固定位置
                            return d.x;
                        })
                        .attr("x", function (d) {
                            d.fx = d.x;  //固定位置
                            return (d.x-that.radian-1);
                        })
                        .attr("cy", function (d) {
                            d.fy = d.y;  //固定位置
                            return d.y;
                        })
                        .attr("y", function (d) {
                            d.fy = d.y;  //固定位置
                            return (d.y-that.radian-1);
                        })

                    //节点文字位置
                    nodes_text.attr("x", function(d){ return d.x; })
                        .attr("y", function(d){ return d.y; });
                    
                    //图标
                    nodes_tag
                        .attr("x", function(d){ return (d.x-4); })
                        .attr("cx", function(d){ return (d.x-4); })
                        .attr("y", function(d){ return (d.y-that.radian*2-8); })
                        .attr("cy", function(d){ return (d.y-that.radian*2-8); })


                    //更新连接线上文字的位置            
                    links_text.attr("x",function(d){ return (d.source.x + d.target.x)/2;})          
                        .attr("y",function(d){ return (d.source.y + d.target.y)/2;});
                }
                // 9.保存当前缩放的属性值
                svg.call(
                    d3.zoom()   // 创建缩放行为
                    .scaleExtent([0.2, 3])  //设置缩放范围 1是初始化大小
                    .on('zoom', () => {     //将缩放行为应用到选中的元素上。
                        var transform = d3.event.transform;    // 改变选中元素的仿射变换。
                        svg_nodes.attr('transform', transform);
                        svg_links.attr("transform",transform);
                        nodes_text.attr("transform",transform);
                        nodes_tag.attr("transform",transform);
                        links_text.attr("transform",transform);
                        //zoom.translateBy - 平移。
                        var parentContainerClass = that.container.substr(1,that.container.length-1)+"_containerSvg";
                        that.hiddenPanelMenuList(); //隐藏菜单
                    }))
                    .on('dblclick.zoom', null); //双击缩放，去掉
                    // console.log('tag', that.graph.nodes)

		};

		//面板右键,调出菜单列表
		this.popUpPanelMenuList=function(dThis){
            that.hiddenPanelMenuList();  //隐藏菜单
            var evtX = d3.event.pageX - $(that.container).offset().left - 10;
            var evtY = d3.event.pageY - $(that.container).offset().top - 10;
            that.rightSelNode = "";  //右键选择节点清空
            that.rightSelLink = "";  //右键选择关系清空
            var rightContainer = "."+that.container.substr(1,that.container.length-1)+"_rightMenu";
            if(dThis.name == undefined || dThis.name == null){  //面板右键
                $(rightContainer).css("left",evtX + 30 + "px").css("top",evtY + 60 + "px").css("display","block");
            }
            d3.event.preventDefault();
            d3.event.stopPropagation();
            //return false阻止系统自带的菜单，
            //return false必须写在最后，否则自定义的右键菜单也不会出现
            return false;
		};
		//节点&关系右键,调出菜单列表
		this.popUpNodeMenuList=function(){
            that.hiddenPanelMenuList();  //隐藏菜单
            var evtX = d3.event.pageX - $(that.container).offset().left - 10;
            var evtY = d3.event.pageY - $(that.container).offset().top - 10;
            var rightContainer = "."+that.container.substr(1,that.container.length-1)+"_rightMenu";
            //让自定义菜单随鼠标的箭头位置移动
            $(rightContainer).css("left",evtX + 30 + "px").css("top",evtY + 60 + "px").css("display","block");
            d3.event.preventDefault();
            d3.event.stopPropagation();
            //return false阻止系统自带的菜单，return false必须写在最后，否则自定义的右键菜单也不会出现
            return false;
		};
		//隐藏右键的菜单列表
		this.hiddenPanelMenuList=function(){
            var parentContainerClass= that.container.substr(1,that.container.length-1);
            $("."+parentContainerClass+"_rightMenu").css("display","none");
            d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "default"); //修改鼠标样式由"+"转为默认样式
		};

		//创建html (按钮组,svg画布，弹窗)
		this.createContainerHtml=function(parentContainer){
            //自定义容器类
            var parentContainerClass= parentContainer.substr(1,parentContainer.length-1);
            //创建一个button 容器
			if(that.selectButtonShow==1){ //显示按钮
				if($("."+parentContainerClass+"_cButton").length==0){
					var btnGroupHtml=$('<div class="containerButton '+parentContainerClass+'_cButton"></div>');
                    var btnHtml = "";
                    for (let i = 0; i < that.containerButtonGroupList.length; i++) {
                        const element = that.containerButtonGroupList[i];
                        if(element.class=='addCurNode'){
                            btnHtml += '<button class="c_btn c_logbtn '+parentContainerClass+'_cButton_'+element.class+'">'+element.name+'</button>'
                        }else{
                            btnHtml += '<button class="c_btn '+parentContainerClass+'_cButton_'+element.class+'">'+element.name+'</button>'
                        }
                    }
					$(parentContainer).append(btnGroupHtml);
					$("."+parentContainerClass+'_cButton').append(btnHtml)
				}
            }
            
			//创建一个svg 容器
			if($("."+parentContainerClass+"_containerSvg").length==0){
                var svgHtml = "";
				svgHtml += '<div class="containerSvg '+parentContainerClass+'_containerSvg"></div>';
				$(parentContainer).append(svgHtml);
			}

			//创建右键菜单列表
			if($("."+parentContainerClass+'_rightMenu').length==0){
                var rightMenuHtml = "";
                rightMenuHtml += '<div class="rightMenu '+parentContainerClass+'_rightMenu"></div>';
                $(parentContainer).append(rightMenuHtml);

                var menu1Html = ""; //节点
                var menu2Html = ""; //关系
                var menu3Html = ""; //面板

                if(that.isShowRightNodeMenu==1){ //1显示
                    menu1Html += '<ul class="'+parentContainerClass+'_nodemenulist">'
                    for (let i = 0; i < that.rOperateNodeMenuList.length; i++) {
                        const element = that.rOperateNodeMenuList[i];
                        menu1Html += '<li class="'+element.class+'">'+element.name+'</li>'
                    }
                    $("."+parentContainerClass+'_rightMenu').append(menu1Html);
                }
                if(that.isShowRightLineMenu == 1){ //1显示
                    menu2Html += '<ul class="'+parentContainerClass+'_linemenulist">'
                    for (let i = 0; i < that.rOperateLineMenuList.length; i++) {
                        const element = that.rOperateLineMenuList[i];
                        menu2Html += '<li class="'+element.class+'">'+element.name+'</li>'
                    }
                    $("."+parentContainerClass+'_rightMenu').append(menu2Html);
                }
                if(that.isShowRightPanelMenu == 1){ //1显示
                    menu3Html += '<ul class="'+parentContainerClass+'_panelmenulist">'
                    for (let i = 0; i < that.rOperatePanelMenuList.length; i++) {
                        const element = that.rOperatePanelMenuList[i];
                        menu3Html += '<li class="'+element.class+'">'+element.name+'</li>'
                    }
                    $("."+parentContainerClass+'_rightMenu').append(menu3Html);
                }
            }
            
            //新增节点弹窗
            if($("."+parentContainerClass+"_addNodeDialog").length==0){
                var dialogNodeHtml = '';
                dialogNodeHtml += '<div class="addNodeDialog '+parentContainerClass+'_addNodeDialog">'
                dialogNodeHtml +=       '<div class="dialogContainerDiv">'
                dialogNodeHtml +=           '<header class="dialog_header"><div class="dialog_header_title">新增节点</div><a class="dialogClose">关闭</a></header>'
                dialogNodeHtml +=           '<div class="add_form">'
                dialogNodeHtml +=               '<div class="add_item"><span class="addNodeLabel">节点名称：</span><input type="text" class="addNodeContent '+parentContainerClass+'_addNodeName" name="name"></input></div>'
                if(that.isOutsideIncomeLinks == 1){
                    //外部传入节点，提供关系name
                    dialogNodeHtml += '<div class="add_item add_item'+parentContainerClass+'_addNodeLineName"><span class="addNodeLabel">关系名称：</span><input type="text" class="addNodeContent '+parentContainerClass+'_addNodeLineName" name="name"></input></div>'
                }
                dialogNodeHtml +=               '<div class="add_item"><span class="addNodeLabel">节点坐标x：</span><input type="text" class="addNodeContent '+parentContainerClass+'_addNodeCoordX" name="coordX"></input></div>'
                dialogNodeHtml +=               '<div class="add_item"><span class="addNodeLabel">节点坐标y：</span><input type="text" class="addNodeContent '+parentContainerClass+'_addNodeCoordY" name="coordY"></input></div>'
                dialogNodeHtml +=               '<div class="add_node_btns">'
                dialogNodeHtml +=                       '<button type="button" class="c_btn '+parentContainerClass+'_submitAddNodeForm">确定</button>'
                dialogNodeHtml +=                       '<button type="button"  class="c_btn dialogClose2">取消</button>'
                dialogNodeHtml +=                '</div>'
                dialogNodeHtml +=           '</div>'
                dialogNodeHtml +=       '</div>'
                dialogNodeHtml +=  '</div>'
                $(parentContainer).append(dialogNodeHtml)
            }

            //新增关系弹窗
            if($("."+parentContainerClass+"_addLineDialog").length==0){
                that.updataSelectOptions(that.graph.nodes,parentContainer,parentContainerClass);
            }

            //查看当前节点
            if($("."+parentContainerClass+"_nodesShowDialog").length==0){
                var nodesShowHtml = "";
                nodesShowHtml += '<div class="nodesShowDialog '+parentContainerClass+'_nodesShowDialog">';
                nodesShowHtml += '<div class="nodesShowDialogDiv">';
                nodesShowHtml += '<header class="showDialog_box_title"><div class="showDialog_box_title_left">节点信息展示</div><a class="showDialog_close '+parentContainerClass+'_closeThisShowDialog">关闭</a></header>';
                nodesShowHtml += '<div class="nodesShowDialogSvg '+parentContainerClass+'_nodesShowDialogSvg"></div>';
                nodesShowHtml += '</div>';
                nodesShowHtml += '</div>';
                $(parentContainer).append(nodesShowHtml)
            }

			//给按钮绑定事件
            that.menuListOnEvent(parentContainerClass);
            

        };
        //新增关系弹窗，要更新下拉值
        this.updataSelectOptions=function(arr,parentContainer,parentContainerClass){
            $("."+parentContainerClass+"_addLineDialog").remove();
            var dialogLineHtml = "";
            dialogLineHtml += '<div class="addLineDialog '+parentContainerClass+'_addLineDialog">'
            dialogLineHtml += '<div class="dialogContainerDiv"><header class="dialog_header"><div class="dialog_header_title">新增关系</div><a class="dialogClose">关闭</a></header>'
            dialogLineHtml += '<div class="add_form">'
            dialogLineHtml += '<div class="add_item"><span class="addNodeLabel">来源节点：</span>'
            dialogLineHtml += '<select class="lineSelcet '+parentContainerClass+'_lineSource" id="'+parentContainerClass+'_lineSource" name="'+parentContainerClass+'_lineSource">'
            for (var i = 0; i < arr.length; i++) {
                var element = arr[i];
                dialogLineHtml+='<option value="'+element.id+'">'+element.name+'</option>'
            }
            dialogLineHtml += '</select></div>'
            if(that.isOutsideIncomeLinks == 1){
                //外部传入节点，提供关系name
                dialogLineHtml +='<div class="add_item"><span class="addNodeLabel">关系名称：</span><input type="text" class="lineName '+parentContainerClass+'_addLineName" name="name"></input></div>'
            }
            dialogLineHtml += '<div class="add_item"><span class="addNodeLabel">目标节点：</span>'
            dialogLineHtml += '<select class="lineSelcet '+parentContainerClass+'_lineTarget" id="'+parentContainerClass+'_lineTarget" name="">'
            for (var i = 0; i < arr.length; i++) {
                var element = arr[i];
                dialogLineHtml+='<option value="'+element.id+'">'+element.name+'</option>'
            }
            dialogLineHtml += '</select></div>'
            dialogLineHtml += '<div class="add_node_btns"><button type="button" class="c_btn '+parentContainerClass+'_submitAddLineForm">确定</button>'
            dialogLineHtml += '<button type="button" class="c_btn dialogClose2">取消</button></div>'
            dialogLineHtml += '</div></div></div>'
            $(parentContainer).append(dialogLineHtml)
            commonUtil.showDialogClose(parentContainerClass); //更新关闭按钮监听
            
        };
		//给按钮&菜单绑定事件
		this.menuListOnEvent=function(parentContainerClass){
            //单击右键菜单列表
            $("."+parentContainerClass+'_rightMenu').click(function(e){
                that.callbackToUserDataInFun(e,parentContainerClass)
            })
			//双击面板恢复原状样式
            $("."+parentContainerClass+"_containerSvg").dblclick(function(){that.dblclickMianban()})
            
            //关闭当前查看的窗口
            $("."+parentContainerClass+"_closeThisShowDialog").click(function(){that.closeThisShowDialog(parentContainerClass)})

			//刷新
            $('.'+parentContainerClass+'_cButton_'+'reDrawSvg').click(function(){that.reDrawSvg(parentContainerClass)})
            //截图
            $('.'+parentContainerClass+'_cButton_'+'jietuCanvasPng').click(function(){that.jietuCanvasPng(parentContainerClass)})
			//切换为坐标布局
			$('.'+parentContainerClass+'_cButton_'+'changeInitLayaout').click(function(){that.changeInitLayaout(parentContainerClass)})
			//切换为圆形布局
			$('.'+parentContainerClass+'_cButton_'+'changeCircleLayaout').click(function(){that.changeCircleLayaout(parentContainerClass)})
			//切换为圆形布局
            $('.'+parentContainerClass+'_cButton_'+'changeRectLayaout').click(function(){that.changeRectLayaout(parentContainerClass)})
            //树形布局
            $('.'+parentContainerClass+'_cButton_'+'changeTreeLayaout').click(function(){that.changeTreeLayaout(parentContainerClass)})

            //弹窗关闭事件
            commonUtil.showDialogClose(parentContainerClass);

		};

		//判断当前右键菜单列表的显示内容
		this.showMenuList=function(parentContainerClass){
			//节点右键
			if(that.rightSelNode!=""){
				$("."+parentContainerClass+"_nodemenulist").show();
				$("."+parentContainerClass+"_linemenulist").hide();
				$("."+parentContainerClass+"_panelmenulist").hide();
			}
			//关系右键
			if(that.rightSelLink!=""){
				$("."+parentContainerClass+"_nodemenulist").hide();
				$("."+parentContainerClass+"_linemenulist").show();
				$("."+parentContainerClass+"_panelmenulist").hide();
			}
			//面板右键
			if(JSON.stringify(that.mianbanRight) != '{}'){
				$("."+parentContainerClass+"_nodemenulist").hide();
				$("."+parentContainerClass+"_linemenulist").hide();
				$("."+parentContainerClass+"_panelmenulist").show();
			}
		};
		//重绘-刷新
        this.reDrawSvg=function(parentContainerClass){
            that.hiddenPanelMenuList(); //隐藏右键菜单
            var svgContainer = ".svg_"+parentContainerClass+"_containerSvg";
            //再次渲染
            if(that.layoutFlag == "tree"){  //树形布局
                that.changeTreeLayaout();
            }else{
                //先计算坐标，清空布局，再渲染
                if(that.layoutFlag == "circle"){  //圆形布局
                    calculateLayoutCoordinate.circleLayout(that.graph,svgContainer);
                }else if(that.layoutFlag == "rect"){ //矩形布局
                    calculateLayoutCoordinate.rectLayout(that.graph,svgContainer,that.radian);
                }else if(that.layoutFlag == "coord"||that.layoutFlag == "level"){ //坐标布局
                    calculateLayoutCoordinate.coordLayout(that.graph,svgContainer,that.radian);
                }
                that.initContainer(that.svgWidth,that.svgHeight);
            }

            that.selNode = null;  //已选择节点
            that.selLink = null;  //已选择线条
            that.rightSelNode = "";  //右键选择节点清空
            that.rightSelLink = "";  //右键选择关系清空
            that.mianbanRight = {};  //面板右键指标
        };
		//切换为圆形布局
        this.changeCircleLayaout=function(parentContainerClass){
            var svgContainer = ".svg_"+parentContainerClass+"_containerSvg";
            that.value = "";  //清除搜索框的值
            that.selNode = null;  //已选择节点
            that.selLink = null;  //已选择线条
            that.hiddenPanelMenuList(); //隐藏右键菜单
            that.layoutFlag = "circle";  //圆形布局
            that.nodeLinkSetHighNohasTrsanform(); //所有元素高亮
            calculateLayoutCoordinate.circleLayout(that.graph,svgContainer);
            that.initContainer(that.svgWidth,that.svgHeight);  //that.graph.nodes源数据
        };
        //切换为矩形布局
        this.changeRectLayaout=function(parentContainerClass){
            var svgContainer = ".svg_"+parentContainerClass+"_containerSvg";
            that.value = "";  //清除搜索框的值
            that.selNode = null;  //已选择节点
            that.selLink = null;  //已选择线条
            that.layoutFlag = "rect";  //矩形布局
            that.hiddenPanelMenuList(); //隐藏右键菜单
            that.nodeLinkSetHighNohasTrsanform(); //所有元素高亮

            calculateLayoutCoordinate.rectLayout(that.graph,svgContainer,that.radian);
            that.initContainer(that.svgWidth,that.svgHeight);  //that.graph.nodes源数据
        },
        //切换为层次布局
        this.changeInitLayaout=function(parentContainerClass){
            var svgContainer = ".svg_"+parentContainerClass+"_containerSvg";
            that.value = "";  //清除搜索框的值
            that.selNode = null;  //已选择节点
            that.selLink = null;  //已选择线条
            that.layoutFlag = "level";  //根据坐标布局
            that.hiddenPanelMenuList(); //隐藏右键菜单
            that.nodeLinkSetHighNohasTrsanform();  //所有元素高亮
            that.graph = calculateLayoutCoordinate.coordLayout(that.graph,svgContainer,that.radian);
            that.initContainer(that.svgWidth,that.svgHeight); //绘图
            
            // console.log(JSON.parse(JSON.stringify(that.graph)))
        },
        //切换为树形布局
        this.changeTreeLayaout=function(){
            that.value = "";  //清除搜索框的值
            that.selNode = null;  //已选择节点
            that.selLink = null;  //已选择线条
            that.layoutFlag = "tree";
            var graphNodes = that.changeCoordinates(that.graph); // 设置树形数据坐标
            that.changeRgbColorObj(graphNodes); //处理节点的颜色
            var graphNodesArr = [];
            if (that.isOutsideIncomeLinks==0) {
                //内部计算生成links
                for (let i = 0; i < graphNodes.length; i++) {
                    const element = graphNodes[i];
                    var obj = {
                        "nodes":element,
                        "links":[]
                    }
                    graphNodesArr.push(obj);
                }
            }else{
                //外部传递links
                for (let i = 0; i < graphNodes.length; i++) {
                    const element = graphNodes[i];
                    var obj = {
                        "nodes":element,
                        "links":commonUtil.outSideLink_add2(that.graph) //重新计算links
                    }
                    graphNodesArr.push(obj);
                }
            }
            that.initContainer(that.svgWidth,that.svgHeight,graphNodesArr);  //that.graph.源数据数组
            // console.log(JSON.parse(JSON.stringify(that.graph)) )
        };
        //将树形数据转为平面数据，计算树形数据的坐标，返回数组
        this.changeCoordinates=function(graph){
            var treeList = (commonUtil.arrToTreeData("id","parentId",graph.nodes)).treeNodes; //树形数据
            if ((commonUtil.arrToTreeData("id","parentId",graph.nodes)).loopArr.length>0) {
                var loopArr = (commonUtil.arrToTreeData("id","parentId",graph.nodes)).loopArr;
                console.log("注意:id为"+loopArr+"的节点产生回路，跟其关联的数据无法构成树形布局，将不展示在页面，可切换其他布局或更改数据指向，抱歉！")
            }
            var nodesArr = [];
            if(that.treeMergeShowType == 1){ //树：1合并到一个svg
                var arr = []
                treeCoordinate.xName="x";//x轴坐标字段名
                treeCoordinate.yName="y";//y轴坐标字段名
                treeCoordinate.levelName="level";//层级字段名
                treeCoordinate.xLen=$(that.container).width()?$(that.container).width()-(that.radian*2)-4:1000;//可用x轴长度
                treeCoordinate.yLen=$(that.container).height()?$(that.container).height()-(that.radian)*2-4:1000;//可用y轴长度(减去节点的半价)
                // treeCoordinate.tree=allTree; //数据 确定初试坐标
                treeCoordinate.treeMergeShowType=1;
                treeCoordinate.allTree(treeList);
                treeCoordinate.calculate(treeCoordinate.tree,0); //数据 确定计算的树形具体坐标
                var	drawTemplate = treeCoordinate.getDrawTemplate();
                    drawTemplate.startNodeXLen=10; //节点半径x
                    drawTemplate.startNodeYLen=10;  //节点半径y
                    treeCoordinate.draw(drawTemplate); //当前计算是的第几棵树
                arr = commonUtil.treeToArray(treeCoordinate.tree,"children","lastChildNum"); //将树形数据转为平面数据
                nodesArr.push(arr.filter(item =>
                    item.name != treeCoordinate.tmpName
                ))
                

            }else{
                //0分开多个svg展示
                for (var i = 0; i < treeList.length; i++) {
                    var ele = treeList[i];
                    treeCoordinate.xName="x";//x轴坐标字段名
                    treeCoordinate.yName="y";//y轴坐标字段名
                    treeCoordinate.levelName="level";//层级字段名

                    if(treeList.length>1){ //两棵树，渲染高度变70%
                        var scale = 0.7;
                    }else{
                        var scale = 1;
                    }
                    treeCoordinate.xLen=$(that.container).width()?$(that.container).width()-100:1000;//可用x轴长度
                    treeCoordinate.yLen=$(that.container).height()?($(that.container).height()-100)*scale:1000;//可用y轴长度(减去节点的半价)
                    treeCoordinate.treeMergeShowType="0";
                    treeCoordinate.tree=ele; //数据 确定初试坐标
                    treeCoordinate.calculate(ele,0); //数据 确定计算的树形具体坐标
                    var	drawTemplate = treeCoordinate.getDrawTemplate();
                        drawTemplate.startNodeXLen=10; //节点半径x
                        drawTemplate.startNodeYLen=10;  //节点半径y
                        treeCoordinate.draw(drawTemplate); //当前计算是的第几棵树
                    nodesArr.push(commonUtil.treeToArray(ele,"children","lastChildNum")); //将树形数据转为平面数据
                }
            }
            
            return nodesArr;
        };

        //查看当前节点
        this.reviewNode=function(parentContainerClass){
            $("."+parentContainerClass+"_nodesShowDialog").show();
            that.hiddenPanelMenuList(); //清空右键菜单
            var curNodetreeList = commonUtil.getOneArrToTreeData("id","parentId",that.graph.nodes,that.rightSelNode.id); //树形数据
            var nodesList = commonUtil.treeToArray(curNodetreeList[0],"children","lastChildNum"); //将树形数据转为平面数据
            
            that.changeRgbColorObj([nodesList]); //处理节点的颜色

            //实例化（
            var getD3NetworkHelperInside = $.fn.getD3NetworkHelper(d3,saveSvg,vueThis);  //是否在vue,element项目使用组件，如果是，一定要传此参数，将vue实例传到组件）
            getD3NetworkHelperInside.userColorKpi = that.userColorKpi;  //开启颜色层次(0默认不开启,1默认开启)
            getD3NetworkHelperInside.colorsGraph = that.colorsGraph; //色板
            getD3NetworkHelperInside.creatDialogType = that.creatDialogType;  //customer:用户自己创建弹窗, system:系统创建
            getD3NetworkHelperInside.linksShowWay = that.linksShowWay;  //关系线有曲线和折线两种方式，默认是直线（直线：liner, 曲线：curve）
            getD3NetworkHelperInside.radian = that.radian;  //圆形节点，设置的半径
            getD3NetworkHelperInside.layoutFlag = that.layoutFlag;   //布局指标coord(坐标布局(默认)),circle圆形布局，rect(矩形布局),tree(树形布局),level(层次布局)
            getD3NetworkHelperInside.container = that.container+"_nodesShowDialogSvg"; //取到容器的类或id或独立的标签
            getD3NetworkHelperInside.showLayer = that.showLayer; //用户自定义布局还是层次布局（userlayer:用户自定义布局,systemlayer:系统默认布局）
            getD3NetworkHelperInside.svgWidth = that.svgWidth;  //画布的宽
            getD3NetworkHelperInside.svgHeight = that.svgHeight;  //画布的高
            getD3NetworkHelperInside.setGraph({"nodes":nodesList,"links":[]}); //渲染的数据
			getD3NetworkHelperInside.nodetextPosition=that.nodetextPosition; //用户定义节点文字的位置[x,y],
            getD3NetworkHelperInside.showNodeOnIcon = that.showNodeOnIcon; //节点支持图标展示(定义z组件js链接的路径,一个高亮图，一个淡化图)
			getD3NetworkHelperInside.showNodeOnIconOfListObj = that.showNodeOnIconOfListObj;//节点展示的图标列表：[["高亮图","淡化图"],[],[]...] (定义组件js链接的路径,一个高亮图，一个淡化图)
            getD3NetworkHelperInside.showNodeTagOnIcon = that.showNodeTagOnIcon; //节点标签的图标( [图标icon,标签name]  默认是["../img/tag2.png","我的标签"])
            getD3NetworkHelperInside.showNodeOnIconSize = that.showNodeOnIconSize;  //节点支持图标展示的图标大小
            getD3NetworkHelperInside.linksTextColor = that.linksTextColor; //节点关系的文字颜色(默认是#666)
            getD3NetworkHelperInside.nodesTextColor = that.nodesTextColor;//节点的文字颜色(默认是#666)
            getD3NetworkHelperInside.treeMergeShowType = that.treeMergeShowType;  //设置树形展示类型，1(合并到一个svg)，0(分开多个svg)
            getD3NetworkHelperInside.selectButtonShow = that.selectButtonShow;  //默认显示按钮组，1显示，其他不显示
            getD3NetworkHelperInside.isShowRightNodeMenu = that.isShowRightNodeMenu; //节点右键：1显示，其他不显示
            getD3NetworkHelperInside.isShowRightLineMenu = that.isShowRightLineMenu; //关系右键：1显示，其他不显示
            getD3NetworkHelperInside.isShowRightPanelMenu = that.isShowRightPanelMenu; //面板右键：1显示，其他不显示
            getD3NetworkHelperInside.containerButtonGroupList = that.containerButtonGroupList; //按钮组
            getD3NetworkHelperInside.rightMenuListObj = that.rightMenuListObj; //右键菜单组
            //初始化执行绘画,      
            getD3NetworkHelperInside.init(
                //1. 弹窗创建方式（system：系统创建新增弹窗，customer:用户自己创建弹窗）
                "system",
                //2. 右键菜单
                that.rightMenuListObj,
                //3. 点击事件回调函数
                function (type,event,selectedObj) {
                    console.log(type,event,selectedObj)
                    return {
                        'success':true
                    }
                },
                //4. 右键选中菜单事件
                function (type,event,selectedObj,data) {
                    console.log(type,event,selectedObj,data)
                    return {
                        'success':true
                    }
                },
                //5. 右选中菜单处理完事件
                function (type,event,selectedObj,data) {
                    console.log(type,event,selectedObj,data)
                    return {
                        'success':true
                    }
                }
            )

            return nodesList;


        };
        //关闭当前查看弹窗
        this.closeThisShowDialog=function(parentContainerClass){
            $("."+parentContainerClass+"_nodesShowDialog").hide();
            that.hiddenPanelMenuList(); //清空右键菜单
            
            d3.selectAll(".node").classed("node_active",false).classed("node_noactive",false);
            d3.selectAll(".nodeline").classed("nodeline_active",false).classed("nodeline_noactive",false);
            that.dblclickMianban(); //恢复原状
        };
        //删除节点操作
        this.delCurClickNode=function(parentContainerClass){
            d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "default"); //修改鼠标样式由"+"转为默认样式
            that.addFlag = false;  //新增关
            if(that.rightSelNode!=""){  //右键菜单
                var nodeName = that.rightSelNode.name;
                that.vueElemnet.$confirm(`此操作将删除[ ${nodeName} ]并且删除其关联关系, 是否继续?`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //1. 删除节点及关系
                    that.graph.nodes = commonUtil.delClickNodeThisfc(that.rightSelNode,that.graph);

                    //2. 生成关系
                    if (that.isOutsideIncomeLinks==0) {
                        //内部生成关系
                        that.graph.links = [];
                        for (var i = 0; i < that.graph.nodes.length; i++) {
                            var ele1 = that.graph.nodes[i];
                            for (var j=0; j < that.graph.nodes.length; j++) {
                                var obj = {};
                                var ele2 = that.graph.nodes[j];
                                if(ele2.parentId){ //有上下关系
                                    if(ele2.parentId == ele1.id&&ele1.id!=ele1.parentId&&ele2.id!=ele2.parentId){
                                        obj.target = ele2.id;
                                        obj.source = ele1.id;
                                        obj.type = "line";
                                        obj.name = ele1.index+"-"+ele2.index;
                                        that.graph.links.push(obj);
                                    }
                                }
                            }
                        }
                    } else {
                        //外部传递关系
                        that.graph.links = commonUtil.outSideLink(that.graph,that.rightSelNode);
                    }

                    //3. 处理节点数据(加index,level,nodetag)
                    that.graph.nodes = commonUtil.initDealNodes(that.graph.nodes);
                    //4. 处理颜色块，为高亮准备
                    commonUtil.initDealColor(that.graph,that.userColorKpi,d3);
                    console.log('tag', that.graph)


                    that.selNode = "";  //清除已选节点
                    that.nodeLinkSetHighNohasTrsanform(); // 节点高亮
                    if(that.layoutFlag == "tree"){
                        that.changeTreeLayaout();
                    }else{
                        that.initContainer(that.svgWidth,that.svgHeight,that.container);
                    }
                    that.vueElemnet.$message({
                        showClose: true,
                        message: '删除成功!',
                        type: 'success'
                    });
                }).catch(() => {
                    that.vueElemnet.$message({
                        showClose: true,
                        message: '已取消删除',
                        type: 'info'
                    });
                })
            }
            that.hiddenPanelMenuList();   //隐藏右键菜单
        };
        //删除关系操作
        this.delCurClickLine=function(parentContainerClass){
            d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "default"); //修改鼠标样式由"+"转为默认样式
            that.addFlag = false;  //新增关
            var lineName = that.rightSelLink.name;
            that.vueElemnet.$confirm(`此操作将删除[ ${lineName} ]关系, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    //1. 删除关系
                    commonUtil.delClickLineThisfc(that.rightSelLink,that.graph); 

                    //2. 生成关系
                    if (that.isOutsideIncomeLinks==0) {
                        //内部生成关系
                        that.graph.links = [];
                        for (var i = 0; i < that.graph.nodes.length; i++) {
                            var ele1 = that.graph.nodes[i];
                            for (var j=0; j < that.graph.nodes.length; j++) {
                                var obj = {};
                                var ele2 = that.graph.nodes[j];
                                if(ele2.parentId){ //有上下关系
                                    if(ele2.parentId == ele1.id&&ele1.id!=ele1.parentId&&ele2.id!=ele2.parentId){
                                        obj.target = ele2.id;
                                        obj.source = ele1.id;
                                        obj.type = "line";
                                        obj.name = ele1.index+"-"+ele2.index;
                                        that.graph.links.push(obj);
                                    }
                                }
                            }
                        }
                    } else {
                        //外部传递关系
                        that.graph.links = commonUtil.outSideLink(that.graph,that.rightSelLink);
                    }


                    //3. 处理节点数据(加index,level,nodetag)
                    that.graph.nodes = commonUtil.initDealNodes(that.graph.nodes);
                    //4. 处理颜色块，为高亮准备
                    commonUtil.initDealColor(that.graph,that.userColorKpi,d3);
                    
                    that.selLink = null;  //选中的节点关系
                    that.nodeLinkSetHighNohasTrsanform(); // 节点高亮
                    if (that.layoutFlag == "tree") {
                        that.changeTreeLayaout();
                    } else {
                        that.initContainer(that.svgWidth,that.svgHeight,that.container);
                    }
                    that.vueElemnet.$message({
                        showClose: true,
                        message: '删除成功!',
                        type: 'success'
                    });
                }).catch(() => {
                that.vueElemnet.$message({
                    showClose: true,
                    message: '已取消删除',
                    type: 'info'
                });
            });
            that.hiddenPanelMenuList();   //隐藏右键菜单
        };
        //添加标签
        this.addNodeTag=function(){
            var nodeCopy = JSON.parse(JSON.stringify(that.rightSelNode));
            for (let i = 0; i < that.graph.nodes.length; i++) {
                const element = that.graph.nodes[i];
                if (element.id==that.rightSelNode.id) {
                    element["nodeTagImage"] = that.showNodeTagOnIcon[0];
                    element["nodeTagName"] = that.showNodeTagOnIcon[1];
                }else{
                    if (element["nodeTagImage"]==that.showNodeTagOnIcon[0]) {
                        element["nodeTagImage"]=that.showNodeTagOnIcon[0];
                        element["nodeTagName"] = that.showNodeTagOnIcon[1];
                    } else {
                        element["nodeTagImage"]="";
                        element["nodeTagName"] = "";
                    }
                }
            }
            //处理颜色块，为高亮准备
            commonUtil.initDealColor(that.graph,that.userColorKpi,d3);
            that.nodeLinkSetHighNohasTrsanform(); // 节点高亮
            if (that.layoutFlag == "tree") {
                that.changeTreeLayaout();
            } else {
                that.initContainer(that.svgWidth,that.svgHeight,that.container);
            }

            var nodeTagArray = []; //标签组
            for (let i = 0; i < that.graph.nodes.length; i++) {
                const ele = that.graph.nodes[i];
                if (ele.nodeTagName==that.showNodeTagOnIcon[1]) {
                    nodeTagArray.push(ele)
                }
            }
            that.hiddenPanelMenuList();
            if (nodeCopy.nodeTagName&&nodeCopy.nodeTagName!="") {
                that.vueElemnet.$message({
                    showClose: true,
                    message: '节点标签已存在! 标签名称：'+that.showNodeTagOnIcon[1],
                    type: 'info'
                });
            }else{
                that.vueElemnet.$message({
                    showClose: true,
                    message: '添加成功! 标签名称：'+that.showNodeTagOnIcon[1],
                    type: 'success'
                });
            }
            return nodeTagArray;
        };
        //取消标签
        this.cancelNodeTag=function(){
            var nodeCopy = JSON.parse(JSON.stringify(that.rightSelNode));
            for (let i = 0; i < that.graph.nodes.length; i++) {
                const element = that.graph.nodes[i];
                if (element.id==that.rightSelNode.id) {
                    element["nodeTagImage"]= "";
                    element["nodeTagName"]= "";
                }
            }
            //处理颜色块，为高亮准备
            commonUtil.initDealColor(that.graph,that.userColorKpi,d3);
            that.nodeLinkSetHighNohasTrsanform(); // 节点高亮
            if (that.layoutFlag == "tree") {
                that.changeTreeLayaout();
            } else {
                that.initContainer(that.svgWidth,that.svgHeight,that.container);
            }
            
            var nodeTagArray = []; //标签组
            for (let i = 0; i < that.graph.nodes.length; i++) {
                const ele = that.graph.nodes[i];
                if (ele.nodeTagName==that.showNodeTagOnIcon[1]) {
                    nodeTagArray.push(ele)
                }
            }
            that.hiddenPanelMenuList();
            if (nodeCopy.nodeTagName&&nodeCopy.nodeTagName!="") {
                that.vueElemnet.$message({
                    showClose: true,
                    message: '取消成功! 标签名称：'+that.showNodeTagOnIcon[1],
                    type: 'success'
                });
            } else {
                that.vueElemnet.$message({
                    showClose: true,
                    message: "当前节点 ["+nodeCopy.name+"] 无标签！",
                    type: 'info'
                });
            }
            
            return nodeTagArray;
        };
        //新增独立节点
        this.addCurNode=function(parentContainerClass){
            that.hiddenPanelMenuList();
            that.rightSelNode = ""; //清除右键选择
            d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "crosshair"); //修改鼠标样式为"+"
            that.addFlag = true;  //新增开
            d3.select('.svg_'+parentContainerClass+"_containerSvg").on('click', function() {
                let [x, y] = d3.mouse(this);
                if(x != "" && y != ""){ //先选择坐标
                    if(that.addFlag){
                        $("."+parentContainerClass+"_addNodeName").val(""), //新节点名称
                        $("."+parentContainerClass+"_addNodeLineName").val(""), //新节点关系名称
                        $("."+parentContainerClass+"_addNodeCoordX").val(x), //新节点(给定x坐标)
                        $("."+parentContainerClass+"_addNodeCoordY").val(y), //新节点(给定固定位置y坐标)
                        $('.add_item'+parentContainerClass+'_addNodeLineName').hide(); //不用关系名称 
                        $("."+parentContainerClass+"_addNodeDialog").fadeIn();
                        that.addFlag = false;  //新增关
                    }
                }
            })
        };
        //新增关联节点
        this.addLinksNode=function(parentContainerClass){
            that.hiddenPanelMenuList();
            
            if(that.rightSelNode != ""){  //右键选中的节点
                d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "crosshair"); //修改鼠标样式为"+"
                var [x, y] = [parseInt(that.rightSelNode.x),parseInt(that.rightSelNode.y)];
                var legendValuex = parseInt(Math.random()*200);  //随机加增的标尺
                legendValuex<50?legendValuex+50:"";
                var legendValuey = parseInt(Math.random()*200);  //随机加增的标尺
                legendValuey<50?legendValuey+50:"";
                if(x != "" && y != ""){
                    $("."+parentContainerClass+"_addNodeName").val(""), //新节点名称
                    $("."+parentContainerClass+"_addNodeLineName").val(""), //新节点关系名称
                    $("."+parentContainerClass+"_addNodeCoordX").val(x+legendValuex), //新节点(给定x坐标)
                    $("."+parentContainerClass+"_addNodeCoordY").val(y+legendValuey), //新节点(给定固定位置y坐标)
                    $('.add_item'+parentContainerClass+'_addNodeLineName').show(); //关系名称
                    $("."+parentContainerClass+"_addNodeDialog").fadeIn();
                }
            }
        };
        //用户输入新增的节点，点击确定之前
        this.userInfoNewNode=function(parentContainerClass){
            var newNode = {
                name:$("."+parentContainerClass+"_addNodeName").val(), //新节点信息(给定固定位置x坐标)
                fx:Number($("."+parentContainerClass+"_addNodeCoordX").val()), //新节点信息(给定固定位置x坐标)
                x:Number($("."+parentContainerClass+"_addNodeCoordX").val()), //新节点信息(给定x坐标)
                fy:Number($("."+parentContainerClass+"_addNodeCoordY").val()), //新节点信息(给定固定位置y坐标)
                y:Number($("."+parentContainerClass+"_addNodeCoordY").val()), //新节点信息(给定y坐标)
                index:that.graph.nodes.length,  //当前对象下标
                id:"add_"+commonUtil.guid(),  //当前对象id
                userColor:that.defcolors.highlight,  //当前对象节点高亮颜色
                userColorDesalt:that.defcolors.light,  //当前对象节点淡化色
                type:"node", //新节点信息类型
                isNew:true
            };
            delete newNode.coordX;
            delete newNode.coordY;

            if(that.rightSelNode==""){ //独立节点
                newNode.parentId = "";
                // newNode.parentId = "pid_"+newNode.id;
                newNode.level = 0;  //独立节点的层级默认0
            }else{
                newNode.parentId = that.rightSelNode.id;  //新增对象的父id
                newNode.level = that.rightSelNode.level + 1;  //节点的层级
            }
            return newNode;
        };
        //确认新增节点的信息
        this.saveNodeDialogData=function(newNode,parentContainerClass){
            var svgContainer = ".svg_"+parentContainerClass+"_containerSvg";
            //系统定义弹窗
            if (that.creatDialogType=="system") {
                if ($("."+parentContainerClass+"_addNodeName").val()=="") {
                    that.vueElemnet.$message({
                        showClose: true,
                        message: '节点名称不能为空！',
                        type: 'warning'
                    });
                    return false;
                } else {
                    that.graph.nodes.push(newNode);  //节点追加 - 关系节点是对象
                }
            } else {
                //用户自定义弹窗
                newNode?that.graph.nodes.push(newNode):"";  //节点追加 - 关系节点是对象
            }

            //1. 更新下拉值
            that.updataSelectOptions(that.graph.nodes,that.container,parentContainerClass);
            
            //2. 生成关系
            if (that.isOutsideIncomeLinks==0) {
                //2.1 内部生成关系
                that.graph.links = [];
                for (var i = 0; i < that.graph.nodes.length; i++) {
                    var ele1 = that.graph.nodes[i];
                    for (var j=0; j < that.graph.nodes.length; j++) {
                        var obj = {};
                        var ele2 = that.graph.nodes[j];
                        if(ele2.parentId){ //有上下关系
                            if(ele2.parentId == ele1.id&&ele1.id!=ele1.parentId&&ele2.id!=ele2.parentId){
                                obj.target = ele2.id;
                                obj.source = ele1.id;
                                obj.type = "line";
                                obj.name = ele1.index+"-"+ele2.index;
                                that.graph.links.push(obj);
                            }
                        }
                    }
                }
            } else {
                var newLink = {
                    "source":that.rightSelNode.id,
                    "target":newNode.id,
                    "name":$("."+parentContainerClass+"_addNodeLineName").val()
                }
                that.graph.links = commonUtil.outSideLink_add2(that.graph,newLink) //重新计算links，加入新增的links
            }
            //3. 处理节点数据(加index,level,nodetag)
            that.graph.nodes = commonUtil.initDealNodes(that.graph.nodes);
            //4. 处理颜色块，为高亮准备
            commonUtil.initDealColor(that.graph,that.userColorKpi,d3);

            //再次渲染
            if(that.layoutFlag == "tree"){  //树形布局
                that.changeTreeLayaout();
            }else{
                //先计算坐标，清空布局，再渲染
                if(that.layoutFlag == "circle"){  //圆形布局
                    calculateLayoutCoordinate.circleLayout(that.graph,svgContainer);
                }else if(that.layoutFlag == "rect"){ //矩形布局
                    calculateLayoutCoordinate.rectLayout(that.graph,svgContainer,that.radian);
                }else if(that.layoutFlag == "coord"||that.layoutFlag == "level"){ //坐标布局
                    calculateLayoutCoordinate.coordLayout(that.graph,svgContainer,that.radian);
                }
                that.initContainer(that.svgWidth,that.svgHeight);
            }

            d3.select(svgContainer).style("cursor", "default"); //修改鼠标样式由"+"转为默认样式
            that.hiddenPanelMenuList();  //右键菜单隐藏
            $("."+parentContainerClass+"_addNodeDialog").fadeOut();
            that.addFlag = false;  //新增关
            // console.log("curnode",that.graph.nodes)
        };
        //添加连线
        this.addLinks=function(parentContainerClass){
            that.hiddenPanelMenuList();  //隐藏右键菜单
            if(that.rightSelNode!=""){ //已选中节点
                $("."+parentContainerClass+"_lineSource").val(that.rightSelNode.id);
                $("."+parentContainerClass+"_lineTarget").val(that.rightSelNode.id);
                $("."+parentContainerClass+"_addLineDialog").fadeIn();
            }
        };
        //用户选择关联的节点，点击确定之前
        this.userInfoNewLineFromNode=function(sourceId,targetId,addLineName){
            var sourceToTargetObj = {};
            var svgContainer = "."+that.container.substr(1,that.container.length-1)+"_containerSvg";
            sourceToTargetObj["name"] = addLineName;
            console.log('graph', that.graph)
            if(sourceId!=targetId){
                //添加关系的时候，让target和source根据parentId产生关系
                var nodesCopy = JSON.parse(JSON.stringify(that.graph.nodes));
                var _level = 0;
                for (var i = 0; i < nodesCopy.length; i++) {
                    const element = nodesCopy[i];
                    if (sourceId == element.id) {
                        _level = element.level;
                        sourceToTargetObj["source"] = element;
                    }
                    if(targetId == element.id){
                        element.parentId = sourceId;
                        element.level = _level+1;
                        sourceToTargetObj["target"]= element;
                    }

                }
                //3.1 处理节点的parentId和level
                commonUtil.dealLevelOfNode(that.graph);
                that.graph.nodes = nodesCopy;

            }else{
                that.vueElemnet.$message({
                    showClose: true,
                    message: '关系指向不能指向自身',
                    type: 'info'
                });
                return false;
            }
            return sourceToTargetObj;
        };
        //确认添加连线
        this.saveLineDialogData=function(parentContainerClass,newLineObj){
            var svgContainer = "."+that.container.substr(1,that.container.length-1)+"_containerSvg";
            //2. 生成关系
            if (that.isOutsideIncomeLinks==0) {
                //2.1 内部生成关系
                that.graph.links = [];
                for (var i = 0; i < that.graph.nodes.length; i++) {
                    var ele1 = that.graph.nodes[i];
                    for (var j=0; j < that.graph.nodes.length; j++) {
                        var obj = {};
                        var ele2 = that.graph.nodes[j];
                        if(ele2.parentId){ //有上下关系
                            if(ele2.parentId == ele1.id&&ele1.id!=ele1.parentId&&ele2.id!=ele2.parentId){
                                obj.target = ele2.id;
                                obj.source = ele1.id;
                                obj.type = "line";
                                obj.name = ele1.index+"-"+ele2.index;
                                that.graph.links.push(obj);
                            }
                        }
                    }
                }
                console.log('tag', that.graph)
            } else {
                
                newLineObj["index"] = that.graph.links.length-1;
                that.graph.links.push(newLineObj);  //将新增的Links放上去（有name）
                that.graph.links = commonUtil.outSideLink(that.graph) //重新计算links
            }
            //3. 处理节点数据(加index,level,nodetag)
            // that.graph.nodes = commonUtil.initDealNodes(that.graph.nodes);
            //4. 处理颜色块，为高亮准备
            commonUtil.initDealColor(that.graph,that.userColorKpi,d3);
            
            //根据新的数据重绘
            if(that.layoutFlag == "tree"){  //树形布局
                that.changeTreeLayaout();
            }else{
                //先计算坐标，清空布局，再渲染
                if(that.layoutFlag == "circle"){  //圆形布局
                    calculateLayoutCoordinate.circleLayout(that.graph,svgContainer);
                }else if(that.layoutFlag == "rect"){ //矩形布局
                    calculateLayoutCoordinate.rectLayout(that.graph,svgContainer,that.radian);
                }else if(that.layoutFlag == "coord"||that.layoutFlag == "level"){ //坐标布局
                    
                    calculateLayoutCoordinate.coordLayout(that.graph,svgContainer,that.radian);
                }
                that.initContainer(that.svgWidth,that.svgHeight);
            }
            d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "default"); //修改鼠标样式由"+"转为默认样式
            that.hiddenPanelMenuList();  //右键菜单隐藏
            $("."+parentContainerClass+"_addLineDialog").fadeOut();
            $("."+parentContainerClass+"_addLineName").val("");
            that.addFlag = false;  //新增关
        };        
		//全选节点
        this.futureNode=function(parentContainerClass){
            var nodes = d3.selectAll(".node");  //节点
            var links = d3.selectAll(".nodeline"); //线条
            var nodetext = d3.selectAll(".nodetext"); //节点文字
            var linetext = d3.selectAll(".linetext"); //线条文字

            nodes.classed("node_active",true).classed("node_noactive",false);
            links.classed("nodeline_active",false).classed("nodeline_noactive",true);

            //全选节点
            //图标
            d3.selectAll(".node_active").each(function(d){
                d3.select(this).attr("href",function(d){
                    var arg = d["userIcon"];
                    return arg ? arg[0] : that.defShowNodeOnIconOfListObj[0] ;
                })
            })
            //圆圈
            d3.selectAll(".node_active").each(function(d){
                d3.select(this).attr("fill",d.userColor)
            })
            d3.selectAll(".node_noactive").each(function(d){
                d3.select(this).attr("fill",d.userColorDesalt)
            })

            nodetext.style("fill", that.nodesTextColor);   //高亮 ccc
            linetext.style("fill", "#ccc");  //暗淡 666

            that.intSelectNodes = nodes.size();  //全选节点
            that.intSelectLines = 0;  //节点为0
            that.selNode = ""; //清空已选节点
            that.value = ""; //检索节点value
            that.hiddenPanelMenuList();  //隐藏右键

            d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "default"); //修改鼠标样式由"+"转为默认样式
            that.addFlag = false;  //新增关
            return that.graph.nodes;

        },
		//全选关系
        this.futureLine=function(parentContainerClass){
            var nodes = d3.selectAll(".node");  //节点
            var links = d3.selectAll(".nodeline"); //线条
            var nodetext = d3.selectAll(".nodetext"); //节点文字
            var linetext = d3.selectAll(".linetext"); //线条文字

            nodes.classed("node_active",false).classed("node_noactive",true);
            links.classed("nodeline_active",true).classed("nodeline_noactive",false);

            //全选关系
            //圆圈
            d3.selectAll(".node_active").each(function(d){
                d3.select(this).attr("fill",d.userColor)
            })
            d3.selectAll(".node_noactive").each(function(d){
                d3.select(this).attr("fill",d.userColorDesalt)
            })
            //图标
            d3.selectAll(".node_noactive").each(function(d){
                d3.select(this).attr("href",function(d){
                    var arg = d["userIcon"];
                    return arg ? arg[1] : that.defShowNodeOnIconOfListObj[1] ;
                })
            })

            nodetext.style("fill", "#ccc");   //暗淡 ccc
            linetext.style("fill", that.linksTextColor);  //高亮 666

            that.intSelectLines = links.size();  //全选关系数量
            that.intSelectNodes = 0;  //关系为0
            that.selNode = ""; //清空已选节点
            that.value = ""; //检索节点value
            that.hiddenPanelMenuList();  //隐藏右键

            d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "default"); //修改鼠标样式由"+"转为默认样式
            that.addFlag = false;  //新增关
        };
        //当前的节点或关系相关联的节点或关系
        this.selectNodeFun=function(intNodehasLinksArray,rightSelNode){
            that.linkNodeArray = []; //关联节点的数组-筛选以后
            if (intNodehasLinksArray.length>0) {
                for(var i=0;i<intNodehasLinksArray.length;i++){
                    if(intNodehasLinksArray[i].target.name == rightSelNode.name){
                        that.linkNodeArray.push(intNodehasLinksArray[i].source);
                    }
                    if(intNodehasLinksArray[i].source.name == rightSelNode.name){
                        that.linkNodeArray.push(intNodehasLinksArray[i].target);
                    }
                }
            }
        };
		//当前节点关联节点
        this.associatedNode=function(parentContainerClass){
        	that.hiddenPanelMenuList();  //隐藏右键
            
            d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "default"); //修改鼠标样式由"+"转为默认样式
            that.addFlag = false;  //新增关
            
            if(that.rightSelNode !=""){ //已选节点
                if(that.intNodehasLinksArray.length>0){  //当前节点有多少关系数组
                    //节点高亮
                    that.nodeLinkSetHighNohasTrsanform();  //所有元素暗淡

                    //关系高亮
                    var selLine1 = d3.selectAll(".nodeline").filter(function(line){
                        return line.source.id == that.rightSelNode.id;
                    })
                    var selLine2 = d3.selectAll(".nodeline").filter(function(line){
                        return line.target.id == that.rightSelNode.id;
                    })
                    d3.selectAll(".nodeline").classed("nodeline_active",false).classed("nodeline_noactive",true)
                    selLine1.classed("nodeline_active",true).classed("nodeline_noactive",false)
                    selLine2.classed("nodeline_active",true).classed("nodeline_noactive",false)
                    


                    //关系文字高亮  
                    d3.selectAll(".linetext").style("fill",function(line){
                        if(line.source.name==that.rightSelNode.name || line.target.name==that.rightSelNode.name){  //当与连接点连接时变粗 
                            return that.linksTextColor;    //高亮          
                        }else{                   
                            return "#ccc";   //暗淡   "#f74242");   //高亮#fddbdb
                        }           
                    }); 


                    //关联的节点高亮 
                    var idsArr = [];
                    if(that.linkNodeArray.length>0){
                        for (let i = 0; i < that.linkNodeArray.length; i++) {
                            const element = that.linkNodeArray[i];
                            idsArr.push(element.id);
                        }
                    }
                    var sellinknodes1 = d3.selectAll(".node").filter(function(d){
                        return idsArr.indexOf(d.id) != -1; //可匹配
                    })
                    var sellinknodes2 = d3.selectAll(".node").filter(function(d){
                        return d.id == that.rightSelNode.id; //可匹配
                    })
                    d3.selectAll(".node").classed("node_active",false).classed("node_noactive",true)
                    sellinknodes1.classed("node_active",true).classed("node_noactive",false)
                    sellinknodes2.classed("node_active",true).classed("node_noactive",false)

                    that.nodeLineHighLightImageType(); //自定义图标高亮
                    that.nodeLineHighLightCircleType(); //圆圈高亮

                    //关联节点的文字高亮
                    var sellinknodetexts1 = d3.selectAll(".nodetext").filter(function(d){
                        return idsArr.indexOf(d.id) != -1; //可匹配
                    })
                    var sellinknodetexts2 = d3.selectAll(".nodetext").filter(function(d){
                        return d.id == that.rightSelNode.id; //选中节点文字
                    })
                    d3.selectAll(".nodetext").style("fill","#ccc");
                    sellinknodetexts1.style("fill",that.nodesTextColor);
                    sellinknodetexts2.style("fill",that.nodesTextColor);
                }
            }
        };
        //当前关系的关联节点
        this.associatedLine=function(parentContainerClass){
            var that = this;
            that.hiddenPanelMenuList();  //隐藏右键

            d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "default"); //修改鼠标样式由"+"转为默认样式
            that.addFlag = false;  //新增关
            if(that.rightSelLink!=""){ //选中的关系

                //节点高亮
                that.nodeLinkSetHighNohasTrsanform();  //所有元素暗淡

                var wantedSelLines = d3.selectAll(".nodeline").filter(function (d) {
                    return d.name == that.rightSelLink.name;  //已选择的节点
                });
                var wantedSeltext = d3.selectAll(".linetext").filter(function (d) {
                    return d.name == that.rightSelLink.name;  //已选择的节点文字
                });
                
                //文字
                d3.selectAll(".nodetext").style("fill","#ccc"); //节点文字
                d3.selectAll(".linetext").style("fill","#ccc"); //关系文字
                wantedSeltext.style("fill", that.linksTextColor);   //高亮 ccc

                //选中关系
                d3.selectAll(".nodeline").classed("nodeline_active",false).classed("nodeline_noactive",true)
                wantedSelLines.classed("nodeline_active",true).classed("nodeline_noactive",false)

                //关系关联节点
                var selnode1 = d3.selectAll(".node").filter(function(d){
                    return d.id == that.rightSelLink.source.id;
                })
                var selnode2 = d3.selectAll(".node").filter(function(d){
                    return d.id == that.rightSelLink.target.id;
                })
                d3.selectAll(".node").classed("node_active",false).classed("node_noactive",true)
                selnode1.classed("node_active",true).classed("node_noactive",false)
                selnode2.classed("node_active",true).classed("node_noactive",false)

                that.nodeLineHighLightImageType(); //自定义图标高亮
                that.nodeLineHighLightCircleType(); //圆圈高亮
            }
        };
        //节点文字暗淡(无缓冲)
        this.nodeLinkSetHigh=function(){
            var nodes = d3.selectAll(".node");  //节点
            var links = d3.selectAll(".nodeline"); //线条
            var nodetext = d3.selectAll(".nodetext"); //节点文字
            var linetext = d3.selectAll(".linetext"); //线条文字

            nodes.classed("node_active",false).classed("node_noactive",true);
            links.classed("nodeline_active",false).classed("nodeline_noactive",true);

            nodetext.style("fill", "#ccc");   //高亮 ccc
            linetext.style("fill", "#ccc");  //高亮  ccc
        },
		//节点文字高亮(无缓冲)
        this.nodeLinkSetHighNohasTrsanform=function(){
            var nodes = d3.selectAll(".node");  //节点
            var links = d3.selectAll(".nodeline"); //线条
            var nodetext = d3.selectAll(".nodetext"); //节点文字
            var linetext = d3.selectAll(".linetext"); //线条文字
 
            nodes.classed("node_active",false).classed("node_noactive",false);
            links.classed("nodeline_active",false).classed("nodeline_noactive",false);
            nodetext.style("fill", that.nodesTextColor);   //高亮 ccc
            linetext.style("fill", that.linksTextColor);  //高亮  ccc

        };
		//双击面板恢复原状
        this.dblclickMianban=function(){
            $(".rightMenu").css("display","none");
            that.selNode = null; //选中的节点
            that.selLink = null; //选中的关系
            that.rightSelNode = ""; //右键节点
            that.nodeLinkSetHighNohasTrsanform();  //节点高亮
            //恢复原状
            d3.selectAll(".node").each(function(d){
                d3.select(this).attr("fill",d.userColor)
            })
            //图标
            d3.selectAll(".node").each(function(d){
                d3.select(this).attr("href",function(d){
                    var arg = d["userIcon"];
                    return arg ? arg[0] : that.defShowNodeOnIconOfListObj[0] ;
                })
            })
        };
        //鼠标事件点击节点高亮
        this.mouseClickNodeEvent=function(othis,node){
            
            //节点高亮
            d3.selectAll(".node").classed("node_active",false).classed("node_noactive",true)
            d3.selectAll(".node").each(function(d){
                if (d.id==node.id) {
                    d3.select(this).classed("node_active",true).classed("node_noactive",false)
                }
            })

            //获取所有的关系，筛选出选中节点相关的
            d3.selectAll(".nodeline").each(function(line){
                if(line.source.name==node.name || line.target.name==node.name){  //当与连接点连接时变粗 
                    that.intNodehasLinksArray.push(line);
                }
            })

            //节点关联的节点高亮 
            that.selectNodeFun(that.intNodehasLinksArray,node); //获取关联的节点数组 that.linkNodeArray
            var idsArr = [];
            if(that.linkNodeArray.length>0){
                for (let i = 0; i < that.linkNodeArray.length; i++) {
                    const element = that.linkNodeArray[i];
                    idsArr.push(element.id);
                }
            }
            var sellinknodes = d3.selectAll(".node").filter(function(d){
                return idsArr.indexOf(d.id) != -1; //可匹配
            })
            sellinknodes.classed("node_active",true).classed("node_noactive",false)

            //关联节点文字高亮
            var sellinknodetexts1 = d3.selectAll(".nodetext").filter(function(d){
                return idsArr.indexOf(d.id) != -1; //可匹配
            })
            var sellinknodetexts2 = d3.selectAll(".nodetext").filter(function(d){
                return d.id == node.id; //选中节点文字
            })
            d3.selectAll(".nodetext").style("fill","#ccc").classed("nodetext_noactive",true);
            sellinknodetexts1.style("fill",that.nodesTextColor).classed("nodetext_noactive",false).classed("nodetext_active",true);
            sellinknodetexts2.style("fill",that.nodesTextColor).classed("nodetext_noactive",false).classed("nodetext_active",true);


            //节点关系高亮
            var selLine1 = d3.selectAll(".nodeline").filter(function(line){
                return line.source.id == node.id;
            })
            var selLine2 = d3.selectAll(".nodeline").filter(function(line){
                return line.target.id == node.id;
            })
            d3.selectAll(".nodeline").classed("nodeline_active",false).classed("nodeline_noactive",true)
            selLine1.classed("nodeline_active",true).classed("nodeline_noactive",false)
            selLine2.classed("nodeline_active",true).classed("nodeline_noactive",false)


            //关联关系文字高亮
            d3.selectAll(".linetext").style("fill",function(line){
                if(line.source.name==node.name || line.target.name==node.name){//当与连接点连接时变粗 
                    return that.linksTextColor;    //高亮          
                }else{                   
                    return "#ccc";   //暗淡  
                }           
            }); 
        };
        //鼠标点击关系高亮
        this.mouseClickLineEvent=function(othis,line){

            //设置节点关系高亮
            d3.selectAll(".linetext").style("fill", that.linksTextColor);   //高亮 666

            

            //关系文字
            var notSelLinetext = d3.selectAll(".linetext").filter(function(d){
                return d.name != line.name;
            })
            notSelLinetext.style("fill", "#ccc");

            //选中的关系高亮
            d3.selectAll(".nodeline")
                .classed('nodeline_active', false) //高亮失去
                .classed('nodeline_noactive',true) //暗淡

            d3.select(othis)
                .classed('nodeline_active', true)  //高亮
                .classed('nodeline_noactive',false) //暗淡失去
            
            //选中关联的节点元素高亮
            var node_noactive1 = d3.selectAll(".node").filter(function(d){
                return d.id == line.source.id;
            })
            var node_noactive2 = d3.selectAll(".node").filter(function(d){
                return d.id == line.target.id;
            })
            d3.selectAll(".node").classed('node_active', false).classed('node_noactive', true)
            node_noactive1.classed('node_active', true).classed('node_noactive', false)  //高亮
            node_noactive2.classed('node_active', true).classed('node_noactive', false)  //高亮

            //节点文字
            d3.selectAll(".nodetext").style("fill","#ccc").classed("nodetext_noactive",true);
           var nodetextwz1 =  d3.selectAll(".nodetext").filter(function(){
                return this.previousSibling.className.baseVal=="node nodeCircle node_active" ;
            })
            var nodetextwz2 =  d3.selectAll(".nodetext").filter(function(){
                return this.previousSibling.className.baseVal=="node nodeImage node_active";
            })
            nodetextwz1.style("fill",that.nodesTextColor).classed("nodetext_active",true).classed("nodetext_noactive",false);
            nodetextwz2.style("fill",that.nodesTextColor).classed("nodetext_active",true).classed("nodetext_noactive",false);

        };
        //点击节点或点击关系高亮
        this.nodeHighLight=function(othis){
            var nodeType="circle";
            if(othis.classList){
                if(othis.classList[0]=="nodeline"){
                    //点击关系
                    //自定义图标
                    d3.selectAll(".node_active").each(function(d){
                        // d3.select(this).attr("href",that.showNodeOnIcon[0])
                        d3.select(this).attr("href",function(d){
                            var arg = d["userIcon"];
                            return arg ? arg[0] : that.defShowNodeOnIconOfListObj[0] ;
                        })
                    })
                    d3.selectAll(".node_noactive").each(function(d){
                        // d3.select(this).attr("href",that.showNodeOnIcon[1])
                        d3.select(this).attr("href",function(d){
                            var arg = d["userIcon"];
                            return arg ? arg[1] : that.defShowNodeOnIconOfListObj[1] ;
                        })
                    })
                    //圆圈
                    d3.selectAll(".node_active").each(function(d){
                        d3.select(this).attr("fill",d.userColor)
                    })
                    d3.selectAll(".node_noactive").each(function(d){
                        d3.select(this).attr("fill",d.userColorDesalt)
                    })
                }else{
                    othis&&othis.childNodes?nodeType=othis.childNodes[0].localName:"";
                    //点击节点
                    if(nodeType=="image") {
                        //自定义图标
                        d3.selectAll(".node_active").each(function(d){
                            // d3.select(this).attr("href",that.showNodeOnIcon[0])
                            d3.select(this).attr("href",function(d){
                                var arg = d["userIcon"];
                                return arg ? arg[0] : that.defShowNodeOnIconOfListObj[0] ;
                            })
                        })
                        d3.selectAll(".node_noactive").each(function(d){
                            // d3.select(this).attr("href",that.showNodeOnIcon[1])
                            d3.select(this).attr("href",function(d){
                                var arg = d["userIcon"];
                                return arg ? arg[1] : that.defShowNodeOnIconOfListObj[1] ;
                            })
                        })
                    }else{
                        //圆圈
                        d3.selectAll(".node_active").each(function(d){
                            d3.select(this).attr("fill",d.userColor)
                        })
                        d3.selectAll(".node_noactive").each(function(d){
                            d3.select(this).attr("fill",d.userColorDesalt)
                        })
                    }
                }
            }
            
        };
        //高亮节点关系(图标类型)
        this.nodeLineHighLightImageType=function(){
            //图标
            d3.selectAll(".node_noactive").each(function(d){
                // d3.select(this).attr("href",that.showNodeOnIcon[1])
                d3.select(this).attr("href",function(d){
                    var arg = d["userIcon"];
                    return arg ? arg[1] : that.defShowNodeOnIconOfListObj[1] ;
                })
            })
            d3.selectAll(".node_active").each(function(d){
                // d3.select(this).attr("href",that.showNodeOnIcon[0])
                d3.select(this).attr("href",function(d){
                    var arg = d["userIcon"];
                    return arg ? arg[0] : that.defShowNodeOnIconOfListObj[0] ;
                })
            })
        };
        //高亮节点关系(图标类型)
        this.nodeLineHighLightCircleType=function(){
            //圆圈
            d3.selectAll(".node_active").each(function(d){
                d3.select(this).attr("fill",d.userColor)
            })
            d3.selectAll(".node_noactive").each(function(d){
                d3.select(this).attr("fill",d.userColorDesalt)
            })
        };
        //将多个数组处理成rgb颜色
        this.changeRgbColorObj=function(graphNodes){
            for (let i = 0; i < graphNodes.length; i++) {
                const element = graphNodes[i];
                for (let j = 0; j < element.length; j++) {
                    const ele = element[j];
                    if (typeof ele.userColor == "object") {
                        //对象转rgb对象
                        var rgb1 = "rgb("+ele.userColor.r+","+ele.userColor.g+","+ele.userColor.b+")";
                        var rgb2 = "rgb("+ele.userColorDesalt.r+","+ele.userColorDesalt.g+","+ele.userColorDesalt.b+")";
                        ele.userColor = d3.color(rgb1)
                        ele.userColorDesalt = d3.color(rgb2)
                    } else {
                        //字符串转rgb对象
                        ele.userColor = d3.color(ele.userColor)
                        ele.userColorDesalt = d3.color(ele.userColorDesalt)
                    } 
                }
            }
        };
        //贝塞尔曲线绘制
        this.dragBSELine=function(obj){
            //贝塞尔曲线（纵向）
                var Bézier_curve_generator_crosswiseY = d3.linkHorizontal()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; });
            //贝塞尔曲线（横向）
            var Bézier_curve_generator_crosswiseX = d3.linkHorizontal()
                .x(function(d) { return d.y; })
                .y(function(d) { return d.x; });

            obj.attr("d",function(d,i){
                var start = {x:d.source.x,y:d.source.y}
                var end = {x:d.target.x,y:d.target.y}
                return Bézier_curve_generator_crosswiseY({source:start,target:end})
            })
            .attr("fill","none")
        };
        //截图
        this.jietuCanvasPng=function(parentContainerClass){
            that.rightSelNode = "";  //右键节点清除
            that.rightSelLink = "";  //右键选择关系清空
            that.mianbanRight = {};  //面板右键指标
            d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "default"); //修改鼠标样式由"+"转为默认样式
            that.addFlag = false;  //新增关
            that.hiddenPanelMenuList();
            if (that.showNodeOnIcon==1) {
                //节点支持图标展示,1是启用，0是不启用
                that.vueElemnet.$message({
                    showClose: true,
                    message: '在节点为图标的模式下，组件暂不提供截图，请用户自定调用本地的截图工具，抱歉！',
                    type: 'info'
                });
                return false;
            } else {
                //截图Png
                if($('.svg_'+parentContainerClass+"_containerSvg")){ 
                    let $all=$(that.container),$graphArea=$(that.container);
                    let transform=$all.attr("transform");
                    let scale=(transform && /scale/.test(transform)) ? (+ transform.match(/scale\(([^\)]+)\)/)[1]):1;
                    let allPos=$all[0].getBoundingClientRect();
                    let left=allPos.left-$graphArea.offset().left-15*scale;
                    let top=allPos.top-$graphArea.offset().top-10;
                    let width=allPos.width+30*scale;
                    let height=allPos.height;
                    if (saveSvgContainer&&saveSvgContainer!=""&&saveSvgContainer!=null&&saveSvgContainer!=undefined) {
                        saveSvgContainer.saveSvgAsPng($('.svg_'+parentContainerClass+"_containerSvg")[0],`image${+new Date()}.png`,{left,top,width,height})
                    } else {
                        saveSvgAsPng($('.svg_'+parentContainerClass+"_containerSvg")[0],`image${+new Date()}.png`,{left,top,width,height})
                    }
                }
            }
        };

	}else{
		new D3NetworkHelper(od3,saveSvg,vueThis);
	}
};
//坐标，圆形，矩形坐标计算
var CalculateLayoutCoordinate = function(){
    if(this instanceof CalculateLayoutCoordinate){
        var that = this;
        var commonUtil = new CommonUtil();
        //计算坐标布局(随机不重叠)
	    this.coordLayout=function(json,container,radian,svgHeight){
	        if (json["nodes"].length) {
	            var xFactor=100,yFactor=100;
	            var radian = radian?radian:10;
	            var arrLevel = [];
	            for (var i = 0; i < json.nodes.length; i++) {
	                var element1 = json.nodes[i];
	                if(element1["index"] == null ||element1["index"] == undefined || element1["index"] == null){
	                    element1["index"] = i;
	                }
	                arrLevel.push(element1.level);
	            }
	            var bottomNum = commonUtil.getBottomNodesNumber(arrLevel); //去重前最底层节点数量
	            // xFactor = $(container).width()/bottomNum; //x因子
	            arrLevel = Array.from(new Set(arrLevel)); //去重后数组
                // if ($(container).height()) {
                //     yFactor = $(container).height()/arrLevel.length; //y因子
                // } else {
                //     yFactor = svgHeight/arrLevel.length; //y因子
                // }
	            for (let j = 0; j < arrLevel.length; j++) {
	                const ele1 = arrLevel[j];
	                var arr = [];
	                var a = -1;
                    json.nodes = json.nodes.sort(commonUtil.compareSortArrayByField('index'));  //按照index排序
	                for (let i = 0; i < json.nodes.length; i++) {
	                    const ele2 = json.nodes[i];
	                    ele2["y"] = radian+yFactor*ele2.level;
	                    ele2["fy"] = radian+yFactor*ele2.level;
	                    if(ele2.level == ele1){
	                        a++;
	                        arr.push(ele2)
                            ele2["x"] = radian+xFactor*a;
	                        ele2["fx"] = radian+xFactor*a;
	                    }
	                }
	            }
            }
            // console.log(json)
	        return json;
	    };
		//计算圆形布局
	    this.circleLayout=function(json,container){
            console.log('tag', $(container))
            console.log('tag', $(container).selector)
	        if (json["nodes"].length) {
                if($(container).selector){
                    var centerPoint = [$(container)[0].attributes.width.value / 2, $(container)[0].attributes.height.value / 2];  //高版本的vue
                }else{
                    var centerPoint = [$(container).width() / 2, $(container).height() / 2];  //低版本的vue
                }
                let radian = 360 / json.nodes.length * Math.PI / 180;
                let radius = null;
                if (json["nodes"].length>50) {
                    if(json["nodes"].length>30){
                        radius = json["nodes"].length * 3;
                    }else{
                        radius = json["nodes"].length * 5;
                    }
                }else{
                    radius = json["nodes"].length * 12;
                }
	            json.nodes.forEach(function (nodeItem, nodeIdx) {
	                nodeItem['x'] = radius * Math.cos(radian * nodeIdx) + centerPoint[0];
	                nodeItem['fx'] = radius * Math.cos(radian * nodeIdx) + centerPoint[0];
	                nodeItem['y'] = radius * Math.sin(radian * nodeIdx) + centerPoint[1];
	                nodeItem['fy'] = radius * Math.sin(radian * nodeIdx) + centerPoint[1];
	            });
	        }
	    };
	    //计算矩形布局
	    this.rectLayout=function(json,container,radian){
	        if (json["nodes"].length) {
	            let endCordinates = {};
	            let sqr = Math.floor(Math.sqrt(json["nodes"].length));
	            let count4row = 0;
                let row = 0;
                if($(container).selector){
                    // 高版本vue
                    var xFactor = $(container)[0].attributes.width.value;
                    var yFactor = $(container)[0].attributes.height.value;
                }else{
                    // 低版本vue
                    var xFactor = $(container).width();
                    var yFactor = $(container).height();
                }
	            json.nodes.forEach(function (nodeItem, nodeIdx) {
	                // nodeItem['x'] = $(container).width() * 1 / 5 + count4row * ($(container).width() * 4 / 5 / (sqr));
	                // nodeItem['fx'] = $(container).width() * 1 / 5 + count4row * ($(container).width() * 4 / 5 / (sqr));
	                // nodeItem['y'] = $(container).height() * 1 / 6 + row * ($(container).height() * 5 / 6 / (sqr + 2));
                    // nodeItem['fy'] = $(container).height() * 1 / 6 + row * ($(container).height() * 5 / 6 / (sqr + 2));
                    nodeItem['x'] =  radian*2+count4row * (xFactor * 4 / 5 / (sqr));
	                nodeItem['fx'] = radian*2+count4row * (xFactor * 4 / 5 / (sqr));
	                nodeItem['y'] =  radian*2+row * (yFactor * 5 / 6 / (sqr + 2));
	                nodeItem['fy'] = radian*2+ row * (yFactor * 5 / 6 / (sqr + 2));
	                if (count4row < sqr - 1) {
	                    count4row++;
	                } else {
	                    count4row = 0;
	                    row++;
	                }
	            });
	        }
        };
    }else{
        new CalculateLayoutCoordinate();
    }
};
//树形坐标计算
var TreeCoordinate = function () {
    if(this instanceof TreeCoordinate){
        var that = this;
        this.tmpName="myTopLevelNode";
        this.tree = {
            name:that.tmpName,
            children:that.allTree
        };
        this.allTree = function(list){
            that.tree.children=list;
        }
        this.treeMergeShowType=1; //树：1合并到一个svg, 0分开多个svg展示
        this.xName="_x";//x轴坐标字段名
        this.yName="_y";//y轴坐标字段名
        this.levelName="_level";//层级字段名
        this.outermostNodeNumsName="_nums";//最外层节点数量字段名
        this.list=[];//tree的list形式
        //坐标轴方向，坐标轴的可用长度,坐标单位
        /*
            * 类型0   | 类型1  | 类型2  | 类型3 
            * 0-->x   |y       |x<--0   |    y
            * |       |^       |    |   |    ^
            * v       ||       |    v   |    |
            * y       |0-->x   |    y   |x<--0
            * ***/
        this.direction=0;//绘制坐标如上图
        this.yLen=1000;//可用y轴长度
        this.yLenType=1;//y轴坐标从0:(y=0,坐标在y轴中间)，1：(y=0)坐标在y轴一端
        this.xLen=1000;//可用x轴长度
        this.xLenType=1;//x轴坐标从0:(x=0,坐标在x轴中间)，1：(x=0)坐标在x轴一端
        this.unit="";//长度单位，如xp或者为空等
        this.startNodeXLen=0;
        this.startNodeYLen=0;
        this.startNodeOnXOrY=1;//0表示开始节点在x轴上，1表示在y轴上，2表示在原点
        
        this.level=0;//最大层级数，初始化为0
        this.outermostNodeNums=0;//最外层节点数量,初始化为0
        this.yFactor=1;
        this.xFactor=1;
        this.init=function(tree){
            
        }
        this.getDrawTemplate=function(direction,yLen,yLenType,xLen,xLenType,unit,startNodeXLen,startNodeYLen,startNodeOnXOrY,treeMergeShowType){
            return {
                "direction":direction?direction:that.direction,
                "yLen":yLen?yLen:that.yLen,
                "yLenType":yLenType?yLenType:that.yLenType,
                "xLen":xLen?xLen:that.xLen,
                "xLenType":xLenType?xLenType:that.xLenType,
                "unit":unit?unit:that.unit,
                "startNodeXLen":startNodeXLen?startNodeXLen:that.startNodeXLen,
                "startNodeYLen":startNodeYLen?startNodeYLen:that.startNodeYLen,
                "startNodeOnXOrY":startNodeOnXOrY?startNodeOnXOrY:that.startNodeOnXOrY,
                "treeMergeShowType":treeMergeShowType?treeMergeShowType:that.treeMergeShowType,
            };
        }
        //根据面板信息绘制坐标
        this.draw=function(drawTemplate){
            //根据模型计算系数
            //根据系数遍历修改坐标
            if(0==drawTemplate.direction){
                that.drawTemplate1(that.list,that.yFactor,that.xFactor,drawTemplate);
            }
        }
        this.drawTemplate1=function(list,yFactor,xFactor,drawTemplate){
            if(1!=drawTemplate.yLenType){
                drawTemplate.yLen = drawTemplate.yLen/2;
            }
            if(1!=drawTemplate.xLenType){yLen
                drawTemplate.xLen = drawTemplate.xLen/2;
            }
            var unitTemp = drawTemplate.unit.length>0?drawTemplate.unit:0;
            if(1==drawTemplate.startNodeOnXOrY){//表示开始节点在y轴上（0，y）
                //层级 对应 x的节点间距系数
                //最大节点数代表 y的节点间距系数
                xFactor = that.level>0?Math.ceil(drawTemplate.xLen/that.level):0;
                yFactor = that.outermostNodeNums>0?Math.ceil(drawTemplate.yLen/that.outermostNodeNums):0;
                if (yFactor&&yFactor<50){yFactor=50} //限定节点最小间距
                if(that.treeMergeShowType==1){ //合并到一个svg
                    for(var i=0;i<list.length;i++){
                        list[i][that.xName]=drawTemplate.startNodeXLen+(list[i][that.xName]-1)*xFactor+unitTemp;
                        list[i][that.yName]=drawTemplate.startNodeYLen+list[i][that.yName]*yFactor+unitTemp;
                        list[i]["f"+that.xName] = list[i][that.xName];
                        list[i]["f"+that.yName] = list[i][that.yName];
                    }
                }else{
                    for(var i=0;i<list.length;i++){
                        list[i][that.xName]=drawTemplate.startNodeXLen+list[i][that.xName]*xFactor+unitTemp;
                        list[i][that.yName]=drawTemplate.startNodeYLen+list[i][that.yName]*yFactor+unitTemp;
                        list[i]["f"+that.xName] = list[i][that.xName];
                        list[i]["f"+that.yName] = list[i][that.yName];
                    }
                }
                
            }else if(0==drawTemplate.startNodeOnXOrY){//表示开始节点在x轴上（x,0）
                //层级 对应 y的节点间距系数
                //最大节点数代表 x的节点间距系数
                xFactor = that.level>0?Math.ceil(drawTemplate.xLen/that.level):0;
                if (xFactor&&xFactor<50){xFactor=50} //限定节点最小间距
                yFactor = that.outermostNodeNums>0?Math.ceil(drawTemplate.yLen/that.outermostNodeNums):0;
                if(that.treeMergeShowType==1){ //合并到一个svg
                    for(var i=0;i<list.length;i++){
                        list[i][that.xName]=drawTemplate.startNodeXLen+list[i][that.xName]*xFactor+unitTemp;
                        list[i][that.yName]=drawTemplate.startNodeYLen+(list[i][that.yName]-1)*yFactor+unitTemp;
                        list[i]["f"+that.xName] = list[i][that.xName];
                        list[i]["f"+that.yName] = list[i][that.yName];
                    }
                }else{
                    for(var i=0;i<list.length;i++){
                        list[i][that.xName]=drawTemplate.startNodeXLen+list[i][that.xName]*xFactor+unitTemp;
                        list[i][that.yName]=drawTemplate.startNodeYLen+list[i][that.yName]*yFactor+unitTemp;
                        list[i]["f"+that.xName] = list[i][that.xName];
                        list[i]["f"+that.yName] = list[i][that.yName];
                    }
                }
                
            }else{//表示在原点(0,0)
                
            }
            
        }
        //计算坐标
        this.calculate=function(node,level){
            that.outermostNodeNums = 0;
            var availableList=[];//缺少y轴坐标的节点集合
            var yFree=0;//最外层的可用长度临时变量
            //获取最大层级和最外层节点数量，并初始化最外层坐标
            function cal(node,level){
                //设置当前级别
                node[that.levelName]=level;
                //计算当前X坐标
                node[that.xName]=level;
                node["f"+that.xName]=node[that.xName];
                if(node.children && node.children.length>0){
                    var levelTmp=level+1;
                    for(var i=0;i<node.children.length;i++){
                        cal(node.children[i],levelTmp);
                    }
                    availableList.push(node);
                }else{
                    that.outermostNodeNums++;
                    if(level>that.level){
                        that.level=level;
                    }
                    node[that.yName]=yFree;
                    node["f"+that.yName]=node[that.yName];
                    yFree++;
                }
                that.list.push(node);
            }
            //根据子节点获取当前节点的y轴坐标
            function getYNum(nodes){
                if(1==nodes.length){
                    return nodes[0][that.yName];
                }else if(2<=nodes.length){
                    //TODO 如返回数据小数点数值不对，请在此处修改
                    return (nodes[0][that.yName]+nodes[nodes.length-1][that.yName])/2;
                }else{
                    console.log("数据异常，请检查");
                    return 0;
                }
            }
            cal(node,level);
            for(var i=0;i<availableList.length;i++){
                availableList[i][that.yName]=getYNum(availableList[i].children);
                availableList[i]["f"+that.yName]=getYNum(availableList[i].children);
            }
        }
        //处理返回的list，平面数组
        this.getDrawNodes=function(){
            var vlist = JSON.parse(JSON.stringify(that.list));
            
            vlist = vlist.filter(item => 
                item.name !== that.tmpName
            )
            for(var i=0;i<vlist.length;i++){
                if(vlist[i].children){
                    delete vlist[i].children;
                }
            }
            return vlist;
        }
    }else{
      return new TreeCoordinate();
    }
};
//基本函数
var CommonUtil = function() {
    if(this instanceof CommonUtil) {
        var that = this;
        this.isFunc = function (func) {
            if (that.isNotEmpty(func)) {
            return typeof func == 'function';
            }
            return false;
        };
        this.percentNum = function (num,num2) {
            return (num/num2).toFixed(2);
        }
        this.guid = function () {
            function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
    
            return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
        };
        this.isNotEmpty = function (value) {
            if (value != undefined && value != null && value != '' && (value + "").trim().length != 0) {
            return true;
            } else {
            return false;
            }
        };
        //拷贝对象
        this.copyObject=function(obj) {
            var newObj = {};
            for(var key in obj) {
                newObj[key] = obj[key];
            }
            return newObj;
        };
        //获取最底层的个数
	    this.getBottomNodesNumber=function(arrLevel){
	        var maxLevel = [];
	        for (let j = 0; j < arrLevel.length; j++) {
	            const element = arrLevel[j];
	            if(element == arrLevel[arrLevel.length-1]){
	                maxLevel.push(element);
	            }
	        }
	        return maxLevel.length;
	    };
	    //根据字段排序
	    this.compareSortArrayByField=function(property){
	        return function(a,b){
	            var value1 = a[property];
	            var value2 = b[property];
	            return value1 - value2;
	        }
	    };
		//数组去重
		this.deteleRepeatObjectOfArray=function(arr){ //数组arr
			var uniques=[];
	        var stringify = {};
	        for(var i=0; i<arr.length; i++) {
	            var keys = Object.keys(arr[i]);
	            keys.sort(function(a, b) {
	                return (Number(a) - Number(b));
	            });
	            var str='';
	            for(var j=0; j < keys.length; j ++) {
	                str += JSON.stringify(keys[j]);
	                str += JSON.stringify(arr[i][keys[j]]);
	            }
	            if(!stringify.hasOwnProperty(str)) {
	                uniques.push(arr[i]);
	                stringify[str]=true;
	            }
	        }
	        return uniques;
        };
        //将树型结构转为平面数组结构
        this.treeToArray=function(treeObject,childrenKey,saveKey){
            //  * @param treeObject 树形数据
            //  * @param childrenKey  子节点的归属字段children...
            //  * @returns {Array} 
            //  */
            var arr = [];
            if(treeObject==null||childrenKey==null||childrenKey==""){
                return arr;
            }
            var obj = that.copyObject(treeObject);
            var children = obj[childrenKey];
            delete obj[childrenKey];
            arr.push(obj)
            if(children==null||children.length==0){
                return arr;
            }
            for(var i=0;i<children.length;i++){
                var o = that.copyObject(children[i]);
                var arr1 = that.treeToArray(o,childrenKey);
                arr = arr.concat(arr1);
            }
            return arr;
        };
        //转树形数据
        this.arrToTreeData=function(myId,pId,list2){
            var oldId = "";
            var loopArr = []; //产生回路的id
            var list = JSON.parse(JSON.stringify(list2)); //原数组拷贝
            var planeNodesList = []; //平面数组
            function exists(list, parentId){
                for(var i=0; i<list.length; i++){
                    if (list[i][myId] == parentId) return true;
                }
                return false;
            }
            //判断是否构成回路的树形数据
            function exists2(list, id){
                for(var i=0; i<list.length; i++){
                    if (list[i][pId] == id){
                        if (oldId==list[i][myId]) {
                            loopArr.push(oldId); //产生回路
                        }else{
                            exists2(list,list[i][myId])
                        }
                    }
                }
            }
            
            var treeNodes = [];
            // get the top level nodes, 找出根节点，谁的parentId在list中不存在的，就有机会做根节点
            for(var i=0; i<list.length; i++){
                var row = list[i];
                if (!exists(list, row[pId])){ 
                    //不存在
                    row.level = 0;
                    treeNodes.push(row);
                }else{
                    //存在
                    row.level = 0;
                    oldId = row[myId]; //存值
                    exists2(list,row[myId]);
                }
            }
            
            var toDo = [];
            for(var i=0; i<treeNodes.length; i++){
                toDo.push(treeNodes[i]);
            }
            while(toDo.length){
                var node = toDo.shift(); // the parent node
                planeNodesList.push(node); //获得平面节点数组
                node.children = [];
                // get the children nodes
                for(var i=0; i<list.length; i++){
                    var row = list[i];
                    if (row[pId] == node[myId]){
                        row.level = node.level+1;
                        if (node.children){
                            node.children.push(row);
                        } else {
                            node.children = [row];
                        }
                        toDo.push(row);
                    }
                    
                }
            }
            //平面节点拷贝
            var planeNodesListCopy = JSON.parse(JSON.stringify(planeNodesList));
            for (let j = 0; j < planeNodesListCopy.length; j++) {
                const element = planeNodesListCopy[j];
                delete element.children;
            }
            
            return {"loopArr":loopArr,"treeNodes":treeNodes,"planeNodesListCopy":planeNodesListCopy}; //所有的树结构，片面结构数组
        };
        //特定节点及子节点，转树形数据
        this.getOneArrToTreeData=function(myId,pId,list2,tagId){
            var list = JSON.parse(JSON.stringify(list2));
            function exists(list, parentId){
                for(var i=0; i<list.length; i++){
                    if (list[i][myId] == parentId) return true;
                }
                return false;
            }
                
            var nodes = [];
            // get the top level nodes
            for(var i=0; i<list.length; i++){
                var row = list[i];
                // if (!exists(list, row[pId])){
                //     nodes.push(row);
                // }
                if(row.id == tagId){ //找到当前节点作为顶级节点
                    nodes.push(row);
                }
            }
                
            var toDo = [];
            for(var i=0; i<nodes.length; i++){
                toDo.push(nodes[i]);
            }
            //为顶级节点找子节点
            while(toDo.length){
                var node = toDo.shift(); // the parent node
                node.children = [];
                // get the children nodes
                for(var i=0; i<list.length; i++){
                    var row = list[i];
                    if (row[pId] == node[myId]){
                        if (node.children){
                            node.children.push(row);
                        } else {
                            node.children = [row];
                        }
                        toDo.push(row);
                    }
                }
            }
            return nodes;
        };
        //处理初始化节点数据(level,index,type)
        this.initDealNodes=function(array){
            array = (that.arrToTreeData("id","parentId",array)).planeNodesListCopy; //加level层级
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                element["index"]=i;               
                element["type"]="node";
            }
            return array;
        };
        //初始化判断节点关系
        this.dealLinks=function(data){
            var idnodeArray = []; //找出关系数组的id指向做校验
            var idlinkArray = []; //找出关系数组的id指向做校验
            for (let j = 0; j < data.nodes.length; j++) {
                const ele2 = data.nodes[j];
                idnodeArray.push(ele2.id);
            }
            for (let i = 0; i < data.links.length; i++) {
                const ele2 = data.links[i];
                idlinkArray.push(ele2.source)
                idlinkArray.push(ele2.target)
            }
            var noIds = [];
            for(var i in idlinkArray){
                if (idnodeArray.indexOf(idlinkArray[i])==-1) {
                    noIds.push('"'+idlinkArray[i]+'"')
                }
            }
            //初始化parentId，重新整理
            for (let j = 0; j < data.nodes.length; j++) {
                const ele = data.nodes[j];
                ele["parentId"]=""; 
            }
            //根据关系重新产生parentId
            for (let j = 0; j < data.links.length; j++) {
                const ele1 = data.links[j];
                for (let j = 0; j < data.nodes.length; j++) {
                    const ele2 = data.nodes[j];
                    if (ele2.id == ele1.target) {
                        ele2["parentId"] = ele1.source; 
                    }
                }
            }
            return noIds;
        };
        //外部关系处理
        this.outSideLink=function(graph,rightSelNode){
            var arr = [];
            var olink = []; //内部产生关系
            for (var i = 0; i < graph.nodes.length; i++) {
                var ele1 = graph.nodes[i];
                for (var j=0; j < graph.nodes.length; j++) {
                    var obj = {};
                    var ele2 = graph.nodes[j];
                    if(ele2.parentId){ //有上下关系
                        if(ele2.parentId == ele1.id&&ele1.id!=ele1.parentId&&ele2.id!=ele2.parentId){
                            obj.target = ele2.id;
                            obj.source = ele1.id;
                            obj.type = "line";
                            obj.name = ele1.index+"-"+ele2.index;
                            olink.push(obj);
                        }
                    }
                }
            }

            if(rightSelNode){
                if(rightSelNode.source||rightSelNode.target){
                    //关系
                    for (let i = 0; i < graph.links.length; i++) {
                        const element = graph.links[i];
                        if (element.source.id==rightSelNode.source.id&&element.target.id==rightSelNode.target.id) {
                        }else{
                            arr.push(element)
                        }
                    }
                }else{
                    //节点
                    for (let i = 0; i < graph.links.length; i++) {
                        const element = graph.links[i];
                        if (element.source.id!=rightSelNode.id&&element.target.id!=rightSelNode.id) {
                            arr.push(element)
                        }
                    }
                }
            }
            if (arr.length==0) {
                arr= graph.links;
            }
            for (let i = 0; i < olink.length; i++) {
                const ele1 = olink[i];
                for (let j = 0; j < arr.length; j++) {
                    const ele2 = arr[j];
                    if (ele2.source.id&&ele2.target.id) { //对象
                        if (ele2.source.id==ele1.source&&ele2.target.id==ele1.target) {
                            if(ele2.name){
                                ele1["name"] = ele2.name
                            }
                        } 
                    } else { //id
                        if (ele2.source==ele1.source&&ele2.target==ele1.target) {
                            if(ele2.name){
                                ele1["name"] = ele2.name
                            }
                        } 
                    }
                }
            }
            return olink
        };
        //外部关系处理(新增关系节点的情况)
        this.outSideLink_add2=function(graph,newLinks){
            var arr = [];
            var olink = []; //内部产生关系
            for (var i = 0; i < graph.nodes.length; i++) {
                var ele1 = graph.nodes[i];
                for (var j=0; j < graph.nodes.length; j++) {
                    var obj = {};
                    var ele2 = graph.nodes[j];
                    if(ele2.parentId){ //有上下关系
                        if(ele2.parentId == ele1.id&&ele1.id!=ele1.parentId&&ele2.id!=ele2.parentId){
                            obj.target = ele2.id;
                            obj.source = ele1.id;
                            obj.type = "line";
                            obj.name = ele1.index+"-"+ele2.index;
                            olink.push(obj);
                        }
                    }
                }
            }
            if (arr.length==0) {
                arr= graph.links;
            }
            for (let i = 0; i < olink.length; i++) {
                const ele1 = olink[i];
                for (let j = 0; j < arr.length; j++) {
                    const ele2 = arr[j];
                    if (ele2.source.id&&ele2.target.id) { //对象
                        if (ele2.source.id==ele1.source&&ele2.target.id==ele1.target) {
                            if(ele2.name){
                                ele1["name"] = ele2.name
                            }
                        } 
                    } else { //id
                        if (ele2.source==ele1.source&&ele2.target==ele1.target) {
                            if(ele2.name){
                                ele1["name"] = ele2.name
                            }
                        } 
                    }
                }
                //新增的情况，name更新
                if(newLinks){
                    if (ele1.source==newLinks.source&&ele1.target==newLinks.target) {
                        ele1.name = newLinks.name;
                    }
                }
            }
            return olink
        };
        //初始化定义level的情况
        this.dealLevelOfNode=function(data){
            //初始化parentId，重新整理
            for (let j = 0; j < data.nodes.length; j++) {
                const ele = data.nodes[j];
                ele["parentId"]=""; 
            }
            //根据关系重新产生parentId
            for (let j = 0; j < data.links.length; j++) {
                const ele1 = data.links[j];
                for (let j = 0; j < data.nodes.length; j++) {
                    const ele2 = data.nodes[j];
                    if (ele2.id == ele1.target) {
                        ele2["parentId"] = ele1.source; 
                    }
                }
            }
            for (let i = 0; i < data.nodes.length; i++) {
                const element = data.nodes[i];
                if (element.parentId=="") {
                    element["level"]=0;
                }
            }
        };
        //初始化定义颜色块
        this.initDealColor=function(data,userColorKpi,d3){
            for (let i = 0; i < data.nodes.length; i++) {
                const element = data.nodes[i];
                var userColor = ""; //原色
                var userColorDesalt = ""; //淡化色

                //1. 开启节点颜色层
                if(userColorKpi==1){ 
                    if (element.userColor) {
                        //1.1 自定义颜色
                        if (element.userColor.highlight) {
                            //原生数据对象
                            userColor = d3.color(element.userColor.highlight); //原色
                            userColorDesalt = d3.color(element.userColor.light); //淡化色
                        } else {
                            //处理以后对象
                            var rgb1 = "rgb("+element.userColor.r+","+element.userColor.g+","+element.userColor.b+")";
                            var rgb2 = "rgb("+element.userColorDesalt.r+","+element.userColorDesalt.g+","+element.userColorDesalt.b+")";
                            userColor = d3.color(rgb1);  //原色
                            userColorDesalt = d3.color(rgb2); //淡化色
                        }
                    } else {
                        //1.2 无定义颜色，默认系统颜色
                        userColor = d3.color("rgb(55, 162, 218)"); //系统原色
                        userColorDesalt = d3.color("rgb(242, 246, 255)"); //系统淡化色
                    }
                }else{ //2. 不开启颜色层，系统默认颜色
                    userColor = d3.color("rgb(55, 162, 218)"); //系统原色
                    userColorDesalt = d3.color("rgb(242, 246, 255)"); //系统淡化色
                }
                element["userColor"] = userColor; 
                element["userColorDesalt"] = userColorDesalt; 
            }
        };
        //删除节点方法
        this.delClickNodeThisfc=function(rightSelNode,graph){
            //操作原数据-删除节点
            if(rightSelNode){
                for(var i = 0;i < graph.nodes.length;i++){
                    var element = graph.nodes[i];
                    if(element.parentId == rightSelNode.id){
                        element.parentId = "";
                        // element.parentId = "pid_del_"+that.guid();
                        element.level = 0;
                    }
                }
                for(var i = 0;i < graph.nodes.length;i++){
                    var element = graph.nodes[i];
                    if(element.name === rightSelNode.name){
                        graph.nodes.splice(i, 1); //删除下标为i的元素
                    }
                }
            }
            graph = (that.arrToTreeData("id","parentId",graph.nodes)).planeNodesListCopy; //平面数组
            return graph;
        };
        //删除关系方法
        this.delClickLineThisfc=function(rightSelLink,graph){
            //删除关系的时候，让target和source根据parentId解除关系
            for (var i = 0; i < graph.nodes.length; i++) {
                const element = graph.nodes[i];
                if(rightSelLink.target.id == element.id){
                    element.parentId = "";
                    // element.parentId = "pid_del_"+that.guid();
                }
            }
            //改变level,层次关系
            var nodesCopy = JSON.parse(JSON.stringify(graph.nodes)); 
            var treeList = (that.arrToTreeData("id","parentId",nodesCopy)).treeNodes; //树形数据
            var planeList = [];
            for (let i = 0; i < treeList.length; i++) {
                const element = treeList[i];
                var arr = that.treeToArray(element,"children","lastChildNum"); //将树形数据转为平面数据
                for (let j = 0; j < arr.length; j++) {
                    const element2 = arr[j];
                    planeList.push(element2)
                }
            }
            graph.nodes = planeList; //已经改变了level，重新渲染数据
        };
        //关闭新增节点弹窗
        this.showDialogClose=function(parentContainerClass){
            $(".dialogClose").click(function(){
                $("."+parentContainerClass+"_addNodeDialog").fadeOut();
                $("."+parentContainerClass+"_addLineDialog").fadeOut();
                d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "default"); //修改鼠标样式为鼠标箭头
            })
            $(".dialogClose2").click(function(){
                $("."+parentContainerClass+"_addNodeDialog").fadeOut();
                $("."+parentContainerClass+"_addLineDialog").fadeOut();
                d3.select('.svg_'+parentContainerClass+"_containerSvg").style("cursor", "default"); //修改鼠标样式为鼠标箭头
            })
        }
    } else {
        new CommonUtil();
    }
};
$.fn.extend({
  getD3NetworkHelper:function(od3,saveSvg,vueThis){
    return new D3NetworkHelper(od3,saveSvg,vueThis);
  }
});