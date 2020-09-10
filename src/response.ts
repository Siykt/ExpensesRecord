export enum ResponseStatus {
  success,
  error,
}

export interface DefaultResponseData {
  message: string;
  status: ResponseStatus;
}

export interface SuccessResponseData<ResponseData> extends DefaultResponseData {
  status: ResponseStatus.success;
  data: ResponseData;
}

export interface DefaultErrorMessage {
  url: string;
}

export interface PostErrorMessage {
  url: string;
  message: string;
}

export interface ErrorResponse<ErrorMessage extends DefaultErrorMessage>
  extends DefaultResponseData {
  status: ResponseStatus.error;
  errorMessage: ErrorMessage;
}
