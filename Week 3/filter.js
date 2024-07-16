
module.exports = function filter(data, filterBy, filterValues) {
    let filteredData = []
    data.forEach((obj) => {
        if (filterValues) {
            const trimmedValues = filterValues.map(f => f.trim())
            const regex = new RegExp(trimmedValues.join("|"), "i")
            if (regex.test(obj[filterBy])) {
                filteredData.push(obj);
            }
        } else {
            filteredData.push(obj);
        }
    });
    return filteredData
}
