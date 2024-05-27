/**
 * Redux store configuration.
 * Require and export different files for production and development.
 */
module.exports = process.env.NODE_ENV === 'production' ? require('./prod') : require('./dev')

