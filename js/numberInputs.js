const MINIMUM_FONT_SIZE = 1
const FONT_SIZE_MODIFIER = 1

// Increment and Decrement Buttons
function decrement(e) {
    e.preventDefault();
    let targetSize, adjustmentValue

    const btn = e.target.closest('button[data-action="decrement"]');

    targetSize = 1
    adjustmentValue = e.ctrlKey ? 5 : e.shiftKey ? 10 : 1

    if (btn.name === 'rotation-duration') {
        targetSize = MINIMUM_FONT_SIZE;
        adjustmentValue = e.ctrlKey ? 5 : e.shiftKey ? 10 : FONT_SIZE_MODIFIER;
    } 

    const target = btn.nextElementSibling;
    let value = Number(target.value);
    if (value - adjustmentValue < targetSize) {
        return makeToast(`Cannot be less than ${targetSize}!`, `error`);
    }
    value -= adjustmentValue;
    target.value = Math.round(value);
}

function increment(e) {
    e.preventDefault();
    let targetSize, adjustmentValue

    const btn = e.target.closest('button[data-action="increment"]');
    
    adjustmentValue = e.ctrlKey ? 5 : e.shiftKey ? 10 : 1

    const target = btn.previousElementSibling;
    let value = Number(target.value);
    if (value + adjustmentValue > targetSize) {
        return makeToast(`Cannot be greater than ${targetSize}!`, `error`);
    }
    value += adjustmentValue;
    target.value = Math.round(value);
}
const decrementButtons = document.querySelectorAll(`button[data-action="decrement"]`);
const incrementButtons = document.querySelectorAll(`button[data-action="increment"]`);
decrementButtons.forEach(btn => {
    btn.addEventListener("click", decrement);
});
incrementButtons.forEach(btn => {
    btn.addEventListener("click", increment);
});