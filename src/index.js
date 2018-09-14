document.addEventListener('DOMContentLoaded', () => {
  const table = document.querySelector('#table-body')
  const winnerBox = document.querySelector('#winner')
  let allGroups
  let currentWinner = {}

  function getData () {
    fetch('http://localhost:3000/a_cappella_groups')
      .then(resp => resp.json())
      .then(data => {
        allGroups = data
        renderDataInTable(allGroups)
      })
  }
  getData()

  function renderDataInTable (aCapellaGroups) {
    table.innerHTML = ''
    aCapellaGroups.forEach(addGroupTo(table))
  }

  function addGroupTo (table) {
    return function (group) {
      const tableRow = document.createElement('tr')
      tableRow.innerHTML = groupAsHtml(group)
      table.append(tableRow)
    }
  }

  function groupAsHtml (group) {
    return `
    <tr id="group-${group.id}">
      <td>${group.college.name}</td>
      <td>${group.name}</td>
      <td>${group.membership}</td>
      <td>${group.college.division}</td>
      <td>
        <img src='./assets/trophy.png' data-id='${group.id}'/>
      </td>
    </tr>
    `
  }

  function insertRow (rowHtml, index) {
    // add the rowHtml as a child of the table, at index
    table.append(rowHtml)
  }
  //
  // function removeRow (index) {
  //   // remove the row Html from the table
  // }

  table.addEventListener('click', event => {
    if (event.target.src) {
      groupRow = event.target.parentNode.parentNode

      let allRows = groupRow.parentNode.children

      allRows.forEach = Array.prototype.forEach

      allRows.forEach(row => {
        if (row.style.display === 'none') {
          row.style.display = null
        }
      })
      groupRow.style.display = 'none'

      let winnerID = event.target.dataset.id

      currentWinner = allGroups.find(group => group.id === parseInt(winnerID))
      makeWinner(currentWinner)
      // if (currentWinner) {
      //   // insertRow(groupAsHtml(currentWinner), 0)
      // }
    //   let filteredGroups = allGroups.filter(group => group.id !== currentWinner.id)
    //   currentWinner = filteredGroups[
    //   [...groupRow.parentNode.children].indexOf(groupRow)
    // ]
    //   makeWinner(currentWinner)
    //   renderDataInTable(filteredGroups)
    }
  })

  function makeWinner (groupRow) {
    winnerBox.innerText = `Winner: ${groupRow.college.name} ${groupRow.name}`
  }
})

// click on trophy
// if there's a currentWinner, remove it from winner table and add it to main table
// remove that grounp's row from the table
// set currentWinner to that group
// append that group's row to the winner's table
