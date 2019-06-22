<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <form-test></form-test>
    <!-- cart -->
    <ul>
      <li v-for="(good,index) in goods" :key="good.id">
        <span>{{good.text}}</span>
        <span>¥{{good.price}}</span>
        <el-button type="primary" @click="addGood(index)">加购物车</el-button>
      </li>
    </ul>
    <cart :name="name" />
  </div>
</template>

<script>
import Cart from './components/cart'
import FormTest from './components/FormTest'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    Cart,
    FormTest
  },
  
  data() {
    return {
      name: "开课吧购物车",
      goods: []
    }
  },
  async created() {
    const response = await axios.get("/api/goods");
    
    console.log(response)
    this.goods = response.data.list;
  },
  methods: {
    addGood(i){
      const good = this.goods[i];
      this.$bus.$emit('addcart',good);
      
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
