const path = require('path');
const fs = require('fs');

// babylon 主要就是把源码转化为AST
// @babel/traverse
// @babel/types
// @babel/generator
const babylon = require('babylon');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');
const generator = require('@babel/generator').default;

class Compiler {
    constructor(config) {
        this.config = config;
        // 需要保存入口文件的路径
        this.entryId;
        // 需要保存所有的模块依赖
        this.modules = {};
        this.entry = config.entry;  // 入口路径
        this.root = process.cwd();  // 工作路径
    }
    getSource(modulePath) {
        return fs.readFileSync(modulePath, 'utf-8');
    }
    // 解析源码 AST 解析语法树
    parse(source, parentPath) {
        const ast = babylon.parse(source);
        const dependencies = []; // 依赖的数组
        traverse(ast, {
            CallExpression(p) {
                const node = p.node; // 对应的节点
                if(node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value; // 取到的就是模块的引用名
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
                    moduleName = './' + path.join(parentPath, moduleName); // 'src/a.js'
                    dependencies.push(moduleName);
                    node.arguments = [types.stringLiteral(moduleName)];
                }
            }
        });
        const sourceCode = generator(ast).code;
        return {
            sourceCode,
            dependencies
        }
    }
    buildModule(modulePath, isEntry) {
        // 拿到模块的内容
        const source = this.getSource(modulePath);
        // 模块id modulePath = modulePath - this.root src/index.js
        const moduleName = './' + path.relative(this.root, modulePath);
        
        if(isEntry) {
            this.entryId = moduleName;  // 保存入口的名字
        }

        // 接续需要吧source源码进行改造，返回一个依赖列表  
        const { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));
        console.log(sourceCode, dependencies)
        // 把相对路径和模块中的内容对应起来
        this.modules[modulePath] = sourceCode;

        dependencies.forEach(dep => {   // 附模块的加载 递归加载
            this.buildModule(path.join(this.root, dep), false);
        });
    }

    emitFile() {
        // 用数据渲染我们的模板
        
    }

    run() {
        // 执行，并创建模块的依赖关系
        this.buildModule(path.resolve(this.root, this.entry), true);
        console.log(this.modules, this.entryId)
        // 生成打包后的文件
        this.emitFile();
    }
}

module.exports = Compiler;