const Koa = require('koa');
const Router = require('koa-router');
const data = require('./data');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

app.use(cors());

router.get('/users', (ctx, next) => {
  // ctx.router available
  ctx.body = data;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(5000, () => console.log('Server runnin on port: 5000'));
