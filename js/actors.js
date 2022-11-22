const resultList = document.querySelector('#results');
const url = 'https://api.tvmaze.com/people?page=1&api-key=';
const apiKey = '33319997-0bd6-4e13-83d7-082d40268c54';

fetch(url + apiKey)
    .then((response) => response.json())
    .then((data) => {
        // This is now a normal function
        data.forEach(function (value) {
            console.log(value);
            const actorElement = `
            <div class="col-md-3">
                <div class="card bg-dark mb-4"><div class="card-body">
                <h5 class="card-title" style="color:white;">${value.name}</h5>
                <a href="results.html">
                <img alt="back-image" class="rounded" src="${value.image.medium}">
                </div></div></div>`;
            resultList.insertAdjacentHTML('beforeend', actorElement);
        });
    });