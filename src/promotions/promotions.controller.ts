import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() promotionDto: PromotionDto): Promise<Promotion> {
    return this.promotionService.create(promotionDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() promotionDto: PromotionDto
  ): Promise<Promotion> {
    return this.promotionService.update(id, promotionDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.promotionService.remove(id);
  }
}
