const toppingsArr = [
    ["Vegitable", 4],
    ["jalapeno", 5],
    ["mozzarella", 8],
    ["sauce", 4],
    ["Extra", 9],
    ["onion", 3],
    ["capsicum", 1]
]

const toppings = new Map(toppingsArr);
let list = document.getElementsByTagName("ul")[0];

// initialize default user order list
let userOrder = {};
function initializeOrder() {
    toppingsArr.forEach(function (item) {
        userOrder[item[0]]= {
            quantity: 0,
            price: 0
        };
    });
}
initializeOrder();

// default item in user order
userOrder["Pizza Base"] = {
    quantity: 1,
    price: 3
}

function createItems(items) {
    items.forEach(function (price, item) {
        let listItem = document.createElement("li");

        // name and cost on the left of the each list item
        let leftDivElement = document.createElement("div");
        leftDivElement.classList.add("left");

        // create a span for the name and p for the cost
        let nameElement = document.createElement("span");
        nameElement.appendChild(document.createTextNode(item));
        let costElement = document.createElement("p");
        costElement.classList.add("cost");
        costElement.appendChild(document.createTextNode(`${price}$`));

        leftDivElement.appendChild(nameElement);
        leftDivElement.appendChild(costElement);

        listItem.appendChild(leftDivElement);

        // right section of list item for increasing and decreasing quantities
        let rightDivElement = document.createElement("div");
        rightDivElement.classList.add("right");

        // buttons to increase and decrease and a span showing quantity
        let quantityElement = document.createElement("span");
        quantityElement.classList.add("quantity")
        // default quantity of 0
        quantityElement.appendChild(document.createTextNode(0));

        let increaseButton = document.createElement("button");
        increaseButton.appendChild(document.createTextNode("+"));
        increaseButton.classList.add("increase");
        increaseButton.classList.add("small-btn");

        increaseButton.addEventListener("click", function () {
            let totalQuantity = calculateTotalQuantity();
            let toppingQuantity = Number(quantityElement.innerHTML);
            if (totalQuantity < 10 && toppingQuantity >= 0) {
                if (toppingQuantity < 2) {
                    decreaseButton.disabled = false;
                    quantityElement.innerHTML = ++toppingQuantity;

                    // insert the image
                    let imgElement = document.createElement("img");
                    let imgName = item.toLowerCase().split(" ").join("-");
                    imgElement.classList.add(imgName);
                    let imgLoc = "image/" + imgName;
                    imgElement.setAttribute("src", imgLoc);
                    document.getElementsByTagName("body")[0].appendChild(imgElement);

                    // update totalQuantity
                    totalQuantity++;

                    // update the order
                    userOrder[item].quantity = toppingQuantity;
                    userOrder[item].price += price;

                    // if topping quantity updates to 2 disable the button
                    if (toppingQuantity === 2) {
                        increaseButton.disabled = true;
                    }

                    // change the total price
                    showTotalPrice();
                } else {
                    alert(`Cannot add more than 2 toppings for ${item} topping!`);
                }
            } else {
                alert("Cannot add more than 10 toppings!")
            }

            // enable checkouts if at least 1 topping selected
            if(totalQuantity > 0) {
                checkoutButton.disabled = false;
            }
        });

        let decreaseButton = document.createElement("button");
        decreaseButton.appendChild(document.createTextNode("-"));
        decreaseButton.classList.add("decrease");
        decreaseButton.classList.add("small-btn");
        // by default, decreaseButton should be disabled
        decreaseButton.disabled = true;

        decreaseButton.addEventListener("click", function () {
            let toppingQuantity = Number(quantityElement.innerHTML);
            if (toppingQuantity > 0) {
                quantityElement.innerHTML = --toppingQuantity;

                // remove the image
                let imgName = item.toLowerCase().split(" ").join("-");
                document.getElementsByClassName(imgName)[0].remove();

                // update user order
                userOrder[item].quantity = toppingQuantity;
                userOrder[item].price -= price;

                // change the total price
                showTotalPrice();
            }

            // enable increaseButton if toppings less than 2 and disable decreaseButton if toppings are 0
            if (toppingQuantity < 2) {
                increaseButton.disabled = false;
                if (toppingQuantity === 0) {
                    decreaseButton.disabled = true;
                }
            }

            // disable checkouts if no toppings
            if (calculateTotalQuantity() === 0) {
                checkoutButton.disabled = true;
            }
        });

        rightDivElement.appendChild(decreaseButton);
        rightDivElement.appendChild(quantityElement);
        rightDivElement.appendChild(increaseButton);

        listItem.appendChild(leftDivElement);
        listItem.appendChild(rightDivElement);

        list.appendChild(listItem);
    });
}

createItems(toppings);

// add list item showing total cost
let listItem = document.createElement("li");
let totalText = document.createElement("span");
totalText.classList.add("left");
totalText.innerHTML = "Total";

listItem.appendChild(totalText);

let costEle = document.createElement("span");
costEle.innerHTML = "cost";
costEle.classList.add("total-cost");
costEle.classList.add("right");
listItem.appendChild(costEle);
list.appendChild(listItem)

// add checkout button at last
let checkoutItem = document.createElement("li");
let checkoutButton = document.createElement("button");
checkoutButton.classList.add("blue-btn");
checkoutButton.id = "checkout-btn";
checkoutButton.disabled = true;
checkoutButton.innerHTML = "Checkout";
checkoutItem.appendChild(checkoutButton);
list.appendChild(checkoutItem);

// show total price for the first time
showTotalPrice();

document.getElementById("reset-btn").addEventListener("click", reset);
