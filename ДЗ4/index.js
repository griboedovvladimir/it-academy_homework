(function () {
    'use strict';

    let promise = new Promise(function (res, rej) {
//////////////////////////////////// config ////////////////////////////////////////////

        let spade = ['1F0A6', '1F0A7', '1F0A8', '1F0A9', '1F0AA', '1F0AB', '1F0AD', '1F0AE', '1F0A1', 'spade'];
        let heart = ['1F0B6', '1F0B7', '1F0B8', '1F0B9', '1F0BA', '1F0BB', '1F0BD', '1F0BE', '1F0b1', 'heart'];
        let diamond = ['1F0C6', '1F0C7', '1F0C8', '1F0C9', '1F0CA', '1F0CB', '1F0CD', '1F0CE', '1F0C1', 'diamond'];
        let club = ['1F0D6', '1F0D7', '1F0D8', '1F0D9', '1F0DA', '1F0DB', '1F0DD', '1F0DE', '1F0D1', 'club'];

            let arrOut = [];
            getObj(spade);
            getObj(heart);
            getObj(diamond);
            getObj(club);

            function getObj(arr) {
                let suit = arr.pop();
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = {
                        name: arr[i],
                        suit: suit,
                        dignity: i + 1
                    }
                }
                arrOut.push(...arr);
            }

            return arrOut;
        }

        function compareRandom() {
            return Math.random() - 0.5;
        }

        let deck = arrOfCards(spade, heart, diamond, club);

///////////////////////////////////////////////////// game logic and view //////////////////////////////////////////////////
        deck.sort(compareRandom);
        let trumpSuit = ['spade', 'heart', 'diamond', 'club'].sort(compareRandom)[0];

        let hand1 = deck.slice(0, deck.length / 2).reverse();
        let hand2 = deck.slice(deck.length / 2, deck.length).reverse();
        let cntHand1 = 0;
        let cntHand2 = 0;
        let statistic = [];

        let firstScreen = document.createElement('h2');
        firstScreen.innerHTML = 'Для просмотра каждого хода игроков кликайте мышью в окне браузера.<br><br>Чтобы начать игру,кликните мышью.';
        firstScreen.style.cssText = 'width: 400px;text-align:center;margin:80px auto';
        document.body.appendChild(firstScreen);

        document.body.style.cssText = 'font-family:sans-serif';
        let result = document.createElement('h2');
        result.innerHTML = `Suit: ${trumpSuit}`;
        result.id = 'res';
        result.style.cssText = 'margin:5px auto; width: 350px;text-align:center';

        let counter = document.createElement('h2');
        counter.style.cssText = 'margin:10px auto; width: 80px;text-align:center';

        let table = document.createElement('table');
        table.style.cssText = 'margin:10px auto; width: 200px;border-collapse:collapse;';
        table.id = 'table';
        let line = document.createElement('tr');
        line.id = 'tr';
        let namePlayer1 = document.createElement('td');
        namePlayer1.innerHTML = 'Вася';
        namePlayer1.style.cssText = 'border:1px solid black ;text-align: right; right;padding: 0 5px 0 0;font-weight:bold';
        let namePlayer2 = document.createElement('td');
        namePlayer2.innerHTML = 'Петя';
        namePlayer2.style.cssText = 'border:1px solid black;text-align: left; right;padding: 0 0 0 5px;font-weight:bold';
        let cardPlayer1 = document.createElement('td');
        let cardPlayer2 = document.createElement('td');


        function color(suit) {
            let color;
            if (suit === 'club' || suit === 'spade') {
                color = 'black';
            }
            else {
                color = 'red';
            }
            return color;
        }


        let createiterator = function* () {
            document.body.removeChild(firstScreen);
            document.body.appendChild(result);
            document.body.appendChild(counter);
            document.body.appendChild(table);
            document.getElementById('table').appendChild(line);
            document.getElementById('tr').appendChild(namePlayer1);
            document.getElementById('tr').appendChild(namePlayer2);


            for (let i = 0; i < deck.length / 2; i++) {

                if (hand1[i].suit !== trumpSuit && hand2[i].suit !== trumpSuit) {
                    if (hand1[i].dignity > hand2[i].dignity) {
                        cntHand1 = cntHand1 + 1;
                        cntHand2 = cntHand2 + 0;
                    }
                    else if (hand1[i].dignity < hand2[i].dignity) {
                        cntHand1 = cntHand1 + 0;
                        cntHand2 = cntHand2 + 1;
                    }
                    else if (hand1[i].dignity === hand2[i].dignity) {
                        cntHand1 = cntHand1 + 0;
                        cntHand2 = cntHand2 + 0;
                    }
                }
                else if (hand1[i].suit === trumpSuit) {
                    cntHand1 = cntHand1 + 1;
                    cntHand2 = cntHand2 + 0;
                }
                else if (hand2[i].suit === trumpSuit) {
                    cntHand1 = cntHand1 + 0;
                    cntHand2 = cntHand2 + 1;
                }
                statistic.push([cntHand1, cntHand2]);
                counter.innerHTML = `${cntHand1} : ${cntHand2}`;
                let line = document.createElement('tr');
                line.id = 'tr' + i;
                document.getElementById('table').appendChild(line);
                let cardPlayer1 = document.createElement('td');
                let cardPlayer2 = document.createElement('td');
                cardPlayer1.innerHTML = `&#${parseInt(hand1[i].name, 16)}`;
                cardPlayer2.innerHTML = `&#${parseInt(hand2[i].name, 16)}`;
                document.getElementById('tr' + i).appendChild(cardPlayer1).style.cssText = `color:${color(hand1[i].suit)};border:1px solid black;text-align: right;padding: 0 5px 0 0;font-size:35pt`;
                document.getElementById('tr' + i).appendChild(cardPlayer2).style.cssText = `color:${color(hand2[i].suit)};border:1px solid black;text-align: left;padding: 0 0 0 5px;font-size:35pt`;

                yield statistic[i];
            }
            let winner = cntHand1 > cntHand2 ? 'Вася.' : 'Петя.';
            if (cntHand1 === cntHand2) winner = 'Ничья!';
            result.innerHTML = `Winner: ${winner} Suit: ${trumpSuit}`;
        };

        let iterator = createiterator();

        document.onclick = () => iterator.next();




}());


