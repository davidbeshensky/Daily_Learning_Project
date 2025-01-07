class Solution {

    //basic idea of this solution is to take the 
    //base string array and encode it into a string by storing the 
    //length of each string in order separated by commas
    //and then ending this number string witha  # to denote the 
    //encoded lenght info is over, lastly we concatenate all the strings sequentially after the #

    //now we can decode this string because the string itself
    //contains all of the information that we need to sole the problem
    //simply generate a sizes array with a while loop 
    //and then loop through sizes since that is the total number of strings
    //and finally take substrings from i -> the curr element of the sizes array
    //this will take a substring from the string from the first letter after # + sz. 
    //store these results in res and profit.
    encode (strs) {
        if (strs.length === 0) return "";
        let sizes = [], res = "";
        for (let s of strs) {
            sizes.push(s.length);
        }

        for (let sz of sizes) {
            res += sz + ','
        }

        res += '#'

        for (let s of strs) {
            res += s;
        }
        return res;
    }

    decode(str) {
        if (str.length === 0) return [];

        let sizes = [], res = [], i = 0;
        while (str[i] !== '#') {
            let cur = "";
            while (str[i] !== '#') {
                cur += str[i];
                i++;
            }
            sizes.push(parseInt(cur));
            i++;
        }
        i++

        for (let sz of sizes) {
            res.push(str.substr(i, sz));
            i+= sz;
        }
    }
}