function lexer(str) {
    let i = 0;
    while (i < str.length) {
        if (str[i] !== ' ') { // 排除空格
            console.log(str[i]);
        }
        i++;
    }
}
lexer('5 + 7');