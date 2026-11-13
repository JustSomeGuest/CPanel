const SOURCE_URL = "https://raw.githubusercontent.com/JustSomeGuest/Scripts/Main/Utilities/CPanel/Screenshot.png";
const FALLBACK_PATH = "/screenshot.png";

// The browser keeps a copy of the image but has to revalidate it before every
// use, so a screenshot changed on GitHub shows up on the very next request,
// while an unchanged one is answered with 304 and never downloaded again.
const REVALIDATE = "private, no-cache";

function baseHeaders() {
    return {
        "Cache-Control": REVALIDATE,
        "X-Content-Type-Options": "nosniff"
    };
}

// Serves the screenshot committed with the project when GitHub cannot be reached.
async function serveFallback(context) {
    const { request, env } = context;
    const headOnly = request.method === "HEAD";

    try {
        const origin = new URL(request.url).origin;
        const asset = await env.ASSETS.fetch(new Request(new URL(FALLBACK_PATH, origin)));
        if (asset.ok) {
            const body = await asset.arrayBuffer();
            if (body.byteLength) {
                const headers = baseHeaders();
                headers["Content-Type"] = asset.headers.get("Content-Type") || "image/png";
                const etag = asset.headers.get("ETag");
                if (etag) headers["ETag"] = etag;
                return new Response(headOnly ? null : body, { status: 200, headers });
            }
        }
    } catch {
        // no local copy either, fall through to the error response below
    }

    return new Response("Unable to retrieve the latest CPanel screenshot.", {
        status: 502,
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store"
        }
    });
}

async function serveScreenshot(context) {
    const { request } = context;
    const headOnly = request.method === "HEAD";

    // Forward the browser's validator so GitHub can answer 304 when the file has
    // not changed, which downloads no bytes on either side.
    const upstreamHeaders = { "User-Agent": "CPanel-Pages/1.0" };
    const validator = request.headers.get("If-None-Match");
    if (validator) upstreamHeaders["If-None-Match"] = validator;

    try {
        const upstream = await fetch(SOURCE_URL, { headers: upstreamHeaders });

        if (upstream.status === 304 && validator) {
            // GitHub still serves exactly the bytes the browser already holds.
            return new Response(null, {
                status: 304,
                headers: { ...baseHeaders(), ETag: validator }
            });
        }

        if (upstream.ok) {
            const contentType = upstream.headers.get("Content-Type") || "image/png";
            if (!contentType.startsWith("image/")) {
                await upstream.body?.cancel().catch(() => {});
                return serveFallback(context);
            }

            const headers = baseHeaders();
            headers["Content-Type"] = contentType;
            const etag = upstream.headers.get("ETag");
            if (etag) headers["ETag"] = etag;

            if (headOnly) {
                await upstream.body?.cancel().catch(() => {});
                return new Response(null, { status: 200, headers });
            }

            const body = await upstream.arrayBuffer();
            if (body.byteLength) {
                return new Response(body, { status: 200, headers });
            }
        }
    } catch {
        // GitHub unreachable, use the committed copy instead
    }

    return serveFallback(context);
}

export function onRequestGet(context) {
    return serveScreenshot(context);
}

export function onRequestHead(context) {
    return serveScreenshot(context);
}
