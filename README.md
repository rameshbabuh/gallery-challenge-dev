
# Redfin UXE Gallery Challenge

This project displays the available images in a gallery grid-view and shows a large/full-size version of an image if users selects one.

## Quickstart with Python SimpleHTTPServer

1. Download the [template code][code] provided and unzip anywhere, such as `~/code/myfolder`.

2. From the command line:

cd ~/code/myfolder

python -m SimpleHTTPServer 8887  

3. Open `http://localhost:8887/index.html` and

`http://localhost:8887/data/photos.json` in your browser. You should see a “Hello, World!” page and JSON data.

## Quickstart with Chrome Web Server

1. Download the [template code][code] provided and unzip anywhere, such as `~/code/myfolder`.

2. Launch the Chrome Web Server

3. Click _choose folder_ and set to `~/code/myfolder`.

4. Open `http://localhost:8887/index.html` and `http://localhost:8887/data/photos.json` in your browser. You should see a “Hello World” page and JSON data.

## Hosted Site information
You can also access the app using this link: [Gallery-Challenge-App](http://gallery-challenge.surge.sh/)

## Possible Enhancements
This project can be extended in several ways by adding more functionalities and features to it. Few suggestions are mentioned below.
* Lazy-loading of images can be done on the main page to avoid any delays during the initial page load.
* Page loader can be added before at the page load to let the user know the request is still in process.
* When the user hovers on an image, it can be highlighted with a shadow and the title text must display the image description using default html pop-over.
* Image slider can be added to the modal-view.
* The slider should also support navigation using arrow keys.
* More information about the image and user can be displayed in modal view.

## Design suggestions

In order to make this project, efficient with regards to performance and to give a user a best experience, I would like to suggest the below design decisions.
* The application can be made into a Single-page application (SPA) for sleek-performance without any reloads or browser navigation (with built-in router).
* Component-based frameworks like React or Vue could be used.
* The data should be stored in a Store, which would act as the Single source of truth and mutations should happen only through the setters or mutators.
* I would split up the elements into components and create the following components in order to enable maintainability and reusability.
	* Main page component
	* Image wrap component
	* Image component
	* Modal component
	* FullImageHolder component
	* FullImage component
	* ImageInfo component

(The above component list is only for the functionalities currently implemented and not for the future enhancements or suggestions). 

## Screenshots

![image](/screenshots/MainPage.png?raw=true "Gallery-MainPage")

![image](/screenshots/FullImage.png?raw=true "Gallery-FullImage")

## License

MIT