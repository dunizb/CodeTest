<template>
 <div>
    <h3>我是一个苹果</h3>
    <button @click="addOne">添加苹果(+35.99)</button>
    <button @click="minusOne">移除苹果(-35.99)</button>
 </div>
</template>

<script>
export default {
    data() {
        return {
            price: 35.99
        }
    },
    methods: {
        addOne() {
            this.$store.dispatch('increase', this.price);
        },
        minusOne() {
            this.$store.commit('decrement', this.price);
        }
    }
}   
</script>

<style>
    
</style>