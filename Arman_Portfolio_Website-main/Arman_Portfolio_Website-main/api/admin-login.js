/**
 * Vercel Serverless Function: Admin Login
 * Mirrors the local /api/admin/login endpoint from server.js.
 */

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'milan123';
const SESSION_TOKEN = 'milan_session_token_xyz';

function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  if (password === ADMIN_PASSWORD) {
    return res.status(200).json({ token: SESSION_TOKEN });
  }
  return res.status(401).send('Incorrect password');
}

module.exports = handler;
