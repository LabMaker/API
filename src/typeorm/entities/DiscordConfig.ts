import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'discord_config' })
export class DiscordConfig {
  @PrimaryGeneratedColumn()
  id: number;

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
