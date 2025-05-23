function filterMenu(category) {
  const items = document.querySelectorAll('[data-category]');
  items.forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function setActiveCategory(button, category) {
  // Hapus semua kelas aktif
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('bg-secondary', 'text-white', 'shadow');
    btn.classList.add('text-gray-500');
  });

  // Tambahkan kelas aktif ke tombol yang diklik
  button.classList.add('bg-secondary', 'text-white', 'shadow');
  button.classList.remove('text-gray-500');

  // Jalankan fungsi filter jika ada
  if (typeof filterMenu === 'function') {
    filterMenu(category);
  }
}

// Event listener untuk menunggu sampai konten HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
  // Memuat komponen header dan footer ke dalam halaman setelah DOM siap
  loadComponent("header-container", "./component/header.html");
  loadComponent("footer-container", "./component/footer.html");

  // Inisialisasi carousel ketika halaman siap
  const carousels = document.querySelectorAll('.carouselImages');
  carousels.forEach((carousel, index) => {
    let currentIndex = 0;
    const images = carousel.children;
    const indicators = document.querySelectorAll('.carouselIndicators')[index]?.children;
    const prevBtn = document.querySelectorAll('.prev-slide')[index];
    const nextBtn = document.querySelectorAll('.next-slide')[index];

    // Fungsi untuk memperbarui tampilan carousel
    function updateCarousel() {
      const offset = -currentIndex * 100;
      carousel.style.transform = `translateX(${offset}%)`;

      if (indicators) {
        for (let i = 0; i < indicators.length; i++) {
          indicators[i].classList.remove('bg-green-600');
          indicators[i].classList.add('bg-gray-300');
        }
        indicators[currentIndex].classList.add('bg-green-600');
      }
    }

    // Fungsi untuk berpindah ke slide berikutnya atau sebelumnya
    function moveSlide(step) {
      currentIndex = (currentIndex + step + images.length) % images.length;
      updateCarousel();
    }

    // Event listener tombol kiri dan kanan
    if (prevBtn) prevBtn.addEventListener('click', () => moveSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => moveSlide(1));

    // Otomatis berpindah slide setiap 3 detik
    setInterval(() => moveSlide(1), 3000);

    // Inisialisasi tampilan awal carousel
    updateCarousel();
  });
});


  // Tombol navigasi kiri
  const prevBtn = document.querySelector(".prev-slide");
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      moveSlide(-1);
    });
  }

  // Tombol navigasi kanan
  const nextBtn = document.querySelector(".next-slide");
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      moveSlide(1);
    });
  }

 
 
//HEADER
// Fungsi untuk memuat komponen (seperti header atau footer) ke dalam elemen dengan ID tertentu
function loadComponent(containerId, file) {
  fetch(file)  
    .then(response => response.text()) 
    .then(data => {
      document.getElementById(containerId).innerHTML = data;  
      setupMenu();  
      if (containerId === "footer-container") {
        setupFAQ();  
      }
    })
    .catch(error => console.error("Error loading " + file, error));  
}

// Fungsi untuk menyiapkan menu dropdown
function setupMenu() {
  const btn = document.getElementById("menu-btn");  
  const menu = document.getElementById("nav-menu");  

  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");  
    });
  }
}



// FOOTER
// Fungsi untuk menyiapkan interaksi FAQ (Frequently Asked Questions)
function setupFAQ() {
  const buttons = document.querySelectorAll('.faq-toggle'); 

  // Menambahkan event listener pada setiap tombol FAQ
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling; 
      const icon = button.querySelector('span:last-child');  

      // Menutup semua konten FAQ lainnya
      buttons.forEach(otherBtn => {
        const otherContent = otherBtn.nextElementSibling;
        const otherIcon = otherBtn.querySelector('span:last-child');

        if (otherBtn !== button) {
          otherContent.classList.add('hidden');  
          otherIcon.textContent = '+'; 
        }
      });

      const isHidden = content.classList.contains('hidden');
      content.classList.toggle('hidden', !isHidden);  
      icon.textContent = isHidden ? '−' : '+'; 

      if (isHidden) {
        content.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}