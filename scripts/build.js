const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "public");

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
fs.copyFileSync(path.join(root, "index.html"), path.join(output, "index.html"));
fs.cpSync(path.join(root, "D"), path.join(output, "D"), { recursive: true });

fs.writeFileSync(
  path.join(output, "_headers"),
  [
    "/D/*",
    "  Cache-Control: public, max-age=86400, s-maxage=604800, immutable",
    "",
    "/*",
    "  X-Content-Type-Options: nosniff",
    "  Referrer-Policy: strict-origin-when-cross-origin",
    ""
  ].join("\n")
);

console.log("Built Cloudflare Pages output in public/");
