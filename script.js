let expenses = JSON.parse(localStorage.getItem("vault_data")) || [];

const totalAmountElm = document.querySelector(".total span");

const addBtn = document.querySelector(".add-btn");
const showList = document.querySelector(".expense-list");

const display = () => {
  let total = 0;
  showList.innerHTML = "";
  expenses.forEach((item, index) => {
    total += item.amount;
    const li = document.createElement("li");
    li.innerHTML = `
  <div>
  <strong> ${item.name}</strong> ${
      item.hadtax ? "<span> prank tax added!! </span> " : ""
    }
  </div>
  <div> $ ${item.amount} 
  <button class="delete-btn" onclick="deleteItem(${index})">X</button></div>
  `;
    showList.appendChild(li);
  });

  totalAmountElm.innerText = total;
  localStorage.setItem("vault_data", JSON.stringify(expenses));
};

const buttonAction = () => {
  const itemName = document.querySelector(".itemname");
  const itemAmount = document.querySelector(".amount");

  const name = itemName.value;
  const amount = parseFloat(itemAmount.value);

  if (name === "" || amount === "") {
    alert("required field cannot be empty ");
    return;
  }

  let finalAmount = amount;
  let hadtax = false;
  const random = randomNumber();

  if (random > 0) {
    finalAmount += random;
    hadtax = true;
  }

  const newItem = {
    name: name,
    amount: finalAmount,
    hadtax: hadtax,
  };

  expenses.push(newItem);

  display();

  itemName.value = "";
  itemAmount.value = "";
};

const randomNumber = () => {
  const randNum = Math.floor(Math.random() * 10);

  return randNum < 4 ? randNum : 0;
};

window.deleteItem = (index) => {
  expenses.splice(index, 1);
  display();
};

const clrBtn = document.querySelector(".btnclear");
clrBtn.addEventListener("click", () => {
  if (confirm("Empty the vault?")) {
    expenses = [];
    display();
  }
});

addBtn.addEventListener("click", buttonAction);

display();
