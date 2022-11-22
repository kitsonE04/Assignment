const resultList = document.querySelector('#results');
const url = 'https://api.tvmaze.com/shows?page=1&api-key=';
const apiKey = '33319997-0bd6-4e13-83d7-082d40268c54';

fetch(url + apiKey)
    .then((response) => response.json())
    .then((data) => {
        // This is now a normal function
        data.forEach(function (value) {
            console.log(value);
            const showElement = `
            <div class="col-md-12">
            <div class="card bg-dark mb-4">
            <div class="card-body"> 
            <div class="container-fluid">
            <h1 class="card-title">${value.name}</h1>
            <div class="col-4">
            <img alt="back-image" class="rounded" src="${value.image.medium}"><p class="card-text">${value.summary}</p>
            <a target="_blank" href="${value.url}" class="btn btn-primary">View Show</a>
            </div>
            </div></div></div></div>`;
            resultList.insertAdjacentHTML('beforeend', showElement);
        });
    });