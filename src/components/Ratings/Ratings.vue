<template>
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
    </div>
</template>


<script>
import Star from "components/Star/Star";
import Split from "components/Split/Split";
export default {
    data() {
        return {
            ratings: {},
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
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    components: {
        Star,
        Split
    },
};
</script>


<style>
@import url("Ratings.css");
</style>
