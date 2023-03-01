function displayTableRows() {
  let reader = new FileReader()
  let csvInput = document.getElementById("fileUpload")

  csvInput.addEventListener("change", (event) => {
    const file = event.target.files[0];


    reader.addEventListener("load", (event) => {
      event.preventDefault
      const rawData = event.target.result
      const rows = rawData.split("\r\n")
      let formatedRawData = []
      let tableData = []

      rows.map((row) => {
        let cell = row.split(",")

        const employee = cell[0].trim()
        const productId = cell[1].trim()
        const dateFrom = new Date(cell[2].trim())
        const dateTo = cell[3].trim() === "NULL" ? new Date() : new Date(cell[3].trim())
        const timeWorkedInMs = Math.abs(dateTo.getTime() - dateFrom.getTime())
        let daysWorked = Math.ceil(timeWorkedInMs / (1000 * 3600 * 24))

        formatedRawData.push({
          employee,
          productId,
          dateFrom,
          dateTo,
          daysWorked
        })

      })

      formatedRawData.map((item) => {
        const eventualPair = formatedRawData.filter((x) => x.productId === item.productId)
        const pairs = eventualPair.length > 1 ? eventualPair : []

        if (pairs.length > 0 && tableData.findIndex(x => x.productId === item.productId) < 0) {

          tableData.push({
            productId: item.productId,
            firstEmployee: pairs[0].employee,
            secondEmployee: pairs[1].employee,
            daysWorked: pairs[0].daysWorked + pairs[1].daysWorked
          })
        }

      })

      renderTableHead()
      renderTableRows(tableData)
    })

    reader.readAsText(file)
  })
}

function renderTableHead() {
  const thRow = document.createElement('tr')

  const firstEmployeeTh = document.createElement('th')
  firstEmployeeTh.innerHTML = "Employee ID #1"
  const secondEmployeeTh = document.createElement('th')
  secondEmployeeTh.innerHTML = "Employee ID #2"
  const productIdTh = document.createElement('th')
  productIdTh.innerHTML = "Product ID"
  const daysWorkedTh = document.createElement('th')
  daysWorkedTh.innerHTML = "Days worked"

  thRow.appendChild(firstEmployeeTh)
  thRow.appendChild(secondEmployeeTh)
  thRow.appendChild(productIdTh)
  thRow.appendChild(daysWorkedTh)

  thead.appendChild(thRow)
}

function renderTableRows(rows) {
  rows.forEach((item) => {
    const tr = document.createElement("tr")

    const firstEmployeeCell = document.createElement('td')
    firstEmployeeCell.innerHTML = item.firstEmployee

    const secondEmployeeCell = document.createElement('td')
    secondEmployeeCell.innerHTML = item.secondEmployee

    const productIdCell = document.createElement('td')
    productIdCell.innerHTML = item.productId

    const daysWorkedCell = document.createElement('td')
    daysWorkedCell.innerHTML = item.daysWorked

    tr.appendChild(firstEmployeeCell)
    tr.appendChild(secondEmployeeCell)
    tr.appendChild(productIdCell)
    tr.appendChild(daysWorkedCell)

    tbody.appendChild(tr)
  })
}