let url = 'https://api.sheety.co/e5244ebf521dd022dc295c66fdcba0a7/taekwondoTestSpreadsheet/inputScoresColorBelts';

fetch(url)
  .then(response => response.json())
  .then(json => {

    const rows = json.inputScoresColorBelts; // Sheety returns an object with your tab name

    let html = "<table><thead><tr>";

    // Use the keys from the first row for headers
    const keys = Object.keys(rows[0]).filter(key => key !== "id");
    keys.forEach(key => {
        // Split camelCase or lowercase keys and capitalize words
        const label = key
          .replace(/([A-Z])/g, ' $1')          // insert space before capital letters
          .replace(/^./, c => c.toUpperCase()) // capitalize first letter
          .replace(/\b\w/g, l => l.toUpperCase()); // capitalize each word
      
        html += `<th>${label}</th>`;
      });
      

    html += "</tr></thead><tbody>";

    // Now build the table body
    rows.forEach(row => {
      html += "<tr>";
      keys.forEach(key => {
        html += `<td>${row[key] ?? ""}</td>`;

      });
      html += "</tr>";
    });

    html += "</tbody></table>";
    console.log(html);
    document.getElementById("sheet-data").innerHTML = html;
  });
