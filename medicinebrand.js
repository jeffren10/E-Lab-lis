let allMedicines = [];

// Fetch the medicines from the API and store them
function fetchMedicines() {
fetch('https://cliniqueplushealthcare.com.ng/prescriptions/drug_class')
.then(response => response.json())
.then(data => {
// Store all medicines in an array for later use
allMedicines = data;
populateMedicineList(allMedicines);
})
.catch(error => console.error('Error fetching data:', error));
}

// Call the function to fetch the medicines once the page loads
document.addEventListener("DOMContentLoaded", fetchMedicines);              

// Populate the dropdown list with all available medicines
function populateMedicineList(medicineData) {
const medicineList = document.getElementById('medicineList');
medicineList.innerHTML = ''; // Clear any existing list items

medicineData.forEach((medicine) => {
const li = document.createElement('li');
li.textContent = medicine.name;
li.onclick = function() {
document.getElementById('medicineSearch').value = medicine.name;
medicineList.style.display = 'none';  // Hide the dropdown after selecting
};
medicineList.appendChild(li);
});
}

// Show the full list when the user focuses on the input field
function showAllMedicines() {
const medicineList = document.getElementById('medicineList');
medicineList.style.display = 'block';  // Show the dropdown list
}

// Filter the dropdown list as the user types in the search box
function filterMedicineList() {
const query = document.getElementById('medicineSearch').value.toLowerCase();
const filteredMedicines = allMedicines.filter(med => med.name.toLowerCase().includes(query));
populateMedicineList(filteredMedicines);  // Update the list with filtered results
}


function addMedicine() {
const medicineName = document.getElementById('medicineSearch').value;
const interval = document.getElementById('interval').value;
const instruction = document.getElementById('instruction').value;
const duration = document.getElementById('duration').value;

if (!medicineName || !interval || !instruction || !duration) {
alert("Please fill in all fields.");
return;
}

let table = document.querySelector("table");
let newRow = table.insertRow(); // Insert a new row at the end of the table

// Insert cells in the new row and fill them with the data
newRow.innerHTML = `
<td>${table.rows.length - 1}</td>
<td>${medicineName}</td>
<td>${interval}</td>
<td>${instruction}</td>
<td>${duration}</td>
<td><button class="btn" style="background-color: #aa2f2f;" onclick="removeMedicine(this)">Remove</button></td>
`;
}

// Function to remove the row when the "Remove" button is clicked
function removeMedicine(button) {
// Find the row that contains the clicked button
const row = button.parentNode.parentNode;
// Remove the row from the table
row.parentNode.removeChild(row);
}
