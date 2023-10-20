const express = require('express');
const env = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const routerAccount = require('./adam_shop/router/accountRouter');
const routerProduct = require('./adam_shop/router/productRouter');
const routerAdmin = require('./adam_shop/router/adminRouter');
const routerUser = require('./adam_shop/router/userRouter');
const bodyParser = require('body-parser');
var session = require('express-session');

const app = express();
const PORT = process.env.PORT || 4000;
env.config();

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

mongoose.connect('mongodb://localhost:27017/ADAM_SHOP', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connect to db successfully');
  }
});

app.use('/images', express.static(path.join(__dirname, 'adam_shop/images')));
app.use(
  '/webfonts',
  express.static(path.join(__dirname, 'adam_shop/webfonts'))
);
app.use('/css', express.static(path.join(__dirname, 'adam_shop/css')));
app.use('/js', express.static(path.join(__dirname, 'adam_shop/js')));
app.use('/img', express.static(path.join(__dirname, '/adminAdamShop/img')));
app.use('/fonts', express.static(path.join(__dirname, '/adminAdamShop/fonts')));
app.use(
  '/admincss',
  express.static(path.join(__dirname, '/adminAdamShop/admincss'))
);
app.use(
  '/javascript',
  express.static(path.join(__dirname, '/adminAdamShop/javascript'))
);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/account', routerAccount);
app.use('/product', routerProduct);

app.use('/admin', routerAdmin);
app.use('/', routerUser);

app.listen(PORT, () => {
  console.log(`sever is running on port:${PORT}`);
});
