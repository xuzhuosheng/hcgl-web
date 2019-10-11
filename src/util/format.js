import moment from 'moment';
import Vue from 'vue';
Vue.filter('formatDatetime',(timeStamp,format) => {
    if (!Number(timeStamp)) {
        return timeStamp;
    } else {
        format = format || "YYYY-MM-DD HH:mm"
        return moment(timeStamp,'x').format(format);
    }
    
})
Vue.filter('formatDate',(timeStamp,format) => {
    if (!Number(timeStamp)) {
        return timeStamp;
    } else {
        format = format || "YYYY-MM-DD"
        return moment(timeStamp,'x').format(format);
    }
    
})
Vue.filter('formatunix',(timeStamp,format) => {
    if (!Number(timeStamp)) {
        return timeStamp;
    } else {
        format = format || "x"
        return moment(timeStamp,'YYYY-MM-DD').unix(format);
    }
    
})
module.exports = {
    getDate(timeStamp,format){
        format = format || 'YYYY/MM/DD'
        return moment(timeStamp).format(format)
    },
    // 获取到小时分钟
    getDatehour(timeStamp,format){
        format = format || 'YYYY/MM/DD HH:mm'
        return moment(timeStamp,'x').format(format);
    },
     // 获取日月
    getmonthDay(timeStamp,format){
        format = format || 'MM/DD'
        return moment(timeStamp,'x').format(format);
    },
}
