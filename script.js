const futureBtn = document.querySelector(".future-btn");

if (futureBtn) {
  futureBtn.addEventListener("click", () => {
    futureBtn.classList.add("is-pulse");
    window.setTimeout(() => {
      futureBtn.classList.remove("is-pulse");
    }, 350);
  });
}

const mediaData = {
  characters: [
    { src: "images/showcase/characters/char-01.jpeg", label: "Character 01" },
    { src: "images/showcase/characters/char-02.jpeg", label: "Character 02" },
    { src: "images/showcase/characters/char-03.jpeg", label: "Character 03" },
    { src: "images/showcase/characters/char-04.jpeg", label: "Character 04" },
    { src: "images/showcase/characters/char-05.jpeg", label: "Character 05" },
    { src: "images/showcase/characters/char-06.jpeg", label: "Boss Variant" },
  ],
  weapons: [
    { src: "images/showcase/weapons/weap-01.jpeg", label: "Weapon 01" },
    { src: "images/showcase/weapons/weap-02.jpeg", label: "Weapon 02" },
    { src: "images/showcase/weapons/weap-03.jpeg", label: "Weapon 03" },
    { src: "images/showcase/weapons/weap-04.jpeg", label: "Weapon 04" },
    { src: "images/showcase/weapons/weap-05.jpeg", label: "Weapon 05" },
    { src: "images/showcase/weapons/weap-06.jpeg", label: "Weapon 06" },
  ],
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
