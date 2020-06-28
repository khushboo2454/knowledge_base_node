import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import * as HttpStatus from 'http-status-codes';
import { sendFailureResponse } from './../commonFunction/Utills';

export const validateSchema = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      let result = Joi.validate(req.body, schema, { abortEarly: false });
      if (result.error) {
        let errors = result.error.details.map((validationError: any) => {
          if (validationError.message.includes('fails to match the required pattern')) {
            return validationError.message.substring(0, validationError.message.indexOf('with value')).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
          }
          return validationError.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
        });
        return sendFailureResponse(errors, HttpStatus.INTERNAL_SERVER_ERROR, false, res);
      } else {
        next();
      }
    };
  };