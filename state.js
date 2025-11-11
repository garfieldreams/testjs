const STATES = {
    INIT: 'INIT',
    IN_STRING: 'IN_STRING',
    IN_ESCAPE: 'IN_ESCAPE',
    DONE: 'DONE'
};

function parseString(input) {
    let state = STATES.INIT;
    let result = '';
    let quoteType = null;

    for (const char of input) {
        // 如果循环完成，则提前退出
        if(state === STATES.DONE){
            break;
        }

        switch (state) {
            case STATES.INIT:
                // 初试状态：遇到引号则进入字符串状态
                if (char === "'" || char === '"') {
                    quoteType = char;
                    state = STATES.IN_STRING;
                } else {
                    throw new Error('字符串必须以单引号或者双引号开头')
                }
                break;

            case STATES.IN_STRING:
                // 遇到转义符，进入转义状态
                if (char === '\\') {
                    state = STATES.IN_ESCAPE;
                } else if (char === quoteType) {
                    // 标记为完成状态
                    state = STATES.DONE;
                } else {
                    // 普通字符，直接加入结果
                    result += char;
                }
                break;

            case STATES.IN_ESCAPE:
                // 转义状态： 直接加入结果，然后回到字符串状态
                result += char;
                state = STATES.IN_STRING;
                break;
        }
    }

    // 统一的状态检查
    if (state === STATES.INIT) {
        throw new Error('字符串必须以单引号或者双引号开头');
    } else if (state !== STATES.DONE){
        throw new Error('字符串缺少闭合引号')
    }
    return result;
}

console.log(parseString("'a\\b'"));