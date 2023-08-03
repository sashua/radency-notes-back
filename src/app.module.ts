import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), NotesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
