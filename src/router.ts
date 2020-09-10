import { Router } from 'express';
import Config from './config';
import { Bill, BillBasicType } from './Bill';
import { ErrorResponse, ResponseStatus, PostErrorMessage } from './response';
import { postResultHandler } from './middleware';

const router = Router();

function renderDay(day: number) {
  const strDay = ['一', '二', '三', '四', '五', '六', '天'];
  return strDay[day - 1];
}

router.get(/\/|index/, (req, res) => {
  const now = new Date();
  const serverDate = `${now.toLocaleDateString()} 周${renderDay(now.getDay())}`;

  res.render('index.ejs', {
    title: Config.title,
    serverDate,
    lastMonthUpdate: ['5月20日'].join(','),
    lastUpdate: '5月20日',
    totalDay: 10 + '天',
    totalMoney: 10 + '元',
    todayBills: [
      new Bill({
        name: '小玩意',
        total: 1000,
        type: { type: BillBasicType.unusual, name: '非理性消费' },
        money: 100,
        count: 10,
      }),
      new Bill({
        name: '大玩意',
        total: 1000,
        type: { type: BillBasicType.normal, name: '出行' },
        money: 100,
        count: 10,
      }),
      new Bill({
        name: '老玩意',
        total: 1000,
        type: { type: BillBasicType.normal, name: '饮食' },
        money: 100,
        count: 10,
      }),
    ],
  });
});

router.post('/post', (req, res, next) => {
  if (req.body) {
    const postData: Bill = req.body;
    console.log(postData.type);
    console.log(postData.name);
    console.log(postData.count);
    console.log(postData.money);
    console.log(postData.total);
    res.locals.postSuccess = true;
    res.locals.postResult = postData;
    next();
  } else {
    res.locals.postSuccess = false;
    next();
  }
});

router.use(postResultHandler);

router.get('/*', (req, res) => {
  res.redirect('/index');
});

export default router;
