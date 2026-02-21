const futureBtn = document.querySelector(".future-btn");

if (futureBtn) {
  futureBtn.addEventListener("click", () => {
    futureBtn.classList.add("is-pulse");
    window.setTimeout(() => {
      futureBtn.classList.remove("is-pulse");
    }, 350);
  });
}
