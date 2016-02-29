/*jslint node: true */

'use strict';

module.exports = function(context) {
    var query = context.data.root.query;
    return query.name + query.suffix;
}
