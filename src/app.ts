import express from 'express';
import { requestLogger } from './middleware';
import router from './router';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8089;

app.set('view engine', 'ejs');

app.use(requestLogger);

app.use(bodyParser.json({ limit: '1mb' }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static('static'));

app.use('/', router);

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
