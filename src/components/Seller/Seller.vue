<template>
    <div class="seller">
        <Split></Split>
        <div class="seller-top">
            <div class="addressAndPhone">
                <div class="location"><img src="./address.png"></div>
                <div class="address">
                {{info.address}}
                </div>
                <div class="phone"><img src="./phone.png"></div>
            </div>

            <div class="pic" v-if="info.poi_env" ref="picView">
                <div class="picContainer" ref="picList">
                    <div class="pic_all" v-for="item in info.poi_env.thumbnails_url_list" :key="item.id" ref="picItem">
                        <img :src="item">
                    </div>
                </div>
            </div>
            
            <div class="security">
                <div class="badge"><img src="./safety.png"></div>
                <p>查看食品安全檔案</p>
                <div class="icon-keyboard_arrow_right arrow"></div>
            </div>
        </div>
        <Split></Split>
        <div class="seller-mid">
            <div class="deliver">
                <img src="./delivery.png" alt="文件圖標">
                <p>配送服務: {{info.app_delivery_tip}}</p>
                
            </div>
            <div class="time">
                <img src="./time.png" alt="時鐘圖標">
                <p>配送時間: {{info.shipping_time}}</p>
            </div>
        </div>
        <Split></Split>
        <div class="seller-bot">
            <div class="serve" v-if="info.poi_service">
                <img src="./server.png" alt="打勾圖標">
                <p>商家服務</p>
                <div class="sub">
                    <img :src="info.poi_service[0].icon" alt="發票圖標">
                    <p >{{info.poi_service[0].content}}</p>
                </div>
            </div>
            <div class="discount" v-for="item in info.discounts2" :key="item.id">
                <img :src="item.icon_url" alt="促銷圖標">
                <p >{{item.info}}</p>
            </div>
            
        </div>
        <Split class="fill_rest_space"></Split>
        



    </div>
</template>


<script>
import Split from "components/Split/Split";
import BScroll from 'better-scroll';

    export default{
        data(){
            return {
                info: {}
            }
        },
        created(){
            let that = this;

            this.$axios.get('api/seller').then(function(response){
                let dataSource = response.data;
                if (dataSource.data.code == 0){
                    that.info = dataSource.data.data

                    that.$nextTick(()=>{
                        if(that.info.poi_env.thumbnails_url_list){
                            let imgW = that.$refs.picItem[0].clientWidth;
                            let marginR = 1;
                            let width = (imgW + marginR) * that.info.poi_env.thumbnails_url_list.length;

                            that.$refs.picList.style.width = width +'px';
                            that.scroll = new BScroll(that.$refs.picView,{
                                scrollX:true
                            });
                        }
                    })
                }
            })
        },
        components:{
            Split,
            BScroll
        }
    }
</script>


<style>
@import url("./Seller.css");


</style>
