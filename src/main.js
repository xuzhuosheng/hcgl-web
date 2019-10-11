// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import $ from 'jquery'
import router from './router'
import VueECharts from './views/ECharts';
import promise from 'es6-promise';
// 打印
import Print from 'vue-print-nb'
Vue.use(Print); //打印机注册
// 生产pdf
import htmlToPdf from './util/htmlToPdf'
Vue.use(htmlToPdf)  //生成pdf注册
// 点击复制
import VueClipboards from 'vue-clipboards';
Vue.use(VueClipboards);  //复制注册

promise.polyfill();
import { Httpclient,auth,anycshttp } from '../src/util/httplient';
import mycommon from "./util/common";
//******样式文件
import '../theme/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.component('chart', VueECharts);
Vue.prototype.$mycommon = mycommon;
// Vue.prototype.$httpclient = new Httpclient("/tbjkfxapi","tbjkfx-api-token");
Vue.prototype.$httpclient = new Httpclient("/testapi");
Vue.prototype.$openhttpclient = new Httpclient("/tbjkfxapi","tbjkfx-api-token",'isopen');  //发布的页面不需要做鉴权校验
Vue.prototype.$anycshttp = new anycshttp("/tbjkfxapi","tbjkfx-api-token");   //同步请求
const $auth = new auth();
Vue.prototype.$auth = new auth();
/* eslint-disable no-new */
async function MainSyncInit() {

  // todo:登录---------
  const response = await new Promise(resolve => {
      new Httpclient("/tbjkfxapi","tbjkfx-api-token").notokenget('/web/static/mock/dns_env.json', {}, function (res) {
        resolve(res);
      })
  });
  const loginUrl = response.dns.sso_host+'/logout?service='+response.dns.sso_host+'/login?service='+response.dns.home_host+response.dns.home_url;
  const home_url= response.dns.home_host+response.dns.home_url;

  router.beforeEach((to, from, next) => {
    // 判断该路由是否需要登录权限
    if ($auth.getToken()) { //当前是否有token存在
      next();
    }else{
      if(!response.dns.isCaslogin){
        //不是cas验证登陆，就跳到默认路由（如果接口有做token认证，则先跳到登陆页）
        // next("/login");
        next();
      }
      else if($auth.IsAuTh){ //是否需要鉴权
        var url = document.location.href;
        var ticketLen = "ticket=".length;
        var ticketIndex = url.indexOf("ticket=");
        if(ticketIndex != -1){
          url = url.substring(url.indexOf("ticket=")+ticketLen);
          url = url.substring(0,url.indexOf("#"));
          $auth.setToken("token_api_"+url);
          window.location.href = home_url;
          // window.location.href = "/";
        }else{
          window.location.href = loginUrl;
        }
      }else{
        next();
      }
    }
  })
  // todo:登录/---------


  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })


}
MainSyncInit()
