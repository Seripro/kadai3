import { supabase } from './supabase';
import { InsertRecord, UpdateRecord } from '../types/recordType';

export const getAllRecords = async () => {
  const records = await supabase.from('study-record').select('*');
  return records;
};

export const insertRecord = async (record: InsertRecord) => {
  await supabase.from('study-record').insert(record);
};

export const deleteRecord = async (id: string) => {
  await supabase.from('study-record').delete().eq('id', id);
};

export const updateRecord = async (record: UpdateRecord) => {
  await supabase.from('study-record').update(record).eq('id', record.id);
};
