/*
*	index.js - Javascript for the image gallery
*	Author - Ramesh
*	Created on 07/28/2019
*/

const imgWrap = document.getElementById('imgWrap')
const fullImageModal = document.getElementById("fullImageModal");
const closeModal = document.getElementById("closeModal")
const fullImageHolder = document.getElementById('fullImageHolder')
const fullImageInfo = document.getElementById('fullImageInfo')

/*
*   Storing the API response in constant called store as a single source of truth like in a 
*   single page application eventhough it can be handled in several other ways for this challenge.
*/
const store = {
    data: []
}

/* Mutating setter for the store */
const setDataToStore = (data) => {
    store.data = data
}

/*
*   This function makes API request on page load
*   Sets response to the store
*   invokes populateImages() on success
*   if any errors, throws on an alert box with a generic message
*/
const getImages = () => {
    fetch('http://localhost:8887/data/photos.json')
    .then(response => response.json())
    .then(data => {
        setDataToStore(data)
        populateImages()
    })
    .catch(() => {
        alert('Something went wrong. Please try again.')
    })
}


/*
*   This function creates DOM elements for the images using data from the store
*   Appends the DOM elements to a Document Fragment by iterating the data
*   Document Fragment is not a part of document tree
*   So updating the fragment will not invoke the reflow or render during every iteration
*   Finally appends it to the image wrapper element on the page 
*/
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

/*
*   This function gets the imageId from the selected image, filters from the data and invokes 
*   populateFullImage() and populateFullImageInfo() by passing the image info
*   also opens the simulated modal
*/
const displayLarge = (e) => {
    const fullImage = e.target.closest('img')
    const imageId = fullImage.getAttribute('imageId')
    const imageData = store.data.filter(item => item.id === imageId)
    if(imageData.length !== 0){
        const imageObj = imageData[0]
        populateFullImage(imageObj)
        populateFullImageInfo(imageObj)
        fullImageModal.style.display = "block"
    } else{
        alert('Image not found')
    }
}

/*
*   Displays the large/full picture of the selected image.
*/
const populateFullImage = (imageObj) => {
    const fullImage = document.createElement('img')
    fullImage.setAttribute('class', 'fullImage')
    fullImage.setAttribute('src', imageObj.urls.full)
    fullImage.setAttribute('alt', imageObj.description || imageObj.id)
    removeChild(fullImageHolder)
    fullImageHolder.appendChild(fullImage)
}

/*
*   Populates image info such as User name and Description of the image selected.
*/
const populateFullImageInfo = (imageObj) => {
    removeChild(fullImageInfo)
    const userInfo = imageObj.user
    const imgDescText = imageObj.description ? document.createTextNode(imageObj.description.toUpperCase()) : null
    const userNameText = document.createTextNode(userInfo.first_name.toUpperCase() + ' ' + userInfo.last_name.toUpperCase())

    const imgDesc = document.createElement('h3')
    const userName = document.createElement('h4')
    
    imgDescText ? imgDesc.appendChild(imgDescText) : null
    userName.appendChild(userNameText)

    let documentFragment = document.createDocumentFragment();
    documentFragment.appendChild(imgDesc)
    documentFragment.appendChild(userName)

    fullImageInfo.appendChild(documentFragment)
}

/*   
*   Removes the already viewed image from DOM before opening one, so that images elements are not duplicated.
*/
const removeChild = (e) => {
    let child = e.lastElementChild;  
    while (child) { 
        e.removeChild(child); 
        child = e.lastElementChild; 
    }
}

/* 
*   Adding Event listener to the image on clicking an image on the main page 
*   invokes displayLarge()
*/
imgWrap.addEventListener('click', displayLarge)

/* To close the simulated modal on clicking outside the modal */
window.onclick = function(event) {
    if (event.target == fullImageModal) {
        fullImageModal.style.display = "none";
    }
}

/* To close the simulated modal on close button click */
closeModal.onclick = function() {
    fullImageModal.style.display = "none";
}

/* Load images on initial page load */
window.onload = () => getImages()