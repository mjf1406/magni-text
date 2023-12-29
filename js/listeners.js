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
