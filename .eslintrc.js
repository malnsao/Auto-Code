module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: 'eslint-config-umi',
  rules: {
    /* ECMAScript 6 */
    // 强制函数入参使用rest而不是arguments
    'prefer-rest-params': ['error'],
    // 禁止模板字符串括号内使用空格
    'template-curly-spacing': ['error'],
    // 强制使用模板字符串
    'prefer-template': ['error'],
    // 访问变量属性强制使用解构
    'prefer-destructuring': ['error'],
    // 禁止使用var声明变量
    'no-var': ['error'],
    // 禁止使用不必要的计算属性作为键名
    'no-useless-computed-key': ['error'],
    // 禁止重复导入
    'no-duplicate-imports': ['error'],
    // 强制箭头函数箭头前后使用空格
    'arrow-spacing': ['error'],
    // 强制箭头函数单个参数必须添加括号
    'arrow-parens': ['error'],
    // 箭头函数的规范(单个语句不必使用花括号，返回省略写法)
    'arrow-body-style': ['error'],
    /* Stylistic Issues */
    // 强制数组换行（如果元素内部或元素之间存在换行符，则需要换行符。如果为假，则禁用此条件）
    'array-bracket-newline': ['error', { multiline: true }],
    // 禁止在数组内容前后添加空格
    'array-bracket-spacing': ['error', 'never'],
    // 强制括号前后添加的空格相等
    'block-spacing': ['error', 'always'],
    // 强制使用一种花括号样式
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    // 强制在逗号之后添加空格
    'comma-spacing': ['error', { before: false, after: true }],
    // 强制在数组元素，对象属性或变量声明的同一行之后和同一行需要逗号
    'comma-style': ['error'],
    // 禁止函数名称和左括号之间使用空格
    'func-call-spacing': ['error'],
    // 函数返回格式化
    'implicit-arrow-linebreak': ['error'],
    // 强制所有的jsx属性使用双引号
    'jsx-quotes': ['error', 'prefer-double'],
    // 强制对象的书写形式(冒号前不能有空格，冒号后只能有一个空格)
    'key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
    // 强制关键字前后必须有一个空格
    'keyword-spacing': ['error', { before: true, after: true }],
    // 强制类的成员中间用空行隔开
    'lines-between-class-members': ['error'],
    // 强制代码块嵌套的深度不超过5层
    'max-depth': ['error', 5],
    // 禁止if语句是else块中的唯一语句
    'no-lonely-if': ['error'],
    // 强制连续使用的最大空行和文件末尾为1
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    // 禁止if 三元的否定条件
    // 'no-negated-condition': ['error'],
    // 禁止使用三元替换简单表达式
    'no-unneeded-ternary': ['error'],
    // 禁止访问对象属性时句号前使用空格
    'no-whitespace-before-property': ['error'],
    // 禁止在使用条件语句时，单行语句换行
    'nonblock-statement-body-position': ['error'],
    // 强制定义字符串时只能使用单引号
    quotes: ['error', 'single'],
    // 强制在分号后使用空格，分号前不能使用
    // 'semi-spacing': ['error', {before: false, after: true}],
    semi: ['error', 'always'],
    // 强制在括号大括号前后使用一致的空格
    'space-before-blocks': ['error', 'always'],
    // 禁止申明函数时括号前的空格
    'space-before-function-paren': ['error', 'always'],
    // 禁止括号内前后使用空格
    'space-in-parens': ['error'],
    // 强制运算符前后使用空格
    'space-infix-ops': ['error'],
    // 强制注释符号后应该有一个空格
    'spaced-comment': ['error', 'always', { block: { balanced: true } }],
    // 强制switch语句冒号后必须有一个空格
    'switch-colon-spacing': ['error', { after: true, before: false }],
    // 不允许在标记函数及其模板文字之间使用空格
    'template-tag-spacing': ['error'],
    // 强制直接使用正则时必须用括号包装
    'wrap-regex': ['error'],
    // 禁止变量函数在定义前使用
    'no-use-before-define': ['error'],
    // 异步函数必须使用await
    'require-await': ['error'],
    // 禁止多余的return语句
    'no-useless-return': ['error'],
    // 禁止else块里面不必要的return语句
    'no-else-return': ['error', { allowElseIf: true }],
    // 强制使用===和!==
    eqeqeq: ['error'],
    // 强制switch语句有default选项或者有 // no default 注释
    'default-case': ['error'],
    // 强制所有的if语句都必须大括号
    curly: ['error', 'all'],
    // 强制在数组回调方法里面使用return语句
    'array-callback-return': ['error'],
    // 禁止循环内使用awuait
    'no-await-in-loop': ['error'],
    'prefer-const': 'error',
    'no-new-wrappers': 'error',
    indent: ['error', 2],
    'no-eval': 'error',
    // 'id-length': 'error', // 避免用一个字母命名
    camelcase: 'error', // 用小驼峰命名法来命名你的对象、函数、实例
    'new-cap': 'error', // 用大驼峰命名法来命名类
    'no-underscore-dangle': 'error', // 不要用前置或后置下划线
    'eol-last': ['error', 'always'], // 文件结尾空一行
    'padded-blocks': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'], // 花括号里要加空格
    'max-len': ['error', { code: 120 }],
    'react/jsx-curly-spacing': 'error', // jsx里的大括号不要空格
    'react/jsx-closing-bracket-location': 'error', // 闭合标签作为结束行
    'react/jsx-closing-tag-location': 'error', // 结束标签校验
    'react/jsx-tag-spacing': 'error', // 标签内空一格

  },
};
