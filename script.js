document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        });
        });

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Formulaire soumis ! (Fonctionnalité à configurer)');
    });
    
document.addEventListener("DOMContentLoaded", () => {
  const RSS_URL = "https://planet.ubuntu.com/rss20.xml";
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

      if (!items.length) {
        document.getElementById("rss-container").innerHTML =
          "Impossible de lire le flux.";
        return;
      }

      let html = "<h2>Planet Ubuntu – Derniers articles</h2><ul>";

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
      document.getElementById("rss-container").innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      document.getElementById("rss-container").innerHTML =
        "Erreur lors du chargement du flux RSS.";
    });
});