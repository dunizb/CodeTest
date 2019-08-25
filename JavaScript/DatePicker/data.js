(function(){
    const datepicker = {}
    datepicker.getMonthData = function (year, month) {
        let ret = [];
        if (!year || !month) {
            let today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }
        // 当月的第一天
        let firstDay = new Date(year, month - 1, 1)
        // 当月第一天是星期几
        let firstDayWeekDay = firstDay.getDay();
        if (firstDayWeekDay === 0) firstDayWeekDay = 7;

        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        // 上一个月的最后一天
        let lastDayOfLastMonth = new Date(year, month - 1, 0);
        // 上一个月的最后一天的日期
        let lastDateOfLastMonth = lastDayOfLastMonth.getDate();

        // 在日历的第一行需要显示多少个上一个月的日期
        let preMonthDayCount = firstDayWeekDay - 1;
        // 本月最后一天
        let lastDay = new Date(year, month, 0);
        let lastDate = lastDay.getDate();

        for (let i = 0; i < 7 * 6; i++){
            let date = i + 1 - preMonthDayCount;
            let showDate = date;
            let thisMonth = month;
            if (date <= 0) {
                // 上一月
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            } else if(date > lastDate) {
                // 下一月
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }

            if (thisMonth === 0) thisMonth = 12; // 上一年的12月份
            if (thisMonth === 13) thisMonth = 1; // 下一年的1月份

            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate,
            })
        }
        return {
            year: year,
            month: month,
            days: ret
        };
    }

    window.datepicker = datepicker
})();