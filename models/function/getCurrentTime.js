const addZero = (num) => num >= 10 ? num : '0' + num;
module.exports = () => {
    const curTime = new Date(),         //当前时间  
        year = curTime.getFullYear() + '-',
        month = (curTime.getMonth() + 1) + '-',
        day = curTime.getDate() + ' ',
        hours = addZero(curTime.getHours()),
        minutes = addZero(curTime.getMinutes()),
        seconds = addZero(curTime.getSeconds());
    return year + month + day + hours + ':' + minutes + ':' + seconds;
};
