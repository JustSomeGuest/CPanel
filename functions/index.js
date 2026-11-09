const html = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#111115">
    <meta name="description" content="CPanel — The Control Panel You'll Actually Enjoy Using.">
    <title>CPanel — The Control Panel You'll Actually Enjoy Using</title>
    <link rel="icon" type="image/png" href="/logo.png">
    <link rel="apple-touch-icon" href="/logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            color-scheme: dark;
            --bg: #101014;
            --panel: #17171d;
            --line: rgba(255,255,255,.065);
            --text: #f3f3f7;
            --muted: #92929e;
            --blue: #397ff4;
            --green: #54c995;
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
            margin: 0;
            min-width: 320px;
            background: var(--bg);
            color: var(--text);
            font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            -webkit-font-smoothing: antialiased;
            overflow-x: hidden;
        }
        a { color: inherit; text-decoration: none; }
        .ambient { position: absolute; width: 440px; height: 440px; border-radius: 50%; filter: blur(130px); opacity: .13; pointer-events: none; z-index: -1; }
        .ambient.one { top: 90px; left: -230px; background: #347ef5; }
        .ambient.two { top: 450px; right: -250px; background: #5b54d8; }
        .topbar { height: 82px; max-width: 1240px; margin: auto; padding: 0 34px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--line); }
        .brand, .window-brand, .footer-brand { display: inline-flex; align-items: center; gap: 12px; font-weight: 800; letter-spacing: -.5px; }
        .brand { font-size: 23px; }
        .brand img { width: 35px; height: 35px; object-fit: contain; }
        .topnav { display: flex; align-items: center; gap: 32px; color: #a6a6b1; font-size: 13px; font-weight: 600; }
        .topnav a:hover, .footer a:hover { color: white; }
        .topnav .raw-link { color: #d9d9e2; }
        .raw-link span { color: #7fa9ff; }
        .hero { max-width: 1240px; margin: 0 auto; padding: 92px 34px 76px; display: grid; grid-template-columns: .88fr 1.12fr; gap: 48px; align-items: center; }
        .eyebrow { display: flex; align-items: center; gap: 9px; color: #8caeff; font-size: 10px; font-weight: 800; letter-spacing: 1.55px; text-transform: uppercase; }
        .status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); box-shadow: 0 0 12px #54c99577; }
        h1 { margin: 22px 0 18px; font-size: clamp(38px, 4.5vw, 58px); line-height: 1.08; letter-spacing: -2.8px; font-weight: 800; }
        h1 span { color: #8baeff; }
        .hero-description { max-width: 455px; color: #a1a1ad; font-size: 15px; line-height: 1.85; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 29px; }
        .button { min-height: 46px; display: inline-flex; align-items: center; justify-content: center; gap: 14px; padding: 0 19px; border-radius: 12px; font-size: 13px; font-weight: 700; transition: transform .18s, background .18s; }
        .button:hover { transform: translateY(-2px); }
        .primary { background: var(--blue); color: white; box-shadow: 0 8px 25px #397ff42b; }
        .primary:hover { background: #4b8bff; }
        .secondary { background: #202027; border: 1px solid var(--line); color: #d0d0d9; }
        .hero-note { margin-top: 22px; color: #777783; font-size: 11px; }
        .hero-note b { color: var(--green); margin-right: 6px; }
        .preview-window { overflow: hidden; border: 1px solid #34343d; border-radius: 24px; background: #111115; box-shadow: 0 35px 100px #0008, 0 0 0 5px #ffffff04; transform: perspective(1400px) rotateY(-4deg) rotateX(1deg); }
        .window-titlebar { height: 62px; padding: 0 22px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #24242b; background: #17171c; }
        .window-brand { font-size: 16px; }
        .window-brand img { width: 25px; height: 25px; object-fit: contain; }
        .window-status { display: flex; align-items: center; gap: 8px; color: var(--green); font-size: 11px; }
        .window-status i { width: 7px; height: 7px; border-radius: 50%; background: var(--green); }
        .traffic { display: inline-block; width: 11px; height: 11px; border-radius: 50%; margin-left: 7px; }
        .yellow { background: #f4bd39; }
        .red { background: #f05b5c; margin-left: 0; }
        .preview-body { display: grid; grid-template-columns: 130px 1fr; min-height: 330px; }
        .sidebar { padding: 15px 10px; background: #17171d; display: flex; flex-direction: column; gap: 7px; }
        .side-item { padding: 10px 12px; color: #888893; border-radius: 9px; font-size: 10px; }
        .side-item.selected { color: white; background: var(--blue); }
        .preview-content { padding: 17px; display: flex; flex-direction: column; gap: 11px; }
        .preview-top { display: grid; grid-template-columns: 1.1fr .9fr; gap: 10px; }
        .preview-card { border: 1px solid #25252d; border-radius: 13px; background: #19191f; }
        .profile-card { padding: 15px 12px; display: flex; align-items: center; gap: 12px; }
        .avatar { width: 62px; height: 62px; border: 2px solid #4d8cff; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; background: #20242d; }
        .avatar-head { width: 25px; height: 25px; border-radius: 8px 8px 6px 6px; background: #eee; color: #222; text-align: center; font-size: 8px; line-height: 25px; position: relative; }
        .avatar-head:before { content: ''; position: absolute; width: 25px; height: 8px; top: -3px; left: 0; border-radius: 50% 50% 0 0; background: #b53d3d; }
        .avatar-body { width: 42px; height: 13px; background: #51545b; border-radius: 5px 5px 0 0; }
        .profile-lines { display: flex; flex-direction: column; gap: 7px; min-width: 0; }
        .profile-lines strong { font-size: 11px; letter-spacing: 1px; }
        .profile-lines small, .connection-card small, .session-card small { color: #81818d; font-size: 9px; }
        .blue-line { color: #78a5ff; font-size: 10px; }
        .connection-card { padding: 15px 13px; display: flex; flex-direction: column; gap: 10px; }
        .connection-card strong, .session-card strong, .participants-heading strong { font-size: 12px; }
        .connected { color: var(--green); font-size: 10px; }
        .session-card { padding: 15px; display: flex; flex-direction: column; gap: 9px; }
        .session-card b { font-size: 11px; }
        .participants-card { padding: 14px; }
        .participants-heading { display: flex; flex-direction: column; gap: 5px; }
        .participants-heading span { color: #83838e; font-size: 9px; }
        .participant-row { margin-top: 12px; padding: 10px; display: flex; align-items: center; gap: 9px; border-radius: 9px; background: #202027; font-size: 10px; }
        .mini-avatar { width: 20px; height: 20px; border-radius: 6px; background: linear-gradient(#b64c4c 0 35%, #e9e9e9 35% 68%, #555 68%); }
        .participant-pill { margin-left: auto; width: 45px; height: 12px; border-radius: 10px; background: var(--blue); }
        .section, .get-started { max-width: 1172px; margin: 0 auto; padding: 74px 34px; }
        .section { border-top: 1px solid var(--line); }
        .section-heading { text-align: center; }
        .section-heading .eyebrow { justify-content: center; }
        h2 { margin: 13px 0 10px; font-size: clamp(28px, 3vw, 38px); letter-spacing: -1.5px; }
        .section-heading > p { margin: 0 auto; max-width: 560px; color: var(--muted); font-size: 13px; line-height: 1.8; }
        .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 38px; }
        .feature-card { padding: 25px; border: 1px solid var(--line); border-radius: 17px; background: linear-gradient(145deg, #1a1a21, #15151a); }
        .feature-icon { width: 36px; height: 36px; display: grid; place-items: center; border-radius: 11px; background: #397ff41b; color: #83aaff; font-size: 19px; }
        .feature-card h3 { margin: 19px 0 8px; font-size: 15px; }
        .feature-card p { margin: 0; color: #92929e; font-size: 12px; line-height: 1.8; }
        .get-started { padding-top: 60px; padding-bottom: 88px; }
        .code-card { max-width: 760px; margin: 32px auto 0; overflow: hidden; border: 1px solid #30303a; border-radius: 15px; background: #141419; box-shadow: 0 18px 55px #0003; }
        .code-toolbar { height: 48px; padding: 0 15px; display: flex; justify-content: space-between; align-items: center; background: #1b1b22; border-bottom: 1px solid var(--line); }
        .code-label { color: #dedee7; font-size: 11px; font-weight: 700; }
        .language-dot { display: inline-block; width: 7px; height: 7px; margin-right: 7px; border-radius: 50%; background: #6c9cff; }
        .code-muted { color: #777783; font-weight: 500; }
        .copy-button { padding: 7px 11px; border: 1px solid #393943; border-radius: 8px; background: #25252d; color: #dedee7; font: inherit; font-size: 10px; cursor: pointer; }
        .copy-button:hover { background: #30303a; }
        pre { margin: 0; padding: 22px 20px; overflow-x: auto; color: #a9c3ff; font: 12px/1.7 ui-monospace, SFMono-Regular, Consolas, monospace; }
        .raw-callout { max-width: 760px; margin: 14px auto 0; padding: 16px 18px; display: flex; align-items: center; gap: 13px; border: 1px solid var(--line); border-radius: 13px; background: #17171d; }
        .raw-symbol { width: 32px; height: 32px; display: grid; place-items: center; border-radius: 9px; color: #8db1ff; background: #397ff41c; }
        .raw-callout strong { font-size: 12px; }
        .raw-callout p { margin: 4px 0 0; color: #92929e; font-size: 11px; }
        .raw-callout a { color: #8db1ff; }
        .raw-callout code { color: #c4c4cf; }
        .footer { max-width: 1172px; margin: auto; padding: 24px 34px 30px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--line); color: #777783; font-size: 10px; }
        .footer-brand { color: #e8e8ee; font-size: 13px; }
        .footer-brand img { width: 22px; height: 22px; object-fit: contain; }
        .footer a:last-child { color: #a9c3ff; }
        @media (max-width: 900px) {
            .hero { grid-template-columns: 1fr; gap: 45px; padding-top: 70px; }
            .hero-copy { max-width: 650px; }
            .preview-window { transform: none; max-width: 720px; width: 100%; margin: auto; }
        }
        @media (max-width: 620px) {
            .topbar { height: 68px; padding: 0 20px; }
            .brand { font-size: 19px; }
            .topnav { gap: 15px; font-size: 11px; }
            .topnav a:nth-child(2), .topnav a:nth-child(3) { display: none; }
            .hero { padding: 58px 20px 55px; }
            h1 { letter-spacing: -1.8px; }
            .preview-body { grid-template-columns: 92px 1fr; min-height: 280px; }
            .sidebar { padding: 10px 6px; }
            .side-item { padding: 9px 7px; font-size: 9px; }
            .preview-content { padding: 10px; }
            .preview-top { grid-template-columns: 1fr; }
            .connection-card { display: none; }
            .profile-card { padding: 10px; }
            .avatar { width: 48px; height: 48px; }
            .section, .get-started { padding: 55px 20px; }
            .feature-grid { grid-template-columns: 1fr; }
            .footer { padding: 22px 20px; flex-wrap: wrap; gap: 14px; }
            .footer > span { order: 3; width: 100%; }
        }
    </style>
</head>
<body>
    <div class="ambient one"></div><div class="ambient two"></div>
    <header class="topbar">
        <a class="brand" href="/" aria-label="CPanel home"><img src="/logo.png" alt=""><span>CPanel</span></a>
        <nav class="topnav" aria-label="Main navigation">
            <a href="#overview">Overview</a><a href="#features">Features</a><a href="#get-started">Get started</a>
            <a class="raw-link" href="/raw" target="_blank" rel="noreferrer">Raw source <span>↗</span></a>
        </nav>
    </header>
    <main>
        <section class="hero" id="overview">
            <div class="hero-copy">
                <div class="eyebrow"><span class="status-dot"></span> A cleaner way to manage your session</div>
                <h1>The Control Panel<br><span>You'll Actually Enjoy Using.</span></h1>
                <p class="hero-description">A sleek, desktop-inspired control panel for your Roblox session. Everything important, organized in one place.</p>
                <div class="hero-actions"><a class="button primary" href="#get-started">Get started <span>↗</span></a><a class="button secondary" href="#features">Explore features</a></div>
                <div class="hero-note"><b>✓</b> Minimal interface. Straightforward controls.</div>
            </div>
            <div class="preview-window" aria-label="CPanel interface preview">
                <div class="window-titlebar">
                    <div class="window-brand"><img src="/logo.png" alt=""><span>CPanel</span></div>
                    <div class="window-status"><i></i> Connected <b class="traffic yellow"></b><b class="traffic red"></b></div>
                </div>
                <div class="preview-body">
                    <aside class="sidebar">
                        <div class="side-item selected">Dashboard</div><div class="side-item">General</div><div class="side-item">Spectate</div><div class="side-item">Audio</div><div class="side-item">Visual</div><div class="side-item">Fun</div><div class="side-item">Chat Logs</div><div class="side-item">Settings</div>
                    </aside>
                    <div class="preview-content">
                        <div class="preview-top">
                            <div class="preview-card profile-card">
                                <div class="avatar"><div class="avatar-head">●</div><div class="avatar-body"></div></div>
                                <div class="profile-lines"><strong>••••••••••••••</strong><span class="blue-line">@||||||||||||||||</span><small>Developer · authenticated</small></div>
                            </div>
                            <div class="preview-card connection-card"><strong>Connection</strong><span class="connected">● Connected · 255 ms</span><small>Secure session connection</small><small>1 online · attempt 0</small></div>
                        </div>
                        <div class="preview-card session-card"><strong>Session</strong><b>[UP] Just a baseplate.</b><small>Place ID: 123974602339071　·　Universe ID: 9271746647</small></div>
                        <div class="preview-card participants-card">
                            <div class="participants-heading"><strong>Participants</strong><span>1 connected</span></div>
                            <div class="participant-row"><span class="mini-avatar"></span><b>||||||||||||||| (you)</b><span class="participant-pill"></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section" id="features">
            <div class="section-heading"><div class="eyebrow">MADE TO FEEL RIGHT</div><h2>Everything in its place.</h2><p>A focused interface with the tools grouped into clear, familiar sections.</p></div>
            <div class="feature-grid">
                <article class="feature-card"><div class="feature-icon">⌂</div><h3>Dashboard</h3><p>See your current session, connection status, and participants at a glance.</p></article>
                <article class="feature-card"><div class="feature-icon">◫</div><h3>Organized controls</h3><p>Navigate dedicated sections for general options, audio, visuals, and more.</p></article>
                <article class="feature-card"><div class="feature-icon">⌁</div><h3>Live connection</h3><p>Keep an eye on the panel connection and session information in one spot.</p></article>
            </div>
        </section>
        <section class="get-started" id="get-started">
            <div class="section-heading"><div class="eyebrow">QUICK SETUP</div><h2>Ready when you are.</h2><p>Use the loader URL below to retrieve the latest initialization script from CPanel.</p></div>
            <div class="code-card">
                <div class="code-toolbar"><div class="code-label"><span class="language-dot"></span> Lua <span class="code-muted">· Loader</span></div><button class="copy-button" id="copy-loader" type="button">▢ Copy</button></div>
                <pre><code id="loader-code">loadstring(game:HttpGet("https://cpanel.pages.dev/raw"))()</code></pre>
            </div>
            <div class="raw-callout"><div class="raw-symbol">↗</div><div><strong>Want to inspect the source?</strong><p><a href="/raw" target="_blank" rel="noreferrer">cpanel.pages.dev/raw</a> serves the latest <code>Init.lua</code> contents as plain text.</p></div></div>
        </section>
    </main>
    <footer class="footer"><a class="footer-brand" href="/"><img src="/logo.png" alt=""> CPanel</a><span>The Control Panel You'll Actually Enjoy Using.</span><a href="/raw">Raw source ↗</a></footer>
    <script>
        const copyButton = document.querySelector("#copy-loader");
        const loaderCode = document.querySelector("#loader-code");
        copyButton?.addEventListener("click", async () => {
            const original = copyButton.textContent;
            try {
                await navigator.clipboard.writeText(loaderCode.textContent.trim());
                copyButton.textContent = "✓ Copied";
            } catch {
                const range = document.createRange();
                range.selectNodeContents(loaderCode);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                copyButton.textContent = "Select & copy";
            }
            setTimeout(() => { copyButton.textContent = original; }, 1600);
        });
    </script>
</body>
</html>`;

export async function onRequestGet() {
    return new Response(html, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=300"
        }
    });
}
