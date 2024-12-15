var row = document.querySelector(".row")
var links = document.querySelectorAll(".nav-link")
var searchinput = document.querySelector("#searchinput")
var select = document.querySelector("select")
var search = document.querySelector(".btn-outline-warning")
var louding = document.querySelector("#louding");
var contianer = document.querySelectorAll(".container-fluid")[1]
var modal = document.querySelector(".modal")
var modal_body = document.querySelector(".modal-body")
var close = document.querySelectorAll("#close")
for (var i = 0; i < close.length; i++){
    close[i].addEventListener("click", function () {
        modal_body.innerHTML=""
        modal.classList.remove("d-block")
    })
}
contianer.addEventListener("click", function (e) {
    if (e.target.parentElement.lastElementChild.innerHTML.startsWith("id")){
        getrecipe(e.target.parentElement.lastElementChild.innerHTML.split(" ")[1])
        modal.classList.add("d-block")
    } else if (e.target.lastElementChild.innerHTML.startsWith("id")) {
        getrecipe(e.target.lastElementChild.innerHTML.split(" ")[1])
        modal.classList.add("d-block")
    }
})

async function getrecipe(recipe) {
    var req = await fetch("https://forkify-api.herokuapp.com/api/get?rId=" + recipe)
    var component = await req.json()
    var arr = component.recipe.ingredients;
    var img = document.createElement("img")
    img.src = component.recipe.image_url
    img.style.width = "100%"
    img.style.height= "200px"
    var publisher = document.createElement("h3");
    publisher.innerHTML = component.recipe.publisher
    modal_body.appendChild(img)
    modal_body.appendChild(publisher)
    var list = document.createElement("ol")
    for (var i = 0; i < arr.length; i++){
        var li = document.createElement("li")
        li.innerHTML = arr[i];
        list.appendChild(li)
    }
    modal_body.appendChild(list)
}
function renderByName() {
    str=``
    for (var i = 0; i < allData.length; i++){
        if (searchinput.value == allData[i].title) {
            str+=`<div class="col-lg-3 col-md-4">
    <div class="card border-0 shadow h-100" role="button">
        <img src="${allData[i].image_url}" class="" alt="...">
          <h5 class="card-title mt-2 ms-2">${allData[i].title}</h5>
          <p class="ms-2">publisher: ${allData[i].publisher}</p>
          <p class="ms-2">rank: ${allData[i].social_rank}</p>
          <p class="ms-2">id: ${allData[i].recipe_id}</p>
      </div>
</div>`
        }
    }
    row.innerHTML = str;
}
search.addEventListener("click", function () {
    if (searchinput.value == "") {
        alldata(select.value,renderdata,louding)
    } else {
        alldata(select.value,renderByName,louding)
    }
})

var allData = [];
for (var i = 0; i < links.length; i++){
    links[i].addEventListener("click",function (e) {
        alldata(e.target.innerHTML,renderdata,louding)
    })
}
async function getData(type) {
    var req = await fetch("https://forkify-api.herokuapp.com/api/search?q=" + type) 
    var data = await req.json();
    allData = data.recipes
}
function renderdata() {
    str = ``
    for (var i = 0; i < allData.length; i++){
        str+=`<div class="col-lg-3 col-md-4">
    <div class="card border-0 shadow h-100" role="button">
        <img src="${allData[i].image_url}" class="" alt="...">
          <h5 class="card-title mt-2 ms-2">${allData[i].title}</h5>
          <p class="ms-2">publisher: ${allData[i].publisher}</p>
          <p class="ms-2">rank: ${allData[i].social_rank}</p>
          <p class="ms-2">id: ${allData[i].recipe_id}</p>
      </div>
</div>`
    }
    row.innerHTML = str;
}

async function alldata(k, x,y) {
    y.classList.remove("d-none")
    await getData(k)
    x()
    y.classList.add("d-none")
}
alldata("pizza",renderdata,louding)