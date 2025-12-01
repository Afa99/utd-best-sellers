document.addEventListener("DOMContentLoaded", function () {
  // Продукти (всі використовують ті самі imgT.png / imgM.png)
  const products = {
    "collection-1": {
      name: "Butterfly - Hope And Rebirth",
      price: "₴1,424.00",
      oldPrice: "₴1,424.00",
      tags: ["New", "Sale"],
      url: "#MantraRings",
      image: {
        desktop: "./images/imgC.png",
        tablet: "./images/imgC.png",
        mobile: "./images/imgC.png",
        alt: "Gold necklace product image",
      },
    },
    "collection-2": {
      name: "CharityBands® - Lunar Harmony",
      price: "₴1,980.00",
      oldPrice: "₴2,240.00",
      tags: ["Sale"],
      url: "#CharityBands",
      image: {
        desktop: "./images/imgT.png",
        tablet: "./images/imgT.png",
        mobile: "./images/imgT.png",
        alt: "Gold necklace close-up",
      },
    },
    "collection-3": {
      name: "Statement Collection - Crescent Glow",
      price: "₴2,320.00",
      oldPrice: "₴2,900.00",
      tags: ["Bestseller"],
      url: "#StatementCollection",
      image: {
        desktop: "./images/imgM.png",
        tablet: "./images/imgM.png",
        mobile: "./images/imgM.png",
        alt: "Statement gold jewelry",
      },
    },
  };

  const bestSellers = document.querySelector(".best-sellers");
  const collectionButtons = Array.from(
    bestSellers.querySelectorAll(".best-sellers__collection")
  );

  const productCard = bestSellers.querySelector(".product-card");
  const productImageLink = productCard.querySelector(
    ".product-card__image-link"
  );
  const productPanelLink = productCard.querySelector(".product-card__panel");
  const productNameEl = productCard.querySelector(".product-card__name");
  const priceEl = productCard.querySelector(".product-card__price");
  const oldPriceEl = productCard.querySelector(".product-card__old-price");
  const badgesContainer = productCard.querySelector(
    ".product-card__badges"
  );

  const pictureEl = productCard.querySelector(".product-card__picture");
  const imgEl = productCard.querySelector(".product-card__image");

  const sourceMobile = pictureEl.querySelector(
    '[data-picture-size="mobile"]'
  );
  const sourceTablet = pictureEl.querySelector(
    '[data-picture-size="tablet"]'
  );
  const sourceDesktop = pictureEl.querySelector(
    '[data-picture-size="desktop"]'
  );

  const quickViewBtn = productCard.querySelector(
    ".product-card__icon-btn--quick-view"
  );

  const overlay = bestSellers.querySelector(".best-sellers__overlay");
  const modal = bestSellers.querySelector(".best-sellers__modal");
  const modalText = bestSellers.querySelector(".best-sellers__modal-text");
  const modalClose = bestSellers.querySelector(".best-sellers__modal-close");

  let currentProductKey =
    collectionButtons[0] && collectionButtons[0].dataset.collection
      ? collectionButtons[0].dataset.collection
      : null;

  function renderProduct(key) {
    const product = products[key];
    if (!product) return;

    currentProductKey = key;
    productCard.setAttribute("data-product-id", key);

    const href = product.url || "#";
    productImageLink.href = href;
    productPanelLink.href = href;

    productNameEl.textContent = product.name;
    priceEl.textContent = product.price || "";
    oldPriceEl.textContent = product.oldPrice || "";

    // бейджі
    badgesContainer.innerHTML = "";
    if (Array.isArray(product.tags)) {
      product.tags.forEach(function (tag) {
        const badge = document.createElement("span");
        badge.classList.add("product-card__badge");
        if (tag.toLowerCase() === "sale") {
          badge.classList.add("product-card__badge--sale");
        }
        badge.textContent = tag;
        badgesContainer.appendChild(badge);
      });
    }

    // <picture> — під твої 2 картинки
    sourceMobile.srcset = product.image.mobile;
    sourceTablet.srcset = product.image.tablet;
    sourceDesktop.srcset = product.image.desktop;

    imgEl.src = product.image.desktop;
    imgEl.alt = product.image.alt || product.name;
  }

  function setActiveCollection(key) {
    collectionButtons.forEach(function (btn) {
      const isActive = btn.dataset.collection === key;
      btn.classList.toggle("best-sellers__collection--active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    renderProduct(key);
  }

  collectionButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const key = btn.dataset.collection;
      if (!key || key === currentProductKey) return;
      setActiveCollection(key);
    });
  });

  // Модалка
  function openModal() {
    const product = products[currentProductKey];
    modalText.textContent =
      product.name + " has been added to the your cart.";
    bestSellers.classList.add("best-sellers--modal-open");
    document.body.classList.add("no-scroll");
  }

  function closeModal() {
    bestSellers.classList.remove("best-sellers--modal-open");
    document.body.classList.remove("no-scroll");
  }

  quickViewBtn.addEventListener("click", openModal);
  modalClose.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeModal();
  });

  if (currentProductKey) setActiveCollection(currentProductKey);
});
