const thumbs = Array.from(document.querySelectorAll('.photo-slot img'));
const photoSlots = Array.from(document.querySelectorAll('.photo-slot'));
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbCaption = document.getElementById('lbCaption');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
const pricingButtons = document.querySelectorAll('.view-pricing-btn');
const pricingModal = document.getElementById('pricingModal');
const pricingClose = document.getElementById('pricingClose');
const pricingTitle = document.getElementById('pricingTitle');
const packageGrid = document.getElementById('packageGrid');

let current = 0;

const packageIncludes = {
  basic: ['20 edited digital photos', 'Online gallery access', '1 outfit'],
  standard: ['25 edited digital photos', 'Online gallery access', '2 outfits + 1 location'],
  premium: ['30 edited digital photos', 'Online gallery access', '3 outfits + prints (2 x A4)']
};

const pricingData = {
  graduation: {
    title: 'Graduation Shoot',
    packages: [
      { name: 'Basic Package', duration: '1 Hour', price: 'R 1,500', includes: packageIncludes.basic },
      { name: 'Standard Package', duration: '2 Hours', price: 'R 1,950', includes: packageIncludes.standard },
      { name: 'Premium Package', duration: '3 Hours', price: 'R 2,400', includes: packageIncludes.premium }
    ]
  },
  pregnancy: {
    title: 'Pregnancy Shoot',
    packages: [
      { name: 'Basic Package', duration: '1 Hour', price: 'R 1,500', includes: packageIncludes.basic },
      { name: 'Standard Package', duration: '2 Hours', price: 'R 1,950', includes: packageIncludes.standard },
      { name: 'Premium Package', duration: '3 Hours', price: 'R 2,400', includes: packageIncludes.premium }
    ]
  },
  group: {
    title: 'Group Photoshoot',
    packages: [
      { name: 'Basic Package', duration: '1 Hour', price: 'R 1,650', includes: packageIncludes.basic },
      { name: 'Standard Package', duration: '2 Hours', price: 'R 2,100', includes: packageIncludes.standard },
      { name: 'Premium Package', duration: '3 Hours', price: 'R 2,550', includes: packageIncludes.premium }
    ]
  },
  cake: {
    title: 'Cake Smash',
    packages: [
      { name: 'Basic Package', duration: '1 Hour', price: 'R 1,200', includes: packageIncludes.basic },
      { name: 'Standard Package', duration: '2 Hours', price: 'R 1,650', includes: packageIncludes.standard },
      { name: 'Premium Package', duration: '3 Hours', price: 'R 2,100', includes: packageIncludes.premium }
    ]
  },
  kiddies: {
    title: 'Kiddies Photoshoot',
    packages: [
      { name: 'Basic Package', duration: '1 Hour', price: 'R 1,400', includes: packageIncludes.basic },
      { name: 'Standard Package', duration: '2 Hours', price: 'R 1,850', includes: packageIncludes.standard },
      { name: 'Premium Package', duration: '3 Hours', price: 'R 2,300', includes: packageIncludes.premium }
    ]
  },
  personal: {
    title: 'Personal Photoshoot',
    packages: [
      { name: 'Basic Package', duration: '1 Hour', price: 'R 1,650', includes: packageIncludes.basic },
      { name: 'Standard Package', duration: '2 Hours', price: 'R 2,100', includes: packageIncludes.standard },
      { name: 'Premium Package', duration: '3 Hours', price: 'R 2,550', includes: packageIncludes.premium }
    ]
  }
};

function placeholderDataUri(label) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='900'>
    <rect width='100%' height='100%' fill='#efe6db'/>
    <text x='50%' y='46%' text-anchor='middle' fill='#7b6f61' font-family='Segoe UI, Arial' font-size='34'>Add Photo</text>
    <text x='50%' y='53%' text-anchor='middle' fill='#8f8274' font-family='Segoe UI, Arial' font-size='24'>${label}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

thumbs.forEach((img) => {
  img.addEventListener('error', () => {
    img.src = placeholderDataUri(img.alt);
  }, { once: true });

  if (img.complete && img.naturalWidth === 0) {
    img.src = placeholderDataUri(img.alt);
  }
});

function openLightbox(index) {
  current = index;
  const img = thumbs[current];
  lbImage.src = img.src;
  lbImage.alt = img.alt;
  lbCaption.textContent = img.alt;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openPricingModal(shootKey) {
  const data = pricingData[shootKey];
  if (!data) return;

  pricingTitle.textContent = `${data.title} Pricing`;
  packageGrid.innerHTML = data.packages.map((pkg) => `
    <article class="package-card">
      <h4>${pkg.name}</h4>
      <p class="package-duration">Duration: ${pkg.duration}</p>
      <ul class="package-items">
        ${pkg.includes.map((item) => `<li>${item}</li>`).join('')}
      </ul>
      <p class="package-price">${pkg.price}</p>
    </article>
  `).join('');

  pricingModal.classList.add('active');
  pricingModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePricingModal() {
  pricingModal.classList.remove('active');
  pricingModal.setAttribute('aria-hidden', 'true');
  if (!lightbox.classList.contains('active')) {
    document.body.style.overflow = '';
  }
}

function nextImage() {
  current = (current + 1) % thumbs.length;
  openLightbox(current);
}

function prevImage() {
  current = (current - 1 + thumbs.length) % thumbs.length;
  openLightbox(current);
}

photoSlots.forEach((slot, i) => {
  slot.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbNext.addEventListener('click', nextImage);
lbPrev.addEventListener('click', prevImage);

pricingButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openPricingModal(button.dataset.shoot);
  });
});

pricingClose.addEventListener('click', closePricingModal);

pricingModal.addEventListener('click', (e) => {
  if (e.target === pricingModal) closePricingModal();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (lightbox.classList.contains('active')) closeLightbox();
    if (pricingModal.classList.contains('active')) closePricingModal();
  }

  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});
