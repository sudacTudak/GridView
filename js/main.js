const dataExample = [
    {
        film: '<b>Avengers</b>',
        date: '2012',
        genre: 'Fantastic',
    },
    {
        film: 'Spider-Man: No Way Home',
        date: '2021',
        genre: 'Fantastic'
    },
    {
        film: '1 + 1',
        date: '2011',
        genre: 'Comedy, Drama',
    },
    {
        film: 'The Pursuit of Happyness',
        date: '2006',
        genre: 'Drama'
    }
];

const GV = new GridView();
GV.setTitle('Popular Films');
GV.setTitleClasses(['title-table']);
GV.setTableClasses(['grid-view']);
GV.setElementOutput('.table-wrapper');
GV.data = dataExample;
GV.attributes = {
    "film": {
        label: 'Фильм',
        html: true,
    },

    "date": {
        label: 'Дата выпуска',
    },
    "genre": {
        label: 'Жанр'
    },
}
GV.render();

console.log(GV);