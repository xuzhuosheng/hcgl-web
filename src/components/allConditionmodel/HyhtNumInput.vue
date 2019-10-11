<template>
  <el-input class="HyhtInput" :disabled="disabledVal" v-model="inputValue.modelValue" placeholder="请输入内容" >
  </el-input>
</template>

<script>
export default {
  name: 'HyhtNumInput',
  components:{
  },
  props: {
    inputValue:Object,
    disabledVal:Boolean,
},
  watch:{
    'inputValue.modelValue':function (curVal,oldVal) {
      if (!curVal){
        this.inputValue.modelValue = '';
        return false
      }
      //实时把非数字的输入过滤掉
      this.inputValue.modelValue = curVal.match(/\d/ig) ? curVal.match(/\d/ig).join('') : ''

    }

  },
  data () {
    return{
      sdasd:""
    }

  },
  created(){

  },
  mounted() {
  },
  methods: {

  },

}
</script>
