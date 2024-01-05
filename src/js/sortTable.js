import data from "./data";

function renderTable(sortTuple) {
    const mainElement = document.getElementById("app");
    const table = document.createElement("table");

    const headerRow = table.insertRow();
    const headers = Object.keys(data[0]);

    headers.forEach((header) => {
        const th = document.createElement("th");
        if (header === sortTuple[0]) {
            th.classList.add(sortTuple[1]);
        }
        th.textContent = header;
        headerRow.appendChild(th);
    });

    sortData(sortTuple).forEach((rowData) => {
        const row = table.insertRow();
        headers.forEach((header) => {
            const cell = row.insertCell();
            cell.textContent = rowData[header];
        });
    });

    mainElement.innerHTML = "";
    mainElement.appendChild(table);
}

function sortData(sortTuple) {
    const sortOrder = sortTuple[1] === "up-sort" ? 1 : -1;
    return data
        .slice()
        .sort((a, b) =>
            a[sortTuple[0]] < b[sortTuple[0]] ? sortOrder : -sortOrder
        );
}

function stopSortTable(intervalId) {
    if (intervalId) {
        clearInterval(intervalId);
    }
}

function sortTable() {
    let intervalId;
    const fields = Object.keys(data[0]);
    const tuplesArray = fields.reduce((result, field) => {
        const tuple = ["up-sort", "down-sort"].map((direction) => [
            field,
            direction,
        ]);
        return result.concat(tuple);
    }, []);

    let currentIndex = 0;
    stopSortTable(intervalId);
    renderTable(tuplesArray[currentIndex]);

    intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % tuplesArray.length;
        const tuple = tuplesArray[currentIndex];

        renderTable(tuple);
    }, 20000);
    return intervalId;
}

export { sortTable, stopSortTable };
