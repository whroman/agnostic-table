var options = {};
options.paginate = {};
options.paginate.maxRows = 4;
options.rows = [
    {
        name: 'aaa',
        location: 'bbb',
        country: 'ccc'
    },
    {
        name: 'aaa',
        location: 'aab',
        country: 'aac'
    },
    {
        name: 'bba',
        location: 'bbb',
        country: 'bbc'
    },
    {
        name: 'cca',
        location: 'ccb',
        country: undefined
    },
    {
        name: 'aca',
        location: 'aba',
        country: '1c'
    }
];
options.keys = [
    {
        display: 'Name',
        value: 'name'
    },
    {
        display: 'Location',
        value: 'location'
    },
    {
        display: 'Country',
        value: 'country'
    }
];

module.exports = options;
