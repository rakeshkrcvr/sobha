"use server";

import sql from "./db";
import { revalidatePath } from "next/cache";

// --- Hero Slides Actions ---

export async function getHeroSlides() {
  return await sql`SELECT * FROM hero_slides ORDER BY order_index ASC`;
}

export async function updateHeroSlide(id: number, data: any) {
  await sql`
    UPDATE hero_slides 
    SET type = ${data.type}, src = ${data.src}, title = ${data.title}, subtitle = ${data.subtitle}
    WHERE id = ${id}
  `;
  revalidatePath("/");
}

// --- Projects Actions ---

export async function getProjects() {
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
  return await sql`SELECT * FROM locations ORDER BY name ASC`;
}

export async function addLocation(data: any) {
  await sql`
    INSERT INTO locations (name, image)
    VALUES (${data.name}, ${data.image})
  `;
  revalidatePath("/");
}

// --- Site Settings Actions ---

export async function getSettings() {
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
