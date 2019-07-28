const getImages = () => {
    fetch('http://localhost:8887/data/photos.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var imgWrap = document.getElementById('imgWrap')
        data.map(item => {
            console.log(item.urls.small)
            imgWrap.innerHTML += '<img class="image" src="' + item.urls.small +'">'
        })
    })
    .catch(() => {
        console.log('error')
    })
}
getImages()
