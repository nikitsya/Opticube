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

async function bootstrap() {
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
}

bootstrap();
