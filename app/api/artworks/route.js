import { NextResponse } from 'next/server';
import { getCMSData, saveCMSData } from '../../../lib/data';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const data = getCMSData();
  return NextResponse.json(data.artworks);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = getCMSData();
    
    const newArtwork = {
      id: Date.now().toString(),
    };

    for (const [key, value] of formData.entries()) {
      if (key !== 'imageFile') {
        newArtwork[key] = value;
      }
    }

    const file = formData.get('imageFile');
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const imgDir = path.join(process.cwd(), 'public', 'images');
      
      if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(imgDir, filename), buffer);
      newArtwork.img = `/images/${filename}`;
    }
    
    data.artworks.push(newArtwork);
    saveCMSData(data);
    
    return NextResponse.json(newArtwork, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create artwork' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const data = getCMSData();
    const id = formData.get('id');
    
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const index = data.artworks.findIndex(art => art.id === id);
    if (index === -1) return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });

    const updatedArtwork = { ...data.artworks[index] };

    for (const [key, value] of formData.entries()) {
      if (key !== 'imageFile' && key !== 'id') {
        updatedArtwork[key] = value;
      }
    }

    const file = formData.get('imageFile');
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const imgDir = path.join(process.cwd(), 'public', 'images');
      
      if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(imgDir, filename), buffer);
      updatedArtwork.img = `/images/${filename}`;
    }
    
    data.artworks[index] = updatedArtwork;
    saveCMSData(data);
    
    return NextResponse.json(updatedArtwork, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update artwork' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    
    const data = getCMSData();
    data.artworks = data.artworks.filter(art => art.id !== id);
    saveCMSData(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete artwork' }, { status: 500 });
  }
}
