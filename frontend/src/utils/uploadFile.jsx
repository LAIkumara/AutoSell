import { createClient } from '@supabase/supabase-js'

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4YmVkaGZ4cnBnenh5ZHBzeHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNDcyOTQsImV4cCI6MjA3MDkyMzI5NH0.Mkdpp_RoCHJzt8fDP2i8pOBT42lsmj81QXlNRQxOd2Y"
const supabaseUrl = "https://axbedhfxrpgzxydpsxyu.supabase.co"
const supabase = createClient(supabaseUrl, supabaseKey)

// await uploadFile('user-profile-images', file);
// await uploadFile('advertising-images', file);
export default async function UploadFile(bucketName, file) {
  try {
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}_${file.name}`;
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

