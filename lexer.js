function lexer(str) {
    let i = 0;
    const tokens = [];

    // 多字符运算符查找表
    const operators = new Set([
        '===', '!==', '==', '!=', '++', '--', '+=', '-=', '*=', '/=', '%=',
        '&&', '||', '&=', '|=', '<<', '>>', '<=', '>=', '=>', '->',
        '=', '!', '+', '-', '*', '/', '%', '&', '|', '<', '>'
    ]);

    whileLoop: while (i < str.length) {
        const char = str[i];

        // 1. 排除空格
        if (char === ' ') { i++; continue; }

        // 2. 获取数字 / 连续数字 
        if (char >= '0' && char <= '9') {
            let numStr = '';
            while (i < str.length && str[i] >= '0' && str[i] <= '9') {
                numStr += str[i];
                i++;
            }
            tokens.push({ type: 'Number', value: numStr })
            continue;
        }

        //  3. 通过查找表匹配运算符 
        for (let len = 3; len >= 1; len--) {
            const candidate = str.slice(i, i + len);
            if (operators.has(candidate)) {
                tokens.push({ type: 'Operator', value: candidate});
                i+= len;
                continue whileLoop;
            }
        }

        tokens.push({ type: 'Symbol', value: char }) // 封装成 tokens 对象数组
        i++;
    }

    return tokens;
}
console.log(lexer('let n === 5 + 7'));