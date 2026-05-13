import sql from './db';

async function seed() {
  console.log('Seeding database...');

  try {
    // 1. Site Settings
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

    // 2. Locations
    const locations = [
      { name: 'Greater Noida West', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80' },
      { name: 'Gurugram', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80' },
      { name: 'Noida', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80' }
    ];

    for (const loc of locations) {
      await sql`
        INSERT INTO locations (name, image) VALUES (${loc.name}, ${loc.image})
      `;
    }

    // 3. Projects
    const projects = [
      { title: 'AR Elite Residences', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80', category: 'Residential', location_name: 'Greater Noida West', is_featured: true },
      { title: 'Creative Urban Spaces', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80', category: 'Residential', location_name: 'Noida', is_featured: true },
      { title: 'Nebula Business Suites', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80', category: 'Commercial', location_name: 'Greater Noida West', is_featured: true },
      { title: 'The Grand Arch', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80', category: 'Residential', location_name: 'Gurugram', is_featured: true }
    ];

    for (const proj of projects) {
      await sql`
        INSERT INTO projects (title, image, category, location_name, is_featured) 
        VALUES (${proj.title}, ${proj.image}, ${proj.category}, ${proj.location_name}, ${proj.is_featured})
      `;
    }

    // 4. Hero Slides
    const slides = [
      { type: 'video', src: 'https://player.vimeo.com/external/370331493.hd.mp4?s=33d77f8846c2f6d61f1d1d8a3d3d3d3d&profile_id=175', title: 'A World Where...', subtitle: 'Luxury Resides.', order_index: 0 },
      { type: 'image', src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80', title: 'Redefining the', subtitle: 'Art of Living.', order_index: 1 },
      { type: 'image', src: 'https://images.unsplash.com/photo-1600607687940-c52af036999c?auto=format&fit=crop&q=80', title: 'Experience the', subtitle: 'Soul of Home.', order_index: 2 }
    ];

    for (const slide of slides) {
      await sql`
        INSERT INTO hero_slides (type, src, title, subtitle, order_index) 
        VALUES (${slide.type}, ${slide.src}, ${slide.title}, ${slide.subtitle}, ${slide.order_index})
      `;
    }

    // 5. Brand Content
    await sql`
      INSERT INTO brand_content (section, title, subtitle, content) 
      VALUES (
        'philosophy', 
        'Crafting Lifestyles', 
        'AR Creative Homes is a modern real estate brand committed to creating premium lifestyles and smart investment opportunities.',
        ${JSON.stringify({ 
          paragraph1: 'AR Creative Homes is a modern real estate brand committed to creating premium lifestyles and smart investment opportunities. With a perfect blend of luxury, innovation, and trust, we redefine urban living.',
          paragraph2: 'Our philosophy is simple — exceptional spaces create exceptional lives. We focus on projects that offer elegant architecture, premium amenities, and long-term value appreciation across Greater Noida West and NCR.'
        })}
      )
      ON CONFLICT (section) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content
    `;

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit();
  }
}

seed();
