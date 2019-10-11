import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/login'
import platformApiShowList from '@/views/platformApiShowList'
import mobanPage1 from "@/views/moban/mobanPage1"
import mobanPage2 from "@/views/moban/mobanPage2"
import mobanPage3 from "@/views/moban/mobanPage3"
import mobanPage4 from "@/views/moban/mobanPage4"
import mobanPage5 from "@/views/moban/mobanPage5"
import mobanPage6 from "@/views/moban/mobanPage6"
import mobanPage7 from "@/views/moban/mobanPage7"
import mobanPage8 from "@/views/moban/mobanPage8"
import userCustomGroupPage from "@/views/moban/userCustomGroupPage" //组件组合页面

import dialogPage1 from "@/views/dialog/dialogPage1"
import dialogPage2 from "@/views/dialog/dialogPage2"
import dialogPage3 from "@/views/dialog/dialogPage3"
import dialogPage4 from "@/views/dialog/dialogPage4"
import dialogPage5 from "@/views/dialog/dialogPage5"

import industrymoudel from '@/views/industrymoudel'  //行业控件组件组件
import echartmodel from '@/views/echartmodel'  // 图表模板组件
import conditionmodel from '@/views/conditionmodel'  //  条件模板组件

import userCustomMessageTips from "@/views/commonPage/userCustomMessageTips" //消息提示组件
import userCustomProgress from "@/views/commonPage/userCustomProgress" //进度条组件
import userCustomTabs from "@/views/commonPage/userCustomTabs" //tab页组件
import userCustomHelps from "@/views/commonPage/userCustomHelps" //帮助组件
import userCustomTransfer from "@/views/commonPage/userCustomTransfer" //穿梭框组件

import userCustomScreenLock from "@/views/commonPage/userCustomScreenLock" //锁屏组件
import userCustomScreenshotsPage from "@/views/commonPage/userCustomScreenshotsPage" //截图组件
import userCustomScreenPrintPage from "@/views/commonPage/userCustomScreenPrintPage" //打印组件

import initD3 from "@/views/otherPage/initD3"  //关系网络
import changeWallPaper from '@/views/otherPage/changeWallPaper'   //更换壁纸
import subjectMenu from '@/views/otherPage/subjectMenu'   //专题菜单
import platformSearchFuncPage from '@/views/otherPage/platformSearchFuncPage'   //平台搜索功能
import hyhttree from '@/views/otherPage/hyhttree'   //ztree树组件
import hyhttable from '@/views/otherPage/hyhttable'   //ztree表格组件

 //耗材管理系统
import KuCun from '@/views/haocaiPage/KuCun'
import CaiGou from '@/views/haocaiPage/CaiGou'
import ShenQing from '@/views/haocaiPage/ShenQing'
import LeiXing from '@/views/haocaiPage/LeiXing'
import PinPai from '@/views/haocaiPage/PinPai'
import XingHao from '@/views/haocaiPage/XingHao'
import LeiBie from '@/views/haocaiPage/LeiBie'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      component: KuCun,
      path:'/kucun',
      name:'库存管理'
    },
    {
      component: CaiGou,
      path:'/caigou',
      name:'采购记录'
    },
    {
      component: ShenQing,
      path:'/shenqing',
      name:'申请记录'
    },
    {
      component: LeiXing,
      path:'/leixing',
      name:'类型维护'
    },
    {
      component: PinPai,
      path:'/pinpai',
      name:'品牌维护'
    },
    {
      component: XingHao,
      path:'/xinghao',
      name:'型号维护'
    },
    {
      component: LeiBie,
      path:'/leibie',
      name:'类别维护'
    },


    {
      component: industrymoudel,
      path:"/industrymoudel",
      name: '行业控件组件'
    },
    {
      component: echartmodel,
      path:"/echartmodel",
      name: '图表组件模版'
    },
    {
      component: conditionmodel,
      path:"/conditionmodel",
      name: '条件组件模版'
    },
    {
      component: platformApiShowList,
      path:"/platformApiShowList",
      name: '平台API展示列表'
    },
    {
      component: mobanPage1,
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      path:"/mobanPage1",
      name: '模板1'
    },
    {
      component: mobanPage2,
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      path:"/mobanPage2",
      name: '模板2'
    },
    {
      component: mobanPage3,
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      path:"/mobanPage3",
      name: '模板3'
    },
    {
      component: mobanPage4,
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      path:"/mobanPage4",
      name: '模板4'
    },
    {
      component: mobanPage5,
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      path:"/mobanPage5",
      name: '模板5'
    },
    {
      component: mobanPage6,
      path:"/mobanPage6",
      name: '模板6'
    },
    {
      component: mobanPage7,
      path:"/mobanPage7",
      name: '模板7'
    },
    {
      component: mobanPage8,
      path:"/mobanPage8",
      name: '模板8'
    },
    {
      component: dialogPage1,
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      path:"/dialogPage1",
      name: '弹窗模板1'
    },
    {
      component: dialogPage2,
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      path:"/dialogPage2",
      name: '弹窗模板2'
    },
    {
      component: dialogPage3,
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      path:"/dialogPage3",
      name: '弹窗模板3'
    },
    {
      component: dialogPage4,
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      path:"/dialogPage4",
      name: '弹窗模板4'
    },
    {
      component: dialogPage5,
      path:"/dialogPage5",
      name: '弹窗模板5'
    },
    {
      component: userCustomMessageTips,
      path:"/userCustomMessageTips",
      name: '消息提示组件'
    },
    {
      component: userCustomProgress,
      path:"/userCustomProgress",
      name: '进度条组件'
    },
    {
      component: userCustomTabs,
      path:"/userCustomTabs",
      name: 'tab页组件'
    },
    {
      component: userCustomHelps,
      path:"/userCustomHelps",
      name: '帮助组件'
    },
    {
      component: userCustomTransfer,
      path:"/userCustomTransfer",
      name: '穿梭框组件'
    },
    {
      component: userCustomScreenLock,
      path:"/userCustomScreenLock",
      name: '锁屏组件'
    },
    {
      component: userCustomScreenshotsPage,
      path:"/userCustomScreenshotsPage",
      name: '截图组件'
    },
    {
      component: userCustomScreenPrintPage,
      path:"/userCustomScreenPrintPage",
      name: '打印组件'
    },
    {
      component: userCustomGroupPage,
      path:"/userCustomGroupPage",
      name: '组件组合页面'
    },
    {
      component: initD3,
      path:"/initD3",
      name: '关系网络'
    },
    {
      path: '/changeWallPaper',
      component: changeWallPaper,
      name: '更换壁纸'
    },
    {
        path: '/subjectMenu',
        component: subjectMenu,
        name: '专题菜单'
    },
    {
      path: '/platformSearchFuncPage',
      component: platformSearchFuncPage,
      name: '平台搜索功能'
    },
    {
      path: '/hyhttree',
      component: hyhttree,
      name: 'hyhttree'
    },
    {
      path: '/hyhttable',
      component: hyhttable,
      name: 'hyhttable'
    }
  ]
})
