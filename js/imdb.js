const showResultList = document.querySelector('#showResults');
const actorResultList = document.querySelector('#actorResults');
const searchResultList = document.querySelector('#searchResults');
const seasonsResultList = document.querySelector('#seasonResults');
const episodeResultList = document.querySelector('#episodeResults');
const episodeInfoResultList = document.querySelector('#episodeInfoResults');
const showUrl = 'https://api.tvmaze.com/shows';
const actorsUrl = 'https://api.tvmaze.com/people?page=1';


function storeSeasonID() {
    const queryStr = seasonUrl;
    const usp = new URLSearchParams(queryStr);
    const seasonsUrl = 'file:///C:/Users/nosti/University%20EK/IWD-Projects/assignment/seasons.html?'
    window.location.href = seasonsUrl + usp;
}

function storeEpisodeID() {
    const episodeQueryStr = episodeUrl;
    const usp = new URLSearchParams(episodeQueryStr);
    const showUrl = 'file:///C:/Users/nosti/University%20EK/IWD-Projects/assignment/episodes.html?'
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
    const showUrl = 'file:///C:/Users/nosti/University%20EK/IWD-Projects/assignment/episodeInfo.html?'
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
                    <div class="card-body" onclick=" episodeUrl='id=${value.id}'; storeEpisodeID();"> 
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
    const episodeInfoUrl = 'https://api.tvmaze.com/shows/' + episodeInfoData + '/episodebynumber?season='+ seasonNumber +'&number='+ episodeNumber;
    console.log(episodeInfoUrl);

    fetch(episodeInfoUrl + apiKey)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(function (value) {
                console.log(value);
                const episodeInfoElement = `<h4>${value.name}</h4>`;
                episodeInfoResultList.insertAdjacentHTML('beforeend', episodeInfoElement);
            });
        });
}

fetch(showUrl)
    .then((response) => response.json())
    .then((data) => {
        data.forEach(function (value) {
            console.log(value);
            const showElement = `
            <div class="col-md-12">
                <div class="card bg-dark mb-4">
                    <div class="card-body" onclick=" seasonUrl='id=${value.id}'; storeSeasonID();"> 
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
                    <div class="card-body" onclick=" seasonUrl='id=${value.show.id}'; storeSeasonID();"> 
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

