'use strict';

require('./services/database');
require('./services/current-user');

require('./layouts/main/main');

module.exports =  require('./module').name;