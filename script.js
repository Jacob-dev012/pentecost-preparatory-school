const username = "Jacob-dev012"; // your GitHub username
const repo = "pentecost-preparatory-school"; // your repo

// Helper to parse front matter
function parseFrontMatter(md) {
  const fmMatch = md.match(/---\n([\s\S]*?)\n---/);
  if (!fmMatch) return {};
  const lines = fmMatch[1].split("\n");
  const data = {};
  lines.forEach(line => {
    const [key, ...rest] = line.split(":");
    data[key.trim()] = rest.join(":").trim();
  });
  return data;
}

// Load a markdown file and return front matter
async function loadContent(file) {
  const res = await fetch(`/content/${file}`);
  const md = await res.text();
  return parseFrontMatter(md);
}

// Load Header
loadContent("header.md").then(data => {
  const header = document.getElementById("header");
  if (data.title) document.getElementById("header-title").textContent = data.title;
  if (data.subtitle) document.getElementById("header-subtitle").textContent = data.subtitle;
  if (data.logo) document.getElementById("logo").src = "images/" + data.logo;
  if (data.background) header.style.backgroundImage = `url('images/${data.background}')`;
});

// Load Home
loadContent("home.md").then(data => {
  const home = document.getElementById("home");
  if (data.title) document.getElementById("home-title").textContent = data.title;
  if (data.text) document.getElementById("home-body").textContent = data.text;
  if (data.background) home.style.backgroundImage = `url('images/${data.background}')`;
});

// Load About
loadContent("about.md").then(data => {
  const about = document.getElementById("about");
  if (data.title) document.getElementById("about-title").textContent = data.title;
  if (data.body) document.getElementById("about-body").textContent = data.body;
  if (data.background) about.style.backgroundImage = `url('images/${data.background}')`;
});

// Load News
loadContent("news.md").then(data => {
  const newsDiv = document.getElementById("news-items");
  newsDiv.innerHTML = ""; // clear existing
  if (!data.items) return;
  data.items.forEach(item => {
    const newsItem = document.createElement("div");
    let html = `<h3>${item.title || ""}</h3><p>${item.description || ""}</p>`;
    if (item.image) html += `<img src="images/${item.image}" alt="${item.title || ""}" style="max-width:100%; margin-bottom:20px;">`;
    newsItem.innerHTML = html;
    newsDiv.appendChild(newsItem);
  });
});

// Load Admissions
loadContent("admissions.md").then(data => {
  if (data.form_header) document.getElementById("admissions-title").textContent = data.form_header;
  if (data.instructions) document.getElementById("admissions-instructions").textContent = data.instructions;
});

// Load Contact
loadContent("contact.md").then(data => {
  if (data.phone) document.getElementById("contact-phone").textContent = "Phone: " + data.phone;
  if (data.address) document.getElementById("contact-address").textContent = "Address: " + data.address;
});
