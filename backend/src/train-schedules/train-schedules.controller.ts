import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TrainSchedulesService } from './train-schedules.service';
import { CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import { UpdateTrainScheduleDto } from './dto/update-train-schedule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('train-schedules')
@UseGuards(JwtAuthGuard)
export class TrainSchedulesController {
  constructor(private readonly trainSchedulesService: TrainSchedulesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateTrainScheduleDto) {
    return this.trainSchedulesService.create(createDto);
  }

  @Get()
  async findAll(@Query('search') search?: string) {
    return this.trainSchedulesService.findAll(search);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.trainSchedulesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTrainScheduleDto,
  ) {
    return this.trainSchedulesService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.trainSchedulesService.remove(id);
  }
}
