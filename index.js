// Sistema de gestión de tema (claro/oscuro)
class ThemeManager {
  constructor() {
    this.init();
    this.bindEvents();
  }

  init() {
    // Verifica si el usuario tiene una preferencia en localStorage
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (prefersDark) {
      this.setTheme("dark");
    } else {
      this.setTheme("light");
    }
  }

  setTheme(theme) {
    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      this.updateButtonStates("dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      this.updateButtonStates("light");
    }
  }

  updateButtonStates(currentTheme) {
    const lightBtns = document.querySelectorAll(
      "#light-mode-btn, #light-mode-btn-mobile"
    );
    const darkBtns = document.querySelectorAll(
      "#dark-mode-btn, #dark-mode-btn-mobile"
    );

    if (currentTheme === "dark") {
      lightBtns.forEach((btn) =>
        btn.classList.remove("ring-2", "ring-yellow-400")
      );
      darkBtns.forEach((btn) => btn.classList.add("ring-2", "ring-gray-400"));
    } else {
      lightBtns.forEach((btn) =>
        btn.classList.add("ring-2", "ring-yellow-400")
      );
      darkBtns.forEach((btn) =>
        btn.classList.remove("ring-2", "ring-gray-400")
      );
    }
  }

  bindEvents() {
    // Botones de modo claro
    document
      .querySelectorAll("#light-mode-btn, #light-mode-btn-mobile")
      .forEach((btn) => {
        btn.addEventListener("click", () => this.setTheme("light"));
      });

    // Botones de modo oscuro
    document
      .querySelectorAll("#dark-mode-btn, #dark-mode-btn-mobile")
      .forEach((btn) => {
        btn.addEventListener("click", () => this.setTheme("dark"));
      });

    // Escucha cambios en el tema del sistema
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          this.setTheme(e.matches ? "dark" : "light");
        }
      });
  }
}

// Funcionalidad del menú móvil
function initMobileMenu() {
  // Soporte para múltiples menús mobile con ids únicos
  const menuButtons = document.querySelectorAll('[id^="mobile-menu-button"]');
  menuButtons.forEach((btn) => {
    const suffix = btn.id.replace("mobile-menu-button", "");
    const menu = document.getElementById("mobile-menu" + suffix);
    if (menu) {
      btn.addEventListener("click", function () {
        menu.classList.toggle("hidden");
      });
    }
  });
}

// Inicializa todo cuando el DOM está cargado
document.addEventListener("DOMContentLoaded", function () {
  new ThemeManager();
  initMobileMenu();
});

// Animación de los botones para mejorar la UI
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll('[id*="mode-btn"]');
  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });
});
