const SOURCE_URL = "https://raw.githubusercontent.com/JustSomeGuest/Scripts/Main/Utilities/CPanel/Init.lua";

export async function onRequestGet() {
    try {
        const response = await fetch(SOURCE_URL, {
            headers: { "User-Agent": "CPanel-Pages/1.0" }
        });

        if (!response.ok) {
            return new Response("Unable to retrieve the latest CPanel Init.lua.", {
                status: 502,
                headers: {
                    "Content-Type": "text/plain; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    "Cache-Control": "no-store"
                }
            });
        }

        return new Response(await response.text(), {
            status: 200,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "public, max-age=60, s-maxage=60",
                "X-Content-Type-Options": "nosniff"
            }
        });
    } catch {
        return new Response("CPanel raw endpoint is temporarily unavailable.", {
            status: 502,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-store"
            }
        });
    }
}
