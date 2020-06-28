import * as HttpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import * as uploadFile from '../../commonFunction/fileUpload';

import ContentService from '../../services/content/content.service';

import { sendFailureResponse, sendSuccessResponse } from '../../commonFunction/Utills';
const contentService = new ContentService();

class ContentController {

  constructor() {
  }

  /**
   * Add Content in category
   * @param {Request} req Express request object derived from http.incomingMessage
   * @param {Response} res Express response object
   * @param {Function} next Callback function
   */
  async addContent(req: Request, res: Response, next: NextFunction) {

    try {
        let file: any = req.file;
        if (req.file) {
            let img: any = await uploadFile.uploadImgToS3(req.file);
            req.body.docUrl = img.Location;
        }

        const result = await contentService.insert(req.body);
        return sendSuccessResponse(null, HttpStatus.OK, true, res);
    } catch (error) {
      return sendFailureResponse(error, HttpStatus.BAD_REQUEST, false, res);
    }
  }

  /**
   * Fetch Content from database
   * @param {Request} req Express request object derived from http.incomingMessage
   * @param {Response} res Express response object
   * @param {Function} next Callback function
   */

  async listContent(req: Request, res: Response, next: NextFunction) {

    try {
        let params = req.query;
        const responsData = await contentService.getAllContent(params);
        return sendSuccessResponse(responsData, HttpStatus.OK, true, res);
    } catch (error) {
      return sendFailureResponse(error, HttpStatus.BAD_REQUEST, false, res);
    }
  }

}

export default ContentController;
