import { getFeatures } from '../../lib/googleSheets.js';

export default async function handler(req, res) {
  
  const id = req.params?.id || req.query?.id;

 /*  console.log("Requested ID:", id);
  console.log("Full params object:", req.params);
  console.log("Full query object:", req.query); */

  try {
    const features = await getFeatures();
   
    const feature = features.find(f => f.id === id);

    if (!feature) {
      console.warn("Feature not found for ID:", id);
      return res.status(404).json({ message: 'Feature not found' });
    }

    res.json(feature);
  } catch (err) {
    console.error("Handler error:", err.message);
    res.status(500).json({ message: err.message });
  }
}