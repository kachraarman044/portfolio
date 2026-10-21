/**
 * Vercel Serverless Function: Delete a contact by id
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

  const { index } = req.body || {};
  if (index === undefined) return res.status(400).send('Index is required');

  if (!process.env.POSTGRES_URL) {
    return res.status(503).send('Persistent storage not configured (POSTGRES_URL missing)');
  }

  try {
    const { Pool } = require('pg');
    const connectionUrl = process.env.POSTGRES_URL.split('?')[0];
    const pool = new Pool({ connectionString: connectionUrl, ssl: { rejectUnauthorized: false } });
    await pool.query('DELETE FROM contacts WHERE id = $1', [index]);
    await pool.end();
    return res.status(200).send('Deleted successfully');
  } catch (err) {
    console.error('Failed to delete contact', err.message);
    return res.status(500).send('Failed to delete');
  }
}

module.exports = handler;
