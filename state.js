const STATES = {
    INIT: 'INIT',
    IN_STRING: 'IN_STRING',
    IN_ESCAPE: 'IN_ESCAPE',
};

function parseString(input) {
    let state = STATES.INIT;
    let result = '';
    let quoteType = null;

    for (const char of input) {
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
               if(char === '\\'){
                state = STATES.IN_ESCAPE;
               } else if (char === quoteType){
                // 遇到结束引号，解析完成（退出循环）
                return result;
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

    // 回到初试状态
    if(state !== STATES.INIT){
        throw new Error('字符串缺少闭合引号');
    }
    return result;
}

console.log(parseString("'a\\b'"));