// Relay: luxepods.ie quote form -> Luxe Pods lead board
const APP = '6ae9f5347251025f418c1272';
const FN = 'https://luxe-pods-418c1272.base44.app/api/apps/' + APP + '/functions/submitLead';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (body.action !== 'external') return res.status(400).json({ error: 'bad request' });
    const r = await fetch(FN, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-App-Id': APP }, body: JSON.stringify(body) });
    const data = await r.json().catch(() => ({}));
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'relay error' });
  }
}
