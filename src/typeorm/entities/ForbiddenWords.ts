import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'forbidden_words' })
export class ForbiddenWords {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  word: string;
}
