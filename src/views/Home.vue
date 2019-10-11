<template>
  <el-row class="container">
    <!--头部-->
    <div class="homeMainHeaderMenu" v-show="thisHiddenContent">
      <div class="topbar-wrap">
        <el-col class="logo_bar" :span="18">
          <img src="../../static/assets/haocaiImg/box.png" alt="">
          <h2>耗材管理系统</h2>
        </el-col>
        <el-col class="account_bar" :span="6">
          <el-dropdown trigger="click">
						<span class="el-dropdown-link userinfo-inner">
		          	<img style="vertical-align: middle;height: 15px;margin-bottom: 2px;"
                     src="http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/home-hy.png"/> 欢迎你，华云慧通 </span>
            <el-dropdown-menu slot="dropdown" class="position_down">
              <el-dropdown-item class="click el-dropdown-menu_nopadding">
                <div>
                  <div class="click1" @click="userinfoClick">
                    <img src="http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/jbxx2.png" />
                    <br />用户信息</div>
                </div>
              </el-dropdown-item>
              <el-dropdown-item class="logout">
                <div onclick="window.location.href='#/login'">退出系统</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>



        <!--<div class="topbar-logo topbar-btn">-->
          <!--&lt;!&ndash;<img src="../../static/assets/haocaiImg/box.png" alt="">&ndash;&gt;-->

        <!--</div>-->
        <!--<div class="topbar-title topbar-btn">-->
            <!--<span class="headerW">-->
              <!--&lt;!&ndash;<h2>耗材管理系统</h2>&ndash;&gt;-->
               <!--&lt;!&ndash;  <img class="headerW-img"  src="http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/logo_cxfxcd.png"/>&ndash;&gt;-->
            <!--</span>-->
        <!--</div>-->
        <!--<div class="topbar-account topbar-btn user_btn">-->
          <!--<el-dropdown trigger="click">-->
						<!--<span class="el-dropdown-link userinfo-inner">-->
		          	<!--<img style="vertical-align: middle;height: 15px;margin-bottom: 2px;"-->
                     <!--src="http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/home-hy.png"/> 欢迎你，华云慧通 </span>-->
            <!--<el-dropdown-menu slot="dropdown" class="position_down">-->
              <!--<el-dropdown-item class="click el-dropdown-menu_nopadding">-->
              <!--<div>-->
              <!--<div class="click1" @click="userinfoClick"><img src="http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/jbxx2.png" /><br />用户信息</div>-->
              <!--</div>-->
              <!--</el-dropdown-item>-->
              <!--<el-dropdown-item class="logout">-->
                <!--<div onclick="window.location.href='#/login'">退出系统</div>-->
              <!--</el-dropdown-item>-->
            <!--</el-dropdown-menu>-->
          <!--</el-dropdown>-->
        <!--</div>-->
      </div>
    </div>
    <!--中间-->
    <el-col :span="24" class="homeMainContainer" id="homeMainContainer">
      <!--左侧导航-->
      <div v-show="thisHiddenContent1" class="homeMainContainerSideMenu"
           style="height: 100%;background-color: #ECF4F7;z-index: 999;overflow-y: auto;overflow-x:hidden;">
        <aside id="aside" :class="collapsed?'menu-collapsed':'menu-expanded'"
               style="height: 100%;max-width: 230px">
          <div id="tjfxMenu"  ></div>
        </aside>
      </div>
      <!--中间的线-->
      <div id="line" @mousedown="oLine($event)" style="z-index: 998;">
        <!--中间的按钮-->
        <i class="iconfont  icon-xiaosanjiao" :class="sanjiao_class?'sanjiao_class':'sanjiaobutton'"
           @click="snajiao_click()"></i>
      </div>
      <!--右侧内容区-->
      <section class="content-container" style="overflow: auto;" id="contentContainer">
        <!--面包屑-->
        <div class="navboard" v-show="navhidden">
          <!--按钮区-->
          <div class="home_group_btn">
            <div class="tab_button" style="white-space: nowrap;overflow: hidden;">
              <a @click="shang"><img class="img_nav" src="../../static/assets/img/hyht_xz.png"/></a>
              <a @click="xia"><img class="img_nav2" src="../../static/assets/img/hyht_xy.png"/></a>
              <div class="fullscreen fullscreenbtn">
                <img class="fullscreenbtn_tp" src="../../static/assets/img/hyht_qp.png" alt="" v-show="btn_show2" @click="thisShow">
                <img class="fullscreenbtn_qp" src="../../static/assets/img/hyht_tp.png" alt="" v-show="btn_show1" @click="thisHidden">
              </div>
            </div>
          </div>
           <!--tab区-->
          <div class="hyht_border_bottom"></div>
          <el-tabs id="emper-tab" class="home_tab_plan" v-model="editableTabsValue" type="border-card" @tab-remove="removeTab1"
            @tab-click="tabclick" :closable="true" width="100%">
            <el-tab-pane v-for="(item, index) in list" v-if='item.ishow' :id='index' :key="index" :label="item.name.length > 6?item.name.substring(0, 6)
                + '...':item.name" :name='index+""' >
              <div :id='"iframeOut"+index'></div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>
    </el-col>
   <!--右键菜单-->
    <ul v-show="show_rightmenu" id="rightmenu">
      <li @click="close_other()" style="cursor: pointer;">关闭其他标签</li>
      <li @click="close_all()" style="cursor: pointer;">关闭所有标签</li>
    </ul>
    <!--常用功能菜单-->
    <ul v-show="show_changyong_add" id="changyong_add" style="position: absolute;z-index: 10">
      <li @click="changyong_add()" style="cursor: pointer;">加为常用功能</li>
    </ul>
    <ul v-show="show_changyong_shanchu" id="changyong_shanchu" style="position: absolute;z-index: 10">
      <li @click="changyong_shanchu()" style="cursor: pointer;">删除</li>
    </ul>
  </el-row>
</template>
<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .logo_bar{
    height: 50px;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
  }
  .logo_bar>img{
    width: 36px;
    height: 36px;
    display: inline-block;
    margin: 7px;
  }
  .logo_bar>h2{
    display: inline-block;
    letter-spacing: 4px;
    color: #fff;
  }
  .account_bar{
    display: flex;
    justify-content: flex-end;
    min-width: 170px;
  }
   .click1{
    width: 100%;
    text-align: center;
     padding: 5px;
  }

   /*侧栏*/
  #aside{
    border-right: 4px solid #EDF4F7;

  }


</style>

<script>
  import  "../../static/ztree/js/jquery.ztree.all.js"
  import "../../static/ztree/ztreehelper.js"
  export default {
    name: 'home',
    data () {
      return {
        ids: 'ids',
        navhidden: true,
        btn_show2: false,
        btn_show1:true,
        editableTabsValue:"",
        show_rightmenu: false, //是否展示右键菜单
        show_changyong_add: false, //是否展示常用功能菜单
        show_changyong_shanchu: false,
        list:[
          // {
          //   name:"首页",
          //   path:"",
          //   ishow:true
          // }
          {
            name:"库存管理",
            path:"#/kucun",
            ishow:true
          }
        ], //tab页面的iframe展示
        matcheds: [
        //   {
        //   name: '首页',
        //   path: ''
        // }
          {
            name: '库存管理',
            path: '#/kucun'
          }
        ],
        menulist: [],
        thisHiddenContent: true,
        levelList: null,
        sanjiao_class: false,
        username: '',
        collapsed: false,
        showMenus: false,
        messageCenter: false,
        userInfo: false,
        thisHiddenContent1: true,
        showToggles: true,
        new_password: false,
        noReadCount: '1',
      }
    },
    created() {
      var that=this;
      var daping_data;
      if(localStorage.getItem('daping_down_data')!=null||localStorage.getItem('daping_down_data')!=undefined) {
        daping_data = JSON.parse(localStorage.getItem('daping_down_data'))
        if (window.location.search.indexOf(daping_data.SB_DP_code) > 0) {
          that.Treeclick(daping_data)
          localStorage.removeItem('daping_down_data')
        }
      }
      setTimeout(() => {
      }, 1000);
      //this.Get_touxiang();
      that.messageIf();
      window.addEventListener("load", function () {
        //内容区高度
        var contentContainer = document.getElementById("contentContainer"); //外
        if (contentContainer !== undefined && contentContainer !== null) {
          var hh1 = contentContainer.offsetHeight;//856
          //tab页的高度
          var hh3 = 26;
          var containerPadding = document.getElementById("containerPadding"); //内
          if (containerPadding !== undefined && containerPadding !== null) {
          }
        //内容区树的高度
        // var tree = document.getElementById("tree");
        // if (tree !== undefined && tree !== null) {
        //   tree.style.height = (hh1 - hh3 - hh1 * 0.01*2 )+ "px";
        // }
        }
      });

      window.addEventListener('storage',function (e) {
        if(e.storageArea.Drill_down!=undefined&&e.storageArea.Drill_down!=''&&e.storageArea.Drill_down!=null){
          that.Treeclick(JSON.parse(e.storageArea.Drill_down))
          localStorage.removeItem('Drill_down')
        }
        if(e.storageArea.daping_down!=undefined&&e.storageArea.daping_down!=''&&e.storageArea.daping_down!=null){
          var newJson=JSON.parse(e.storageArea.daping_down)
          window.open('/?'+newJson.SB_DP_code)
          localStorage.removeItem('daping_down')
        }
      })
    },
    mounted () {
      var that = this
      // 其他tab里面点击打开新tab
      window.iframeBrige = function (name, path) {
        that.list.push({name: name, path: path, ishow: true})
        that.editableTabsValue = that.list.length - 1 + ""
        that.raderiframe(that.list.length - 1, that.list[that.list.length - 1].path)
      };
      window.closeIframeBrige = function (src){
        var arr = window.top.iframe;
        var idTemp = '';
        for(var i=0;i<arr.length;i++){
          if(arr[i].src.indexOf(src)>-1){
            idTemp = arr[i];
          }
        };
        if(idTemp != ''){
          //var divIframe = $("#"+idTemp).closest("div");
          var divIframe = idTemp.closest("div");
          var num = divIframe.id.substring(9);
          that.list.splice(num,1);
          $("#iframeOut"+num).remove();
          that.raderiframe(that.list.length-1,that.list[this.list.length-1].path)
        }else{
          console.log("子项目参数不对");
        }
      }
      that.raderiframe(0,that.list[0].path)
      window.onresize = function () {
      //  that.watch_height();
      },
      //  that.watch_height();
        //第二种展示tabs鼠标右击事件开始
      $(".el-tabs__nav").bind("contextmenu",function(e){
        return false;
      });
      $(".el-tabs__nav").bind("contextmenu",function(e){
        that.show_rightmenu = false;
        if(e.which == 3){ //右键
          that.show_rightmenu = true;
          $("#rightmenu").css("left",e.pageX+5).css("top",e.pageY+5);
          //由于使用了饿了么的tabs，vue的contextmenu无法确定点击的是那个tabs，所有得根据点击事件亲确定
          var  atabs = $(".el-tabs__item");
          var target = e.target || e.srcElement;
          var listclicknum = 0; // 当前点击tabs的前面，有几个ishow等于true的
          var  listArrclickNum =null
          if(target.nodeName.toLowerCase() == "div"){
            // var that=target;
            var indexnum;   //当前点击的是第几个
            for(var i=0;i< atabs.length;i++){
              if(atabs[i]===target){
                indexnum=i;
              }
              if(indexnum>=0){
                for(var i=0;i<that.list.length;i++){
                  //前面是true的有几个
                  if(that.list[i].ishow==true&&indexnum>listclicknum-1){
                    listclicknum++
                    listArrclickNum = i
                  }
                }
                that.close_i = listArrclickNum
                console.log('我是第'+indexnum+'个======'+that.close_i)
              }
            }
          }
        } else if(e.which == 1){ //左键
          that.show_rightmenu = false;
        }
      });
      $("ducument").bind("contextmenu",function(e){
        that.show_rightmenu = false;
      });
      // todo: 目录
      var path0 =  [
        {
          "name":"库存管理",
          "path":"#/kucun",
          "tree":true,
          "children":[]
        },
        {
          "name":"采购记录",
          "path":"#/caigou",
          "tree":true,
          "children":[]
        },
        {
          "name":"申请记录",
          "path":"#/shenqing",
          "tree":true,
          "children":[]
        },
        {
          "name":"耗材维护",
          "path":"",
          "tree":true,
          "children":[
            {
              "name": "类型维护",
              "path": "#/leixing"
            },
            {
              "name": "品牌维护",
              "path": "#/pinpai"
            },
            {
              "name": "型号维护",
              "path": "#/xinghao"
            },
            {
              "name": "类别维护",
              "path": "#/leibie"
            }
          ]
        },


        {
          "name": "技术预研",
          "path": "",
          "tree": true,
          "children": [
            {
              "name": "更换壁纸",
              "path": "#/changeWallPaper"
            },
            {
              "name": "专题菜单",
              "path": "#/subjectMenu"
            },{
              "name": "hyhttree",
              "path": "#/hyhttree"
            },{
              "name": "hyhttable",
              "path": "#/hyhttable"
            },{
              "name": "D3关系网络实例",
              "path": "#/initD3"
            }]
        },
        {
          "name": "组件开发",
          "path": "",
          "tree": true,
          "children": [{
            "name": "图表组件",
            "path": "#/echartmodel"
          },
            {
              "name": "条件组件",
              "path": "#/conditionmodel"
            },
            {
              "name": "行业控件组件",
              "path": "#/industrymoudel"
            },
            {
              "name": "消息提示组件",
              "path": "#/userCustomMessageTips"
            },
            {
              "name": "进度条组件",
              "path": "#/userCustomProgress"
            },
            {
              "name": "tab组件",
              "path": "#/userCustomTabs"
            },
            {
              "name": "帮助组件",
              "path": "#/userCustomHelps"
            },
            {
              "name": "锁屏组件",
              "path": "#/userCustomScreenLock"
            },
            {
              "name": "截图组件",
              "path": "#/userCustomScreenshotsPage"
            },
            {
              "name": "打印组件",
              "path": "#/userCustomScreenPrintPage"
            },
            {
              "name": "穿梭框组件",
              "path": "#/userCustomTransfer"
            }
          ]
        },
        {
          "name": "页面模板",
          "path": "",
          "tree": true,
          "children": [
            {
              "name": "组件组合页面",
              "path": "#/userCustomGroupPage"
            }, {
              "name": "模板1",
              "path": "#/mobanPage1"
            },
            {
              "name": "模板2",
              "path": "#/mobanPage2"
            },
            {
              "name": "模板3",
              "path": "#/mobanPage3"
            },
            {
              "name": "模板4",
              "path": "#/mobanPage4"
            },
            {
              "name": "模板5",
              "path": "#/mobanPage5"
            },
            {
              "name": "模板6",
              "path": "#/mobanPage6"
            },
            {
              "name": "模板7",
              "path": "#/mobanPage7"
            },
            {
              "name": "模板8",
              "path": "#/mobanPage8"
            },
            {
              "name": "弹窗模板1",
              "path": "#/dialogPage1"
            },
            {
              "name": "弹窗模板2",
              "path": "#/dialogPage2"
            },
            {
              "name": "弹窗模板3",
              "path": "#/dialogPage3"
            },
            {
              "name": "弹窗模板4",
              "path": "#/dialogPage4"
            },
            {
              "name": "弹窗模板5",
              "path": "#/dialogPage5"
            }
          ]
        }
      ];
      // todo:获取mock里的目录
     // that.$httpclient.notokenget('/web/static/mock/menu.json', {}, function (res) {
        // debugger
        var treeHelper3 = new $.fn.getTreeHelper()
        // treeHelper3.setLimitZtreeHeight($("#homeMainContainer").height());  //限制树的高度
        $(".menu_section").height($("#homeMainContainer").height())
            treeHelper3.icons = [
            'static/assets/icon2/icon_sjypz.svg',
            'static/assets/icon2/icon_kjsjy.svg',
            'static/assets/icon2/icon_fxgnf.svg',
            'static/assets/icon2/icon_fxgn.svg',
            'static/assets/icon2/icon_fxjk.svg',
            'static/assets/icon2/icon_fxgnf.svg',
            'static/assets/icon2/icon_fxjk.svg']
        treeHelper3.createSystemMenu(
          'tjfxMenu',//对应div的id
           // res.path0,//数据
          //点击事件回调函数
           path0,//数据
          //点击事件回调函数
          function (event, treeId, treeNode) {
            that.Treeclick(treeNode,treeId,event)
          }
        )
      // })
    },
    methods: {
       //渲染iframer  第二种tabs展示模式
      raderiframe(idmub,path){
        this.$nextTick(function(){
          //统计分析修改路径参数
        //   path = this.tjfxModifyPath(path);
        // 给iframe赋予名字
        var iframeNameSplit = path.split('#/')[1];
          var htmls = '<iframe id="iframe"'+idmub+' width="100%" src="'+path+'" name="'+iframeNameSplit+'" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0"><a href="">你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a></iframe>';
          $("#iframeOut"+idmub).html(htmls);
          var iframeOut = document.getElementById("iframeOut"+idmub);
          if (iframeOut !== undefined && iframeOut !== null) {
            var iframeOutHeight = iframeOut.offsetHeight;
          }

          var iframe = document.getElementById("iframe"+idmub);
          if (iframe !== undefined && iframe !== null) {
            var body_height=document.documentElement.clientHeight;
            iframe.style.height = (body_height-87)+ "px";
          }
        });
      },
      collapse: function () {
        this.collapsed = !this.collapsed
      },
      showMenuss: function () {
        this.showMenus = !this.showMenus
      },
      //拖拽方法
      oLine(e) {
        var disX = (e || event).clientX;
        document.getElementById("line").left = document.getElementById("line").offsetLeft;
        document.onmousemove = function (e) {
          var iT = document.getElementById("line").left + ((e || event).clientX - disX);
          var e = e || window.event, tarnameb = e.target || e.srcElement;
          var maxT = document.getElementById("tuola").clientWight - document.getElementById("line").offsetWidth;
          document.getElementById("line").style.margin = 0;
          iT < 0 && (iT = 0);
          iT > maxT && (iT = maxT);
          document.getElementById("aside").style.width = iT + "px"
          return false
        };
        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
          document.getElementById("line").releaseCapture && document.getElementById("line").releaseCapture()
        };
        document.getElementById("line").setCapture && document.getElementById("line").setCapture();
        return false
      },
      // 小三角点击
      snajiao_click() {
        this.sanjiao_class = !this.sanjiao_class
        this.thisHiddenContent1 = !this.thisHiddenContent1
      },
      userinfoClick(){
      },
      tabclick(){
        var that = this
        that.show_rightmenu = false;
      },
       //  全屏
      thisHidden() {
        this.thisHiddenContent = false;
        this.thisHiddenContent1 = false;
        this.btn_show1 = false;
        this.btn_show2 = true;
        this.showToggles = false;
        this.showMenus = false;
        $(".homeMainHeaderMenu").hide();
      },
      //退屏
      thisShow() {
        this.thisHiddenContent = true;
        this.thisHiddenContent1 = true;
        this.btn_show1 = true;
        this.btn_show2 = false;
        this.showToggles = true;
        $(".homeMainHeaderMenu").show();
      },
      //tab栏删除处理第二种tabs展示模式
      removeTab1(name){
        var that = this;
        if(name=='0'){
          return false;
        }
        that.list[Number(name)].ishow=false
        if(name==(Number(that.editableTabsValue))){
          var arri=[]  //存储数组下标
          for(var i=0;i<that.list.length;i++){
            if(that.list[i].ishow){
              arri.push(i)
            }
          }
          that.editableTabsValue = arri[arri.length-1]+""
        }
      },
      //tab栏删除处理
      removeTab(item, index) {
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].name == item.name) {
            if (this.list[i].path == window.location.hash.substr(1)) {
              if (i == 0) {
                if (this.list.length == 1) {
                  if (this.list[i].path != "#/platformApiShowList") {
                    this.$router.push({
                      path: "#/platformApiShowList"
                    });
                    this.list.splice(0, 1);
                  }
                } else if (this.list.length > 1) {
                  this.$router.push(this.list[i + 1].path);
                  this.list.splice(0, 1);
                }
                return;
              } else if (i == this.list.length - 1) {
                this.$router.push(this.list[i - 1].path);
                this.list.splice(i, 1);
                var abs__nav = document.getElementById("tabs__scorll");
                if (this.list.length >= 6) {
                  var u_length = this.list.length - 6;
                  abs__nav.style.transform = "translateX(" + (-u_length * 150) + "px)";
                } else {
                  abs__nav.style.transform = "translateX(0px)";
                }
                return;
              } else {
                this.$router.push(this.list[i + 1].path);
                this.list.splice(i, 1);
                var abs__nav = document.getElementById("tabs__scorll");
                if (this.list.length >= 6) {
                } else {
                  abs__nav.style.transform = "translateX(0px)";
                }
                return;
              }
            } else {
              this.list.splice(i, 1);
              if (index > this.indexss) {
              } else {
                this.indexss = this.indexss - 1;
              }
              var abs__nav = document.getElementById("tabs__scorll");
              if (this.list.length >= 6) {
                if (i == this.list.length) {
                  var u_length = this.list.length - 6;
                  abs__nav.style.transform = "translateX(" + (-u_length * 150) + "px)";
                }

              } else {
                abs__nav.style.transform = "translateX(0px)";
              }
              return;
            }
          }
        }
      },
      //二级树
      messageIf() {
        var theUrl = window.location.hash;
        var message = theUrl;
        switch (message) {
          case "#/message/messageCenter":
            if (this.showMenus || this.userInfo) {
              this.showMenus = false;
              this.userInfo = false;
            }
            this.messageCenter = !this.messageCenter;
            break;

          case "#/jiben/user_info":
            if (this.messageCenter || this.showMenus) {
              this.messageCenter = false;
              this.showMenus = false;
            }
            this.userInfo = !this.userInfo;
            break;

          default:
            if (this.messageCenter || this.userInfo) {
              this.messageCenter = false;
              this.userInfo = false;
            }
            break;
        }

      },
      //tab栏右键菜单的关闭其他按钮
      close_other(){
        var that = this
        for (var i = 0; i < that.list.length; i++) {
          if (that.close_i == i) {
            that.list[i].ishow=true
          }else{
            if(that.list[i].name != '首页'){
              that.list[i].ishow=false;
            }
          }
        }
        that.editableTabsValue = that.close_i+""
        this.show_rightmenu = false;
      },
      //tab栏右键菜单的关闭全部按钮
      close_all() {
        if(this.matcheds.length==0){
          for (var i = 0; i < this.list.length; i++) {
            //没有默认路由
            this.list[i].ishow=false
          }
        }else{
          for (var i = 0; i < this.list.length; i++) {

            if(this.list[i].path=='#/dialogPage1'&&this.list[i].ishow==true){
              this.list[i].ishow=true
              this.editableTabsValue =i+""
            }else{
              this.list[i].ishow=false
            }
          }
        }
        this.show_rightmenu = false;
      },
      //处理请求回来的的树的数据
      getArray() {
        var arrs = [];
        for (var i = 0; i < this.menulist.data.length; i++) {
          if (this.menulist.data[i].path != "") {
            arrs.push(this.menulist.data[i].path)
          } else {
            getArray(this.menulist.data[i].path);
          }
        }
      },
      //tab栏右移操作
      shang(){
        var that =this
        for(var i=that.list.slice(0,Number(that.editableTabsValue)-1).length;i>=1;i--){
          if(that.list[i].ishow==true&&i>0){
            that.editableTabsValue = i+""
            break;
          }
        }
        that.editableTabsValue = i+""
      },
      //tab栏左移操作
      xia() {
        var that =this
        for(var i=(Number(that.editableTabsValue))+1;i<that.list.length;i++){
          if(that.list[i].ishow==true){
            that.editableTabsValue = i+""
            break;
          }
        }
        // this.editableTabsValue = (Number(this.editableTabsValue)+1)>this.list.length-1?"0":(Number(this.editableTabsValue)+1)+""

      },
      //常用功能删除
      changyong_shanchu(val) {
        var identityId = auth.getIdentityId(identityId);
        var that = this
        var send_json = {id: val.id}
        this.$httpclient.post("/rest/userIdentity/delete/stock/tree", send_json, function (res) {
          if (res.success) {
            that.getStock()
            that.$message.success('删除成功');
          }
        });
        this.show_changyong_shanchu = false;
      },
      //添加常用功能
      changyong_add(val) {
        var identityId = auth.getIdentityId(identityId);
        var that = this
        var send_json = {
          identityId: identityId,
          parentId: val.parentId,
          permissionId: val.id,
          postId: val.taxPostId,
          postName: val.post_name
        }
        this.$httpclient.put("/rest/userIdentity/add/stock/tree", send_json, function (res) {
          if (res.success) {
            that.getStock()
            that.$message.success('新增成功');
          } else if (res.success == false) {
            that.$message.error('已存在');
          }
        });
        this.show_changyong_add = false;
      },
      Treeclick(term, node, $even) {
        var list=document.getElementsByClassName("is-opened")
        if(list.length==0){
        }else{
          for(var i=0;i<list.length;i++){
            var list2=list[i].getElementsByClassName("el-menu")
            for(var j=0;j<list2.length;j++){
              list2[j].style.display="none"
            }
            list[i].classList.remove("is-opened")
          }
        }
        var indexf = 0;
        if(term.path.indexOf("taxCodeinit=null")!=-1&& term.path.indexOf("is_new_window_open=true") != -1){
          var taxCode=localStorage.getItem("taxCode");
          var funCode=localStorage.getItem("funCode");
          var url=term.path+"&taxCode="+taxCode+"&funCode="+funCode;
          window.open(url);
          return;
        }else if (term.path.indexOf("is_new_window_open=true") != -1) {
          window.open(term.path);
          return;
        }
        if(term.path.indexOf("accountName") != -1||term.path.indexOf("funCode") != -1||term.path.indexOf("identityId") != -1||term.path.indexOf("taxCode") != -1||term.path.indexOf("userName") != -1){
          var index=term.path.indexOf("?");
          var url=term.path.substring(index+1);
          var url1=url.split("&")
          var oList=["accountName","funCode","identityId","taxCode","userName"]
          for(var i=0;i<url1.length;i++){
            for(var j=0;j<oList.length;j++){
              if(url1[i].indexOf(oList[j])!=-1){
                url1[i]=url1[i].replace(oList[j],localStorage.getItem(oList[j]))
              }
            }
          }
          var path=term.path.substring(index+1,-1)
          window.open(path.concat(url1.join("&")));
          return;
        }
        this.secondList = term.children; //this.menulist.data[indexf].children[this.indexs];
        this.three_name = term.permissionName;
        //this.toFalseUri(term)
        if (term.post_name !== undefined && term.post_name !== null && term.permissionName !== undefined && term.permissionName !== null
          && term.parentId !== undefined && term.parentId !== null) {
          var postNameLength = term.post_name.length;
          var permissionName = term.permissionName;
          var name = '';
          if (term.path.indexOf("http://") == 0) {
            name = term.permissionName;
          } else {
            name = permissionName.substring(0, permissionName.length - postNameLength - 2);
          }
          // var name=data.permissionName2;
          localStorage.setItem(name, term.parentId);
          localStorage.setItem("permissionCode"+name, term.permissionCode);
          localStorage.setItem("topParentName"+name, term.topParentName);
          if (name.length > 4) {
            localStorage.setItem(name.substring(0, 4) + '...', term.parentId);
          }
        }
        // 无刷新的tabs展示模式开始
        if(typeof(term.children)=='undefined'||term.children==null||term.children.length==0){

          // 规定不允许超过多少个
          var isshownum=0
          for(var i=0;i<this.list.length;i++){
            if(this.list[i].ishow){
              isshownum++
            }
          }
          // if(isshownum>7||isshownum==7){
          //   this.$message.error('请关闭多余的页面');
          //   return false
          // }
          //   做过滤，点击同一个，无需重新加载，只需要tab切换到当前即可
          var isreper = this.listfiter(term)
          var eqnsrhxFlag = term.path.indexOf("eqnsrhx")!=-1;
          if(isreper==false&&!eqnsrhxFlag){

          }else{
            this.$nextTick(function(){
              this.list.push({name:term.name,path:term.path,ishow:true})
              this.editableTabsValue =this.list.length-1+""
              this.raderiframe(this.list.length-1,this.list[this.list.length-1].path)
            })
          }
        }
        return false    //加个reture  是表示不执行下面方法  因为使用了第二种tabs展示模式
        // 无刷新的tabs展示模式结束
      },
      //无刷新的tabs展示 做过滤，点击同一个，无需重新加载，只需要tab切换到当前即可
      listfiter(term){
        var that =this
        for(var i=0;i<that.list.length;i++){
          if(that.list[i].name==term.name&&that.list[i].path==term.path&&that.list[i].ishow==true){
            that.editableTabsValue = i+""
            return false
            break;
          }
        }
      },
      //设置用户操作日志
      setUserLogs(data) {
        var that = this;
        that.$httpclient.put("/rest/logs", data, function (res) {
          if (res.success) {
          }
        });
      },

    },

    //监听
    watch: {
      //j监听路由
      $route () {

      }
    }
  }
</script>
