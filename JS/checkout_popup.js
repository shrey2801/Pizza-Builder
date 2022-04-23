let popupDialog;

checkoutButton.addEventListener("click", function () {
    // create a dialog
    popupDialog = document.createElement("dialog");
    // prepare a table
    let tableElement = document.createElement("table");
    let headRow = document.createElement("tr");
    ["Item", "Quantity", "Price"].forEach(function (value) {
        let cell = document.createElement("th");
        cell.innerHTML = value;
        headRow.appendChild(cell);
    });
    tableElement.appendChild(headRow);
    // add rest of the rows
    for (let item in userOrder) {
        let quantity = userOrder[item].quantity;
        // add row for only selected toppings
        if (quantity !== 0) {
            let price = userOrder[item].price.toFixed(2) + "$";
            let row = document.createElement("tr");
            [item, quantity, price].forEach(function (value) {
                let cell = document.createElement("td");
                cell.innerHTML = value;
                row.appendChild(cell);
            });
        tableElement.appendChild(row);
        }
    }
    popupDialog.appendChild(tableElement);

    // add total
    let totalElement = document.createElement("p");
    totalElement.classList.add("total-cost");
    totalElement.innerHTML = "Total Price: " + document.querySelectorAll(".total-cost")[0].innerHTML;
    popupDialog.appendChild(totalElement);

    // add a close button
    let closeBtn = document.createElement("button");
    closeBtn.innerHTML = "Ok";
    closeBtn.style.float = "right";

    // if the user clicks on button
    closeBtn.addEventListener("click", function () {
        popupDialog.close();
        popupDialog.remove();
    });

    popupDialog.appendChild(closeBtn);
    document.getElementsByTagName("body")[0].appendChild(popupDialog);
    // show the popup after table is prepared
    popupDialog.showModal();

});

// if the user presses escape key instead of the close button
document.body.addEventListener("keyup" , function (e) {
    if (e.key === "Escape") {
        popupDialog.remove();
    }
})
