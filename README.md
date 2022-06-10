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