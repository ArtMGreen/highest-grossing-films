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
                <td>${film.country}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    });

// Search functionality
function filterFilms() {
    let input = document.getElementById("search").value.toLowerCase().trim();
    let rows = document.querySelectorAll("#films-table tr");

    rows.forEach(row => {
        let title = row.cells[0].innerText.toLowerCase().trim();
        row.style.display = title.includes(input) ? "" : "none";
    });
}

// Sorting functionality with indicator
let sortDirection = {};
function sortTable(n) {
    let table = document.querySelector("table");
    let rows = Array.from(table.rows).slice(1);
    let isAscending = !sortDirection[n];  // Toggle direction
    sortDirection[n] = isAscending;

    rows.sort((rowA, rowB) => {
        let cellA = rowA.cells[n].innerText;
        let cellB = rowB.cells[n].innerText;

        return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    });

    rows.forEach(row => table.appendChild(row));

    // Update sort indicator
    document.querySelectorAll("th span").forEach(span => span.innerText = "");
    document.querySelectorAll("th")[n].querySelector("span").innerText = isAscending ? "↑" : "↓";
}

// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    // Change icon
    if (document.body.classList.contains("dark-theme")) {
        themeIcon.innerText = "🌚";  // Dark theme
    } else {
        themeIcon.innerText = "🌞";  // Light theme
    }
});
