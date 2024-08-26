import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import StudentCourseModule from './student-course/student-course.module';
import DatabaseModule from './database/database.module';

import CourseModule from './course/course.module';
import LecturerModule from './lecturer/lecturer.module';
import StudentModule from './student/student.module';
import StudentMiddleware from './middlewares/student/student.middleware';

@Module({
  imports: [StudentModule, CourseModule, LecturerModule, DatabaseModule, StudentCourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(StudentMiddleware)
      .forRoutes({ path: 'student', method: RequestMethod.GET });
  }
}
