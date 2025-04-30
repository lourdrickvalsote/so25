let url = 'https://api.sheety.co/e5244ebf521dd022dc295c66fdcba0a7/taekwondoTestSpreadsheet/inputScoresColorBelts';

let allRows = []; // This will store the original unfiltered data

fetch(url)
  .then(response => response.json())
  .then(json => {
    allRows = json.inputScoresColorBelts;
    console.log("Initial rows loaded:", allRows);

    renderTable(allRows);
  });

function renderTable(rows) {
  const keys = ["athleteOrder", "athleteName", "form", "judges", "score", "finalScore"];

  // Bail early if no data
  if (!rows || rows.length === 0) {
    document.getElementById("sheet-data").innerHTML = "<p>No data found.</p>";
    return;
  }

  let html = "<table><thead><tr>";

  // Create headers
  keys.forEach(key => {
    const label = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, c => c.toUpperCase())
      .replace(/\b\w/g, l => l.toUpperCase());
    html += `<th>${label}</th>`;
  });

  html += "</tr></thead><tbody>";

  // Create rows
  rows.forEach(row => {
    html += "<tr>";
    keys.forEach(key => {
      const cellValue = row[key];
      html += `<td>${cellValue != null ? cellValue : ""}</td>`;
    });
    html += "</tr>";
  });

  html += "</tbody></table>";
  document.getElementById("sheet-data").innerHTML = html;
}

// 🔍 Handle search input
document.getElementById("search-bar").addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();

  if (query === "") {
    renderTable(allRows); // Reset full table
    return;
  }

  // Filter rows that have the query in any field
  const filteredRows = allRows.filter(row =>
    Object.values(row).some(value =>
      (value != null && value.toString().toLowerCase().includes(query))
    )
  );

  renderTable(filteredRows);
});
