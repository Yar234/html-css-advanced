"use strict";

const basketCounterEl = document.querySelector('.headerCart span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');

document.querySelector('.headerCart').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.picture__grid').addEventListener('click', event => {
  if (!event.target.closest('.slot__add')) {
    return;
  }
  const slotCardEl = event.target.closest('.slot__card');
  const id = +slotCardEl.dataset.id;
  const name = slotCardEl.dataset.name;
  const price = +slotCardEl.dataset.price;
  slot__add(id, name, price);
});

function slot__add(id, name, price) {
  if (!(id in basket)) {
    basket[id] = { id, name, price, count: 0 };
  }
  basket[id].count++;
  basketCounterEl.textContent = getTotalBasketCount().toString();
  basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2),
    getTotalBasketCount();
  renderProductInBasket(id);
}

function getTotalBasketCount() {
  return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
  return Object
    .values(basket)
    .reduce((acc, product) => acc + product.price * product.count, 0);
}

function renderProductInBasket(productId) {
  const basketRowEl = basketEl
    .querySelector(`.basketRow[data-id="${productId}"]`);
  if (!basketRowEl) {
    renderNewProductInBasket(productId);
    return;
  }

  const product = basket[productId];
  basketRowEl.querySelector('.productCount').textContent = product.count;
  basketRowEl
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);
}

function renderNewProductInBasket(productId) {
  const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
}