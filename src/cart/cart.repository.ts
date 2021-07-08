import { EntityRepository, Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { User } from '../users/user.entity';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  async createCart(user: User): Promise<Cart> {
    const cart = new Cart();
    cart.user = user;
    await cart.save();
    delete cart.user;

    return cart;
  }
}
