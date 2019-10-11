var SubjectMenu = function () {
  if (this instanceof SubjectMenu) {
    /**
     *流程
     * 内部方法
     *  数据初始化
     *  画搜索页
     * 内部功能
     *  搜索功能
     *  详情页返回首页事件
     *  点击图片进入详情页事件
     * 对外方法
     *  根据数据渲染页面
     * 对外事件
     *  搜索结果选中事件
     *  详情页功能选中事件
     *
     */
    var that = this;
    // 设置功能的默认图片（在没有功能图片时功能图片自动占位，不设置组件将按照默认的图片占位）
    this.subjectMenuDefaultImage = "../../../static/subjectMenu/img/subjectMenuDefaultImage.jpg"; 

    //根据数据渲染页面
    this.createHtml = function (id, data, images) {
      var heightBoxHt = $("#"+id).height()-55; //外盒高度
      var heightBoxHt2 = $("#"+id).height()-55-48; //详细列表高度
      var heightBoxHt3 = $("#"+id).height()-35; //详细列表2级高度
      data = that.initData(data); //初始化数据
      var divId = that.guid();
      var searchDatasId = "searchDatas_" + divId;
      var searchDatasViewId = "searchDatas_view_" + divId;
      var subjectDetailsId = "subjectDetails_" + divId;
      var subSearchId = "sub_search_" + divId;
      var dialogAddSubjectId = "dialogAddSubject_"+divId;
      var html = '<div class="projectMenuItemsSubjectMenu" style="height:'+heightBoxHt+'px;">';
      var subjectMenu = function (list) {
        var content = '<input type="text" placeholder="功能搜索" class="sub_search" id="' + subSearchId + '">';
        content += '<ul class="sub_ul" style="height:'+heightBoxHt2+'px;">';
        var widths = ['374', '458', '458', '374'];
        if (!images) {
          images = [
            './img/1.jpg',
            './img/2.jpg',
            './img/3.jpg',
            './img/4.jpg',
            './img/5.jpg',
            './img/6.jpg',
            './img/7.jpg',
            './img/8.jpg'
          ];
        }
        var widthsIndex = 0;
        var imagesIndex = 0;
        var margins = [20, 14];
        var marginsIndex = 0;
        for (var i = 0; i < list.length; i++) {
          var styleValue = 'style="width: ' + widths[widthsIndex] + 'px; background:url(' + images[imagesIndex] + ');background-size: '+widths[widthsIndex]+'px 150px; margin: 0 ' + margins[marginsIndex] + 'px 20px 0; "';
          var elm = list[i];
          var h1 = '<li class="sub_li" ' + styleValue + ' _vid="' + elm.vid + '">';
          h1 += '<h3 class="sub_li_title" _vid="' + elm.vid + '" >' + elm.name + '</h3>';
          h1 += '<div class="sub_li_content" _vid="' + elm.vid + '">' + elm.desc + '</div>';
          h1 += '</li>';
          content += h1;
          elm["imgUrl"] = images[imagesIndex];
          widthsIndex + 1 == widths.length ? widthsIndex = 0 : widthsIndex++;
          imagesIndex + 1 == images.length ? imagesIndex = 0 : imagesIndex++;
          marginsIndex + 1 == margins.length ? marginsIndex = 0 : marginsIndex++;
        }
        content += '</ul>';
        return content;
      }
      var searchDatas = function () {
        var content = '<div class="searchDatas" id="' + searchDatasViewId + '">';
        content += '    <div class="searchDatas_tips">搜索结果</div>';
        content += '    <ul class="searchDatas_ul" id="' + searchDatasId + '">';
        content += '    </ul>';
        content += '</div>';
        return content;
      }
      var subjectDetails = function () {
        var content = '<div class="projectMenuItemsSubjectDetails" style="height:'+heightBoxHt3+'px;" id="' + subjectDetailsId + '" >';
        content += '</div>';
        return content;
      }
      var dialogAddSubject = function(){
        var content = '<div class="dialogAddSubject" id="' + dialogAddSubjectId + '" >';
        content += '<div class="dialogAddSubject_title">提示</div>';
        content += '<div class="dialogAddSubject_content">是否将专题功能添加到桌面？</div>';
        content += '<div class="dialogAddSubject_btns">'
        content += '<button class="dialogAddSubject_yes">确认</button><button class="dialogAddSubject_no">取消</button>'
        content += '</div>';
        content += '</div>';
        return content;
      }
      html += subjectMenu(data);
      html += searchDatas();
      html += subjectDetails();
      html += dialogAddSubject();
      html += '</div>';
      $('#' + id).html(html);
      //							$('"#' + id+'"').innerHTML= html;
      var mockList = that.treetolist(data);

      $("#" + subSearchId).keyup(function () {
        var key = $("#" + subSearchId).val();
        var selectlist = that.select(key, mockList);
        that.searchDatasValue(searchDatasId, selectlist);
        $('#' + searchDatasViewId).fadeIn();
      })
      $("#" + subSearchId).blur(function () {
        if($("#" + subSearchId).val() == ""){
          $('#' + searchDatasViewId).fadeOut();
          $("#" + subSearchId).val("");
          $('#' + searchDatasId).html("");
        }
      })

      $(".sub_li").click(function (e) {
        e.stopPropagation(); //阻止事件冒泡
        var vid = $(e.target).attr("_vid");
        var sobj = that.mySelection(vid, data);
        if (that.selection(sobj, "zt")) {
          if (sobj) {
            that.subjectDetailsValue(subjectDetailsId, sobj,id);
            $("#" + subjectDetailsId).fadeIn();
            window.parent.postMessage(sobj,'*');
          }
        }

      })
    }
    //数据初始化
    this.initData = function (data) {
      var viewData;
      var getZtData = function (obj) {

      }
      for (var i = 0; i < data.length; i++) {

      }
      return data;
    }

    //搜索功能
    this.select = function (val, mockList) {
      if (!that.isNotEmpty(val)) {
        return mockList;
      }
      var relist = [];
      for (var i = 0; i < mockList.length; i++) {
        var temp = mockList[i];
        var value = temp["name"];
        if (value.indexOf(val) != -1) {
          relist.push(temp);
        }

      }
      return relist;
    }
    //搜索结果选中事件
    this.mySelection = function (vid, data) {
      var sobj;
      for (var i = 0; i < data.length; i++) {
        var temp = data[i];
        if (temp["vid"] == vid) {
          sobj = temp;
          break;
        }
      }
      return sobj;
    }
    //选中事件回调 type=select是搜索下拉，detail是详情页面的选中
    this.selection = function (obj, type) {
      return true;
    }

    this.searchDatasValue = function (searchDatasId, list) {
      var html = '';
      for (var i = 0; i < list.length; i++) {
        var elm = list[i];
        var h1 = '<li class="searchDatas_li" _vid="' + elm.vid + '">';
        h1 += '<a href="javascript:void(0)" _vid="' + elm.vid + '">';
        h1 += '	<div class="searchDatas_div" _vid="' + elm.vid + '">';
        h1 += '		<h3 _vid="' + elm.vid + '">' + elm.name + '</h3>';
        h1 += '		<div _vid="' + elm.vid + '">' + elm.ztname + '</div>';
        h1 += '	</div>';
        h1 += '	<div class="searchDatas_path" _vid="' + elm.vid + '">' + elm.path + '</div> ';
        h1 += '</a>';
        h1 += '</li>';
        html += h1;
      }
      $('#' + searchDatasId).html(html);
      $('.searchDatas_li').click(function (e) {
        e.stopPropagation(); //阻止事件冒泡
        var vid = $(e.target).attr("_vid");
        var sobj = that.mySelection(vid, list);
        if (that.selection(sobj, "select")) {
          //发起postmessage
          if (sobj) {
            // console.log("发起postmessage - detail")
            window.parent.postMessage(sobj,'*');
          }
        }
      });
    }

    this.subjectDetailsValue = function (subjectDetailsId, obj,pid) {
      var ht = $("#"+pid).height()-35-150-20;
      var urlImgBg = obj.imgUrl.split(".jpg")[0];
      var goBackId = subjectDetailsId + "_2";
      var styles = 'style="background: url(' + urlImgBg + '-detail.jpg) no-repeat;background-size: 854px 150px;"'
      var content = '      <div class="subjectDetails_header" ' + styles + '>';
      content += '          <button class="subjectDetails_goBack" id="' + goBackId + '">返回上一层</button>';
      content += '          <div class="subjectDetails_text">';
      content += '              <div class="subjectDetails_text_title">' + obj.name + '</div>';
      content += '              <div class="subjectDetails_text_content">' + obj.desc + '</div>';
      content += '          </div>';
      content += '      </div>';
      content += '      <ul class="subjectDetails_ul" style="height:'+ht+'px;">';
      for (var i = 0; i < obj.children.length; i++) {
        var elm = obj.children[i];
        var h1 = '';
        h1 += '        	 <li class="subjectDetails_li" _vid="' + elm.vid + '">';
        if (!elm.imgUrl||elm.imgUrl==""||elm.imgUrl==" ") {
          elm.imgUrl = that.subjectMenuDefaultImage; //数据中无图片时，默认图片占位
        }
        h1 += '              <img src="' + elm.imgUrl + '" alt="' + elm.desc + '"  _vid="' + elm.vid + '"     >';
        h1 += '              <a style="display:block;" title="'+elm.name+'">'
        if (elm.name.length>20) {
          h1 += '              <h3  _vid="' + elm.vid + '"   >' + elm.name.substring(0,18)+'...'+'</h3>';
        } else {
          h1 += '              <h3  _vid="' + elm.vid + '"   >' + elm.name +'</h3>';
        }
        h1 += '              </a>';
        h1 += '          </li>';
        content += h1;
      }
      content += '      </ul>';
      $('#' + subjectDetailsId).html(content);

      $("#" + goBackId).click(function (e) {
        e.stopPropagation(); //阻止事件冒泡
        $('#' + subjectDetailsId).html("");
        $("#" + subjectDetailsId).fadeOut();
      });
      // 单击专题功能下钻
      $('.subjectDetails_li').click(function (e) {
        e.stopPropagation(); //阻止事件冒泡
        var vid = $(e.target).attr("_vid");
        var sobj = that.mySelection(vid, obj["children"]);
          if (that.selection(sobj, "detail")) {
            if (sobj) {
              //发起postmessage
              // console.log("发起postmessage - detail")
              window.parent.postMessage(sobj,'*');
            }
          }
      });
      // 右击功能下钻，加入桌面
      $(".subjectDetails_li").unbind("mousedown").bind("contextmenu", function (e) {
        e.stopPropagation(); //阻止事件冒泡
        var vid = $(e.target).attr("_vid");
        var sobj = that.mySelection(vid, obj["children"]);
        if(e.button==2&&e.which==3){
          $(".dialogAddSubject").fadeIn();
          $(".dialogAddSubject_yes").click(function(evt){
            evt.stopPropagation(); //阻止事件冒泡
            if (that.selection(sobj, "detail")) {
              if (sobj) {
                //发起postmessage
                // console.log("发起postmessage - detail")
                window.parent.postMessage(sobj,'*');
              }
            }
            $(".dialogAddSubject").fadeOut();
          })
          $(".dialogAddSubject_no").click(function(event){
            event.stopPropagation(); //阻止事件冒泡
            $(".dialogAddSubject").fadeOut();
          })
        }
        return false;
      });
    }
    this.treetolist = function (data) {
      var list = [];
      for (var i = 0; i < data.length; i++) {
        var temp = data[i];
        if (temp["children"]) {
          for (var j = 0; j < temp["children"].length; j++) {
            var obj = temp["children"][j];
            var obj1 = {
              vid: obj["vid"],
              imgUrl: obj["imgUrl"],
              name: obj["name"],
              path: obj["path"],
              desc: obj["desc"],
              ztname: temp["name"]
            }
            list.push(obj1);
          }
        }
      }
      return list;
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
    return new SubjectMenu();
  }
}
$.fn.extend({
  getSubjectMenuPager: function () {
    return new SubjectMenu();
  }
});
