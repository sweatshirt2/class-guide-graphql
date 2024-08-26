import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import StudentCourseService from './student-course.service';
import { Prisma } from '@prisma/client';

@Controller('student-course')
export default class StudentCourseController {
  constructor(private readonly studentCourseService: StudentCourseService) {}

  @Post()
  create(@Body() createStudentCourseDto: Prisma.StudentCourseCreateInput) {
    return this.studentCourseService.create(createStudentCourseDto);
  }

  @Delete(':studentId/:courseId')
  remove(@Param('studentId') studentId: string, @Param('courseId') courseId: string) {
    return this.studentCourseService.remove(+studentId, +courseId);
  }
}
