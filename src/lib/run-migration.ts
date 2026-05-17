import "./load-env";
import sql from "./db";

async function run() {
  console.log("Running migration with hoisted env loader...");
  try {
    await sql`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS map_iframe TEXT,
      ADD COLUMN IF NOT EXISTS location_advantages JSONB
    `;
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    process.exit(0);
  }
}

run();
