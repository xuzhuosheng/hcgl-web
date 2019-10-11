<template>
  <div class="platformApiShowList">
    <el-tabs tab-position="top">
      <el-tab-pane label="组件详细说明">
        <ul class="platformApiShowList-ul">
          <li class="platformApiShowList-li" v-for="(item,index) in apiLists" :key="index">
            <span v-if="item.apiTitle" class="platformApiShowList-li__apiName platformApiShowList-li__apititle">{{item.apiName}}：</span>
            <span v-else class="platformApiShowList-li__apiName">{{index}}、{{item.apiName}}：</span>
            <span v-if="item.apiTitle" class="platformApiShowList-li__apiDescription platformApiShowList-li__apititle">{{item.apiDescription}}</span>
            <span v-else class="platformApiShowList-li__apiDescription">{{item.apiDescription}}</span>
            <span v-if="!item.apiTitle" class="platformApiShowList-li__btns"  v-clipboard="item.apiRouter" @success="viewOnTipsEvent">{{item.apiRouter}}<i class="el-icon-document"></i></span>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="方法名命名规范">
        <el-row class="platformApiFuncitionsShowList">
          <el-col :span="24" class="platformApiFuncitionsShowList-dec">
            页面出现多个重复的事件，推荐使用eventName+index（例如编辑：viewOnAffirmEvent，viewOnAffirmEvent2，viewOnAffirmEvent3...）
          </el-col>
          <el-col :span="8" v-for="(item,index) in functionNameList" :key="index">
            <ul class="platformApiFuncitionsShowList-ul">
              <li class="platformApiFuncitionsShowList-li">
                <span v-clipboard="item.functionName" @success="viewOnTipsEvent">{{item.cName}}：{{item.functionName}}<i class="el-icon-document copyIcon"></i></span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>
<style>
  .platformApiShowList{
    overflow: hidden;
    padding: 11px 16px;
  }
  .platformApiShowList-ul{
    list-style: none;
    background: #fff;
    overflow: hidden;
    color: #666;
    border-radius: 4px;
    overflow: auto;
  }
  .platformApiShowList-li{
    padding: 2px 5px 10px 0;
    overflow: hidden;
  }
  .platformApiShowList-li__apititle{
    font-size: 16px;
    color: red;
  }
  .platformApiFuncitionsShowList-ul{
    overflow: hidden;
  }
  .platformApiFuncitionsShowList-li{
    margin: 0 6px 6px 0;
  }
  .platformApiFuncitionsShowList-li span{
    list-style: none;
    background: #eeeeee40;
    border:#ccc 1px solid;
    border-radius: 6px;
    cursor: pointer;
    display: inline-block;
    padding: 2px 5px;
  }
  .platformApiFuncitionsShowList-li:hover{
    color: #3491eb;
  }
  .platformApiFuncitionsShowList-li .el-icon-document{
    margin-left: 6px;
  }
  .platformApiShowList-li__btns{
    background: #eeeeee40;
    border:#ccc 1px solid;
    margin: 2px 5px;
    padding: 1px 4px;
    border-radius: 6px;
    cursor: pointer;
  }
  .platformApiShowList-li__btns:hover{
    color: #3491eb;
  }
  .platformApiShowList-li__btns .el-icon-document{
    margin-left: 6px;
  }
  .platformApiFuncitionsShowList-dec{
    margin: 0 0 8px 0;
    font-size: 16px;
    color: red;
  }

</style>
<script>
import VueClipboards from 'vue-clipboards'; //点击复制
export default {
  name: "platformApiShowList",
  data() {
    return{
      apiLists: [],
      functionNameList:[]
    }
  },
  mounted() {
    var that = this;
    $(".platformApiShowList").css("min-height",$("#app").height()-46);
    $(".platformApiShowList-ul").css("min-height",$("#app").height()-80);
    $(".platformApiShowList-ul").css("max-height",$("#app").height()-80);
    that.$httpclient.notokenget('../../static/mock/apiLists.json', {}, function (res) {
      that.apiLists = res.apiLists;
    })
    that.$httpclient.notokenget('../../static/mock/functionNameList.json', {}, function (res) {
      that.functionNameList = res.functionNameList;
    })
  },
  methods: {
    viewOnTipsEvent(){
      var that = this;
      that.$message.success("复制成功！");
    }
  }
};
</script>
