<template>

   <el-select @change="selectChange" :disabled="disabledVal" v-model="modelSelectValue.modelValue" placeholder="请选择" clearable>
    <el-option v-for="item in modelSelectValue.selectOptions" :key="item.value"
      :label="modelSelectValue.selectProps?item[modelSelectValue.selectProps.label]:item.label" 
      :value="modelSelectValue.selectProps?item[modelSelectValue.selectProps.value]:item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'HyhtSelect',
  components:{
  },
  props: {
    modelSelectValue:Object,
    disabledVal:Boolean,
    // changeEven:Function
  },
  data () {
    return{

     
    }
  },
  created(){
   
  },
  mounted() {
   
  },
  methods: {

    selectChange(value){
      //把 当前选择的值 发射给父组件
      this.$emit('change-event',value)
    }


  }
}
</script>
