/* Cookie consent for veyndesk.github.io.
 * Google Analytics (gtag.js) is loaded ONLY after the visitor clicks "Accept".
 * The choice is kept in localStorage ("veyndesk-consent" = "granted" | "denied") and can be
 * changed any time with the "Cookie settings" link in the footer.
 */
(function () {
  var GA_ID = "G-KYB9KTLWHL";
  var KEY = "veyndesk-consent";

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("consent", "default", {
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied"
  });

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var loaded = false;
  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    gtag("consent", "update", { analytics_storage: "granted" });
    gtag("js", new Date());
    gtag("config", GA_ID);
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
  }

  function clearGaCookies() {
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (name.indexOf("_ga") !== 0) return;
      var host = location.hostname;
      [host, "." + host, ""].forEach(function (d) {
        document.cookie = name + "=; Max-Age=0; path=/" + (d ? "; domain=" + d : "");
      });
    });
  }

  function choose(v) {
    var before = read();
    save(v);
    hide();
    if (v === "granted") loadAnalytics();
    else if (before === "granted") {
      gtag("consent", "update", { analytics_storage: "denied" });
      clearGaCookies();
      location.reload(); // unload the already-running Analytics script
    }
  }

  var banner;
  function show() {
    if (!banner) {
      banner = document.createElement("div");
      banner.className = "consent";
      banner.setAttribute("role", "region");
      banner.setAttribute("aria-label", "Cookie consent");
      banner.innerHTML =
        '<p><b>Cookies on this website</b><br>We’d like to use Google Analytics cookies to count visits and see which pages help. ' +
        'They’re only set if you accept. The Veyndesk app itself never uses analytics. <a href="/privacy/#website">Privacy</a></p>' +
        '<div class="consent-btns"><button type="button" class="btn ghost small" data-c="denied">Reject</button>' +
        '<button type="button" class="btn primary small" data-c="granted">Accept</button></div>';
      banner.addEventListener("click", function (e) {
        var c = e.target.getAttribute && e.target.getAttribute("data-c");
        if (c) choose(c);
      });
      document.body.appendChild(banner);
    }
    banner.hidden = false;
  }
  function hide() { if (banner) banner.hidden = true; }

  if (read() === "granted") loadAnalytics();

  document.addEventListener("DOMContentLoaded", function () {
    if (!read()) show();
    document.querySelectorAll("[data-cookie-settings]").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); show(); });
    });
  });
})();
