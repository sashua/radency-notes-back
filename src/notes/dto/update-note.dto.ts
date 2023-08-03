import { Note } from '@prisma/client';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateNoteDto
  implements Pick<Note, 'categoryId' | 'name' | 'content' | 'archived'>
{
  @IsUUID(4)
  @IsOptional()
  categoryId: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsBoolean()
  @IsOptional()
  archived: boolean;
}
