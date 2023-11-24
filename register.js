// script.js
function submitForm() {
    // Get form data
    var formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        otherNames: document.getElementById('otherNames').value,
        gender: document.getElementById('gender').value,
        dob: document.getElementById('dob').value,
        age: document.getElementById('age').value,
        address: document.getElementById('address').value,
        rsdstate: document.getElementById('rsdstate').value,
        rsdLocalGov: document.getElementById('rsdLocalGov').value
    };

    // Call the function to save data to Google Sheets
    saveToGoogleSheets(formData);
}

function saveToGoogleSheets(formData) {
    // Google Sheets API endpoint
    var endpoint = `https://sheets.googleapis.com/v4/spreadsheets/1sU66kco61u3CXF8cYaOT-44Ze6VaYfEQ64zCOkZSaS8/values/CenData:append?key=AIzaSyC35rkQy49s1SFXfhKvtKDZ3rAqJ_hIs5w`;

    // Prepare the data for the API request
    var requestData = {
        values: [Object.values(formData)]
    };

    // Make a POST request to append data to the sheet
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data successfully appended:', data);

        // Display a success message with options
        var confirmation = confirm('Thank you! Your data has been submitted. Do you want to fill the form again?');

        if (confirmation) {
            // If the user chooses to fill the form again, you can reset the form
            document.getElementById('censusForm').reset();
        } else {
            // If the user chooses not to fill the form again, you can redirect them to the home page
            window.location.href = 'index.html';
        }
    })
    .catch(error => {
        console.error('Error appending data:', error);
        alert('An error occurred. Please try again later.')
    })
}