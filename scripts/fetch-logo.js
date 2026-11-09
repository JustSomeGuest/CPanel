const fs = require("node:fs/promises");
const path = require("node:path");

const url = "https://raw.githubusercontent.com/JustSomeGuest/Scripts/Main/Utilities/CPanel/Logo.png";
const destination = path.join(__dirname, "..", "public", "logo.png");

async function main() {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Logo download failed: HTTP ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (!buffer.length) {
        throw new Error("Logo download returned an empty file.");
    }

    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, buffer);
    console.log("CPanel logo saved to public/logo.png");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
