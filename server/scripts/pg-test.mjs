import 'dotenv/config';
import pg from 'pg';

const main = async () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('No DATABASE_URL set');
    process.exit(1);
  }
  console.log('Testing DATABASE_URL...');
  const client = new pg.Client({ connectionString: url });
  try {
    await client.connect();
    const res = await client.query('SELECT current_database() as db, version();');
    console.log('Connected OK:', res.rows[0].db, '\nVersion:', res.rows[0].version.split('\n')[0]);
  } catch (e) {
    console.error('DATABASE_URL failed:', e.message);
    if (e.code) console.error('code:', e.code);
  } finally {
    await client.end().catch(() => {});
  }

  const shadow = process.env.SHADOW_DATABASE_URL;
  if (!shadow) {
    console.warn('No SHADOW_DATABASE_URL set');
    return;
  }
  console.log('Testing SHADOW_DATABASE_URL...');
  const shadowClient = new pg.Client({ connectionString: shadow });
  try {
    await shadowClient.connect();
    const res = await shadowClient.query('SELECT current_database() as db, version();');
    console.log('Shadow Connected OK:', res.rows[0].db, '\nVersion:', res.rows[0].version.split('\n')[0]);
  } catch (e) {
    console.error('SHADOW_DATABASE_URL failed:', e.message);
    if (e.code) console.error('code:', e.code);
  } finally {
    await shadowClient.end().catch(() => {});
  }
};

main().catch((e) => {
  console.error('Unexpected error:', e);
  process.exit(2);
});
