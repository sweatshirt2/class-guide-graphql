import DatabaseService from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export default class CourseService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createCourseDto: Prisma.CourseCreateInput) {
    return this.databaseService.course.create({ data: createCourseDto });
  }

  async findAll() {
    const courses = await this.databaseService.course.findMany({
      include: {
        lecturer: true,
        students: {
          include: {
            student: true,
          },
        },
      },
    });

    return courses.map(course => {
      return {
        id: course.id,
        name: course.name,
        students: course.students.map(student => {
          return {
            id: student.student.id,
            fname: student.student.fname,
            lname: student.student.lname,
          }
        }),
      };
    });
  }

  async findOne(id: number) {
    const course = await this.databaseService.course.findUnique({ 
      where: { id },
      include: {
        lecturer: true,
        students: {
          include: {
            student: true,
          },
        },
      },
    });

    return {
      id: course.id,
      name: course.name,
      students: course.students.map(student => {
        return {
          id: student.student.id,
          fname: student.student.fname,
          lname: student.student.lname,
        }
      }),
    };
  }

  async update(id: number, updateCourseDto: Prisma.CourseUpdateInput) {
    return this.databaseService.course.update({ 
      where: { id },
      data: updateCourseDto,
     });
  }

  async remove(id: number) {
    return this.databaseService.course.delete({ where: { id } });
  }
}
