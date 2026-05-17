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

async function updateLocations() {
  console.log('Clearing old locations...');
  await sql`DELETE FROM locations`;
  
  console.log('Adding new locations...');
  const newLocations = [
    { name: 'Noida', image: 'https://images.unsplash.com/photo-1574627252277-3e1dc8dfc384?auto=format&fit=crop&q=80' },
    { name: 'Noida Extension', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80' },
    { name: 'Greater Noida', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80' },
    { name: 'Ghaziabad', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80' },
    { name: 'Meerut', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80' },
    { name: 'Hapur', image: 'https://images.unsplash.com/photo-1430285561322-7808604715df?auto=format&fit=crop&q=80' },
    { name: 'Faridabad', image: 'https://images.unsplash.com/photo-1600607687940-c52af036999c?auto=format&fit=crop&q=80' },
    { name: 'Gurugram', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80' }
  ];

  for (const loc of newLocations) {
    await sql`
      INSERT INTO locations (name, image) VALUES (${loc.name}, ${loc.image})
      ON CONFLICT DO NOTHING
    `;
  }

  console.log('Locations updated.');
  process.exit();
}

updateLocations();
