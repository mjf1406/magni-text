const FONT_MODIFIER = 1.10
const FONT_MODIFIER_MOBILE_LANDSCAPE = 1.05
const NON_ENGLISH_FONT_MODIFIER = 0.7
const ALPHABET = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`

const sleep = ms => new Promise(r => setTimeout(r, ms));
Array.prototype.sum = function() {
    return this.reduce((accumulator, current) => accumulator + current, 0);
}; 

const textArea = document.getElementById('text-input')
const buttonMaxText = document.getElementById('button-max-text')
const buttonClearText = document.getElementById('button-clear-text')
const iconPortfolio = document.getElementById('icon-portfolio')
const iconGithub = document.getElementById('icon-github')
const iconLinkedin = document.getElementById('icon-linkedin')

textArea.value = ''

buttonMaxText.addEventListener('click', async function(){
    // TODO: Find a better solution here...
    textArea.blur()
    maxText()
    await sleep(500)
    maxText()
})
// textArea.addEventListener('input', maxText)
// window.addEventListener('resize', maxText) // Removed this because it seems annoying
buttonClearText.addEventListener('click', function(){
    textArea.classList.remove(...textArea.classList)
    textArea.classList.add('p-3','rounded-xl','break-normal','whitespace-pre-wrap')
    textArea.cols = 25
    textArea.rows = 5
    textArea.value = ''
    textArea.style.fontSize = '1rem'
    textArea.style.lineHeight = '1.5rem'
})

function removePunctuationAndSpaces(str) {
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g, '');
}
function trimNonLatinCharacters(str) {
    return str.replace(/[^A-Za-z]/g, '');
}
function maxText(){
    let text = textArea.value.trimStart()
    const textCleaned = removePunctuationAndSpaces(text)
    const textLatinOnly = trimNonLatinCharacters(textCleaned)
    const isAllEnglish = (textCleaned.length == textLatinOnly.length) ? true : false

    let numberOfCharacters = text.length
    if (numberOfCharacters < 5) return makeToast('Please input at least 5 characters.', 'warning')
    
    let fontModifier = (isAllEnglish == false) ? NON_ENGLISH_FONT_MODIFIER : FONT_MODIFIER
    if (isMobileDevice() && isLandscape()) fontModifier = FONT_MODIFIER_MOBILE_LANDSCAPE

    let width = textArea.clientWidth
    let height = textArea.clientHeight

    let area = width * height
    let areaPerCharacter = area / numberOfCharacters
    let approximateFontSize = Math.sqrt(areaPerCharacter) * fontModifier
    let approximateFontWidth = approximateFontSize * 0.6
    // console.log("PARAMS", {
    //     WIDTH: width, 
    //     HEIGHT: height, 
    //     AREA: area, 
    //     NUMBER_OF_CHARS: numberOfCharacters, 
    //     AREA_PER_CHAR: areaPerCharacter, 
    //     APPROX_FONT_WIDTH: approximateFontWidth,
    //     APPROX_FONT_SIZE: approximateFontSize,
    //     FONT_MODIFIER: fontModifier
    // })

    let fontSize = approximateFontSize // TODO: Need to ensure words can't be too long for the width
    const lineHeight = fontSize + 6
    adjustTextArea(fontSize, lineHeight)
}
function adjustTextArea(fontSize, lineHeight){
    textArea.classList.remove(...textArea.classList)
    textArea.classList.add('w-full','p-3','h-full','resize-none','rounded-3xl','break-normal','whitespace-pre-wrap', 'dark:bg-gray-800','bg-gray-100')
    textArea.style.fontSize = `${fontSize}px`
    textArea.style.lineHeight = `${lineHeight}px`
    fontSizeInput.value = fontSize
}
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};
function isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches;
}