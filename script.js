// Replace with your GitHub username and repo name
const username = "Jacob-dev012";
const repo = "pentecost-preparatory-school";

// Helper: parse front matter
function parseFrontMatter(md) {
  const fmMatch = md.match(/---\n([\s\S]*?)\n---/);
  if (!fmMatch) return {};
  const lines = fmMatch[1].split('\n');
  const data = {};
  lines.forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key) data[key.trim()] = rest.join(':').trim();
  });
  return data;
}

// Load markdown file from /content folder
async function loadContent(file) {
  const res = await fetch(`/content/${file}`);
  const md = await res.text();
  return parseFrontMatter(md);
}

// HEADER (works on all pages)
loadContent('header.md').then(data => {
  const header = document.getElementById('header');
  if (!header) return;

  const logo = document.getElementById('logo');
  const title = document.getElementById('header-title');
  const subtitle = document.getElementById('header-subtitle');

  if (logo && data.logo) logo.src = `images/${data.logo}`;
  if (title && data.title) title.textContent = data.title;
  if (subtitle && data.subtitle) subtitle.textContent = data.subtitle;
  if (header && data.background) header.style.backgroundImage = `url('images/${data.background}')`;
});

// HOME
loadContent('home.md').then(data => {
  const homeTitle = document.getElementById('home-title');
  const homeText = document.getElementById('home-body');
  const homeSection = document.getElementById('home');

  if (homeTitle && data.title) homeTitle.textContent = data.title;
  if (homeText && data.text) homeText.textContent = data.text;
  if (homeSection && data.background) homeSection.style.backgroundImage = `url('images/${data.background}')`;
});

// ABOUT
loadContent('about.md').then(data => {
  const aboutTitle = document.getElementById('about-title');
  const aboutText = document.getElementById('about-text');
  const aboutSection = document.getElementById('about');

  if (aboutTitle && data.title) aboutTitle.textContent = data.title;
  if (aboutText && data.body) aboutText.textContent = data.body;
  if (aboutSection && data.background) aboutSection.style.backgroundImage = `url('images/${data.background}')`;
});

// NEWS
loadContent('news.md').then(data => {
  const newsDiv = document.getElementById('news-items');
  if (!newsDiv) return;

  newsDiv.innerHTML = ""; // clear old content

  if (!data.items) return;

  data.items.forEach(item => {
    const newsItem = document.createElement('div');

    let imgHTML = '';
    if (item.image) imgHTML = `<img src="images/${item.image}" alt="${item.title}" style="max-width:100%; margin-bottom:20px;">`;

    newsItem.innerHTML = `
      <h3>${item.title || ''}</h3>
      <p>${item.description || ''}</p>
      ${imgHTML}
    `;
    newsDiv.appendChild(newsItem);
  });
});

// ADMISSIONS
loadContent('admissions.md').then(data => {
  const title = document.getElementById('admissions-title');
  const text = document.getElementById('admissions-text');

  if (title && data.form_header) title.textContent = data.form_header;
  if (text && data.instructions) text.textContent = data.instructions;
});

// CONTACT
loadContent('contact.md').then(data => {
  const phone = document.getElementById('contact-phone');
  const address = document.getElementById('contact-address');
  const email = document.getElementById('contact-email');

  if (phone && data.phone) phone.textContent = `Phone: ${data.phone}`;
  if (address && data.address) address.textContent = `Address: ${data.address}`;
  if (email && data.email) email.textContent = `Email: ${data.email}`;
});
