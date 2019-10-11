<template>
  <el-row class="container">
    <!--头部-->
    <div v-show="thisHiddenContent">
      <div class="topbar-wrap">
        <div class="topbar-logo topbar-btn">
        </div>
        <div class="topbar-title topbar-btn">
					<span class="headerW">
					  <!--	<img class="headerW-img"  src="http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/logo_cxfxcd.png"/>-->
					</span>
        </div>
        <div class="topbar-account topbar-btn user_btn">
          <el-dropdown trigger="click">
						<span class="el-dropdown-link userinfo-inner">
		          	<img style="vertical-align: middle;height: 15px;margin-bottom: 2px;"
                     src="http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/home-hy.png"/> 欢迎你，华云慧通 </span>
            <el-dropdown-menu slot="dropdown" class="position_down">
              <el-dropdown-item class="click el-dropdown-menu_nopadding">
              <div>
              <div class="click1" @click="userinfoClick"><img src="http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/jbxx2.png" /><br />用户信息</div>
              </div>
              </el-dropdown-item>
              <el-dropdown-item class="logout">
                <div onclick="window.location.href='#/login'">退出系统</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <!--中间-->
    <el-col :span="24" class="homeMainContainer" id="homeMainContainer">
      <!--左侧导航-->
      <div v-show="thisHiddenContent1" id="tuola" style="background: #FCFCFC;border: 1px solid rgb(238, 240, 246);">
        <aside id="aside" :class="collapsed?'menu-collapsed':'menu-expanded'">
          <div id="tjfxMenu"></div>
          <!--左边菜单展开时的显示情况-->
          <el-menu v-show="!collapsed" router>
            <ul class="menuLi">
              <el-menu-item v-for="(item,index) in menulist" :key="item.value" :index="item.path"><span class="spanmenu"
                                                                                                        @click="full(item,index)"><i
                :class="item.iconName"></i>{{item.pathName}}</span></el-menu-item>
            </ul>
          </el-menu>
        </aside>
      </div>
      <!--中间的线-->
      <div id="line" @mousedown="oLine($event)" style="z-index: 998;">
        <!--中间的按钮-->
        <i class="iconfont  icon-xiaosanjiao" :class="sanjiao_class?'sanjiao_class':'sanjiaobutton'"
           @click="snajiao_click()"></i>
      </div>
      <!--右侧内容区-->
      <section class="content-container" style="overflow: auto;" id="content_container" @click="closeFull">
        <!--面包屑-->
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>

      </section>
    </el-col>

  </el-row>
</template>
<style>
  #tjfxMenu .menu_section .ztree.sysMenuBtn li a.level0.cur, #tjfxMenu .menu_section .ztree.sysMenuBtn li a.level0.curSelectedNode {
    background-image: none;
    color: #2F76B1!important;
    background: #f8f8f8;
    border-bottom: 1px solid #e5e5e5;
  }
  #tjfxMenu .menu_section .ztree.sysMenuBtn li a.level0.cur span.button, #tjfxMenu .menu_section .ztree.sysMenuBtn li a.level0.curSelectedNode span.button{
    position: relative;
    left: -30px;
    border-right: 0px solid transparent;
    -webkit-filter:drop-shadow(30px 0 #2F76B1);
    filter:drop-shadow(30px 0 #2F76B1);
  }
  #tjfxMenu .menu_section .ztree.sysMenuBtn li a.level0.cur .node_name, #tjfxMenu .menu_section .ztree.sysMenuBtn li a.level0.curSelectedNode .node_name{
    color: #2F76B1!important;
  }
  #tjfxMenu .menu_section .ztree.sysMenuBtn li a.level0 span.button {
    margin-right: 5px;
    margin-top: 8px;
  }
  #tjfxMenu .menu_section .ztree.sysMenuBtn li a.level0{
    border-bottom: 1px solid #e5e5e5;
    color: #666!important;
    background: #f8f8f8;
    height: 40px;
    line-height: 38px;
  }
  #tjfxMenu .menu_section .ztree.sysMenuBtn li a.level0 span{
    font-weight: 400;
    color: #666;
  }
  #tjfxMenu .menu_section .ztree.sysMenuBtn li a.level0:hover{
    background: #fff;
  }
  #tjfxMenu .menu_section .ztree.sysMenuBtn li a.level0:hover span.button{
    position: relative;
    left: -30px;
    border-right: 0px solid transparent;
    -webkit-filter:drop-shadow(30px 0 #2F76B1);
    filter:drop-shadow(30px 0 #2F76B1);
  }
  #tjfxMenu .menu_section .ztree.sysMenuBtn li a.level0:hover .node_name{
    color: #2F76B1!important;
  }
  #tjfxMenu .menu_section .inputBox{
    border-bottom: 1px solid #e5e5e5;
  }
  .sanjiaobutton{
    position: absolute;
    display: inline-block;
    height: 20px;
    width: 9px;
    left: 1px;
    cursor: pointer;
    z-index: 46;
    top: 323px;
    color: #B6D2ED;
    transform: rotate(180deg)
  }
  /* .icon-xiaosanjiao:hover{

  } */
  .sanjiao_class{
    position: absolute;
    display: inline-block;
    height: 20px;
    width: 9px;
    left: -4px;
    cursor: pointer;
    z-index: 46;
    top: 323px;
    color: #B6D2ED;
    transform: rotate(0deg)
  }
  #line {
    position: relative;
    height: 100%;
    width: 6px;
    overflow: hidden;
    background: #ECF4F7;
    cursor: w-resize;
  }
  #aside{
    max-width: 300px;
  }
</style>
<script>
  import  "../../static/ztree/js/jquery.ztree.all.js"
  import "../../static/ztree/ztreehelper"
  export default {
    name: 'home',
    data () {
      return {
        ids: 'ids',
        thisHiddenContent: true,
        levelList: null,
        sanjiao_class: false,
        list: null,
        username: '',
        collapsed: false,
        showMenus: false,
        messageCenter: false,
        userInfo: false,
        thisHiddenContent1: true,
        showToggles: true,
        new_password: false,
        noReadCount: '1',
        ruleForm: {
          passWord: '',
          new_psw: '',
          newPassWord: ''
        },
        menulist: [],
      }
    },
    computed: {},
    created () {
       var that  = this
    },
    mounted () {
      var that = this
      // console.log(that.$httpclient.inithttpclient())
      // that.$httpclient.sdsd
      that.$httpclient.notokenget('/web/static/mock/menu.json', {}, function (res) {
          var treeHelper3 = new $.fn.getTreeHelper()
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
          res.path0,//数据
          //点击事件回调函数
          function (event, treeId, treeNode) {
            that.$router.push({
              'path': treeNode.path
            })
          }
        )
      })
      // var ajaxData=[
      //   {type:"get",url:'/ywsx/ywlc/list',params:{}},
      //   {type:"get",url:'/util/buildZyy',params:{}}
      // ]
      // that.$anycshttp.anycshttpData(ajaxData).then((data)=>{
      //   console.log(data)
      // })
    },
    methods: {
      collapse: function () {
        this.collapsed = !this.collapsed
      },
      showMenuss: function () {
        this.showMenus = !this.showMenus
      },
      //判断字段tree字段（true是有左树，false是没有树，页面全屏切入）
      full: function (item, index) {
        var that = this
        that.$httpclient.get('../../mock/menu.json', {}, function (res) {
          that.menulist = res.path0
          var treeIf = that.menulist[index].tree
          if (treeIf == 'true') {
            that.getFull()
          }
        })
      },
      //全屏
      getFull: function () {
        var that = this
        that.thisHiddenContent = false
        var dom = document.getElementById('homeMainContainer')
        dom.style.top = '0px'
      },
      //退屏
      closeFull: function () {
        var that = this
        var dom = document.getElementById('homeMainContainer')
        dom.style.top = '50px'
        that.thisHiddenContent = true
      },
      //    拖拽方法
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
      //      小三角点击
      snajiao_click() {
        this.sanjiao_class = !this.sanjiao_class
        this.thisHiddenContent1 = !this.thisHiddenContent1
      },
      userinfoClick(){
        this.$router.push({
          'path': '/yhxx'
        })
      }

    },

    //监听
    watch: {
      //j监听路由
      $route () {

      }
    }
  }
</script>
