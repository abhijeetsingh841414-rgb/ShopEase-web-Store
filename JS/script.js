const products =  [
    {
        id : 1,
        title : "Dell - Laptop",
        category : "Electronics",
        price : 62500,
        rating : 4,
        image : "image/dell-laptop3.jpg",
        description : "Dell Laptop with fast performance, stylish design, clear display, and reliable battery life. Perfect for study, work, coding, and entertainment."
    },

    {
        id : 2,
        title : "Traval - Bag",
        category : "Accessories",
        price : 2500,
        rating : 4,
        image : "image/bag3.jpg",
        description : "Durable and water-resistant backpack with dedicated laptop compartment."
    },

    {
        id : 3,
        title : "Dell - Laptop",
        category : "Electronics",
        price : 82500,
        rating : 4.5,
        image : "image/dell-laptop2.jpg",
        description : "Dell Laptop with fast performance, stylish design, clear display, and reliable battery life. Perfect for study, work, coding, and entertainment."
    },

    {
        id : 4,
        title : "Smart Watch",
        category : "Electronics",
        price : 25500,
        rating : 4.1,
        image : "image/smart-watch1.jpg",
        description : "Tracks heart rate, steps, sleep, and sports activities with an AMOLED display."
    },

    {
        id : 5,
        title : "Women Saree",
        category : "Fashion",
        price : 2450,
        rating : 4.2,
        image : "image/shari.webp",
        description : "Saree mall Embellished sequinned Poly Georgette Saree."
    },

    {
        id : 6,
        title : "Cutiekins",
        category : "Fashion",
        price : 3458,
        rating : 4.3,
        image : "image/kid2.webp",
        description : "Cutiekins Girls Bandhani Printed Angrakha Gotta Patti Kurta with Dhoti Pants."
    },

    {
        id : 7,
        title : "Men - PUMA-Shoes",
        category : "Fashion",
        price : 11456,
        rating : 4.2,
        image : "image/PUMA-shoes1.jpg",
        description : "Puma shoes with a stylish design, comfortable fit, and durable sole."
    },

    {
        id : 8,
        title : "iPhone15",
        category : "Mobiles",
        price : 92500,
        rating : 4.5,
        image : "image/iPhone1.jpg",
        description : "Pawerful smartphone with a premium design, high-quality camera, fast performance, and smooth user experience."
    }
];


const productGrid = document.getElementById("productGrid");
const productModal = document.getElementById("product-modal");
const closeBtn = document.querySelector(".closeBtn");

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
        </div> `;
    }).join('')
}

function openModal(id){
    const selectProduct = products.find(prod => prod.id === id);
    if(!selectProduct) return;

    document.getElementById("modal-img").src = selectProduct.image;
    document.getElementById("modalTitle").textContent = selectProduct.title;
    document.getElementById("modal-category").textContent = `Category: ${selectProduct.category}`;
    document.getElementById("modalPrice").textContent = `₹${selectProduct.price}`;
    document.getElementById("modal-description").textContent = selectProduct.description;

    productModal.style.display = "flex"

}


function addToCart(id){
    alert(`Product ${id} added to cart!`);
}

closeBtn.addEventListener('click', () => productModal.style.display = "none");
    window.addEventListener('click', (e)=>{
        if(e.target === productModal) productModal.style.display = "none";
})

productDisplay(products)