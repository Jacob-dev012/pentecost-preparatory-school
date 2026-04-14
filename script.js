function parseFrontMatter(md) {
  const match = md.match(/---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const lines = match[1].split("\n");
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

async function loadContent(file) {
  const res = await fetch(`/content/${file}`);
  const md = await res.text();
  return parseFrontMatter(md);
}
