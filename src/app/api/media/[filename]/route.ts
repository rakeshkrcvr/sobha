import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ filename: string }> }) {
  try {
    const { filename } = await params;
    const filepath = path.join(process.cwd(), 'public/uploads', filename);

    if (!fs.existsSync(filepath)) {
      return new NextResponse('Not found', { status: 404 });
    }

    const buffer = fs.readFileSync(filepath);
    
    // Determine content type
    let contentType = 'image/jpeg';
    if (filename.endsWith('.png')) contentType = 'image/png';
    else if (filename.endsWith('.gif')) contentType = 'image/gif';
    else if (filename.endsWith('.webp')) contentType = 'image/webp';
    else if (filename.endsWith('.mp4')) contentType = 'video/mp4';

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
