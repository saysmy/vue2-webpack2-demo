<!-- 简单写个title和一个循环 -->
<template>
    <div id="example">
        <h1>{{ msg }}</h1>
        <ul>
            <li v-for="n in 5">{{ n }}</li>
        </ul>
    </div>
</template>

<script>
 export default {
    data () {
        return {
            msg: 'Hello World browser-sync!'
        }
    }
}
</script>

<style scoped>
 #example {
    background: #000;
    color:#fff;
    height: 50vh;
    display: flex;
    transform: scale(0.5);
};
</style>