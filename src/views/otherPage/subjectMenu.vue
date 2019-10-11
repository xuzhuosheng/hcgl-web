<template>

  <div class="subjectMenuPaper">
    <el-button @click="ztcd()">专题菜单</el-button>
    <div class="changeBox" id="changeBox"></div>
  </div>

</template>
<style scoped>
  .subjectMenuPaper {
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .changeBox {
    width: 100%;
  }
</style>
<script>
  //引入组件
  // import "../../../static/subjectMenu/js/jquery-1.12.0.js"(项目已安装jquery.js，就不必引入此项)
  import "../../../static/subjectMenu/js/subjectMenu.js"
  import "../../../static/subjectMenu/css/subjectMenu.css"

  export default {
    name: "subjectMenuPaper",
    data() {
      return {};
    },
    created() {
      window.addEventListener("message",function(e){
          console.log('tag', e.data)
      })
    },
    methods: {
      ztcd() {
        //图片路径（不同项目图片链接的地址不同，确保路径正常，链接到changeWallPaper组件中的图片路径）
        var path = "../../../static/subjectMenu/img/";
        // 数据
        var mockdata =
          [
            {
              vid: '1', name: '1', desc: '1',
              children: [
                {vid: '11', imgUrl: path + '1.jpg', name: '11', path: '12', desc: '13', ztname: '14'}
              ]
            },
            {
              vid: '1', name: '1', desc: '1',
              children: [
                {vid: '11', imgUrl: path + '2.jpg', name: '11', path: '12', desc: '13', ztname: '14'}
              ]
            },
            {
              vid: '1', name: '1', desc: '1',
              children: [
                {vid: '11', imgUrl: path + '3.jpg', name: '11', path: '12', desc: '13', ztname: '14'}
              ]
            },
          ];
        mockdata.length = 0;
        for (let i = 0; i < 10; i++) {
          let list = [];
          for (let j = 0; j < 10; j++) {
            list.push({
              vid: i + "_" + j,
              imgUrl: path + '1.jpg',
              name: j + '功能',
              path: '第' + i + '专题/' + j + '功能',
              desc: '第' + i + '专题的' + j + '功能',
              ztname: ''
            },{
              vid: i + "_" + j,
              imgUrl: "",
              name: j + '功能功能占位图片由于你没有定义功能图片组件会自动使用占位图片',
              path: '第' + i + '专题/' + j + '功能',
              desc: '第' + i + '专题的' + j + '功能，功能占位图片',
              ztname: ''
            })
          }
          mockdata.push({vid: i, name: '第' + i + '专题', desc: '第' + i + '专题xx', children: list})
        }
        var images = [
          path + '1.jpg',
          path + '2.jpg',
          path + '3.jpg',
          path + '4.jpg',
          path + '5.jpg',
          path + '6.jpg',
          path + '7.jpg',
          path + '8.jpg'
        ];
        // 实例化对象
        var subjectMenuPager = $.fn.getSubjectMenuPager();
        // 设置功能的默认图片（在没有功能图片时设置默认图片占位，不设置组件将按照默认的图片占位）
        subjectMenuPager.subjectMenuDefaultImage = "../../../static/subjectMenu/img/subjectMenuDefaultImage.jpg"; 
        // 组件回调方法
        subjectMenuPager.selection = function (obj, type) {
          //type=select是搜索下拉，detail是详情页面的选中,zt是专题
          console.log(type, obj);
          return true;
        }
        //初始化数据
        subjectMenuPager.createHtml('changeBox', mockdata, images);

      }
    }

  }
</script>
