let itemCounter = 0;
let totalPrice = 0;
let buttonsContainer = document.querySelector('.page-content');
let itemCounterLabel = document.querySelector('.cart-counter');

let buttonClickHandler = (event) => {
  let target = event.target;

  if (target && target.matches('button.item-actions__cart')) {

    itemCounterLabel.innerHTML = `${++itemCounter}`;
    if (itemCounter === 1) itemCounterLabel.style.display = 'block';

    let priceText = target.parentElement.previousElementSibling.innerHTML;

    let splittedPriceText = priceText.split(' ');

    let priceBeforeDot = splittedPriceText[0].substr(1);
    let priceAfterDot = splittedPriceText[1].replace(/\D/g,'');

    let currentPrice = +(priceBeforeDot + '.' + priceAfterDot);

    totalPrice = Math.round((totalPrice + currentPrice) * 100) / 100;
    let restoreHTML = target.innerHTML;

    target.innerHTML = `Added ${totalPrice.toFixed(2)} $`;

    buttonsContainer.removeEventListener('click', buttonClickHandler);
    target.disabled = true;

    setTimeout(() => {
      target.innerHTML = restoreHTML;
      buttonsContainer.addEventListener('click', buttonClickHandler);
      target.disabled = false;
    }, 1000);
  }
};

buttonsContainer.addEventListener('click', buttonClickHandler);