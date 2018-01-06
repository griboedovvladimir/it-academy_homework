(function () {


    printDuplicatedNumbers(1, 34, 67, 1, 5, 34, 1);

    function printDuplicatedNumbers(...args) {
        let arr = [];
        for (let i = 0; i < args.length; i++) {
            for (let t = 0; t < i; t++) {
                if (args[t] === args[i]) {
                    let counter = 0;
                    for (let m = 0; m < args.length; m++) {
                        if (args[t] === args[m]) {
                            counter++;
                        }
                    }
                    arr.push(args[t] + ' - ' + counter);

                }
            }
        }
        let n = arr.length;
        arr.sort();
        while (n--) {
            if (arr[n] === arr[n - 1]) {
                arr.splice(n, 1);
            }
        }
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i]);
        }
    }

<<<<<<< HEAD
}());
=======

}());
>>>>>>> 155c9f4208af7d7e018f9df27d57d970f3b3abd7
