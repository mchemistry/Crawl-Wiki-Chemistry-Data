
module.exports = {
    /**
     * @param {number} value - as string value need convert to number
     * @return {number} - weight of element in number
     */
    handle_weight: (val) => {
        if(val === null) return null
        return Number(val.substring(0,5))
    },
    handle_oxidation: (val) => {
        if(val === null) return null
        let arr = []
        for(let i = 0; i < val.length; i++) {
            if( val.charAt(i) === '−' || val.charAt(i) === '+' || val.charAt(i) === 0) {
                let temp = val.substring(i,i+2)
                arr.push(temp)
                i++;
            }
        }
        return arr
    },
    handle_structure: (val) => {
        if(val === null) return null
        for(let i = 0; i < val.length; i++) {
            if(val.charAt(i) === '(')
                return val.substring(i+1,i+4)
        }
    },
    covalent_radius : (val) => {
        if(val === null) return null
        let arr = []
        for(let i = 0; i < val.length; i++) {
            let temp = '';
            if( val.charAt(i) > '0' && val.charAt(i) < '9' || val.charAt(i) === '±'){
                for(let j = i; j < val.length; j++) {
                    if(val.charAt(j) === ' ' || val.charAt(j) === ' ' ){
                        i=j;
                        j=val.length-1;
                    }
                    else {
                        temp += val.charAt(j)
                    }
                }
                arr.push(temp)
            }
        }
        return arr
    },
    only_number : (val) => {
        if(val === null) return null;
        return val.replace(/[^0-9.]/gi,'')
    }
}



