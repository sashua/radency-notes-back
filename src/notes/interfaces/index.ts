import { Category } from '@prisma/client';

export interface Statistics extends Category {
  active: number;
  archived: number;
}
