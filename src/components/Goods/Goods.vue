<template>
    <div class="goods">
        <!-- 左側菜單 -->
        <div class="menu-wrapper" ref="menuScroll">
            <ul>
                <!-- 專場 -->
                <li class="menu-item " :class="{'current':currentIndex===0}" @click="selectMenu(0)">
                    <p class="text">
                    <img :src="container.tag_icon" v-if="container.tag_icon"  class="icon">
                        {{container.tag_name}}
                        
                    </p>
                </li>
                <!-- 熱銷 -->
                <li class="menu-item" v-for="(item,index) in goods" :key="item.id" :class="{'current':currentIndex===index+1}" @click="selectMenu(index+1)">
                    <p class="text">
                        <img :src="item.icon" v-if="item.icon"  class="icon">
                        {{item.name}}
                        
                    </p>
                    <!-- 小圖樣顯示選購數量 -->
                    <i class="num" v-show="calculateCount(item.spus)">{{calculateCount(item.spus)}}</i>
                    
                </li>
            </ul>
        </div>
        <!-- 商品列表 -->
        <div class="foods-wrapper" ref="foodScroll">
            <ul>
                <!-- 專場 -->
                <li class="container-list food-list-hook" >
                    <div v-for="item in container.operation_source_list" :key="item.id"  >
                        <img :src="item.pic_url" >
                    </div>
                </li>
                <!-- 具體分類 -->
                <li v-for="item in goods" :key="item.id" class="food-list food-list-hook">
                    
                    <h3 class="title">{{item.name}}</h3>
                    <ul>
                        <!-- 具體商品列表 -->
                        <li v-for="food in item.spus" :key="food.id" class="food-item">
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
                            <div class="cartcontrol-wrapper">
                                <Cartcontrol :food='food'></Cartcontrol>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- :shipping_fee_tip="poiInfo.shipping_fee_tip" :min_price_tip="poiInfo.min_price_tip" -->
        <Shopcart :poiInfo="poiInfo" :selectFoods="selectFoods"></Shopcart>
    </div>
</template> 

<script>
    import BScroll from 'better-scroll'
    //導入購物車
    import Shopcart from 'components/Shopcart/Shopcart'
    import Cartcontrol from 'components/Cartcontrol/Cartcontrol'
    export default{
        components:{
            Shopcart,
            Cartcontrol
        },
        data(){
            return{
                container:{},
                goods:[],
                poiInfo:{},
                listHeight:[],
                scrollY:0,
                menuScroll:{},
                foodScroll:{}
            }
        },
        created() {
            let that = this;
            this.$axios.get('api/goods')
                .then(function(response){
                    var dataSource = response.data;
                    if(dataSource.data.code == 0){
                        that.container = dataSource.data.data.container_operation_source;
                        that.goods = dataSource.data.data.food_spu_tags;
                        that.poiInfo = dataSource.data.data.poi_info;
                        //觸發條件為dom的更新
                        that.$nextTick(()=>{
                            //DOM已經更新，可以執行BS初始化
                            that.initScroll();
                            
                            //計算分類區間的高度
                            that.calculateHeight();
                        })
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            // //第二種this 為 undefined的解決辦法:箭頭函式
            // this.$axios.get('api/goods')
            //     .then((res)=>{
            //         let dataSource = res.data;
            //         if(dataSource.data.code == 0){
            //             this.container = dataSource.data.data.container_operation_source;
            //             this.goods = dataSource.data.data.food_spu_tags;
            //             this.$nextTick(()=>{
            //                 this.initScroll();
            //             })
            //         }
                    
            //     })
        },
        methods:{
            head_bg(imgName){
                return "background-image: url(" + imgName + ");"
            },
            initScroll(){ //滾動初始化、計算高度
                        //ref屬性綁定某個DOM元素或者某個組件，然後在this.$refs裡面
                this.menuScroll = new BScroll(this.$refs.menuScroll, {
                    click:true
                });
                this.foodScroll = new BScroll(this.$refs.foodScroll, {
                    probeType:3,
                    click:true
                });
                //添加滾動監聽事件
                this.foodScroll.on('scroll',(pos)=>{
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            calculateHeight(){
                //通過$refs獲取對應元素 ， 總共有 1+9(專場+其他)
                let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
                //添加到陣列區間
                // 0~216 第一區間(專場) 217~1342第二區間(熱銷) ...
                let height = 0;
                this.listHeight.push(height);
                for(let i=0;i<foodlist.length;i++){
                    let item = foodlist[i];
                    
                    //累加
                    height += item.clientHeight;
                    
                    this.listHeight.push(height);
                }
            },
            selectMenu(index){
                let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
                let el = foodlist[index];
                this.foodScroll.scrollToElement(el,250);
            
            },
            calculateCount(spus){
                let count = 0;
                spus.forEach((food)=>{
                    if(food.count>0){
                        count += food.count;
                    }
                });
            return count;
            }
        },
        computed: {
			currentIndex() {	// 根據右側滾動位置 確定對應的索引下標
				for (let i=0; i<this.listHeight.length; i++) {
					// 獲取商品區間範圍
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
                        // console.log(height2);
                        // console.log(this.listHeight);
					// 是否在上述內容區間
					if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
                        console.log(i);
                        return i;
					}
				}
				return 0;
            },
            selectFoods(){
                let foods = [];
                this.goods.forEach((good)=>{
                    good.spus.forEach((food)=>{
                        if(food.count>0){
                            foods.push(food);
                        }
                    });
                });
                return foods;
            }
        }
    }
</script>


<style>
@import url(./Goods.css);
</style>
