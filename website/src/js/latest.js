//TODO:
// [x] 1. Get all images from the `latest` and split the array into chunks
// 2. Render them by chunks on the page
// 3. Create shadow slider which will get image onclick visible and will show
//    correct image index.

// Imports
import { Storage } from "./core";
import "../css/latest.css"

// Variables
var perChunk = 0; // Default value
var collectionObject = new Object();
var currentIndex = 0; 
const latestCollectionId = "1642016809701";

// Function for splitting the array into chunks
const splitArrayIntoChunks = (array, itemsPerChunk) => {
  var resArray = array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / itemsPerChunk);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
  return resArray;
};

function goToChunk(chunkIndex) {
  const chunkList = document.querySelectorAll(".image-chunk");
  const btns = document.querySelectorAll(".pagination-button");

  chunkList[currentIndex].style.display = "none";
  chunkList[chunkIndex].style.display = "grid";
  
  btns[currentIndex].classList.remove("btn-selected");
  btns[chunkIndex].classList.add("btn-selected");

  currentIndex = chunkIndex;


}

// Correctly getting the whole collectionObject
collectionObject = Storage.getSpecific(latestCollectionId);

// Optimize for image count
if (collectionObject.images.lenght > 9) {
  perChunk = 9;
} else {
  perChunk = 3;
}
// Split the array
collectionObject.imageChunks = splitArrayIntoChunks(
  collectionObject.images,
  perChunk
);

// Create buttons inside the pagination element
// And append the images into the table
let paginationWraper = document.querySelector(".pagination");
collectionObject.imageChunks.forEach((item, index) => {
  // Pagination
  // Create the buttons
  let paginationEl = document.createElement("div");
  paginationEl.innerHTML = `
  <button class="pagination-button">${index+1}</button>
  `;
  paginationWraper.appendChild(paginationEl);
  // Make them work
  // select all those buttons and add event listener to onlclick reffin the gotochunk fucnt
  const buttons = document.querySelectorAll(".pagination-button");
  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      goToChunk(index);
    })
  })
  // Images in the wrapper
  let imageChunk = document.createElement("div");
  imageChunk.classList.add("image-chunk");
  let imagesTable = document.querySelector(".table-content");
  item.forEach((img) => {
    let image = document.createElement("div");
    image.classList.add("single-image")
    image.innerHTML = `
    <img src="${img.imageSrc}" style="height: 350px"/>
    `;
    imageChunk.appendChild(image);
  });
  imagesTable.appendChild(imageChunk);
  imagesTable.children[0].style.display = "grid";
});

// Show the correct page index initially
document.querySelectorAll(".pagination-button")[0].classList.add("btn-selected");

