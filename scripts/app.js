function toggleSearch(event) {
if (event) event.preventDefault();
const searchOverlay = document.getElementById("search-overlay");
const searchInput = searchOverlay ? searchOverlay.querySelector("input") : null;

if (!searchOverlay) return;

if (searchOverlay.style.display === "flex") {
searchOverlay.style.display = "none";
} else {
searchOverlay.style.display = "flex";
if (searchInput) searchInput.focus();
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
"./imag/schule-aussen.JPG"
// در صورت داشتن عکس‌های بیشتر، مسیر آن‌ها را با ویرگول اینجا اضافه کنید
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
const searchInput = document.getElementById("search-input");
const resultsList = document.getElementById("search-results");
if (!searchInput || !resultsList) return;

const input = searchInput.value.toLowerCase();
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
document.getElementById("modal-text").textContent = summary + " Weitere Details und Anmeldeformulare finden Sie im Sekretariat oder über unser IServ-Portal.";
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
if (!menu) return;

menu.classList.toggle("active");
if (icon) {
if (menu.classList.contains("active")) {
icon.classList.remove("fa-bars");
icon.classList.add("fa-times");
} else {
icon.classList.remove("fa-times");
icon.classList.add("fa-bars");
}
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
const response = await fetch("https://api.web3forms.com/submit", {
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

// ۸. منو و مودال اعلام غیبت / بیماری (امن‌سازی شده با اتصال مستقیم به IServ برای همکاران)
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

// برای همکاران: انتقال مستقیم به بخش ایمیل در IServ (بدون خطا)
if (type === 'kollegium') {
window.open('https://dbs-iserv.de', '_blank', 'noopener,noreferrer');
return;
}

// برای والدین: حذف پاپ‌آپ و باز کردن مستقیم ایمیل خود والدین با متن آماده

  window.location.href = 'mailto:dbs-steinfeld@t-online.de?subject=Krankmeldung%20Sch%C3%BCler%2Fin&body=Sehr%20geehrte%20Damen%20und%20Herren%2C%0A%0Ahiermit%20melde%20ich%20mein%20Kind%20krank%3A%0A%0AName%20des%20Kindes%3A%20%0AKlasse%3A%20%0ADatum%3A%20%0A%0AMit%20freundlichen%20Gr%C3%BC%C3%9Fen';

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
if (type === 'kollegium') {
closeKrankModal();
window.open('https://dbs-iserv.de/iserv/mail/', '_blank', 'noopener,noreferrer');
return;
}

const formSchueler = document.getElementById('krankmeldung-form');
const formKollegium = document.getElementById('krankmeldung-kollegium-form');
const lockBox = document.getElementById('kollegium-lock-box');
const tabSchueler = document.getElementById('tab-krank-schueler');
const tabKollegium = document.getElementById('tab-krank-kollegium');

if (lockBox) lockBox.style.display = 'none';
if (formKollegium) formKollegium.style.display = 'none';
if (formSchueler) formSchueler.style.display = 'block';
if (tabSchueler) tabSchueler.classList.add('active');
if (tabKollegium) tabKollegium.classList.remove('active');
}

// ۹. بارگذاری خودکار نوار هشدار قرمز از پنل مدیریت (Pages CMS)
document.addEventListener("DOMContentLoaded", function() {
fetch('data/hinweis.json?t=' + new Date().getTime())
.then(response => response.json())
.then(data => {
const banner = document.getElementById('emergencyBanner');
const textSpan = document.getElementById('emergencyText');
if (banner && textSpan) {
if (data.active) {
banner.style.display = 'flex';
textSpan.textContent = data.text;
} else {
banner.style.display = 'none';
}
}
})
.catch(err => console.error('Hinweis error:', err));
});

