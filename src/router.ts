import { Router } from 'express';

const router = Router();

router.get(/(index)?/, (req, res, next) => {
  res.render('index.ejs', { title: 'test' });
});

export default router;
