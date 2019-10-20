<template>
  <div class="sjzcpt" id="sjzcpt">
    <header class="s_header">
      <div class="s_header_lt">
        <img class="s_header_img1"
             src="http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/logo_tjfxpt.png"/>
      </div>
      <div class="s_header_rt">
        <img class="s_header_img2"
             src="http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/login_bz.png"/>
        <span>帮助</span>
      </div>
    </header>
    <section class="s_section" id="s_section">
      <div class="s_section_lt">
        <p class="s_title_big">总览全局&ensp;图表联动</p>
        <p class="s_title_small">—— 大数据可视化驾驶窗</p>
      </div>
      <div class="s_section_rt">
        <h3 class="s_section_title">欢迎您登陆</h3>
        <el-form class="s_login_form" ref="login" :model="login">
          <el-form-item>
            <div class="s_left">
              <img class="s_login_left1"
                   src="http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/login_yonghu.png"/>
              <el-input class="s_login_left2" v-model="login.username" placeholder="用户"></el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="s_right">
              <img class="s_login_left1"
                   src="http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/login_mima.png"/>
              <el-input class="s_login_left2" type="password" v-model="login.pwd" placeholder="密码"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="s_login_btn" type="primary" @click="onSubmit">登录</el-button>
            <el-button class="s_login_btn" type="primary" @click="onTest">测试</el-button>
          </el-form-item>
        </el-form>
        <div class="s_login_footer">&ensp;</div>
      </div>
    </section>
    <footer class="s_footer">
      <div class="s_footer_lt">
        <span>Copyright © 2017 北京华云慧通科技有限公司</span>
      </div>
      <div class="s_footer_rt">
        <img class="s_footer_img"
             src="http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/login_iphone.png"/>
        <span>400-820-6789</span>
      </div>
    </footer>

  </div>
</template>
<script>
  /*引入*/
  import {Httpclient, auth, anycshttp} from '../../src/util/httplient';


  export default {
    data() {
      return {
        login: {
          username: "",
          pwd: ""
        }
      }
    },
    created() {
      this.getHt();
      window.addEventListener("resize", function () {
        var boxht = document.getElementById("sjzcpt");
        var winht = document.body.offsetHeight;
        if (boxht !== undefined && boxht !== null) {
          boxht.style.background = "url(http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/sjtjfxpt_bg.png) no-repeat";
          boxht.style.backgroundSize = "cover";
          boxht.style.height = winht + "px";
        }
      })
    },
    updated() {
      this.getHt();
    },


    // mounted(){
    //   var params="pageNum=1";
    //   this.$httpclient.notokenpost("/Xhwh/getXhwhList", params, function (res) {
    //     console.log("不用token的post",res);
    //
    //   });
    //
    // },


    methods: {
      onSubmit(data) {
        //console.log(data)
        var that = this;
        var login_name = that.login.username.indexOf(" ");
        var login_pwd = that.login.pwd.indexOf(" ");
        if (login_name != -1) {
          that.$message.error("账号有空格");
          return;
        }
        if (login_pwd != -1) {
          that.$message.error("密码有空格");
          return;
        }
        // if(!that.$mycommon.isNotEmpty(that.login.username)) {
        // 	that.$message.error("登录失败：用户名为空");
        // 	return;
        // }
        // if(!that.$mycommon.isNotEmpty(that.login.pwd)) {
        // 	that.$message.error("登录失败：密码为空");
        // 	return;
        // }

        new Httpclient("/login").notokenpost("/doLogin",
          "username=gutianle&password=123456",
          function (res) {
            if (res.success) {
              auth.setToken(res.data.token);
              sessionStorage.setItem("username", res.data.account.userName);
              sessionStorage.setItem("accountCode", res.data.account.accountCode);
              sessionStorage.setItem("securityId", res.data.account.securityId);
              sessionStorage.setItem("id", res.data.account.id);
              that.$message.success("登录成功");
              that.$router.push({
                path: '/'
              })
              //判断是否为主账号，存储起来
              if (that.login.username.indexOf("@") != -1) {
                sessionStorage.setItem("mianaccount", true);
              } else {
                sessionStorage.setItem("mianaccount", false);
              }
            } else {
              that.$message.error("登录失败：" + res.errorMsg);
            }
          });


      },
      getHt() {
        window.addEventListener("load", function () {
          var boxht = document.getElementById("sjzcpt");
          var winht = document.body.offsetHeight;
          if (boxht !== undefined && boxht !== null) {
            boxht.style.background = "url(http://hyht-public.oss-cn-shanghai.aliyuncs.com/official-website/static/img/sjtjfxpt_bg.png) no-repeat";
            boxht.style.backgroundSize = "cover";
            boxht.style.height = winht + "px";
          }
        })
      },
      onTest() {
        new Httpclient("/login").notokenpost("/doLogin2","", function (res) {
          console.log(res[0]);
          console.log(res[1]);
          console.log("不用token的post", res.name);
        },)
      }
    }
  }
</script>
