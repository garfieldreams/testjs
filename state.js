function stateMachine(text) {
    // 1. 定义所有可能的状态
    const states = {
        START: 'START',
        NUMBER: 'NUMBER',
        IDENTIFIER: 'IDENTIFIER',
        OPERATOR: 'OPERATOR'
    };
    // 关键字集合
    const keywords = new Set(['let', 'if', 'else', 'function', 'return']);  // 关键字集合
    // 运算符集合
    const operators = new Set([
        '===', '!==', // 三字符
        '==', '>=', '<=', '!=', '&&', '||', '+=', '-=', '*=', '/=', // 双字符
        '=', '+', '-', '*', '/', '>', '<', '!', '&', '|' // 单字符
    ]);

    // %% 空值处理：前置检验
    if (!text || typeof text !== 'string') return [];

    // 2. 初始化状态机的核心变量
    let i = 0;                          // 指针位置
    let currentState = states.START;    // 当前状态
    let tokens = [];                    // 结果收集

    // 3. 状态机主循环
    while (i < text.length) {

        // 核心处理逻辑
        switch (currentState) {
            // 3.0 START 状态：处理类型分流和中转
            case states.START:
                if (/\d/.test(text[i])) {
                    currentState = states.NUMBER;
                } else if (/^[a-zA-Z_$]$/.test(text[i])) {
                    currentState = states.IDENTIFIER;
                } else if (/^[=+>*\/-]/.test(text[i])) {
                    currentState = states.OPERATOR;
                } else {
                    i++;
                }
                break;

            // 3.1 NUMBER 状态处理逻辑
            case states.NUMBER:
                let numToken = '';
                let hasDot = false;  // 判断小数点开关

                while (i < text.length) {
                    if (/\d/.test(text[i])) {
                        numToken += text[i];
                        i++;
                    } else if (text[i] === '.' && !hasDot && i + 1 < text.length && /\d/.test(text[i+1])) {
                        numToken += text[i];
                        hasDot = true;
                        i++;    
                    } else break;
                }
                tokens.push({ type: 'NUMBER', value: numToken });
                currentState = states.START;
                break;

            // 3.2 IDENTIFIER 状态处理逻辑    
            case states.IDENTIFIER:
                let idToken = '';
                while (i < text.length && /^[a-zA-Z0-9_$]$/.test(text[i])) {
                    idToken += text[i];
                    i++;
                }
                // 判断是否为关键字
                const idType = keywords.has(idToken) ? 'KEYWORD' : 'IDENTIFIER';
                tokens.push({ type: idType, value: idToken });
                currentState = states.START;
                break;

            // 3.3 OPERATOR 状态处理逻辑 - 超前扫描 + 最长匹配    
            case states.OPERATOR:
                let opToken = text[i];  // 初始化为当前字符 - 单字符运算符
                // 循环条件：下一个字符存在，且拼接后是合法运算符
                while (i + 1 < text.length) {
                    const op = opToken + text[i + 1];  // 拼接当前运算符 + 下一个字符
                    if (operators.has(op)) {
                        opToken = op;  // 更新为更长的运算符
                        i++;
                    } else break;
                }

                tokens.push({ type: 'OPERATOR', value: opToken });
                i++;
                currentState = states.START;
                break;
        }
    }
    return tokens;
}

console.log(stateMachine('123abc456ui3.145')); // 输出 ['123', 'abc', '456', 'ui', '3.145']
console.log(stateMachine('')); // 输入为空，START直接终止，输出 []
console.log(stateMachine('let age = 18; if (age > 0) { return age; }'));