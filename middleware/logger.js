module.exports = () => {
    return (req, res, next) => {
        console.log(`${req.method} ${req.url} ${Date.now()}`)
        next()
    }
}