<template>
    <div class="header">
        <!-- 頂部通欄 -->
        <div class="top-wrapper">
            <div class="back-wrapper">
                <span class="icon-arrow_lift"></span>
            </div>

            <form class="search-wrapper">
                <span class="search-icon"></span>
                <input type="text" class="search-bar" placeholder="搜索店內商品">
            </form>
            
            <div class="more-wrapper">
                <a href="#" class="spelling-bt">拼單</a>
                <div class="more-bt">
                    <i class="s-radius"></i>
                    <i class="s-radius"></i>
                    <i class="s-radius"></i>
                </div>
            </div>
        </div>
        <!-- 主體內容 -->
        <div class="content-wrapper">
            <div class="icon" :style="head_bg"><!--商家頭像-->
                <!-- <img :src="poiInfo.pic_url"> -->
            </div>
            <div class="name"><!--商家名稱-->
                <h3>{{poiInfo.name}}</h3>
            </div>
            <div class="collect">
                <img src="./star.png">
                <span>收藏</span>
            </div>
        </div>
        <!-- 公告 -->
        <div class="bulletin-wrapper" v-if="poiInfo.discounts2" @click="showBulletin">
            <img class="icon"  :src="poiInfo.discounts2[0].icon_url" >
            <span class="text">{{poiInfo.discounts2[0].info}}</span>
            <div class="detail">
                {{poiInfo.discounts2.length}}個活動
                <span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <!-- 公告詳情 -->
        <transition name="detail">
        <div class="bulletin-detail" v-show="isShow">
            <div class="detail-wrapper">
                <div class="main-wrapper" :style="detail_bg">
                    <div class="icon" :style="head_bg" ></div>
                    <h3 class="name">{{poiInfo.name}}</h3>
                    <!-- 評價星星  -->
                    <div class="score">
                        <Star :score="poiInfo.wm_poi_score"> </Star>
                        <span>{{poiInfo.wm_poi_score}}</span>
                    </div>
                    <!-- 起送配送時段費用資訊 -->
                    <p class="tip">
                        {{poiInfo.min_price_tip}} <i>|</i>
                        {{poiInfo.shipping_fee_tip}}<i>|</i>
                        {{poiInfo.delivery_time_tip}}
                    </p>
                    <p class="time">
                        配送時間:{{poiInfo.shipping_time}}
                    </p>
                    <div class="discounts" v-if="poiInfo.discounts2">
                            <!-- 當前專案是只有一個折價訊息，多個改用vfor -->
                        <p>
                            <img :src="poiInfo.discounts2[0].icon_url" >
                            <span>{{poiInfo.discounts2[0].info}}</span>
                        </p>
                    </div>
                    
                </div>
                <div class="close-wrapper">
                    <span class="icon-close" @click="closeBulletin"></span>
                </div>
            </div>
        </div>
        </transition>
        <!-- 背景 -->
        <div class="bg-wrapper" :style="content_bg">
            <!-- <img :src="poiInfo.head_pic_url" /> -->
        </div>
    </div>
</template>
<script>
    //import Star from '../Star/Star'<原先的相對路徑，如果覺得算返回幾層很麻煩，可以到webpack.base設置絕對路徑的縮寫
    import Star from 'components/Star/Star'
    export default{
        data() {
            return {
                isShow : false
            }
        },
        components:{
            Star
        },
        props: {    //組件傳值
            poiInfo:{ 
                type: Object,
                default: {}
            }
        },
        computed:{ //計算屬性，類似data:多個計算功能
            content_bg(){
                return "background-image: url(" + this.poiInfo.head_pic_url + ");"
            },
            head_bg(){
                return "background-image: url(" + this.poiInfo.pic_url + ");"
            },
            detail_bg(){
                return "background-image: url(" + this.poiInfo.poi_back_pic_url + ");"
            }
        },
        methods: {
            showBulletin(){
                this.isShow = true;
            },
            closeBulletin(){
                this.isShow = false;
            }
        }
    } 
</script>
<style>
/* 導入字體圖標 */
@import url("../../common/styles/icon.css");
/* *{
    max-width:420px;
} */
.header{
    height: 160px;
    padding-top: 20px;
}
.header .top-wrapper{
    position: relative;
}
.header .top-wrapper .back-wrapper{
    width: 50px;
    height: 31px;
    /* background: red; */
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    line-height: 31px;
}
.header .top-wrapper .back-wrapper span{
    display: inline-block;/*span不支持 text-align 、line-height， 改成inline-block就可以了*/
    color: white;
}
.header .top-wrapper .search-wrapper{
    width: 100%;
    height: 31px;
    /* background: purple; */
    padding: 0 104px 0 50px;
    /* 原先border/padding都會增加元素的尺寸，透過box-sizing:border-box這個元素的內距和邊框將不會增加元素本身的寬度。 */
    box-sizing: border-box;

}
.header .top-wrapper .search-wrapper .search-icon{
    width: 28px;
    height: 31px;
    /* 了解一下 */
    background: url(./titans_h5_search@2x.png)no-repeat 11px center;
    background-size: 13px 13px;
    position: absolute;
}
.header .top-wrapper .search-wrapper .search-bar{
    width: 100%;
    height: 31px;
    box-sizing: border-box;
    background: #cdcdcc;
    border-radius: 25px;
    /* 去除邊框及選中邊框 */
    border-style:none;
    outline: none;
    padding-left: 28px;
}
.header .top-wrapper .more-wrapper{
    /* width: 104px; 加了padding之後要扣回來*/
    /* height: 31px; */
    width: 65px;
    height: 24px;
    /* background: blue; */
    position: absolute;
    right: 0;
    top: 0;
    padding:7px 15px 0 24px;

}
.header .top-wrapper .more-wrapper .spelling-bt{
    width: 30px;
    height: 17px;
    border: 1px solid white;
    line-height: 17px;
    text-align: center;
    float: left;
    /* a標籤去底線 */
    text-decoration: none;
    font-size: 10px;
    color: white;
}
.header .top-wrapper .more-wrapper .more-bt{
    float: right;
    width: 20px;
    height: 24px;
    margin-left: 13px;
    margin-top: 6px;

}
.header .top-wrapper .more-wrapper .more-bt .s-radius{
    width: 3px;
    height: 3px;
    border-radius: 50%;
    border:1px solid white;
    display: block;
    float: left;
    margin-right: 1px;
}
/* 主要內容 */
.content-wrapper{
    height: 50px;
    padding: 17px 10px 11px;
}
.content-wrapper .icon{
    width: 50px;
    height: 50px;
    background-size: 135% 100%;
    background-position: center;
    border-radius: 5px;
    float: left;
}
.content-wrapper .name{
    float: left;
    padding: 18px 0 0 12px;
    
}
.content-wrapper .name h3{
    font-size: 16px;
    font-weight: bold;
    color: white;
}
.content-wrapper .collect{
    width: 25px;
    height: 37px;
    float: right;
    text-align: center;
    padding-top: 6px;
}
.content-wrapper .collect img{
    width: 20px;
    height: 20px;
}
.content-wrapper .collect span{
    margin-top: 7px;
    color: white;
    font-size: 11px;
}
/* 公告內容 */
.bulletin-wrapper{
    height: 16px;
    padding: 0 10px;
}
.bulletin-wrapper .icon{
    width: 16px;
    height: 16px;
    float: left;
    margin-right: 6px;
}
.bulletin-wrapper .text{
    color: white;
    font-size: 11px;
    float: left;
    line-height: 16px;
}
.bulletin-wrapper .detail{
    color: white;
    float: right;
    font-size: 11px;
    line-height: 16px;
}
.bulletin-wrapper span{
    font-size: 16px;
    line-height: 16px;
    float: right;
}

/* 背景 */
.header .bg-wrapper{
    width: 100%;
    height: 150px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    background-size: 100% 135%;
    background-position: center -12px;
}
/* 公告詳情 :彈出視窗 */
.header .bulletin-detail{
    width: 100%;
    height: 100%;
    /* 在header做出一個全螢幕的內容，就利用absolute因為header沒訂位所以會往上找依據body去判斷100%的寬高 */
    position: absolute;
    top: 0;
    left: 0;
    /* 做出一個遮罩色 */
    background-color: rgba(98, 98, 98, 0.8);
    z-index: 999;
}
.header .bulletin-detail .detail-wrapper{
    width: 100%;
    height: 100%;
    padding: 43px 20px 125px;
    box-sizing: border-box;
}
.header .bulletin-detail .detail-wrapper .main-wrapper{
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    border-radius: 10px;
    text-align: center;
}
.header .bulletin-detail .detail-wrapper .main-wrapper .icon{
    width: 60px;
    height: 60px;
    background-size: 135% 100%;
    background-position: center;
    border-radius: 5px;
    display: inline-block;
    margin-top: 40px;
}
.header .bulletin-detail .detail-wrapper .main-wrapper .name{
    font-size: 15px;
    color: white;
    margin-top: 13px;
}
.header .bulletin-detail .detail-wrapper .main-wrapper .score{
    height: 10px;
    margin-top: 6px;
    text-align: center;
    font-size: 0;
}.header .bulletin-detail .detail-wrapper .main-wrapper .score .star{
    display: inline-block;
    margin-right: 7px;
}
.header .bulletin-detail .detail-wrapper .main-wrapper .score span{
    display: inline-block;
    font-size: 10px;
    color: white;
}
.header .bulletin-detail .detail-wrapper .main-wrapper .tip{
    font-size: 11px;
    color: #bababc;
    margin-top: 8px;
}
.header .bulletin-detail .detail-wrapper .main-wrapper i{
    margin: 0 7px;
}
.header .bulletin-detail .detail-wrapper .main-wrapper .time{
    font-size: 11px;
    color: #bababc;
    margin-top: 13px;
}
.header .bulletin-detail .detail-wrapper .main-wrapper .discounts{
    margin-top: 20px;
    padding: 0 20px;
}
.header .bulletin-detail .detail-wrapper .main-wrapper .discounts p{
    padding-top: 20px;
    border-top: 1px solid #bababc;
}
.header .bulletin-detail .detail-wrapper .main-wrapper .discounts img{
    width: 16px;
    height: 16px;
    vertical-align: middle;
}
.header .bulletin-detail .detail-wrapper .main-wrapper .discounts span{
    font-size: 11px;
    line-height: 16px;
    color: white;
}
/* 關閉紐 */
.header .bulletin-detail .detail-wrapper .close-wrapper{
    padding: 20px;
    height: 40px;
    text-align: center;
}
.header .bulletin-detail .detail-wrapper .close-wrapper span{
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    font-size: 25px;
    color: white;
    display: inline-block;
    background: rgba(188,188,188,0.7);
    border: 1px solid rgba(140, 140, 140, 0.9);
}
/* Vue過度效果
<transition name="detail"><transition>
進入
.xxx-enter 過度開始的狀態
.xxx-enter-to 過度開始的狀態
.xxx-enter-active 時間、延遲、曲線函數
離開
.xxx-leave
.xxx-leave-to
.xxx-leave-active
*/
.detail-enter-active,.detail-leave-active{
    transition: .8s all;
}
.detail-enter,.detail-leave-to{
    opacity: 0;
}
.detail-enter-to,.detail-leave{
    opacity: 1;
}
</style>
