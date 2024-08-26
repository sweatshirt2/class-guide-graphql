import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import DatabaseService from 'src/database/database.service';

@Injectable()
export default class StudentCourseService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createStudentCourseDto: Prisma.StudentCourseCreateInput) {
    return this.databaseService.studentCourse.create({ data: createStudentCourseDto });
  }

  async remove(studentId: number, courseId: number) {
    return this.databaseService.studentCourse.delete({
      where: {
        studentId_courseId: { studentId, courseId },
      },
    });
  }
}
