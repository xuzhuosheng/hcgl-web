<template>
  <el-input class="HyhtInput" :disabled="disabledVal" v-model="inputValue.modelValue" placeholder="请输入内容" >
  </el-input>
</template>

<script>
export default {
  name: 'HyhtInput',
  components:{
  },
  props: {
    inputValue:Object,
    disabledVal:Boolean,
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

  }
}
</script>
