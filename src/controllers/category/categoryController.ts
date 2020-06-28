import * as HttpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import CatalogService from '../../services/category/category.service';
import { sendFailureResponse, sendSuccessResponse } from '../../commonFunction/Utills';
const categoryService = new CatalogService();

class CategoryController {

  constructor() {
  }

  /**
   * Add new category
   * @param {Request} req Express request object derived from http.incomingMessage
   * @param {Response} res Express response object
   * @param {Function} next Callback function
   */
  async addCategory(req: Request, res: Response, next: NextFunction) {

    try {
        if (!req.body.categoryName) {
          return sendFailureResponse('categoryName required', HttpStatus.BAD_REQUEST, false, res);
        }
        const result = await categoryService.createCategory(req.body.categoryName);
        return sendSuccessResponse(null, HttpStatus.OK, true, res);
    } catch (error) {
      return sendFailureResponse(error, HttpStatus.BAD_REQUEST, false, res);
    }
  }

  /**
   * Get all category
   * @param {Request} req Express request object derived from http.incomingMessage
   * @param {Response} res Express response object
   * @param {Function} next Callback function
   */
  async listCategory(req: Request, res: Response, next: NextFunction) {

    try {
        const responsData = await categoryService.getCategoryList();
        return sendSuccessResponse(responsData, HttpStatus.OK, true, res);
    } catch (error) {
      return sendFailureResponse(error, HttpStatus.BAD_REQUEST, false, res);
    }
  }

}

export default CategoryController;
