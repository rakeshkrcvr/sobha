import fs from 'fs';
import path from 'path';

// Manually load .env BEFORE importing db
try {
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/DATABASE_URL=["']?([^"'\n]+)["']?/);
    if (match && match[1]) {
      process.env.DATABASE_URL = match[1];
      console.log('DATABASE_URL loaded from .env');
    }
  }
} catch (e) {
  console.error('Failed to load .env manually');
}

// Now import db
import sql from './db';

async function setup() {
  console.log('Setting up database tables...');
  try {
    const schemaPath = path.join(process.cwd(), 'src/lib/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    const statements = schema.split(';').filter(s => s.trim().length > 0);
    
    for (const statement of statements) {
      await sql.unsafe(statement);
    }
    
    console.log('Database tables created successfully.');
    
    console.log('Seeding initial data...');
    
    const settings = [
      { key: 'phone', value: '+91 8384077107' },
      { key: 'email', value: 'arcreativehomesindia@gmail.com' },
      { key: 'address', value: 'Office No 204, 2nd floor, Nebula business Centre, Knowledge park 5, Greater Noida (west) 201306' },
      { key: 'company_name', value: 'AR Creative Homes' },
      { key: 'copyright', value: 'AR Creative Homes © Copyright 2026 All rights reserved' }
    ];

    for (const setting of settings) {
      await sql`
        INSERT INTO site_settings (key, value) 
        VALUES (${setting.key}, ${setting.value}) 
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
      `;
    }

    const locations = [
      { name: 'Greater Noida West', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80' },
      { name: 'Gurugram', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80' },
      { name: 'Noida', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80' }
    ];

    for (const loc of locations) {
      await sql`
        INSERT INTO locations (name, image) VALUES (${loc.name}, ${loc.image})
        ON CONFLICT DO NOTHING
      `;
    }

    const slides = [
      { type: 'video', src: 'https://player.vimeo.com/external/370331493.hd.mp4?s=33d77f8846c2f6d61f1d1d8a3d3d3d3d&profile_id=175', title: 'A World Where...', subtitle: 'Luxury Resides.', order_index: 0 },
      { type: 'image', src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80', title: 'Redefining the', subtitle: 'Art of Living.', order_index: 1 },
      { type: 'image', src: 'https://images.unsplash.com/photo-1600607687940-c52af036999c?auto=format&fit=crop&q=80', title: 'Experience the', subtitle: 'Soul of Home.', order_index: 2 }
    ];

    for (const slide of slides) {
      await sql`
        INSERT INTO hero_slides (type, src, title, subtitle, order_index) 
        VALUES (${slide.type}, ${slide.src}, ${slide.title}, ${slide.subtitle}, ${slide.order_index})
        ON CONFLICT DO NOTHING
      `;
    }

    console.log('Seeding completed.');
  } catch (error) {
    console.error('Database setup failed:', error);
  } finally {
    process.exit();
  }
}

setup();
