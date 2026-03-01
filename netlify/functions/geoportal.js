// netlify/functions/geoportal.js
exports.handler = async (event) => {
  const params = event.queryStringParameters || {};
  const { id, xy } = params;

  let url;

  if (xy) {
    // xy = "lng,lat,4326" – NIE uzywamy encodeURIComponent bo przecinki musza zostac
    url = `https://uldk.gugik.gov.pl/?request=GetParcelByXY&xy=${xy}&result=geom_wkt,teryt,parcel,region,commune,county,voivodeship`;
  } else if (id) {
    url = `https://uldk.gugik.gov.pl/?request=GetParcelById&id=${encodeURIComponent(id)}&result=geom_wkt`;
  } else {
    return { statusCode: 400, body: 'Brakuje parametru id lub xy' };
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
