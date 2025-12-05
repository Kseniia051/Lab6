// ===== Кнопка "Наверх" =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.textContent = '↑';
scrollTopBtn.style.position = 'fixed';
scrollTopBtn.style.bottom = '30px';
scrollTopBtn.style.right = '30px';
scrollTopBtn.style.padding = '10px 15px';
scrollTopBtn.style.fontSize = '20px';
scrollTopBtn.style.display = 'none';
scrollTopBtn.style.cursor = 'pointer';
scrollTopBtn.style.zIndex = '1000';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Аккордеон для команды =====
const accordionItems = document.querySelectorAll('.team-grid .member h4');
accordionItems.forEach(title => {
  title.style.cursor = 'pointer';
  const content = title.nextElementSibling;
  content.style.display = 'none';
  title.addEventListener('click', () => {
    accordionItems.forEach(t => t.nextElementSibling.style.display = 'none');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
  });
});

// ===== Навигация по секциям =====
const buttons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});

// ===== Тёмная тема =====
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// ===== Модальное окно для галереи =====
const modal = document.createElement('div');
modal.id = 'modal';
modal.style.display = 'none';
modal.style.position = 'fixed';
modal.style.top = '0';
modal.style.left = '0';
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
modal.style.justifyContent = 'center';
modal.style.alignItems = 'center';
modal.style.zIndex = '1001';
modal.style.cursor = 'pointer';
modal.innerHTML = `<img id="modalImg" style="max-width:90%; max-height:90%;">`;
document.body.appendChild(modal);

modal.addEventListener('click', () => { modal.style.display = 'none'; });

// ===== Отзывы через API =====
async function getRandomQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    return data.content;
  } catch {
    return "Ошибка загрузки 😢";
  }
}

async function loadReviews() {
  const reviewElements = document.querySelectorAll(".review");
  reviewElements.forEach(r => r.textContent = "Загрузка...");
  for (let review of reviewElements) {
    review.textContent = await getRandomQuote();
  }
}

window.addEventListener("load", loadReviews);
document.getElementById("reload-quotes").addEventListener("click", loadReviews);

// ===== Галерея с загрузкой с сервера (Picsum.photos) =====
async function loadGalleryFromServer() {
  const imagesDiv = document.getElementById("images");
  imagesDiv.innerHTML = "Загрузка изображений...";
  imagesDiv.style.justifyContent = "center";

  for (let i = 1; i <= 8; i++) {
    const url = `https://picsum.photos/seed/music${i}/300/180`;
    const img = document.createElement('img');
    img.src = url;
    img.alt = "Музыкальное фото";
    img.style.width = "250px";
    img.style.height = "180px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "10px";
    img.style.margin = "5px";
    img.style.cursor = "pointer";

    // Клик по изображению открывает модальное окно
    img.addEventListener('click', () => {
      document.getElementById('modalImg').src = img.src;
      modal.style.display = 'flex';
    });

    imagesDiv.appendChild(img);
  }
}

window.addEventListener("load", loadGalleryFromServer);
