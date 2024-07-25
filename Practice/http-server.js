const fs = require("fs")
const http = require("http")

const path = "./createdFiles/new-big.txt"

const ws = WritableStream("")

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        const myFs = fs.createReadStream('./createdFiles/big.txt', "utf8")

        res.setHeader("content-type", "text/html")
        myFs.on('open', () => {
            myFs.pipe(path)
            // myFs.pipe(res)
        })
        res.end(`<h2>You are the first here</h2>`)
    }
})



server.listen(3000, () => {
    console.log("server is running in port 3000")
})