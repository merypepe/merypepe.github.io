// script.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-rsvp");
  const respuesta = document.getElementById("respuesta-form");

  // --- Scroll & Navigation Logic ---
  const nav = document.querySelector(".menu-nav");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mainMenu = document.getElementById("main-menu");
  const menuOverlay = document.getElementById("mobile-menu-overlay");
  const navLinks = document.querySelectorAll(".menu-nav a");

  // Scroll Threshold: 120px
  const SCROLL_THRESHOLD = 120;

  function updateNavOnScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
      // Close menu if open when returning to top
      if (mainMenu.classList.contains("open")) {
        closeMenu();
      }
    }
  }

  function toggleMenu() {
    const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    hamburgerBtn.setAttribute("aria-expanded", "true");
    hamburgerBtn.setAttribute(
      "aria-label",
      document.documentElement.lang === "es" ? "Cerrar menú" : "Close menu"
    );
    mainMenu.classList.add("open");
    menuOverlay.classList.add("open");
    hamburgerBtn.classList.add("active");
  }

  function closeMenu() {
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute(
      "aria-label",
      document.documentElement.lang === "es" ? "Abrir menú" : "Open menu"
    );
    mainMenu.classList.remove("open");
    menuOverlay.classList.remove("open");
    hamburgerBtn.classList.remove("active");
  }

  // Event Listeners
  window.addEventListener("scroll", updateNavOnScroll);
  hamburgerBtn.addEventListener("click", toggleMenu);
  menuOverlay.addEventListener("click", closeMenu);

  // Check initial state
  updateNavOnScroll();

  // Close menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Only needing to close if in "scrolled" (hamburger) mode
      if (nav.classList.contains("scrolled") || window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainMenu.classList.contains("open")) {
      closeMenu();
    }
  });

  // --- RSVP Form Logic ---
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      fetch(
        "https://script.google.com/macros/s/AKfycbykLOu5VBHkMo_77wwMC0BLDPLTRgvgBy_772hom4fXe6watsMvn29ZQzmFGeTSJAdJ/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(Object.fromEntries(formData)),
          headers: { "Content-Type": "application/json" },
        }
      )
        .then(() => {
          respuesta.textContent =
            document.documentElement.lang === "en"
              ? "Thank you! Your response has been sent."
              : "¡Gracias por confirmar!";
          respuesta.style.color = "green";
          form.reset();
        })
        .catch(() => {
          respuesta.textContent =
            document.documentElement.lang === "en"
              ? "Error sending. Please try again."
              : "Error al enviar. Intenta de nuevo.";
          respuesta.style.color = "red";
        });
    });
  }
});
