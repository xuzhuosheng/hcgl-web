<template>
    <div class="hello" style="padding: 10px;">
        <span>税务机关下拉树单选 : </span>
        <taxAuthority-tree v-model="taxAuthor01" :url="url" width="300"
            :defaultExpandedKeys="defaultExpandedKeys"
            :defaultProps="defaultProps" :SFDMHMC="true"  XZCJ="" XSCJ=""
            :SFWZDMMC="true" :SFXSJC="false"
            :filterable="true" :clearable="true">
        </taxAuthority-tree>
        <span>税务机关下拉树多选 : </span>
        <taxAuthority-tree v-model="taxAuthor02" width="300"  :defaultProps="defaultProps"
            :default-expanded-keys="['12101']"
            :SFXSJC="false" :url="url" XZCJ="" XSCJ=""
            :SFWZDMMC="true"
            :SFDMHMC="true"
            :collapseTags="true"
            :filterable="true"
            :multiple="true">
        </taxAuthority-tree>
        <br><br>
        <span>行政区域下拉树单选 : </span>
         <area-tree v-model="areavalue01" width="300"  :defaultProps="defaultProps"
            :default-expanded-keys="[]"
            :SFXSJC="false" :url="Areaurl"
            :SFWZDMMC="true"  :clearable="true"  XZCJ="1" XSCJ=""
            :SFDMHMC="false"
            :collapseTags="true"
            :filterable="true">
        </area-tree>
        <span>行政区域下拉树多选 : </span>
         <area-tree v-model="areavalue02" width="300"  :defaultProps="defaultProps"
            :default-expanded-keys="[]"
            :SFXSJC="false" :url="Areaurl"  XZCJ="1" XSCJ=""
            :SFWZDMMC="true"
            :SFDMHMC="true"
            :collapseTags="true"
            :filterable="true"
            :multiple="true">
        </area-tree>
        <br><br>
        <span>行业下拉树单选 : </span>
        <Industry-tree v-model="Industryurl01" width="300"  :defaultProps="defaultProps"
            :default-expanded-keys="[]"
            :SFXSJC="false" :url="Industryurl" XZCJ="1" XSCJ=""
            :SFWZDMMC="true"
            :SFDMHMC="false"
            :collapseTags="true"
            :filterable="true">
        </Industry-tree>
        <span>行业下拉树多选 : </span>
        <Industry-tree v-model="Industryurl02" width="300"  :defaultProps="defaultProps"
            :default-expanded-keys="[]"
            :SFXSJC="false" :url="Industryurl"
            :SFWZDMMC="true" XZCJ="1" XSCJ=""
            :SFDMHMC="true"
            :collapseTags="true"
            :filterable="true"
            :multiple="true">
        </Industry-tree>
         <br><br>
        <span>征收项目下拉树单选 : </span>
        <collection-tree v-model="Collection01" width="300"  :defaultProps="defaultProps"
            :default-expanded-keys="[]"
            :SFXSJC="false" :url="Collectionurl" XZCJ="1" XSCJ=""
            :SFWZDMMC="true"
            :SFDMHMC="false"
            :collapseTags="true"
            :filterable="true">
        </collection-tree>
        <span>征收项目下拉树多选 : </span>
        <collection-tree v-model="Collection02" width="300"  :defaultProps="defaultProps"
            :default-expanded-keys="[]"
            :SFXSJC="false" :url="Collectionurl" XZCJ="1" XSCJ=""
            :SFWZDMMC="true"
            :SFDMHMC="false"
            :collapseTags="true"
            :filterable="true"
            :multiple="true">
        </collection-tree><br><br>
        <span>所属期起止输入框 : </span>
        <taxdate-picker v-model="datepickerVal"></taxdate-picker>
        <!-- <div style="display: inline-block;"></div> -->
        
    </div>
</template>
<script>
import taxAuthorityTree from '../components/industrymoudel/taxAuthorityTree';
import AreaTree from '../components/industrymoudel/AreaTree';
import IndustryTree from '../components/industrymoudel/Industry';
import CollectionTree from '../components/industrymoudel/CollectionTree';
import TaxdatePicker from '../components/industrymoudel/TaxDatePicker';
export default {
  name: 'industrymoudel',
  components:{taxAuthorityTree,AreaTree,IndustryTree,CollectionTree,TaxdatePicker},
  data () {
    return{
      // 税务机关下拉树选择
      treedata: [],
      ss:'KJ',
      defaultProps:{
        parentId: 'parentValue',
        id: 'value',
        label: 'label',
        children: 'children',
      },
      url:"../../static/mock/TaxList.json",
      Areaurl:"../../static/mock/AreaList.json",
      Industryurl:"../../static/mock/IndustryList.json",
      Collectionurl:"../../static/mock/CollectionList.json",
      defaultExpandedKeys: [],
      taxAuthor01: '',
      taxAuthor02: [],
      areavalue01:"",
      areavalue02:[],
      Industryurl01:"",
      Industryurl02:[],
      Collection01:"",
      Collection02:[],
      datepickerVal:[]
      
    }
  },
  created(){
    var that =this
  },
  mounted() {
    
  },
  methods: {
    clickMe01() {
      this.$message.warning(this.taxAuthor01);
    },
    clickMe02() {
      this.$message.warning(this.taxAuthor02.toString());
    },
  }
}
</script>
