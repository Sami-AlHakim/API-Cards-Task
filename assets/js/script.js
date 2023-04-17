const display = document.querySelector('.cards-holder');
const input = document.querySelector('#search');
const nextBtn = document.querySelector('#next')
const prevBtn = document.querySelector('#prev')
const cardHolder = document.querySelector('.cards-holder')
let start = 0;
let end = 10;

async function getData (start, end) {
  await fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(res => products = res.products)
  console.log(products);
  for (let index = start; index < end; index++) {
    const product = products[index];
    
    addNewProduct(product.title, product.description, product.price, product.thumbnail, product.brand);
  }
  
}

function addNewProduct (title, desc, price, img, brand) {
  let name = document.createElement('h2');
  let card = document.createElement('div');
  let des = document.createElement('p');
  let pr = document.createElement('h4');
  let br = document.createElement('span');
  let image = document.createElement('img');
  
  name.innerText = title;
  br.innerText = brand;
  des.innerText = desc;
  pr.innerText = price + " $";
  image.src = img;
  
  card.classList.add('card')
  
  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(br);
    card.appendChild(des);
    card.appendChild(pr);
    cardHolder.appendChild(card);
  }

nextBtn.addEventListener('click', () => {
  cardHolder.innerHTML = "";
  if (start < 20 && end < 30 ){
    start+=10;
    end+=10;
    getData(start, end)
  }
  else {
    start = 0;
    end = 10;
    getData(start, end)
  }
})

prevBtn.addEventListener('click', () => {
  cardHolder.innerHTML = "";
  if (start == 0 && end == 10 ){
    start = 20;
    end = 30;
    getData(start, end)
  }
  else {
    start-=10;
    end-=10;
    getData(start, end)
  }
})

getData(start, end);

input.addEventListener('input', () => {
  let searchKey = input.value.toLowerCase();
  cardHolder.innerHTML = "";

  products.forEach(product => {
    const title = product.title.toLowerCase();
    const brand = product.brand.toLowerCase();
    const desc = product.description.toLowerCase();
    
    if (title.includes(searchKey) || brand.includes(searchKey) || desc.includes(searchKey)) {
      addNewProduct(product.title, product.description, product.price, product.thumbnail, product.brand);
    }
  });
})