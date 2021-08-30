import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/UserSchema';
import { UserService } from './user.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [{ provide: 'USER_SERVICE', useClass: UserService }, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
