import {catsData} from "./data.js"


const memeModal = document.getElementById("meme-modal")
const memeModalInner = document.getElementById("meme-modal-inner")
const getImageBtn = document.getElementById('get-image-btn')
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn")
const emotionRadios = document.getElementById('emotion-radios')
const gifsOnlyOption = document.getElementById("gifs-only-option")
const emotionsRadio = document.getElementById('emotion-radios')

emotionRadios.addEventListener("change", highlightCheckedOption)
memeModalCloseBtn.addEventListener('click', closeModal)
getImageBtn.addEventListener('click', renderCat)

function closeModal() {
    memeModal.style.display = 'none'
}

function renderCat(){

    const catObject = getSingleCatObject()
    console.log(catObject)
    memeModalInner.innerHTML = `
                            <img class="cat-img"
                            src = "./images/${catObject.image}"
                            alt="${catObject.alt}"
                            >
                            `
    memeModal.style.display = 'flex'
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()
    if (catsArray.length === 1){
        return catsArray[0]
    }
    else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray() {    
   
    if (document.querySelector('input[type="radio"]:checked')) {
        const isGif = gifsOnlyOption.checked
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        //console.log(selectedEmotion)    

        const matchingCatsArray =  catsData.filter(function(cat) {
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
    }    
}

function highlightCheckedOption(e) {
   
    let radioEle = document.getElementsByClassName('radio')
    for (let element of radioEle) {
        element.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
    //console.log(e.target.id)
}

function getEmotionsArray(cats){
    let emotionsArr = []
    for (let cat of cats) {                
        for (let emotion of cat.emotionTags) {  
            if (!emotionsArr.includes(emotion)) { 
                emotionsArr.push(emotion)
            }
        }
    }
    return emotionsArr
}

function renderEmotionsRadios(cats){    

    const emotions = getEmotionsArray(cats)   
    let emotionsString = ``
    for (let emotion of emotions) {
       emotionsString += `<div class="radio">
                                <label for="${emotion}" >${emotion}</label>
                                <input type="radio" id="${emotion}" value=${emotion} name="emotions">
                          </div>
                          `
    }
    emotionsRadio.innerHTML = emotionsString
}

renderEmotionsRadios(catsData)


