function lexer(str) {
    let i = 0;
    const tokens = [];

    const keywords = new Set(["let", "if", "else"]);


    /* 主要解析逻辑 
    1. 排除空格
    2.0 获取每个数字
    2. 获取连续数字
    3.0 获取每个字母
    3. 获取连续字母
    3.1 识别关键词
    */

    // 0. 主要解析逻辑
    while (i < str.length) {
        const char = str[i];

        // 1. 排除空格
        if (char === ' ') { i++; continue; }

        /* // 2.0 获取每个数字
        if (char >= '0' && char <= '9') {
            tokens.push({ type: 'Number', value: char });
            i++;
            continue;
        } */

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

        /* // 3.0 获取字母
        if (char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z') {
            tokens.push({type: 'Letter', value: char});
            i++;
            continue;
        } */

        // 3. 获取连续字母
        if (char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z') {
            let word = '';
            while (i < str.length && (str[i] >= 'a' && str[i] <= 'z' || str[i] >= 'A' && str[i] <= 'Z')) {
                word += str[i];
                i++;
            }

            // 3.1 识别关键词
            if (keywords.has(word)) {
                tokens.push({ type: 'Keywords', value: word });
            } else {
                tokens.push({ type: 'Identifier', value: word });
            }
            continue;
        }

        /* 
        单字符运算符：+, -, *, /, %, &, |, ^, ~
        双字符运算符：==, !=, >=, <=, ++, --, +=, -=, *=, /=, %=
        三字符运算符：===, !==
        特殊多字符：**, **=
        */

        // 4. 处理单字符运算符  +, -, *, /, %, &, |, ^, ~
        if (char === '+' || char === '-' || char === '*' || char === '/' ||
            char === '%' || char === '&' || char === '|' || char === '^' ||
            char === '~') {
            tokens.push({ type: 'Operator', value: char })
            i++;
            continue;
        }

        // 4.1 处理 =, ==, === , 优先匹配最长的可能token
        if (char === '=') {
            if (i + 2 < str.length && str[i + 1] === '=' && str[i + 2] === '=') {
                tokens.push({ type: 'Operator', value: '===' });
                i += 3;
            } else if (i + 1 < str.length && str[i + 1] === '=') {
                tokens.push({ type: 'Operator', value: '==' });
                i += 2;
            } else {
                tokens.push({ type: 'Operator', value: '=' });
                i++;
            }
            continue;
        }

        // 4.2 处理 !, !=, !==
        if (char === '!') {
            if (i + 2 < str.length && str[i + 1] === '=' && str[i + 2] === '=') {
                tokens.push({ type: 'Operator', value: '!==' });
                i += 3;
            } else if (i + 1 < str.length && str[i + 1] === '=') {
                tokens.push({ type: 'Operator', value: '!=' });
                i += 2;
            } else {
                tokens.push({ type: 'Operator', value: '!' });
                i++;
            }
            continue;
        }

        // 4.3 处理>, >=
        if (char === '>') {
            if (i + 1 < str.length && str[i + 1] === '=') {
                tokens.push({ type: 'Operator', value: '>=' });
                i += 2;
            } else {
                tokens.push({ type: 'Operator', value: '>' });
                i += 1;
            }
            continue;
        }



        // 处理其他字符
        tokens.push({ type: "Unknown", value: char })
        i++;
    }
    return tokens;
}
console.log(lexer('let n === 5 + 7'));