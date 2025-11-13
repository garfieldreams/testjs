> 1.  指针的初始化与边界控制
    - 初始化：指针从源代码字符串的起始位置（i = 0）开始，标志分析的起点。
    - 边界判断：始终通过 i < code.length 检查是否已扫描完所有字符，避免越界访问（如读取 code[i] 时确保 i 有效）。
    - 结束条件：当 i 等于源代码长度时，扫描终止，所有 token 提取完成。

>  2. 指针的基础移动：逐字符推进
    - 单步移动：匹配单个字符（如 +、;、空格）后，指针递增（i++），确保每次只处理一个字符。
    - 跳过无意义字符：遇到空格（）、制表符（\t）、换行（\n）等分隔符时，直接移动指针（不生成 token），避免干扰有效 token 的识别。

词法分析基本结构：核心就是 - 指针初始化 → 循环扫描 → 收集结果

```javascript
function tokenize(text){
	let i = 0;  // 1. 初始化指针 - 从0开始
	const tokens = [];  // 2. 用于保存解析出的token
	
	// 3. 解析逻辑 - 循环扫描：只要指针没到字符串末尾，就持续处理
	while(){}
	
	return tokens;  // 4. 返回所有解析出的token
}
```

解析逻辑：while循环扫描
// 3. 解析逻辑
```javascript
while(i < text.length){  // 先确定扫描边界
	const currentChar = text[i];  // 获取当前指针指向的字符
	
	// 3.1 跳过空格
	if (currentChar === ' '){
		i++;  // 指针移动，跳过空格;
		continue;  // 跳过空格后，进入到下一轮循环
	}
	
	// 3.1.0 暂时将其他字符作为普通token处理
	tokens.push({type: 'Unknown', value: currentChar});
	i++;  // 指针移动到下一个字符; 
}
```

示例：解析数字
```javascript
// 3.2 数字解析逻辑
if (currentChar >= '0' && currentChar <= '9'){
	const num = text[i];  // 获取当前数字
	
	while (i < text.length && text[i] >= '0' && text[i] <= '9'){
		num += text[i];  // 将当前指针指向的字符 text[i] 拼接到字符串 num 的末尾
		i++; 
	}
	
	// 3.2.0 保存解析到的数字
	tokens.push({type: 'Number', value: num});
	continue; // 解析完数字后，直接进入下一轮循环
}
```