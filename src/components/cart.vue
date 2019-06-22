<template>
    <div>
         <p>{{name}}</p>
         <!-- 购物车列表 -->
         <table border="1">
             <tr>
                 <th>#</th>
                 <th>课程名</th>
                 <th>单价</th>
                 <th>数量</th>
                 <th>价格</th>
             </tr>
             <tr v-for="(c,i) in cart" :key="c.id" :class="c.active?'active':''">
                 <td><input type="checkbox" v-model="c.active"></td>
                 <td>{{c.text}}</td>
                 <td>¥{{c.price}}</td>
                 <td>
                     <button @click="minus(i)">-</button>
                     {{c.count}}
                    <button @click="add(i)">+</button>
                 </td>
                 <td>¥{{c.price*c.count}}</td>
             </tr>
             <tr>
                 <td></td>
                 <td colspan="2">{{activeCount}}/{{count}}</td>
                 <td colspan="2">¥{{total}}</td>
             </tr>
         </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cart:JSON.parse(localStorage.getItem("cart")) || []
            }
        },
        props: {
            name:{ type: String, required: true}
        },
        watch: {
            cart: {
                handler(n){
                    localStorage.setItem("cart",JSON.stringify(n));
                },
                deep: true
            }
        },
        created() {
            // 监听y以下父组件添加商品事件
            this.$bus.$on('addcart',good=>{
                const ret = this.cart.find(v=>v.id === good.id);
                if(ret){
                    ret.count += 1
                }else{
                    this.cart.push({
                    ...good,
                    count: 1,
                    active: true
                    })
                }
            })
        },

        methods: {
            minus(i){
                const count = this.cart[i].count;
                if(count>1){
                    this.cart[i].count -=1
                }else{
                    this.remove(i)
                }
                
            },
            add(i){
                this.cart[i].count +=1
            },
            remove(i){
                if(window.confirm("确定删除？")){
                    this.cart.splice(i,1)
                }
            }
        },
        computed: {
            activeCount(){
                return this.cart.filter(v=>v.active).length
            },
            count(){
                return this.cart.length
            },
            total(){
                let num=0;
                this.cart.forEach(e => {
                    if(e.active){
                        num += e.price*e.count
                    }
                });
                return num
            }
        },  
    }
</script>

<style lang="css" scoped>
    .active{
        color: violet;
    }
</style>