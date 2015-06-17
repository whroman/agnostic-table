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
        value: 'name',
        filter: true
    },
    {
        display: 'Location',
        value: 'location',
        filter: true
    },
    {
        display: 'Country',
        value: 'country',
        filter: true
    },
    {
        display: 'Links',
        value: 'links'
    }
];

module.exports = options;
