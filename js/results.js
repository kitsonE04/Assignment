const resultList = document.querySelector('#results');
const url = 'https://api.tvmaze.com/shows/' + showID + '/seasons&api-key=';
const apiKey = '33319997-0bd6-4e13-83d7-082d40268c54';

fetch(url + apiKey)
    .then((response) => response.json())
    .then((data) => {
        // This is now a normal function
        data.forEach(function (value) {
            console.log(value);
            const seasonElement = `<div class="col-md-4"><div class="card mb-4">
            <div class="card-body">
            <h5 class="card-title">${value.show.name}</h5>
            <p class="card-text">${value.show.summary}</p>
            <a target="_blank" href="${value.show.url}" class="btn btn-primary">View
            Article</a>
            </div>
            </div></div>`;
            resultList.insertAdjacentHTML('beforeend', seasonElement);
        });
    });