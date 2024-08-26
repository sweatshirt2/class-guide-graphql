// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import LecturerService from './lecturer.service';
import { Prisma } from '@prisma/client';

@Controller('lecturer')
export default class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  @Post()
  create(@Body() createLecturerDto: Prisma.LecturerCreateInput) {
    return this.lecturerService.create(createLecturerDto);
  }

  @Get()
  findAll() {
    return this.lecturerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lecturerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLecturerDto: Prisma.LecturerUpdateInput,
  ) {
    return this.lecturerService.update(id, updateLecturerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lecturerService.remove(id);
  }
}
