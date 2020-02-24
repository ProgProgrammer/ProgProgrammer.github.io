(function()
{
    window.onload = main;

    function main() {
        const inputText = document.querySelector(".input");
        const obj = {};
        obj.letters = "";
        obj.minLowerLettersEn = 97;
        obj.maxLowerLettersEn = 122;
        obj.minUpperLettersEn = 65;
        obj.maxUpperLettersEn = 90;
        obj.minLowerLettersRus = 1072;
        obj.maxLowerLettersRus = 1103;
        obj.minUpperLettersRus = 1040;
        obj.maxUpperLettersRus = 1071;
        obj.space = 32;

        inputText.onkeypress = function(e) {
            return inputValue(inputText, e, obj);
        }
    }

    function inputValue(inputText, e, obj) {
        if (e.keyCode >= obj.minLowerLettersEn && e.keyCode <= obj.maxLowerLettersEn ||
            e.keyCode >= obj.minUpperLettersEn && e.keyCode <= obj.maxUpperLettersEn ||
            e.keyCode >= obj.minLowerLettersRus && e.keyCode <= obj.maxLowerLettersRus ||
            e.keyCode >= obj.minUpperLettersRus && e.keyCode <= obj.maxUpperLettersRus ||
            e.keyCode === obj.space) {
            obj.letters = "";
            obj.letters = e.key.toLowerCase();
            inputText.value += obj.letters;
            return false;
        } else {
            return false;
        }
    }
})

()
