import { Note } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateNoteDto
  implements Pick<Note, 'categoryId' | 'name' | 'content'>
{
  @IsUUID(4)
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  content: string;
}
