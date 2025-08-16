import { createClient } from "@supabase/supabase-js"

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4YmVkaGZ4cnBnenh5ZHBzeHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNDcyOTQsImV4cCI6MjA3MDkyMzI5NH0.Mkdpp_RoCHJzt8fDP2i8pOBT42lsmj81QXlNRQxOd2Y"
const url = "https://axbedhfxrpgzxydpsxyu.supabase.co"

const supabase = createClient(url, key)


export default function UploadUserProfileFile(file){
    const promise = new Promise(

        (resolve, reject) => {
        if (file == null) {
            reject("No file selected");
            return;
        }

        const timeStamp = new Date().getTime();
        const fileName = timeStamp + "_" + file.name;

        supabase.storage.from("user-profile-images").upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        }).then(
            ()=> {
            const publicUrl = supabase.storage.from("user-profile-images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl);
        }).catch(() => {
            reject("Failed to upload file. Please try again.");
        })
    }
)
return promise;
}