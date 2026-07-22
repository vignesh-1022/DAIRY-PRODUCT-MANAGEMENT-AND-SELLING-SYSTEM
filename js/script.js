const products = [
  { name: "Milk", price: 50, img: "images/milk.jpg", category: "milk" },
  { name: "Curd", price: 40, img: "images/curd.jpg", category: "milk" },
  { name: "Cheese", price: 200, img: "images/cheese.jpg", category: "value" },
  { name: "Butter", price: 180, img: "images/butter.jpg", category: "value" },
  { name: "Ghee", price: 600, img: "images/ghee.jpg", category: "value" },
  { name: "Yogurt", price: 60, img: "images/yaka.jpg", category: "milk" },
];

let cart = [];
let currentTrackingId = "";
let orderStatusMap = {};

function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function loadProducts() {
  const list = document.getElementById('productList');
  products.forEach((p, index) => {
    list.innerHTML += `
<div class="col-md-4">
<div class="shop-card">
<img src="${p.img}" style="height:200px;width:100%;object-fit:cover;">
<h5 class="mt-2">${p.name}</h5>
<p>₹${p.price}</p>
<button class="btn btn-warning" onclick="addToCart(${index})">Add to Cart</button>
</div>
</div>`;
  });
}

function addToCart(i) {
  cart.push(products[i]);
  displayCart();
  alert("Added to Cart");
}

function displayCart() {
  let total = 0;
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
<div class="shop-card mb-2">
${item.name} - ₹${item.price}
<button class="btn btn-sm btn-danger float-end" onclick="removeItem(${index})">Delete</button>
</div>`;
  });
  totalAmount.innerText = "Total: ₹" + total;
}

function removeItem(i) {
  cart.splice(i, 1);
  displayCart();
}

function buyItems() {
  if (cart.length === 0) {
    alert("Cart Empty");
    return;
  }
  showSection('checkout');
}

function adminLogin() {
  if (username.value === "admin" && password.value === "1234") {
    showSection('adminDashboard');
    loadCharts();
    loadDashboardCards();
    loadCowData();
    loadIoTData();
    loadOrderControl();
  } else {
    loginMsg.innerText = "Invalid Login";
  }
}

function loadCharts() {
  new Chart(barChart, {
    type: 'bar',
    data: {
      labels: ["Milk", "Curd", "Cheese", "Butter"],
      datasets: [{
        label: "Sales",
        data: [120, 90, 60, 40],
        backgroundColor: ["#febd69", "#198754", "#0d6efd", "#dc3545"]
      }]
    }
  });

  new Chart(pieChart, {
    type: 'pie',
    data: {
      labels: ["Jersey", "Holstein", "Gir"],
      datasets: [{
        data: [10, 8, 5],
        backgroundColor: ["#ffc107", "#20c997", "#6f42c1"]
      }]
    }
  });
}

function loadDashboardCards() {
  document.getElementById("totalOrders").innerText = 25;
  document.getElementById("totalRevenue").innerText = 12500;
  document.getElementById("lowStock").innerText = 2;
  document.getElementById("activeCows").innerText = 12;
}

function loadCowData() {
  let cows = [
    { id: "COW001", milk: 15, health: "Healthy", vaccine: "Done", preg: "No", feed: 20 },
    { id: "COW002", milk: 12, health: "Sick", vaccine: "Pending", preg: "Yes", feed: 18 },
    { id: "COW003", milk: 18, health: "Healthy", vaccine: "Done", preg: "No", feed: 22 },
    { id: "COW004", milk: 10, health: "Healthy", vaccine: "Pending", preg: "Yes", feed: 19 }
  ];

  let table = document.getElementById("cowTableBody");
  if (!table) return;

  table.innerHTML = "";

  cows.forEach(cow => {
    let healthBadge = cow.health === "Healthy"
      ? `<span class="badge bg-success">${cow.health}</span>`
      : `<span class="badge bg-danger">${cow.health}</span>`;

    let vaccineBadge = cow.vaccine === "Done"
      ? `<span class="badge bg-success">${cow.vaccine}</span>`
      : `<span class="badge bg-warning text-dark">${cow.vaccine}</span>`;

    let pregBadge = cow.preg === "Yes"
      ? `<span class="badge bg-info">${cow.preg}</span>`
      : `<span class="badge bg-secondary">${cow.preg}</span>`;

    table.innerHTML += `
<tr>
<td>${cow.id}</td>
<td>${cow.milk}</td>
<td>${healthBadge}</td>
<td>${vaccineBadge}</td>
<td>${pregBadge}</td>
<td>${cow.feed}</td>
</tr>
`;
  });
}

function loadIoTData() {
  let temp = (4 + Math.random() * 4).toFixed(1); // 4°C - 8°C
  let tank = Math.floor(50 + Math.random() * 50); // 50% - 100%

  let healthArray = ["Normal", "Warning", "Critical"];
  let health = healthArray[Math.floor(Math.random() * 3)];

  document.getElementById("milkTemp").innerText = temp + "°C";
  document.getElementById("tankLevel").innerText = tank + "%";
  document.getElementById("healthStatus").innerText = health;
}

function loadOrderControl() {
  let table = document.getElementById("orderControlTable");
  table.innerHTML = "";

  for (let id in orderStatusMap) {
    table.innerHTML += `
<tr>
<td>${id}</td>
<td>${orderStatusMap[id]}</td>
<td>
<select class="form-select" onchange="updateOrderStatus('${id}', this.value)">
<option value="">Change</option>
<option>Ordered</option>
<option>Packed</option>
<option>Shipped</option>
<option>Out for Delivery</option>
<option>Delivered</option>
</select>
</td>
</tr>
`;
  }
}

function updateOrderStatus(id, status) {
  if (status === "") return;
  orderStatusMap[id] = status;
  loadOrderControl();
  alert("Order status updated!");
}

function verifyAddress() {
  if (fullName.value === "" || address.value === "" || city.value === "" || pincode.value === "") {
    addressMsg.innerText = "Please fill all address fields";
    return;
  }
  addressMsg.innerText = "";
  paymentSection.style.display = "block";
}

function selectPayment(method) {
  upiBox.style.display = "none";
  cardBox.style.display = "none";
  codBox.style.display = "none";

  if (method === "upi") {
    upiBox.style.display = "block";
  }
  if (method === "card") {
    cardBox.style.display = "block";
  }
  if (method === "cod") {
    codBox.style.display = "block";
  }
}

function processUPI() {
  const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/;
  if (!upiPattern.test(upiId.value)) {
    upiMsg.innerText = "Invalid UPI ID";
    return;
  }
  upiMsg.innerText = "";
  placeOrder();
}

function processCard() {
  const cardPattern = /^[0-9]{16}$/;
  if (!cardPattern.test(cardNumber.value)) {
    cardMsg.innerText = "Invalid Card Number";
    return;
  }
  cardMsg.innerText = "";
  placeOrder();
}

function generateTrackingID() {
  return "DF" + Math.floor(100000 + Math.random() * 900000);
}

function placeOrder() {
  currentTrackingId = generateTrackingID();

  // Default order status
  orderStatusMap[currentTrackingId] = "Ordered";

  alert("Order Placed Successfully!\nTracking ID: " + currentTrackingId);

  // Auto download invoice
  downloadInvoice();

  cart = [];
  displayCart();
  showSection('home');

  // Simulated order updates
  setTimeout(() => { orderStatusMap[currentTrackingId] = "Packed"; }, 3000);
  setTimeout(() => { orderStatusMap[currentTrackingId] = "Shipped"; }, 6000);
  setTimeout(() => { orderStatusMap[currentTrackingId] = "Out for Delivery"; }, 9000);
  setTimeout(() => { orderStatusMap[currentTrackingId] = "Delivered"; }, 12000);
}

function trackOrder() {
  const id = trackInput.value.trim();

  if (orderStatusMap[id]) {
    trackResult.innerText = "Current Status: " + orderStatusMap[id];
  } else {
    trackResult.innerText = "Invalid Tracking ID";
  }
}

function filterProducts(cat) {
  document.getElementById("productList").innerHTML = "";

  products.forEach((p, index) => {
    if (cat === "all" || p.category === cat) {
      document.getElementById("productList").innerHTML += `
<div class="col-md-4">
<div class="shop-card">
<img src="${p.img}" style="height:200px;width:100%;object-fit:cover;">
<h5 class="mt-2">${p.name}</h5>
<p>₹${p.price}</p>
<button class="btn btn-warning" onclick="addToCart(${index})">Add to Cart</button>
</div>
</div>`;
    }
  });
}

function downloadInvoice() {
  let invoice = `
Dairy Farm Invoice

Order ID : ${currentTrackingId}

Customer Order Details
-------------------------
Thank you for purchasing dairy products.

Visit Again!
`;

  let blob = new Blob([invoice], { type: "text/plain" });
  let link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "invoice.txt";
  link.click();
}

// Init
loadProducts();