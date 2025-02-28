// Fetch JSON data and populate table
fetch("films.json")
    .then(response => response.json())
    .then(films => {
        const tableBody = document.getElementById("films-table");
        films.forEach(film => {
            const row = `<tr>
                <td>${film.title}</td>
                <td>${film.release_year}</td>
                <td>${film.director}</td>
                <td>${film.box_office}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    });

// Search functionality
function filterFilms() {
    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#films-table tr");
    rows.forEach(row => {
        let title = row.cells[0].innerText.toLowerCase();
        row.style.display = title.includes(input) ? "" : "none";
    });
}

// Sorting functionality
function sortTable(n) {
    let table = document.querySelector("table");
    let rows = Array.from(table.rows).slice(1);
    let isAscending = table.getAttribute("data-sort") === "asc";
    
    rows.sort((rowA, rowB) => {
        let cellA = rowA.cells[n].innerText;
        let cellB = rowB.cells[n].innerText;
        return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    });

    table.setAttribute("data-sort", isAscending ? "desc" : "asc");
    rows.forEach(row => table.appendChild(row));
}
