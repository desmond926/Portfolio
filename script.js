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
    
const RSS_URL = "https://ubuntu.com/security/notices/rss";
const API = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(RSS_URL);

fetch(API)
  .then(response => response.json())
  .then(data => {
    if (!data.items) {
      document.getElementById("rss-container").innerHTML = "Impossible de lire le flux.";
      return;
    }

    let html = "<h2>Ubuntu Security Notices</h2><ul>";

    data.items.slice(0, 10).forEach(item => {
      html += `
        <li>
          <a href="${item.link}" target="_blank">${item.title}</a><br>
          <small>${item.pubDate}</small>
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
