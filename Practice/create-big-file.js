const fs = require("fs")

fs.mkdir("./createdFiles", () => {
    for (let i = 0; i < 10000; i++) {
        fs.writeFileSync("./createdFiles/big.txt", `I am in the line ${i}\n`, { flag: 'a' })
    }
})

