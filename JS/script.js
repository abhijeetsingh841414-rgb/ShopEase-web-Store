
const productGrid = document.getElementById("productGrid");
const productModal = document.getElementById("product-modal");
const closeBtn = document.querySelector(".closeBtn");
const searchInput = document.getElementById("search-input");
const categoryCards = document.querySelectorAll(".category-card");
const cartCountElement = document.getElementById("cartCount");


//  Rider Products in js
function productDisplay(items){
    productGrid.innerHTML = items.map(product => {
        return `
          <div class="product-card" onclick="openModal(${product.id})">
          <div class="productImage">
            <img src="${product.image}" alt="${product.title}" />
          </div>
          <div class="productInfo">
            <div class="productTag">${product.category}</div>
            <h3>${product.title}</h3>
            <div class="rating">
              ${'<i class="fa-solid fa-star"></i>'.repeat(product.rating)}
              ${'<i class="fa-solid fa-star"></i>'.repeat(5 - product.rating)}
            </div>
            <div class="productPrice">
              <span class="price">₹ ${product.price}</span>
              <button class="add-to-cartBtn" onclick="event.stopPropagation(); addToCart(${product.id})">
                <i class="fa-solid fa-cart-plus"></i> Add
              </button>
            </div>
          </div>
        </div>
        `;
    }).join('');
}


let cart = JSON.parse(localStorage.getItem('shopeaseCart')) || [];

function updateCartCount(){
    const totalItem = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCountElement.textContent = totalItem;
}

function saveItem(){
    localStorage.setItem('shopeaseCart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(id){
    const product = products.find(p => p.id === id);
    if(!product) return;

    const existingItem = cart.find(item => item.id === id);

    if(existingItem){
        existingItem.quantity += 1;
    }
    else{
        cart.push({
            id : product.id,
            title : product.title,
            price : product.price,
            image : product.image,
            quantity : 1
        });
    }
    saveItem();
    alert(`Product ${id} added to cart!`);
}

// Products Modal and popup section
function openModal(id){
    // console.log("Clickrd id :", id)
    // console.log("Products: ", products)
    const selectProduct = products.find(prod => prod.id === id);
    // console.log("Selecterd products: ", selectProduct);
    if(!selectProduct) return;

    document.getElementById("modal-img").src = selectProduct.image;
    document.getElementById("modalTitle").textContent = selectProduct.title;
    document.getElementById("modal-category").textContent = `Category: ${selectProduct.category}`;
    document.getElementById("modalPrice").textContent = `₹${selectProduct.price}`;
    document.getElementById("modal-description").textContent = selectProduct.description;

    const modalBtn = document.getElementById("modal-cart-btn");
    modalBtn.onclick = () => {
        addToCart(selectProduct.id);
        productModal.style.display = "none";
    };
    productModal.style.display = "flex";
}
updateCartCount()



closeBtn.addEventListener('click', ()=>{
    productModal.style.display = 'none';
});
window.addEventListener('click', (e)=>{
    if(e.target === productModal){
        productModal.style.display = 'none';
    }
});

productDisplay(products)


//  Search bar filter logic

let currentCategory = "All"
searchInput.addEventListener('input', () =>{
    const searchTerm = e.target.value.toLowerCase().trim();
    filterProducts(searchTerm, currentCategory);
})

categoryCards.forEach(card =>{
    card.addEventListener('click', ()=>{
        currentCategory = card.getAttribute('data-category');

        document.getElementById("products").scrollIntoView({behavior: 'smooth'});
        filterProduct(searchInput.value.toLowerCase().trim(), currentCategory)
    })
})


function filterProduct(searchTerm, category){
    const filtered = products.filter(product =>{
        const matchSearch = product.title.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);

        const matchCatgory = category === "All" || product.category === category;
        return matchCatgory && matchSearch;
    }); 

    if(filtered.length === 0){
        productGrid.innerHTML = `<p style ="grid-column:1/-1; text-style: center; font-size: 18px; color: #777; padding: 40px 0;">No Products Found!<p/>`;
    }else{
        productDisplay(filtered);
    }
}