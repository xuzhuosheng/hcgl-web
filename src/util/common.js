/**
 * Created by xiaokun on 2019/1/15.
 */
import moment from 'moment'

export default {
  //组装条件组件的组成的表单值
  getcinditionForm(data) {
    var retureObj = {}
    for (let key in data) {
      retureObj[key] = data[key].modelValue ? data[key].modelValue : ""
    }
    return retureObj
  },

  //获取表单值
  getFormVal(data) {
    var obj = {};
    for (let key in data) {
      obj[key] = data[key].modelValue ? data[key].modelValue : ''
    }
    return obj
  },

  // 获取当前时间
  getNewFormatDate() {
    var date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      strDate = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds(),
      seperator1 = '-',
      seperator2 = ':';
    if (month >= 1 && month <= 9) {
      month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate;
    }
    if (hour >= 0 && hour <= 9) {
      hour = '0' + hour;
    }
    if (second >= 0 && second <= 9) {
      second = '0' + second
    }
    var currentDate = year + seperator1 + month + seperator1 + strDate + ' ' + hour + seperator2 + minute;
    return currentDate;
  },


  // 初始化下拉选项
  initOpt(selData) {

    var opts = [];
    selData.map(item => {
      var opt = {value: item.id, label: item.name};
      opts.push(opt);
    });
    return opts;
  },

  /**
   * 添加品牌下拉项
   * @param curSelOptId 当前选择的类型
   * @param curTypes 当前所用类型数组
   * @param initF 需添加品牌下拉的表单
   * @param curBrands 当前类型下的品牌
   */
  pushBrandOpt(curSelOptId, curTypes, initF, curBrands) {

    var checkedType = curTypes.filter(item => item.id === curSelOptId);

    initF.brand.selectOptions.length = 0;

    if (initF.model.hasOwnProperty('selectOptions')) {
      initF.model.selectOptions.length = 0;
    }


    //当前类型下的品牌
    curBrands = checkedType[0].brand;

    //给品牌添加下拉项
    initF.brand.selectOptions = this.initOpt(curBrands);

    return curBrands
  },
  /**
   * 给类型添加下拉项
   * @param curSelOptId 当前选择的品牌
   * @param curBrans 当前类型下的品牌
   * @param initF 需添加型号下拉的表单
   */
  pushModelOpt(curSelOptId, curBrands, initF) {

    var checkedBrand = curBrands.filter(item => item.id === curSelOptId);

    initF.model.selectOptions.length = 0;

    //给类型添加下拉项
    initF.model.selectOptions = this.initOpt(checkedBrand[0].model);

  },

  // 时间格式
  format(date, fmt) {
    let o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "H+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },



}
