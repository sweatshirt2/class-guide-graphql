import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import DatabaseService from 'src/database/database.service';

@Injectable()
export default class LecturerService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createLecturerDto: Prisma.LecturerCreateInput) {
    return this.databaseService.lecturer.create({ data: createLecturerDto });
  }

  async findAll() {
    const lecturers = await this.databaseService.lecturer.findMany({
      include: {
        courses: true,
      },
    });

    return lecturers.map(lecturer => {
      return {
        id: lecturer.id,
        fname: lecturer.fname,
        lname: lecturer.lname,
        courses: lecturer.courses.map(course => {
          return {
            name: course.name,
            id: course.id
          };
        })
      };
    });
  }

  async findOne(id: number) {
    const lecturer = await this.databaseService.lecturer.findUnique({ 
      where: { id },
      include: {
        courses: true,
      },
    });

    return {
      id: lecturer.id,
      fname: lecturer.fname,
      lname: lecturer.lname,
      courses: lecturer.courses.map(course => {
        return {
          name: course.name,
          id: course.id
        };
      })
    };
  }

  async update(id: number, updateLecturerDto: Prisma.LecturerUpdateInput) {
    return this.databaseService.lecturer.update({
      where: { id },
      data: updateLecturerDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.lecturer.delete({ where: { id } });
  }
}
