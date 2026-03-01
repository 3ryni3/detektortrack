// netlify/functions/geoportal.js
exports.handler = async (event) => {
  const p = event.queryStringParameters || {};

  let url;

  if (p.lat && p.lng) {
    // GetParcelByXY – klikniecie dzialki na mapie
    // Osobne parametry lat/lng zeby uniknac problemu z przecinkami w URL
    url = `https://uldk.gugik.gov.pl/?request=GetParcelByXY&xy=${p.lng},${p.lat},4326&result=geom_wkt,teryt,parcel,region,commune,county,voivodeship`;
  } else if (p.id) {
    // GetParcelById – wyszukiwanie po TERYT
    url = `https://uldk.gugik.gov.pl/?request=GetParcelById&id=${encodeURIComponent(p.id)}&result=geom_wkt`;
  } else {
    return { statusCode: 400, body: 'Brakuje parametru: id lub lat+lng' };
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
    return { statusCode: 500, body: 'Blad proxy: ' + e.message };
  }
};
