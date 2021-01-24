<template>
    <div class="star">
        <span v-for="itemClass in itemClasses" :key='itemClass' :class="itemClass" class="star-item"></span>
    </div>
</template>
<script>
const LENGTH = 5;
//commit 1
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
//commit 2
export default {
    props:{
        score:{
            type: Number
        }
    },
    computed:{
        itemClasses(){
            let result = [];
            let score = Math.floor(this.score*2)/2;
            let hasDecimal = score % 1 !== 0;
            let integer = Math.floor(score);
            for (let i=0; i<integer;i++){
                result.push(CLS_ON);
            }//commit 3
            if(hasDecimal){
                result.push(CLS_HALF);
            }
            while(result.length<LENGTH){
                result.push(CLS_OFF);
            }//commit 4
            return result;
        }
    }
}
</script>
<style>
.star{
    font-size: 0;
}
.star .star-item{
    display: inline-block;
    width: 10px;
    height: 10px;
    background-repeat: no-repeat;
    margin-right: 3px;
    background-size: 10px 10px;
}
.star .star-item:last-child{
    margin-right: 0;
}
/* 三種星星 */
.star .on{
    background-image: url(star24_on@2x.png);
}
.star .half{
    background-image: url(star24_half@2x.png);
}
.star .off{
    background-image: url(star24_off@2x.png);
}
</style>