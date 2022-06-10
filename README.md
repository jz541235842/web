pnpm  add router@4

<!-- git提交代码规范 -->
pnpm  install  -g commitizen@4.2.4

pnpm  add cz-customizable@6.3.0  --D

2.在package.json中新增
"config":{
    "commitizen":{
        "path":"node_modules/cz-customizable"
    }
}


    "useTabs": false,
    "tabWidth": 2,
    "printWidth": 120,
    "singleQuote": true,
    "trailingComma": "none",
    "bracketSpacing": true,
    "semi": false,
    "htmlWhitespaceSensitivity": "ignore"

     [{ value: 'feat',name: 'feat:新功能' },
        { value: 'fix', name: 'fix:修复' },
        {value: 'docs', name: 'docs:     文档变更' },
        { value: 'style',  name: 'style:    代码格式(不影响代码运行的变动)' },
        {  value: 'refactor', name: 'refactor: 重构(既不是增加feature，也不是修复bug)' },
        {value: 'perf', name: 'perf:     性能优化' },
        { value: 'test',name: 'test:     增加测试'},
        { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
        {  value: 'revert', name: 'revert:   回退' },
        {  value: 'build',   name: 'build:    打包' }
    ],