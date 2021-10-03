"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const promotions_repository_1 = require("./promotions.repository");
let PromotionsService = class PromotionsService {
    constructor(promotionRepository) {
        this.promotionRepository = promotionRepository;
        this.logger = new common_1.Logger('PromotionRepository');
    }
    async fetchAll() {
        return await this.promotionRepository.find();
    }
    async create(promotionDto) {
        return this.promotionRepository.createPromotion(promotionDto);
    }
    async update(id, promotionDto) {
        const { title, url, image } = promotionDto;
        const promotion = await this.promotionRepository.findOne(id);
        if (!promotion) {
            throw new common_1.NotFoundException(`Promotion with ID "${id}" not found`);
        }
        promotion.title = title;
        promotion.image = image;
        promotion.url = url;
        await promotion.save();
        return promotion;
    }
    async remove(id) {
        const result = await this.promotionRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Promotion with ID "${id}" not found`);
        }
    }
};
PromotionsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(promotions_repository_1.PromotionRepository)),
    __metadata("design:paramtypes", [promotions_repository_1.PromotionRepository])
], PromotionsService);
exports.PromotionsService = PromotionsService;
//# sourceMappingURL=promotions.service.js.map