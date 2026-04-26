export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    
    if (!body.email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const apiKey = env.BREVO_API_KEY;
    
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Server configuration error: Missing API Key' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Call Brevo API
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        email: body.email,
        updateEnabled: true // Updates contact if they already exist instead of throwing an error
      })
    });

    const data = await brevoResponse.json();

    if (!brevoResponse.ok) {
      return new Response(JSON.stringify({ error: data.message || 'Failed to subscribe' }), { 
        status: brevoResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Subscribed successfully!' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
