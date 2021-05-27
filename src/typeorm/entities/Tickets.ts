import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'subreddits' })
export class Subreddits {
  @PrimaryColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  type: string;
}
