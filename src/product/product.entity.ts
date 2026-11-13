import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  productName: string;

  @Column({
    type: 'decimal',
  })
  unitPrice: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  imageUrl?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  imagePublicId?: string;

  @Column()
  stockQty: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;
}
