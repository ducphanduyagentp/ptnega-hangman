var WordList = [
    ['FOOTBALL', 'BASKETBALL', 'BASEBALL', 'SWIMMING', 'RUNNING'],
    ['PHOTOGRAPH', 'THINKING OUT LOUD', 'LIBERATORS', 'YOU BELONG WITH ME', 'FLASH LIGHT'],
    ['DIJKSTRA', 'TREAP', 'BINARY INDEXED TREE', 'INTERVAL TREE', 'LINKED LIST'],
    ['VIETNAM', 'SINGAPORE', 'GERMANY', 'UNITED STATES OF AMERICA', 'ENGLAND']
];
var Vowel = ['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u', ' ', '&', 'n', 'b', 's', 'p' , ';'];
var State;
var tmp;
var Ans;
var LastPlayed = [-1, -1];

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

	var Category = document.getElementById('category');
    var Opt = Category.options[Category.selectedIndex].value;
    var idx = getRandomInt(0, WordList[Opt].length - 1);
    if (Opt == LastPlayed[0]) {
        while(idx == LastPlayed[1])
            idx = getRandomInt(0, WordList[Opt].length - 1);
    }
    LastPlayed[0] = Opt;
    LastPlayed[1] = idx;

    initKeyboard();
    State = 2;

    document.getElementById('hangman').src = 'img/' + State + '.png';
    
    Opt = Number(Opt);
    Ans = WordList[Opt][idx];
    Ans = Ans.split('').join('&nbsp;');
    tmp = Ans;

    for (var i = 0; i < Ans.length; ++i) {
        if (Vowel.indexOf(Ans.charAt(i)) == -1) {
            tmp = tmp.replace(String(Ans.charAt(i)), '_');
        }
    }

    document.getElementById('word').innerHTML = tmp;
}

function resetGame() {
	State = 0;
    document.getElementById('alphabet').innerHTML = '';
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

    if (State > 6) {
		
        document.getElementById('word').innerHTML = Ans;
        document.getElementById('hangman').src = 'img/lose.png';
        var audio = new Audio('sound/lose.mp3');
        audio.play();
        resetGame();

    } else if (tmp == Ans) {

        document.getElementById('word').innerHTML = Ans;
        document.getElementById('hangman').src = 'img/win.png';
        var audio = new Audio('sound/win.mp3');
        audio.play();
        resetGame();
    }


}