const username = "Jacob-dev012";
const repo = "pentecost-preparatory-school";

// safer frontmatter parser
function parseFrontMatter(md) {
  const fmMatch = md.match(/---\n([\s\S]*?)\n---/);
  if (!fmMatch) return {};

  const lines = fmMatch[1].split("\n");
  const data = {};

  lines.forEach(line => {
    const idx = line.indexOf(":");
    if (idx === -1) return;

    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();

    data[key] = value;
  });

  return data;
}

// load content
async function loadContent(file) {
  const res = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/main/content/${file}`);
  const md = await res.text();
  return parseFrontMatter(md);
}

// helper for images (IMPORTANT FIX)
function fixPath(path) {
  if (!path) return "";
  if (path.startsWith("/")) return path; // already correct
  return "/images/" + path;
}
