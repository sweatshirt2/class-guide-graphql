import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export default class StudentMiddleware implements NestMiddleware {
  use(rq: any, rs: any, next: NextFunction) {

    console.log("Request:", rq.body, rq.route);
    console.log("Response:", rs);
    console.log("Request sent to get all students data.");
    
    next();
  }
}
