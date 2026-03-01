// netlify/functions/geoportal.js
// Zaktualizowana wersja – obsługuje zarówno GetParcelById (id=) jak i GetParcelByXY (xy=)

exports.handler = async (event) => {
  const params = event.queryStringParameters || {};
  const { id, xy } = params;

  let url;

  if (xy) {
    // Kliknięcie działki na mapie – GetParcelByXY
    // xy = "lng,lat,4326" (przekazane z frontendu)
    url = `https://uldk.gugik.gov.pl/?request=GetParcelByXY&xy=${encodeURIComponent(xy)}&result=geom_wkt,teryt,parcel,region,commune,county,voivodeship`;
  } else if (id) {
    // Wyszukiwanie po identyfikatorze TERYT – GetParcelById
    url = `https://uldk.gugik.gov.pl/?request=GetParcelById&id=${encodeURIComponent(id)}&result=geom_wkt`;
  } else {
    return {
      statusCode: 400,
      body: 'Brakuje parametru id lub xy',
    };
  }

  try {
    const res = await fetch(url);
    const text = await res.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: text,
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: 'Błąd proxy: ' + e.message,
    };
  }
};
