import { ErrorRequestHandler } from 'express';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import handleDuplicateError from '../../errors/handleDuplicateError';
import { errorLogger } from '../../shared/logger';
import { IErrorMessage } from '../../types/errors.types';
import { StatusCodes } from 'http-status-codes';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  try {
    // Log error based on environment
    if (config.env === 'development') {
      console.log('🚨 globalErrorHandler ~~ ', error);
    } else {
      errorLogger.error('🚨 globalErrorHandler ~~ ', error);
    }

    let code = 500;
    let message = error.message || 'Something went wrong';
    let errorMessages: IErrorMessage[] = [];
    console.log('error is', error);

    // Handle Incorrect Password Error
    if (error === 'Password is incorrect') {
      code = 401; // Unauthorized
      message = 'The password you entered is incorrect.';
      errorMessages = [{ path: 'password', message }];
    } else if (error.message === 'please insert image') {
      code = StatusCodes.BAD_REQUEST;
      message = 'Please insert an image';
      errorMessages = [{ path: 'unknown', message }];
    } else if (error === 'user is banned') {
      code = StatusCodes.FORBIDDEN;
      message = 'User is banned';
      errorMessages = [{ path: 'unknown', message }];
    } else if (error?.message === 'user is banned') {
      code = StatusCodes.FORBIDDEN;
      message = 'User is banned';
      errorMessages = [{ path: 'unknown', message }];
    } else if (error.message === 'user did not create vault password yet') {
      code = StatusCodes.FORBIDDEN;
      message = 'User has not created a vault password yet';
      errorMessages = [{ path: 'unknown', message }];
    } else if (error.message === 'jwt must be provided') {
      code = 401; // Unauthorized
      message = 'JWT must be provided';
      errorMessages = [{ path: 'unknown', message }];
    }
    // HANDLE USER DOES NOT EXISTS ERROR
    else if (error.message === 'USER_DOES_NOT_EXISTS') {
      code = StatusCodes.NOT_FOUND;
      message = 'User does not exist';
      errorMessages = [{ path: 'unknown', message }];
    }
    // Handle Zod Validation Error
    else if (error.name === 'ZodError') {
      const simplifiedError = handleZodError(error);
      code = 400;
      message = simplifiedError.errorMessages
        .map(err => err.message)
        .join(', ');
      errorMessages = simplifiedError.errorMessages;
    }
    // Handle Mongoose ValidationError
    else if (error.name === 'ValidationError') {
      const simplifiedError = handleValidationError(error);
      code = 400;
      message = simplifiedError.errorMessages
        .map(err => err.message)
        .join(', ');
      errorMessages = simplifiedError.errorMessages;
    }
    // Handle MongoDB Duplicate Key Error
    else if (error.code === 11000 || error.code === 11001) {
      const simplifiedError = handleDuplicateError(error);
      code = 409; // Conflict
      message = simplifiedError.errorMessages
        .map(err => err.message)
        .join(', ');
      errorMessages = simplifiedError.errorMessages;
    }
    // Handle Custom API Error
    else if (error instanceof ApiError) {
      code = error.code || 500;
      message = error.message || 'Something went wrong';
      errorMessages = error.message
        ? [{ path: '', message: error.message }]
        : [];
    }
    // Handle General Errors
    else if (error instanceof Error) {
      message = error.message || 'Internal Server Error';
      errorMessages = error.message
        ? [{ path: '', message: error.message }]
        : [];
    }
    // Handle Unknown Errors
    else {
      message = typeof error === 'string' ? error : JSON.stringify(error);
      errorMessages = [{ path: '', message }];
    }

    // Handling additional error cases
    if (typeof error === 'string' && error.includes('not exist')) {
      code = StatusCodes.NOT_FOUND;
      message = error;
    } else if (error instanceof Error && error.message.includes('not exist')) {
      code = StatusCodes.NOT_FOUND;
      message = error.message;
    } else if (typeof error === 'string' && error.includes('not authorized')) {
      code = StatusCodes.UNAUTHORIZED;
      message = error;
    } else if (
      error instanceof Error &&
      error.message.includes('not authorized')
    ) {
      code = StatusCodes.UNAUTHORIZED;
      message = error.message;
    } else if (
      typeof error === 'string' &&
      (error.includes('not have permission') || error.includes('not admin'))
    ) {
      code = StatusCodes.UNAUTHORIZED;
      message = error;
    } else if (
      error instanceof Error &&
      (error.message.includes('not have permission') ||
        error.message.includes('not admin'))
    ) {
      code = StatusCodes.UNAUTHORIZED;
      message = error.message;
    } else if (
      typeof error === 'string' &&
      (error.includes('please enter') ||
        error.includes('invalid') ||
        error.includes('not valid') ||
        error.includes('please give'))
    ) {
      code = StatusCodes.BAD_REQUEST;
      message = error;
    } else if (
      error instanceof Error &&
      (error.message.includes('please enter') ||
        error.message.includes('invalid') ||
        error.message.includes('not valid') ||
        error.message.includes('please give'))
    ) {
      code = StatusCodes.BAD_REQUEST;
      message = error.message;
    } else if (typeof error === 'string' && error.includes('is already')) {
      code = StatusCodes.CONFLICT;
      message = error;
    } else if (error instanceof Error && error.message.includes('is already')) {
      code = StatusCodes.CONFLICT;
      message = error.message;
    }

    errorMessages = [{ path: 'unknown', message }];

    // Send response
    res.status(code).json({
      code,
      success: false,
      message,
      errors: errorMessages, // Detailed error messages
      stack: config.env === 'development' ? error?.stack : undefined, // Stack trace only in development
    });
  } catch (err: any) {
    // Ensure that we do not crash the server
    console.error('🚨 globalErrorHandler ~ Error during error handling: ', err);
    res.status(500).json({
      code: 500,
      success: false,
      message: 'An unexpected error occurred during error handling.',
      errors: [
        {
          path: 'unknown',
          message: 'An unexpected error occurred during error handling.',
        },
      ],
      stack: config.env === 'development' ? err?.stack : undefined,
    });
  }
};

export default globalErrorHandler;
