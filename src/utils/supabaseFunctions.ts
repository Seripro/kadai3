import { supabase } from "./supabase";
import { InsertRecord } from "../types/recordType";

export const getAllRecords = async () => {
  const records = await supabase.from("study-record").select("*");
  return records;
};

export const insertRecord = async (record: InsertRecord) => {
  await supabase.from("study-record").insert(record);
};

export const deleteRecord = async (id: string) => {
  await supabase.from("study-record").delete().eq("id", id);
};
