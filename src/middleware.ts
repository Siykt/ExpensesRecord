import { RequestHandler } from 'express';
import {
  PostErrorMessage,
  ErrorResponse,
  ResponseStatus,
  SuccessResponseData,
} from './response';
import { Bill } from './Bill';

/**
 * Print Request Log
 */
export const requestLogger: RequestHandler = (req, res, next) => {
  if (!/\/static/.test(req.url)) {
    console.log('[REQUEST LOG]:', req.method, req.url);
  }
  next();
};

export const postResultHandler: RequestHandler = (req, res, next) => {
  if (res.locals.postSuccess) {
    const postSuccessMessage: SuccessResponseData<Bill> = {
      status: ResponseStatus.success,
      message: '提交成功',
      data: res.locals.postResult,
    };

    res.json(postSuccessMessage);
  } else {
    const errorMessage: PostErrorMessage = {
      url: req.url,
      message: 'POST提交失败',
    };

    const postError: ErrorResponse<PostErrorMessage> = {
      status: ResponseStatus.error,
      message: '',
      errorMessage: errorMessage,
    };

    res.json(postError);
  }
};
