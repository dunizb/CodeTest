const Utils = {
    strings: {
        /**
         * 判断一个单词是否是回文
         * @param {String} str 
         * @return {Boolean}
         */
        checkPalindrom: function (str) {
            if (!str) return
            return str == str.split('').reverse().join('')
        },
        /**
         * 统计一个字符串出现最多的字母
         * @param {String} str 
         * @return {Object} 出现最多的字符和出现的次数
         */
        findMaxDuplicateChar: function (str) {
            if (!str) return
            if (str.length === 1) return str
            const charObj = {}
            for (let i = 0; i < str.length; i++) {
                if (!charObj[str.charAt(i)]) {
                    charObj[str.charAt(i)] = 1
                } else {
                    charObj[str.charAt(i)] += 1
                }
            }
            let maxChar = '', maxValue = 1
            for (let k in charObj) {
                if (charObj[k] > maxValue) {
                    maxChar = k
                    maxValue = charObj[k]
                }
            }
            return {
                value: maxChar,
                count: maxValue
            }
        },
        /**
         * 随机生成指定长度的字符串
         * @param {Number} n 指定长度
         * @param {Boolean} upper 是否大写，默认小写
         * @return {String} 指定长度的字符串
         */
        randomString: function (n, upper = false) {
            let str = 'abcdefghijklmnopqrstuvwxyz9876543210'
            let temp = '',
                i = 0,
                l = str.length
            for (let i = 0; i < n; i++) {
                temp += str.charAt(Math.floor(Math.random() * l))
            }
            return upper ? temp.toUpperCase() : temp
        }
    },
    arrays: {
        /**
         * 数组去重(双重循环)
         * @param {Array} array 
         * @return {Array} 去重后的数组
         */
        unique: function (array) {
            if (!Array.isArray(array)) {
                throw TypeError('参数不是一个数组')
            }
            const newArray = []
            let isRepeat
            for (let i = 0; i < array.length; i++) {
                isRepeat = false
                for (let j = 0; j < newArray.length; j++) {
                    if (array[i] === newArray[j]) {
                        isRepeat = true
                        break
                    }
                }
                if (!isRepeat) newArray.push(array[i])
            }
            return newArray
        },
        /**
         * 数组去重(ES6语法)
         * @param {Array} array 
         * @return {Array} 去重后的数组
         */
        uniquees6: function (array) {
            if (!Array.isArray(array)) {
                throw TypeError('参数不是一个数组')
            }
            return [...new Set(array)]
        },
        /**
         * 冒泡排序
         * @param {Array} array 排序前的数组
         * @return {Array} array 排序后的数组
         */
        bubbleSort (array) {
            if (!Array.isArray(array)) {
                throw TypeError('参数不是一个数组')
            }
            // let len = array.length
            // for (let i = 0; i < len; i++) {
            //     for (let j = 0; j < len - 1 - i; j++ ) {
            //         if (array[j] > array[j + 1]) { // 相邻元素两两对比
            //             let temp = array[j + 1] // 元素交换
            //             array[j + 1] = array[j]
            //             array[j] = temp
            //         }
            //     }
            // }
            // return array
            // 高性能写法
            let i = array.length - 1
            while (i > 0) {
                let pos= 0 //每趟开始时,无记录交换
                for (let j = 0; j < i; j++) {
                    if (array[j] > array[j + 1]) {
                        pos= j; //记录交换的位置
                        let temp = array[j]
                        array[j] = array[j + 1]
                        array[j + 1] = temp
                    }
                }
                i = pos;  //为下一趟排序作准备
            }
            return array
        },
        /**
         * 快速排序
         * @param {Array} array 排序前的数组
         * @return {Array} array 排序后的数组
         */
        quickSort (array) {
            if (!Array.isArray(array)) {
                throw TypeError('参数不是一个数组')
            }
            // 当被分的数组只剩一个时，退出递归
            if (array.length <= 1) {
                return array
            }
            // 中间基准值的index
            let pivotIndex = Math.floor(array.length / 2)
            let pivot = array.splice(pivotIndex, 1)[0]
            let left = []
            let right = []
            // 小的放左边，大的放右边
            for (let i = 0; i < array.length; i++) {
                if (array[i] < pivot) {
                    left.push(array[i])
                } else {
                    right.push(array[i])
                }
            }
            // 递归
            // 把数组合并在一起
            return this.quickSort(left).concat([pivot], this.quickSort(right))
        }
    }
}