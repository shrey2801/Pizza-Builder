function calculateTotalQuantity() {
    let quantityElements = document.getElementsByClassName("quantity");
    let total = 0;
    for (let ele of quantityElements) {
        total += Number(ele.innerHTML);
    }
    return total;
}

function showTotalPrice() {
    let totalPrice = 0;
    for (let item in userOrder) {
        totalPrice += userOrder[item].price;
    }
    document.querySelectorAll(".total-cost").forEach(function (e) {
        e.innerHTML = totalPrice.toFixed(2) + "$";
    });
}

function reset() {
    // clear all non-default images
    document.querySelectorAll("img").forEach(function (image) {
        if (!image.classList.contains("default")) {
            image.remove();
        }
    });

    // clear the quantities back to 0
    document.querySelectorAll(".quantity").forEach(function (quantityEle) {
        quantityEle.innerHTML = 0;
    });

    // disable & enable appropriate buttons
    checkoutButton.disabled = true;
    document.querySelectorAll(".decrease").forEach(function (button) {
        button.disabled = true;
    });
    document.querySelectorAll(".increase").forEach(function (button) {
        button.disabled = false;
    });

    // reinitialize the order
    initializeOrder();

    // update the price
    showTotalPrice();
}
