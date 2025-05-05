document.addEventListener("DOMContentLoaded", function () {
  loadComponent("header-container", "./component/header.html");
  loadComponent("footer-container", "./component/footer.html");
});

function loadComponent(containerId, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
      setupMenu();
      if (containerId === "footer-container") {
        setupFAQ(); // Jalankan setup FAQ hanya setelah footer dimuat
      }
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

function setupFAQ() {
  const buttons = document.querySelectorAll('.faq-toggle');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('span:last-child');

      // Tutup semua konten FAQ lainnya
      buttons.forEach(otherBtn => {
        const otherContent = otherBtn.nextElementSibling;
        const otherIcon = otherBtn.querySelector('span:last-child');

        if (otherBtn !== button) {
          otherContent.classList.add('hidden');
          otherIcon.textContent = '+';
        }
      });

      // Toggle konten yang diklik
      const isHidden = content.classList.contains('hidden');
      content.classList.toggle('hidden', !isHidden);
      icon.textContent = isHidden ? '−' : '+';

      // Scroll jika dibuka
      if (isHidden) {
        content.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
