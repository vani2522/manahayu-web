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
  let currentIndex = 0;  
  const images = document.getElementById('carouselImages').children; 
  const indicators = document.getElementById('carouselIndicators').children; 

  // Fungsi untuk memperbarui tampilan carousel
  function updateCarousel() {
    const offset = -currentIndex * 100;  
    document.getElementById('carouselImages').style.transform = `translateX(${offset}%)`;  

    // Mengubah indikator aktif pada carousel
    for (let i = 0; i < indicators.length; i++) {
      indicators[i].classList.remove('bg-green-600'); 
      indicators[i].classList.add('bg-gray-300');  
    }
    indicators[currentIndex].classList.add('bg-green-600');  
  }

  // Fungsi untuk berpindah ke slide berikutnya atau sebelumnya
  function moveSlide(step) {
    currentIndex += step;  
    if (currentIndex >= images.length) currentIndex = 0;  
    if (currentIndex < 0) currentIndex = images.length - 1;  
    updateCarousel();  
  }

  // Optional: Otomatis berpindah slide setiap 3 detik
  setInterval(() => moveSlide(1), 3000);

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
});

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


  const overlay = document.getElementById('lightboxOverlay');
  const overlayImg = document.getElementById('lightboxImage');
  const closeBtn = document.getElementById('lightboxClose');
  const carouselImgs = document.querySelectorAll('#carouselImages img');

  carouselImgs.forEach(img => {
    img.classList.add('cursor-zoom-in');
    img.addEventListener('click', () => {
      overlayImg.src = img.src;
      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
    });
  });

  const closeLightbox = () => {
    overlay.classList.remove('flex');
    overlay.classList.add('hidden');
  };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === closeBtn) {
      closeLightbox();
    }
  });

  closeBtn.addEventListener('click', closeLightbox);


