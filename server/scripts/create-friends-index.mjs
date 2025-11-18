import 'dotenv/config';
import pg from 'pg';

const sql = `
CREATE UNIQUE INDEX IF NOT EXISTS "Friends_pair_unq"
ON "Friends" (
  LEAST("friend1Id", "friend2Id"),
  GREATEST("friend1Id", "friend2Id")
);
`;

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL is not set');
    process.exit(1);
  }
  const client = new pg.Client({ connectionString: url });
  try {
    await client.connect();
    
    const check = await client.query(`SELECT to_regclass('public."Friends"') as reg;`);
    if (!check.rows[0].reg) {
      throw new Error('Table "Friends" does not exist yet. Run Prisma (db push/migrate) first.');
    }
    await client.query(sql);
    console.log('Created/ensured unique index "Friends_pair_unq" on Friends.');
  } catch (e) {
    console.error('Failed to create index:', e.message);
    process.exit(2);
  } finally {
    await client.end().catch(() => {});
  }
}

main();
