// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import AuthenticationGuard from 'src/guards/authentication.guard';
import CourseService from './course.service';

@Controller('course')
export default class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  create(@Body() createCourseDto: Prisma.CourseCreateInput) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: Prisma.CourseUpdateInput) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
