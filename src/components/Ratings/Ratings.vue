<template>
<div class="ratings-wrapper" ref="rtScroll">
    <div class="ratings">
        <div class="overview">
            <div class="overview-left">
                <div class="score">
                    {{ ratings.comment_score }}
                </div>
                <p>商家評分</p>
            </div>
            <div class="overview-mid">
                <div class="favor">
                    <span>口味</span><Star :score="ratings.quality_score"></Star
                    ><p>{{ ratings.quality_score }}</p>
                </div>
                <div class="pack">
                    <span>包裝</span><Star :score="ratings.pack_score"></Star
                    ><p>{{ ratings.pack_score }}</p>
                </div>
            </div>
            <div class="overview-right">
                <div class="score">
                    {{ ratings.delivery_score }}
                </div>
                <p>配送評分</p>
            </div>
        </div>
        <Split></Split>
        <div class="content">
            <div class="rating-select" v-if="ratings.tab">
                <span class="item" @click="selectTypeFn(2)" :class="{'active' :selectType == 2}">
                    {{ratings.tab[0].comment_score_title}}
                </span>
                <span class="item" @click="selectTypeFn(1)" :class="{'active' :selectType == 1}">
                    {{ratings.tab[1].comment_score_title}}
                </span>
                <span class="item" @click="selectTypeFn(0)" :class="{'active' :selectType == 0}">
                    <img src="./icon_sub_tab_dp_normal@2x.png" v-show="selectType != 0" />
                    <img src="./icon_sub_tab_dp_highlighted@2x.png" v-show="selectType == 0" />
                    {{ratings.tab[2].comment_score_title}}
                </span>
            </div>
            <div class="label-view" >
                <span v-if="ratings.comment_score_type_infos">
                    {{ratings.comment_score_type_infos[0].comment_score_title}}
                    {{ratings.comment_score_type_infos[0].total_count}}
                </span>
                <span v-if="ratings.comment_score_type_infos">
                    {{ratings.comment_score_type_infos[1].comment_score_title}}
                    {{ratings.comment_score_type_infos[1].total_count}}
                </span>
                
                <span v-for="labelItem in ratings.labels" :key="labelItem.id" class="item" :class="{'mark' :labelItem.label_star <= 0 }">
                    {{labelItem.content}}{{labelItem.label_count}}
                </span>
            </div>
            <ul class="rating-list">
                <li v-for="comment in selectComment" :key="comment.id" class="rating-comment">
                    <div class="comment-header">
                        <img :src="comment.user_pic_url" v-if="comment.user_pic_url" />
                        <img src="./anonymity.png" v-if="!comment.user_pic_url" >
                    </div>
                    <div class="comment-main">
                        <div class="top-container">
                            <div class="user">
                                {{ comment.user_name }}
                            </div>
                            <div class="time">
                                {{ formatDate(comment.comment_time) }}
                            </div>
                        </div>
                        <div class="star-wrapper">
                            <span class="text">評分</span>
                            <Star :score="comment.order_comment_score"></Star>
                        </div>
                        <div class="comment-content" v-html="commentStr(comment.comment)">
                        </div>
                        <div class="img-wrapper" v-if="comment.comment_pics.length">
                            <img v-for="item in comment.comment_pics" :key="item.id" :src="item.thumbnail_url">
                        </div>
                    </div>
                        </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
import Star from "components/Star/Star";
import Split from "components/Split/Split";
import BScroll from 'better-scroll';

const ALL = 2 ; //類型選擇: 全部
const PICTURE = 1 ;//類型選擇: 有圖
const COMMENT = 0 ;//類型選擇: 點評

export default {
    data() {
        return {
            ratings: {},
            selectType: ALL
        };
    },
    created() {
        let that = this;
        this.$axios
            .get("api/ratings")
            .then(function (response) {
                let dataSource = response.data.data;
                if (dataSource.code == 0) {
                    that.ratings = dataSource.data;

                    //滾動初始化
                    that.$nextTick(()=>{
                        if(!that.Scroll){
                            that.Scroll = new BScroll(that.$refs.rtScroll,{
                                click: true
                            });
                        }else{
                            that.Scroll.refresh();
                        }
                    });

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods:{
        selectTypeFn(type){
            this.selectType = type ;
            //刷新
            this.$nextTick(()=>{
                this.Scroll.refresh();
            })
        },
        formatDate(time){
            let date = new Date(time*1000);
            // 格式
            let fmt = 'yyyy.MM.dd'

            if(/(y+)/.test(fmt)){
                let year = date.getFullYear().toString();
                fmt = fmt.replace(RegExp.$1,year);
            }
            if(/(M+)/.test(fmt)){
                let month = date.getMonth().toString();
                fmt = fmt.replace(RegExp.$1,month);
            }
            if(/(d+)/.test(fmt)){
                let day = date.getDate().toString();
                fmt = fmt.replace(RegExp.$1,day);
            }
            return fmt ;
        },
        commentStr(content){
            let rel = /#[^#]+#/g;

            return content.replace(rel, '<i>$&</i>');
        }
    },
    computed:{
        selectComment(){
            if(this.selectType == ALL ){ //所有評價
                return this.ratings.comments;
            }else if(this.selectType == PICTURE){ //有圖評價
                let arr = [];
                this.ratings.comments.forEach((comment)=>{
                    if(comment.comment_pics.length){
                        arr.push(comment);
                    }
                });
                return arr;
            }else{ //點評
                return this.ratings.comments_dp.comments;
            }
        }
    },
    components: {
        Star,
        Split,
        BScroll
    }
};
</script>


<style>
@import url("Ratings.css");
</style>
