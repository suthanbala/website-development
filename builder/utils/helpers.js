const isProduction = () => process.env.NODE_ENV !== 'development';

module.exports = {
    isProduction
}