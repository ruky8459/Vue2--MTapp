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
            <div class="pic" v-if="info.poi_env" >
                <div class="pic_all" v-for="item in info.poi_env.thumbnails_url_list" :key="item.id">
                    <img :src="item">
                </div>
            </div>
            <div class="security">
                <div class="badge"><img src="./safety.png"></div>
                <p>查看食品安全檔案</p>
                <div class="icon-keyboard_arrow_right arrow"></div>
            </div>
        </div>
        <Split></Split>


    </div>
</template>


<script>
import Split from "components/Split/Split";

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
                }
            })
        },
        components:{
            Split
        }
    }
</script>


<style>
@import url("./Seller.css");


</style>
