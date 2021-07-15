import { Test } from '@nestjs/testing';
import { MockType } from '../category/category.service.spec';
import { OrdersService } from './orders.service';
import { User } from '../users/user.entity';
import { bunchOfOrders } from './orders.controller.spec';
import { OrdersRepository } from './orders.repository';
import { OrderStatus } from './order.entity';
import { v4 as uuid } from 'uuid';
import * as typeorm from 'typeorm';
import { OrderItem } from './order-item.entity';
import Stripe from 'stripe';

const mockOrdersRepository: () => MockType<OrdersRepository> = jest.fn(() => ({
  fetch: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  query: jest.fn(),
  createQueryBuilder: jest.fn(),
  remove: jest.fn(),
  createOrder: jest.fn((dto, user) => {
    dto.id = uuid();
    dto.status = OrderStatus.PROCESSING;
    dto.userId = user.id;
    dto.total_price = dto.total_price.toString();
    dto.date = new Date().toString();
    return Promise.resolve(dto);
  }),
  delete: jest.fn(),
}));

const orderItems = [
  {
    id: 'b6bc6594-c808-45fc-bbdb-2d0d32292f6e',
    orderId: 'f29ca6ae-3aac-4794-b008-4d743901a226',
    price: 9.5,
    quantity: 1,
  },
  {
    id: '7754c980-0e07-4505-82b6-d887bcaf8221',
    orderId: 'f29ca6ae-3aac-4794-b008-4d743901a226',
    price: 1.5,
    quantity: 1,
  },
];

export const mockPaymentIntent = {
  id: 'pi_MeFVjK2b1u9YsTDI8nc25QNQK104K',
  object: 'payment_intent',
  amount: 250,
  amount_capturable: 0,
  amount_received: 0,
  application: null,
  application_fee_amount: null,
  canceled_at: null,
  cancellation_reason: null,
  capture_method: 'automatic',
  charges: {
    object: 'list',
    data: [],
    has_more: false,
    total_count: 0,
    url: '/v1/charges?payment_intent=pi_MeFVjK2b1u9YsTDI8nc25QNQK104K',
  },
  client_secret: 'pi_MeFVjK2b1u9YsTDI8nc25QNQK104K_secret_wj2wXJJOOwifngyU',
  confirmation_method: 'automatic',
  created: 1626290844,
  currency: 'usd',
  customer: null,
  description: null,
  invoice: null,
  last_payment_error: null,
  livemode: false,
  metadata: {},
  next_action: null,
  on_behalf_of: null,
  payment_method: null,
  payment_method_options: {
    card: {
      installments: null,
      network: null,
      request_three_d_secure: 'automatic',
    },
  },
  payment_method_types: ['card'],
  receipt_email: null,
  review: null,
  setup_future_usage: null,
  shipping: null,
  source: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  status: 'requires_payment_method',
  transfer_data: null,
  transfer_group: null,
};

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let ordersRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [OrdersService, { provide: OrdersRepository, useFactory: mockOrdersRepository }],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    ordersRepository = module.get<OrdersRepository>(OrdersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = new User();
  mockUser.id = 'e6a23d5f-3a23-498f-9f61-ffb9ad34cb68';
  mockUser.email = 'miumau@gmail.com';
  mockUser.password = 'yeetmageet123';

  describe('fetch', () => {
    it("fetches all user's orders by calling ordersRepository.fetch", async () => {
      ordersRepository.fetch.mockResolvedValue(bunchOfOrders);
      await expect(ordersService.fetch(null, mockUser)).resolves.toEqual([
        {
          id: expect.any(String),
          userId: expect.any(String),
          total_price: expect.any(Number),
          address: expect.any(String),
          country: expect.any(String),
          city: expect.any(String),
          postalcode: expect.any(String),
          status: expect.any(String),
          date: expect.any(String),
        },
        {
          id: expect.any(String),
          userId: expect.any(String),
          total_price: expect.any(Number),
          address: expect.any(String),
          country: expect.any(String),
          city: expect.any(String),
          postalcode: expect.any(String),
          status: expect.any(String),
          date: expect.any(String),
        },
        {
          id: expect.any(String),
          userId: expect.any(String),
          total_price: expect.any(Number),
          address: expect.any(String),
          country: expect.any(String),
          city: expect.any(String),
          postalcode: expect.any(String),
          status: expect.any(String),
          date: expect.any(String),
        },
      ]);
      expect(ordersRepository.fetch).toHaveBeenCalledWith(null, mockUser);
    });
  });

  describe('fetchById', () => {
    it('returns the user by calling ordersRepository.findOne', async () => {
      const mockOrder = bunchOfOrders[0];
      mockOrder.id = 'e6a23d5f-3a23-498f-9f61-ffb9ad34cb68';
      ordersRepository.findOne.mockResolvedValue(mockOrder);
      await expect(
        ordersService.fetchById('e6a23d5f-3a23-498f-9f61-ffb9ad34cb68', mockUser)
      ).resolves.toEqual({
        id: 'e6a23d5f-3a23-498f-9f61-ffb9ad34cb68',
        userId: expect.any(String),
        total_price: expect.any(Number),
        address: expect.any(String),
        country: expect.any(String),
        city: expect.any(String),
        postalcode: expect.any(String),
        status: expect.any(String),
        date: expect.any(String),
      });
      expect(ordersRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'e6a23d5f-3a23-498f-9f61-ffb9ad34cb68', userId: mockUser.id },
      });
    });
  });

  describe('fetchAll', () => {
    it('returns all orders from the database by calling ordersRepository.query', async () => {
      ordersRepository.query.mockResolvedValue(bunchOfOrders);
      await expect(ordersService.fetchAll()).resolves.toEqual([
        {
          id: expect.any(String),
          userId: expect.any(String),
          total_price: expect.any(Number),
          address: expect.any(String),
          country: expect.any(String),
          city: expect.any(String),
          postalcode: expect.any(String),
          status: expect.any(String),
          date: expect.any(String),
        },
        {
          id: expect.any(String),
          userId: expect.any(String),
          total_price: expect.any(Number),
          address: expect.any(String),
          country: expect.any(String),
          city: expect.any(String),
          postalcode: expect.any(String),
          status: expect.any(String),
          date: expect.any(String),
        },
        {
          id: expect.any(String),
          userId: expect.any(String),
          total_price: expect.any(Number),
          address: expect.any(String),
          country: expect.any(String),
          city: expect.any(String),
          postalcode: expect.any(String),
          status: expect.any(String),
          date: expect.any(String),
        },
      ]);
      expect(ordersRepository.query).toHaveBeenCalled();
    });
  });

  describe('fetchOrderItems', () => {
    it("returns order's items by calling ordersRepository.createQueryBuilder and orderItem.createQueryBuilder", async () => {
      ordersRepository.createQueryBuilder = jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(bunchOfOrders[0]),
      }));
      jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
        const original = jest.requireActual('typeorm');
        return {
          ...original,
          createQueryBuilder: jest.fn(() => ({
            where: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue(orderItems),
          })),
        };
      });
      expect(
        ordersService.fetchOrderItems('f29ca6ae-3aac-4794-b008-4d743901a226', mockUser)
      ).resolves.toEqual([
        {
          id: expect.any(String),
          orderId: 'f29ca6ae-3aac-4794-b008-4d743901a226',
          price: expect.any(Number),
          quantity: expect.any(Number),
        },
        {
          id: expect.any(String),
          orderId: 'f29ca6ae-3aac-4794-b008-4d743901a226',
          price: expect.any(Number),
          quantity: expect.any(Number),
        },
      ]);
      expect(ordersRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('creates an order by calling ordersRepository.createOrder', async () => {
      const dto = {
        total_price: 10,
        address: 'Yeetstreet',
        country: 'Bruma',
        city: 'Yes',
        postalcode: '01000',
      };
      await expect(ordersService.create(dto, mockUser)).resolves.toEqual({
        id: expect.any(String),
        userId: mockUser.id,
        total_price: '10',
        address: 'Yeetstreet',
        country: 'Bruma',
        city: 'Yes',
        postalcode: '01000',
        status: expect.any(String),
        date: expect.any(String),
      });
      expect(ordersRepository.createOrder).toHaveBeenCalledWith(dto, mockUser);
    });
  });

  /*
  describe('addPaymentIntent', () => {
    it('calls new instance of Stripe and assign secret key to payment intent and returns it', async () => {
      await expect(
        ordersService.addPaymentIntent(
          { amount: 2.5, currency: 'usd', payment_method_types: 'card', metadata: mockUser.email },
          mockUser
        )
      ).resolves.toEqual(mockPaymentIntent);
    });
  });
  */

  describe('removeOrder', () => {
    it('calls ordersRepository.find and uses orderItemRepository.delete to delete items associated with the order along with the order', async () => {
      ordersRepository.delete.mockResolvedValue({
        raw: [],
        affected: 1,
      });
      ordersRepository.findOne.mockResolvedValue(bunchOfOrders[0]);
      jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
        const original = jest.requireActual('typeorm');
        return {
          ...original,
          delete: jest.fn().mockReturnValue({
            raw: [],
            affected: 3,
          }),
        };
      });
      ordersRepository.find.mockResolvedValue(bunchOfOrders[0]);
      expect(ordersService.removeOrder('f29ca6ae-3aac-4794-b008-4d743901a226', mockUser));
      expect(ordersRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'f29ca6ae-3aac-4794-b008-4d743901a226' },
      });
    });
  });
});
