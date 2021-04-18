import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'logs' })
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sub_id' })
  subId: string;

  @Column()
  username: string;

  @Column()
  message: string;

  @Column()
  subreddit: string;

  @Column()
  time: string;

  @Column()
  pm: boolean;
}
