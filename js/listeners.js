const fontSizeInput = document.getElementById('font-size')
const fontSizeButtons = document.getElementsByName('font-size')


fontSizeInput.addEventListener('input', function(){
    const text = textArea.value
    if (text == '') return makeToast('Please input some text!','warning')
    const fontSize = parseInt(fontSizeInput.value)
    const lineHeight = fontSize + 6
    adjustTextArea(fontSize, lineHeight)
})
fontSizeButtons.forEach(element => {
    element.addEventListener('click', function(){
        const text = textArea.value
        if (text == '') return makeToast('Please input some text!','warning')
        const fontSize = parseInt(fontSizeInput.value)
        const lineHeight = fontSize + 6
        adjustTextArea(fontSize, lineHeight)
    })
});

textArea.addEventListener('keydown', function(event) {
    let adjustmentValue
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
        maxText()
    }
    if (event.altKey && (event.key === '-' || event.key === '_')) {
        adjustmentValue = event.ctrlKey ? 5 : event.shiftKey ? 10 : 1
        const text = textArea.value
        if (text == '') return makeToast('Please input some text!','warning')
        const fontSize = parseInt(fontSizeInput.value) - adjustmentValue
        fontSizeInput.value = fontSize
        const lineHeight = fontSize + 6
        adjustTextArea(fontSize, lineHeight)
    }
    if (event.altKey && (event.key === '+' || event.key === '=' || event.key === 'Process')) {
        console.log("KEY:", event.key)
        adjustmentValue = event.ctrlKey ? 5 : event.shiftKey ? 10 : 1
        const text = textArea.value
        if (text == '') return makeToast('Please input some text!','warning')
        const fontSize = parseInt(fontSizeInput.value) + adjustmentValue
        fontSizeInput.value = fontSize
        const lineHeight = fontSize + 6
        adjustTextArea(fontSize, lineHeight)
    }
});
const maxTextButtons = document.getElementsByClassName('button-max-text')
const clearTextButtons = document.getElementsByClassName('button-clear-text')

for (let index = 0; index < maxTextButtons.length; index++) {
    const element = maxTextButtons[index];
    element.addEventListener('click', async function(){
        // TODO: Find a better solution here...
        textArea.blur()
        maxText()
        await sleep(500)
        maxText()
    })
}
for (let index = 0; index < clearTextButtons.length; index++) {
    const element = clearTextButtons[index];
    element.addEventListener('click', function(){
        textArea.classList.remove(...textArea.classList)
        textArea.classList.add('p-3','rounded-xl','break-normal','whitespace-pre-wrap')
        textArea.cols = 25
        textArea.rows = 5
        textArea.value = ''
        textArea.style.fontSize = '1rem'
        textArea.style.lineHeight = '1.5rem'
    })
}