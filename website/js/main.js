const mobileToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

const counters = document.querySelectorAll("[data-counter]");

const animateCounter = (counter) => {
  const target = Number(counter.dataset.counter);
  const suffix = counter.dataset.suffix || "";
  let current = 0;
  const increment = Math.max(1, Math.round(target / 80));

  const step = () => {
    current += increment;
    if (current >= target) {
      counter.textContent = `${target}${suffix}`;
      return;
    }
    counter.textContent = `${current}${suffix}`;
    requestAnimationFrame(step);
  };

  step();
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const slides = carousel.querySelectorAll(".carousel-slide");
  const next = carousel.querySelector("[data-carousel-next]");
  const prev = carousel.querySelector("[data-carousel-prev]");
  let index = 0;

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  const nextSlide = () => {
    index = (index + 1) % slides.length;
    update();
  };

  const prevSlide = () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  };

  if (next) next.addEventListener("click", nextSlide);
  if (prev) prev.addEventListener("click", prevSlide);
  setInterval(nextSlide, 6000);
});

const filters = document.querySelectorAll("[data-filter]");
const items = document.querySelectorAll("[data-filter-item]");
const searchInput = document.querySelector("[data-search]");
let activeFilter = "all";
let searchQuery = "";

const applyFilters = () => {
  items.forEach((item) => {
    const matchesFilter =
      activeFilter === "all" || item.dataset.filterItem === activeFilter;
    const matchesSearch =
      !searchQuery ||
      item.dataset.searchItem?.toLowerCase().includes(searchQuery);

    item.style.display = matchesFilter && matchesSearch ? "block" : "none";
  });
};

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    activeFilter = filter.dataset.filter || "all";
    filters.forEach((btn) => btn.classList.remove("active"));
    filter.classList.add("active");
    applyFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    searchQuery = event.target.value.trim().toLowerCase();
    applyFilters();
  });
}

const sliders = document.querySelectorAll("[data-before-after]");

sliders.forEach((slider) => {
  const afterLayer = slider.querySelector(".after-layer");
  const handle = slider.querySelector(".handle");
  const line = slider.querySelector(".slider");
  let active = false;

  const setPosition = (clientX) => {
    const rect = slider.getBoundingClientRect();
    const offset = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percent = (offset / rect.width) * 100;
    afterLayer.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
    line.style.left = `${percent}%`;
  };

  slider.addEventListener("pointerdown", (event) => {
    active = true;
    slider.setPointerCapture(event.pointerId);
    setPosition(event.clientX);
  });

  slider.addEventListener("pointermove", (event) => {
    if (!active) return;
    setPosition(event.clientX);
  });

  slider.addEventListener("pointerup", () => {
    active = false;
  });

  const beforeImage = slider.dataset.before;
  const afterImage = slider.dataset.after;
  if (beforeImage) {
    const beforeLayer = slider.querySelector(".before-layer");
    if (beforeLayer) {
      beforeLayer.style.backgroundImage = `url("${beforeImage}")`;
    }
  }
  if (afterImage) {
    afterLayer.style.backgroundImage = `url("${afterImage}")`;
  }
});

const heroRotator = document.querySelector("[data-hero-rotator]");

if (heroRotator) {
  const rotator = heroRotator.querySelector(".hero-rotator");
  const images = (heroRotator.dataset.heroImages || "")
    .split(",")
    .map((img) => img.trim())
    .filter(Boolean);

  if (rotator && images.length) {
    let index = 0;
    rotator.style.backgroundImage = `url("${images[index]}")`;

    setInterval(() => {
      rotator.classList.add("fade-out");
      setTimeout(() => {
        index = (index + 1) % images.length;
        rotator.style.backgroundImage = `url("${images[index]}")`;
        rotator.classList.remove("fade-out");
      }, 500);
    }, 7000);
  }
}

const lightboxTriggers = document.querySelectorAll("[data-lightbox]");

if (lightboxTriggers.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <img alt="" />
      <button class="lightbox-close" aria-label="Close">×</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".lightbox-close");

  const closeLightbox = () => {
    lightbox.classList.remove("open");
  };

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });

  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const src = trigger.dataset.lightbox;
      if (!src) return;
      lightboxImage.src = src;
      lightboxImage.alt =
        trigger.dataset.lightboxAlt ||
        trigger.getAttribute("alt") ||
        "Project photo";
      lightbox.classList.add("open");
    });
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
