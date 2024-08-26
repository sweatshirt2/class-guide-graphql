import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import DatabaseService from 'src/database/database.service';

@Injectable()
export default class StudentService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createStudentDto: Prisma.StudentCreateInput) {
    return this.databaseService.student.create({ data: createStudentDto });
  }

  async findAll() {
    const students = await this.databaseService.student.findMany({
      include: {
        courses: {
          include: {
            course: {
              include: {
                lecturer: true,
              }
            },
          },
        },
      },
    });

    return students.map(student => {
      return {
        id: student.id,
        fname: student.fname,
        lname: student.lname,
        courses: student.courses.map(course => {
          return {
            id: course.course.id,
            name: course.course.name,
            lecturer: course.course.lecturer,
          };
        }),
      };
    });
  }

  async findOne(id: number) {
    const student = await this.databaseService.student.findUnique({ 
      where: { id },
      include: {
        courses: {
          include: {
            course: {
              include: {
                lecturer: true,
              }
            },
          },
        },
      },
    });

    return {
      id: student.id,
      fname: student.fname,
      lname: student.lname,
      courses: student.courses.map(course => {
        return {
          id: course.course.id,
          name: course.course.name,
          lecturer: course.course.lecturer,
        };
      }),
    };
  }

  async update(id: number, updateStudentDto: Prisma.StudentUpdateInput) {
    return this.databaseService.student.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.student.delete({ where: { id } });
  }
}
