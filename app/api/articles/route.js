import { NextResponse } from 'next/server';
import { getCMSData, saveCMSData } from '../../../lib/data';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const data = getCMSData();
  return NextResponse.json(data.articles);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = getCMSData();
    
    const newArticle = {
      id: Date.now().toString(),
    };

    for (const [key, value] of formData.entries()) {
      if (key !== 'imageFile') {
        newArticle[key] = value;
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
      newArticle.img = `/images/${filename}`;
    }
    
    data.articles.push(newArticle);
    saveCMSData(data);
    
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const data = getCMSData();
    const id = formData.get('id');
    
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const index = data.articles.findIndex(art => art.id === id);
    if (index === -1) return NextResponse.json({ error: 'Article not found' }, { status: 404 });

    const updatedArticle = { ...data.articles[index] };

    for (const [key, value] of formData.entries()) {
      if (key !== 'imageFile' && key !== 'id') {
        updatedArticle[key] = value;
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
      updatedArticle.img = `/images/${filename}`;
    }
    
    data.articles[index] = updatedArticle;
    saveCMSData(data);
    
    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    
    const data = getCMSData();
    data.articles = data.articles.filter(art => art.id !== id);
    saveCMSData(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
