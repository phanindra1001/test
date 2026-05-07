const SYSTEM_PROMPT = `You are the AI assistant for Champions Sports Academy.
Sports: Cricket, Football, Basketball, Badminton, Swimming
Timings: Mon-Sat 6AM-8AM & 4PM-7PM
Fees: Beginners ₹1,500 | Intermediate ₹2,000 | Advanced ₹2,500
Location: Plot 42, Kondapur, Hyderabad
Contact: +91 9876543210
Keep answers short, friendly, use emojis occasionally.`;

export default async function handler(req, res) {

  // CORS — replace with client's actual domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end(); // preflight
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 500,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ]
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
}
