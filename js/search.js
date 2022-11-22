const searchShow = (event) => {
    event.preventDefault();
    const keyword = document.querySelector('#keywords').value;
    const url = 'https://api.tvmaze.com/search/shows?q=' + keyword + '&api-key=';
    const apiKey = 'j_8cu0wtLRBaHzQk1u1RXuQefjsXp_JK';
    const resultList = document.querySelector('#results');
    const showID = document.querySelector('#showsID') 
    const seasonUrl = 'https://api.tvmaze.com/shows/' + showID + '/seasons';
    console.log(seasonUrl);
    resultList.innerHTML = '';
    fetch(url + apiKey)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(function (value) {
                console.log(value);
                const tvshowElement = `<div class="col-md-12">
                <div class="card bg-dark mb-4">
                    <div class="card-body"> 
                        <div class="container">
                            <h1 class="card-title" style="color:white;">${value.show.name}</h1>
                            <div class="container"></div>
                            <div class="row">
                            <div class="col-3">
                                <img alt="back-image" class="rounded mt-4" src="${value.show.image.medium}">
                            </div>
                            <div class="col-5">
                                <p class="card-text">${value.show.summary}</p>
                            </div>
                            <div class="col-4" style="color:white">
                                <div class="text-bg-danger rounded p-3">
                                <h3 class="card-text" bg-black>
                                <div class="row mb-2">Rating: ${value.show.rating.average}</div>
                                <div class="row mb-2">Genre: ${value.show.genre}</div>
                                <div class="row mb-2">Status: ${value.show.status}</div>
                                <div class="row mb-2">Runtime: ${value.show.averageRuntime}</div>
                                </h3></div>
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>`;
                resultList.insertAdjacentHTML('beforeend', tvshowElement); 
            });
        });
}