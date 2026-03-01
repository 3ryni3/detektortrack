// netlify/functions/geoportal.js
// Proxy dla Geoportalu ULDK API – poprawiona wersja

exports.handler = async (event) => {
  const params = event.queryStringParameters || {};
  const id = params.id;

  if (!id) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Brak identyfikatora działki' })
    };
  }

  const url = `https://uldk.gugik.gov.pl/?request=GetParcelById&id=${encodeURIComponent(id)}&result=geom_wkt,teryt,voivodeship,county,commune,region,parcel&srid=4326`;

  console.log('Zapytanie ULDK:', url);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 DetektorTrack/3.0',
        'Accept': 'text/plain',
      }
    });

    const text = await response.text();
    console.log('Odpowiedź ULDK (pierwsze 300 znaków):', text.substring(0, 300));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: text,
    };
  } catch (err) {
    console.error('Błąd ULDK:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
