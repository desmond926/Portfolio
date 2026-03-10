document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        });
        });

document.querySelector('form').addEventListener('submit', function() {
    });
    
document.addEventListener("DOMContentLoaded", () => {
  const RSS_URL = "https://www.linuxtoday.com/feed/";
  const API = "https://api.allorigins.win/raw?url=" + encodeURIComponent(RSS_URL);

  fetch(API)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur réseau");
      }
      return response.text();
    })
    .then(str => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(str, "text/xml");
      const items = xml.querySelectorAll("item");

      const container = document.getElementById("rss-container");
      if (!container) return;

      if (!items.length) {
        container.innerHTML = "Impossible de lire le flux.";
        return;
      }

      let html = "<h2>Linux Today – Derniers articles</h2><ul>";

      items.forEach((item, index) => {
        if (index >= 10) return;

        const title = item.querySelector("title")?.textContent || "Sans titre";
        const link = item.querySelector("link")?.textContent || "#";
        const date = item.querySelector("pubDate")?.textContent || "";

        html += `
          <li>
            <a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a><br>
            <small>${date}</small>
          </li>
        `;
      });

      html += "</ul>";
      container.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      const container = document.getElementById("rss-container");
      if (container) {
        container.innerHTML = "Erreur lors du chargement du flux RSS.";
      }
    });
});
