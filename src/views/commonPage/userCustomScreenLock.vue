<template>
    <div class="userCustomScreenLockPage">
        <div class="userCustomScreenLockPage-buttons">
            <el-button @click="viewOnLockScreenEvent" class="">锁 屏</el-button>
        </div>
        <!-- 锁屏控件 -->
        <div class="userCustomScreenLockPage-container" @contextmenu.prevent="screeLockStopRightMenu" v-if="screeLockStatus">
            <div class="userCustomScreenLockPage-container__datetime">
                <p class="userCustomScreenLockPage-container__time">{{nowTime}}</p>
                <p class="userCustomScreenLockPage-container__date">{{nowdate}},{{noWweek}}</p>
            </div>
            <img class="userCustomScreenLockPage-container__img" @click="screenLockOpenEvent" :src="currentScreenLockImg" alt="" srcset="">
            <div class="userCustomScreenLockPage-container__password" >
                <div v-if="screeLockInputStatus">
                    <p class="userCustomScreenLockPage-container__passwordName">{{currentUserName}}</p>
                    <el-input :type="passwordType" @keyup.enter.native="screenLockGoPassEvent" placeholder="密码" clearable v-model="screenLockPassword" class="userCustomScreenLockPage-container__passwordInput">
                        <template slot="prepend"><i class="el-icon-view" @click="screenLockGoShowPwdEvent"></i></template>
                        <el-button @click="screenLockGoPassEvent" slot="append" icon="el-icon-arrow-right"></el-button>
                    </el-input>
                </div>
                <div v-else>
                    <p class="userCustomScreenLockPage-container__passwordName">密码错误，再试一次</p>
                    <el-button class="userCustomScreenLockPage-container__changeBtns" @click="screenLockOnceAgainEvent">试一次</el-button>
                </div>
            </div>
            <div class="userCustomScreenLockPage-container__changeBgBox">
                <img id="userCustomScreenLockPage-container__randomWallImg" @click="randomWallImgChangeEvent" class="userCustomScreenLockPage-container__randomWallImg" src="../../../static/assets/screenlockImg/screenLockfengche.png" alt="">
                <div class="userCustomScreenLockPage-container__randomWall"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            screeLockStatus:false,
            screeLockInputStatus:true,
            screenLockImg:[
                "../../../static/assets/screenlockImg/screenlock1.jpg",
                "../../../static/assets/screenlockImg/screenlock2.jpg",
                "../../../static/assets/screenlockImg/screenlock3.jpg",
                "../../../static/assets/screenlockImg/screenlock4.jpg",
                "../../../static/assets/screenlockImg/screenlock5.jpg",
                "../../../static/assets/screenlockImg/screenlock6.jpg",
                "../../../static/assets/screenlockImg/screenlock7.jpg",
                "../../../static/assets/screenlockImg/screenlock8.jpg",
                "../../../static/assets/screenlockImg/screenlock9.jpg",
                "../../../static/assets/screenlockImg/screenlock10.jpg",
                "../../../static/assets/screenlockImg/screenlock11.jpg",
                "../../../static/assets/screenlockImg/screenlock12.jpg"
            ],
            currentScreenLockImg:"../../../static/assets/screenlockImg/screenlock1.jpg",
            nowTime:"",
            nowdate:"",
            noWweek:"",
            currentUserName:"华云慧通",
            screenLockPassword:"",
            passwordType:"password"
        }
    },
    mounted() {
        var that = this;

        // 动态高度
        $(".userCustomScreenLockPage").css("min-height",$("#app").height());

    },
    methods: {
        // 初始化事件
        viewOnLockScreenEvent(){
            var that = this;
            that.screeLockStatus = true;
            var myDate = new Date();
            var hours = myDate.getHours()+"";
            var minutes = myDate.getMinutes()+"";
            if (hours.length==1) {
                hours = "0"+hours;
            }
            if (minutes.length==1) {
                minutes = "0"+minutes;
            }
            that.nowTime = hours+":"+minutes;
            that.nowdate = myDate.getMonth()+1+"月"+myDate.getDate()+"日";
            var day = myDate.getDay();
            switch (day){
                case 0:
                    that.noWweek="星期日";
                    break;
                case 1:
                    that.noWweek="星期一";
                    break;
                case 2:
                    that.noWweek="星期二";
                    break;
                case 3:
                    that.noWweek="星期三";
                    break;
                case 4:
                    that.noWweek="星期四";
                    break;
                case 5:
                    that.noWweek="星期五";
                    break;
                case 6:
                    that.noWweek="星期六";
                    break;
            }
            // 禁用f12
            window.onkeydown = function(e) {
                if (e.keyCode === 123) {
                    e.preventDefault()
                }
            }
        },
        // 输入密码
        screenLockOpenEvent(){
            var that = this;
            that.screeLockInputStatus = true;
        },
        // 通过
        screenLockGoPassEvent(){
            var that = this;
            if (that.screenLockPassword == "hyht2019") {
                that.screeLockInputStatus = true;
                that.screeLockStatus = false;
                that.screenLockPassword = "";
                that.passwordType = "password";
            }else{
                that.screeLockInputStatus = false;
                that.screenLockPassword = "";
                
            }
        },
        // 试一次
        screenLockOnceAgainEvent(){
            var that = this;
            that.screeLockInputStatus = true;
        },
        // 查看密码
        screenLockGoShowPwdEvent(){
            var that = this;
            that.passwordType == "password"?that.passwordType = "text":that.passwordType = "password";
        },
        // 切换壁纸
        randomWallImgChangeEvent(){
            var that = this;
            $("#userCustomScreenLockPage-container__randomWallImg").removeClass("imgAnimation");
            setTimeout(function(){
                $("#userCustomScreenLockPage-container__randomWallImg").addClass("imgAnimation");
                that.currentScreenLockImg = that.screenLockImg[Math.round(Math.random()*10)]
            },10)

        },
        // 阻止右键
        screeLockStopRightMenu(){
            var that = this;
            
        },
        // iframe模式，其他的元素应该被隐藏
        otherNoRelevantElementBeHide(){
            parent.$(".homeMainContainerSideMenu").hide();
            parent.$(".home_tab_plan.el-tabs--border-card .el-tabs__header").hide();
            parent.$(".homeMainHeaderMenu").hide();
        },
        // iframe模式，其他的元素应该被显示
        otherNoRelevantElementBeShow(){
            parent.$(".homeMainContainerSideMenu").show();
            parent.$(".home_tab_plan.el-tabs--border-card .el-tabs__header").show();
            parent.$(".homeMainHeaderMenu").show();
        }
    
    }
}
</script>
