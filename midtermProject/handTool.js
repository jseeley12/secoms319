fetch("./data1.json")
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
            <div class="card shadow-sm" id="cards" style="background-color: lightgrey;">
                <img src="${img}" alt=${name}></img>
                <div class="card-body" id="cardtoo">
                    <p class="card-text"> <h5><Strong>${name}</Strong></h5><br></p>
                    <div id="smaller" style="display: none"><p><Strong> Description: </Strong> ${disc}<br><Strong><span style="font-size: 20px;"> Price: </span></Strong><span style="font-size: 20px;"> $${price} </span><br><br> <a href="${url}" class="btn btn-md btn-outline-secondary">View</a> </p></div>
                </div>
            </div>
        </div>`;

        Catalog.appendChild(toolPlace);

        Catalog.appendChild(toolPlace);

        toolPlace.addEventListener("mouseenter", function() {
            var content1 = toolPlace.childNodes[1].childNodes[1].childNodes[3].childNodes[6];
            content1.style.display = "block";
        });
        toolPlace.addEventListener("mouseleave", function() {
            var content1 = toolPlace.childNodes[1].childNodes[1].childNodes[3].childNodes[6];
            content1.style.display = "none";
        });
    }
}
