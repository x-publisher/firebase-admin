export default [
  {
    ref: 'bottles',
    columns: [
      {
        name: 'id',
        type: 'id'
      }, {
        name: 'image',
        type: 'image'
      }, {
        name: 'name',
        type: 'string'
      }, {
        name: 'size',
        type: 'number'
      }, {
        name: 'cost',
        type: 'number'
      }, {
        name: 'status',
        type: 'boolean'
      }, {
        name: 'price',
        type: 'number'
      }, {
        name: 'ownerId',
        type: 'string'
      }
    ]
  }, {
    ref: 'clubs',
    columns: [
      {
        name: 'id',
        type: 'id'
      }, {
        name: 'displayname',
        type: 'string'
      }, {
        name: 'image',
        type: 'image'
      }, {
        name: 'city',
        type: 'string'
      }, {
        name: 'desc',
        type: 'string'
      }
    ]
  }, {
    ref: 'tables',
    columns: [
      {
        name: 'id',
        type: 'id'
      }, {
        name: 'image',
        type: 'image'
      }, {
        name: 'name',
        type: 'string'
      }, {
        name: 'price',
        type: 'number'
      }, {
        name: 'desc',
        type: 'string'
      }, {
        name: 'numOfTablesTotal',
        type: 'number'
      }, {
        name: 'numOfTablesAvail',
        type: 'number'
      }, {
        name: 'seats',
        type: 'number'
      }, {
        name: 'bottlesIncluded',
        type: 'number'
      }, {
        name: 'ownerId',
        type: 'string'
      }
    ]
  }, {
    ref: 'tickets',
    columns: [
      {
        name: 'id',
        type: 'id'
      }, {
        name: 'name',
        type: 'string'
      }, {
        name: 'numOfTicketsTotal',
        type: 'number'
      }, {
        name: 'active',
        type: 'boolean'
      }, {
        name: 'desc',
        type: 'string'
      }, {
        name: 'price',
        type: 'number'
      }, {
        name: 'ownerId',
        type: 'string'
      }
    ]
  }, {
    ref: 'users',
    columns: [
      {
        name: 'id',
        type: 'id'
      }, {
        name: 'username',
        type: 'string'
      }, {
        name: 'email',
        type: 'string'
      }, {
        name: 'city',
        type: 'string'
      }, {
        name: 'usertype',
        type: 'string'
      }, {
        name: 'objectId',
        type: 'string'
      }
    ]
  }, {
    ref: 'cities',
    columns: [
      {
        name: 'id',
        type: 'id'
      }, {
        name: 'displayname',
        type: 'string'
      }, {
        name: 'image',
        type: 'image'
      }, {
        name: 'location',
        type: 'string'
      }, {
        name: 'state',
        type: 'string'
      }, {
        name: 'objectId',
        type: 'string'
      }
    ]
  }, {
    ref: 'events',
    columns: [
      {
        name: 'id',
        type: 'id'
      }, {
        name: 'title',
        type: 'string'
      }, {
        name: 'address',
        type: 'string'
      }, {
        name: 'city',
        type: 'string'
      }, {
        name: 'desc',
        type: 'string'
      }, {
        name: 'start',
        type: 'string'
      }, {
        name: 'end',
        type: 'string'
      }, {
        name: 'tablesAvailable',
        type: 'boolean'
      }, {
        name: 'ticketsAvailable',
        type: 'boolean'
      }, {
        name: 'ownerID',
        type: 'string'
      }, {
        name: 'objectId',
        type: 'string'
      }
    ]
  }
]
