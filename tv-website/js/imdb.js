const showResultList = document.querySelector('#showResults');
const actorResultList = document.querySelector('#actorResults');
const searchResultList = document.querySelector('#searchResults');
const seasonsResultList = document.querySelector('#seasonResults');
const episodeResultList = document.querySelector('#episodeResults');
const episodeInfoResultList = document.querySelector('#episodeInfoResults');




function storeSeasonID(seasonUrl) {
    const queryStr = seasonUrl;
    const usp = new URLSearchParams(queryStr);
    const seasonsUrl = 'http://ethankitson.uosweb.co.uk/seasons.html?'
    window.location.href = seasonsUrl + usp;
}

function storeEpisodeID(episodeUrl) {
    const episodeQueryStr = episodeUrl;
    const usp = new URLSearchParams(episodeQueryStr);
    const showUrl = 'http://ethankitson.uosweb.co.uk/episodes.html?'
    window.location.href = showUrl + usp;
}

function storeEpisodeInfoID(episodeUrl, episodeSeason, episodeNumber) {
    const episodeInfoUrl = episodeUrl;
    const episodeInfoSeason = episodeSeason;
    const episodeInfoNumber = episodeNumber;
    const query = new URLSearchParams({
        id: episodeInfoUrl,
        season: episodeInfoSeason,
        number: episodeInfoNumber,
    });
    const usp = query.toString();
    const showUrl = 'http://ethankitson.uosweb.co.uk/episodeInfo.html?'
    window.location.href = showUrl + usp;
}

function getSeasonData() {
    const url = window.location.href;
    const searchParams = new URL(url).searchParams;
    const urlSearchParams = new URLSearchParams(searchParams);
    const seasonData = urlSearchParams.get('id');
    const seasonUrl = 'https://api.tvmaze.com/shows/' + seasonData + '/seasons';

    fetch(seasonUrl)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(function (value) {
                console.log(value);
                const seasonElement = `
            <div class="col-md-3">
                <div class="card bg-dark mb-3">
                    <div class="card-body" onclick=" episodeUrl='id=${value.id}'; storeEpisodeID(episodeUrl);"> 
                        <div class="container">
                            <div class="container"></div>
                            <div class="row">
                            <div class="col-2">
                            <a target="_blank"><img alt="season-back-image" class="rounded mt-3" src="${value.image.medium}"></a>
                            </div>
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>`;
                seasonsResultList.insertAdjacentHTML('beforeend', seasonElement);
            });
        });
}

function getEpisodeData() {
    const url = window.location.href;
    const searchParams = new URL(url).searchParams;
    const urlSearchParams = new URLSearchParams(searchParams);
    const episodeData = urlSearchParams.get('id');
    const episodeUrl = 'https://api.tvmaze.com/seasons/' + episodeData + '/episodes';

    fetch(episodeUrl)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(function (value) {
                console.log(value);
                const episodeElement = `
            <div class="col-md-3">
                <div class="card bg-dark mb-3">
                    <div class="card-body"  onclick="episodeUrl='${value.id}';episodeSeason='${value.season}';episodeNumber='${value.number}'; storeEpisodeInfoID(episodeUrl, episodeSeason, episodeNumber);"> 
                        <div class="container">
                            <h4 class="card-title" style="color:white;">SE${value.season}EP${value.number} ${value.name}</h4>
                            <div class="container"></div>
                            <div class="row">
                            <div class="col-12">
                            <a target="_blank"><img alt="episode-back-image" class="rounded mt-4" src="${value.image.medium}"></a>
                            </div>
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>`;
                episodeResultList.insertAdjacentHTML('beforeend', episodeElement);
            });
        });
}

function getEpisodeInfoData() {
    const url = window.location.href;
    const searchParams = new URL(url).searchParams;
    const urlSearchParams = new URLSearchParams(searchParams);
    const episodeInfoData = urlSearchParams.get('id');
    const seasonNumber = urlSearchParams.get('season');
    const episodeNumber = urlSearchParams.get('number');
    const episodeInfoUrl = 'https://api.tvmaze.com/shows/' + episodeInfoData + '/episodebynumber?season=' + seasonNumber + '&number=' + episodeNumber;
    console.log(episodeInfoUrl);

    fetch(episodeInfoUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const episodeInfoElement = `
                    <h1>SE${data.season}EP${data.number} ${data.name}</h1>
                        <div class="row">
                            <div class="col-3">
                                <img alt="info-image" id="episode-info-image" class="rounded mt-4" src="${data.image.original}">
                            </div>
                            <div class="col-5">
                                <p class="info-text">${data.summary}</p>
                            </div>
                            <div class="col-4">
                            <div class="text-bg-danger rounded p-3">
                            <h4 class="stats-text" bg-black>
                            <div class="row mb-2">Rating: ${data.rating.average}/10</div>
                            <div class="row mb-2">Air Time: ${data.airtime}</div>
                            <div class="row mb-2">Air Date: ${data.airdate}</div>
                            <div class="row mb-2">Runtime: ${data.runtime} minutes</div>
                            </h4></div>
                            </div>

                        </div>
                
                
                
                `;
            episodeInfoResultList.insertAdjacentHTML('beforeend', episodeInfoElement);
        });
}

function getTvShows() {
    const showUrl = 'https://api.tvmaze.com/shows';
    fetch(showUrl)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(function (value) {
                console.log(value);
                const showElement = `
            <div class="col-md-12">
                <div class="card bg-dark mb-4">
                    <div class="card-body" onclick=" seasonUrl='id=${value.id}'; storeSeasonID(seasonUrl);"> 
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
}

function getActors() {
    const actorsUrl = 'https://api.tvmaze.com/people?page=1';
    fetch(actorsUrl)
    .then((response) => response.json())
    .then((data) => {
        data.forEach(function (value) {
            console.log(value);
            const actorElement = `
                <div class="col-md-4">
                    <div class="card bg-dark mb-4"><div class="card-body">
                    <h5 class="card-title" style="color:white;">${value.name}</h5>
                    <img alt="back-image" class="rounded" src="${value.image.medium}">
                    </div></div></div>`;
            actorResultList.insertAdjacentHTML('beforeend', actorElement);
        });
    });
}


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
                    <div class="card-body" onclick=" seasonUrl='id=${value.show.id}'; storeSeasonID(seasonUrl);"> 
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
                                <h4 class="card-text" bg-black>
                                <div class="row mb-2">Rating: ${value.show.rating.average}/10</div>
                                <div class="row mb-2">Genre: ${value.show.genres}</div>
                                <div class="row mb-2">Status: ${value.show.status}</div>
                                <div class="row mb-2">Runtime: ${value.show.averageRuntime} minutes</div>
                                </h4></div>
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>`;
                searchResultList.insertAdjacentHTML('beforeend', searchElement);
            });
        });
}

const searchActors = (event) => {
    event.preventDefault();
    const keyword = document.querySelector('#keywords').value;
    const url = 'https://api.tvmaze.com/search/people?q=' + keyword;
    searchResultList.innerHTML = '';
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(function (value) {
                console.log(value);
                const searchElement = `<div class="col-md-4">
                <div class="card bg-dark mb-4"><div class="card-body">
                <h5 class="card-title" style="color:white;">${value.person.name}</h5>
                <img alt="back-image" class="rounded" src="${value.person.image.medium}">
                </div></div></div>`;
                searchResultList.insertAdjacentHTML('beforeend', searchElement);
            });
        });
}

