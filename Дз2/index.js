(function () {

    'use strict'
    myFunction(2, 5, 4, 6,15,`Карл у Клары украл кораллы`);

    function myFunction(...args) {
        let string = args.pop().split(' ');//отрезаем от массива аргументов последний,он же строка, и делаем массив из него, разбивая по пробелу
        let time = 0;
        if(string.length > args.length) { //если слов в строке, больше, чем цифр передано
            let ifShortArgs = args.pop(); // отрезаем последний числовой аргумент
            for (let i = 0; i < args.length; i++)  //выводим все слова с соответствующими нтервалами
            {
                time = time+args[i];
                setTimeout(delay, time * 1000);
                function delay() {
                    console.log(string[i]);
                }
            }
            for (let i = 0; i < (string.length - args.length); i++) // выводим с последним интервалом все оставшиеся слова
            {
                time = time + ifShortArgs;
                setTimeout(delay, time * 1000);
                function delay() {
                    console.log(string[args.length + i]);
                }
            }
        }
        else {                                   // если слов в строке меньше, либо столько же слов сколько и чисел
            for (let i = 0; i < args.length; i++)
            {
                time = time + args[i];
                setTimeout(delay, time * 1000);
                function delay() {
                    if (string[i]){console.log(string[i])}; // игнорируем лишние числа
                }
            }
        }
    }

}());

