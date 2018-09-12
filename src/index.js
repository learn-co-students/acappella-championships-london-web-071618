document.addEventListener('DOMContentLoaded', function (event) {
  fetchData()
})

function appendGroups (groups) {
  const tableBody = document.querySelector('#table-body')
  groups.forEach(group => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
          <td>${group.college.name}</td>
          <td>${group.name}</td>
          <td>${group.membership}</td>
          <td>${group.college.division}</td>
          <td><img src='./assets/trophy.png' id='${group.id}'/></td>
      `

    tr.addEventListener('click', function () {
      const winner = document.querySelector('#winner')
      tr.remove()
      winner.innerText = 'Winner: ' + group.name
      clearGroups()
      appendGroups(groups)
    })

    tableBody.appendChild(tr)
  })
}

function clearGroups () {
  const tableBody = document.querySelector('#table-body')
  const children = [...tableBody]
  children.map(child => child.remove())
}

function fetchData () {
  fetch('http://localhost:3000/a_cappella_groups')
    .then(resp => resp.json())
    .then(groups => appendGroups(groups))
}
// fetch data
// create tr element for each object
// append to tbody

// on click, remove current winner
// append selected winner
// reappend previous winner
