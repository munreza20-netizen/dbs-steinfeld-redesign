function toggleSearch(event) {
if (event) event.preventDefault();
const searchOverlay = document.getElementById("search-overlay");
const searchInput = searchOverlay.querySelector("input");

if (searchOverlay.style.display === "flex") {
searchOverlay.style.display = "none";
} else {
searchOverlay.style.display = "flex";
searchInput.focus();
}
}

// بستن پنجره جستجو با کلید Escape
document.addEventListener("keydown", function(event) {
if (event.key === "Escape") {
const searchOverlay = document.getElementById("search-overlay");
if (searchOverlay && searchOverlay.style.display === "flex") {
searchOverlay.style.display = "none";
}
}
});

// ۲. اسلایدر عکس‌ها به همراه پخش خودکار
const images = [
"https://dbs-steinfeld.de/wp-content/uploads/elementor/thumbs/DJI_0005-ouvknx50ub4s1o15ibbca674kwyiwkg605v8899qts.jpg"
];

let currentIndex = 0;

function changeSlide(direction) {
const sliderImg = document.getElementById("school-slider");
if (!sliderImg || images.length === 0) return;

currentIndex += direction;
if (currentIndex >= images.length) {
currentIndex = 0;
} else if (currentIndex < 0) {
currentIndex = images.length - 1;
}
sliderImg.src = images[currentIndex];
}

setInterval(function() {
changeSlide(1);
}, 4000);

// ۳. جستجوی زنده (Live Search)
function liveSearch() {
const input = document.getElementById("search-input").value.toLowerCase();
const resultsList = document.getElementById("search-results");
resultsList.innerHTML = "";

if (input.trim() === "") return;

const allLinks = document.querySelectorAll(".header-ünten a");
let foundCount = 0;

allLinks.forEach(function(link) {
const text = link.textContent.trim();
if (text !== "" && text.toLowerCase().includes(input)) {
const li = document.createElement("li");
const a = document.createElement("a");
a.href = link.href;
a.textContent = text;
li.appendChild(a);
resultsList.appendChild(li);
foundCount++;
}
});

if (foundCount === 0) {
const li = document.createElement("li");
li.style.padding = "0.8rem 1rem";
li.style.color = "#777";
li.textContent = "Keine Ergebnisse gefunden";
resultsList.appendChild(li);
}
}

// ۴. بنر کوکی‌ها
window.addEventListener("load", function() {
const cookieBanner = document.getElementById("cookie-banner");
const isAccepted = localStorage.getItem("dbs_cookies_accepted");
if (cookieBanner && !isAccepted) {
cookieBanner.style.display = "block";
}
});

function acceptCookies() {
const cookieBanner = document.getElementById("cookie-banner");
localStorage.setItem("dbs_cookies_accepted", "true");
if (cookieBanner) cookieBanner.style.display = "none";
}

// ۵. باز کردن متن کامل خبرها در پنجره Modal
const readMoreLinks = document.querySelectorAll(".news-link");
readMoreLinks.forEach(function(link) {
link.addEventListener("click", function(event) {
event.preventDefault();
const card = link.closest(".news-card");
const date = card.querySelector(".news-date").textContent;
const title = card.querySelector("h3").textContent;
const summary = card.querySelector("p").textContent;

document.getElementById("modal-date").textContent = date;
document.getElementById("modal-title").textContent = title;
document.getElementById("modal-text").textContent = summary + " Weitere Details und Anmeldeformulare finden Sie im Sekretariat oder über unser ISERV-Portal.";
document.getElementById("news-modal").style.display = "flex";
});
});

function closeModal(event) {
if (event.target.id === "news-modal" || event.target.classList.contains("modal-close")) {
document.getElementById("news-modal").style.display = "none";
}
}

// ۶. منوی موبایل
function toggleMobileMenu() {
const menu = document.querySelector(".header-ünten__menu");
const icon = document.querySelector(".header__icon i");
menu.classList.toggle("active");
if (menu.classList.contains("active")) {
icon.classList.remove("fa-bars");
icon.classList.add("fa-times");
} else {
icon.classList.remove("fa-times");
icon.classList.add("fa-bars");
}
}

document.addEventListener("DOMContentLoaded", function () {
const allMenuItems = document.querySelectorAll(".header-ünten__links, .menu-link__akt1");

allMenuItems.forEach(function (item) {
const subMenu = item.querySelector(":scope > .sub-menu, :scope > .contorolle, :scope > .contorolle1, :scope > .contorolle2");
const link = item.querySelector(":scope > a");

if (subMenu && link) {
link.addEventListener("click", function (e) {
if (window.innerWidth <= 991) {
e.preventDefault();
e.stopPropagation();

const isOpen = item.classList.contains("open-sub") || subMenu.style.display === "block";
if (isOpen) {
item.classList.remove("open-sub");
subMenu.style.display = "none";
} else {
item.classList.add("open-sub");
subMenu.style.display = "block";
}
}
});
}
});
});

// ۷. ارسال واقعی فرم تماس به ایمیل از طریق Web3Forms
async function handleContactSubmit(event) {
event.preventDefault();
const feedback = document.getElementById("form-feedback");
const form = document.getElementById("school-contact-form");
const submitBtn = form.querySelector("button[type='submit']");

const originalBtnText = submitBtn.innerHTML;
submitBtn.disabled = true;
submitBtn.innerHTML = "Wird gesendet...";

const formData = new FormData(form);

try {
const response = await fetch("https://web3forms.com", {
method: "POST",
body: formData
});
const data = await response.json();

if (data.success) {
feedback.style.display = "block";
feedback.style.color = "#155724";
feedback.innerHTML = "✅ <strong>Vielen Dank!</strong> Ihre Nachricht wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.";
form.reset();
} else {
feedback.style.display = "block";
feedback.style.color = "#721c24";
feedback.innerHTML = "❌ Fehler beim Senden: " + (data.message || "Bitte versuchen Sie es erneut.");
}
} catch (error) {
feedback.style.display = "block";
feedback.style.color = "#721c24";
feedback.innerHTML = "❌ Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.";
} finally {
submitBtn.disabled = false;
submitBtn.innerHTML = originalBtnText;
setTimeout(() => {
feedback.style.display = "none";
}, 7000);
}
}

// ۸. منو و مودال اعلام غیبت / بیماری (دو حالته با قفل همکاران)
const KOLLEGIUM_CODE = "DBS2026"; // رمز عبور همکاران

function toggleKrankDropdown(event) {
if (event) {
event.preventDefault();
event.stopPropagation();
}
const dropdown = document.getElementById('krankDropdown');
if (dropdown) {
dropdown.classList.toggle('active');
}
}

function selectKrankType(type) {
const dropdown = document.getElementById('krankDropdown');
if (dropdown) {
dropdown.classList.remove('active');
}
openKrankModal(type);
}

function openKrankModal(type) {
const modal = document.getElementById('krankModal');
if (modal) {
modal.classList.add('active');
switchKrankTab(type || 'schueler');
}
}

function closeKrankModal() {
const modal = document.getElementById('krankModal');
if (modal) {
modal.classList.remove('active');
}
}

function switchKrankTab(type) {
const formSchueler = document.getElementById('krankmeldung-form');
const formKollegium = document.getElementById('krankmeldung-kollegium-form');
const lockBox = document.getElementById('kollegium-lock-box');
const tabSchueler = document.getElementById('tab-krank-schueler');
const tabKollegium = document.getElementById('tab-krank-kollegium');

if (!formSchueler || !formKollegium) return;

if (type === 'kollegium') {
formSchueler.style.display = 'none';
if (tabKollegium) tabKollegium.classList.add('active');
if (tabSchueler) tabSchueler.classList.remove('active');

const savedCode = localStorage.getItem('dbs_kollegium_saved_code');
if (savedCode === KOLLEGIUM_CODE) {
if (lockBox) lockBox.style.display = 'none';
formKollegium.style.display = 'block';
} else {
formKollegium.style.display = 'none';
if (lockBox) lockBox.style.display = 'block';
}
} else {
if (lockBox) lockBox.style.display = 'none';
formKollegium.style.display = 'none';
formSchueler.style.display = 'block';
if (tabSchueler) tabSchueler.classList.add('active');
if (tabKollegium) tabKollegium.classList.remove('active');
}
}

function checkKollegiumPassword() {
  const input = document.getElementById('kollegium-pass-input');
  const errorMsg = document.getElementById('kollegium-pass-error');
  const lockBox = document.getElementById('kollegium-lock-box');
  const formKollegium = document.getElementById('krankmeldung-kollegium-form');

  if (input && input.value === KOLLEGIUM_CODE) {
    localStorage.setItem('dbs_kollegium_saved_code', KOLLEGIUM_CODE);
    if (errorMsg) errorMsg.style.display = 'none';
    if (lockBox) lockBox.style.display = 'none';
    if (formKollegium) formKollegium.style.display = 'block';
  } else {
    if (errorMsg) errorMsg.style.display = 'block';
  }
}

function lockKollegiumForm() {
  localStorage.removeItem('dbs_kollegium_saved_code');
  switchKrankTab('kollegium');
}

// ۹. هایلایت خودکار غذای امروز و تاریخ خودکار در فرم غیبت
window.addEventListener("load", function () {
  const jetzt = new Date();

  // الف) هایلایت غذای امروز در جدول Mensa
  const tage = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  const heuteName = tage[jetzt.getDay()];

  document.querySelectorAll(".mensa-table tr").forEach(function (zeile) {
    const tagZelle = zeile.querySelector(".mensa-day");
    if (tagZelle && tagZelle.textContent.indexOf(heuteName) !== -1) {
      zeile.style.backgroundColor = "#eef6ff";
      zeile.style.borderLeft = "4px solid #0056b3";
      tagZelle.innerHTML += ' <span style="background:#0056b3; color:#fff; font-size:0.75em; padding:2px 6px; border-radius:4px; margin-left:5px;">Heute</span>';
    }
  });

  // ب) پر کردن خودکار تاریخ امروز در فیلدهای تاریخ فرم غیبت
  const tag = String(jetzt.getDate()).padStart(2, '0');
  const monat = String(jetzt.getMonth() + 1).padStart(2, '0');
  const jahr = jetzt.getFullYear();
  const deutschesDatum = "Heute, " + tag + "." + monat + "." + jahr;

  document.querySelectorAll('input[name="zeitraum"]').forEach(function (input) {
    if (!input.value) {
      input.value = deutschesDatum;
    }
  });
});
