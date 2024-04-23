var request = new XMLHttpRequest();
request.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
);
request.send();
request.onload = function () {
  var result = JSON.parse(request.response);

  var heading = document.createElement("h1");
  heading.innerText = "Pagination in DOM Manipulation";
  heading.id = "title";

  var para = document.createElement("p");
  para.innerText =
    "Here In this page a table is use to display a Persions Name and Email Id by fetching the data from the API";
  para.id = "description";
  document.body.append(heading, para);

  var itemsPerPage = 10; // Number of items to display per page
  var currentPage = 1; // Current page

  function displayData(page) {
    var startIndex = (page - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var paginatedData = result.slice(startIndex, endIndex);

    var table = document.createElement("table");
    table.className = "table table-bordered";

    var thead = document.createElement("thead");
    thead.className = "thead";

    function create_tr() {
      var tr = document.createElement("tr");
      tr.className = " table-bordered";
      return tr;
    }

    function create_th(content) {
      var th = document.createElement("th");
      th.className = " table-bordered";
      th.innerHTML = content;
      return th;
    }

    var thead_tr = create_tr();

    var th1 = create_th("Id");
    var th2 = create_th("Name");
    var th3 = create_th("Email");

    thead_tr.append(th1, th2, th3);
    thead.append(thead_tr);
    table.append(thead);

    var tbody = document.createElement("tbody");

    function create_td(content) {
      var td = document.createElement("td");
      td.className = " table-bordered";
      td.innerHTML = content;
      return td;
    }

    paginatedData.forEach(function (item) {
      var tbody_tr1 = create_tr();

      var td1 = create_td(item.id);
      var td2 = create_td(item.name);
      var td3 = create_td(item.email);

      tbody_tr1.append(td1, td2, td3);
      tbody.append(tbody_tr1);
    });

    table.append(tbody);

    var tableContainer = document.createElement("div");
    tableContainer.className = "table-responsive";
    tableContainer.appendChild(table);

    document.body.appendChild(tableContainer);
  }

  // Function to handle pagination
  function navigateToPage(page) {
    // Clear existing table
    var existingTable = document.querySelector("table");
    if (existingTable) {
      existingTable.remove();
    }
    // Display data for the selected page
    displayData(page);
  }

  // Create pagination buttons
  var totalPages = Math.ceil(result.length / itemsPerPage);
  var container = document.createElement("div");
  container.className = "container";

  var row = document.createElement("div");
  row.className = "row";
  var col = document.createElement("div");
  col.className = "col-12 d-flex justify-content-center align-items-center";
  for (var i = 1; i <= totalPages; i++) {
    var button = document.createElement("div");
    button.id = "buttons";
    button.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "btn",
      "btn-outline-info"
    );
    button.innerText = i;
    button.addEventListener("click", function () {
      var pageNum = parseInt(this.innerText);
      navigateToPage(pageNum);
    });
    col.append(button);
    // container.append(button);
  }

  // Append pagination buttons before displaying the table
  row.append(col);
  container.append(row);
  document.body.append(container);

  // Display first page by default
  displayData(currentPage);
};
