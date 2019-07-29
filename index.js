const imgWrap = document.getElementById('imgWrap')
const fullImageModal = document.getElementById("fullImageModal");
const closeModal = document.getElementById("closeModal")
const fullImageHolder = document.getElementById('fullImageHolder')
const fullImageInfo = document.getElementById('fullImageInfo')

const store = {
    data: []
}

const setDataToStore = (data) => {
    store.data = data
}

const getImages = () => {
    fetch('http://localhost:8887/data/photos.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setDataToStore(data)
        populateImages()
    })
    .catch(() => {
        alert('Something went wrong. Please try again.')
    })
}

const populateImages = () => {
    const imageFragment = document.createDocumentFragment()
    store.data.map(item => {
        const image = document.createElement('img')
        image.setAttribute('class', 'image')
        image.setAttribute('src', item.urls.small)
        image.setAttribute('imageId', item.id)
        image.setAttribute('alt', item.description || item.id )
        imageFragment.appendChild(image)
    });
    imgWrap.appendChild(imageFragment)
}

const displayLarge = (e) => {
    const fullImage = e.target.closest('img')
    const imageId = fullImage.getAttribute('imageId')
    const imageData = store.data.filter(item => item.id === imageId)
    if(imageData.length !== 0){
        const imageObj = imageData[0]
        populateFullImage(imageObj)
        populateFullImageInfo(imageObj)
    }
    fullImageModal.style.display = "block";
}

const populateFullImage = (imageObj) => {
    const fullImage = document.createElement('img')
    fullImage.setAttribute('class', 'fullImage')
    fullImage.setAttribute('src', imageObj.urls.full)
    fullImage.setAttribute('alt', imageObj.description || imageObj.id)
    removeChild(fullImageHolder)
    fullImageHolder.appendChild(fullImage)
}

const populateFullImageInfo = (imageObj) => {
    removeChild(fullImageInfo)
    const userInfo = imageObj.user
    const imgDescText = imageObj.description ? document.createTextNode(imageObj.description.toUpperCase()) : null
    const userNameText = document.createTextNode(userInfo.first_name.toUpperCase() + ' ' + userInfo.last_name.toUpperCase())

    const imgDesc = document.createElement('h3')
    const userName = document.createElement('h4')
    
    imgDescText ? imgDesc.appendChild(imgDescText) : null
    userName.appendChild(userNameText)

    var documentFragment = document.createDocumentFragment();
    documentFragment.appendChild(imgDesc)
    documentFragment.appendChild(userName)

    fullImageInfo.appendChild(documentFragment)
}

const removeChild = (e) => {
    var child = e.lastElementChild;  
    while (child) { 
        e.removeChild(child); 
        child = e.lastElementChild; 
    }
}

imgWrap.addEventListener('click', displayLarge)

window.onload = () => getImages()

window.onclick = function(event) {
    if (event.target == fullImageModal) {
        fullImageModal.style.display = "none";
    }
}

closeModal.onclick = function() {
    fullImageModal.style.display = "none";
}
