import { ref, uploadBytes, getDownloadURL, uploadString } from 'firebase/storage';
import { storage } from '../firebase';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

// Helper to upload either base64 (from cropper) or File (from input)
export const uploadFileToCloud = async (
  fileOrBase64: File | string, 
  bucketName: string, 
  isImageBase64: boolean = false
): Promise<string> => {
  // 1. Try Supabase first
  if (isSupabaseConfigured()) {
    let fileToUpload: File | Blob;
    if (typeof fileOrBase64 === 'string' && fileOrBase64.startsWith('data:')) {
      const res = await fetch(fileOrBase64);
      fileToUpload = await res.blob();
    } else {
      fileToUpload = fileOrBase64 as File;
    }

    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    const extension = typeof fileOrBase64 === 'string' ? 'jpg' : (fileOrBase64.name.split('.').pop() || 'tmp');
    const filePath = `${bucketName}/${fileName}.${extension}`;

    const { error } = await supabase.storage
      .from('public') // Assuming a public bucket or let caller pass
      .upload(filePath, fileToUpload);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('public')
      .getPublicUrl(filePath);

    return publicUrl;
  } 
  
  // 2. Fallback to Firebase Storage
  else {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    const extension = typeof fileOrBase64 === 'string' ? 'jpg' : (fileOrBase64.name.split('.').pop() || 'tmp');
    const filePath = `${bucketName}/${fileName}.${extension}`;
    
    const storageRef = ref(storage, filePath);
    
    if (typeof fileOrBase64 === 'string' && isImageBase64) {
       // uploadString for Base64 Data URL
       await uploadString(storageRef, fileOrBase64, 'data_url');
    } else {
       // uploadBytes for File object
       await uploadBytes(storageRef, fileOrBase64 as File);
    }
    
    // Get cloud URL
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  }
};
