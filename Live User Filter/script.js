// Grab the elements
const result = document.getElementById("result");
const filter = document.getElementById("filter");
const listItems = [];

// API request
getData();

filter.addEventListener("input", (e) => filterData(e.target.value));

async function getData() {
  // Fetch from the API
  const res = await fetch("https://randomuser.me/api?results=50");

  // Store data into a JSON object
  const { results } = await res.json();

  // Clear result
  result.innerHTML = "";

  // Create a list of users that match the filter
  results.forEach((user) => {
    const li = document.createElement("li");

    listItems.push(li);

    li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>
        `;

    result.appendChild(li);
  });
}

// Search function from input field
function filterData(searchTerm) {
  listItems.forEach((item) => {
    // If the search term is found, unhide the user
    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}
