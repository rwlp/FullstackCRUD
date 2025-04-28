import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { CategoryEntity } from '../categories/category.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];

  @Column()
  name: string;

  @Column('int')
  qty: number;

  @Column('decimal')
  price: number;

  @Column()
  photo: string;
}
