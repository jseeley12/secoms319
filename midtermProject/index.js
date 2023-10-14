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
            <div class="card shadow-sm" id="cards">
                <img src="${img}" alt=${name}></img>
                <div class="card-body" id="cardtoo">
                    <p class="card-text"> <h5><Strong>${name}</Strong></h5><br></p>
                </div>
            </div>
        </div>`;
        Catalog.appendChild(toolPlace);

        let toolPlace2 = document.createElement("div");
        toolPlace2.innerHTML = `
        <div id="smaller"><p><Strong> Description: </Strong> ${disc}<br><Strong> Price: </Strong> $${price} <br> <a href="${url}" class="btn btn-sm btn-outline-secondary">View</a> </p></div>
        `;
        
        toolPlace.childNodes[1].childNodes[1].childNodes[3].appendChild(toolPlace2);

        // var toggleButton3 = document.getElementById('cards');
        // var card3 = document.getElementById('smaller');
        var collapsableCard3 = new bootstrap.Collapse(toolPlace2, { toggle: true });
        toolPlace.addEventListener('click', function () {
            collapsableCard3.toggle();
            console.log("hi!")
        });
    }
}