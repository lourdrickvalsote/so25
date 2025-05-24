// 1. Configure PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js';

const url       = '../Poomsae-schedule-2025.pdf';    // ← update to your PDF URL
const canvas    = document.getElementById('pdf-canvas');
const ctx       = canvas.getContext('2d');
const searchBar = document.getElementById('search-bar');
const resultsEl = document.getElementById('results');

let pdfDoc, pagesText = [];

// 2. Load PDF and extract text for every page
pdfjsLib.getDocument(url).promise.then(doc => {
  pdfDoc = doc;
  const loads = [];
  for (let i = 1; i <= pdfDoc.numPages; i++) {
    loads.push(
      pdfDoc.getPage(i).then(page =>
        page.getTextContent().then(tc => {
          pagesText[i] = tc.items.map(it => it.str).join(' ');
        })
      )
    );
  }
  return Promise.all(loads);
}).then(() => {
  // automatically render page 1 initially if you like:
  renderPage(1);
});

// 3. Render one page (for preview or upon click)
function renderPage(num) {
  pdfDoc.getPage(num).then(page => {
    const vp = page.getViewport({ scale: 1.5 });
    canvas.width  = vp.width;
    canvas.height = vp.height;
    page.render({ canvasContext: ctx, viewport: vp });
  });
}

// 4. Wire up search
searchBar.addEventListener('input', () => {
  const q = searchBar.value.trim().toLowerCase();
  resultsEl.innerHTML = '';
  if (!q) return;
  
  pagesText.forEach((text, pageNum) => {
    if (!text) return; // skip undefined index 0
    const idx = text.toLowerCase().indexOf(q);
    if (idx !== -1) {
      // show snippet + page link
      const snippet = text.substr(Math.max(0, idx-30), q.length+60).replace(/\s+/g,' ');
      const li = document.createElement('li');
      li.innerHTML = `Page ${pageNum}: …${snippet}…`;
      li.style.cursor = 'pointer';
      li.onclick = () => renderPage(pageNum);
      resultsEl.appendChild(li);
    }
  });
});
