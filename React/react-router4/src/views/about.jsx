import React, { Component }  from 'react'

export default class About extends Component {
    render() {
        return (
            <div>
                <h3>这里是<span style={{color: 'red'}}>About</span>组件</h3>
                <pre>
                    {
                        "import React, { Component }  from 'react'\n"+
                        'export default class About extends Component { \n'+
                            '\trender() {\n'+
                                '\t\treturn (\n'+
                                    '\t\t\t<div>\n'+
                                        "\t\t\t\t<h3>这里是<span style={{color: 'red'}}>About</span>组件</h3>\n"+
                                    '\t\t\t</div>\n'+
                                '\t\t)\n'+
                            '\t}\n'+
                        '}\n'
                    }
                </pre>
            </div>
        )
    }
}