let salesData = [];
let totalProductsSold = 0;
let totalProfit = 0;

function addSale() {
    const productNameInput = document.getElementById("productName");
    const buyPriceInput = document.getElementById("buyPrice");
    const sellPriceInput = document.getElementById("sellPrice");
    const sellingDateInput = document.getElementById("sellingDate");
    const deliveredCheckbox = document.getElementById("delivered");
    const salesList = document.getElementById("salesList");
    const totalProductsSoldSpan = document.getElementById("totalProductsSold");
    const totalProfitSpan = document.getElementById("totalProfit");

    if (productNameInput.value.trim() !== "") {
        const detailsDiv = document.createElement("div");
        const productName = productNameInput.value;
        const buyPrice = parseFloat(buyPriceInput.value);
        const sellPrice = parseFloat(sellPriceInput.value);
        const sellingDate = sellingDateInput.value;
        const isDelivered = deliveredCheckbox.checked;

        if (!isNaN(buyPrice) && !isNaN(sellPrice)) {
            const profit = sellPrice - buyPrice;

            detailsDiv.innerHTML = `<strong>${productName}</strong><br>
                                    Buy Price: ${buyPrice}<br>
                                    Sell Price: ${sellPrice}<br>
                                    Profit: ${profit}<br>
                                    Selling Date: ${sellingDate}<br>
                                    Delivered: ${isDelivered ? 'Yes' : 'No'}`;

            // Update total values
            totalProductsSold++;
            totalProfit += profit;

            totalProductsSoldSpan.innerText = totalProductsSold;
            totalProfitSpan.innerText = totalProfit;

            // Add sale to salesData array
            salesData.push({
                productName: productName,
                buyPrice: buyPrice,
                sellPrice: sellPrice,
                profit: profit,
                sellingDate: sellingDate,
                delivered: isDelivered
            });

            // Clear input fields and checkbox
            productNameInput.value = "";
            buyPriceInput.value = "";
            sellPriceInput.value = "";
            sellingDateInput.value = "";
            deliveredCheckbox.checked = false;

            // Update sales list
            updateSalesList();
        } else {
            alert("Please enter valid numeric values for Buy Price and Sell Price.");
        }
    }
}

function updateSalesList() {
    const salesList = document.getElementById("salesList");
    salesList.innerHTML = "";

    for (let i = 0; i < salesData.length; i++) {
        const sale = salesData[i];
        const li = document.createElement("li");
        const detailsDiv = document.createElement("div");

        detailsDiv.innerHTML = `<strong>${sale.productName}</strong><br>
                                Buy Price: ${sale.buyPrice}<br>
                                Sell Price: ${sale.sellPrice}<br>
                                Profit: ${sale.profit}<br>
                                Selling Date: ${sale.sellingDate}<br>
                                Delivered: <input type="checkbox" id="delivered${i}" ${sale.delivered ? 'checked' : ''} onclick="updateDeliveryStatus(${i})">`;
        li.appendChild(detailsDiv);

        salesList.appendChild(li);
    }
}

function updateDeliveryStatus(index) {
    const deliveredCheckbox = document.getElementById(`delivered${index}`);
    salesData[index].delivered = deliveredCheckbox.checked;
}

function updateFilterInput() {
    const filterOption = document.getElementById("filterOption").value;
    const filterInput = document.getElementById("filterInput");

    filterInput.innerHTML = "";

    if (filterOption === "date" || filterOption === "month") {
        const label = document.createElement("label");
        label.setAttribute("for", "filterDate");
        label.textContent = "Select Date:";
        filterInput.appendChild(label);

        const input = document.createElement("input");
        input.setAttribute("type", "date");
        input.setAttribute("id", "filterDate");
        filterInput.appendChild(input);
    } else if (filterOption === "year") {
        const label = document.createElement("label");
        label.setAttribute("for", "filterYear");
        label.textContent = "Select Year:";
        filterInput.appendChild(label);

        const input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("id", "filterYear");
        input.setAttribute("placeholder", "Enter year");
        filterInput.appendChild(input);
    }
}

function filterSales() {
    const filterOption = document.getElementById("filterOption").value;
    const filterDateInput = document.getElementById("filterDate");
    const filterYearInput = document.getElementById("filterYear");

    let filteredSales = [];

    switch (filterOption) {
        case 'date':
            const selectedDate = filterDateInput.value;
            filteredSales = salesData.filter(sale => sale.sellingDate === selectedDate);
            break;
        case 'month':
            const selectedMonth = filterDateInput.value.substring(0, 7); // Extract YYYY-MM from the date
            filteredSales = salesData.filter(sale => sale.sellingDate.startsWith(selectedMonth));
            break;
        case 'year':
            const selectedYear = filterYearInput.value;
            filteredSales = salesData.filter(sale => sale.sellingDate.startsWith(selectedYear));
            break;
        default:
            alert("Invalid filter option.");
            break;
    }

    const totalProductsSoldSpan = document.getElementById("totalProductsSold");
    const totalProfitSpan = document.getElementById("totalProfit");

    if (filteredSales.length > 0) {
        const filteredTotalProductsSold = filteredSales.length;
        const filteredTotalProfit = filteredSales.reduce((sum, sale) => sum + sale.profit, 0);

        totalProductsSoldSpan.innerText = filteredTotalProductsSold; totalProfitSpan.innerText = filteredTotalProfit;updateFilteredSalesList(filteredSales);
} else {
    alert("No sales found for the selected filter.");
    totalProductsSoldSpan.innerText = totalProductsSold;
    totalProfitSpan.innerText = totalProfit;
    updateSalesList();
}}function updateFilteredSalesList(filteredSales) { const salesList = document.getElementById("salesList"); salesList.innerHTML = "";for (const sale of filteredSales) {
    const li = document.createElement("li");
    const detailsDiv = document.createElement("div");

    detailsDiv.innerHTML = `<strong>${sale.productName}</strong><br>
                            Buy Price: ${sale.buyPrice}<br>
                            Sell Price: ${sale.sellPrice}<br>
                            Profit: ${sale.profit}<br>
                            Selling Date: ${sale.sellingDate}<br>
                            Delivered: <input type="checkbox" disabled ${sale.delivered ? 'checked' : ''}>`;
    li.appendChild(detailsDiv);

    salesList.appendChild(li);
}}
// Attach event listeners
const filterOption = document.getElementById("filterOption"); if (filterOption){ filterOption.addEventListener("change", updateFilterInput); 
}
const addSaleButton = document.getElementById("addSaleButton"); if (addSaleButton) { addSaleButton.addEventListener("click", addSale); 
}
const filterSalesButton = document.getElementById("filterSalesButton"); 
if (filterSalesButton) { filterSalesButton.addEventListener("click", filterSales); }