function stateMachine(text){
    // 1. 定义所有可能的状态
    const states = {
        START: 'START',
        NUMBER: 'NUMBER',
        WORD: 'WORD'
    };

    // %% 空值处理：前置检验
    if (!text || typeof text !== 'string') return [];

    // 2. 初始化状态机的核心变量
    let i = 0;                          // 指针位置
    let currentState = states.START;    // 当前状态
    let tokens = [];                    // 结果收集

    // 3. 状态机主循环
    while(i < text.length){
    
        // 3.0 核心处理逻辑
        switch(currentState){
            // 3.0.0 START 状态：处理类型分流和中转
            case states.START:
                if(/\d/.test(text[i])){
                    currentState = states.NUMBER;
                } else if (/[a-zA-Z]/.test(text[i])){
                    currentState = states.WORD;
                } else {
                    i++;
                }
                break;

            // 3.0.1 NUMBER 状态处理逻辑
            case states.NUMBER:
                let numToken = '';
                while(i < text.length && /\d/.test(text[i])){
                    numToken += text[i];
                    i++;
                }
                tokens.push({type: 'NUMBER', value: numToken});
                currentState = states.START;
                break;

            // 3.0.2 WORD 状态处理逻辑    
            case states.WORD:
                let wordToken = '';
                while(i < text.length && /[a-zA-Z]/.test(text[i])){
                    wordToken += text[i];
                    i++;
                }    
                tokens.push({type: 'WORD', value: wordToken});
                currentState = states.START;
                break;  
        }
    }
    return tokens;
}

console.log(stateMachine('123abc456ui')); // 输出 ['123', '456']
console.log(stateMachine('')); // 输入为空，START直接终止，输出 []