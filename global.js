console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

const navLinks = $$("nav a");

const currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname
);

currentLink?.classList.add("current");

let pages = [
    { url: "", title: "Home" },
    { url: "projects/", title: "Projects" },
    { url: "contact/", title: "Contact" },
    { url: "CV/", title: "CV" },
    { url: "https://github.com/aditgautam", title: "GitHub" },
];

let BASE_PATH =
  (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "/"
    : "/portfolio/";

let nav = document.createElement("nav");
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  url = !url.startsWith("http") ? BASE_PATH + url : url;

  let a = document.createElement("a");
  a.href = url;
  a.textContent = p.title;

  a.classList.toggle(
    "current",
    a.host === location.host && a.pathname === location.pathname
  );

  if (a.host !== location.host) {
    a.target = "_blank";
    a.rel = "noopener";
  }

  nav.append(a);
}

document.body.insertAdjacentHTML(
  "afterbegin",
  `
  <label class="color-scheme">
    Theme:
    <select>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
`
);

let select = document.querySelector("label.color-scheme select");

let setColorScheme = function (scheme) {
  document.documentElement.style.setProperty("color-scheme", scheme);
  localStorage.colorScheme = scheme;
};

if ("colorScheme" in localStorage) {
  select.value = localStorage.colorScheme;
} else {
  select.value = "light dark";
}
setColorScheme(select.value);

select.addEventListener("input", function (e) {
  setColorScheme(e.target.value);
});

export async function fetchJSON(url) {
try {
// Fetch the JSON file from the given URL
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const data = await response.json();
    return data;

} catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
}
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  if (!(containerElement instanceof Element)) return;
  const list = Array.isArray(projects) ? projects : (projects ? [projects] : []);
  containerElement.innerHTML = '';
  const tag = /^h[1-6]$/i.test(headingLevel) ? headingLevel.toLowerCase() : 'h2';

  for (const p of list) {
    const a = document.createElement('article');
    const h = document.createElement(tag); h.textContent = p?.title ?? 'Untitled';
    const img = document.createElement('img');
    img.src = p?.image ?? 'https://vis-society.github.io/labs/2/images/empty.svg';
    img.alt = p?.title ?? 'Project image';
    const desc = document.createElement('p'); desc.textContent = p?.description ?? '';
    a.append(h, img, desc);
    containerElement.append(a);
  }

  if (list.length === 0) {
    const note = document.createElement('p');
    note.textContent = 'No projects to display.';
    containerElement.append(note);
  }
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}
