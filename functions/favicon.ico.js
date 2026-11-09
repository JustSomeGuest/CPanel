export async function onRequestGet() {
    return new Response(null, {
        status: 302,
        headers: {
            "Location": "/logo.png",
            "Cache-Control": "public, max-age=86400"
        }
    });
}
