/* Generator
普通函数：一次调用，一次跑完，只能返回一个值。
生成器函数：一次调用，返回一个迭代器，你可以多次“要”值，它按需“给”值，给完还能暂停/恢复。
*/

/*  1. 基本语法
定义： function*
关键字：yield
调用方法： next()
返回值： {value: undefined, done: boolean}
 */
function* gen() { } // 生成器函数声明
const g = gen(); // 调用后得到“迭代器对象”
console.log(g) // {[[GeneratorState]]: 'suspended'}

function* counter() {
    yield 1; // 第一次调用 next() 会停在这里，返回 1
    yield 2; // 第二次调用 next() 会停在这里，返回 2
    yield 3; // 第三次调用 next() 会到这里，返回 3 并 done: true
}

// 2. 迭代器协议
function* hello() {
    yield 'hello';
    yield 'world';
    return '!'; // return 结束 done: true
}
// const it = hello();
for (const v of hello()) {
    console.log(v); // 只会打印 hello 和 world，return 的值不参与循环
}
// console.log(it.next()); // {value: 'hello', done: false}
// console.log(it.next()); // {value: 'world', done: false}
// console.log(it.next()); // {value: '!', done: false}

// 3. 双向通信 -- next传参
function* echo() {
    const a = yield '第一次我出去';
    console.log('生成器内部收到：', a);
    const b = yield '第二次我出去';
    console.log('生成器内部收到：', b);
}

const it = echo();
console.log(it.next()); // {value: '第一次我出去', done: false}
console.log(it.next('苹果')); // 苹果 被当成上一次 yield 的返回值
console.log(it.next('香蕉'));

// 4. 自增ID生成器
function* idMaker() {
    let id = 1;
    while (true) { // 生成器不怕死循环，因为会暂停
        yield id++;
    }
}

const ids = idMaker();
console.log(ids.next().value); // 每次调用next()都得到一个比上次大1的序号，从1开始，无限序列
console.log(ids.next().value);

// 5. yield* 委托
function* foo() {
    yield 1;
    yield 2;
}

function* bar() {
    yield 0;
    yield* foo(); // 把迭代权交给foo, 全部跑完再回到bar
    yield 3;
}

console.log([...bar()]);

// 6. 错误处理
// throw(e) 把异常扔进生成器，可以在内部 try/catch
// return(v) 强制终结生成器，返回 {value: v, done: true}

function* mayFail() {
    try {
        yield 1;
        yield 2;
    } catch (e) {
        console.log('生成器里捕获到:', e);
    }
    yield 3;
}

const r = mayFail();
console.log(r.next());
r.throw('出错啦');
console.log(r.next());

function* range(start, end){
    for (let i = start; i <= end; i++){
        yield i;
    }
}

const numberRange = range(1, 5);
for (let num of numberRange){
    console.log(num);
}