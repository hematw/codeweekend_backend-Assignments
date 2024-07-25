const events = require("events");


const e = new events();


// e.on("wow", () => {
    //     console.log("wow what a awesome project")
    // })
    
    
    e.once("wow", () => {
        console.log("I am inside once method block")
    })
    
    e.emit("wow")
    e.emit("wow")
        














        // function myFunc() {
        //     return new Promise((resolve, reject) => {
        //         if (true) {
        //             setTimeout(() => {
        //                 console.log("how you learn JS. ")
        //                 resolve("resolved")
        //             }, 3000)
        //         } else {
        //             reject("rejected")
        //         }
        //     })
        // }
        
        // async function mySec() {
        //     myFunc().then(X => console.log(X))
        //     console.log("hello async learners")
        // }
        
        // mySec()
        // console.log("i am after mySEC")