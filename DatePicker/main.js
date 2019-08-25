(function(){
    const datepicker = window.datepicker
    let monthData = null;
    let $wrapper = null;
    /**
     * 渲染数据
     */
    datepicker.buildUI = function (year, month) {
        monthData = datepicker.getMonthData(year, month);

        let html = '<div class="ui-datepicker-header">' +
            '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
            '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
            '<span class="ui-datepicker-current-month">'+ monthData.year +'-'+ monthData.month +'</span>' +
        '</div>' +
        '<div class="ui-datepicker-body">' +
            '<table>' +
                '<thead>' +
                    '<tr>' +
                        '<th>一</th>' +
                        '<th>二</th>' +
                        '<th>三</th>' +
                        '<th>四</th>' +
                        '<th>五</th>' +
                        '<th>六</th>' +
                        '<th>日</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>';
                    let date = null
                    for (let i = 0; i < monthData.days.length; i++) {
                        date = monthData.days[i]
                        if (i % 7 === 0) { // 一周的第一天
                            html += '<tr>'
                        }
                        html += '<td data-date="'+ date.date +'">' + date.showDate + '</td>';
                        if (i % 7 === 6) { // 一周的最后一天
                            html += '</tr>'
                        }
                    }
                    html += '</tbody>' +
            '</table>' +
        '</div>';
        return html;
    }

    datepicker.render = function(direction) {
        let year = null, month = null;
        if (monthData) {
            year = monthData.year;
            month = monthData.month;
        }

        if (direction === 'prev') month--;
        if (direction === 'next') month++;

        const html = datepicker.buildUI(year, month);
        if (!$wrapper) {
            // document.body.innerHTML = html
            // <div class="ui-datepicker-wrapper"></div>
            $wrapper = document.createElement('div');
            $wrapper.className = 'ui-datepicker-wrapper';
            document.body.appendChild($wrapper);
        }
        $wrapper.innerHTML = html;
        
    }
    
    /**
     * 初始化渲染
     */
    datepicker.init = function(input) {
        datepicker.render();
        document.body.appendChild($wrapper);

        let $input = document.querySelector(input);
        var isOpen = false;
        
        /**
         * 关闭日历
         */
        function close() {
            $wrapper.classList.remove('ui-datepicker-wrapper-show');
            isOpen = false;
        }

        /**
         * 聚焦输入框弹出隐藏日历
         */
        $input.addEventListener('focus', function() {
            if (isOpen) {
                close()
            } else {
                $wrapper.classList.add('ui-datepicker-wrapper-show');
                
                // 计算定位位置
                let left = $input.offsetLeft;
                let top = $input.offsetTop;
                let height = $input.offsetHeight;
                $wrapper.style.top = top + height + 2 + 'px';
                $wrapper.style.left = left + 'px';

                isOpen = true;
            }
        }, false);

        /**
         * 切换月份
         */
        $wrapper.addEventListener('click', function (e) {
            const $target = e.target;
            if (!$target.classList.contains('ui-datepicker-btn')) {
                return;
            }

            // 上一月
            if ($target.classList.contains('ui-datepicker-prev-btn')) {
                datepicker.render('prev');
            }

            // 下一月
            if ($target.classList.contains('ui-datepicker-next-btn')) {
                datepicker.render('next');
            }
        }, false);

        /**
         * 点击日期
         */
        $wrapper.addEventListener('click', function(e) {
            const $target = e.target;
            if ($target.tagName.toLowerCase() !== 'td') return;

            let date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
            $input.value = formart(date);
            close();
        }, false);
    }

    /**
     * 格式化日期
     */ 
    function formart(date) {
        let ret = ''

        let padding = function (n) {
            if (n <=9 ) return '0' + n;
            return n;
        }

        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth() + 1) + '-';
        ret += padding(date.getDate());
        return ret;
    }
})();