import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/DATABASE_URL=["']?([^"'\n]+)["']?/);
if (match && match[1]) {
  process.env.DATABASE_URL = match[1];
}

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

async function addPagesTable() {
  console.log('Creating pages table...');
  await sql`
    CREATE TABLE IF NOT EXISTS pages (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      content JSONB,
      template_type VARCHAR(50) DEFAULT 'default',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  console.log('Seeding our-founder page...');
  const founderContent = [
    {
      name: "Amit Kumar Chaudhary",
      designation: "Managing Director - Operation & Sales",
      quote: "We don't just build properties, we create trust, lifestyle, and landmarks that inspire future generations.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
    },
    {
      name: "Ravi Kumar",
      designation: "Managing Director - Marketing & Sales",
      quote: "Every foundation we lay carries a promise of excellence, transparency, and modern living.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80"
    }
  ];

  await sql`
    INSERT INTO pages (slug, title, content, template_type)
    VALUES ('our-founder', 'Our Founder', ${sql.json(founderContent)}, 'founder')
    ON CONFLICT (slug) DO NOTHING
  `;

  console.log('Done.');
  process.exit();
}

addPagesTable();
