
// getter vsegda vse doljni chto to vozvrashat i u nego v nutri doljen napisano 'return'
// this - vsegda obrashaebsya k tomu obektu v kotorom on sozdan
// metodi sozdayutsya dlya togo chtob vipolnyat kakieto deystvie

let product = {
	plainBurger: {
		name: 'Гамбургер простой',
		price: 10000,
		amount: 0,
		kcall: 500,
		descr: 'Встречайте простой ГАМБУРГЕР. Он не сочный и не сытный за то дешевый',
		img: 'images/product2.jpg',
		get Summ() {
			return this.price * this.amount
		},
		get Kcall() {
			return this.kcall * this.amount;
		}
	},
	freshBurger: {
		name: 'Гамбургер Fresh',
		price: 20500,
		amount: 0,
		kcall: 1100,
		descr: 'Встречайте Фрешмена FAS FOOD`а. Он набрал в себя всё самое старое.',
		img: 'images/product1.jpg',
		get Summ() {
			return this.price * this.amount
		},
		get Kcall() {
			return this.kcall * this.amount;
		}
	},
	freshCombo: {
		name: 'Fresh COMBO',
		price: 31900,
		amount: 0,
		kcall: 1500,
		descr: ' FRESH и Картошка фри. Тот же самый FRESH и Фри объяденились.',
		img: 'images/product3.jpg',
		get Summ() {
			return this.price * this.amount
		},
		get Kcall() {
			return this.kcall * this.amount;
		}
	},
	bigBurger: {
		name: 'Самый лучший бургер',
		price: 5000,
		amount: 0,
		kcall: 5000,
		descr: '100% надетесь и пожирнеете',
		img: 'https://avatars.mds.yandex.net/i?id=eb21be32cdddad0bb7387bc8bce2c9d48543f08e-5291151-images-thumbs&n=13',
		get Summ() {
			return this.price * this.amount
		},
		get Kcall() {
			return this.kcall * this.amount;
		}
	}

}




// Dop produksii

let extraProduct = {
	doubleMayonnaise: {
		name: 'Двойной майонез',
		price: 1000,
		kcall: 100,
	},
	lettuce: {
		name: 'Салатный лист',
		price: 2500,
		kcall: 30
	},
	cheese: {
		name: 'Сыр',
		price: 2500,
		kcall: 150
	}
}


let str = '';

function creareBurger() {
	let main = document.querySelector('.main');
	for (let key in product) {
		let { name, img, descr, price } = product[key];
		str += `<section class="main__product" id="${key}">
		<div class="main__product-preview">
			<div class="main__product-info">
				<img src="${img}" alt="png" class="main__product-img" />
				<h2 class="main__product-title">${name}
					Гамбургер простой
					<span class="main__product-many">${price} сум</span>
				</h2>
			</div>
			<p class="main__product-descr">
			${descr}
				Встречайте простой ГАМБУРГЕР. Он не сочный и не сытный за то
				дешевый
			</p>
		</div>
		<div class="main__product-extra">
			<div class="main__product-number">
				<a class="main__product-btn fa-reg minus" data-symbol="-"></a>

				<output class="main__product-num">0</output>

				<a class="main__product-btn fa-reg plus" data-symbol="+"></a>
			</div>
			<div class="main__product-price"><span>0</span> сум</div>
		</div>
		<div class="main__product-extraProduct">`;
		for (let newKey in extraProduct) {
			str += `            <label class="main__product-label">
			<input
				type="checkbox"
				class="main__product-checkbox"
				data-extra="${newKey}"
			/>
			<span class="main__product-check"></span>
			Двойной майонез
			${extraProduct[newKey].name}
		</label>`
		}
		str += `</div>
		<div class="main__product-kcall"><span>0</span> калорий</div>
	</section>`
	}
	main.innerHTML = str;
	market();
}


setTimeout(() => creareBurger(), 1000);
function market() {


	let btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
		checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
		addCart = document.querySelector('.addCart'),
		receipt = document.querySelector('.receipt'),
		receiptWindow = document.querySelector('.receipt__window'),
		receiptOut = document.querySelector('.receipt__window-out'),
		receiptBtn = document.querySelector('.receipt__window-btn');

	btnPlusOrMinus.forEach(function (item) {
		item.addEventListener('click', function () {
			plusOrMinus(this);
		})
	})

	function plusOrMinus(element) {
		// closest() - podkluchaetsya k blijayshemu zadannomu roditelu
		// getAttribute() - chtob poluchit v javaScripte znacheniye lubogo atributa. dlya etoga ego nado ukazat.

		let parentId = element.closest('.main__product').getAttribute('id'),
			out = element.closest('.main__product').querySelector('.main__product-num'),
			price = element.closest('.main__product').querySelector('.main__product-price span'),
			kcall = element.closest('.main__product').querySelector('.main__product-kcall span')

		// knopkalarni bosganda minus va plus bulishi uchun

		if (element.getAttribute('data-symbol') == '+') {
			product[parentId].amount++
		} else if (element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0) {/* bu nolda kichik bulmasligi uchun */
			product[parentId].amount--
		}
		out.innerHTML = product[parentId].amount;
		price.innerHTML = product[parentId].Summ;
		kcall.innerHTML = product[parentId].Kcall;
	}

	for (let i = 0; i < checkExtraProduct.length; i++) {
		checkExtraProduct[i].addEventListener('click', function () {
			addExtraProduct(this)
		})
	}

	function addExtraProduct(el) {
		let parent = el.closest('.main__product');
		parentId = parent.getAttribute('id');

		product[parentId][el.getAttribute('data-extra')] = el.checked;

		let kcall = parent.querySelector('.main__product-kcall span'),
			price = parent.querySelector('.main__product-price span'),
			elDataInfo = el.getAttribute('data-extra');

		if (product[parentId][elDataInfo] == true) {
			product[parentId].price += extraProduct[elDataInfo].price;
			product[parentId].kcall += extraProduct[elDataInfo].kcall;
		} else {
			product[parentId].price -= extraProduct[elDataInfo].price;
			product[parentId].kcall -= extraProduct[elDataInfo].kcall;
		}

		kcall.innerHTML = product[parentId].Kcall;
		price.innerHTML = product[parentId].Summ;

	}

	let arrProduct = [],
		totalName = '',
		totalPrice = 0,
		totalKcall = 0;

	addCart.addEventListener('click', function () {
		for (let key in product) {
			let productobj = product[key];
			if (productobj.amount > 0) {
				arrProduct.push(productobj);
				for (let newKey in productobj) {
					if (productobj[newKey] === true) {
						productobj.name += '\n' + extraProduct[newKey].name
					}
				}
			}
			productobj.price = productobj.Summ;
			productobj.kcall = productobj.Kcall;
		}


		for (let i = 0; i < arrProduct.length; i++) {
			let el = arrProduct[i];
			totalName += '\n' + el.name + '\n';
			totalPrice += el.price;
			totalKcall += el.kcall;
		}

		receiptOut.innerHTML = `Ваш заказ: \n ${totalName} \nКаллорийность ${totalKcall} \nСумма покупки ${totalPrice}сумм`;

		receipt.style.display = 'flex';
		setTimeout(() => receipt.style.opacity = '1', 100);
		setTimeout(() => receiptWindow.style.top = '0', 200);


		let outNum = document.querySelectorAll('.main__product-num'),
			outPrice = document.querySelectorAll('.main__product-price span'),
			outKcall = document.querySelectorAll('.main__product-kcall span');

		for (let i = 0; i < outNum.length; i++) {
			outNum[i].innerHTML = 0;
			outPrice[i].innerHTML = 0;
			outKcall[i].innerHTML = 0;
		}
	})

	receiptBtn.addEventListener('click', () => {
		location.reload();
	})
}

// ************ 100 lvl *************

let i = 0;
let num = document.querySelector('.header__timer-extra')

function rek() {
	if (i < 101) {
		i++
		num.innerHTML = i;
	} else if (num.innerHTML = 100) {
		num.style.fontsSize = '150px';

	}
	setTimeout(() => rek(), 100);
}

rek()



























