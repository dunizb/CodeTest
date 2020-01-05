const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

/**
 * 一、分析入口文件
 * @param {*} filename 
 */
const moduleAnayser = (filename) => {
    // 1. 拿到文件代码
    const content = fs.readFileSync(filename, 'utf-8')
    // console.log(content)

    // 2.借助 @babel/parser 拿到AST
    const ast = parser.parse(content, {
        sourceType: 'module'
    })
    // console.log(ast.program)

    // 3. 再利用 @babel/traverse 拿到AST里面的type: 'ImportDeclaration'的内容，拿到依赖
    const dependencies = {} // 存放所有依赖
    traverse(ast, {
        ImportDeclaration({ node }) {
            // 3.1 处理相对路径为绝对路径
            const dirname = path.dirname(filename)
            // console.log(dirname) // ./src
            const newFile = './' + path.join(dirname, node.source.value)
            dependencies[dirname, node.source.value] = newFile
        }
    })
    // console.log(dependencies) // { './message.js': './src/message.js' }

    // 4. 利用 @babel/core,@babel/preset-env 转化为浏览器可以运行的代码
    const { code } = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    })
    // console.log(code)

    return {
        filename,
        dependencies,
        code
    }
}

/**
 * 二、依赖图谱分析，针对所有文件
 * @param {*} entry 
 */
const makeDependenciesGraph = (entry) => {
    const entryModule = moduleAnayser(entry)
    const graphArray = [entryModule]
    for (let i = 0; i < graphArray.length; i++) {
        const item = graphArray[i];
        const { dependencies } = item;
        if(dependencies) {
            for (const key in dependencies) {
                graphArray.push(moduleAnayser(dependencies[key]));
            }
        }
    }

    const graph = {};
    graphArray.forEach(item => {
        graph[item.filename] = {
            dependencies: item.dependencies,
            code: item.code
        }
    })

    return graph;

}

/**
 * 三、生成代码
 * @param {*} entry 
 */
const generatorCode = (entry) => {
    const graph = JSON.stringify(makeDependenciesGraph(entry));
    return `
        (function(graph){
            function require(module) {
                function localReuire(relativePath) {
                    return require(graph[module].dependencies[relativePath])
                }
                var exports = {};
                (function(require, code){
                    eval(code);
                })(localReuire, graph[module].code);
                return exports;
            }
            require('${entry}');
        })(${ graph });
    `;
}

const code = generatorCode('./src/index.js')
console.log(code)