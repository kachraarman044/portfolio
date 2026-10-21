/**
 * Vercel Serverless Function: Get all contacts
 * Uses Postgres when POSTGRES_URL is configured; otherwise returns
 * contacts stored in contact.csv (read-only fallback) so the dashboard
 * still works after deployment.
 */

const fs = require('fs');
const path = require('path');

const SESSION_TOKEN = 'milan_session_token_xyz';

function parseCsv(file) {
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    return lines.map((line, i) => {
      const cells = [];
      let cur = '';
      let inQuotes = false;
      for (let c = 0; c < line.length; c++) {
        const ch = line[c];
        if (ch === '"') {
          if (inQuotes && line[c + 1] === '"') { cur += '"'; c++; }
          else inQuotes = !inQuotes;
        } else if (ch === ',' && !inQuotes) {
          cells.push(cur); cur = '';
        } else {
          cur += ch;
        }
      }
      cells.push(cur);
      return {
        id: i + 1,
        index: i + 1,
        name: cells[0] || '',
        email: cells[1] || '',
        number: cells[2] || '',
        subject: cells[3] || '',
        message: cells[4] || '',
        timestamp: cells[5] || '',
      };
    });
  } catch (err) {
    return [];
  }
}

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

  if (process.env.POSTGRES_URL) {
    try {
      const { Pool } = require('pg');
      const connectionUrl = process.env.POSTGRES_URL.split('?')[0];
      const pool = new Pool({ connectionString: connectionUrl, ssl: { rejectUnauthorized: false } });
      const { rows } = await pool.query('SELECT * FROM contacts ORDER BY id ASC');
      await pool.end();
      return res.json(rows.map((row) => ({ ...row, index: row.id })));
    } catch (dbErr) {
      console.warn('Postgres read failed, falling back to CSV:', dbErr.message);
    }
  }

  const csvPath = path.join(process.cwd(), 'contact.csv');
  return res.json(parseCsv(csvPath));
}

module.exports = handler;
