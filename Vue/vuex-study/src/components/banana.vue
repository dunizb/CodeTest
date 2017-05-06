<template>
 <div>
    <h3>我是一个香蕉</h3>
    <button @click="addOne">添加香蕉(+15)</button>
    <button @click="minusOne">移除香蕉(-15)</button>
 </div>
</template>

<script>
export default {
    data() {
        return {
            price: 5
        }
    },
    methods: {
        addOne() {
            this.$store.commit('increment', this.price);
        },
        minusOne() {
            this.$store.commit('decrement', this.price);
        }
    }
}   
</script>

<style>
    
</style>