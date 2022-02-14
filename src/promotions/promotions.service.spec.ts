import { Test } from '@nestjs/testing';
import { PromotionRepository } from './promotions.repository';
import { PromotionsService } from './promotions.service';
import { bunchOfPromotions } from './promotions.controller.spec';

const mockPromotionsRepository = () => ({
  find: jest.fn(() => Promise.resolve(bunchOfPromotions)),
  findOne: jest.fn((id) => {
    return {
      id,
      title: 'test',
      url: '/testing',
      image: 'https://i.imgur.com/something.png',
    };
  }),
  delete: jest.fn(),
  createPromotion: jest.fn((dto) => {
    dto['id'] = Math.floor(Math.random() * 100) + 1;
    return Promise.resolve(dto);
  }),
  update: jest.fn((id, dto) => {
    dto['id'] = id;
    return Promise.resolve(dto);
  }),
  remove: jest.fn(() => Promise.resolve()),
});

describe('PromotionsService', () => {
  let promotionService: PromotionsService;
  let promotionRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PromotionsService,
        { provide: PromotionRepository, useFactory: mockPromotionsRepository },
      ],
    }).compile();

    promotionService = module.get<PromotionsService>(PromotionsService);
    promotionRepository = module.get<PromotionRepository>(PromotionRepository);
  });

  jest.mock('fs');

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAll', () => {
    it('calls find() method from userRepository and returns promotion(s)', async () => {
      expect.assertions(2);
      expect(await promotionService.fetchAll()).toEqual([
        {
          id: expect.any(Number),
          title: expect.any(String),
          url: expect.any(String),
          image: expect.any(String),
        },
        {
          id: expect.any(Number),
          title: expect.any(String),
          url: expect.any(String),
          image: expect.any(String),
        },
        {
          id: expect.any(Number),
          title: expect.any(String),
          url: expect.any(String),
          image: expect.any(String),
        },
      ]);
      expect(await promotionRepository.find).toHaveBeenCalled();
    });
  });
  const dto = { title: 'test', url: '/testing', image: './images/hazelnut' };
  describe('create', () => {
    it('creates a new promotion by calling createPromotion method in the user repo', async () => {
      expect(await promotionService.create(dto)).toEqual({
        id: expect.any(Number),
        title: expect.any(String),
        url: expect.any(String),
        image: expect.any(String),
      });
      expect(await promotionRepository.createPromotion).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    let save: any;
    beforeEach(() => {
      save = jest.fn();
      promotionService.update = jest.fn().mockReturnValue(Promise.resolve(undefined));
    });
    it('calls repo with findOne and assigns new properties and calls save', async () => {
      expect.assertions(1);
      save.mockResolvedValue(undefined);
      expect(await promotionService.update(17, dto)).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('calls findOne and delete to remove the user', async () => {
      promotionRepository.delete.mockResolvedValue({ affected: 1 });
      expect(await promotionService.remove(17)).toBeUndefined();
    });
  });
});
