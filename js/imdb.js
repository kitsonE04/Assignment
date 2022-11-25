const showResultList = document.querySelector('#showResults');
const actorResultList = document.querySelector('#actorResults');
const searchResultList = document.querySelector('#searchResults');
const showUrl = 'https://api.tvmaze.com/shows';
const actorsUrl = 'https://api.tvmaze.com/people?page=1&api-key=';


function getSeasons(){
    const queryStr = seasonUrl;
    const usp = new URLSearchParams(queryStr);


    const showID = usp.get('id');
    const showName = usp.get('name');

    console.log(`id = ${showID} name = ${showName}`)

    console.log(usp.toString())
}


fetch(showUrl)
    .then((response) => response.json())
    .then((data) => {
        // This is now a normal function
        data.forEach(function (value) {
            console.log(value);
            const showElement = `
            <div class="col-md-12">
                <div class="card bg-dark mb-4">
                    <div class="card-body" onclick=" seasonUrl= 'id=${value.id}&name=${value.name}'; getSeasons() ;"> 
                        <div class="container">
                            <h1 class="card-title" style="color:white;">${value.name}</h1>
                            <div class="container"></div>
                            <div class="row">
                            <div class="col-2">
                            <a target="_blank"><img alt="back-image" class="rounded mt-4" src="${value.image.medium}"></a>
                            </div>
                            <div class="col-6">
                                <p class="card-text">${value.summary}</p>
                            </div>
                            <div class="col-4" style="color:white">
                                <div class="text-bg-danger rounded p-3">
                                <h4 class="card-text" bg-black>
                                <div class="row mb-2">Rating: ${value.rating.average}/10</div>
                                <div class="row mb-2">Genre: ${value.genres}</div>
                                <div class="row mb-2">Status: ${value.status}</div>
                                <div class="row mb-2">Runtime: ${value.averageRuntime} minutes</div>
                                </h4></div>
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>`;
            showResultList.insertAdjacentHTML('beforeend', showElement);
        });
    });
    
    fetch(actorsUrl)
        .then((response) => response.json())
        .then((data) => {
            // This is now a normal function
            data.forEach(function (value) {
                console.log(value);
                const actorElement = `
                <div class="col-md-4">
                    <div class="card bg-dark mb-4"><div class="card-body">
                    <h5 class="card-title" style="color:white;">${value.name}</h5>
                    <a href="results.html">
                    <img alt="back-image" class="rounded" src="${value.image.medium}">
                    </div></div></div>`;
                actorResultList.insertAdjacentHTML('beforeend', actorElement);
            });
        });



const searchShow = (event) => {
    event.preventDefault();
    const keyword = document.querySelector('#keywords').value;
    const url = 'https://api.tvmaze.com/search/shows?q=' + keyword;
    searchResultList.innerHTML = '';
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(function (value) {
                console.log(value);
                const searchElement = `<div class="col-md-12">
                <div class="card bg-dark mb-4">
                    <div class="card-body"> 
                        <div class="container">
                            <h1 class="card-title" style="color:white;">${value.show.name}</h1>
                            <div class="container"></div>
                            <div class="row">
                            <div class="col-2">
                            <a target="_blank"><img alt="back-image" class="rounded mt-4" src="${value.show.image.medium}"></a>
                            </div>
                            <div class="col-6">
                                <p class="card-text">${value.show.summary}</p>
                            </div>
                            <div class="col-4" style="color:white">
                                <div class="text-bg-danger rounded p-3">
                                <h3 class="card-text" bg-black>
                                <div class="row mb-2">Rating: ${value.show.rating.average}/10</div>
                                <div class="row mb-2">Genre: ${value.show.genres}</div>
                                <div class="row mb-2">Status: ${value.show.status}</div>
                                <div class="row mb-2">Runtime: ${value.show.averageRuntime} minutes</div>
                                </h3></div>
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>`;
                searchResultList.insertAdjacentHTML('beforeend', searchElement); 
            });
        });
}

