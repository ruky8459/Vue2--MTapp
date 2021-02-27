var express = require('express');
var port = 8088;

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);

//接口數據
var goods = require('./data/01-商品頁(點菜).json') //載入本地資料檔案
var ratings = require('./data/02-商品頁(評價).json') //載入本地資料檔案
var seller = require('./data/03-商品頁(商家).json') //載入本地資料檔案
var apiRoutes = express.Router()

app.get('/api/goods', (req, res) => {
    res.json({
    errno: 0,
    data: goods
}) //介面返回json資料，上面配置的資料seller就賦值給data請求後呼叫
    }),
app.get('/api/ratings', (req, res) => {
    res.json({
    errno: 0,
    data: ratings
    })
}),
app.get('/api/seller', (req, res) => {
    res.json({
    errno: 0,
    data: seller
    })
})

app.use('/api', apiRoutes) //中間件，通過路由請求資料

//定義static目錄，指向./dist目錄
app.use(express.static('./dist'));

//啟動express
module.express = app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('http:///localhost:' + port +'\n');
});
