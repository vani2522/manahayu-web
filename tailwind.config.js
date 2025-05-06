module.exports = {
  content: [
    "./footer.html", "./header.html", "./room.html",  // Pastikan path ini sesuai dengan lokasi file kamu
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',  // Menggunakan variabel CSS untuk warna utama
        secondary: 'var(--color-secondary)', // Menggunakan variabel CSS untuk warna sekunder
        background: 'var(--color-background)', // Menggunakan variabel CSS untuk latar belakang
        textPrimary: 'var(--color-text-primary)', // Menggunakan variabel CSS untuk warna teks utama
        textSecondary: 'var(--color-text-secondary)', // Menggunakan variabel CSS untuk warna teks sekunder
        textTiga: 'var(--color-text-tiga)', // Menggunakan variabel CSS untuk warna hijau
        textEmpat: 'var(--color-text-empat)', // Menggunakan variabel CSS untuk warna abu
      },
      fontFamily: {
        primary: 'var(--font-primary)',  // Menggunakan variabel CSS untuk font utama
        secondary: 'var(--font-secondary)', // Menggunakan variabel CSS untuk font sekunder
      },
      fontSize: {
        base: 'var(--font-size-base)', // Ukuran font dasar dari variabel CSS
      },
      lineHeight: {
        base: 'var(--line-height)', // Jarak antar baris dari variabel CSS
      },
      padding: {
        base: 'var(--padding-base)', // Padding dasar dari variabel CSS
      },
    },
  },
  plugins: [],
}
