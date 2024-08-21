module.exports = function notFound(req, res) {
    res.status(404).json({msg: "Requested source NOT found!"})
}