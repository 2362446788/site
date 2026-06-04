module.exports = {
  // 一行最多 120 个字符
  printWidth: 120,
  // 缩进宽度为 2 个空格
  tabWidth: 2,
  // 使用空格缩进，不使用 tab
  useTabs: false,
  // 语句末尾保留分号
  semi: true,
  // JavaScript / TypeScript 使用单引号
  singleQuote: true,
  // 仅在必要时给对象 key 加引号
  quoteProps: 'as-needed',
  // JSX 属性仍使用双引号
  jsxSingleQuote: false,
  // 尽可能保留尾逗号，便于 diff 和追加字段
  trailingComma: 'all',
  // 对象字面量花括号内保留空格
  bracketSpacing: true,
  // JSX 结束尖括号单独换行
  bracketSameLine: false,
  // 箭头函数即使只有一个参数也保留括号
  arrowParens: 'always',
  // 从文件起始开始格式化
  rangeStart: 0,
  // 一直格式化到文件末尾
  rangeEnd: Infinity,
  // 不要求文件内显式添加 @prettier 标记
  requirePragma: false,
  // 不自动插入 @prettier 标记
  insertPragma: false,
  // Markdown 文本按原有换行保留
  proseWrap: 'preserve',
  // HTML 空白敏感度跟随 CSS 显示行为
  htmlWhitespaceSensitivity: 'css',
  // 统一使用 LF 换行
  endOfLine: 'lf',
};
