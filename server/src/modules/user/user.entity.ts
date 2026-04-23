import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Role } from "../role/role.entity";
import { Address } from "../address/address.entity";
import { LoginType } from "src/modules/common/utils/common.enum";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ nullable: true, default: "+91" })
  phoneNumberCountryCode?: string;

  @Column({ unique: true, nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  otp?: string;

  @Column({ default: false })
  isOtpVerified!: boolean;

  @Column({ type: "int", default: 0 })
  loginCount!: number;

  @Column({ default: false })
  isMobileVerified!: boolean;

  @Column({ default: false })
  isEmailVerified!: boolean;

  @ManyToOne(() => Role, (role) => role.users, { nullable: true })
  role?: Role;

  @Column({ type: "int", nullable: true })
  roleId?: number;

  @OneToMany(() => Address, (address) => address.user)
  addresses!: Address[];

  @Column({ nullable: true })
  otpExpiry?: Date;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isDeleted!: boolean;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  lastLoginAt?: Date;

  @Column({ type: "enum", enum: LoginType, default: LoginType.EMAIL })
  loginType!: LoginType;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
