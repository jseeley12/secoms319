fetch("./index.json")
    .then(response => response.json())
    .then(tools => loadMovies(tools));

function loadMovies(tools) {
    var Catalog = document.getElementById("toolHolder");

    for (var i = 0; i < tools.tool.length; i++) {
        let name = tools.tool[i].name;
        let img = tools.tool[i].img;
        let url = tools.tool[i].url;
        let price = tools.tool[i].price;
        let disc = tools.tool[i].discription;

        let toolPlace = document.createElement("div");
        toolPlace.innerHTML = `
        <div class="col">
            <div class="card shadow-sm">
                <img src="${img}" alt=${name}></img>
                <div class="card-body">
                    <p class="card-text">  <h5>${name}</h5><br><Strong> Description: </Strong> ${disc}<br><Strong> Price: </Strong> $${price} <br> <a href="${url}" class="btn btn-sm btn-outline-secondary">View</a> </p>
                </div>
            </div>
        </div>`;

        Catalog.appendChild(toolPlace);
    }



}