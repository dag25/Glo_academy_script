window.addEventListener('DOMContentLoaded', () => {
	const cartWrapper = document.querySelector('.cart__wrapper'),
		cart = document.querySelector('.cart'),
		close = document.querySelector('.cart__close'),
		open = document.querySelector('#cart'),
		goodsBtn = document.querySelectorAll('.goods__btn'),
		products = document.querySelectorAll('.goods__item'),
		confirm = document.querySelector('.confirm'),
		badge = document.querySelector('.nav__badge'),
		totalCost = document.querySelector('.cart__total > span'),
      titles = document.querySelectorAll('.goods__title'),
      empty = cartWrapper.querySelector('.empty');


	/**
	 *открываем корзину
	 *
	 */
	function openCart() {
		cart.style.display = 'block';
		document.body.style.overflow = 'hidden';
	}
	/**
	 *закрываем корзину
	 *
	 */
	function closeCart() {
		cart.style.display = 'none';
		document.body.style.overflow = '';
	}
	open.addEventListener('click', openCart);
	close.addEventListener('click', closeCart);

	goodsBtn.forEach(function(btn, i) {
		btn.addEventListener('click', function() {
			let item = products[i].cloneNode(true),
				trigger = item.querySelector('button'),
				removeBtn = document.createElement('div');
				
			trigger.remove();
			showConfirm();
			calcGoods(1);
			//  добавляем крестик
			removeBtn.classList.add('goods__item-remove');
			removeBtn.innerHTML = '&times';

			item.appendChild(removeBtn);
			cartWrapper.appendChild(item);
         

			calcTotal(); // подсчет суммы
			removeFromCart(); //  вызов функция удаления карточки
		});
	});

	/**
	 *функция обрезания текста
	 *
	 */
	function sliceTitle() {
		titles.forEach(function(item) {
			if (item.textContent.length < 70) {
				return;
			} else {
				const str = item.textContent.slice(0, 71) + '...';
				// const str = `${item.textContent.slice(0, 71)}'...'`;
				item.textContent = str;
			}
		});
	}
	sliceTitle();
	/**
	 *функция появления картинки корзинки
	 *
	 */
	function showConfirm() {
		confirm.style.display = 'block';
		let counter = 100;
		const id = setInterval(frame, 10);
		// функция анимации
		function frame() {
			if (counter == 10) {
				clearInterval(id);
				confirm, (style.display = 'none');
			} else {
				counter--;
				confirm.style.transform = `translateY(-${counter}px)`;
				confirm.style.opacity = '.' + counter;
			}
		}
	}

	/**
	 *увеличение бейджа в корзине
	 *
	 * @param {*} i значение
	 */
	function calcGoods(i) {
      const items = cartWrapper.querySelectorAll('.goods__item');                     
      badge.textContent = i + items.length;  
      // удаление надписи в корзине
      if (items.length === 0) {
         empty.style.display = 'block';
      } else {
         empty.style.display = 'none';
      }

   }
   
	/**
	 *функция подсчета всей суммы
	 *
	 */
	function calcTotal() {
		const prices = document.querySelectorAll(
			'.cart__wrapper > .goods__item > .goods__price > span'
		);
		let total = 0;
		prices.forEach(function(item) {
			total += +item.textContent;
		}); // добавляем в общую сумму
		totalCost.textContent = total;
	}

	/**
	 *функция удаления карточки
	 *
	 */
	function removeFromCart() {
		const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');

		removeBtn.forEach(function(btn) {
			btn.addEventListener('click', () => {
            btn.parentElement.remove(); //удаление родителя
                        
				calcGoods(0); // уменьшение бейджа в корзине
            calcTotal(); //уменьшение суммы
            
            
			});
		});
	}
});

