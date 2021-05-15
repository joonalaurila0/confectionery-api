import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PromotionDto } from './dto/promotion.dto';
import { Promotion } from './promotion.entity';
import { PromotionsService } from './promotions.service';

@Controller('promotions')
export class PromotionsController {
  constructor(private promotionService: PromotionsService) {}

  @Get()
  @UsePipes(ValidationPipe)
  fetchAll(): Promise<Promotion[] | Promotion> {
    return this.promotionService.fetchAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() promotionDto: PromotionDto): Promise<Promotion> {
    return this.promotionService.create(promotionDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() promotionDto: PromotionDto,
  ): Promise<Promotion> {
    return this.promotionService.update(id, promotionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.promotionService.remove(id);
  }
}
