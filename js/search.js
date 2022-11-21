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
                const tvshowElement = `<div class="col-md-3">
                <div class="card bg-transparent mb-4"><div class="card-body">
                <a href="results.html">
                <img alt="back-image" class="rounded" src="${value.show.image.medium}">
                </div></div></div>`;
                resultList.insertAdjacentHTML('beforeend', tvshowElement); 
            });
        });
}