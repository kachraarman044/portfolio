/**
 * Netlify Function: clear all contacts.
 * Reuses the same handler as the Vercel serverless function (api/admin-contacts-clear.js).
 */

const handler = require('../../api/admin-contacts-clear.js');

exports.handler = async (event) => {
  const req = {
    method: event.httpMethod,
    headers: event.headers || {},
    body: event.body ? JSON.parse(event.body) : {},
  };

  const headers = {};
  let statusCode = 200;
  let body = '';

  const res = {
    setHeader(key, value) { headers[key] = value; },
    status(code) { statusCode = code; return res; },
    json(obj) { headers['Content-Type'] = 'application/json'; body = JSON.stringify(obj); return res; },
    send(text) { body = typeof text === 'string' ? text : String(text); return res; },
    end() { return res; },
  };

  await handler(req, res);

  return {
    statusCode,
    headers,
    body,
  };
};
