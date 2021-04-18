import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'subreddits' })
export class Subreddits {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  word: string;
}
