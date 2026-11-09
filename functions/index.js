const html = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#111115">
    <meta name="description" content="CPanel — A centralized Roblox control panel. Participant management, player actions, audio, visual effects and camera control in one interface.">
    <title>CPanel — A centralized Roblox control panel</title>
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
            --amber: #f4bd39;
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
        .brand, .footer-brand { display: inline-flex; align-items: center; gap: 12px; font-weight: 800; letter-spacing: -.5px; }
        .brand { font-size: 23px; }
        .brand img { width: 35px; height: 35px; object-fit: contain; }
        .topnav { display: flex; align-items: center; gap: 30px; color: #a6a6b1; font-size: 13px; font-weight: 600; }
        .topnav a:hover, .footer a:hover { color: white; }
        .topnav .raw-link { color: #d9d9e2; }
        .raw-link span { color: #7fa9ff; }
        .hero { max-width: 1240px; margin: 0 auto; padding: 86px 34px 70px; display: grid; grid-template-columns: .9fr 1.1fr; gap: 48px; align-items: center; }
        .eyebrow { display: flex; align-items: center; gap: 9px; color: #8caeff; font-size: 10px; font-weight: 800; letter-spacing: 1.55px; text-transform: uppercase; }
        .status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); box-shadow: 0 0 12px #54c99577; }
        h1 { margin: 22px 0 18px; font-size: clamp(36px, 4.4vw, 56px); line-height: 1.08; letter-spacing: -2.8px; font-weight: 800; }
        h1 span { color: #8baeff; }
        .hero-description { max-width: 480px; color: #a1a1ad; font-size: 15px; line-height: 1.85; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 29px; }
        .button { min-height: 46px; display: inline-flex; align-items: center; justify-content: center; gap: 14px; padding: 0 19px; border-radius: 12px; font-size: 13px; font-weight: 700; transition: transform .18s, background .18s; }
        .button:hover { transform: translateY(-2px); }
        .primary { background: var(--blue); color: white; box-shadow: 0 8px 25px #397ff42b; }
        .primary:hover { background: #4b8bff; }
        .secondary { background: #202027; border: 1px solid var(--line); color: #d0d0d9; }
        .hero-note { margin-top: 22px; color: #777783; font-size: 11px; }
        .hero-note b { color: var(--green); margin-right: 6px; }
        .shot img { display: block; width: 100%; height: auto; }
        .section, .get-started { max-width: 1172px; margin: 0 auto; padding: 74px 34px; }
        .section { border-top: 1px solid var(--line); }
        .section-heading { text-align: center; }
        .section-heading .eyebrow { justify-content: center; }
        h2 { margin: 13px 0 10px; font-size: clamp(28px, 3vw, 38px); letter-spacing: -1.5px; }
        .section-heading > p { margin: 0 auto; max-width: 640px; color: var(--muted); font-size: 13px; line-height: 1.8; }
        .tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 9px; margin-top: 36px; }
        .tab { padding: 10px 16px; border: 1px solid var(--line); border-radius: 11px; background: #17171d; color: #a6a6b1; font: inherit; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: background .16s, color .16s, transform .16s; }
        .tab:hover { color: #e6e6ee; transform: translateY(-1px); }
        .tab.active { background: var(--blue); border-color: transparent; color: white; box-shadow: 0 8px 22px #397ff42b; }
        .tab-panels { margin-top: 26px; }
        .tab-panel { display: none; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 14px; }
        .tab-panel.active { display: grid; }
        .item { padding: 20px 21px; border: 1px solid var(--line); border-radius: 15px; background: linear-gradient(145deg, #1a1a21, #15151a); }
        .item h4 { margin: 0 0 7px; font-size: 13.5px; letter-spacing: -.2px; }
        .item p { margin: 0; color: #92929e; font-size: 12px; line-height: 1.8; }
        .item .tag { display: inline-block; margin-top: 11px; padding: 3px 8px; border-radius: 6px; background: #397ff41c; color: #8db1ff; font-size: 9.5px; font-weight: 800; letter-spacing: .6px; text-transform: uppercase; }
        .code-card { max-width: 760px; margin: 32px auto 0; overflow: hidden; border: 1px solid #30303a; border-radius: 15px; background: #141419; box-shadow: 0 18px 55px #0003; }
        .code-toolbar { height: 48px; padding: 0 15px; display: flex; justify-content: space-between; align-items: center; background: #1b1b22; border-bottom: 1px solid var(--line); }
        .code-label { color: #dedee7; font-size: 11px; font-weight: 700; }
        .language-dot { display: inline-block; width: 7px; height: 7px; margin-right: 7px; border-radius: 50%; background: #6c9cff; }
        .code-muted { color: #777783; font-weight: 500; }
        .copy-button { padding: 7px 11px; border: 1px solid #393943; border-radius: 8px; background: #25252d; color: #dedee7; font: inherit; font-size: 10px; cursor: pointer; }
        .copy-button:hover { background: #30303a; }
        pre { margin: 0; padding: 22px 20px; overflow-x: auto; color: #a9c3ff; font: 12px/1.7 ui-monospace, SFMono-Regular, Consolas, monospace; }
        .raw-callout, .note-callout { max-width: 760px; margin: 14px auto 0; padding: 16px 18px; display: flex; align-items: center; gap: 13px; border: 1px solid var(--line); border-radius: 13px; background: #17171d; }
        .raw-symbol { width: 32px; height: 32px; flex: none; display: grid; place-items: center; border-radius: 9px; color: #8db1ff; background: #397ff41c; }
        .raw-callout strong, .note-callout strong { font-size: 12px; }
        .raw-callout p, .note-callout p { margin: 4px 0 0; color: #92929e; font-size: 11px; line-height: 1.7; }
        .raw-callout a { color: #8db1ff; }
        .raw-callout code { color: #c4c4cf; }
        .note-callout { align-items: flex-start; border-color: #f4bd3933; background: #f4bd390f; }
        .note-callout .raw-symbol { color: var(--amber); background: #f4bd391c; }
        .steps { max-width: 860px; margin: 38px auto 0; padding: 0; list-style: none; counter-reset: step; display: grid; gap: 12px; }
        .steps li { counter-increment: step; display: flex; gap: 15px; align-items: flex-start; padding: 16px 18px; border: 1px solid var(--line); border-radius: 14px; background: #15151a; }
        .steps li:before { content: counter(step); flex: none; width: 26px; height: 26px; display: grid; place-items: center; border-radius: 8px; background: #397ff41c; color: #8db1ff; font-size: 11px; font-weight: 800; }
        .steps b { display: block; font-size: 13px; margin-bottom: 3px; }
        .steps span { color: #92929e; font-size: 12px; line-height: 1.75; }
        .table-wrap { max-width: 860px; margin: 34px auto 0; overflow-x: auto; border: 1px solid var(--line); border-radius: 15px; background: #15151a; }
        table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
        th, td { padding: 15px 18px; text-align: left; border-bottom: 1px solid var(--line); vertical-align: top; }
        tr:last-child th, tr:last-child td { border-bottom: 0; }
        th { color: #e8e8ee; font-size: 12px; letter-spacing: .4px; background: #1b1b22; }
        td { color: #92929e; line-height: 1.7; }
        td:first-child { color: #cfcfd8; }
        .backend-card { max-width: 860px; margin: 34px auto 0; padding: 26px; border: 1px solid var(--line); border-radius: 17px; background: linear-gradient(145deg, #1a1a21, #15151a); }
        .backend-card h3 { margin: 0 0 6px; font-size: 16px; }
        .backend-card > p { margin: 0; color: #92929e; font-size: 12.5px; line-height: 1.8; }
        .backend-card a.inline { color: #8db1ff; }
        .backend-steps { margin: 18px 0 0; padding-left: 18px; color: #a1a1ad; font-size: 12.5px; line-height: 2; }
        .endpoint { margin-top: 16px; padding: 12px 14px; border: 1px solid #30303a; border-radius: 11px; background: #141419; color: #a9c3ff; font: 12px/1.6 ui-monospace, SFMono-Regular, Consolas, monospace; overflow-x: auto; }
        .footer { max-width: 1172px; margin: auto; padding: 24px 34px 30px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--line); color: #777783; font-size: 10px; }
        .footer-brand { color: #e8e8ee; font-size: 13px; }
        .footer-brand img { width: 22px; height: 22px; object-fit: contain; }
        .footer a:last-child { color: #a9c3ff; }
        @media (max-width: 900px) {
            .hero { grid-template-columns: 1fr; gap: 42px; padding-top: 68px; }
            .hero-copy { max-width: 650px; }
            .shot { max-width: 760px; width: 100%; margin: auto; }
        }
        @media (max-width: 620px) {
            .topbar { height: 68px; padding: 0 20px; }
            .brand { font-size: 19px; }
            .topnav { gap: 14px; font-size: 11px; }
            .topnav a:nth-child(2), .topnav a:nth-child(3) { display: none; }
            .hero { padding: 56px 20px 52px; }
            h1 { letter-spacing: -1.8px; }
            .section, .get-started { padding: 55px 20px; }
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
            <a href="#overview">Overview</a><a href="#panel">The panel</a><a href="#get-started">Get started</a>
            <a class="raw-link" href="/raw" target="_blank" rel="noreferrer">Raw source <span>↗</span></a>
        </nav>
    </header>
    <main>
        <section class="hero" id="overview">
            <div class="hero-copy">
                <div class="eyebrow"><span class="status-dot"></span> A centralized Roblox control panel</div>
                <h1>One panel for<br><span>every connected user.</span></h1>
                <p class="hero-description">CPanel is a client-side control panel for developers who want to interact with users connected to their scripts through a centralized WebSocket server. Run participants, player actions, audio, visuals and camera effects from a single window.</p>
                <div class="hero-actions"><a class="button primary" href="#get-started">Get started <span>↗</span></a><a class="button secondary" href="#panel">Explore the panel</a></div>
                <div class="hero-note"><b>✓</b> Connected users appear in the participant list the moment your script runs.</div>
            </div>
            <div class="shot"><img src="/screenshot.png" alt="CPanel dashboard screenshot" loading="eager" width="1802" height="1014"></div>
        </section>

        <section class="section" id="panel">
            <div class="section-heading"><div class="eyebrow">THE PANEL</div><h2>Eight tabs, sorted by job.</h2><p>The reworked client groups everything into focused tabs. Pick a tab to see what lives inside it.</p></div>
            <div class="tabs" role="tablist">
                <button class="tab active" type="button" data-tab="dashboard">Dashboard</button>
                <button class="tab" type="button" data-tab="general">General</button>
                <button class="tab" type="button" data-tab="spectate">Spectate</button>
                <button class="tab" type="button" data-tab="audio">Audio</button>
                <button class="tab" type="button" data-tab="visual">Visual</button>
                <button class="tab" type="button" data-tab="fun">Fun</button>
                <button class="tab" type="button" data-tab="chat">Chat Logs</button>
                <button class="tab" type="button" data-tab="settings">Settings</button>
            </div>
            <div class="tab-panels">
                <div class="tab-panel active" data-panel="dashboard">
                    <article class="item"><h4>Participants</h4><p>Live list with search and refresh. Select one to unlock the action tabs, join their game server or hop to a new one.</p><span class="tag">Live</span></article>
                    <article class="item"><h4>Session</h4><p>Current place, universe ID and the selected participant's profile at a glance.</p></article>
                    <article class="item"><h4>Connection</h4><p>WebSocket status, endpoint and developer authentication through <b>access.json</b>.</p></article>
                    <article class="item"><h4>Effect Management</h4><p>Stop all effects, clear temporary ones, restore defaults or refresh what's currently running.</p></article>
                </div>
                <div class="tab-panel" data-panel="general">
                    <article class="item"><h4>Freeze</h4><p>Immobilize the participant.</p></article>
                    <article class="item"><h4>Unfreeze</h4><p>Restore normal movement.</p></article>
                    <article class="item"><h4>Kill / Reset</h4><p>Set their HP to 0 instantly.</p></article>
                    <article class="item"><h4>Bring</h4><p>Move the participant to you.</p></article>
                    <article class="item"><h4>Goto</h4><p>Move yourself to the participant.</p></article>
                    <article class="item"><h4>Send notification</h4><p>Deliver a message that pops up on their screen.</p></article>
                </div>
                <div class="tab-panel" data-panel="spectate">
                    <article class="item"><h4>View</h4><p>Spectate the selected participant.</p></article>
                    <article class="item"><h4>Unview</h4><p>Put the camera back on your character.</p></article>
                </div>
                <div class="tab-panel" data-panel="audio">
                    <article class="item"><h4>Play Sound</h4><p>Play any Roblox audio asset by ID (<b>rbxassetid://</b> works too), with volume from 0.10 to 10.00 and an optional loop.</p></article>
                    <article class="item"><h4>Sound Controls</h4><p>Play, stop, stop all sounds, adjust volume, disable loop or restore the default volume.</p></article>
                    <article class="item"><h4>Playback Status</h4><p>Refresh to see what is currently playing on their end.</p></article>
                </div>
                <div class="tab-panel" data-panel="visual">
                    <article class="item"><h4>Screen Flash</h4><p>Brief full-screen flash.</p></article>
                    <article class="item"><h4>Color Effect</h4><p>Temporary color grading with R/G/B.</p></article>
                    <article class="item"><h4>Blur</h4><p>Temporary screen blur.</p></article>
                    <article class="item"><h4>FOV Control</h4><p>Increase, decrease or reset the field of view.</p></article>
                    <article class="item"><h4>Grayscale</h4><p>Temporary desaturation.</p></article>
                    <article class="item"><h4>Invert Colors</h4><p>Temporary color inversion.</p></article>
                    <article class="item"><h4>Screen Tint</h4><p>Full-screen tint with R/G/B.</p></article>
                    <article class="item"><h4>Duration</h4><p>Every effect takes 0.2 – 120 seconds, or leave it empty for the default.</p></article>
                    <article class="item"><h4>Restore Effects</h4><p>Remove all CPanel visual effects at once.</p></article>
                </div>
                <div class="tab-panel" data-panel="fun">
                    <article class="item"><h4>Fling</h4><p>Launch them — force comes from the slider, 1 pops them up, 10 throws them across the map.</p></article>
                    <article class="item"><h4>Character Highlight</h4><p>Temporary highlight on their character, with R/G/B.</p></article>
                    <article class="item"><h4>Character Outline</h4><p>Outline-only highlight.</p></article>
                    <article class="item"><h4>Nameplate Decoration</h4><p>Overhead nameplate for a while.</p></article>
                    <article class="item"><h4>Overhead Notification</h4><p>Pulsing overhead message.</p></article>
                    <article class="item"><h4>Screen Vignette</h4><p>Dark vignette around the screen edges.</p></article>
                    <article class="item"><h4>Camera Shake</h4><p>Lightweight camera shake.</p></article>
                    <article class="item"><h4>Camera Zoom</h4><p>Zoom the camera in and lock it.</p></article>
                    <article class="item"><h4>Lighting Effect</h4><p>Temporary lighting mood with R/G/B.</p></article>
                    <article class="item"><h4>Particle Effect</h4><p>Character sparkles with R/G/B.</p></article>
                    <article class="item"><h4>Visual Distortion</h4><p>Pulsing color distortion.</p></article>
                    <article class="item"><h4>Confetti</h4><p>Falling confetti on their screen.</p></article>
                    <article class="item"><h4>Restore All Effects</h4><p>Stop every active CPanel effect.</p></article>
                </div>
                <div class="tab-panel" data-panel="chat">
                    <article class="item"><h4>Chat Logs</h4><p>Live chat feed from the server, with an option to show only connected users.</p></article>
                    <article class="item"><h4>Send as selected user</h4><p>Send a message as the participant you have selected.</p></article>
                </div>
                <div class="tab-panel" data-panel="settings">
                    <article class="item"><h4>Appearance</h4><p>UI theme, interface transparency and animations.</p></article>
                    <article class="item"><h4>Notifications</h4><p>Toast notifications and interface sounds.</p></article>
                    <article class="item"><h4>Connection</h4><p>WebSocket status, endpoint, auto-reconnect, participant list refresh interval and a manual reconnect button.</p></article>
                    <article class="item"><h4>Reset</h4><p>Reset UI settings back to defaults in one click.</p></article>
                </div>
            </div>
        </section>

        <section class="get-started" id="get-started">
            <div class="section-heading"><div class="eyebrow">LOADER</div><h2>Add it to your script.</h2><p>Once loaded, the client connects to your WebSocket server and registers as a participant.</p></div>
            <div class="code-card">
                <div class="code-toolbar"><div class="code-label"><span class="language-dot"></span> Lua <span class="code-muted">· Participant loader</span></div><button class="copy-button" id="copy-loader" type="button">▢ Copy</button></div>
                <pre><code id="loader-code">task.spawn(function()
    getgenv().CPanelWebsocket = "wss://your-websocket.onrender.com"
    loadstring(game:HttpGet("https://getcpanel.pages.dev/raw"))()
end)</code></pre>
            </div>
            <div class="raw-callout"><div class="raw-symbol">↗</div><div><strong>Inspect the source before you run it</strong><p><a href="/raw" target="_blank" rel="noreferrer">getcpanel.pages.dev/raw</a> always serves the latest client as plain text.</p></div></div>
            <div class="note-callout"><div class="raw-symbol">!</div><div><strong>Developer loader</strong><p>Developers set <code>getgenv().CPanelDevToken</code> before loading. Participants don't need a token — the loader above is enough.</p></div></div>
        </section>

        <section class="section" id="how-it-works">
            <div class="section-heading"><div class="eyebrow">HOW IT WORKS</div><h2>Five steps, start to finish.</h2></div>
            <ol class="steps">
                <li><div><b>Add the loader</b><span>Drop the CPanel loader into your Roblox script.</span></div></li>
                <li><div><b>A user executes the script</b><span>The CPanel client starts with it.</span></div></li>
                <li><div><b>The client connects</b><span>It opens a connection to your configured WebSocket server and persists the endpoint.</span></div></li>
                <li><div><b>The server registers the connection</b><span>It checks developer authorization before granting access.</span></div></li>
                <li><div><b>The dashboard takes over</b><span>Authorized developers open the dashboard and act on connected participants.</span></div></li>
            </ol>
            <div class="table-wrap">
                <table>
                    <thead><tr><th>Developer</th><th>Participant</th></tr></thead>
                    <tbody>
                        <tr><td>Accesses the CPanel dashboard.</td><td>Connects when executing an integrated script.</td></tr>
                        <tr><td>Views connected participants.</td><td>Appears in the participant list.</td></tr>
                        <tr><td>Selects participants.</td><td>Receives actions and effects.</td></tr>
                        <tr><td>Uses dashboard controls.</td><td>Runs the CPanel client.</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="section" id="backend">
            <div class="section-heading"><div class="eyebrow">WEBSOCKET BACKEND</div><h2>Bring your own server.</h2><p>CPanel requires its own hosted WebSocket backend — it does not connect on its own.</p></div>
            <div class="backend-card">
                <h3>CPanelWebsocket</h3>
                <p>Deploy it as a Web Service on <a class="inline" href="https://render.com/" target="_blank" rel="noreferrer">Render</a> — repo: <a class="inline" href="https://github.com/JustSomeGuest/CPanelWebsocket" target="_blank" rel="noreferrer">JustSomeGuest/CPanelWebsocket</a></p>
                <ol class="backend-steps">
                    <li>Clone the CPanelWebsocket repository and push it to your GitHub account.</li>
                    <li>Create a new Web Service on Render and connect the repository.</li>
                    <li>Set the build command to <b>npm install</b> and the start command to <b>npm start</b>.</li>
                    <li>Add <b>CPANEL_DEV_TOKEN</b> in Environment and authorize your Roblox UserIds in <b>access.json</b>.</li>
                </ol>
                <div class="endpoint">wss://your-websocket.onrender.com</div>
            </div>
            <div class="note-callout"><div class="raw-symbol">!</div><div><strong>Keep the token private</strong><p>A token placed in a client-side script can be extracted by anyone who receives that script. Treat it as a shared credential, not as a secure way to prove identity.</p></div></div>
        </section>

        <section class="section" id="important">
            <div class="section-heading"><div class="eyebrow">IMPORTANT</div><h2>Know the limits.</h2></div>
            <div class="note-callout"><div class="raw-symbol">!</div><div><strong>CPanel cannot control players who have not loaded a script containing its client.</strong><p>It does not automatically connect to every player in a Roblox server. Participants register when their client connects, and actions are processed by the receiving client's CPanel instance.</p></div></div>
        </section>
    </main>
    <footer class="footer"><a class="footer-brand" href="/"><img src="/logo.png" alt=""> CPanel</a><span>A centralized Roblox control panel.</span><a href="/raw">Raw source ↗</a></footer>
    <script>
        const tabs = document.querySelectorAll(".tab");
        const panels = document.querySelectorAll(".tab-panel");
        tabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                tabs.forEach((t) => t.classList.toggle("active", t === tab));
                panels.forEach((p) => p.classList.toggle("active", p.dataset.panel === tab.dataset.tab));
            });
        });

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
