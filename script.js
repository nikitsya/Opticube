async function loadPartial(path, targetId) {
  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  target.innerHTML = await response.text();
}

function initScrollResetOnReload() {
  const path = window.location.pathname;
  const isLuckrotPage = path.endsWith("/luckrot.html") || path.endsWith("luckrot.html");
  if (!isLuckrotPage) {
    return;
  }

  const navigationEntry = performance.getEntriesByType("navigation")[0];
  const isReload = navigationEntry && navigationEntry.type === "reload";
  if (!isReload) {
    return;
  }

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  scrollTop();
  window.requestAnimationFrame(scrollTop);
  window.addEventListener("load", scrollTop, { once: true });
}

function initHeaderInteractions() {
  const futureBtn = document.querySelector(".future-btn");
  if (!futureBtn) {
    return;
  }

  futureBtn.addEventListener("click", () => {
    futureBtn.classList.add("is-pulse");
    window.setTimeout(() => {
      futureBtn.classList.remove("is-pulse");
    }, 350);
  });
}

function initFooterYear() {
  const currentYearNode = document.getElementById("current-year");
  if (!currentYearNode) {
    return;
  }

  currentYearNode.textContent = String(new Date().getFullYear());
}

function initMediaHub() {
  const characterAssets = [
    "Fodder_Body.png",
    "Flyer_Body.png",
    "Giant_Body.png",
    "Pakman_Body.png",
    "Pullerman_Body.png",
    "Rager_Body.png",
    "Sniper_Body.png",
  ];

  const weaponAssets = [
    "AK_Screen2.png",
    "Burst_Screen2.png",
    "Pistol_Screen2.png",
    "Rifle_Screen2.png",
    "Shotgun_Screen2.png",
    "Sword_Screen2.png",
    "UZI_Screen2.png",
  ];

  const botAssets = [
    "BombBot.png",
    "RifleBot.png",
    "SawBot.png",
    "ShockBot.png",
    "ShotgunBot.png",
  ];

  const mediaData = {
    characters: characterAssets.map((filename) => {
      const label = filename.replace("_Body.png", "").replace(/_/g, " ");
      return {
        src: `images/characters/${filename}`,
        label,
      };
    }),
    weapons: weaponAssets.map((filename) => {
      const label = filename.replace("_Screen2.png", "").replace(/_/g, " ");
      return {
        src: `images/weapons/${filename}`,
        label,
      };
    }),
    bots: botAssets.map((filename) => {
      const label = filename.replace(".png", "").replace(/([a-z])([A-Z])/g, "$1 $2");
      return {
        src: `images/bots/${filename}`,
        label,
      };
    }),
  };

  const mediaGrid = document.getElementById("media-grid");
  const mediaTabs = document.querySelectorAll(".media-tab");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxClose = document.getElementById("lightbox-close");
  let activeMedia = "characters";

  function openLightbox(src, label) {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightboxImage.src = src;
    lightboxImage.alt = label;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightbox.hidden = true;
    lightboxImage.src = "";
    document.body.style.overflow = "";
  }

  function renderMedia(kind) {
    if (!mediaGrid) {
      return;
    }

    mediaGrid.innerHTML = "";
    mediaData[kind].forEach((item) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "media-card";
      card.dataset.kind = kind;

      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.label;
      image.loading = "lazy";

      const caption = document.createElement("p");
      caption.textContent = item.label;

      card.appendChild(image);
      card.appendChild(caption);
      card.addEventListener("click", () => openLightbox(item.src, item.label));
      mediaGrid.appendChild(card);
    });
  }

  if (mediaTabs.length > 0 && mediaGrid) {
    mediaTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const next = tab.dataset.media;
        if (!next || next === activeMedia) {
          return;
        }

        activeMedia = next;
        mediaTabs.forEach((node) => {
          const selected = node === tab;
          node.classList.toggle("is-active", selected);
          node.setAttribute("aria-selected", selected ? "true" : "false");
        });
        renderMedia(activeMedia);
      });
    });

    renderMedia(activeMedia);
  }

  const screenshotsSlider = document.querySelector(".press-kit-screenshots-slider");
  const screenshotsGrid = screenshotsSlider ? screenshotsSlider.querySelector(".press-kit-screenshots-grid") : null;
  if (screenshotsGrid) {
    const screenshotCards = Array.from(screenshotsGrid.querySelectorAll(".press-kit-screenshot-card"));
    const prevButton = screenshotsSlider ? screenshotsSlider.querySelector(".press-kit-screenshots-arrow--prev") : null;
    const nextButton = screenshotsSlider ? screenshotsSlider.querySelector(".press-kit-screenshots-arrow--next") : null;
    const screenshotsThumbs = document.querySelector(".press-kit-screenshots-thumbs");
    let activeScreenshotIndex = screenshotCards.findIndex((card) => card.classList.contains("is-active"));
    let screenshotThumbButtons = [];

    if (activeScreenshotIndex < 0) {
      activeScreenshotIndex = 0;
    }

    const setActiveScreenshot = (index) => {
      if (screenshotCards.length === 0) {
        return;
      }

      activeScreenshotIndex = (index + screenshotCards.length) % screenshotCards.length;
      screenshotCards.forEach((card, cardIndex) => {
        const isActive = cardIndex === activeScreenshotIndex;
        card.classList.toggle("is-active", isActive);
        card.hidden = !isActive;
      });

      screenshotThumbButtons.forEach((thumbButton, thumbIndex) => {
        const isActive = thumbIndex === activeScreenshotIndex;
        thumbButton.classList.toggle("is-active", isActive);
        thumbButton.setAttribute("aria-current", isActive ? "true" : "false");
      });
    };

    if (screenshotsThumbs) {
      screenshotsThumbs.innerHTML = "";
      screenshotThumbButtons = screenshotCards
        .map((card, index) => {
          const cardImage = card.querySelector("img");
          if (!(cardImage instanceof HTMLImageElement)) {
            return null;
          }

          const thumbButton = document.createElement("button");
          thumbButton.type = "button";
          thumbButton.className = "press-kit-screenshots-thumb";
          thumbButton.setAttribute("aria-label", `Show screenshot ${index + 1}`);

          const thumbImage = document.createElement("img");
          thumbImage.src = cardImage.currentSrc || cardImage.src;
          thumbImage.alt = "";
          thumbImage.loading = "lazy";

          thumbButton.appendChild(thumbImage);
          thumbButton.addEventListener("click", () => {
            setActiveScreenshot(index);
          });

          screenshotsThumbs.appendChild(thumbButton);
          return thumbButton;
        })
        .filter(Boolean);
    }

    setActiveScreenshot(activeScreenshotIndex);

    const hasMultipleScreenshots = screenshotCards.length > 1;
    if (prevButton) {
      prevButton.hidden = !hasMultipleScreenshots;
      prevButton.disabled = !hasMultipleScreenshots;
      if (hasMultipleScreenshots) {
        prevButton.addEventListener("click", () => {
          setActiveScreenshot(activeScreenshotIndex - 1);
        });
      }
    }

    if (nextButton) {
      nextButton.hidden = !hasMultipleScreenshots;
      nextButton.disabled = !hasMultipleScreenshots;
      if (hasMultipleScreenshots) {
        nextButton.addEventListener("click", () => {
          setActiveScreenshot(activeScreenshotIndex + 1);
        });
      }
    }

  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });
}

function initGameplayInactivityBlur() {
  const descriptionSection = document.getElementById("featured");
  const topVideo = document.querySelector(".luckrot-video-player");
  if (!descriptionSection || !topVideo) {
    return;
  }

  let rafId = null;
  const progressVar = "--gameplay-blur-progress";
  let blurStartScrollY = 0;
  let blurEndScrollY = 1;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function recalculateBlurBounds() {
    const videoRect = topVideo.getBoundingClientRect();
    const descriptionRect = descriptionSection.getBoundingClientRect();
    const videoTopScrollY = videoRect.top + window.scrollY;
    const descriptionTopScrollY = descriptionRect.top + window.scrollY;
    // Start blurring when the top of the viewport reaches the video start.
    blurStartScrollY = videoTopScrollY;
    // Reach max blur when the top of the viewport reaches the featured section.
    blurEndScrollY = descriptionTopScrollY;
    if (blurEndScrollY <= blurStartScrollY) {
      blurEndScrollY = blurStartScrollY + 1;
    }
  }

  function updateBlurState() {
    const blurRange = blurEndScrollY - blurStartScrollY;
    const progress = clamp((window.scrollY - blurStartScrollY) / blurRange, 0, 1);
    document.documentElement.style.setProperty(progressVar, progress.toFixed(3));
  }

  function requestBlurStateUpdate() {
    if (rafId !== null) {
      return;
    }

    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      updateBlurState();
    });
  }

  function handleResize() {
    recalculateBlurBounds();
    requestBlurStateUpdate();
  }

  recalculateBlurBounds();
  updateBlurState();
  window.addEventListener("scroll", requestBlurStateUpdate, { passive: true });
  window.addEventListener("resize", handleResize);
}

async function bootstrap() {
  initScrollResetOnReload();

  try {
    await Promise.all([
      loadPartial("partials/header.html", "header-root"),
      loadPartial("partials/footer.html", "footer-root"),
    ]);
  } catch (error) {
    console.error("Failed to load partials:", error);
  }

  initHeaderInteractions();
  initFooterYear();
  initMediaHub();
  initGameplayInactivityBlur();
}

bootstrap();
