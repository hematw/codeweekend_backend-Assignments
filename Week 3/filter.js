function filter(data, filterBy, filterValues) {
    let filteredData = [];
    data.forEach((obj) => {
        if (filterValues) {
            const trimmedValues = filterValues.map(f => f.trim())


            if (filterBy === "courses") {
                const courseMatches = trimmedValues.
                    filter(f => {
                        if (f.length < 3) throw new Error("Please provide 3 or more chars for queries");
                        return f.length >= 3;
                    })
                    .every(course => obj.courses.includes(parseInt(course)));
                    
                if (courseMatches) {
                    filteredData.push(obj);
                }
            } else {
                const regex = new RegExp(trimmedValues.join("|"), "i");
                if (regex.test(obj[filterBy])) {
                    filteredData.push(obj);
                }
            }
        } else {
            filteredData.push(obj);
        }
    });
    return filteredData;
}

module.exports = filter;
