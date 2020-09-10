import express from 'express';

const app = express();

app.use('/', (res, req) => req.end('<h1 style="text-align: center">-- Server start --</h1>'));

app.listen(8089);
