// netlify/functions/geoportal.js
// Proxy dla Geoportalu – omija blokadę CORS
exports.handler = async (event) => {
  const { gmina, obreb, numer } = event.queryStringParameters || {};

  if (!numer) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Brak numeru działki' }) };
  }

  // Budujemy zapytanie WFS do Geoportalu (ULDK API)
  const query = encodeURIComponent(numer);
  const obrebParam = obreb ? `&obreb=${encodeURIComponent(obreb)}` : '';
  const gminaParam = gmina ? `&gmina=${encodeURIComponent(gmina)}` : '';

  const url = `https://uldk.gugik.gov.pl/?request=GetParcelById&id=${query}${obrebParam}${gminaParam}&result=geom_wkt,teryt,voivodeship,county,commune,region,parcel&srid=4326`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'DetektorTrack/2.0' }
    });
    const text = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Błąd połączenia z Geoportalem', details: err.message }),
    };
  }
};
