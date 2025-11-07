function lexer(str) {
    let i = 0;
    const tokens = [];

    while (i < str.length) {
        const char = str[i];

        // 1. 排除空格
        if (char === ' ') { i++; continue; }

        // 2. 获取数字 / 连续数字 
        if (char >= '0' && char <= '9') {
            let numStr = '';
            while (i < str.length && str[i] >= '0' && str[i] <= '9') {
                numStr += char;
                i++
            }
            tokens.push({ type: 'Number', value: numStr })
            continue;
        }

        tokens.push({ type: 'Symbol', value: char }) // 封装成 tokens 对象数组
        i++;
    }

    return tokens;
}
console.log(lexer('let n = 5 + 7'));