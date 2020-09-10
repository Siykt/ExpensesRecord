import { Router } from 'express';
import Config from './config';

const router = Router();

router.get(/(index)?/, (req, res, next) => {
  res.render('index.ejs', { title: Config.title });
});

export default router;
