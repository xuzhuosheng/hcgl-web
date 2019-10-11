var ChangeWallPagerHelper = function() {
	if(this instanceof ChangeWallPagerHelper) {
        var that = this;
        this.data = []; //数据
        this.containerClass = ""; //容器类
        this.setData=function(datalist){ //初始化数据
            if (datalist) {
                datalist.sort(that.compare('sortNo')); //排序
                for (let i = 0; i < datalist.length; i++) {
                    const element = datalist[i];
                    element["_data"]= element.id;
                }
                that.data = datalist;
            } else {
                console.log("数据为空!")
            }
        };
        this.path = "./img/"; //图片路径
        this.setPath=function(path){ //图片路径初始化
            if (path) {
                that.path = path;
            }
        };
        this.closeThingBack = null; //关闭按钮回调
        this.applyThingBack = null;  //应用按钮回调
        this.restoreDefThingBack = null; //恢复默认设置按钮回调
        this.clickThingAfterBack = null; //点击回调触发事件后的回调
        //初始化方法
        this.init=function(closeThingBack,applyThingBack,restoreDefThingBack,clickThingAfterBack){
            that.setHtml();
            closeThingBack?that.closeThingBack=closeThingBack:""; //点击关闭按钮
            applyThingBack?that.applyThingBack=applyThingBack:""; //点击应用按钮
            restoreDefThingBack?that.restoreDefThingBack=restoreDefThingBack:""; //点击恢复默认设置按钮
            clickThingAfterBack?that.clickThingAfterBack=clickThingAfterBack:""; //点击后回调
            that.clickBtnFuncBack();
        };
        //回调方法
        this.clickBtnFuncBack=function(){
            var type = null;
            var newSelectedObj = null;
            var data = null;
            var allData = null;
            var oldSelectedObj = that.selectLiFunc(); //点击之前选中的数据
            //关闭按钮
            $(".changeWP_closeBtn").click(function(e){
                e.stopPropagation(); //阻止事件冒泡
                type = e.type;
                newSelectedObj = that.data;
                if (that.isFunc(that.closeThingBack)) {
                    data=that.closeThingBack(type,e,"changeWP_closeBtn",); //回调前
                }
                if (data && (data.success == true||data.success == "true")) {
                    that.closeFunc(); //关闭弹窗
                    var obj = {"newSelectedObj":newSelectedObj,"data":data}
                    window.parent.postMessage(obj,'*'); //发起postmessage
                }
                that.clickThingAfterBack(type,e,newSelectedObj,null,data); //回调后
                
            })
            //点击应用按钮
            $(".changeWP_btn_application").click(function(e){
                e.stopPropagation(); //阻止事件冒泡
                type = e.type;
                if (that.isFunc(that.applyThingBack)) {
                    allData = JSON.parse(JSON.stringify(that.data));
                    newSelectedObj = that.selectLiFunc(); //处理以后的数据
                    data = that.applyThingBack(type,e,newSelectedObj,oldSelectedObj,allData); //回调前
                }
                if (data && (data.success == true||data.success == "true")) {
                    data = that.selectLiDealDataFunc();
                    var obj = {"newSelectedObj":newSelectedObj,"oldSelectedObj":oldSelectedObj,"data":data}
                    window.parent.postMessage(obj,'*'); //发起postmessage
                }
                that.clickThingAfterBack(type,e,newSelectedObj,oldSelectedObj,data); //回调后
                
            })
            //点击恢复默认设置按钮
            $(".changeWP_btn_restoreDefSet").click(function(e){
                e.stopPropagation(); //阻止事件冒泡
                type = e.type;
                if (that.isFunc(that.restoreDefThingBack)) {
                    allData = JSON.parse(JSON.stringify(that.data));
                    newSelectedObj = that.selectLiFunc(); //处理以后的数据
                    data = that.restoreDefThingBack(type,e,newSelectedObj,oldSelectedObj,allData); //回调前
                }
                if (data && (data.success == true||data.success == "true")) {
                    if (data.setObj) {
                        // 返回默认设置的对象
                        oldSelectedObj = data.setObj; //恢复默认设置的对象
                    }
                    data = that.selectLiDealDataFunc(oldSelectedObj);
                    that.selectLiHight(oldSelectedObj); //高亮选中
                    var obj = {"newSelectedObj":newSelectedObj,"oldSelectedObj":oldSelectedObj,"data":data}
                    window.parent.postMessage(obj,'*'); //发起postmessage
                }
                that.clickThingAfterBack(type,e,newSelectedObj,oldSelectedObj,data); //回调后
                
            })
            
        };
        //关闭方法
        this.closeFunc=function(){
            $(".customChangeWallPager").fadeOut();
        };
        //选中方法
        this.selectLiFunc=function(){
            if($(".changeWP_li.changeWP_li_select").length>0){
               for (let i = 0; i < that.data.length; i++) {
                   const element = that.data[i];
                   if ($(".changeWP_li.changeWP_li_select").attr("_data")==element.id||$(".changeWP_li.changeWP_li_select").attr("_data")==(element.id+"")) {
                       return element;
                   }
               }
            }else{
                return {};
            }
        };
        //选中方法：处理选中数据
        this.selectLiDealDataFunc=function(oldSelectedObj){
            // 有默认值
            if (oldSelectedObj) {
                for (let i = 0; i < that.data.length; i++) {
                    const element = that.data[i];
                    if (element.id==oldSelectedObj.id) {
                        element["isSelect"]=true;
                    } else {
                        element["isSelect"]=false;
                    }
                }
            }else{
                // 无默认值
                for (let i = 0; i < that.data.length; i++) {
                    const element = that.data[i];
                    if ($(".changeWP_li.changeWP_li_select").attr("_data")==element.id||$(".changeWP_li.changeWP_li_select").attr("_data")==(element.id+"")) {
                        element["isSelect"]=true;
                    }else{
                        element["isSelect"]=false;
                    }
                }
            }
            return that.data;
        }
        //组合页面html结构
        this.setHtml=function(){
            $(".customChangeWallPager").remove();
            var html = '';
            html += '<div class="customChangeWallPager">'
            html +=    '<div class="changeWP_title">'
            html +=         '<h3>选择桌面壁纸</h3>'
            html +=         '<img class="changeWP_closeBtn" src="'+that.path+'wallClose_icon.png" alt="" srcset="">'
            html +=     '</div>'
            html +=     '<ul class="changeWP_ul">'
            for (let i = 0; i < that.data.length; i++) {
                const element = that.data[i];
                if (element.isSelect) {
                    html +=    '<li class="changeWP_li changeWP_li_select" _data="'+element._data+'">'
                } else {
                    html +=    '<li class="changeWP_li" _data="'+element._data+'">'
                }
                html +=         '<img src="'+element.path+'" alt="'+element.desc+'">'
                html +=    '</li>'
            }
            html +=     '</ul>'
            html +=     '<div class="changeWP_btn">'
            html +=        '<button class="changeWP_btn_restoreDefSet">恢复默认设置</button>'
            html +=        '<button class="changeWP_btn_application">应用</button>'
            html +=     '</div>'
            html += '</div>'
            $(that.containerClass).append(html);
            that.selectLi();
        };
        //选中高亮
        this.selectLi=function(){
            $(".changeWP_li").click(function(e){
                e.stopPropagation(); //阻止事件冒泡
                if($(this).hasClass("changeWP_li_select")){
                    $(this).removeClass("changeWP_li_select");
                }else{
                    $(".changeWP_li").not(this).removeClass("changeWP_li_select");
                    $(this).addClass("changeWP_li_select");
                }
            })
        };
        // 设置默认高亮
        this.selectLiHight=function(oldSelectedObj){
            for (let i = 0; i < $(".changeWP_li").length; i++) {
                const element = $(".changeWP_li")[i];
                if (element.attributes._data.value==oldSelectedObj.id) {
                    $(element).addClass("changeWP_li_select")
                }else{
                    $(element).removeClass("changeWP_li_select")
                }
            }
        };
        //排序
        this.compare=function(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        };
        //是否是函数
        this.isFunc=function (func) {
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
        
    }else{
        new ChangeWallPagerHelper();
    }
}
$.fn.extend({
    getChangeWallPagerHelper:function(){
      return new ChangeWallPagerHelper();
    }
});