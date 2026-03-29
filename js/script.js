const header = document.getElementsByTagName("header")[0];
const body = document.getElementsByTagName("body")[0];

document.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
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
    });

    link.classList.add("active");
  });
});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
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

const magneticElements = Array.from(
  document.querySelectorAll("a, .mode, form button"),
);

magneticElements.forEach((el) => {
  el.classList.add("magnetic-element");

  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Smooth magnetic pull
    const pullX = x * 0.5;
    const pullY = y * 0.5;

    el.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.05)`;
  });

  el.addEventListener("mouseleave", () => {
    // Smooth reset
    el.style.transform = "translate(0px, 0px) scale(1)";
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
