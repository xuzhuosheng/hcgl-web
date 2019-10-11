<template>
  <div class="userCustomMobanPage5">
    <div class="userCustomMobanPageContainer">
        <div class="userCustomMobanPageContainer-buttons">
            <el-button @click="viewOnSendMessagesEvent">发 送</el-button>
            <el-button @click="viewOnCancelEvent">取 消</el-button>
        </div>
        <div class="userCustomMobanPageContainer-contents">
            <div class="userCustomMobanPageContainer-conditions">
                <el-form label-width="15%" :inline="true" :model="conditionsForm" class="demo-form-inline userCustomMobanPageContainer-conditions__form">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="消息主题:" class="el-form-item__contentOfInput">
                                <HyhtInput :inputValue='input'></HyhtInput>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="消息内容:" class="el-form-item__contentOfTextarea">
                                <Tinymce :height=130 ref="editor" v-model="textarea"></Tinymce>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="紧急情况:">
                                <HyhtSelect :modelSelectValue='intSelect'></HyhtSelect>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="发送时间:">
                                <HyhtDateTime :modelHyhtDateTimeVal='datetimePick'></HyhtDateTime>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="人员名单:" class="el-form-item__contentOfTextarea">
                                <el-button @click="currentSelectPersonEvent" class="el-form-item__contentFormEditBtn" icon="el-icon-edit" circle></el-button>
                                <el-button @click="currentClearPersonEvent" class="el-form-item__formDeleteBtn" icon="el-icon-delete" circle></el-button>
                                <el-input class="textareaHeight" type="textarea" v-model="selectPersonList" placeholder="请选择人员名单"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="userCustomMobanPageContainer_selectMsgPerson__dialog">
            <el-dialog title="选择发送人员" :visible.sync="mPSelectDialog" width="90%" :before-close="handleCloseDialog">
                <div class="userCustomMobanPageContainer_selectMsgPersonDialog__btns">
                    <el-button @click="viewOnAffirmEvent">确 认</el-button>
                    <el-button @click="viewOnCancelEvent">取 消</el-button>
                </div>
                <div class="userCustomMobanPageContainer_selectMsgPersonDialog__body">
                    <div class="userCustomMobanPageContainer_selectMsgPersonDialog__bodyTitle">
                        选择发送人员
                    </div>
                    <div class="userCustomMobanPageContainer_selectMsgPersonDialog__bodyContent">
                        <el-form ref="ruleForm" label-width="120px" class="demo-ruleForm">
                            <el-form-item label="选择税务机关：">
                                <el-row>
                                    <el-col :span="10">
                                        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
                                        <el-tree 
                                            class="filter-tree" 
                                            :props="props"  
                                            node-key="taxCode"  
                                            default-expand-all
                                            :filter-node-method="filterNode" 
                                            ref="filterTree"
                                            :data="treeData"
                                            highlight-current  
                                            @node-click="treeClick">
                                        </el-tree>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-button 
                                            type="primary"
                                            :disabled="btnDisabled=='yes'?true:false"
                                            class="saveTreeLeafBtns" 
                                            @click="saveTreeLeafEvent()" 
                                            icon="el-icon-arrow-right" circle>
                                        </el-button>
                                    </el-col>
                                    <el-col :span="13">
                                    <el-transfer 
                                        v-model="selectedAccount" 
                                        filterable 
                                        :titles="['待选人员', '已选人员']" 
                                        :props="{key: 'userIdentityid', label: 'userName'}" 
                                        :data="selectData">
                                    </el-transfer>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
  </div>
</template>
<script>
import Tinymce from '../../../static/tinymce/index.vue';
import '../../../static/tinymce/tinymce/skins/lightgray/content.min.css'
import '../../../static/tinymce/tinymce/skins/lightgray/skin.min.css'
import HyhtInput from '../../components/allConditionmodel/HyhtInput'
import HyhtSelect from '../../components/allConditionmodel/HyhtSelect'
import HyhtDateTime from '../../components/allConditionmodel/HyhtDateTime'
export default {
    name: "userCustomMobanPage5",
    components:{
      HyhtInput,HyhtSelect,HyhtDateTime,Tinymce
  },
    props: {
      id: {
        type: String,
        default: 'tinymceEditor'
      },
      value: {
        type: String,
        default: ''
      },
      toolbar: {
        type: Array,
        required: false,
        default() {
          return ['removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code', 'bold italic blockquote | h2 p  media link | alignleft aligncenter alignright']
        }
      },
      data() {
        return {
          hasChange: false,
          hasInit: false
        }
      },
      menubar: {
        default: ''
      },
      height: {
        type: Number,
        required: false,
        default: 360
      }
    },
    watch: {
        filterText(val) {
            this.$refs.filterTree.filter(val);
        },
        value(val) {
            if (!this.hasChange && this.hasInit) {
            this.$nextTick(() => tinymce.get(this.id).setContent(val))
            }
        }
    },
    data() {
        return {
            conditionsForm:{},
            textarea:"", //文本域
            selectPersonList:"", //选择人员名单
            //输入框
            input:{modelValue:"121"},
            //下拉框
            intSelect:{
                modelValue:"1",
                selectOptions:[{
                    value: '1',
                    label: '紧急'
                }, {
                    value: '2',
                    label: '中等'
                }, {
                    value: '3',
                    label: '缓急'
                }
                ]
            },
            //日期时间选择器（含有时分秒）
            datetimePick:{
                modelValue:"2019-10-12 12:12:33"
            },
            filterText:"",
            selectData:[],
            selectedAccount: [],
            treeClickData:null,
            mPSelectDialog:false,
            props: {
                label: 'taxName',
                taxCode: 'taxCode',
                isLeaf: 'isLeaf'
            },
            treeData:[],
            btnDisabled:"yes"
        };
    },
    created() {
        var that = this;
    },
    mounted() {
        var that = this;
        that.tinymceInit(); //富文本初始化
        $(".textareaHeight .el-textarea__inner").css("height",90);

        // $(".userCustomMobanPage5").css("min-height",$("#app").height()-32);
        // $(".userCustomMobanPageContainer").css("min-height",$("#app").height()-32);
        // if ($("#app").height()-510<60) {
        // } else {
        //     $(".textareaHeight .el-textarea__inner").css("height",$("#app").height()-510);
        // }
        // if ($(".userCustomMobanPageContainer").height()<$("#app").height()-32) {
        //     $(".userCustomMobanPageContainer").css("height",$("#app").height()-32);
            
        // }
        
    },
    methods: {
        tinymceInit(){
            const that = this;
            console.log('tinymceInit', this)
            
            tinymce.init({
                selector: `#${this.id}`,
                height: this.height,
                body_class: 'panel-body ',
                object_resizing: false,
                language: 'zh_CN',
                language_url: '../../../static/tinymce/tinymce/langs/zh_CN.js',
                toolbar: this.toolbar,
                menubar: this.menubar,
                plugins: 'advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,media,wordcount, imagetools',
                end_container_on_empty_block: true,
                powerpaste_word_import: 'clean',
                code_dialog_height: 450,
                code_dialog_width: 1000,
                advlist_bullet_styles: 'square',
                advlist_number_styles: 'default',
                block_formats: '普通标签=p;小标题=h2;',
                imagetools_cors_hosts: ['wpimg.wallstcn.com', 'wallstreetcn.com'],
                imagetools_toolbar: 'watermark',
                default_link_target: '_blank',
                link_title: false,
                init_instance_callback: editor => {
                if (that.value) {
                    editor.setContent(that.value)
                }
                that.hasInit = true;
                editor.on('NodeChange Change KeyUp', () => {
                    this.hasChange = true;
                    this.$emit('input', editor.getContent({ format: 'raw' }));
                });
                },
                setup(editor) {
                editor.addButton('h2', {
                    title: '小标题', // tooltip text seen on mouseover
                    text: '小标题',
                    onclick() {
                    editor.execCommand('mceToggleFormat', false, 'h2');
                    },
                    onPostRender() {
                    const btn = this;
                    editor.on('init', () => {
                        editor.formatter.formatChanged('h2', state => {
                        btn.active(state);
                        });
                    });
                    }
                });
                editor.addButton('p', {
                    title: '正文',
                    text: '正文',
                    onclick() {
                    editor.execCommand('mceToggleFormat', false, 'p');
                    },
                    onPostRender() {
                    const btn = this;
                    editor.on('init', () => {
                        editor.formatter.formatChanged('p', state => {
                        btn.active(state);
                        });
                    });
                    }
                });
                }
            });
        },
        filterNode(value, data) {
            if(!value) return true;
            return data.taxName.indexOf(value) !== -1;
        },
        // 发送
        viewOnSendMessagesEvent(){
            var that = this;
            var conditionsForm = {
                input:that.input, //输入框
                intSelect:that.intSelect, //基础下拉框
                datetimePick:that.datetimePick, //日期时间选择器
            }
            that.conditionsForm = that.$mycommon.getcinditionForm(conditionsForm);
            that.conditionsForm.textarea = that.textarea, //文本域
            that.conditionsForm.selectPersonList = that.selectPersonList, //选择人员名单
            console.log("that.conditionsForm",that.conditionsForm)
        },
        // 取消
        viewOnCancelEvent(){
            var that = this;

        },
        // 选择人员弹窗
        currentSelectPersonEvent(){
            var that = this;
            that.mPSelectDialog = true;
            that.selectedAccount = [];
            that.treeData=[
                {
                    "id": "cbf367c8fc2f11e8a40568cc6ee12787",
                    "superiorTaxCode": "14400000000",
                    "taxCode": "14400000002",
                    "taxName": "国家税务总局广东省税务局办公室",
                    "children": [{
                        "id": "cbf367c8fc2f11e8a40568cc6ee12227",
                        "superiorTaxCode": "14400000001",
                        "taxCode": "14400000001",
                        "taxName": "国家税务总局广东省税务局办公处",
                    }]
                },
                {
                    "id": "cbf368d5fc2f11e8a40568cc6ee12787",
                    "superiorTaxCode": "14400000000",
                    "taxCode": "14400000005",
                    "taxName": "国家税务总局广东省税务局企业所得税处"
                },
                {
                    "id": "cbf36b88fc2f11e8a40568cc6ee12787",
                    "superiorTaxCode": "14400000000",
                    "taxCode": "14400000014",
                    "taxName": "国家税务总局广东省税务局巡察工作办公室"
                }
            ]

        },
        // 确认机构
        saveTreeLeafEvent(){
            var  that = this;
            if(that.treeClickData != undefined&&that.treeClickData != null&&that.treeClickData.taxCode != null) {
                let para = Object.assign({}, {taxCode: that.treeClickData.taxCode});
                that.selectData = [
                    {
                        "userIdentityid":"cbf36b88fc2f11e1140568cc6ee12787",
                        "userName":"张建"
                    },{
                        "userIdentityid":"eef36b88fc2f11e1140568cc6ee12787",
                        "userName":"张树杰"
                    },{
                        "userIdentityid":"c2f36b88fc2f11e1140568cc6ee12787",
                        "userName":"刘玉是"
                    },{
                        "userIdentityid":"eef36b887hhf11e1140568cc6ee12787",
                        "userName":"李贺拿"
                    },{
                        "userIdentityid":"c2f36b88fc2f00e1140568cc6ee12711",
                        "userName":"李玖哲"
                    },{
                        "userIdentityid":"eef36b88fc2f11e1140568cc6ee12722",
                        "userName":"ddd"
                    },{
                        "userIdentityid":"c2f36b88fc2f11e1140568cc6ee12744",
                        "userName":"展架"
                    },{
                        "userIdentityid":"eef36b887hhf11e1140568cc6ee12733",
                        "userName":"niubility"
                    },{
                        "userIdentityid":"c2f36b88fc2f00e1140568cc6ee12766",
                        "userName":"师德"
                    }
                ]
            //   that.$httpclient.get("/rest/account/list/all", para, function(res) {
            //     if(res.success) {
            //       that.data3 = res.data;
            //     } else {
            //       that.$message.error("查找人员失败" + res.errorMsg);
            //     }
            //   });
            }else{
            that.$message({
                message: '请选择税务机构',
                type: 'warning'
            });
            }
        },
        // 清空人员名单
        currentClearPersonEvent(){
            var that = this;
            that.$confirm('此操作将清空已选名单, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            that.selectPersonList = "";
            }).catch(() => {
            that.$message({
                type: 'info',
                message: '已取消操作'
            });          
            });
        },
        // 点击树节点
        treeClick(data) {
            var that = this;
            console.info(data);
            that.treeClickData = data;
            that.btnDisabled = "no";
        },
        // 确认人员名单弹窗
        viewOnAffirmEvent(){
            var that = this;
            that.mPSelectDialog = false;
            var selectedAccountNames = [];
            for (let i = 0; i < that.selectData.length; i++) {
                const ele1 = that.selectData[i];
                for (let j = 0; j < that.selectedAccount.length; j++) {
                    const ele2 = that.selectedAccount[j];
                    if (ele1.userIdentityid == ele2) {
                        selectedAccountNames.push(ele1.userName)
                    }
                }
            }
            if (selectedAccountNames.length>0) {
                that.selectPersonList = selectedAccountNames.join(" , ");
            }
        },
        // 取消人员名单弹窗
        viewOnCancelEvent(){
            var that = this;
            that.mPSelectDialog = false;

        },
        handleCloseDialog(done){
            var that = this;
            that.$confirm('确认关闭？','提示')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },

    }
};
</script>
