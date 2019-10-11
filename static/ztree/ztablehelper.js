/**
 * Created by caixiaokun on 2018/10/20.
 */
// 冻结表头
// 通用查询最新版

var TableHelper2 = function () {
  if (this instanceof TableHelper2) {
    var that = this;
    var commonUtil = new CommonUtil();
    that.treeTableLLXHelper = new TreeTableLLXHelper2();
    //初始化数据
    this.data = {
      "tableName": null, //主题
      "creatTime": null, //时间
      "unit": null, //单位
      "columns": [], //表头对象
      "dataSource": [], //列表数据
      "pageinfo_front": false, //是否是前台分页
      "pageinfo_use": false, //是否使用pageinfo
      "pageinfo_callback": false, //是否使用回调
      "order_front": false, //是否是前台排序
      "head_overflow": false //表头是否超出省略
    };
    //分页对象数据
    this.pageInfo = {
      "pages": 5,
      "pageNum": 1,
      "pageSize": 10,
      "total": 10,
      "list": []
    };
    //处理后可用数据
    this.tableHelper = {
      "viewId": null, //最外层的div容器
      "id": null, //ztree操作的div容器
      "tableName": null, //主题
      "creatTime": null, //时间
      "unit": null, //单位
      "total": 0,
      "temple": "simple", //模板类型，diy
      "headList": [], //表头数据
      "zTreeNodes": [], //树形数据
      "showNodes": [], //显示的数据
      "dimensionality": 1, //维度1-3
      "freezecolsNum": 0, //冻结列数，默认是0不冻结，可设置1，2,3,4（维度+序号）
      "freezhhead": 0, //(0表示不冻结,1表示冻结表头)
      "getAvailableScreenHeight": 375, //设置表格高度，固定头部超出滚动 默认375
      "aloneShowtable":1, //设置表格 是否单独页面显示，1代表表格加条件操作区域，2代表表格单独页面展示
      "freezecolsWidth": $(window)[0].outerWidth-117, //冻结列表格宽度,默认是屏幕宽度
      "pageinfo_front": false, //是否是前台分页
      "pageinfo_use": false, //是否使用pageinfo
      "pageinfo_callback": false, //是否使用回调
      "order_front": false, //是否是前台排序
      "head_overflow": false, //表头是否超出省略
      "mNode": [], //存储行的数据
      "dataShowModel": 2, //多维度数据展示模式
      "isTreeData": false, //是否是树形数据
      "fristWidth": 0, //  容器的宽度
      "userpagesize": 0 //是否使用分页每一页大小
    };
    //setting 是ztree默认配置(冻结列状态的表格使用)
    this.setting2 = {
      view: {
        dblClickExpand: false,
        showLine: false,
        showIcon: false,
        addDiyDom: function (treeId, treeNode) {
          that.initDiyDom2(treeId, treeNode)
        }
      },
      callback: {
        onCollapse: function (event, treeId, treeNode) {
          //冻结层关闭树形数据
          // 收起树形折叠数据，冻结层的高度也要一致
          var allnoFreezecolsDivheight = null
          $("#" + that.tableHelper.id + ".ztreetable.ztree.noFreezecolsDiv>li").each(function () {
            allnoFreezecolsDivheight+=$(this).height()
          });
          if(that.tableHelper.freezecolsNum>0){
            if($("#obj2_" + that.tableHelper.id + ".ztreetable.ztree.freezecolsDiv").height()>allnoFreezecolsDivheight){
              $("#obj2_" + that.tableHelper.id + ".ztreetable.ztree.freezecolsDiv").css({
                "overflow": "auto",
                "height": allnoFreezecolsDivheight + "px"
              })
              $("#" + that.tableHelper.id + ".ztreetable.ztree.noFreezecolsDiv").css({
                "overflow": "auto",
                "height": allnoFreezecolsDivheight+17 + "px"
              })
            }
          }
        },
        onExpand: function (event, treeId, treeNode) {
          //冻结层打开树形数据
          $('#' + that.tableHelper.viewId + ' .goicon').unbind("click").bind("click", that.kpiTurnMore);
          // 打开树形折叠数据，冻结层的高度也要一致
          var allnoFreezecolsDivheight = null
          $("#" + that.tableHelper.id + ".ztreetable.ztree.noFreezecolsDiv>li").each(function () {
            allnoFreezecolsDivheight+=$(this).height()
          });
          if(that.tableHelper.freezecolsNum>0){
            if((that.tableHelper.getAvailableScreenHeight-160)>allnoFreezecolsDivheight){
              //没有有上下滚动条
              $("#" + that.tableHelper.id + ".ztreetable.ztree.noFreezecolsDiv").css({
                "overflow": "auto",
                "height": allnoFreezecolsDivheight + "px"
              })
              $("#obj2_" + that.tableHelper.id + ".ztreetable.ztree.freezecolsDiv").css({
                "overflow": "auto",
                "height": allnoFreezecolsDivheight + "px"
              })
            }
            if((that.tableHelper.getAvailableScreenHeight-160)<allnoFreezecolsDivheight){
              $("#" + that.tableHelper.id + ".ztreetable.ztree.noFreezecolsDiv").css({
                "overflow": "auto",
                "height": (that.tableHelper.getAvailableScreenHeight-160) + "px"
              })
              $("#obj2_" + that.tableHelper.id + ".ztreetable.ztree.freezecolsDiv").css({
                "overflow": "auto",
                "height":(that.tableHelper.getAvailableScreenHeight-177) + "px"
              })
            }
          }
        },
        beforeExpand: function (treeId, treeNode) {
          var nodes = that.treeObj.getNodeByTId(treeNode.tId.substring(5));
          that.treeObj.expandNode(nodes)
          return true;
        },
        beforeCollapse: function (treeId, treeNode) {
          var nodes = that.treeObj.getNodeByTId(treeNode.tId.substring(5));
          that.treeObj.expandNode(nodes);
          return true;
        },
        onClick: function (event, treeId, treeNode) {
          var nodes = that.treeObj.getNodeByTId(treeNode.tId.substring(5));
          that.treeObj.selectNode(nodes);
        }
      },
      data: {
        simpleData: {
          enable: true
        }
      }
    };
    this.setting = {
      view: {
        dblClickExpand: false,
        showLine: false,
        showIcon: false,
        addDiyDom: function (treeId, treeNode) {
          that.initDiyDom(treeId, treeNode)
        }
      },
      callback: {
        onCollapse: function (event, treeId, treeNode) {
          // $("#obj2_"+treeNode.tId+"_switch").click();
          if(that.tableHelper.freezecolsNum==0||that.tableHelper.freezecolsNum>0){
            //只用冻结列启用的时候才需要同步展开2层的树
            var nodes2 = that.treeObj2.getNodeByTId("obj2_" + treeNode.tId);
            that.treeObj2.expandNode(nodes2, false);
          }
          var allnoFreezecolsDivheight = null
          $("#" + that.tableHelper.id + ".ztreetable.ztree.noFreezecolsDiv>li").each(function () {
            allnoFreezecolsDivheight+=$(this).height()
          });
          if(that.tableHelper.freezecolsNum>0){
            if($("#obj2_" + that.tableHelper.id + ".ztreetable.ztree.freezecolsDiv").height()>allnoFreezecolsDivheight){
              $("#obj2_" + that.tableHelper.id + ".ztreetable.ztree.freezecolsDiv").css({
                "overflow": "auto",
                "height": allnoFreezecolsDivheight + "px"
              })
            }
          }
        },
        onExpand: function (event, treeId, treeNode) {
          if(that.tableHelper.freezecolsNum==0||that.tableHelper.freezecolsNum>0){
            var nodes2 = that.treeObj2.getNodeByTId("obj2_" + treeNode.tId);
            that.treeObj2.expandNode(nodes2, true);
          }
          $('#' + that.tableHelper.viewId + ' .goicon').unbind("click").bind("click", that.kpiTurnMore);
        },
        beforeExpand: function (treeId, treeNode) {
           //点击加号展开之前，如果表格内容的高度小于默认的高度，这需要加大高度
          if($(".ztree.ztreetable.noFreezecolsDiv").height()<that.tableHelper.getAvailableScreenHeight){
            $('#ztreetable_section').css({ "height": that.tableHelper.getAvailableScreenHeight+ "px"})
            $(".ztree.ztreetable.noFreezecolsDiv").css({"height":(that.tableHelper.getAvailableScreenHeight-160)+ "px","overflow": "auto"});
            $(".ztree.ztreetable.freezecolsDiv").css({ "height": (that.tableHelper.getAvailableScreenHeight-177)+ "px","overflow": "auto"})
          }
          if(that.tableHelper.freezecolsNum==0||that.tableHelper.freezecolsNum>0){
            var nodes2 = that.treeObj2.getNodeByTId("obj2_" + treeNode.tId);
            that.treeObj2.expandNode(nodes2);
            return true;
          }
        },
        beforeCollapse: function (treeId, treeNode) {
          if(that.tableHelper.freezecolsNum==0||that.tableHelper.freezecolsNum>0){
            var nodes2 = that.treeObj2.getNodeByTId("obj2_" + treeNode.tId);
            that.treeObj2.expandNode(nodes2);
            return true;
          }
        },
        onClick: function (event, treeId, treeNode) {
          if(that.tableHelper.freezecolsNum==0||that.tableHelper.freezecolsNum>0){
            var nodes2 = that.treeObj2.getNodeByTId("obj2_" + treeNode.tId);
            that.treeObj2.selectNode(nodes2);
          }
         
        }
      },
      data: {
        simpleData: {
          enable: true
        }
      }
    };
    //刷新树的内容 up=1不刷新表头数据
    this.updateNode = function (list, type, up, startNum) {
      //2.3 处理表体数据 添加显示的字段
      if (!commonUtil.isNotEmpty(startNum)) {
        // 没有传序号过来，就没人从第一页开始
        startNum = 1;
      }
      that.treeTableLLXHelper.initData(list, that.tableHelper.headList, 0, that.getFirstTdWidth(), startNum);
      that.tableHelper.showNodes = list;
      if (commonUtil.isNotEmpty(type) && type == 1) {
        that.tableHelper.zTreeNodes = list;
      }
      // if(!commonUtil.isNotEmpty(up) ){
      //   that.initViewHead();
      // }
      if (that.tableHelper.headList.length > 0) {
        that.treeObj = $.fn.zTree.init($("#" + that.tableHelper.id), that.setting, that.tableHelper.showNodes);
        //冻结列初始化构建的上层数据
        if ((that.tableHelper.freezecolsNum ==0||that.tableHelper.freezecolsNum > 0)&& that.tableHelper.freezecolsNum < 4 && that.tableHelper.freezecolsWidth && that.tableHelper.freezecolsWidth > 0) {
          that.treeObj2 = $.fn.zTree.init($("#" + "obj2_" + that.tableHelper.id), that.setting2, that.tableHelper.showNodes);
        }
        if (!commonUtil.isNotEmpty(up) || up == 0) {
          that.initViewHead();
        }
        that.rendererViewAfter(up);
      }

      // that.initViewHead();
    };

    //分页回调事件 pageNum 第几页 pageInfo分页对象 type 固定为pageinfo
    this.callbackPageInfo = function (pageNum, pageInfo, type, jq) {};
   //表格当前单元格双击
    // this.callbackkpidblclick = function (e) {};
     //双击表格行  rowObj 行对象   iscount代码双击是不是平均、统计、计�书的特殊行
    this.callbackdbtablerow = function (iscount,rowObj,e){};
    //排序字段回调 curUpDownBtnType 排序类型：1升序，0降序 curUpDownBtnName 排序字段 type 类型，固定是orderby，
    this.callbackOrderBy = function (curUpDownBtnType, curUpDownBtnName, type, e) {};
    //单元格指标字段回调 callbackkpiTurnMore
    //字段：kpiTurnMoreBtnType,kpiTurnMoreBtnColName,kpiTurnMoreBtnRowName 分别表示点击的指标类型(1-字体下转，2-上升下钻，3-下降下钻，4-警告下钻),列指标,行指标
    //(up,down,warn=> 分别代表 上升，下降，警告)  (font#1,up#1,down#1,warn#1=> 分别代表 字体可下钻，上升可下钻，下降可下钻，警告可下钻)
    //colObj 列对象 ，rowObj 行对象
    this.callbackkpiTurnMore = function (kpiTurnMoreBtnType, kpiTurnMoreBtnColName, kpiTurnMoreBtnRowName, colObj, rowObj, e) {};
    //页面元素构造器
    this.rendererView = function () {
      var html = '';
      html += '<div class="ztreetable_section" id="ztreetable_section">';
      if ((that.tableHelper.freezecolsNum > 0&& that.tableHelper.freezecolsNum < 4 )&& (that.tableHelper.freezecolsWidth && that.tableHelper.freezecolsWidth > 500)) {
        html += '<div class="ztree_head" style="width:' + that.tableHelper.freezecolsWidth + 'px;">'
      } else {
        html += '<div class="ztree_head">'
      }
      html += '  <div class="ztreeBox" >';
      //1、构建标头
      if (commonUtil.isNotEmpty(that.tableHelper.tableName)) {
        html += '  <div class="ztree_header">' + that.tableHelper.tableName + '</div>'
      } else {
        html += '  <div class="ztree_header"></div>'
      }
      //2、构建所属期和单位
      if (commonUtil.isNotEmpty(that.tableHelper.creatTime) || commonUtil.isNotEmpty(that.tableHelper.unit)) {
        html += '  <div class="ztree_con">';
        if (commonUtil.isNotEmpty(that.tableHelper.creatTime)) {
          html += '<span class="ztree_con_1">'+that.tableHelper.creatTimeName+':' + that.tableHelper.creatTime + '</span>';
        }
        if (commonUtil.isNotEmpty(that.tableHelper.unit)) {
          html += '<span class="ztree_con_2">'+that.tableHelper.unitName+':' + that.tableHelper.unit + '</span>';
        }
        html += '</div>';
      }
      html += '</div>';
      //3、构建树形内容
      html += '<div id="headerAndData" class="headerAndData" style="overflow: hidden;margin: 0 auto;">';
      html += '  <div id="' + that.tableHelper.id + '" class="ztree ztreetable noFreezecolsDiv">';
      html += '  </div>';
      if ((that.tableHelper.freezecolsNum==0||that.tableHelper.freezecolsNum > 0) && that.tableHelper.freezecolsNum < 4 && that.tableHelper.freezecolsWidth && that.tableHelper.freezecolsWidth > 0) {
        html += '  <div id="obj2_' + that.tableHelper.id + '" class="ztree ztreetable freezecolsDiv">';
        html += '  </div>';
      }
      html += '  </div>';
      //4、构建分页器
      if (that.tableHelper.pageinfo_use) {
        if (that.tableHelper.userpagesize == 1) {
          //使用每页多少条显示功能
          var total = that.tableHelper.total;
          html += '<div class="pagination_box_total">   共 ' + total + ' 条</div>' + '<div class="pagination_pagesize"><select id="pagesizeselt"  name="pagesizeselt"><option   value="5"> 5条/页 </option><option   value="10" selected = "selected"> 10条/页 </option><option   value="15"> 15条/页 </option><option   value="20"> 20条/页 </option><option   value="30"> 30条/页 </option></select></div>'
        }
        html += '<div class="pagination_box">';
        html += '  <div id="pagTabTool_' + that.tableHelper.id + '" class="pagTabTool"></div>';
        html += '  </div>';
      }
      html += '  </div>';
      //初始化页面
      $("#" + that.tableHelper.viewId).html(html);
    };
    //（初始化底层数据）列表数据构造器自定义节点的内容,构建行内容
    this.initDiyDom = function (treeId, treeNode) {
      var switchObj = $("#" + treeNode.tId + "_switch");
      var icoObj = $("#" + treeNode.tId + "_ico");
      var spanObj = $("#" + treeNode.tId + "_span");
      //为了兼容通用查询平台的单维度下钻
      if(that.treeTableLLXHelper.showData.isShowSortno==0&&that.treeTableLLXHelper.showData.system=="tycx"&&
        that.getLastHead()[0].data.link!=""&&that.getLastHead()[0].data.link!=null){
        $("#" + treeNode.tId + "_span").addClass("goicon")
        $("#" + treeNode.tId + "_span").addClass("font")
        $("#" + treeNode.tId + "_span").attr("_data_type",1)
        $("#" + treeNode.tId + "_span").attr("_data_colname",that.getLastHead()[0].dataIndex)
        $("#" + treeNode.tId + "_span").attr("_data_rowname",treeNode.tId)
      }
      // debugger
      switchObj.remove();
      spanObj.remove();
      icoObj.remove();
      var liObj = $("#" + treeNode.tId);
      var aObj = $("#" + treeNode.tId + "_a");
      aObj.attr('title', treeNode[that.getLastHead()[0].dataIndex]);
      var spaceWidth = 15;
      var spaceStr = "<span style='height:1px;display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
      aObj.attr('text-decoration', "none");
      if (that.treeTableLLXHelper.showData.isTreeData) {
        var frishNode = that.tableHelper.dimensionality == 1 ? '<div class="tbodycell tbodycell_left swich" style="width: ' + that.getFirstTdWidth() + 'px"></div>' : "";
      } else {
        // that.getLastHead()[0].align 取到第一列的数据
        var frishNode = that.tableHelper.dimensionality == 1 ? '<div class="tbodycell swich tbodycell_' + that.getLastHead()[0].align + '" style="width: ' + that.getFirstTdWidth() + 'px"></div>' : "";
      }

      aObj.append(frishNode);
      //增加内容
      that.tableHelper.dimensionality == 3 ? switchObj.before(spaceStr) : "";
      var nodeContentHtml = that.treeTableLLXHelper.getContentHtml(treeNode, that.getLastHead(), that.tableHelper.dimensionality, that.tableHelper.temple, that.getTDWidth(), treeNode.level + 1);
      aObj.append(nodeContentHtml);

      //更新节点时，判断hover高亮事件（此情况只会在冻结列时才会出现）
      that.listeningHoverEvent();

      //处理+/-号列
      var no;
      //第一模式指的是加号直接在维度的字段旁边，第二模式指的是加号在小计的字段旁边
      //有序号
      if (that.treeTableLLXHelper.showData.isShowSortno == 1) {
        //有序号且第一种显示模式
        if (that.tableHelper.dataShowModel == null || that.tableHelper.dataShowModel == 1) {
          //有序号dimensionality++  所以从2开始算起
          //有序号且第一种显示模式一维
          if (that.tableHelper.dimensionality == 2) {
            //有序号且第一种显示模式一维且数据属于树结构状态
            if (that.treeTableLLXHelper.showData.isTreeData) {
              no = 1;
              var div = $(liObj).find('div').eq(no);
              div.addClass('tbodycell_left');
              div.prepend(switchObj);
              // that.tableHelper.dimensionality==2?div.append(spanObj):"";
              that.tableHelper.dimensionality < 3 ? switchObj.before(spaceStr) : "";
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
            //有序号且第一种显示模式一维且数据不是树结构状态
            else {
              no = that.tableHelper.dimensionality > 2 ? treeNode.level + 1 : 0;
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
          }
          //有序号且第一种显示模式二维或者有序号且第一种显示模式三维
          if (that.tableHelper.dimensionality == 3 || that.tableHelper.dimensionality == 4) {
            no = that.tableHelper.dimensionality > 2 ? treeNode.level + 1 : 0;
            var div = $(liObj).find('div').eq(no);
            div.addClass('tbodycell_left');
            div.prepend(switchObj);
            that.tableHelper.mNode[treeNode.tId] = treeNode;
          }
        }
        //有序号且第二种显示模式
        else {
          //有序号dimensionality++  所以从2开始算起
          //有序号且第二种显示模式模式一维
          if (that.tableHelper.dimensionality == 2) {
            //有序号且第二种显示模式一维且数据属于树结构状态
            if (that.treeTableLLXHelper.showData.isTreeData) {
              no = 1;
              var div = $(liObj).find('div').eq(no);
              div.addClass('tbodycell_left')
              div.prepend(switchObj);
              that.tableHelper.dimensionality < 3 ? switchObj.before(spaceStr) : "";
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
            //有序号且第二种显示模式一维且数据不是树结构状态
            else {
              no = that.tableHelper.dimensionality > 2 ? treeNode.level + 1 : 0;
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
          }
          //有序号且第二种显示模式二维或者有序号且第二种显示模式三维
          if (that.tableHelper.dimensionality == 3 || that.tableHelper.dimensionality == 4) {
            no = that.tableHelper.dimensionality > 2 ? treeNode.level + 2 : 0;
            var div = $(liObj).find('div').eq(no);
            div.prepend(switchObj);
            // 第二种显示模式二维度去掉加号
            if (that.tableHelper.dimensionality == 3) {
              $(".level1.switch.noline_docu").hide();
            }
            // 第二种显示模式三维度去掉加号
            if (that.tableHelper.dimensionality == 4) {
              $(".level2.switch.noline_docu").hide();
            }
            that.tableHelper.mNode[treeNode.tId] = treeNode;
          }
        }
      }
      //无序号
      else {
        //无序号且第一种显示模式
        if (that.tableHelper.dataShowModel == null || that.tableHelper.dataShowModel == 1) {
          //无序号且第一种显示模式一维
          if (that.tableHelper.dimensionality == 1) {
            //无序号且第一种显示模式一维且数据属于树结构状态
            if (that.treeTableLLXHelper.showData.isTreeData) {
              no = 0;
              var div = $(liObj).find('div').eq(no);
              div.addClass('tbodycell_left')
              div.prepend(switchObj);
              that.tableHelper.dimensionality == 1 ? div.append(spanObj) : "";
              that.tableHelper.dimensionality < 3 ? switchObj.before(spaceStr) : "";
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
            //无序号且第一种显示模式一维且数据不是树结构状态
            else {
              no = that.tableHelper.dimensionality > 2 ? treeNode.level + 1 : 0;
              var div = $(liObj).find('div').eq(no);
              div.prepend(switchObj);
              that.tableHelper.dimensionality == 1 ? div.append(spanObj) : "";
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
          }
          //无序号且第一种显示模式二维或者无序号且第一种显示模式三维
          if (that.tableHelper.dimensionality == 2 || that.tableHelper.dimensionality == 3) {
            no = that.tableHelper.dimensionality > 1 ? treeNode.level : 0;
            var div = $(liObj).find('div').eq(no);
            div.addClass('tbodycell_left')
            div.prepend(switchObj);
            // 第二种显示模式二维度去掉加号
            if (that.tableHelper.dimensionality == 2) {
              $(".level1.switch.noline_docu").hide();
            }
            // 第二种显示模式三维度去掉加号
            if (that.tableHelper.dimensionality == 3) {
              $(".level2.switch.noline_docu").hide();
            }
            that.tableHelper.mNode[treeNode.tId] = treeNode;
          }
        }
        //无序号且第二种显示模式
        else {
          //无序号且第二种显示模式模式一维
          if (that.tableHelper.dimensionality == 1) {
            //无序号且第二种显示模式一维且数据属于树结构状态
            if (that.treeTableLLXHelper.showData.isTreeData) {
              no = 0;
              var div = $(liObj).find('div').eq(no);
              div.addClass('tbodycell_left');
              div.prepend(switchObj);
              that.tableHelper.dimensionality == 1 ? div.append(spanObj) : "";
              that.tableHelper.dimensionality < 3 ? switchObj.before(spaceStr) : "";
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
            //无序号且第二种显示模式一维且数据不是树结构状态
            else {
              no = that.tableHelper.dimensionality > 1 ? treeNode.level + 1 : 0;
              var div = $(liObj).find('div').eq(no);
              that.tableHelper.dimensionality == 1 ? div.append(spanObj) : "";
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
          }
          //无序号且第二种显示模式二维或者无序号且第二种显示模式三维
          if (that.tableHelper.dimensionality == 2 || that.tableHelper.dimensionality == 3) {
            no = that.tableHelper.dimensionality > 1 ? treeNode.level + 1 : 0;
            var div = $(liObj).find('div').eq(no);
            div.prepend(switchObj);

            // 第二种显示模式二维度去掉加号
            if (that.tableHelper.dimensionality == 2) {
              $(".level1.switch.noline_docu").hide();
            }
            // 第二种显示模式三维度去掉加号
            if (that.tableHelper.dimensionality == 3) {
              $(".level2.switch.noline_docu").hide();
            }
            that.tableHelper.mNode[treeNode.tId] = treeNode;
          }
        }
      }
      //节点变化时，监听滚动条是否产生，冻结列减去滚动条高度
      that.freezeTableHeaderFn();

    };
    //（初始化冻结数据。经过筛选以后）
    this.initDiyDom2 = function (treeId, treeNode) {
      var switchObj = $("#" + treeNode.tId + "_switch");
      var icoObj = $("#" + treeNode.tId + "_ico");
      var spanObj = $("#" + treeNode.tId + "_span");
      //为了兼容通用查询平台的单维度下钻
      if(that.treeTableLLXHelper.showData.isShowSortno==0&&that.treeTableLLXHelper.showData.system=="tycx"&&
        that.getLastHead()[0].data.link!=""&&that.getLastHead()[0].data.link!=null){
        $("#" + treeNode.tId + "_span").addClass("goicon")
        $("#" + treeNode.tId + "_span").addClass("font")
        $("#" + treeNode.tId + "_span").attr("_data_type",1)
        $("#" + treeNode.tId + "_span").attr("_data_colname",that.getLastHead()[0].dataIndex)
        $("#" + treeNode.tId + "_span").attr("_data_rowname",treeNode.tId)
      }
      switchObj.remove();
      spanObj.remove();
      icoObj.remove();
      var liObj = $("#" + treeNode.tId);
      var aObj = $("#" + treeNode.tId + "_a");
      aObj.attr('title', treeNode[that.getLastHead()[0].dataIndex]);
      // aObj.attr('title', treeNode.name);
      var spaceWidth = 15;
      var spaceStr = "<span style='height:1px;display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
      aObj.attr('text-decoration', "none");
      if (that.treeTableLLXHelper.showData.isTreeData) {
        var frishNode = that.tableHelper.dimensionality == 1 ? '<div class="tbodycell tbodycell_left swich" style="width: ' + that.getFirstTdWidth() + 'px"></div>' : "";
      } else {
        // that.getLastHead()[0].align 取到第一列的数据
        var frishNode = that.tableHelper.dimensionality == 1 ? '<div class="tbodycell swich tbodycell_' + that.getLastHead()[0].align + '" style="width: ' + that.getFirstTdWidth() + 'px"></div>' : "";
      }
      aObj.append(frishNode);
      //增加内容
      that.tableHelper.dimensionality == 3 ? switchObj.before(spaceStr) : "";

      //冻结列数据截取
      var _getLastHeadobj = that.getLastHeadAfterFilter();
      var nodeContentHtml = that.treeTableLLXHelper.getContentHtml(treeNode, _getLastHeadobj, that.tableHelper.dimensionality, that.tableHelper.temple, that.getTDWidth(), treeNode.level + 1);
      aObj.append(nodeContentHtml);
      //处理+/-号列
      var no;
      //第一模式指的是加号直接在维度的字段旁边，第二模式指的是加号在小计的字段旁边
      //有序号
      if (that.treeTableLLXHelper.showData.isShowSortno == 1) {
        //有序号且第一种显示模式
        if (that.tableHelper.dataShowModel == null || that.tableHelper.dataShowModel == 1) {
          //有序号dimensionality++  所以从2开始算起
          //有序号且第一种显示模式一维
          if (that.tableHelper.dimensionality == 2) {
            //有序号且第一种显示模式一维且数据属于树结构状态
            if (that.treeTableLLXHelper.showData.isTreeData) {
              no = 1;
              var div = $(liObj).find('div').eq(no);
              div.addClass('tbodycell_left');
              div.prepend(switchObj);
              // that.tableHelper.dimensionality==2?div.append(spanObj):"";
              that.tableHelper.dimensionality < 3 ? switchObj.before(spaceStr) : "";
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
            //有序号且第一种显示模式一维且数据不是树结构状态
            else {
              no = that.tableHelper.dimensionality > 2 ? treeNode.level + 1 : 0;
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
          }
          //有序号且第一种显示模式二维或者有序号且第一种显示模式三维
          if (that.tableHelper.dimensionality == 3 || that.tableHelper.dimensionality == 4) {
            no = that.tableHelper.dimensionality > 2 ? treeNode.level + 1 : 0;
            var div = $(liObj).find('div').eq(no);
            div.addClass('tbodycell_left');
            div.prepend(switchObj);
            that.tableHelper.mNode[treeNode.tId] = treeNode;
          }
        }
        //有序号且第二种显示模式
        else {
          //有序号dimensionality++  所以从2开始算起
          //有序号且第二种显示模式模式一维
          if (that.tableHelper.dimensionality == 2) {
            //有序号且第二种显示模式一维且数据属于树结构状态
            if (that.treeTableLLXHelper.showData.isTreeData) {
              no = 1;
              var div = $(liObj).find('div').eq(no);
              div.addClass('tbodycell_left')
              div.prepend(switchObj);
              that.tableHelper.dimensionality < 3 ? switchObj.before(spaceStr) : "";
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
            //有序号且第二种显示模式一维且数据不是树结构状态
            else {
              no = that.tableHelper.dimensionality > 2 ? treeNode.level + 1 : 0;
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
          }
          //有序号且第二种显示模式二维或者有序号且第二种显示模式三维
          if (that.tableHelper.dimensionality == 3 || that.tableHelper.dimensionality == 4) {
            no = that.tableHelper.dimensionality > 2 ? treeNode.level + 2 : 0;
            var div = $(liObj).find('div').eq(no);
            div.prepend(switchObj);
            // 第二种显示模式二维度去掉加号
            if (that.tableHelper.dimensionality == 3) {
              $(".level1.switch.noline_docu").hide();
            }
            // 第二种显示模式三维度去掉加号
            if (that.tableHelper.dimensionality == 4) {
              $(".level2.switch.noline_docu").hide();
            }
            that.tableHelper.mNode[treeNode.tId] = treeNode;
          }
        }
      }
      //无序号
      else {
        //无序号且第一种显示模式
        if (that.tableHelper.dataShowModel == null || that.tableHelper.dataShowModel == 1) {
          //无序号且第一种显示模式一维
          if (that.tableHelper.dimensionality == 1) {
            //无序号且第一种显示模式一维且数据属于树结构状态
            if (that.treeTableLLXHelper.showData.isTreeData) {
              no = 0;
              var div = $(liObj).find('div').eq(no);
              div.addClass('tbodycell_left')
              div.prepend(switchObj);
              that.tableHelper.dimensionality == 1 ? div.append(spanObj) : "";
              that.tableHelper.dimensionality < 3 ? switchObj.before(spaceStr) : "";
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
            //无序号且第一种显示模式一维且数据不是树结构状态
            else {
              no = that.tableHelper.dimensionality > 2 ? treeNode.level + 1 : 0;
              var div = $(liObj).find('div').eq(no);
              div.prepend(switchObj);
              that.tableHelper.dimensionality == 1 ? div.append(spanObj) : "";
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
          }
          //无序号且第一种显示模式二维或者无序号且第一种显示模式三维
          if (that.tableHelper.dimensionality == 2 || that.tableHelper.dimensionality == 3) {
            no = that.tableHelper.dimensionality > 1 ? treeNode.level : 0;
            var div = $(liObj).find('div').eq(no);
            div.addClass('tbodycell_left')
            div.prepend(switchObj);
            // 第二种显示模式二维度去掉加号
            if (that.tableHelper.dimensionality == 2) {
              $(".level1.switch.noline_docu").hide();
            }
            // 第二种显示模式三维度去掉加号
            if (that.tableHelper.dimensionality == 3) {
              $(".level2.switch.noline_docu").hide();
            }
            that.tableHelper.mNode[treeNode.tId] = treeNode;
          }
        }
        //无序号且第二种显示模式
        else {
          //无序号且第二种显示模式模式一维
          if (that.tableHelper.dimensionality == 1) {
            //无序号且第二种显示模式一维且数据属于树结构状态
            if (that.treeTableLLXHelper.showData.isTreeData) {
              no = 0;
              var div = $(liObj).find('div').eq(no);
              div.addClass('tbodycell_left');
              div.prepend(switchObj);
              that.tableHelper.dimensionality == 1 ? div.append(spanObj) : "";
              that.tableHelper.dimensionality < 3 ? switchObj.before(spaceStr) : "";
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
            //无序号且第二种显示模式一维且数据不是树结构状态
            else {
              no = that.tableHelper.dimensionality > 1 ? treeNode.level + 1 : 0;
              var div = $(liObj).find('div').eq(no);
              that.tableHelper.dimensionality == 1 ? div.append(spanObj) : "";
              that.tableHelper.mNode[treeNode.tId] = treeNode;
            }
          }
          //无序号且第二种显示模式二维或者无序号且第二种显示模式三维
          if (that.tableHelper.dimensionality == 2 || that.tableHelper.dimensionality == 3) {
            no = that.tableHelper.dimensionality > 1 ? treeNode.level + 1 : 0;
            var div = $(liObj).find('div').eq(no);
            div.prepend(switchObj);

            // 第二种显示模式二维度去掉加号
            if (that.tableHelper.dimensionality == 2) {
              $(".level1.switch.noline_docu").hide();
            }
            // 第二种显示模式三维度去掉加号
            if (that.tableHelper.dimensionality == 3) {
              $(".level2.switch.noline_docu").hide();
            }
            that.tableHelper.mNode[treeNode.tId] = treeNode;
          }
        }
      }


    };
    //分页构造器
    this.initPageInfo = function () {
      if (that.tableHelper.pageinfo_front) {
        that.pageInfo.pages = (that.tableHelper.zTreeNodes.length - that.tableHelper.zTreeNodes.length % that.pageInfo.pageSize) / that.pageInfo.pageSize + 1;
      }
      $("#pagTabTool_" + that.tableHelper.id).pagination(that.pageInfo.pages,{
        items_per_page: 1, 
        current_page: that.pageInfo.pageNum - 1, //当前选中的页面
        num_edge_entries: 0, //	两侧显示的首尾分页的条目数
        num_display_entries: 5, //连续分页主体部分显示的分页条目数
        link_to: "javascript:void(0);", //分页的链接
        callback: function (pageNum, jq) {
          if (that.tableHelper.pageinfo_callback) {
            that.pageInfo.pageNum = pageNum + 1;
            if (that.tableHelper.pageinfo_front) {
              //如果是前台分页
              var list = that.tableHelper.zTreeNodes.slice((that.pageInfo.pageNum - 1) * that.pageInfo.pageSize, that.pageInfo.pageNum * that.pageInfo.pageSize);
              that.updateNode(list);
            } else {
              if (commonUtil.isFunc(that.callbackPageInfo)) {
                that.callbackPageInfo(pageNum + 1, that.pageInfo, "pageinfo", jq);
              }
            }
          } else {
            that.updateNode(that.pageInfo.list, 1);
          }
        }
      });
      if (that.tableHelper.userpagesize == 1) {
        setTimeout(function () {
          //选择每一页的数据大小
          $("#pagesizeselt").change(function () {
            var jqdiv = $("#pagTabTool_" + that.tableHelper.id)
            var pagesizenum = $("#pagesizeselt option:selected").val();
            that.pageInfo.pageSize = Number(pagesizenum)
            that.pageInfo.pages = Math.ceil(that.tableHelper.total/that.pageInfo.pageSize)
            that.callbackPageInfo(that.pageInfo.pageNum, that.pageInfo);
            // 重新绘制一遍分页（更改pageSize大小后页码会变化）
            $("#pagTabTool_" + that.tableHelper.id).pagination(that.pageInfo.pages,{
              items_per_page: 1, 
              current_page: that.pageInfo.pageNum - 1, //当前选中的页面
              num_edge_entries: 0, //	两侧显示的首尾分页的条目数
              num_display_entries: 5, //连续分页主体部分显示的分页条目数
              link_to: "javascript:void(0);", //分页的链接
              callback: function (pageNum, jq) {
                if (that.tableHelper.pageinfo_callback) {
                  that.pageInfo.pageNum = pageNum + 1;
                  if (that.tableHelper.pageinfo_front) {
                    //如果是前台分页
                    var list = that.tableHelper.zTreeNodes.slice((that.pageInfo.pageNum - 1) * that.pageInfo.pageSize, that.pageInfo.pageNum * that.pageInfo.pageSize);
                    that.updateNode(list);
                  } else {
                    if (commonUtil.isFunc(that.callbackPageInfo)) {
                      that.callbackPageInfo(pageNum + 1, that.pageInfo, "pageinfo", jq);
                    }
                  }
                } else {
                  that.updateNode(that.pageInfo.list, 1);
                }
              }
            });
          })
        }, 1);
      }

    };
    //表头构造器
    this.initViewHead = function () {
      var _that = this;
      //获取整个表头的内容
      this.getTableHeadHtml = function (viewWidth, headList, type, tdWidth, headOverflow) {
        var html = '';
        //设定固定宽度，表头根据固定宽度产生滚动条
        if ((that.tableHelper.freezecolsNum ==0||that.tableHelper.freezecolsNum > 0) && that.tableHelper.freezecolsNum < 4 && that.tableHelper.freezecolsWidth && that.tableHelper.freezecolsWidth > 0) {
          $("#" + that.tableHelper.id).css({
            "width": (that.tableHelper.freezecolsWidth) + "px"
          });
          var _freezecolsWidth = 'width:' + (that.tableHelper.freezecolsWidth) + 'px;';
          html += '<li class="headbox" style="' + _freezecolsWidth + '">';
        } else {
          html += '<li class="headbox">';
        }
        var _style = 'width:' + viewWidth + 'px;';
        if ((that.tableHelper.freezecolsNum ==0||that.tableHelper.freezecolsNum > 0) && that.tableHelper.freezecolsNum < 4 && that.tableHelper.freezecolsWidth && that.tableHelper.freezecolsWidth > 0) {
          html += '<div class="tableBoxDiv " style="overflow-y: scroll;">'
        } else {
          html += '<div class="tableBoxDiv">'
        }
        html += '<table class="noFreezeTableHead" border="0" cellspacing="0" cellpadding="0" style="' + _style + '">';
        html += _that.getHeadTRHtml(headList, type, tdWidth, headOverflow);
        html += '</table>';
        html += '</div>'

        if ((that.tableHelper.freezecolsNum ==0||that.tableHelper.freezecolsNum > 0) && that.tableHelper.freezecolsNum < 4 && that.tableHelper.freezecolsWidth && that.tableHelper.freezecolsWidth > 0) {
          var _style = "";
          var _getLastHeadAfterFilter = that.getLastHeadAfterFilter(); //获取筛选的表头
          var _allAddWidth = 0; //冻结列头总宽度
          for (var k in _getLastHeadAfterFilter) {
            _allAddWidth += _getLastHeadAfterFilter[k].minWidth; //diy下面设定的单元格宽度
          }
          if ("diy" == type) {
            _style = 'width:' + _allAddWidth + 'px;'; // 设置的单元格宽度加和
          } else {
            _style = 'width:' + (that.getTDWidth()) * (_getLastHeadAfterFilter.length) + 'px'; //设置的是单元格宽度*个数
          }
          html += '<div class="cloneTableBoxDiv" style="position: absolute;top: 0;left: 0;' + _style + '">';
          html += '<table class="freezeTableHead"  border="0" cellspacing="0" cellpadding="0" style="' + _style + '">';
          html += _that.getHeadTRHtmlAfterFilter(headList, type, tdWidth, headOverflow);
          html += '</table>';
          html += '</div>'
        }
        html += '</li>';

        return html;
      };
      //获取筛选后的表头数据
      this.getHeadTRHtmlAfterFilter = function (headList, type, tdWidth, headOverflow) {
        var html = "";
        var heightNum = 23; //设置表头高度
        if (headList[0]) {
          //b表头第一列取最大值作为表头高度
          for (var j = 0; j < headList[0].length; j++) {
            if (Number(headList[0][j].data.rowHeight) > heightNum) {
              heightNum = headList[0][j].data.rowHeight;
            }
          }
        }
        var _headlayer = headList; //表头数据
        var _len = _headlayer.length; //表头数据的层数
        var _freezecolsNum = that.tableHelper.freezecolsNum; //冻结列
        for (var i = 0; i < _headlayer.length; i++) {
          var isLast = (i == _headlayer.length - 1);
          if (i == 0) {
            html += '<tr class="tr' + i + '" style="height:' + heightNum + 'px">';
          } else {
            html += '<tr class="tr' + i + '">';
          }

          var _lastNum = _headlayer.length - 1; //最后一列
          var _lastNumDate = _headlayer[i]; //最后一列数据

          for (var k = 0; k < _lastNumDate.length; k++) {
            if (that.treeTableLLXHelper.showData.isShowSortno == 1) {
              if (_freezecolsNum == 1) {
                if (_lastNumDate[k].hyhtlie == 0 || _lastNumDate[k].dataIndex == "hyht_zy_xh_sort") {
                  html += _that.getHeadTDHtml(_lastNumDate[k], type, tdWidth, isLast, headOverflow, i, k);
                }
              } else if (_freezecolsNum == 2) {
                if (_lastNumDate[k].hyhtlie == 0 || _lastNumDate[k].hyhtlie == 1 || _lastNumDate[k].dataIndex == "hyht_zy_xh_sort") {
                  html += _that.getHeadTDHtml(_lastNumDate[k], type, tdWidth, isLast, headOverflow, i, k);
                }
              } else if (_freezecolsNum == 3) {
                if (_lastNumDate[k].hyhtlie == 0 || _lastNumDate[k].hyhtlie == 1 || _lastNumDate[k].hyhtlie == 2 || _lastNumDate[k].dataIndex == "hyht_zy_xh_sort") {
                  html += _that.getHeadTDHtml(_lastNumDate[k], type, tdWidth, isLast, headOverflow, i, k);
                }
              }
            } else {
              //无序
              if (_freezecolsNum == 1) {
                if (_lastNumDate[k].hyhtlie == 0) {
                  html += _that.getHeadTDHtml(_lastNumDate[k], type, tdWidth, isLast, headOverflow, i, k);
                }
              } else if (_freezecolsNum == 2) {
                if (_lastNumDate[k].hyhtlie == 0 || _lastNumDate[k].hyhtlie == 1) {
                  html += _that.getHeadTDHtml(_lastNumDate[k], type, tdWidth, isLast, headOverflow, i, k);
                }
              } else if (_freezecolsNum == 3) {
                if (_lastNumDate[k].hyhtlie == 0 || _lastNumDate[k].hyhtlie == 1 || _lastNumDate[k].hyhtlie == 2) {
                  html += _that.getHeadTDHtml(_lastNumDate[k], type, tdWidth, isLast, headOverflow, i, k);
                }
              }
            }
          }
          html += '</tr>';
        }
        return html;
      };
      //构造一行的内容
      this.getHeadTRHtml = function (headList, type, tdWidth, headOverflow) {
        var html = "";
        var heightNum = 23; //设置表头高度
        if (headList[0]) {
          //b表头第一列取最大值作为表头高度
          for (var j = 0; j < headList[0].length; j++) {
            if (Number(headList[0][j].data.rowHeight) > heightNum) {
              heightNum = headList[0][j].data.rowHeight;
            }
          }
        }

        var _headlayer = headList; //表头数据
        for (var i = 0; i < _headlayer.length; i++) {
          var isLast = (i == _headlayer.length - 1);
          if (i == 0) {
            html += '<tr class="tr' + i + '" style="height:' + heightNum + 'px">';
          } else {
            html += '<tr class="tr' + i + '">';
          }
          for (var j = 0; j < _headlayer[i].length; j++) {
            html += _that.getHeadTDHtml(_headlayer[i][j], type, tdWidth, isLast, headOverflow, i, j);
          }
          html += '</tr>';
        }
        return html;
      };
      //构造一个td的内容
      this.getHeadTDHtml = function (data, type, tdWidth, isLast, headOverflow, rowIndex, colIndex) {
        var width = "";
        var _value = data.name;
        var _rowspan = data.rowSpan;
        var _colspan = data.colSpan;
        var useWidth = 0;
        if ("diy" == type) {
          useWidth = data.minWidth;
          useWidth = useWidth - _colspan * 1;
        } else {
          useWidth = _colspan * tdWidth;
        }
        if (headOverflow) {
          var useLen = (useWidth - (useWidth - 1) % 14) / 14;
          if (useLen < _value.length) {
            _value = _value.substring(0, useLen - 1) + "...";
          }
        }
        width = "width:" + useWidth + "px;max-width:" + useWidth + "px;";
        // width+= "overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";
        var _style = width;
        //处理列表排序
        if (isLast && data.isShowOrderBy) {
          var colCurHighColUp = data.curOrderBy == 1 ? "colCurHigh" : "";
          var colCurHighColDown = data.curOrderBy == 2 ? "colCurHigh" : "";
          var colBtnBox = '<div class= "colBtnBox"><div class="colUp ' + colCurHighColUp + '" _data_type="1" _data_name="' + data.dataIndex + '"></div><div class="colDown ' + colCurHighColDown + '" _data_type="2" _data_name="' + data.dataIndex + '"></div></div>';
          _value += colBtnBox;
        }
        var comment = data.data['comment'] && data.data['comment'].trim().length>0?data.data.comment:"暂无描述"
        if (that.tableHelper.temple == 'diy') {
          var html = '<td class="td' + rowIndex + '_' + colIndex + '" rowspan="' + _rowspan + '" colspan="' + _colspan + '" style=' + _style + '><div title="' + comment + '"style="width:100%;height: 100%;padding:6px 0;">' + _value + '</div></td>';
          // var html = '<td class="td' + rowIndex + '_' + colIndex + '" rowspan="' + _rowspan + '" colspan="' + _colspan + '" style=' + _style + '><div title='+comment+' style="width:100%;height: 100%;padding:6px 0;">' + _value + '</div></td>';
        } else {
          if (_colspan > 1) {
            var html = '<td rowspan="' + _rowspan + '" colspan="' + _colspan + '" style=' + _style + '><div title='+comment+' style="width:100%;height: 100%;padding:6px 0;">' + _value + '</div></td>';
          } else {
            useWidth = useWidth - 2;
            var html = '<td rowspan="' + _rowspan + '" colspan="' + _colspan + '" style=' + _style + '><div title="' + comment + '"style="width:' + useWidth + 'px;height: 100%;padding:6px 0;">' + _value + '</div></td>';
          }
        }
        // var html = '<td rowspan="'+_rowspan+'" colspan="'+_colspan+'" style='+_style+'><div style="width:100%;height: 100%;padding:6px 0;">'+_value+'</div></td>';
        return html;
      };
      var headHtml = _that.getTableHeadHtml(that.getViewUseWidth(), that.tableHelper.headList, that.tableHelper.temple, that.getTDWidth(), that.tableHelper.head_overflow);
      // var rows = $("#"+that.tableHelper.id).find('li');
      var rows = $("#" + that.tableHelper.id);
      if (that.tableHelper.headList.length > 0 && that.tableHelper.showNodes && that.tableHelper.showNodes.length > 0) {
        rows.eq(0).before(headHtml);
      } else {
        rows.eq(0).before(headHtml);
        $("#" + that.tableHelper.id).append('<li ><div style="line-height: 70px;border:1px solid #e9e9e9;" ><span style="margin-left:'+Math.ceil(document.body.clientWidth/2)+ 'px;">无符合条件数据</span></div></li>')
      }
    };
    //div容器的实际宽度
    this.getViewWidth = function () {
      if (this.tableHelper.fristWidth == 0) {
        this.tableHelper.fristWidth = parseInt($("#" + that.tableHelper.viewId).width() / 10) * 10 - 100;
      }
      return this.tableHelper.fristWidth;
    };
    //获取最后一列head
    this.getLastHead = function () {
      //如果序号列的情况下
      if (that.treeTableLLXHelper.showData.isShowSortno == 1) {
        var list = that.tableHelper.headList && that.tableHelper.headList.length > 0 ? that.tableHelper.headList[that.tableHelper.headList.length - 1] : [];
        var tmp = JSON.parse(JSON.stringify(list));
        if (that.tableHelper.headList[0]) {
          for (var i = 0; i < that.tableHelper.headList[0].length; i++) {
            if (that.tableHelper.headList[0][i]["allColSpan"]) {
              tmp.unshift(that.tableHelper.headList[0][i])
            }
          }
        }
        return tmp;
      } else if (that.treeTableLLXHelper.showData.isShowSortno == 0 || that.treeTableLLXHelper.showData.isShowSortno == null) {
        return that.tableHelper.headList && that.tableHelper.headList.length > 0 ? that.tableHelper.headList[that.tableHelper.headList.length - 1] : [];
      }

    };
    //截取冻结列数据长度
    this.getLastHeadAfterFilter = function () {
      //冻结列数
      var _freezecolsNum = that.tableHelper.freezecolsNum;
      var list = that.tableHelper.headList && (that.tableHelper.headList.length ==0||that.tableHelper.headList.length > 0) ? that.tableHelper.headList[that.tableHelper.headList.length - 1] : [];
      var tmp = JSON.parse(JSON.stringify(list));
      var newList = [];
      //遍历最后一列，配合冻结列数，筛选数据
      for (var a in tmp) {
        if (_freezecolsNum == 1) {
          if (tmp[a]["hyhtlie"] == 0) {
            newList.push(tmp[a]);
          }
        } else if (_freezecolsNum == 2) {
          if (tmp[a]["hyhtlie"] == 0 || tmp[a]["hyhtlie"] == 1) {
            newList.push(tmp[a]);
          }
        } else if (_freezecolsNum == 3) {
          if (tmp[a]["hyhtlie"] == 0 || tmp[a]["hyhtlie"] == 1 || tmp[a]["hyhtlie"] == 2) {
            newList.push(tmp[a]);
          }
        }
      }
      if (that.treeTableLLXHelper.showData.isShowSortno == 1) {
        //有序号 添加序号列
        if (that.tableHelper.headList[0]) {
          for (var i = 0; i < that.tableHelper.headList[0].length; i++) {
            if (that.tableHelper.headList[0][i]["allColSpan"]) {
              newList.unshift(that.tableHelper.headList[0][i])
            }
          }
        }
        return newList;
      } else if (that.treeTableLLXHelper.showData.isShowSortno == 0 || that.treeTableLLXHelper.showData.isShowSortno == null) {
        //无序号  筛选后返回
        return newList;
      }

    };
    //ztree的实际使用宽度
    this.getViewUseWidth = function () {
      var last = that.getLastHead();
      var width = 0;
      if ("diy" == that.tableHelper.temple) {
        for (var i = 0; i < last.length; i++) {
          width += last[i].minWidth;
        }
      } else {
        width = that.getViewWidth();
        // width = width - width%(last.length*10);
        var rdWidth = commonUtil.percentNum(width, last.length);

        if (rdWidth < 100) {
          width = 100 * last.length;
        }
        var rWidth = rdWidth * last.length;
        if (width < rWidth) {
          width = rWidth
        }
      }
      return width;
    };
    //获取平均Td的宽度
    this.getTDWidth = function () {
      var last = that.getLastHead();
      var width = that.getViewUseWidth();
      var rdWidth = commonUtil.percentNum(width, last.length);
      return rdWidth;
    };
    //获取第一列的宽度
    this.getFirstTdWidth = function () {
      var lastList = that.getLastHead();
      var node = lastList.length > 0 ? lastList[0] : null;
      var width = null;
      if ("diy" == that.tableHelper.temple) {
        width = node.minWidth;
      } else {
        width = that.getTDWidth();
      }
      return width;
    };
    //或取组件可用高度
    this.countFunction = function () {
      var bodyHeight = $(document.body)[0].clientHeight;
      return bodyHeight - 12 - 14;
    };
    //冻结表头方法
    this.freezeTableHeaderFn = function () {
      //启用冻结头部
      if (this.tableHelper.freezhhead == 1) {
        var _getAvailableScreenHeight =this.tableHelper.getAvailableScreenHeight;
        // this.tableHelper.aloneShowtable==2? 530:this.tableHelper.getAvailableScreenHeight; //获取整个表的高度
        var ztreeBox_h = $(".ztreeBox").height();
        var headbox_h = $(".headbox").height();
        var pagination_pagesize_h = $(".pagination_pagesize").height();
        var pagination_box_h = $(".pagination_box").height();
        if (_getAvailableScreenHeight) {
          if (ztreeBox_h) {
            if (headbox_h) {
              if (pagination_pagesize_h) {
                if (pagination_box_h) {
                  _getAvailableScreenHeight = _getAvailableScreenHeight - ztreeBox_h - headbox_h - pagination_pagesize_h - pagination_box_h;
                } else {
                  _getAvailableScreenHeight = _getAvailableScreenHeight - ztreeBox_h - headbox_h - pagination_pagesize_h;
                }
              } else {
                _getAvailableScreenHeight = _getAvailableScreenHeight - ztreeBox_h - headbox_h;
              }
            } else {
              _getAvailableScreenHeight = _getAvailableScreenHeight - ztreeBox_h;
            }
          }
        }
        var chazhiheight =$(".ztree.ztreetable.freezecolsDiv").height() - _getAvailableScreenHeight;
        //底层数据超出产生滚动
        if (chazhiheight > 0) {
          $(".ztree.ztreetable.noFreezecolsDiv").css({
            "overflow": "auto",
            "height": _getAvailableScreenHeight + "px"
          });
          $(".ztree.ztreetable.freezecolsDiv").css({
            "overflow": "auto",
            "height": _getAvailableScreenHeight + "px"
          }); 
          //监听数据超出产生滚动，表头也产生固定条，保证宽度一致
          //判断数据是否超出，让维度减去滚动条高度
          var chazhiwidth = $(".ztree.ztreetable.noFreezecolsDiv li").width() - $(".ztree.ztreetable.noFreezecolsDiv").width();
          if (chazhiwidth > 17) {
            // ScollHeight 是不同系统系统的滚动条多粗
            var sUserAgent = navigator.userAgent;
            var ScollHeight = 17
            if(navigator.platform == "Win32"|| navigator.platform == "Windows"){
              //window系统

              var ScollHeight = 17
            }else{
              var ScollHeight = 2
            }
            $(".ztree.ztreetable.freezecolsDiv").height(_getAvailableScreenHeight - ScollHeight);
          }
        }
       
      }
    };
    //页面加载完渲染
    this.rendererViewAfter = function (up) {
      //控制页面宽度
      $("#" + that.tableHelper.id + ".ztreetable.ztree li a div .textClass").each(function () {

      });
      $("#" + that.tableHelper.id + ".ztreetable.ztree li").each(function () {
        $(this).css("width", that.getViewUseWidth());
        $(this).bind("dblclick", that.kpidblclick);
      });
      $("#" + that.tableHelper.id).parent().width(that.getViewUseWidth());
      if (!commonUtil.isNotEmpty(up)) {
        //给排序增加绑定事件
        $('#' + that.tableHelper.viewId + ' .colUp').bind("click", that.colUpDownBtn);
        $('#' + that.tableHelper.viewId + ' .colDown').bind("click", that.colUpDownBtn);
      }
      //单元格指标绑定下钻事件
      $('#' + that.tableHelper.viewId + ' .goicon').bind("click", that.kpiTurnMore);

      if ((that.tableHelper.freezecolsNum ==0||that.tableHelper.freezecolsNum > 0) && that.tableHelper.freezecolsNum < 4 && that.tableHelper.freezecolsWidth && that.tableHelper.freezecolsWidth > 0) {
        //监听滚动固定列的时候让表头跟着数据一起滚动
        $("#" + that.tableHelper.id + ".ztreetable.ztree").scroll(function () {
          $('.headbox .tableBoxDiv')[0].scrollLeft = $("#" + that.tableHelper.id + ".ztreetable.ztree").scrollLeft();

        });
        //监听滚动表头滚动带动数据滚动(兼容笔记本电脑触摸鼠标)
        $('.headbox .tableBoxDiv').scroll(function () {
          $("#" + that.tableHelper.id + ".ztreetable.ztree")[0].scrollLeft = $('.headbox .tableBoxDiv').scrollLeft();
        });
        $(".headbox").height($(".tableBoxDiv").height()).css("overflow", "hidden");
        if ((that.tableHelper.freezecolsNum > 0&& that.tableHelper.freezecolsNum < 4 )&& (that.tableHelper.freezecolsWidth && that.tableHelper.freezecolsWidth > 500)) {
          $(".ztree_head").width(that.tableHelper.freezecolsWidth);
        }
        $(".ztreetable.ztree:first").css("overflow", "auto");
        $(".ztreetable_section").css("overflow", "hidden");
        $("table.freezeTableHead tr td div").css("height", "auto");
        $("table.freezeTableHead tr td").height($(".tableBoxDiv table.noFreezeTableHead tr").height());
        $(".cloneTableBoxDiv").height($(".tableBoxDiv").height());
        $(".freezeTableHead").height($(".tableBoxDiv").height());

      }
      //存在冻结头
      if ((that.tableHelper.freezecolsNum ==0||that.tableHelper.freezecolsNum > 0)&& that.tableHelper.freezecolsNum < 4 && that.tableHelper.freezecolsWidth && that.tableHelper.freezecolsWidth > 0) {
        //双击固定层的单元格行
        $("#obj2_" + that.tableHelper.id + ".ztreetable.ztree li").each(function () {
          $(this).bind("dblclick", that.kpidblclick);
        });
        //让固定列跟着数据一起滚动
        $(".ztree.ztreetable.noFreezecolsDiv").scroll(function () {
          $(".ztree.ztreetable.freezecolsDiv").scrollTop($(".ztree.ztreetable.noFreezecolsDiv").scrollTop());
        });
        //滚动固定列层（单独滚动带动底层数据滚动）
        $(".ztree.ztreetable.freezecolsDiv").scroll(function () {
          $(".ztree.ztreetable.noFreezecolsDiv").scrollTop($(".ztree.ztreetable.freezecolsDiv").scrollTop());
        });

        //头部的高度
        var headboxHeight = $(".headbox").height();

        var _freezecolsNum = that.tableHelper.freezecolsNum;
        var _getLastHeadAfterFilterList = that.getLastHeadAfterFilter(); //获取冻结的数据
        var _allAddWidth = 0;
        for (var k in _getLastHeadAfterFilterList) {
          _allAddWidth += _getLastHeadAfterFilterList[k].minWidth;
        }
        //让固定列固定在表头下方，数据上层
        if (that.tableHelper.temple == "simple") {
          //td平均宽度
            $(".ztree.ztreetable.freezecolsDiv").css({
              "width": that.getTDWidth() * _getLastHeadAfterFilterList.length,
              "top": headboxHeight + "px",
              "left": "0"
            })
         
        } else {
          //td设置的宽度minWidth
          $(".ztree.ztreetable.freezecolsDiv").css({
            "width": _allAddWidth,
            "top": headboxHeight + "px",
            "left": "0"
          })
        }
        
      }
      if(that.tableHelper.freezecolsNum ==0){
        // 没有冻结列的情况把冻结隐藏掉
        $(".cloneTableBoxDiv").addClass("freehidden");
        $(".freezecolsDiv").css({
          "display":"none",
        })
      }
      // 如果列的数量太少，小于规定的宽度，则把单位和日期的宽度也缩小和表格内容体一样
      if(($(".ztree_con").width()-$(".ztree.ztreetable.noFreezecolsDiv").width()>17)){
        $(".ztree_con").css({
          "width":$(".ztree.ztreetable.noFreezecolsDiv").width(),
          "margin":"0 auto"
        })
      }
      that.freezeTableHeaderFn();      
    };
    //固定列出现是，同步滑过高亮事件，同事监听两棵树节点高亮
    this.listeningHoverEvent = function () {
      if ((that.tableHelper.freezecolsNum ==0||that.tableHelper.freezecolsNum > 0)&& that.tableHelper.freezecolsNum < 4 && that.tableHelper.freezecolsWidth && that.tableHelper.freezecolsWidth > 0) {
        $(".ztreetable.ztree li a").hover(function () {
          if ($(this).attr("id").substring(0, 1) == "o") { //obj2_treeDemo1_39987eb4d0607929ef144676ad5d9ac8_56_a
            $(".ztreetable.ztree li a").not($(this).attr("id").substring(5)).removeClass("hoverColor");
            $("#" + $(this).attr("id").substring(5)).addClass("hoverColor");
            $("#" + $(this).attr("id")).addClass("hoverColor");
          } else {
            $(".ztreetable.ztree li a").not("#obj2_" + $(this).attr("id")).removeClass("hoverColor");
            $("#obj2_" + $(this).attr("id")).addClass("hoverColor");
            $("#" + $(this).attr("id")).addClass("hoverColor");
          }
        })
      }
    };
    //单元格指标绑定下钻方法
    this.kpiTurnMore = function (e) {
      var kpiTurnMoreBtnType = $(e.currentTarget).attr("_data_type");
      var kpiTurnMoreBtnColName = $(e.currentTarget).attr("_data_colname");
      var kpiTurnMoreBtnRowName = $(e.currentTarget).attr("_data_rowname");
      var lastList = that.getLastHead();
      var colObj = null;
      for (var i = 0; i < lastList.length; i++) {
        if (kpiTurnMoreBtnColName == lastList[i].dataIndex) {
          colObj = lastList[i];
        }
      }
      var rowObj = that.tableHelper.mNode[kpiTurnMoreBtnRowName];
      if (commonUtil.isFunc(that.callbackkpiTurnMore)) {
        that.callbackkpiTurnMore(kpiTurnMoreBtnType, kpiTurnMoreBtnColName, kpiTurnMoreBtnRowName, colObj, rowObj, e);
      }
    };
    //鼠标双击单元格每一行
    this.kpidblclick = function (e) {
      var kpiTurnMoreBtnRowName = $(e.currentTarget).attr("id");
      var  kpiRownameArr = kpiTurnMoreBtnRowName.split('_')   //把rowname切割，取到是第几行
      var pagesizenum =  $("#pagesizeselt option:selected").val()||10; //如果存在每页大小的话取到每页大小
      var iscount=Number(kpiRownameArr[2])>Number(pagesizenum)?false:true   //如果双击的是count svg sum等行数据的话，就不需要弹框
      var rowObj = that.tableHelper.mNode[kpiTurnMoreBtnRowName];
      if(commonUtil.isFunc(that.callbackdbtablerow)){
        that.callbackdbtablerow(iscount,rowObj,e);
      }
    };
    //页面排序按钮
    that.colUpDownBtn = function (e) {
      $("div").removeClass("colCurHigh");
      $(this).addClass("colCurHigh");
      var curUpDownBtnType = $(e.currentTarget).attr("_data_type");
      var curUpDownBtnName = $(e.currentTarget).attr("_data_name");
      //选中高亮，未选中的不高亮
      if (that.tableHelper.order_front) {
        //将数据的字段 curUpDownBtnName根据curUpDownBtnType进行排序，将1进行升序，2进行降序
        if (1 == curUpDownBtnType) {
          that.upData = that.tableHelper.showNodes.sort(commonUtil.compareNum(curUpDownBtnName, 1));
        } else {
          that.upData = that.tableHelper.showNodes.sort(commonUtil.compareNum(curUpDownBtnName, 2));
        }
        that.updateNode(that.tableHelper.showNodes);
      } else {
        if (commonUtil.isFunc(that.callbackOrderBy)) {
          that.callbackOrderBy(curUpDownBtnType, curUpDownBtnName, "orderby", e);
        }
      }
    };
    //初始构造函数
    this.init = function (viewId, data, pageInfo) {
      //1、初始化数据
      //记录原始数据
      that.data = data;
      that.tableHelper.viewId = viewId;
      that.tableHelper.id = that.tableHelper.viewId + "_" + commonUtil.guid();
      commonUtil.copyObj(data, that.tableHelper);
      //2、处理数据格式
      //2.1 处理表头数据 将表头转换成[tr[td]]格式
      that.tableHelper.headList = that.treeTableLLXHelper.init(data.columns, that.tableHelper.temple, that.getViewWidth());
      that.tableHelper.zTreeNodes = that.tableHelper.dataSource;
      that.pageInfo = pageInfo;
      //控制显示序号的位置
      if (that.treeTableLLXHelper.showData.isShowSortno == 1) {
        that.tableHelper.dimensionality++;
      }
      that.init2();

    };
    this.init2 = function () {
      //3、构建页面
      that.rendererView();
      //4、数据进行渲染
      if (that.tableHelper.pageinfo_use) {
        //4.2 分页器渲染
        that.initPageInfo();
      } else {
        //4.1 ztree数据渲染
        that.updateNode(that.tableHelper.zTreeNodes, 1);
      }

      // that.initViewHead();
      //4.3 宽高渲染
      // that.rendererViewAfter();
    };
    //页面变化，更新重新绘制表格
    this.pageUpdateinit2 = function (zTreeNodes,startNum,pageSize) {
      that.rendererView();
      that.initPageInfo();
      // list, type, up, startNum
      var index=pageSize
      $("#pagesizeselt option[value="+index+"]").attr("selected","selected");
      that.updateNode(zTreeNodes,1,0,startNum);

    }
    $(window).resize(function () {
      that.tableHelper.fristWidth == 0;
      if ("simple" == that.tableHelper.temple) {
        that.init2();
      }
      if ("diy" == that.tableHelper.temple) {
        that.init2();
      }
      //存在分页的时候 init2只更新initPageInfo 所以需要再一次更新uodateNode
      if (that.tableHelper.pageinfo_use) {
        that.updateNode(that.tableHelper.zTreeNodes, 1);
      }

    });

  } else {
    return new TableHelper2();
  }
}

//处理数据
var TreeTableLLXHelper2 = function () {
  this.showData = {
    "isShowSortno": 0, //是否显示序号
    "isTreeData": false, //是否树形数据
    "system": ""        //是什么系统在调用这个组件（通用查询平台只存在单维，下钻特殊处理）
  };
  if (this instanceof TreeTableLLXHelper2) {
    var that = this;
    var commonUtil = new CommonUtil();
    this.getContentHtml = function (data, rlist, dimensionality, type, width, level) {
      var html = '';
      if (data) {
        var i = dimensionality > 1 ? 0 : 1;
        for (; i < rlist.length; i++) {
          var _class = "tbodycell";
          //最后一行增加类
          i == rlist.length - 1 ? _class += " laserDivpaddingRight " : "";
          if (4 == dimensionality && level == 2 && i == 2) {
            _class += " tbodycell_padding sdad "
          }
          if (3 == dimensionality && ((level == 2 && i == 1) || (level == 3 && (i == 1 || i == 2)))) {
            if (level == 2 && i == 1) {

            } else {
              $(".level2.switch.noline_docu").hide();
            }
            _class += " tbodycell_padding switch tbodycell_left sdad "
          } else if (2 == dimensionality && (level == 2 && i == 1)) {
            if (that.showData.isShowSortno == 1 && that.showData.isTreeData) {
            } else {
              // $(".level1.switch.noline_docu").hide();
            }
            _class += " tbodycell_padding switch tbodycell_left"
          } else {
            //第一列增加类swich,且向左
            if (that.showData.isTreeData) {
              if (that.showData.isShowSortno == 1) {
                // 存在序号列的时候变成第二列增加类swich,且向左
                i == 0 ? _class += " swich" : _class += " tbodycell_" + rlist[i].align + " ";
                i == 1 ? _class += "tbodycell_padding tbodycell_left " : _class += " tbodycell_" + rlist[i].align + " ";
              } else if (that.showData.isShowSortno == null || that.showData.isShowSortno == 0) {
                i == 0 ? _class += " swich tbodycell_left " : _class += " tbodycell_" + rlist[i].align + " ";
              }
            } else {
              if (that.showData.isShowSortno == 1) {
                // 存在序号列的时候变成第二列增加类swich,且向左
                if (2 == dimensionality && (level == 1 && i == 1)) {
                  // 有序号并且单维度不是树状态结构
                  $(".level0.switch.noline_docu").hide();
                }
                i == 0 ? _class += " swich" : _class += " tbodycell_" + rlist[i].align + " ";
                i == 1 ? _class += "tbodycell_padding tbodycell_" + rlist[i].align + " " : '';
              } else if (that.showData.isShowSortno == null || that.showData.isShowSortno == 0) {
                if (1 == dimensionality && (level == 1 && i == 1)) {
                  // 无序号并且单维度不是树状态结构
                  $(".level0.switch.noline_docu").hide();
                }
                i == 0 ? _class += " swich tbodycell_left " : _class += " tbodycell_" + rlist[i].align + " ";
              }
            }
          }
          var _style = "";
          var _value = commonUtil.isNotEmpty(rlist[i].dataIndex) ? new String(data[rlist[i].dataIndex]).replace(/\s/g,"&nbsp") : "";
          // var _value = commonUtil.isNotEmpty(rlist[i].dataIndex) ? new String(data[rlist[i].dataIndex]).trim() : "";
          // white-space:pre是保留空格渲染
          if ("diy" == type) {
            _style = "width:" + rlist[i].minWidth + "px;white-space:pre";
          } else {
            _style = "width:" + width + "px;white-space:pre";
          }
          //判断图标显示
          var ifHasIcon = that.compareIfHasIcon(data, rlist[i]);
          if (_value == "小计") {
            _class = "tbodycell  tbodycell_left"
          }
          html += '<div class="' + _class + '" style="' + _style + '" title="' + _value + '"><span ' + ifHasIcon._attribute_font + ' class="' + ifHasIcon._class_font + ' textClass">' + _value + '</span>' + ifHasIcon._value_icon_html + '</div>';
        }
      }
      return html;
    };
    //判断单元格数据带出的标志
    //(up,down,warn=> 分别代表 上升，下钻，警告)
    //(font#1,up#1,down#1,warn#1=> 分别代表 字体可下钻，上升可下钻，下降可下钻，警告可下钻)
    this.compareIfHasIcon = function (data, rlist_i) {
      var html = '';
      var _value_icon_html = '';
      var _value_icon = '';
      var _class_font = '';
      var _attribute_font = '';
      if (commonUtil.isNotEmpty(rlist_i.dataIndex)) {
        html += data[rlist_i.dataIndex];
        if (commonUtil.isNotEmpty(data["hyhttable_" + rlist_i.dataIndex + "_kpi"])) {
          var stringKpi = data["hyhttable_" + rlist_i.dataIndex + "_kpi"];
          html += stringKpi;
          var arrayKpi = stringKpi.split(",");
          var htmlKpi = {
            'up': '<div class="goicon goup" _data_type="2" _data_colname="' + rlist_i.dataIndex + '" _data_rowname="' + data.tId + '"></div>',
            'down': '<div class="goicon godown" _data_type="3" _data_colname="' + rlist_i.dataIndex + '" _data_rowname="' + data.tId + '"></div>',
            'warn': '<div class="goicon gowarn" _data_type="4" _data_colname="' + rlist_i.dataIndex + '" _data_rowname="' + data.tId + '"></div>',
          }
          for (var i = 0; i < arrayKpi.length; i++) {
            var _type = arrayKpi[i].split("#")[0]; //返回的指标，font,up,down,warn
            var _type2 = arrayKpi[i].split("#")[1]; //返回的指标,
            if (commonUtil.isNotEmpty(_type)) {
              if ("font" == _type) {
                _class_font = "goicon font";
                _attribute_font = '_data_type="1" _data_colname="' + rlist_i.dataIndex + '" _data_rowname="' + data.tId + '"';
              }
              _value_icon += commonUtil.isNotEmpty(htmlKpi[_type]) ? htmlKpi[_type] : "";
            }
          }
        }
      }
      if (commonUtil.isNotEmpty(_value_icon)) {
        _value_icon_html += '<div class="markingBtn">';
        _value_icon_html += _value_icon;
        _value_icon_html += '</div>';
      }
      return {
        "_value_icon_html": _value_icon_html,
        "_class_font": _class_font,
        "_attribute_font": _attribute_font
      };
    };
    this.initData = function (data, headList, index, width, startNum) {
      var lastList = headList && headList.length > 0 ? headList[headList.length - 1] : [];
      var node = lastList.length > 0 ? lastList[index] : null;
      if (node && commonUtil.isNotEmpty(node.dataIndex)) {
        that.formartData(data, node.dataIndex, 0, width, startNum, "");
      }
    };
    this.formartData = function (data, name, level, width, startNum, fatherNum) {
      if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var newname = commonUtil.isNotEmpty(data[i][name]) ? data[i][name] : "";
          // var newname = commonUtil.isNotEmpty(data[i][name]) ? new String(data[i][name]).trim() : "";
          data[i].name = newname;
          data[i].level = level;
          //控制序号
          data[i].hyht_zy_xh_sort = (fatherNum) + (startNum + i)
          that.handleShowText(data[i], width);
          if (data[i].children && data[i].children.length > 0) {
            //控制有下钻二三级数据的时候序号
            that.formartData(data[i].children, name, (level + 1), width, 1, data[i].hyht_zy_xh_sort + "-");
          }
        }
      }
    };
    this.handleShowText = function (treeNode, mLength) {
      if (treeNode && treeNode.name && treeNode.name.length > 3) {
        var startLength = 37;
        var endLength = 2;
        var levelLength = 15;
        var textlength = 12;
        var text = treeNode.name;
        var level = treeNode.level;
        var oLength = mLength - level * levelLength - startLength - endLength;
        var o1 = parseInt(oLength / textlength);
        var o2 = text.length;
        if (o2 > o1) {
          var newText = new String(text).substring(0, o1 - 1);
          newText += "...";
          treeNode.name = newText;
        }
      }
    };
    this.init = function (data, type, viewWidth) {
      //获取表头的层级
      var tier = that.getHeadTier(data);
      //格式化表头数据 将数据转换成HeadTdObj对象
      var arr = that.formatHeadData(data);
      //表头处理结果
      var list = that.getColumnList(arr, tier);
      that.handleRowAndColpan(list, type);
      // 复制一列数据作为序号使用 uesxunhao来控制使用序号列，后期可以通过这个判断
      if (that.showData.isShowSortno == 1) {
        var hyhtxuhao = that.setHeadTdObj(list[0][0])
        hyhtxuhao.minWidth = 100
        hyhtxuhao.colSpan = 1
        hyhtxuhao.name = '序号'
        hyhtxuhao.rowSpan = list.length
        hyhtxuhao.dataIndex = 'hyht_zy_xh_sort'
        hyhtxuhao.hyhtid = ''
        hyhtxuhao.allColSpan = true;

        list[0].unshift(hyhtxuhao)
      }
      that.formarHead2(list, viewWidth);

      return list;
    };
    //格式化数据
    this.formatHeadData = function (data) {
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        var hyhtid = commonUtil.guid();
        arr.push(
          that.setHeadTdObj(
            data[i],
            null,
            hyhtid,
            0,
            i
          )
        );
        that.getCurRow(data[i], arr, hyhtid, 1, i);
      }
      return arr;
    };
    //遍历遍历children的节点
    this.getCurRow = function (data, arr, hyhtpid, hyhtcj, hyhtlie) {
      if (data.children && data.children.length > 0) {
        for (var i = 0; i < data.children.length; i++) {
          var hyhtid = commonUtil.guid();
          arr.push(
            that.setHeadTdObj(
              data.children[i],
              hyhtpid,
              hyhtid,
              hyhtcj,
              hyhtlie
            )
          );
          if (data.children[i].children && data.children[i].children.length > 0) {
            that.getCurRow(data.children[i], arr, hyhtid, (hyhtcj + 1), hyhtlie)
          }
        }
      }
    };
    //获取字段顺序和显示样式
    this.getColumnList = function (list, tier) {
      var rlist = [];
      for (var i = 0; i < tier; i++) {
        rlist[i] = new Array();
      }
      for (var i = 0; i < list.length; i++) {
        rlist[list[i].hyhtcj].push(list[i])
      }
      return rlist;
    };
    this.formarHead2 = function (list, viewWidth) {
      if (list && list.length == 0) {
        return
      }
      var flag = true;
      var lastNum = list.length - 1;
      var last = list[lastNum];
      for (var i = 0; i < last.length; i++) {
        if (last[i].minWidth == -1) {
          flag = false;
          break;
        }
      }
      if (!flag) {
        var tempWidth = 0;
        var tempLen = 0;
        for (var i = 0; i < last.length; i++) {
          if (last[i].minWidth == -1) {
            tempLen += 1;
          } else {
            tempWidth += last[i].minWidth;
          }
        }
        if (tempLen > 0) {
          var tempUseWith = viewWidth - tempWidth;
          tempUseWith = tempUseWith - tempUseWith % (tempLen * 10);
          var tempRdWidth = commonUtil.percentNum(tempUseWith, tempLen);
          if (tempRdWidth < 100) {
            tempRdWidth = 100;
          }
          for (var i = 0; i < last.length; i++) {
            if (last[i].minWidth == -1) {
              last[i].minWidth = last[i].colSpan * tempRdWidth;
            }
          }
          for (var i = list.length - 2; i >= 0; i--) {
            for (var j = 0; j < list[i].length; j++) {
              var width = that.getColsWidth(list, (i + 1), list[i][j].hyhtid);
              if (width > 0) {
                list[i][j].minWidth = width;
              }
            }
          }
        }
      }
    }
    this.handleRowAndColpan = function (list, type) {
      //处理宽度
      if (commonUtil.isNotEmpty(type) && "diy" == type && list.length > 1) {
        for (var i = list.length - 2; i >= 0; i--) {
          for (var j = 0; j < list[i].length; j++) {
            var width = that.getColsWidth(list, (i + 1), list[i][j].hyhtid);
            if (width > 0) {
              list[i][j].minWidth = width;
            }
            var colspan = that.getColsNum(list, (i + 1), list[i][j].hyhtid);
            if (colspan > 0) {
              list[i][j].colSpan = colspan;
            }
          }
        }
      } else {
        for (var i = list.length - 2; i >= 0; i--) {
          for (var j = 0; j < list[i].length; j++) {
            var colspan = that.getColsNum(list, (i + 1), list[i][j].hyhtid);
            if (colspan > 0) {
              list[i][j].colSpan = colspan;
            }
          }
        }
      }
      //处理Row
      //rowSpan是指要合并的列数，1就是不合并，2合并自己那一列下面的一行，3就合并它自己那一列下面的2行.....
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i].length; j++) {
          if (list[i][j].rowSpan > 1 && (i + 1) < list.length) {
            that.removeRowAndColpan(list, list[i][j].hyhtlie, (i + 1), (i + list[i][j].rowSpan - 1), list[i][j].hyhtid)
          }
        }
      }
    };
    this.getColsWidth = function (list, col, hyhtid) {
      var width = 0;
      for (var i = 0; i < list[col].length; i++) {
        if (hyhtid == list[col][i].hyhtpid) {
          if (commonUtil.isNotEmpty(list[col][i].minWidth)) {
            var useWidth = 0;
            var ys = list[col][i].minWidth % 10;
            if (ys > 0) {
              useWidth = list[col][i].minWidth - ys + 10;
            } else if (ys == 0) {
              useWidth = list[col][i].minWidth;
            } else {
              useWidth = list[col][i].minWidth - ys;
            }
            width += useWidth;
          } else {
            list[col][i].minWidth = -1;
            width = list[col][i].minWidth;
          }
        }
      }
      return width;
    };
    this.getColsNum = function (list, col, hyhtid) {
      var num = 0;
      for (var i = 0; i < list[col].length; i++) {
        if (hyhtid == list[col][i].hyhtpid) {
          num += list[col][i].colSpan;
        }
      }
      return num;
    }
    //col就是上一级的hyhtlie
    this.removeRowAndColpan = function (list, col, row1, row2, id) {
      for (var i = 0; i < list[row1].length; i++) {
        //col就是上一级的hyhtlie，然后拿下一级的hyhtlie对比证明是同一列，
        // 并且对比它hyhtpid，因为同一列，并且有父子关系的hyhtpid是相等的
        if (col == list[row1][i].hyhtlie && id == list[row1][i].hyhtpid) {
          if (row1 < row2) {
            that.removeRowAndColpan(list, col, row1 + 1, row2, list[row1][i].hyhtid)
          }
          list[row1].splice(i, 1);
          // list[row1][i].isdel = 1;
        }
      }
    };

    //设置对象
    this.setHeadTdObj = function (data, hyhtpid, hyhtid, hyhtcj, hyhtlie) {
      return {
        "name": data.name,
        "dataIndex": data.dataIndex,
        "minWidth": commonUtil.isNotEmpty(data.minWidth) ? new Number(data.minWidth) : 100,
        "rowSpan": new Number(data.rowSpan),
        "align": commonUtil.isNotEmpty(data.align) ? data.align : "center",
        "hyhtpid": hyhtpid,
        "hyhtid": hyhtid,
        "hyhtcj": hyhtcj,
        "hyhtlie": hyhtlie,
        "isShowOrderBy": data.sort && (data.sort === true || data.sort === false) ? data.sort : false,
        "curOrderBy": data.sortType ? new Number(data.sortType) : 0, //1升序，2降序
        "colSpan": 1,
        "isdel": 0,
        "data": data,
        "allColSpan": false
      }
    };
    //获取总层级数目
    this.getHeadTier = function (data) {
      var tier = 0;
      if (data && data.length > 0) {
        tier++;
        var tierDate = data[0];
        while (tierDate.children && tierDate.children.length > 0) {
          tier++;
          tierDate = tierDate.children[0];
        }
      }
      return tier;
    };
    //获取
  } else {
    new TreeTableLLXHelper2();
  }
};
var CommonUtil = function () {
  if (this instanceof CommonUtil) {
    var that = this;
    //复制对象字段
    this.copyObj = function (obj1, obj2) {
      for (var key in obj1) {
        obj2[key] = obj1[key];
      }
    };
    //升降序字段比较
    this.compareNum = function (property, type) {
      //type 2是降序 1是升序
      if (2 == type) {
        return function (a, b) {
          var value1 = a[property];
          var value2 = b[property];
          return value2 - value1;
        }
      } else {
        return function (a, b) {
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
        }
      }
    }
    this.isFunc = function (func) {
      if (that.isNotEmpty(func)) {
        return typeof func == 'function';
      }
      return false;
    };
    this.percentNum = function (num, num2) {
      //每一格的平均值
      //整个表格的实际宽度除以表格的列数然后磨以10得到余数
      //表格的每一格必须是10的倍数，不然会对不齐
      var num10 = 0;
      if ((Math.ceil(num / num2)) % 10 > 0) {
        num10 = 10 - ((Math.ceil(num / num2)) % 10)
      }
      return Math.ceil(num / num2) + num10;
    }
    this.guid = function () {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }

      return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    };
    this.isFunc = function (func) {
      if (that.isNotEmpty(func)) {
        return typeof func == 'function';
      }
      return false;
    };
    this.isNotEmpty = function (value) {
      if (value != undefined && value != null && value != '' && (value + "").trim().length != 0) {
        return true;
      } else {
        return false;
      }
    };
  } else {
    return new CommonUtil();
  }
};
$.fn.extend({
  getTableHelper2: function () {
    return new TableHelper2();
  }
});
