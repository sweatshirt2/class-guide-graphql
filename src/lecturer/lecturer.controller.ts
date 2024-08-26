// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.lecturerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLecturerDto: Prisma.LecturerUpdateInput,
  ) {
    return this.lecturerService.update(+id, updateLecturerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lecturerService.remove(+id);
  }
}
