import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

// Extract DATABASE_URL from .env
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/DATABASE_URL=["']?([^"'\n]+)["']?/);
if (match && match[1]) {
  process.env.DATABASE_URL = match[1];
}

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

async function migrateHomepage() {
  console.log('Starting homepage content migration...');

  // 1. Fetch current hero slides
  console.log('Fetching legacy hero slides...');
  let slides: any[] = [];
  try {
    slides = await sql`SELECT * FROM hero_slides ORDER BY order_index ASC`;
    console.log(`Found ${slides.length} slides.`);
  } catch (err) {
    console.warn('Failed to fetch legacy slides (probably empty or table missing):', err);
  }

  // 2. Fetch current brand philosophy
  console.log('Fetching legacy brand philosophy...');
  let brandData: any = null;
  try {
    const rows = await sql`SELECT * FROM brand_content WHERE section_slug = 'philosophy' LIMIT 1`;
    if (rows && rows.length > 0) {
      brandData = rows[0];
      console.log('Found legacy brand philosophy text.');
    }
  } catch (err) {
    console.warn('Failed to fetch legacy brand content:', err);
  }

  // 3. Format slides for the new modular section content
  const sliderItems = slides.length > 0 
    ? slides.map((s) => ({
        src: s.src,
        type: s.type || 'image',
        title: s.title || '',
        subtitle: s.subtitle || ''
      }))
    : [
        {
          src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
          type: 'image',
          title: 'Luxury Residences',
          subtitle: 'Welcome to AR Creative Homes'
        }
      ];

  // 4. Format brand philosophy
  const brandTitle = brandData?.title || 'Our Philosophy';
  const brandSubtitle = brandData?.subtitle || 'Crafting Timeless Lifestyles';
  const brandDesc = brandData?.description || 'At AR Creative Homes, our philosophy is anchored in transparency, luxury finishes, and highly reliable structural designs.';
  const brandImg = brandData?.image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80';

  // 5. Construct modular content array
  const homepageContent = [
    {
      type: 'home_slider',
      items: sliderItems
    },
    {
      type: 'cities_grid',
      title: 'Choose Your Lifestyle City'
    },
    {
      type: 'brand_philosophy',
      title: brandTitle,
      subtitle: brandSubtitle,
      description: brandDesc,
      image: brandImg
    },
    {
      type: 'more_about_ar',
      title: 'MORE ABOUT AR CREATIVE',
      subtitle: 'Premium Real Estate Brand in Greater Noida West & NCR',
      items: [
        {
          title: 'MEDIA CENTRE',
          description: 'Your source for the latest news and updates from AR Creative Homes. Access our brand assets and news coverage.',
          image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80',
          link: '#'
        },
        {
          title: 'SMART INVESTMENTS',
          description: 'Explore highly profitable investment opportunities across Greater Noida West and NCR, curated by our expert team.',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80',
          link: '#'
        },
        {
          title: 'AR BLOG',
          description: 'Get latest insights from the real estate sector and in-depth views on property investment avenues from our experts.',
          image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80',
          link: '#'
        }
      ]
    }
  ];

  // 6. Insert/Upsert into pages table
  console.log('Inserting homepage into pages table...');
  await sql`
    INSERT INTO pages (slug, title, content, template_type)
    VALUES ('home', 'Home', ${sql.json(homepageContent)}, 'modular')
    ON CONFLICT (slug) 
    DO UPDATE SET 
      content = EXCLUDED.content,
      template_type = EXCLUDED.template_type
  `;

  console.log('Homepage migration completed successfully!');
  process.exit(0);
}

migrateHomepage().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
