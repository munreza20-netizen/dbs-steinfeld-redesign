function toggleSearch(event) {
if (event) event.preventDefault();
const searchOverlay = document.getElementById("search-overlay");
const searchInput = searchOverlay.querySelector("input");

if (searchOverlay.style.display === "flex") {
searchOverlay.style.display = "none";
} else {
searchOverlay.style.display = "flex";
searchInput.focus(); // نشانگر موس خودبه‌خود داخل کادر جستجو می‌رود تا کاربر بلافاصله تایپ کند
}
}

// بستن پنجره جستجو با زدن کلید Escape روی کیبورد (یک ویژگی بسیار حرفه‌ای)
document.addEventListener("keydown", function(event) {
if (event.key === "Escape") {
const searchOverlay = document.getElementById("search-overlay");
if (searchOverlay.style.display === "flex") {
searchOverlay.style.display = "none";
}
}
});

// ۲. اسلایدر عکس‌ها به همراه پخش خودکار (Autoplay)
const images = [
"https://dbs-steinfeld.de/wp-content/uploads/elementor/thumbs/DJI_0005-ouvknx50ub4s1o15ibbca674kwyiwkg605v8899qts.jpg",
"https://dbs-steinfeld.de/wp-content/uploads/elementor/thumbs/DJI_0005-ouvknx50ub4s1o15ibbca674kwyiwkg605v8899qts.jpg"
// می‌توانید هر تعداد عکس دیگر که خواستید اینجا اضافه کنید
];

let currentIndex = 0;

function changeSlide(direction) {
currentIndex += direction;

if (currentIndex >= images.length) {
currentIndex = 0;
} else if (currentIndex < 0) {
currentIndex = images.length - 1;
}

const sliderImg = document.getElementById("school-slider");
sliderImg.src = images[currentIndex];
}

// تغییر خودکار عکس‌ها هر ۴ ثانیه یک‌بار (4000 میلی‌ثانیه)
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

window.addEventListener("load", function() {
const cookieBanner = document.getElementById("cookie-banner");
// بررسی اینکه آیا کاربر قبلاً دکمه تایید را زده است یا نه
const isAccepted = localStorage.getItem("dbs_cookies_accepted");

if (!isAccepted) {
cookieBanner.style.display = "block";
}
});

function acceptCookies() {
const cookieBanner = document.getElementById("cookie-banner");
// ذخیره تاییدیه در حافظه مرورگر
localStorage.setItem("dbs_cookies_accepted", "true");
// مخفی کردن نوار
cookieBanner.style.display = "none";
}

// ۵. باز کردن متن کامل خبرها در پنجره Modal
const readMoreLinks = document.querySelectorAll(".news-link");

readMoreLinks.forEach(function(link) {
link.addEventListener("click", function(event) {
event.preventDefault();
// پیدا کردن کارت خبری که روی دکمه آن کلیک شده است
const card = link.closest(".news-card");
const date = card.querySelector(".news-date").textContent;
const title = card.querySelector("h3").textContent;
const summary = card.querySelector("p").textContent;

// قرار دادن اطلاعات در پنجره Modal
document.getElementById("modal-date").textContent = date;
document.getElementById("modal-title").textContent = title;
document.getElementById("modal-text").textContent = summary + " Weitere Details und Anmeldeformulare finden Sie im Sekretariat oder über unser ISERV-Portal.";

// نمایش پنجره
document.getElementById("news-modal").style.display = "flex";
});
});

function closeModal(event) {
// فقط زمانی بسته شود که روی پس‌زمینه تیره یا دکمه ضربدر کلیک شود
if (event.target.id === "news-modal" || event.target.classList.contains("modal-close")) {
document.getElementById("news-modal").style.display = "none";
}
}

function toggleMobileMenu() {
const menu = document.querySelector(".header-ünten__menu");
const icon = document.querySelector(".header__icon i");

// اضافه یا حذف کردن کلاس active
menu.classList.toggle("active");
// تغییر آیکون از سه خط (fa-bars) به ضربدر (fa-times) و برعکس
if (menu.classList.contains("active")) {
icon.classList.remove("fa-bars");
icon.classList.add("fa-times");
} else {
icon.classList.remove("fa-times");
icon.classList.add("fa-bars");
}
}
document.addEventListener("DOMContentLoaded", function () {
  // انتخاب تمام آیتم‌های منوی سطح اول و دوم در موبایل
  const allMenuItems = document.querySelectorAll(".header-ünten__links, .menu-link__akt1");

  allMenuItems.forEach(function (item) {
    // پیدا کردن زیرمنوی داخل این آیتم (چه سطح دوم و چه سطح سوم)
    const subMenu = item.querySelector(":scope > .sub-menu, :scope > .contorolle, :scope > .contorolle1, :scope > .contorolle2");
    const link = item.querySelector(":scope > a");

    if (subMenu && link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();      // جلوگیری از رفرش یا پرش صفحه
          e.stopPropagation();     // جلوگیری از تداخل کلیک با منوهای والد

          // بررسی اینکه آیا این زیرمنو الان باز است یا نه
          const isOpen = item.classList.contains("open-sub") || subMenu.style.display === "block";

          if (isOpen) {
            // اگر باز است، ببند
            item.classList.remove("open-sub");
            subMenu.style.display = "none";
          } else {
            // اگر بسته است، باز کن
            item.classList.add("open-sub");
            subMenu.style.display = "block";
          }
        }
      });
    }
  });
});
