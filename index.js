const getImages = () => {
    const url = 'http://localhost:8887/data/photos.json'
    fetch(url)
        .then((response) => {
            return response
        })
}

console.log(getImages())