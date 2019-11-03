
function* fb() {
    var previous_first = 0, previous_second = 1, next = 1
    
    while(true) {
        next = previous_first + previous_second
        previous_first = previous_second
        previous_second = next
        
        yield next
    }

}

const f = fb()

const functions = {
    add: (a, b) => a + b,
    fiboList: (val, count) => {
            let cache = []
            for (let val=0; val < count; val++){
                        val = f.next().value
                        cache.push(val)
                    }
    return cache.includes(val)                          
    }
}



module.exports = functions