/**
 * Vercel Serverless Function: Clear all contacts
 */

const SESSION_TOKEN = 'milan_session_token_xyz';

async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.headers['authorization'] !== `Bearer ${SESSION_TOKEN}`) {
    return res.status(401).send('Unauthorized');
  }

  if (!process.env.POSTGRES_URL) {
    return res.status(503).send('Persistent storage not configured (POSTGRES_URL missing)');
  }

  try {
    const { Pool } = require('pg');
    const connectionUrl = process.env.POSTGRES_URL.split('?')[0];
    const pool = new Pool({ connectionString: connectionUrl, ssl: { rejectUnauthorized: false } });
    await pool.query('DELETE FROM contacts');
    await pool.query("DELETE FROM sqlite_sequence WHERE name='contacts'").catch(() => {});
    await pool.end();
    return res.status(200).send('Cleared all contacts');
  } catch (err) {
    console.error('Failed to clear contacts', err.message);
    return res.status(500).send('Failed to clear');
  }
}

module.exports = handler;
