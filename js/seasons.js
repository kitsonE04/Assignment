fetch(seasonUrl)
    .then((response) => response.json())
    .then((data) => {
        data.forEach(function (seasonValue) {
            console.log(seasonValue);
        });
    });