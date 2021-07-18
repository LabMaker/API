import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'config' })
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'client_id', unique: true })
  clientId: string;

  @Column({ name: 'client_secret', unique: true })
  clientSecret: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ name: 'user_agent' })
  userAgent: string;

  @Column()
  title: string;

  @Column({ name: 'pm_body' })
  pmBody: string;

  @Column({ length: 500 })
  subreddits: string;

  @Column({ length: 10000 })
  forbiddenWords: string;

  @Column()
  activity: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'auto_switch' })
  autoSwitch: boolean;

  @Column({ name: 'auto_ticket' })
  autoTicket: boolean;

  @Column({ name: 'auto_react' })
  autoReact: boolean;
}
