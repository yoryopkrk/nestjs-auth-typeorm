import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Entity,
  OneToMany,
  Column,
} from 'typeorm';
import { Expose, Exclude } from 'class-transformer';

import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @Exclude()
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Expose()
  get products() {
    if (this.items) {
      return this.items
        .filter((items) => !!items)
        .map((item) => ({
          ...item.product,
          quantity: item.quantity,
          itemId: item.id,
        }));
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.items) {
      return this.items
        .filter((items) => !!items)
        .reduce((acum, item) => {
          const totalItem = item.product.price * item.quantity;
          return acum + totalItem;
        }, 0);
    }
    return 0;
  }
}
