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
                <li class="menu-item" v-for="item in goods" :key="item.id">
                    <p class="text">
                        <img :src="item.icon" v-if="item.icon"  class="icon">
                        {{item.name}}
                        
                    </p>
                </li>
            </ul>
        </div>
        <!-- 商品列表 -->
        <div class="foods-wrapper">
            <ul>
                <!-- 具體分類 -->
                <li v-for="item in goods" :key="item.id">
                    
                    <h3 class="title">{{item.name}}</h3>
                    <ul>
                        <!-- 具體商品列表 -->
                        <li v-for="food in item.spus" :key="food.id">
                            <div class="icon" :style="head_bg(food.picture)">

                            </div>
                            <div class="content">
                                <div class="name">{{food.name}}</div>
                                <div class="desc" v-if="food.description">{{food.description}}</div>
                                <div class="extra">
                                    <span class="saled">{{food.month_saled_content}}</span>
                                    <span class="praise">{{food.praise_content}}</span>
                                </div>
                                <img class="product" :src="food.product_label_picture" >
                                <p class="price">
                                    <span class="text">¥{{food.min_price}}</span>
                                    <span class="unit">/{{food.unit}}</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
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
        },
        methods:{
            head_bg(imgName){
                return "background-image: url(" + imgName + ");"
            }
        }
        // computed: { //計算屬性，不能傳遞參數
        //     head_bg() {
        //         return
        //     }
        // }
    }
</script>


<style>
@import url(./Goods.css);
</style>
