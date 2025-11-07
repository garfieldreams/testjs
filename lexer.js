function lexer(str) {
    let i = 0;
    while (i < str.length) {

        // 1. 排除空格
        if (str[i] === ' ') { i++; continue;}
    
        // 2. 获取数字 / 连续数字 
        if (str[i] >= '0' && str[i] <= '9'){
            let numStr = '';
            while (i < str.length && str[i] >= '0' && str[i] <= '9'){
                numStr =+ str[i];
                i++
            }
            console.log(numStr);
            continue;
        }

        console.log(str[i]);
        i++;
    }
}
lexer('let n = 5 + 7');