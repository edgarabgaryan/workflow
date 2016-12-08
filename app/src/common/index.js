'use strict';

require('./services/database');
require('./services/current-user');

require('./layouts/main/main');

require('./components/login/login');

module.exports =  require('./module').name;