import { Database } from '../../database.types';

export type StudyRecord = Database['public']['Tables']['study-record']['Row'];
export type InsertRecord = Database['public']['Tables']['study-record']['Insert'];
export type UpdateRecord = {
  created_at?: string | undefined;
  id: string;
  time?: number | null;
  title?: string | undefined;
};
