import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { CartItem } from '../cart/cart-item.entity';
import { OrderItem } from '../orders/order-item.entity';
import { Category } from '../category/category.entity';

export enum ProductStatus {
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  categoryId: string;

  @Column()
  title: string;

  @Column()
  image: string

  @Column('float')
  price: number;

  @Column()
  author: string | null;

  @Column()
  description: string;

  @Column()
  status: ProductStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CartItem, cartitem => cartitem.product)
  cartItem: CartItem[];

  @OneToMany(() => OrderItem, orderitem => orderitem.product)
  orderItem: OrderItem[];

  @ManyToOne(() => Category, category => category.product)
  category: Category

}
