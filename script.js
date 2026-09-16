const eventDate = new Date("November 10, 2026 09:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();

  const distance = eventDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");

  document.getElementById("hours").textContent = String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );

  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
}

updateCountdown();

setInterval(updateCountdown, 1000);

const videoButton = document.querySelector(".video-button");

if (videoButton) {
  videoButton.addEventListener("click", function () {
    console.log("Event video clicked");
  });
}

document.querySelectorAll(".hero-btn").forEach(function (button) {
  button.addEventListener("mouseenter", function () {
    button.style.transition = "transform .25s ease";
  });
});

const hero = document.querySelector(".meridian-hero");

hero.addEventListener("mousemove", function (e) {
  const x = (e.clientX / window.innerWidth - 0.5) * 8;

  const y = (e.clientY / window.innerHeight - 0.5) * 5;

  hero.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
});

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".mx-card");

  const cardObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },

    {
      threshold: 0.18,
    },
  );

  cards.forEach(function (card) {
    cardObserver.observe(card);
  });

  const counters = document.querySelectorAll(".mx-counter");

  let counterStarted = false;

  function startCounters() {
    if (counterStarted) return;
    

    counterStarted = true;

    counters.forEach(function (counter) {
      const target = parseInt(counter.dataset.target, 10);

      const duration = 1300;

      const start = performance.now();

      function animate(currentTime) {
        const progress = Math.min((currentTime - start) / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 3);

        const value = Math.floor(target * eased);

        counter.textContent = value;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(animate);
    });
  }

  const section = document.querySelector(".mx-community");

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          startCounters();

          counterObserver.unobserve(entry.target);
        }
      });
    },

    {
      threshold: 0.35,
    },
  );

  if (section) {
    counterObserver.observe(section);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const backToTop = document.querySelector(".back-to-top");

  const updateBackToTop = function () {
    if (!backToTop) return;

    backToTop.classList.toggle("is-visible", window.scrollY > 480);
  };

  updateBackToTop();

  window.addEventListener("scroll", updateBackToTop, { passive: true });
});

document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector(".mx-about");

  if (!aboutSection) return;

  const aboutElements = aboutSection.querySelectorAll(
    ".mx-about-content, .mx-about-card",
  );

  const aboutObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("mx-about-visible");
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  aboutElements.forEach(function (element) {
    aboutObserver.observe(element);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const themesSection = document.querySelector(".mx-themes");

  if (!themesSection) return;

  const rows = themesSection.querySelectorAll(".mx-theme-row");

  const railItems = themesSection.querySelectorAll(".mx-rail-item");

  const nextButton = document.querySelector("#mx-theme-next");

  const prevButton = document.querySelector("#mx-theme-prev");

  let currentTheme = 0;

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          themesSection.classList.add("mx-themes-visible");

          sectionObserver.unobserve(themesSection);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  sectionObserver.observe(themesSection);

  function setTheme(index) {
    if (index < 0) {
      index = rows.length - 1;
    }

    if (index >= rows.length) {
      index = 0;
    }

    currentTheme = index;

    rows.forEach(function (row, i) {
      row.classList.toggle("active", i === index);
    });

    railItems.forEach(function (item, i) {
      item.classList.toggle("active", i === index);
    });
  }

  rows.forEach(function (row, index) {
    row.addEventListener("click", function (event) {
      if (event.target.closest(".mx-theme-arrow")) {
        return;
      }

      setTheme(index);
    });
  });

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      setTheme(currentTheme + 1);
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      setTheme(currentTheme - 1);
    });
  }

  rows.forEach(function (row, index) {
    const arrow = row.querySelector(".mx-theme-arrow");

    if (!arrow) return;

    arrow.addEventListener("click", function () {
      setTheme(index);
    });
  });

  document.addEventListener("keydown", function (event) {
    const rect = themesSection.getBoundingClientRect();

    const visible = rect.top < window.innerHeight && rect.bottom > 0;

    if (!visible) return;

    if (event.key === "ArrowRight") {
      setTheme(currentTheme + 1);
    }

    if (event.key === "ArrowLeft") {
      setTheme(currentTheme - 1);
    }
  });

  setTheme(0);
});

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".mx-speakers");

  if (!section) return;

  const track = document.querySelector("#mx-speakers-track");

  const cards = document.querySelectorAll(".mx-speaker-card");

  const next = document.querySelector("#mx-speaker-next");

  const prev = document.querySelector("#mx-speaker-prev");

  let currentSlide = 0;
  let autoLoop = null;

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add("mx-speakers-visible");

          sectionObserver.unobserve(section);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  sectionObserver.observe(section);

  function getVisibleCards() {
    if (window.innerWidth <= 650) {
      return 1;
    }

    if (window.innerWidth <= 1050) {
      return 2;
    }

    return 4;
  }

  function getMaxSlide() {
    const visibleCards = getVisibleCards();

    return Math.max(0, cards.length - visibleCards);
  }

  function updateCarousel(index) {
    const maxSlide = getMaxSlide();

    if (maxSlide <= 0) {
      currentSlide = 0;

      track.style.transform = "translateX(0)";

      return;
    }

    if (index < 0) {
      index = maxSlide;
    }

    if (index > maxSlide) {
      index = 0;
    }

    currentSlide = index;

    const card = cards[0];

    if (!card) return;

    const cardWidth = card.offsetWidth;

    const gap = 20;

    const movement = (cardWidth + gap) * currentSlide;

    track.style.transform = "translateX(-" + movement + "px)";
  }

  function startAutoLoop() {
    clearInterval(autoLoop);

    autoLoop = setInterval(function () {
      updateCarousel(currentSlide + 1);
    }, 2600);
  }

  if (next) {
    next.addEventListener("click", function () {
      updateCarousel(currentSlide + 1);
    });
  }

  if (prev) {
    prev.addEventListener("click", function () {
      updateCarousel(currentSlide - 1);
    });
  }

  if (section) {
    section.addEventListener("mouseenter", function () {
      clearInterval(autoLoop);
    });

    section.addEventListener("mouseleave", function () {
      startAutoLoop();
    });
  }

  window.addEventListener("resize", function () {
    currentSlide = Math.min(currentSlide, getMaxSlide());

    updateCarousel(currentSlide);
  });

  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    "touchstart",
    function (event) {
      touchStartX = event.changedTouches[0].screenX;
    },
    {
      passive: true,
    },
  );

  track.addEventListener(
    "touchend",
    function (event) {
      touchEndX = event.changedTouches[0].screenX;

      const distance = touchStartX - touchEndX;

      if (Math.abs(distance) < 50) {
        return;
      }

      if (distance > 0) {
        updateCarousel(currentSlide + 1);
      } else {
        updateCarousel(currentSlide - 1);
      }

      startAutoLoop();
    },
    {
      passive: true,
    },
  );

  updateCarousel(0);
  startAutoLoop();
});

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".mx-roundtables");

  if (!section) return;

  const cards = section.querySelectorAll(".mx-rt-card");

  const timelineItems = section.querySelectorAll(".mx-rt-timeline-item");

  const nextButton = document.querySelector("#mx-rt-next");

  let currentIndex = 0;

  /* =====================================================
       SECTION REVEAL
    ===================================================== */

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");

          observer.unobserve(section);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  observer.observe(section);

  /* =====================================================
       ACTIVE ROUND TABLE
    ===================================================== */

  function setActive(index) {
    if (index < 0) {
      index = cards.length - 1;
    }

    if (index >= cards.length) {
      index = 0;
    }

    currentIndex = index;

    cards.forEach(function (card, i) {
      card.classList.toggle("active", i === index);
    });

    timelineItems.forEach(function (item, i) {
      item.classList.toggle("active", i === index);
    });
  }

  /* =====================================================
       TIMELINE CLICK
    ===================================================== */

  timelineItems.forEach(function (item) {
    item.addEventListener("click", function () {
      const index = parseInt(item.dataset.index, 10);

      setActive(index);
    });
  });

  /* =====================================================
       NEXT BUTTON
    ===================================================== */

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      setActive(currentIndex + 1);
    });
  }

  /* =====================================================
       PARALLAX EFFECT
    ===================================================== */

  let ticking = false;

  function updateParallax() {
    const rect = section.getBoundingClientRect();

    const viewport = window.innerHeight;

    /*
     * Only calculate while section
     * is around the viewport.
     */

    if (rect.bottom > 0 && rect.top < viewport) {
      const progress = (viewport - rect.top) / (viewport + rect.height);

      const movement = (progress - 0.5) * 30;

      cards.forEach(function (card, index) {
        /*
         * Each card gets a different
         * movement speed.
         */

        const speed = (index + 1) * 0.7;

        /*
         * Preserve the vertical
         * stagger while adding
         * scroll movement.
         */

        const stagger = (index - 1.5) * -5;

        card.style.setProperty("--mx-parallax", movement * speed + "px");

        card.style.setProperty("--mx-stagger", stagger + "px");
      });
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);

        ticking = true;
      }
    },
    {
      passive: true,
    },
  );

  /* =====================================================
       APPLY PARALLAX THROUGH CSS TRANSFORM
    ===================================================== */

  cards.forEach(function (card) {
    card.style.transition = "transform .45s cubic-bezier(.16,1,.3,1)";
  });

  /* =====================================================
       MOUSE PARALLAX
    ===================================================== */

  section.addEventListener("mousemove", function (event) {
    if (window.innerWidth < 900) return;

    const rect = section.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    cards.forEach(function (card, index) {
      const depth = (index + 1) * 1.2;

      card.style.transform = `
                        translate3d(
                            ${x * depth}px,
                            ${y * depth}px,
                            0
                        )
                        rotateY(${x * -1.5}deg)
                        rotateX(${y * 1.2}deg)
                        `;
    });
  });

  /* =====================================================
       RESET MOUSE EFFECT
    ===================================================== */

  section.addEventListener("mouseleave", function () {
    cards.forEach(function (card, index) {
      const y = (index - 1.5) * -5;

      card.style.transform = `translateY(${y}px)`;
    });
  });

  /* =====================================================
       INITIAL STATE
    ===================================================== */

  setActive(0);
});

/* =========================================================
   MERIDIAN EXCHANGE
   GLOBAL DATA CENTRE FOOTPRINT JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".mx-global-data");

  if (!section) return;

  const map = section.querySelector(".mx-data-map");

  const dataPoints = section.querySelectorAll(".mx-map-data");

  /* =================================================
           SCROLL REVEAL
        ================================================= */

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");

          observer.unobserve(section);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  observer.observe(section);

  /* =================================================
           PARALLEL SCROLL EFFECT
        ================================================= */

  let ticking = false;

  function updateParallax() {
    const rect = section.getBoundingClientRect();

    const viewport = window.innerHeight;

    if (rect.bottom > 0 && rect.top < viewport) {
      const progress = (viewport - rect.top) / (viewport + rect.height);

      const centered = progress - 0.5;

      /*
       * Map moves slowly.
       */

      if (map) {
        const mapY = centered * -30;

        const mapX = centered * 10;

        map.style.transform = `
                        translate(
                            calc(-50% + ${mapX}px),
                            calc(-50% + ${mapY}px)
                        )
                        scale(1.01)
                        `;
      }

      /*
       * Country labels move
       * at different speeds.
       */

      dataPoints.forEach(function (point, index) {
        const depth = 4 + index * 1.4;

        const movement = centered * depth * -1;

        point.style.marginTop = movement + "px";
      });
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        requestAnimationFrame(updateParallax);

        ticking = true;
      }
    },
    {
      passive: true,
    },
  );

  /* =================================================
           MOUSE DEPTH
        ================================================= */

  section.addEventListener("mousemove", function (event) {
    if (window.innerWidth < 900) {
      return;
    }

    const rect = section.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    if (map) {
      map.style.transform = `
                        translate(
                            calc(-50% + ${x * 8}px),
                            calc(-50% + ${y * 8}px)
                        )
                        scale(1.025)
                        `;
    }

    dataPoints.forEach(function (point, index) {
      const depth = 3 + index * 0.8;

      point.style.transform = `
                            translate(
                                ${x * depth}px,
                                ${y * depth}px
                            )
                            `;
    });
  });

  /* =================================================
           RESET MOUSE DEPTH
        ================================================= */

  section.addEventListener("mouseleave", function () {
    if (map) {
      map.style.transform = `
                        translate(
                            -50%,
                            -50%
                        )
                        scale(1)
                        `;
    }

    dataPoints.forEach(function (point) {
      point.style.transform = "";
    });
  });

  /* =================================================
           COUNTRY DATA HOVER
        ================================================= */

  dataPoints.forEach(function (point) {
    point.addEventListener("mouseenter", function () {
      dataPoints.forEach(function (other) {
        if (other !== point) {
          other.style.opacity = ".42";
        }
      });
    });

    point.addEventListener("mouseleave", function () {
      dataPoints.forEach(function (other) {
        other.style.opacity = "1";
      });
    });
  });
});

/* =========================================================
   DATA EMBASSY CONTINUITY MODEL JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".mx-embassy-section");

  if (!section) return;

  const visual = section.querySelector(".mx-embassy-visual");

  const image = section.querySelector(".mx-primary-node-img");

  const processCards = section.querySelectorAll(".mx-process-card");

  /* =================================================
           SCROLL REVEAL
        ================================================= */

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");

          observer.unobserve(section);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  observer.observe(section);

  /* =================================================
           PARALLAX
        ================================================= */

  let ticking = false;

  function updateParallax() {
    const rect = section.getBoundingClientRect();

    const viewport = window.innerHeight;

    if (rect.bottom > 0 && rect.top < viewport) {
      const progress = (viewport - rect.top) / (viewport + rect.height);

      const movement = (progress - 0.5) * 20;

      if (image) {
        image.style.setProperty("--scroll-y", movement + "px");
      }
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        requestAnimationFrame(updateParallax);

        ticking = true;
      }
    },
    {
      passive: true,
    },
  );

  /* =================================================
           MOUSE DEPTH EFFECT
        ================================================= */

  if (visual && image) {
    visual.addEventListener("mousemove", function (event) {
      if (window.innerWidth < 900) return;

      const rect = visual.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      const y = (event.clientY - rect.top) / rect.height - 0.5;

      image.style.transform = `
                        translate3d(
                            ${x * 12}px,
                            ${y * 10}px,
                            0
                        )
                        scale(1.025)
                        `;
    });

    visual.addEventListener("mouseleave", function () {
      image.style.transform = "translate3d(0,0,0) scale(1)";
    });
  }

  /* =================================================
           PROCESS CARD INTERACTION
        ================================================= */

  processCards.forEach(function (card, index) {
    card.addEventListener("mouseenter", function () {
      processCards.forEach(function (other) {
        if (other !== card) {
          other.style.opacity = ".55";
        }
      });
    });

    card.addEventListener("mouseleave", function () {
      processCards.forEach(function (other) {
        other.style.opacity = "1";
      });
    });
  });

  /* =================================================
           IMAGE LOAD
        ================================================= */

  if (image) {
    image.addEventListener("load", function () {
      image.classList.add("mx-image-loaded");
    });
  }
});
/* =========================================================
   MERIDIAN EXCHANGE — HOW IT WORKS JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".mx-how-section");

  if (!section) return;

  /* =====================================================
       SCROLL REVEAL
    ===================================================== */

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");

          sectionObserver.unobserve(section);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  sectionObserver.observe(section);

  /* =====================================================
       PROCESS STEP INTERACTION
    ===================================================== */

  const steps = section.querySelectorAll(".mx-process-step");

  steps.forEach(function (step) {
    step.addEventListener("mouseenter", function () {
      steps.forEach(function (other) {
        if (other !== step) {
          other.style.opacity = "0.45";
        }
      });

      step.style.opacity = "1";
    });

    step.addEventListener("mouseleave", function () {
      steps.forEach(function (other) {
        other.style.opacity = "1";
      });
    });
  });

  /* =====================================================
       AGENDA ITEMS REVEAL
    ===================================================== */

  const agendaItems = section.querySelectorAll(".mx-agenda-item");

  const agendaObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("mx-agenda-visible");
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  agendaItems.forEach(function (item) {
    item.style.opacity = "0";

    item.style.transform = "translateX(-10px)";

    item.style.transition = "opacity .5s ease, transform .5s ease";

    agendaObserver.observe(item);
  });

  /* =====================================================
       AGENDA ITEM ANIMATION CLASS
    ===================================================== */

  const agendaStyle = document.createElement("style");

  agendaStyle.textContent = `

        .mx-agenda-item.mx-agenda-visible {
            opacity: 1 !important;
            transform: translateX(0) !important;
        }

    `;

  document.head.appendChild(agendaStyle);

  /* =====================================================
       SKYLINE PARALLAX
    ===================================================== */

  const skyline = section.querySelector(".mx-city-image");

  let parallaxTicking = false;

  function updateSkyline() {
    if (!skyline || window.innerWidth < 700) {
      parallaxTicking = false;
      return;
    }

    const rect = section.getBoundingClientRect();

    const viewport = window.innerHeight;

    if (rect.bottom > 0 && rect.top < viewport) {
      const progress = (viewport - rect.top) / (viewport + rect.height);

      const movement = (progress - 0.5) * 35;

      skyline.style.transform = `
                translateX(-50%)
                translateY(${movement}px)
                `;
    }

    parallaxTicking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!parallaxTicking) {
        requestAnimationFrame(updateSkyline);

        parallaxTicking = true;
      }
    },
    {
      passive: true,
    },
  );

  /* =====================================================
       MOUSE MOVEMENT ON SKYLINE
    ===================================================== */

  const city = section.querySelector(".mx-city-area");

  if (city && skyline) {
    city.addEventListener("mousemove", function (event) {
      if (window.innerWidth < 900) return;

      const rect = city.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      skyline.style.marginLeft = `${x * 10}px`;
    });

    city.addEventListener("mouseleave", function () {
      skyline.style.marginLeft = "0";
    });
  }

  /* =====================================================
       FULL AGENDA BUTTON
    ===================================================== */

  const agendaButton = section.querySelector(".mx-full-agenda");

  if (agendaButton) {
    agendaButton.addEventListener("click", function () {
      /*
                   Replace this with your agenda URL.
                */

      console.log("Request full agenda clicked");
    });
  }

  /* =====================================================
       SMOOTH PROCESS LINE ON SCROLL
    ===================================================== */

  const processLine = section.querySelector(".mx-process-line-fill");

  window.addEventListener(
    "scroll",
    function () {
      if (!processLine) return;

      const rect = section.getBoundingClientRect();

      const viewport = window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(1, (viewport - rect.top) / (viewport + rect.height * 0.4)),
      );

      if (section.classList.contains("is-visible")) {
        processLine.style.width = `${Math.max(30, progress * 100)}%`;
      }
    },
    {
      passive: true,
    },
  );
});

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".mx-attends-section");

  if (!section) return;

  /* =====================================================
       SCROLL REVEAL
       ===================================================== */

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add("mx-attends-visible");

          observer.unobserve(section);
        }
      });
    },
    {
      threshold: 0.18,
    },
  );

  observer.observe(section);

  /* =====================================================
       ATTENDEE HOVER INTERACTION
       ===================================================== */

  const items = section.querySelectorAll(".mx-attends-item");
  const core = section.querySelector(".mx-attends-core");

  items.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      item.classList.add("mx-attends-active");

      if (core) {
        core.style.transform = "scale(1.025)";
        core.style.transition = "transform .4s cubic-bezier(.22,1,.36,1)";
      }
    });

    item.addEventListener("mouseleave", function () {
      item.classList.remove("mx-attends-active");

      if (core) {
        core.style.transform = "scale(1)";
      }
    });
  });

  /* =====================================================
       CORE MOUSE PARALLAX
       ===================================================== */

  if (core && window.innerWidth > 900) {
    section.addEventListener("mousemove", function (event) {
      const rect = section.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      const y = (event.clientY - rect.top) / rect.height - 0.5;

      const moveX = x * 8;
      const moveY = y * 8;

      core.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    section.addEventListener("mouseleave", function () {
      core.style.transform = "translate(0, 0)";
    });
  }

  /* =====================================================
       CTA
       ===================================================== */

  const accessButton = section.querySelector(".mx-attends-btn");

  if (accessButton) {
    accessButton.addEventListener("click", function (event) {
      const target = document.querySelector("#request-access");

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".mx-deliverables");

  if (!section) return;

  /* =====================================================
       SCROLL REVEAL
       ===================================================== */

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add("mx-deliverables-visible");

          observer.unobserve(section);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  observer.observe(section);

  /* =====================================================
       CARD HOVER CONNECTION
       ===================================================== */

  const cards = section.querySelectorAll(".mx-deliverable-card");

  cards.forEach(function (card) {
    const node = card.querySelector(".mx-deliverable-node");

    card.addEventListener("mouseenter", function () {
      if (node) {
        node.style.transform = "translateX(-50%) scale(1.08)";

        node.style.transition = "transform .35s cubic-bezier(.16,1,.3,1)";
      }
    });

    card.addEventListener("mouseleave", function () {
      if (node) {
        node.style.transform = "translateX(-50%) scale(1)";
      }
    });
  });

  /* =====================================================
       SUBTLE MOUSE PARALLAX
       ===================================================== */

  if (window.innerWidth > 1000) {
    section.addEventListener("mousemove", function (event) {
      const rect = section.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      const y = (event.clientY - rect.top) / rect.height - 0.5;

      const orbits = section.querySelectorAll(".mx-deliverables-orbit");

      orbits.forEach(function (orbit, index) {
        const amount = index === 0 ? 10 : -10;

        orbit.style.transform = `translate(
                            ${x * amount}px,
                            ${y * amount}px
                        )`;
      });
    });

    section.addEventListener("mouseleave", function () {
      const orbits = section.querySelectorAll(".mx-deliverables-orbit");

      orbits.forEach(function (orbit) {
        orbit.style.transform = "translate(0,0)";
      });
    });
  }

  /* =====================================================
       REDUCED MOTION
       ===================================================== */

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    section.classList.add("mx-deliverables-visible");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".mx-insights-section");

  if (!section) return;

  /* =====================================================
       SCROLL REVEAL
       ===================================================== */

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");

          observer.unobserve(section);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  observer.observe(section);

  /* =====================================================
       CARD ARROW INTERACTION
       ===================================================== */

  const cards = section.querySelectorAll(".mx-insight-card");

  cards.forEach(function (card) {
    const arrow = card.querySelector(".mx-insight-arrow");

    if (!arrow) return;

    arrow.addEventListener("click", function () {
      /*
       * Add your individual insight URLs here
       * if these cards should open pages.
       */

      const index = card
        .querySelector(".mx-insight-number")
        ?.textContent.trim();

      console.log("Insight selected:", index);
    });
  });

  /* =====================================================
       BUTTON INTERACTION
       ===================================================== */

  const buttons = section.querySelectorAll(".mx-insights-btn");

  buttons.forEach(function (button) {
    button.addEventListener("mouseenter", function () {
      const icon = button.querySelector("svg");

      if (icon) {
        icon.style.transform = "translateX(4px)";
      }
    });

    button.addEventListener("mouseleave", function () {
      const icon = button.querySelector("svg");

      if (icon) {
        icon.style.transform = "translateX(0)";
      }
    });
  });

  /* =====================================================
       SUBTLE ORBIT PARALLAX
       ===================================================== */

  if (window.innerWidth > 900) {
    const leftOrbit = section.querySelector(".mx-insights-orbit-left");

    const rightOrbit = section.querySelector(".mx-insights-orbit-right");

    section.addEventListener("mousemove", function (event) {
      const rect = section.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      const y = (event.clientY - rect.top) / rect.height - 0.5;

      if (leftOrbit) {
        leftOrbit.style.transform = `translate(
                            ${x * 12}px,
                            ${y * 8}px
                        )`;
      }

      if (rightOrbit) {
        rightOrbit.style.transform = `translate(
                            ${x * -12}px,
                            ${y * -8}px
                        )`;
      }
    });

    section.addEventListener("mouseleave", function () {
      if (leftOrbit) {
        leftOrbit.style.transform = "translate(0,0)";
      }

      if (rightOrbit) {
        rightOrbit.style.transform = "translate(0,0)";
      }
    });
  }

  /* =====================================================
       REDUCED MOTION
       ===================================================== */

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    section.classList.add("is-visible");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".mx-leaders");

  if (!section) return;

  /* ======================================================
       SECTION REVEAL
       ====================================================== */

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");

          observer.unobserve(section);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  observer.observe(section);

  /* ======================================================
       ORBIT PARALLAX
       ====================================================== */

  const orbitOne = section.querySelector(".mx-orbit-one");

  const orbitTwo = section.querySelector(".mx-orbit-two");

  const globe = section.querySelector(".mx-leaders-globe");

  if (window.innerWidth > 900) {
    section.addEventListener("mousemove", function (event) {
      const rect = section.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      const y = (event.clientY - rect.top) / rect.height - 0.5;

      if (globe) {
        globe.style.transform = `translateX(calc(-50% + ${x * 8}px))
                         translateY(${y * 5}px)`;
      }

      if (orbitOne) {
        orbitOne.style.transform = `translateX(calc(-50% + ${x * 12}px))
                         translateY(${y * 7}px)
                         rotate(-8deg)`;
      }

      if (orbitTwo) {
        orbitTwo.style.transform = `translateX(calc(-50% + ${x * -10}px))
                         translateY(${y * -6}px)
                         rotate(8deg)`;
      }
    });

    section.addEventListener("mouseleave", function () {
      if (globe) {
        globe.style.transform = "translateX(-50%)";
      }

      if (orbitOne) {
        orbitOne.style.transform = "translateX(-50%) rotate(-8deg)";
      }

      if (orbitTwo) {
        orbitTwo.style.transform = "translateX(-50%) rotate(8deg)";
      }
    });
  }

  /* ======================================================
       CTA ARROW MICRO INTERACTION
       ====================================================== */

  const buttons = section.querySelectorAll(".mx-leaders-btn");

  buttons.forEach(function (button) {
    button.addEventListener("mouseenter", function () {
      const arrow = button.querySelector("svg");

      if (arrow) {
        arrow.style.transform = "translateX(5px)";
      }
    });

    button.addEventListener("mouseleave", function () {
      const arrow = button.querySelector("svg");

      if (arrow) {
        arrow.style.transform = "translateX(0)";
      }
    });
  });

  /* ======================================================
       REDUCED MOTION
       ====================================================== */

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    section.classList.add("is-visible");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const revealClasses = [
    [".mx-card", "is-visible"],
    [".mx-about", "mx-about-visible"],
    [".mx-themes", "mx-themes-visible"],
    [".mx-speakers", "mx-speakers-visible"],
    [".mx-roundtables", "is-visible"],
    [".mx-global-data", "is-visible"],
    [".mx-embassy-section", "is-visible"],
    [".mx-how-section", "is-visible"],
    [".mx-attends-section", "mx-attends-visible"],
    [".mx-deliverables", "mx-deliverables-visible"],
    [".mx-insights-section", "is-visible"],
    [".mx-leaders", "is-visible"],
  ];

  window.setTimeout(function () {
    revealClasses.forEach(function ([selector, className]) {
      const section = document.querySelector(selector);

      if (section && !section.classList.contains(className)) {
        section.classList.add(className);
      }
    });
  }, 300);
});

// invitation modal + Google Sheets / email submission
// Email setup: see google-apps-script/Code.gs and deploy as Web App

const GOOGLE_SCRIPT_URL ="https://script.google.com/macros/s/AKfycbwvqitdAXm8_ClWzgL--7cBnBrWAzcHDO5x6bNrjSvWHQ0wODBTQ7ABtzpJhcEZRgZv/exec";
function getInviteFormPayload(form) {
  const data = new FormData(form);

  return {
    enquiryType: data.get("Enquiry Type") || "",
    firstName: data.get("First Name") || "",
    lastName: data.get("Last Name") || "",
    businessEmail: data.get("Business Email") || "",
    mobileNumber: data.get("Mobile Number") || "",
    jobTitle: data.get("Job Title") || "",
    company: data.get("Company") || "",
    country: data.get("Country") || "",
    organisationType: data.get("Organisation Type") || "",
    sponsorshipInterest: data.get("Sponsorship Interest") || "",
    estimatedBudgetRange: data.get("Estimated Budget Range") || "",
    message: data.get("Message") || "",
    consent: data.get("Consent") ? "Yes" : "No",
    pageUrl: window.location.href,
  };
}

function initInvitationModal() {
  const openButton = document.getElementById("mxInviteOpen");
  const modal = document.getElementById("mxInviteModal");
  const closeButton = document.getElementById("mxInviteClose");
  const backdrop = document.getElementById("mxInviteBackdrop");
  const form = document.getElementById("mxInviteForm");

  if (!openButton || !modal || !closeButton || !backdrop) return;

  let lastFocusedElement = null;

  function openModal() {
    lastFocusedElement = document.activeElement;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    openButton.setAttribute("aria-expanded", "true");

    document.body.style.overflow = "hidden";

    setTimeout(() => {
      closeButton.focus();
    }, 150);
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    openButton.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  document.querySelectorAll('a[href="#invitation"], a[href="#request-access"], a[href="#request-invitation"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const submitButton = form.querySelector(".mx-invite-submit");
      const submitLabel = submitButton
        ? submitButton.querySelector("span")
        : null;
      const originalText = submitLabel
        ? submitLabel.textContent
        : submitButton
          ? submitButton.textContent
          : "Submit Invitation Request";

      if (submitButton) {
        submitButton.disabled = true;
      }

      if (submitLabel) {
        submitLabel.textContent = "Submitting...";
      } else if (submitButton) {
        submitButton.textContent = "Submitting...";
      }

      const payload = getInviteFormPayload(form);

      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
        });

        if (submitLabel) {
          submitLabel.textContent = "Submitted Successfully";
        } else if (submitButton) {
          submitButton.textContent = "Submitted Successfully";
        }

        setTimeout(() => {
          form.reset();

          if (submitButton) {
            submitButton.disabled = false;
          }

          if (submitLabel) {
            submitLabel.textContent = originalText;
          } else if (submitButton) {
            submitButton.textContent = originalText;
          }

          closeModal();

          alert(
            "Thank you for your interest in Meridian Exchange. Your request has been received by the Meridian Exchange Secretariat. A member of our team will contact you shortly.",
          );
        }, 700);
      } catch (error) {
        console.error("Invitation form submission error:", error);

        if (submitButton) {
          submitButton.disabled = false;
        }

        if (submitLabel) {
          submitLabel.textContent = originalText;
        } else if (submitButton) {
          submitButton.textContent = originalText;
        }

        alert("Something went wrong. Please try again.");
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initInvitationModal);
} else {
  initInvitationModal();
}
