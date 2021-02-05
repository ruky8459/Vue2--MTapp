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
                    <p>口味</p><Star :score="ratings.quality_score"></Star
                    ><p>{{ ratings.quality_score }}</p>
                </div>
                <div class="pack">
                    <p>包裝</p><Star :score="ratings.pack_score"></Star
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
    </div>
</template>


<script>
import Star from "components/Star/Star";
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
    },
};
</script>


<style>
@import url("Ratings.css");
</style>
