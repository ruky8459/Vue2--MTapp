<template></template>

<script>

  created(){ //發起非同步請求，獲取數據
    //因為這裡的this指向的不是App.vue的實例，而是Vue對象所以處理一下
    var that = this;
    //通過axios發起get請求
    this.$axios.get('/api/goods')
        .then(function (response) {//成功獲取數據
            // console.log(response);
        var dataSource = response.data;
        // console.log('來源response',response);
        // console.log('來源response.data',response.data);
        // console.log(dataSource.data.code);
        // console.log('接收這個無.data',dataSource.code);
        // console.log('接收這個有.data',dataSource.data.code);
        if(dataSource.code == 0 ){
            console.log(' ',dataSource.data.code)
            that.poiInfo = dataSource.data.poi_info;
            console.log(that.poiInfo);
        }
        })
        .catch(function (error) { //出錯處理
            console.log(error);
        });

    }
</script>

<style>
</style>
