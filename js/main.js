/**
 * 主JS文件 - 主题切换
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initActiveNav();

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
});

function initActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a");

  // 不要全部移除，只更新不匹配的
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      // 匹配当前页面：确保有 active 类
      if (!link.classList.contains("active")) {
        link.classList.add("active");
      }
    } else {
      // 不匹配的页面：移除 active
      if (link.classList.contains("active")) {
        link.classList.remove("active");
      }
    }
  });
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    document.documentElement.setAttribute(
      "data-theme",
      prefersDark ? "dark" : "light",
    );
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  const button = document.getElementById("themeToggle");
  button.style.transform = "rotate(180deg)";
  setTimeout(() => (button.style.transform = "rotate(0)"), 300);
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      document.documentElement.setAttribute(
        "data-theme",
        e.matches ? "dark" : "light",
      );
    }
  });
