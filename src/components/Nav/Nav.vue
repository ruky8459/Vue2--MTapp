<template>
    <div class="nav">
    <!-- 使用 router-link 组件来導航. -->
    <!-- 通過傳入 `to` 属性指定連接. -->
    <!-- <router-link> 默認會被渲染成一个 `<a>` 標籤 -->
    <router-link to="/goods" class="nav-item">
        點餐
        <i class="line"></i>
    </router-link>
    <router-link to="/ratings" class="nav-item">
        評價
        <i class="line"></i>
        
    </router-link>
    <router-link to="/seller" class="nav-item">
        商家
        <i class="line"></i>
    </router-link>
    </div>
</template>
<script>
export default {};
</script>
<style>
.nav{
    display: flex;
    /* justify-content: space-around; */
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e4e4e4e4;
}
.nav .nav-item {
    flex: 1;
    text-align: center;
    font-size: 13px;
    /* <router-link> 默認會被渲染成一個 `<a>` 標籤，所以要消掉底線 */
    text-decoration: none;
    color:#666666;
    position: relative;
}/* 選中後的文字樣式 */
.nav .active{
    color:#FFBB22;
}
.nav .active .line{
    width: 20px;
    height: 2px;
    display: inline-block;
    background: #FFBB22;
    /* 置中的小技巧  由於這設定的是線段的起點 所以還要往左"自身寬度的一半"就能完全居中*/
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -10px;
    z-index: auto;
}
</style>
