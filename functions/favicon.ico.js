export async function onRequestGet(context) {
    try {
        const origin = new URL(context.request.url).origin;
        const asset = await context.env.ASSETS.fetch(new Request(new URL("/logo.png", origin)));
        if (asset.ok) {
            const body = await asset.arrayBuffer();
            if (body.byteLength) {
                return new Response(body, {
                    status: 200,
                    headers: {
                        "Content-Type": "image/png",
                        "Cache-Control": "public, max-age=86400"
                    }
                });
            }
        }
    } catch {
        // fall through to the redirect below
    }

    return new Response(null, {
        status: 302,
        headers: {
            "Location": "/logo.png",
            "Cache-Control": "public, max-age=86400"
        }
    });
}
