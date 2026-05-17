import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Try uploading to Catbox first (works perfectly on Vercel read-only filesystem!)
    try {
      const catboxForm = new FormData();
      catboxForm.append('reqtype', 'fileupload');
      catboxForm.append('fileToUpload', file);

      const catboxResponse = await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: catboxForm,
      });

      if (catboxResponse.ok) {
        const url = await catboxResponse.text();
        if (url && url.startsWith('http')) {
          console.log('Uploaded successfully to Catbox:', url);
          return NextResponse.json({ url: url.trim() });
        }
      }
    } catch (catboxErr) {
      console.warn('Catbox upload failed, falling back to local storage:', catboxErr);
    }

    // Fallback: Local Storage (only works locally, not on Vercel)
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create safe filename
    const originalName = file.name || 'upload';
    const ext = originalName.includes('.') ? originalName.split('.').pop() : 'bin';
    const filename = `${Date.now()}-${Math.round(Math.random() * 1000)}.${ext}`;
    
    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    return NextResponse.json({ url: `/api/media/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
