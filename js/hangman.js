var WordList = [
    ['FOOTBALL', 'BASKETBALL', 'BASEBALL', 'SWIMMING', 'RUNNING'],
    ['PHOTOGRAPH', 'THINKING OUT LOUD', 'LIBERATORS', 'YOU BELONG WITH ME', 'FLASH LIGHT'],
    ['DIJKSTRA', 'TREAP', 'BINARY INDEXED TREE', 'INTERVAL TREE', 'LINKED LIST'],
    ['VIETNAM', 'SINGAPORE', 'GERMANY', 'UNITED STATES OF AMERICA', 'ENGLAND']
];
var Vowel = ['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u', ' '];
var State;
var tmp;
var Ans;

function initKeyboard() {
    document.getElementById('alphabet').innerHTML = '';
    var tmp = 'AZ'
    for (var i = tmp.charCodeAt(0); i <= tmp.charCodeAt(1); ++i) {
        if (Vowel.indexOf(String.fromCharCode(i).charAt(0)) == -1)
            document.getElementById('alphabet').innerHTML += '<button value="' + String.fromCharCode(i) + '" onclick="processGame(this.value)">' + String.fromCharCode(i) + '</button>\n';
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initGame() {

    initKeyboard();
    State = 1;

    var Category = document.getElementById('category');
    var Opt = Category.options[Category.selectedIndex].value;

    var idx = getRandomInt(0, 4);
    Opt = Number(Opt);

    Ans = WordList[Opt][idx];
    tmp = Ans;

    for (var i = 0; i < tmp.length; ++i) {
        if (Vowel.indexOf(tmp[i]) == -1) {
            tmp = tmp.substr(0, i) + '_' + tmp.substr(i + 1);
        }
    }
    document.getElementById('word').innerHTML = tmp;

}

function processGame(x) {

    var ToRemove = '<button value="' + String(x) + '" onclick="processGame(this.value)">' + String(x) + '</button>\n';
    var newKeyboard = String(document.getElementById('alphabet').innerHTML);

    newKeyboard = newKeyboard.replace(ToRemove, '');
    document.getElementById('alphabet').innerHTML = newKeyboard;

    if (Ans.indexOf(x) == -1) {
        State++;
        document.getElementById('hangman').src = 'img/' + State + '.png';
    } else {

        for (var i = 0; i < Ans.length; ++i) {
            if (Ans.charAt(i) == x) {
                tmp = tmp.substr(0, i) + x + tmp.substr(i + 1);
            }
        }

        document.getElementById('word').innerHTML = tmp;
    }

    if (State > 5)
        alert('You lose!\n' + 'The answer is ' + Ans);
    if (tmp == Ans)
        alert('You win!');
}