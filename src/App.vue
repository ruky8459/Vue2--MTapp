<template>
    <div id="app">
    <!-- <img src="./assets/logo.png">
    <HelloWorld/> -->

    <!-- Header -->
    <Myheader :poiInfo='poiInfo'></Myheader>
    <!-- NavBar -->
    <Mynav></Mynav>  
    <!-- Contents -->
    <!-- <div class="content"> content </div> -->
    <!-- 路由出口，路由匹配到的組件將會渲染在這 -->
    <router-view></router-view>
    


    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
// 引用
import Myheader from 'components/Header/Header'
import Mynav from 'components/Nav/Nav'
export default {
    name: 'App',
    components: {//註冊
    // HelloWorld
    Myheader,
    Mynav
    },
    data(){
    return{
      //header組件所需的信息(商家信息)`,先定義一個空值透過非同步請求從json取得。
        poiInfo: {}
    }
    },
  created(){ //發起非同步請求，獲取數據
    //因為這裡的this指向的不是App.vue的實例，而是Vue對象所以處理一下
    var that = this;
    //通過axios發起get請求
    this.$axios.get('/api/goods')
        .then(function (response) {//成功獲取數據
          // console.log(response);
            var dataSource = response.data;
            if(dataSource.data.code == 0 ){
                that.poiInfo = dataSource.data.data.poi_info;
            // console.log(that.poiInfo);
            }
        
            })
        .catch(function (error) { //出錯處理
            console.log(error);
        });

    }
}
</script>

<style>
/* #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
} */
</style>
