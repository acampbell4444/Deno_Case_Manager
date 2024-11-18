import { createClient } from "@supabase/supabase-js";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
const env_vars = await load({ envPath: "./.env" });

export const supabase = createClient(
    env_vars.SUP_URL,
    env_vars.SUP_KEY
);



export const fetchEvidenceByBookId = async (
  evidenceBookId: string,
  supabase: any,
) => {
  try {
    const { data, error } = await supabase
      .from("ev_entries")
      .select("*")
      .eq("evidence_book_id", evidenceBookId);

    if (error) return (error.message);
    return data as any;
  } catch (error) {
    return error instanceof Error ? error.message : "Unknown error";
  }
};

const BUCKET_NAME = "evidence_attachments"; //TODO: make dynamic

// uploadEvidenceFile
export const uploadEvidenceFile = async (
  { file, newFileName }: any,
  supabase: any,
) => {
  
  try {
    const { data, error } = await supabase
      .storage
      .from(BUCKET_NAME)
      .upload(newFileName, file);

    if (error) return (error.message);

    const urlFetchResponse = supabase
      .storage
      .from(BUCKET_NAME)
      .getPublicUrl(newFileName);

    const s3Url = urlFetchResponse.data?.publicUrl;
    return { s3Url: s3Url || "" };
  } catch (error) {
    return error instanceof Error ? error.message : "Unknown error";
  }
};

// createEvidenceRecord
export const createEvidenceRecord = async (
  saveBody: any,
  supabase: any,
) => {
  try {
    const { data, error } = await supabase
      .from("ev_entries")
      .insert(saveBody)
      .single();

    if (error) return (error.message);
    return data as any;
  } catch (error) {
    return error instanceof Error ? error.message : "Unknown error";
  }
};

// fetchAllEvidenceBooksByUserId
export const fetchAllEvidenceBooksByUserId = async (
  userId: string,
  supabase: any,
) => {
  try {
    const user_id = env_vars.SUP_USER; //TODO: make dynamic
    const { data, error } = await supabase
      .from("ev_books")
      .select("*")
      .eq("user_id", user_id);

    if (error) return (error.message);
    return data as any;
  } catch (error) {
    return error instanceof Error ? error.message : "Unknown error";
  }
};

export const deleteEvidenceRecord = async (
  { id, fileName }: any,
  supabase: any,
) => {
  console.log("deleteEvidenceRecord", id, fileName);
  try {
    const deleteS3Response = await supabase
      .storage
      .from(BUCKET_NAME)
      .remove([fileName]);

    const { data, error } = await supabase
      .from("ev_entries")
      .delete()
      .eq("id", id);

    if (error) return (error.message);
    return deleteS3Response as any;
  } catch (error) {
    return error instanceof Error ? error.message : "Unknown error";
  }
};
