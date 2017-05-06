<template>
 <div>
    <h1>I am apple</h1>
    <button @click="addOne">add one</button>
    <button @click="minusOne">minus one</button>
 </div>
</template>

<script>
export default {
    data() {
        return {
            price: 50
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