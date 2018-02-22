(function () {
    'use strict';
    let objForTable = {
        wrapper: 'placeholder', columns: ['Id', 'Name', 'Password', 'Email', 'Date'], rows: [
            {Id: '1', Name: 'Vika', Password: 'Vika1', Email: 'Vika1@gmail.com', Date: '12-01-2015'},
            {Id: '2', Name: 'Veronika', Password: 'vera12', Email: 'Veronichka@gmail.com', Date: '21-01-2015'},
            {Id: '3', Name: 'Natali', Password: 'Nat86', Email: 'Nat86@gmail.com', Date: '16-03-2015'},
            {Id: '4', Name: 'Lora', Password: 'Lora1212', Email: 'LoraMaldavkina@gmail.com', Date: '09-08-2016'},
            {Id: '5', Name: 'Maria', Password: 'zaitz', Email: 'Zaitz@gmail.com', Date: '18-03-2017'},
            {Id: '6', Name: 'Belka', Password: 'vaverka', Email: 'vaverka@gmail.com', Date: '02-01-2015'},
            {Id: '7', Name: 'Dita', Password: 'ditaVon', Email: 'DitaVonTeese@gmail.com', Date: '12-01-2015'},
        ]
    };
    new Grid(objForTable);


})();