import 'dotenv/config';
import pg from 'pg';

const adminUrl = process.env.DATABASE_URL?.replace('/Auth', '/postgres');
if (!adminUrl) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const targetDb = 'Auth_shadow';

const run = async () => {
  const client = new pg.Client({ connectionString: adminUrl });
  try {
    await client.connect();
    const exists = await client.query('SELECT 1 FROM pg_database WHERE datname=$1', [targetDb]);
    if (exists.rowCount === 0) {
      await client.query(`CREATE DATABASE "${targetDb}" WITH OWNER postgres`);
      console.log(`Created database ${targetDb}`);
    } else {
      console.log(`Database ${targetDb} already exists`);
    }
  } catch (e) {
    console.error('Failed to ensure shadow DB:', e.message);
    process.exit(2);
  } finally {
    await client.end().catch(() => {});
  }
};

run();
