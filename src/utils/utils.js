export let getChaintime = (utctime) => {
    
    let date = (typeof utctime=='string' ?new Date(utctime) : utctime)
     // 补0函数
     function getnum(num) {
        return num < 10 ? '0' + num : num
    }
    return date.getFullYear() + '-' + getnum((date.getMonth() + 1)) + '-' + getnum(date.getDate()) + ' ' + getnum(date.getHours()) + ":" + getnum(date.getMinutes()) + ":" + getnum(date.getSeconds())
}