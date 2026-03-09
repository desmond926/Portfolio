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
    
// URL du flux RSS Ubuntu Security Notices
const rssUrl = "https://ubuntu.com/security/notices/rss";

// Proxy pour contourner le CORS
const proxy = "https://api.allorigins.win/get?url=" + encodeURIComponent(rssUrl);

fetch(proxy)
  .then(response => response.json())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");
    const items = xml.querySelectorAll("item");

    let html = "<h2>Ubuntu Security Notices</h2><ul>";

    items.forEach((item, index) => {
      if (index >= 10) return; // Limite à 10 entrées
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const date = item.querySelector("pubDate").textContent;

      html += `
        <li>
          <a href="${link}" target="_blank">${title}</a><br>
          <small>${date}</small>
        </li>
      `;
    });

    html += "</ul>";
    document.getElementById("rss-container").innerHTML = html;
  })
  .catch(error => {
    document.getElementById("rss-container").innerHTML = "Erreur lors du chargement du flux RSS.";
    console.error(error);
  });
