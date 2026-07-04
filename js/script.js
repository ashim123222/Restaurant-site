const header = document.getElementsByTagName("header")[0];
const body = document.getElementsByTagName("body")[0];

document.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("shrunk");
  } else {
    header.classList.remove("shrunk");
  }
});

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => {
      l.classList.remove("active");
      nav.classList.remove("shown");

      hamburger.classList.remove("shown");
    });

    link.classList.add("active");
  });
});

const btns = document.querySelectorAll(".btns button");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btns.forEach((l) => {
      l.classList.remove("active");
    });

    btn.classList.add("active");
  });
});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

reveals.forEach((reveal) => {
  observer.observe(reveal);
});

const inputs = document.querySelectorAll("input, textarea, select");

inputs.forEach((input) => {
  const label = input.nextElementSibling;

  input.addEventListener("focus", () => {
    label.classList.add("active");
    input.classList.add("active");
  });

  input.addEventListener("blur", () => {
    if (input.value === "") {
      label.classList.remove("active");
      input.classList.remove("active");
    }
  });
});

// ============= DARK MODE TOGGLE WITH SMOOTH TRANSITION =============
const modeButton = document.querySelector(".mode");
const isDarkMode = localStorage.getItem("theme") === "dark";

// Apply saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  if (isDarkMode) {
    body.classList.add("light-theme");
    modeButton.classList.add("dark-mode");
  }
});

// Handle theme toggle
modeButton.addEventListener("click", (e) => {
  const rect = modeButton.getBoundingClientRect();
  const clickX = rect.left + rect.width / 2;
  const clickY = rect.top + rect.height / 2;

  // Create and animate transition overlay
  const transition = document.createElement("div");
  transition.className = "theme-transition";
  transition.style.setProperty("--click-x", `${clickX}px`);
  transition.style.setProperty("--click-y", `${clickY}px`);

  // Determine if switching to dark or light mode
  const isSwitchingToDark = !body.classList.contains("light-theme");

  if (isSwitchingToDark) {
    // Switching to dark mode
    body.appendChild(transition);
    setTimeout(() => {
      body.classList.add("light-theme");
      modeButton.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }, 300);
  } else {
    // Switching to light mode
    transition.classList.add("reverse");
    body.appendChild(transition);
    setTimeout(() => {
      body.classList.remove("light-theme");
      modeButton.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }, 300);
  }

  // Remove transition overlay after animation
  setTimeout(() => {
    transition.remove();
  }, 600);
});

const fields = document.querySelectorAll("input, textarea");

fields.forEach((field) => {
  const label = document.querySelector(`label[for="${field.id}"]`);

  if (!label) return;

  // Page load par agar value already hai
  if (field.value.trim() !== "") {
    label.classList.add("clicked");
  }

  // Click / Focus
  field.addEventListener("focus", () => {
    label.classList.add("clicked");
  });

  // Typing
  field.addEventListener("input", () => {
    if (field.value.trim() !== "") {
      label.classList.add("clicked");
    } else {
      label.classList.remove("clicked");
    }
  });

  // Focus hatne par check
  field.addEventListener("blur", () => {
    if (field.value.trim() === "") {
      label.classList.remove("clicked");
    }
  });
});

const images = document.querySelectorAll(".gallery-contain img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

images.forEach((image) => {
  image.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = image.src;

    document.body.style.overflow = "hidden";
  });
});

// Close button
closeBtn.addEventListener("click", closeLightbox);

// Click outside image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

const hamburger = document.querySelector(".humberger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("shown");
  hamburger.classList.toggle("shown");
});

document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove("shown");
    hamburger.classList.remove("shown");
  }
});

const reviews = document.querySelector(".reviews");
const cards = document.querySelectorAll(".rev-card-cont");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;

function updateSlider() {
  reviews.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  index++;

  if (index >= cards.length) {
    index = 0; // Go back to first card
  }

  updateSlider();
});

prevBtn.addEventListener("click", () => {
  index--;

  if (index < 0) {
    index = cards.length - 1; // Go to last card
  }

  updateSlider();
});

const lenis = new Lenis({
  duration: 1.8,
  lerp: 0.05,
  smoothWheel: true,
  syncTouch: true,
  wheelMultiplier: 0.7,
  touchMultiplier: 1.5,
  infinite: false,
  autoRaf: true,
});
