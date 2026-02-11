import { createClient } from "@supabase/supabase-js";

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

export async function createContactSubmission(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  sms_consent?: boolean;
}): Promise<number> {
  const supabase = getServerSupabase();
  const { data: row, error } = await supabase
    .from("contact_submissions")
    .insert(data)
    .select("id")
    .single();

  if (error) throw error;
  return row!.id;
}

export async function createLead(data: {
  name: string;
  email: string;
  phone?: string;
  property_type: string;
  property_count: string;
  revenue?: string | null;
  location?: string | null;
  sms_consent?: boolean;
}): Promise<number> {
  const supabase = getServerSupabase();
  const { data: row, error } = await supabase
    .from("leads")
    .insert(data)
    .select("id")
    .single();

  if (error) throw error;
  return row!.id;
}
