function lexer(str) {
    let i = 0;
    while (i < str.length) {

        // 1. 排除空格
        if (str[i] === ' ') { i++; continue;}
    
        console.log(str[i]);
        i++;
    }
}
lexer('5 + 7');