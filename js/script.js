/**
 * File Script Interaktif UTS Pemrograman Web
 * Mencakup: Dark Mode Toggle, Filter Proyek, Kalkulator Biaya, dan Validasi Form
 */

// 1. FUNGSI DARK MODE TOGGLE (Manipulasi UI DOM)
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    themeToggleBtn.addEventListener('click', function () {
        htmlElement.classList.toggle('dark');
        const isDark = htmlElement.classList.contains('dark');
        themeIcon.textContent = isDark ? '☀️ Mode Terang' : '🌙 Mode Gelap';
    });
}

// 2. FUNGSI FILTER DAFTAR PROYEK (Manipulasi UI DOM)
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(function (card) {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden-card');
        } else {
            card.classList.add('hidden-card');
        }
    });
}

function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Reset style tombol aktif
            filterButtons.forEach(b => {
                b.classList.remove('bg-primary', 'text-white');
                b.classList.add('bg-slate-200', 'dark:bg-slate-700');
            });

            // Aktifkan tombol yang diklik
            this.classList.add('bg-primary', 'text-white');
            this.classList.remove('bg-slate-200', 'dark:bg-slate-700');

            // Jalankan fungsi filter
            const selectedCategory = this.getAttribute('data-filter');
            filterProjects(selectedCategory);
        });
    });
}

// 3. FUNGSI KALKULATOR ESTIMASI BIAYA PROYEK (Perhitungan & Output DOM)
function calculateProjectCost() {
    const projectTypeSelect = document.getElementById('project-type');
    const pageCountInput = document.getElementById('page-count');
    const urgencySelect = document.getElementById('urgency');
    const totalPriceEl = document.getElementById('total-price');
    const calcDetailEl = document.getElementById('calc-detail');

    const basePrice = parseInt(projectTypeSelect.value) || 0;
    const pageCount = parseInt(pageCountInput.value) || 0;
    const urgencyMultiplier = parseFloat(urgencySelect.value) || 1;

    // Validasi agar jumlah halaman tidak negatif
    if (pageCount < 0) {
        pageCountInput.value = 0;
        return;
    }

    const additionalPageCost = pageCount * 100000;
    const finalTotal = (basePrice + additionalPageCost) * urgencyMultiplier;

    // Format ke Rupiah
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(finalTotal);

    // Tampilkan ke DOM HTML
    totalPriceEl.textContent = formattedPrice;
    const selectedTypeName = projectTypeSelect.options[projectTypeSelect.selectedIndex].text.split('(')[0].trim();
    calcDetailEl.textContent = `${selectedTypeName} + ${pageCount} Halaman Tambahan (Multiplier: ${urgencyMultiplier}x)`;
}

function initCalculator() {
    const btnHitung = document.getElementById('btn-hitung');
    const inputs = ['project-type', 'page-count', 'urgency'];

    btnHitung.addEventListener('click', calculateProjectCost);
    inputs.forEach(function (id) {
        document.getElementById(id).addEventListener('change', calculateProjectCost);
    });
}

// 4. FUNGSI VALIDASI FORM KONTAK
function validateContactForm(event) {
    event.preventDefault();

    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const pesan = document.getElementById('pesan').value.trim();
    const feedbackEl = document.getElementById('form-feedback');

    feedbackEl.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-emerald-100', 'text-emerald-700');

    // Cek kekosongan input
    if (nama === '' || email === '' || pesan === '') {
        feedbackEl.textContent = '⚠️ Mohon lengkapi seluruh kolom Nama, Email, dan Pesan sebelum mengirim.';
        feedbackEl.classList.add('bg-red-100', 'text-red-700');
        return;
    }

    // Cek format dasar email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        feedbackEl.textContent = '⚠️ Format alamat email tidak valid. Contoh: nama@email.com';
        feedbackEl.classList.add('bg-red-100', 'text-red-700');
        return;
    }

    // Jika lolos validasi
    feedbackEl.textContent = `✅ Terima kasih, ${nama}! Pesan Anda berhasil divalidasi dan siap dikirim.`;
    feedbackEl.classList.add('bg-emerald-100', 'text-emerald-700');
    document.getElementById('contact-form').reset();
}

// INISIALISASI SELURUH FITUR SAAT DOM SELESAI DIMUAT
document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initProjectFilter();
    initCalculator();

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', validateContactForm);
});
