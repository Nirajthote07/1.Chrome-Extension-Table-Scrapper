let scrapeDatas = document.getElementById("scrapeData");

scrapeDatas.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: scrapeTableFromPage,
  });
});

function scrapeTableFromPage() {
  const table = document.querySelectorAll("table")[0];

  if (table == null) {
    alert("No table found");
    return;
  } else {
    console.log("table", table);

    var sourceData = "data:text/csv;charset=utf-8,";
    var i = 0;
    while ((row = table.rows[i])) {
      let rowData = [];

      for (let j = 0; j < row.cells.length; j++) {
        rowData.push(row.cells[j].innerText);
      }

      sourceData += rowData.join(",") + "\n";
      i++;
    }
    window.location.href = encodeURI(sourceData);
  }
}
