<template>
  <el-switch
    :disabled="disabledVal"
    v-model="switchValue.modelValue"

  active-color="#409eff"
  inactive-color="#dcdfe6"

  >
  </el-switch>

</template>

<script>
export default {
  name: 'HyhtSwitch',
  components:{
  },
  props: {
    switchValue:Object,
    disabledVal:Boolean,
    activeColor:String,
    inactiveColor:String
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
