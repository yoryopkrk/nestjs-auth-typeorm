import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  //CreateDateColumn,
  //UpdateDateColumn,
  ManyToMany,
  //JoinTable,
} from 'typeorm';

import { Product } from './product.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToMany(() => Product, (product) => product.categories, {
    nullable: true,
  })
  products: Product[];
}
