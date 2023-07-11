const textArea = document.getElementById('text-input')
const buttonMaxText = document.getElementById('button-max-text')
const buttonClearText = document.getElementById('button-clear-text')
const iconPortfolio = document.getElementById('icon-portfolio')
const iconGithub = document.getElementById('icon-github')
const iconLinkedin = document.getElementById('icon-linkedin')

textArea.value = ''

buttonMaxText.addEventListener('click', maxText)
// textArea.addEventListener('input', maxText)
window.addEventListener('resize', maxText)
buttonClearText.addEventListener('click', function(){
    textArea.classList.remove(...textArea.classList)
    textArea.classList.add('p-3','rounded-xl','break-normal','whitespace-pre-wrap')
    textArea.cols = 25
    textArea.rows = 5
    textArea.value = ''
    textArea.style.fontSize = '1rem'
    textArea.style.lineHeight = '1.5rem'
})


function maxText(){
    let numberOfCharacters = textArea.value.length
    if (numberOfCharacters < 6) return
    
    let fontModifier = 1.10 // Default for all devices
    if (isMobileDevice() && isLandscape()) fontModifier = 1.05

    textArea.classList.remove(...textArea.classList)
    textArea.classList.add('w-full','p-3','h-full','resize-none','rounded-3xl','break-normal','whitespace-pre-wrap', 'dark:bg-gray-800','bg-gray-100')

    let width = textArea.clientWidth
    let height = textArea.clientHeight

    let area = width * height
    let areaPerCharacter = area / numberOfCharacters
    let approximateFontSize = Math.sqrt(areaPerCharacter) * fontModifier
    let approximateFontWidth = approximateFontSize * 0.6
    console.log("PARAMS", {
        WIDTH: width, 
        HEIGHT: height, 
        AREA: area, 
        NUMBER_OF_CHARS: numberOfCharacters, 
        AREA_PER_CHAR: areaPerCharacter, 
        APPROX_FONT_WIDTH: approximateFontWidth,
        APPROX_FONT_SIZE: approximateFontSize,
        FONT_MODIFIER: fontModifier
    })

    let fontSize = approximateFontSize // TODO: Need to ensure words can't be too long for the width
    const lineHeight = fontSize + 6
    console.log("FONT", {SIZE: fontSize, LINE_HEIGHT: lineHeight})

    textArea.style.fontSize = `${fontSize}px`
    textArea.style.lineHeight = `${lineHeight}px`
}

function isMobileDevice() {
    // return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    // return navigator.userAgentData && navigator.userAgentData.mobile;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};
function isLandscape() {
    // return window.innerWidth > window.innerHeight;
    return window.matchMedia("(orientation: landscape)").matches;
}