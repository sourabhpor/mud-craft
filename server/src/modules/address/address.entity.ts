import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity({ name: "addresses" })
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  // 👤 Relation with User
  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: "CASCADE",
  })
  user!: User;

  @Column()
  userId!: number;

  // 📦 Address Details
  @Column()
  fullName!: string; // receiver name

  @Column({ length: 10 })
  phoneNumber!: string;

  @Column()
  addressLine1!: string;

  @Column({ nullable: true })
  addressLine2?: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column({ length: 6 })
  pincode!: string;

  @Column({ default: "India" })
  country!: string;

  // 🚚 Address Type
  @Column({
    type: "enum",
    enum: ["home", "work", "other"],
    default: "home",
  })
  type!: string;

  // ⭐ Default Address
  @Column({ default: false })
  isDefault!: boolean;

  // 🧾 Timestamps
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
