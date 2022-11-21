const resultList = document.querySelector('#results');
const url = 'https://content.guardianapis.com/genre/action&api-key=';
const apiKey = '33319997-0bd6-4e13-83d7-082d40268c54';

fetch(url + apiKey)

    .then((response) => response.json())

    .then((data) => {
        // This is now a normal function
        data.response.results.forEach(function (value) {
            console.log(value);
            resultList.insertAdjacentHTML('beforeend', '<li>' + value.webTitle + '</li>');
        });
    });