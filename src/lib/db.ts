import postgres from 'postgres';

const globalForPostgres = globalThis as unknown as {
  sql: postgres.Sql | undefined;
};

const sql = globalForPostgres.sql ?? postgres(process.env.DATABASE_URL!, { 
  ssl: 'require',
  max: process.env.NODE_ENV === 'production' ? 10 : 2, // Limit connections in dev to prevent pool exhaustion
  idle_timeout: 10, // Automatically close idle connections after 10 seconds
  connect_timeout: 15, // Timeout after 15 seconds to prevent hanging
});

if (process.env.NODE_ENV !== 'production') globalForPostgres.sql = sql;

export default sql;
