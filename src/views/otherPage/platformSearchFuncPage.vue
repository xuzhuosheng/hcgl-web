
<template>
  <div class="platformSearchFuncPage">
    <!-- <h3>平台功能搜索</h3> -->
    <div class="platformSearchFuncPage-container">
      <div class="platformSearchFuncPage-search">
        <img class="platformSearchFuncPage-search__img" src="../../../static/assets/img/psfpage_search_icon.png">
        <el-input @keyup.enter.native="searchBtn" placeholder="请输入关键字" v-model="searchValue" class="input-with-select platformSearchFuncPage-search__value">
          <el-button slot="append" @click="searchBtn">搜索</el-button>
        </el-input>
      </div>
      <div class="platformSearchFuncPage-searchDataShow">
        <el-tabs v-model="activeName">
            <el-tab-pane label="功 能" name="first">
                <div class="platformSearchFuncPage-searchDataShowContent">
                    <ul v-if="datalist.length>0" class="platformSearchFuncPage-searchDataShowContent__ul" v-loading="dataLoading">
                        <li class="platformSearchFuncPage-searchDataShowContent__li" v-for="(item,idx) in datalist" :key="idx">
                            <div class="platformSearchFuncPage-searchDataShowContent__liDiv" @click="openFuncPage(item)">
                                <span class="platformSearchFuncPage-searchDataShowContent__liDivTitle1" v-if="item.permissionName" v-html="item.permissionName"></span>
                                <span class="platformSearchFuncPage-searchDataShowContent__liDivTitle2" v-if="item.threeMenu" v-html="item.threeMenu">/</span>
                                <span class="platformSearchFuncPage-searchDataShowContent__liDivTitle2" v-if="item.twoMenu" v-html="item.twoMenu">/</span>
                                <span class="platformSearchFuncPage-searchDataShowContent__liDivTitle2" v-if="item.oneMenu" v-html="item.oneMenu"></span>
                                <span class="platformSearchFuncPage-searchDataShowContent__liDivTitle3" v-if="item.themeName" v-html="item.themeName"></span>
                            </div>
                            <div class="platformSearchFuncPage-searchDataShowContent__liContentDiv" v-if="item.functionIntroduction" v-html="item.functionIntroduction"></div>
                        </li>
                    </ul>
                    <div v-else class="platformSearchFuncPage-searchDataShowContent__liEmpty">
                        暂无匹配数据
                    </div>
                </div>
                <div v-if="datalist.length>0" class="platformSearchFuncPage-paginations">
                    <el-pagination 
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange" 
                    :current-page.sync="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "platformSearchFuncPager",
  data() {
    return {
      searchValue: "",
      activeName:"first",
      pageNum:1,
      pageSize:10,
      total:0,
      currentPage:1,
      datalist:[],
      dataLoading:false
    };
  },
  created() {

  },
  methods: {
    // 查询
    searchBtn(){
        var that = this;
        // that.dataLoading=true;
        console.log(that.searchValue)
        for (let index = 0; index < 5; index++) {
            that.datalist.push({
                "permissionName":"GDP与税收分产业按季统计",
                "threeMenu":"税收与经济分析",
                "twoMenu":"GDP与税收分析",
                "oneMenu":"税收分析",
                "themeName":"GDP与税收分产业按季统计",
                "url":"/url",
                "functionIntroduction":"GDP与税收分产业按季统计，2018年一季度国内生产总值（GDP）初步核算结果按照改革后的我国GDP核算和数据发布制度规定，年度国内生产总值（GDP ... 第二种分类是三次产业分类，依据国家统计局2012 年制定的《三次产业划分规定》非常高：国内生产总值GDP是核算体系中一个重要的综合性统计指标，也是中国新国民经济核算体系中的核心指标。它反映一国（或地区）的经济实力和市场规模。"
            })
        }
        // that.$httpclient.notokenget("/rest/search/selectPlatformSearch",{"briefIntroduction":that.searchValue},function(res) {
        //     if (res.success) {
        //         // that.dataLoading=false;
        //         // Todo...
        //         that.datalist = res.data.list;
        //     } else {
        //         that.$message.error("数据加载失败！")
        //         // that.dataLoading=false;
        //     }
        // })
    },
    // 跳转功能页面
    openFuncPage(item){
        var that = this;
        console.info('url', item.url)
    },
    handleSizeChange(val) { //每页显示数量发生变化后触发
        var that = this;
        that.pageNum = val;
    },
    handleCurrentChange(val) {
        var that = this;
        that.pageSize = val;
    }

  }
};
</script>