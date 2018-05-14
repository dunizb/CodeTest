Vue.component('input-number', {
    template: '\
        <div class="input-number">\
            <input type="text" :value="currentValue" @change="handleChange">\
            <button @click="handleUp" :disabled="currentValue <= min">-</button>\
            <button @click="handleDown" :disabled="currentValue >= max">+</button>\
        </div>\
    ',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function(){
        return {
            currentValue: this.value
        }
    },
    watch: {
        currentValue(val) {
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        value(val) {
            this.updateValue(val);
        }
    },
    methods: {
        updateValue: function(val) {
            if(val > this.max) val = this.max;
            if(val < this.min) val = this.min;
            this.currentValue = val;
        },
        handleChange(event) {
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;

            if(isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;

                if(val > max) {
                    this.currentValue = max;
                } else if(val < min) {
                    this.currentValue = min;
                }
            } else {
                event.target.value = this.currentValue;
            }
        },
        handleDown() {
            if(this.currentValue >= this.max) return;
            this.currentValue += 1;
        },
        handleUp() {
            if(this.currentValue <= this.min) return;
            this.currentValue -= 1;
        }
    },
    mounted: function() {
        this.updateValue(this.value);
    }
});
