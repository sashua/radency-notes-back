import { Injectable } from '@nestjs/common';
import { Category, Note } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Statistics } from './interfaces';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createNoteDto: CreateNoteDto): Promise<Note> {
    return this.prisma.note.create({ data: createNoteDto });
  }

  findAll(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }

  async getStatistics(): Promise<Statistics[]> {
    const [groups, categories] = await Promise.all([
      this.prisma.note.groupBy({
        by: ['categoryId', 'archived'],
        _count: true,
      }),
      this.prisma.category.findMany(),
    ]);

    const stats = groups.reduce((acc, { _count, categoryId, archived }) => {
      if (!acc[categoryId]) acc[categoryId] = { active: 0, archived: 0 };
      acc[categoryId][archived ? 'archived' : 'active'] = _count;
      return acc;
    }, {} as Record<Category['id'], { active: number; archived: number }>);

    const categoriesWithStats = categories.map((category) => ({
      ...category,
      active: stats[category.id]?.active ?? 0,
      archived: stats[category.id]?.archived ?? 0,
    }));
    return categoriesWithStats;
  }

  findOne(id: string): Promise<Note> {
    return this.prisma.note.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    return this.prisma.note.update({
      where: { id },
      data: updateNoteDto,
    });
  }

  remove(id: string): Promise<Note> {
    return this.prisma.note.delete({ where: { id } });
  }
}
