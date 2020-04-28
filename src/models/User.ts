import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users') // Sintaxe decoration
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // por padrao ja vai string
  name: string;

  @Column() // por padrao ja vai string
  email: string;

  @Column() // por padrao ja vai string
  password: string;

  @Column() // por padrao ja vai string
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
