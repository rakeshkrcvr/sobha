"use server";

import sql from "./db";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

// --- Hero Slides Actions ---

export async function getHeroSlides() {
  noStore();
  return await sql`SELECT * FROM hero_slides ORDER BY order_index ASC`;
}

export async function updateHeroSlide(id: number, data: any) {
  await sql`
    UPDATE hero_slides 
    SET type = ${data.type}, src = ${data.src}, title = ${data.title}, subtitle = ${data.subtitle}
    WHERE id = ${id}
  `;
  revalidatePath("/");
  revalidatePath("/admin/hero");
}

export async function addHeroSlide() {
  const currentMax = await sql`SELECT MAX(order_index) as max_idx FROM hero_slides`;
  const nextIdx = (currentMax[0].max_idx || 0) + 1;
  
  await sql`
    INSERT INTO hero_slides (type, src, title, subtitle, order_index)
    VALUES ('image', '', 'New Slide', 'Subtitle', ${nextIdx})
  `;
  revalidatePath("/");
  revalidatePath("/admin/hero");
}

export async function deleteHeroSlide(id: number) {
  await sql`DELETE FROM hero_slides WHERE id = ${id}`;
  revalidatePath("/");
  revalidatePath("/admin/hero");
}

// --- Projects Actions ---

export async function getProjects() {
  noStore();
  return await sql`SELECT * FROM projects ORDER BY created_at DESC`;
}

export async function addProject(data: any) {
  await sql`
    INSERT INTO projects (title, image, category, location_name, description, is_featured)
    VALUES (${data.title}, ${data.image}, ${data.category}, ${data.location_name}, ${data.description}, ${data.is_featured})
  `;
  revalidatePath("/");
  revalidatePath("/residential");
}

export async function updateProject(id: number, data: any) {
  await sql`
    UPDATE projects 
    SET title = ${data.title}, image = ${data.image}, category = ${data.category}, 
        location_name = ${data.location_name}, description = ${data.description}, 
        is_featured = ${data.is_featured}
    WHERE id = ${id}
  `;
  revalidatePath("/");
  revalidatePath("/residential");
}

export async function deleteProject(id: number) {
  await sql`DELETE FROM projects WHERE id = ${id}`;
  revalidatePath("/");
  revalidatePath("/residential");
}

// --- Locations Actions ---

export async function getLocations() {
  noStore();
  return await sql`SELECT * FROM locations ORDER BY name ASC`;
}

export async function addLocation(data: any) {
  await sql`
    INSERT INTO locations (name, image)
    VALUES (${data.name}, ${data.image})
  `;
  revalidatePath("/");
  revalidatePath("/admin/locations");
}

export async function updateLocation(id: number, data: any) {
  await sql`
    UPDATE locations 
    SET name = ${data.name}, image = ${data.image}
    WHERE id = ${id}
  `;
  revalidatePath("/");
  revalidatePath("/admin/locations");
}

export async function deleteLocation(id: number) {
  await sql`DELETE FROM locations WHERE id = ${id}`;
  revalidatePath("/");
  revalidatePath("/admin/locations");
}

// --- Site Settings Actions ---

export async function getSettings() {
  noStore();
  const result = await sql`SELECT key, value FROM site_settings`;
  const settings: Record<string, string> = {};
  result.forEach(row => {
    settings[row.key] = row.value;
  });
  return settings;
}

export async function updateSettings(settings: Record<string, string>) {
  for (const [key, value] of Object.entries(settings)) {
    await sql`
      INSERT INTO site_settings (key, value) 
      VALUES (${key}, ${value}) 
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `;
  }
  revalidatePath("/");
}

// --- Brand Content Actions ---

export async function getBrandContent(section: string) {
  noStore();
  const result = await sql`SELECT * FROM brand_content WHERE section = ${section}`;
  return result[0];
}

export async function updateBrandContent(section: string, data: any) {
  await sql`
    INSERT INTO brand_content (section, title, content) 
    VALUES (${section}, ${data.title}, ${JSON.stringify(data.content)})
    ON CONFLICT (section) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content
  `;
  revalidatePath("/");
}

// Pages
export async function getPages() {
  noStore();
  try {
    const pages = await sql`SELECT * FROM pages ORDER BY title ASC`;
    return pages;
  } catch (error) {
    console.error('Failed to fetch pages:', error);
    return [];
  }
}

export async function getPageBySlug(slug: string) {
  noStore();
  try {
    const pages = await sql`SELECT * FROM pages WHERE slug = ${slug}`;
    return pages[0] || null;
  } catch (error) {
    console.error(`Failed to fetch page ${slug}:`, error);
    return null;
  }
}

export async function updatePage(slug: string, title: string, content: any, template_type: string) {
  try {
    const result = await sql`
      INSERT INTO pages (slug, title, content, template_type)
      VALUES (${slug}, ${title}, ${sql.json(content)}, ${template_type})
      ON CONFLICT (slug) DO UPDATE 
      SET title = EXCLUDED.title, content = EXCLUDED.content, template_type = EXCLUDED.template_type, updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    revalidatePath(`/who-we-are/${slug}`);
    revalidatePath(`/what-we-do/${slug}`);
    revalidatePath('/admin/pages');
    return { success: true, page: result[0] };
  } catch (error) {
    console.error('Failed to update page:', error);
    return { success: false, error: 'Failed to update page' };
  }
}
