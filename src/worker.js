export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle POST /api/subscribe — Brevo newsletter signup
    if (url.pathname === '/api/subscribe' && request.method === 'POST') {
      try {
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

        const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': apiKey
          },
          body: JSON.stringify({
            email: body.email,
            updateEnabled: true
          })
        });

        // Brevo returns 204 No Content on success for existing contacts
        let data = {};
        const text = await brevoResponse.text();
        if (text) {
          try { data = JSON.parse(text); } catch (e) {}
        }

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

    // All other requests — serve the static React site
    return env.ASSETS.fetch(request);
  }
};
