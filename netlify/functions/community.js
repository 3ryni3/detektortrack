// netlify/functions/community.js
// API dla wspólnej mapy znalezisk społeczności

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  const base = `${SUPABASE_URL}/rest/v1/community_finds`;
  const authHeaders = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
  };

  // GET – pobierz znaleziska społeczności
  if (event.httpMethod === 'GET') {
    try {
      const res = await fetch(`${base}?select=*&order=created_at.desc&limit=200`, { headers: authHeaders });
      const data = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
    }
  }

  // POST – dodaj znalezisko do społeczności
  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      const find = {
        name: body.name,
        category: body.cat,
        depth_cm: body.depth || null,
        note: body.note || null,
        lat: body.lat,
        lng: body.lng,
        region: body.region || null,
        nickname: body.nickname || 'Anonim',
        has_photo: !!body.photo,
      };
      const res = await fetch(base, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(find),
      });
      const data = await res.json();
      return { statusCode: 201, headers, body: JSON.stringify(data) };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
    }
  }

  return { statusCode: 405, headers, body: 'Method not allowed' };
};
