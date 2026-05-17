import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

const cities = [
  "Noida",
  "Noida Extension",
  "Greater Noida",
  "Ghaziabad",
  "Meerut",
  "Hapur",
  "Faridabad",
  "Gurugram"
];

const categories = ["Residential", "Commercial"];
const amenitiesList = [
  "Swimming Pool", "Gymnasium", "Club House", "24/7 Security", "Power Backup",
  "Landscaped Gardens", "Children's Play Area", "Jogging Track", "Tennis Court",
  "Yoga Pavilion", "Smart Home Features", "Concierge Service"
];

const generateProjects = () => {
  const projects = [];
  let idCounter = 1;

  for (let i = 0; i < 50; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.floor(Math.random() * 50) + 50; // 50 Lakhs to 100+ Lakhs
    
    // Select 4 random amenities
    const shuffled = [...amenitiesList].sort(() => 0.5 - Math.random());
    const amenities = shuffled.slice(0, 4);

    projects.push({
      title: `AR ${city} ${category === 'Residential' ? 'Residences' : 'Business Tower'} ${Math.floor(Math.random() * 100)}`,
      image: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?auto=format&fit=crop&q=80&w=800&h=600`, // random placeholder image seed
      category: category,
      location_name: city,
      description: `Experience luxury and convenience at this premium ${category.toLowerCase()} development in the heart of ${city}. Featuring modern architecture, world-class amenities, and excellent connectivity.`,
      is_featured: Math.random() > 0.8, // 20% chance to be featured
    });
  }
  return projects;
};

async function seed() {
  console.log("Seeding 50 projects...");
  
  // Clear existing projects to avoid duplicates if re-run
  await sql`DELETE FROM projects`;

  const projects = generateProjects();

  for (const project of projects) {
    // We will use standard generic Unsplash real estate images
    const imageUrl = project.category === 'Residential' 
      ? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'
      : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800';

    await sql`
      INSERT INTO projects (title, image, category, location_name, description, is_featured, is_active)
      VALUES (
        ${project.title}, 
        ${imageUrl}, 
        ${project.category}, 
        ${project.location_name}, 
        ${project.description}, 
        ${project.is_featured}, 
        TRUE
      )
    `;
  }

  console.log("Successfully seeded 50 projects!");
  process.exit(0);
}

seed().catch(console.error);
