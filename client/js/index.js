document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

// Add Name to Database

const addBtn = document.querySelector('#add-name-btn');
// const deleteBTn = document.querySelector('#delete-row-btn');

addBtn.onclick = function () {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";
    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name : name})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']))
    .then(data => loadHTMLTable(data['data']));

    ;
}

/*function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');
    
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dataAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `${data[key]}`;
        }
    }

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}
*/


function loadHTMLTable(data)
{
    const table = document.querySelector('#resume');
    if (data.length == 0)
    {
        table.innerHTML = "<p class='no-data'>No Data</p>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({id, position, dates, company, location, description})
    {
        tableHtml +=`<p id="position" class="resume-details-${id}">${position}</p>`;
        tableHtml +=`<p id="dates" class="resume-details-${id}">${dates}</p><br>`;
        tableHtml +=`<p id="company" class="resume-details-${id}">${company}</p>`;
        tableHtml +=`<p id="location" class="resume-details-${id}">${location}</p><br>`;
        tableHtml +=`<p id="description" class="resume-details-${id}">${description}</p><br>`;


    });

    table.innerHTML = tableHtml;
}
