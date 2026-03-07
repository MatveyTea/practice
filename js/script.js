"use strict";
// Начальные настройки
window.addEventListener("DOMContentLoaded", () => {
    setBurgerMenu();
    setWidthComment();
});

window.addEventListener("resize", () => {
    setTimeout(function () {
        setBurgerMenu();
        setWidthComment();
        rightArrow.click();
    }, 250);
});

// Переход к нужным элементов по шапке
const headerLinks = document.querySelectorAll("*[data-scroll-id]");
headerLinks.forEach((link) => {
    const element = document.getElementById(link.dataset.scrollId);
    if (!element) return;

    link.addEventListener("click", (event) => {
        event.preventDefault();
        if (window.screen.width <= 768 && link.tagName != "BUTTON") {
            document.querySelector(".header-mobile-burger").click();
        }
        window.scrollTo({
            "behavior": "smooth",
            "top": window.scrollY + element.getBoundingClientRect().top - 100
        });
    });
});

// Эффектное появление элементов
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.3) {
            let delay = 0.2;
            Array.from(entry.target.children[0].children).forEach((elem, index) => {
                elem.classList.add("fade-in");
                elem.style.animationDelay = `${delay * index}s`;
            });
        }
    });
}, { threshold: [0, 0.3, 1] });
const elements = document.querySelectorAll("[id]");
elements.forEach((element) => observer.observe(element));

// Загрузка фотографий для галереи
const galleryButton = document.querySelector(".gallery-button");
const galleryLoader = document.querySelector(".gallery-loader");
const galleryLoaderText = document.createElement("p");
galleryLoaderText.classList.add("gallery-loader-text", "fade-in");
galleryLoaderText.textContent = "Представьте, что сюда что-то добавилось, потому что это лендинг без сервера, тут нет возможности что-либо загружать.";
galleryButton.addEventListener("click", () => {
    if (galleryButton.classList.contains("load")) return;
    galleryLoader.classList.add("load");
    setTimeout(() => {
        galleryLoader.classList.remove("load");
        galleryLoader.insertAdjacentElement("beforebegin", galleryLoaderText.cloneNode(true));
    }, 2000);
});

// Слайдер для отзывов
const commentsSlider = document.querySelector(".comments-slider");
const commentsContent = document.querySelector(".comments-content");
const leftArrow = document.querySelector(".comments-left");
const rightArrow = document.querySelector(".comments-right");
let step = 0;
let currentIndexComment = 0;
let currentTranslate = 0;

leftArrow.addEventListener("click", () => {
    if (currentIndexComment <= 0) {
        leftArrow.classList.add("disabled");
        return;
    };
    currentIndexComment--;
    leftArrow.classList.toggle("disabled", currentIndexComment <= 0);
    rightArrow.classList.toggle("disabled", currentIndexComment >= commentsContent.children.length - 1);
    currentTranslate += step;
    commentsContent.style.transform = `translateX(${currentTranslate}px)`;
});

rightArrow.addEventListener("click", () => {
    if (currentIndexComment >= commentsContent.children.length - 1) {
        rightArrow.classList.add("disabled");
        return;
    };
    currentIndexComment++;
    leftArrow.classList.toggle("disabled", currentIndexComment <= 0);
    rightArrow.classList.toggle("disabled", currentIndexComment >= commentsContent.children.length - 1);
    currentTranslate -= step;
    commentsContent.style.transform = `translateX(${currentTranslate}px)`;
});

// Функции
function setWidthComment() {
    const width = commentsSlider.getBoundingClientRect().width;
    step = width + 30;
    currentTranslate = 0;
    currentIndexComment = 0;
    leftArrow.click();
    commentsContent.style.transform = `translateX(${currentTranslate}px)`;
    Array.from(commentsContent.children).forEach((comment) => comment.style.width = `${width}px`);
}

function setBurgerMenu() {
    const burger = document.querySelector(".header-mobile-burger");
    const content = document.querySelector(".header-mobile-content");

    if (window.screen.width > 768) {
        burger.classList.remove("open");
        content.style.display = "none";
    } else {
        burger.onclick = function () {
            burger.classList.toggle("open");
            if (burger.classList.contains("open")) {
                content.style.display = "flex";
                setTimeout(() => content.style.opacity = "1", 10);
            } else {
                content.style.opacity = "0";
                setTimeout(() => content.style.display = "none", 300);
            }
        }
    }
}