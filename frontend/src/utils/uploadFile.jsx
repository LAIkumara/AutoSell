import { createClient } from '@supabase/supabase-js'

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4YmVkaGZ4cnBnenh5ZHBzeHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNDcyOTQsImV4cCI6MjA3MDkyMzI5NH0.Mkdpp_RoCHJzt8fDP2i8pOBT42lsmj81QXlNRQxOd2Y"
const supabaseUrl = "https://axbedhfxrpgzxydpsxyu.supabase.co"
const supabase = createClient(supabaseUrl, supabaseKey)

// await uploadFile('user-profile-images', file);
// await uploadFile('advertising-images', file);
export async function uploadFile(bucketName, file) {
  if (!file) {
    throw new Error("No file selected");
  }

  const timestamp = new Date().getTime();
  const filename = `${timestamp}_${file.name}`;

  try {
    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filename);

    return publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error("Failed to upload file. Please try again.");
  }
}

