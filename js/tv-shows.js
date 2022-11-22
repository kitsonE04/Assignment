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
                        <div class="container">
                            <h1 class="card-title" style="color:white;">${value.name}</h1>
                            <div class="container"></div>
                            <div class="row">
                            <div class="col-3">
                                <img alt="back-image" class="rounded mt-4" src="${value.image.medium}">
                            </div>
                            <div class="col-5">
                                <p class="card-text">${value.summary}</p>
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>`;
            resultList.insertAdjacentHTML('beforeend', showElement);
        });
    });