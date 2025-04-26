document.addEventListener("DOMContentLoaded", function () {
  loadComponent("header-container", "header.html");
});

function loadComponent(containerId, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
      setupMenu();
    })
    .catch(error => console.error("Error loading " + file, error));
}

function setupMenu() {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("nav-menu");

  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }
}
