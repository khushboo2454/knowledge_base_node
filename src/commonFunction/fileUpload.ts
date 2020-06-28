import * as AWS from 'aws-sdk';
import config from '../config/config';

let s3bucket = new AWS.S3({
  accessKeyId: config.s3Details.accessKeyId,
  secretAccessKey: config.s3Details.secretAccessKey,
});

/**
* upload image to s3 bucket
* @param file
*/
export function uploadImgToS3(file: any) {
  return new Promise((resolve: any, reject: any) => {
    let params = {
      Bucket: config.s3Details.bucketName,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: config.s3Details.acl
    };
    s3bucket.upload(params, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}






