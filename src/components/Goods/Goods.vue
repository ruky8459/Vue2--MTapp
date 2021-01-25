<template>
    <div class="goods">
        <!-- 左側菜單 -->
        <div class="menu-wrapper">
            <ul>
                <!-- 專場 -->
                <li class="menu-item">
                    <p class="text">
                        <img :src="container.tag_icon" v-if="container.tag_icon"  class="icon">
                        {{container.tag_name}}
                        
                    </p>
                </li>
                <!-- 熱銷 -->
                <li class="menu-item" v-for="item in goods" :key="item">
                    <p class="text">
                        <img :src="item.icon" v-if="item.icon"  class="icon">
                        {{item.name}}
                        
                    </p>
                </li>
            </ul>
        </div>
        <!-- 商品列表 -->
        <div class="foods-wrapper"></div>
    </div>
</template> 

<script>
    export default{
        data(){
            return{
                container:{},
                goods:[]
            }
        },
        created() {
            var that = this;

            this.$axios.get('api/goods')
                .then(function(response){
                    var dataSource = response.data;
                    if(dataSource.data.code == 0){
                        // console.log(dataSource.data);
                        that.container = dataSource.data.data.container_operation_source;
                        that.goods = dataSource.data.data.food_spu_tags;
                        // console.log(that.container);
                        // console.log(that.goods);
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
        }
    }
</script>


<style>
@import url(./Goods.css);
</style>
