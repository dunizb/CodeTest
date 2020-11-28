import { createWebHashHistory, createRouter } from 'vue-router'

import Home from './views/Home.vue'
import Doc from './views/Doc.vue'
import Markdown from './components/Markdown.vue'

import SwitchDemo from './components/SwitchDemo.vue'
import ButtonDemo from "./components/ButtonDemo.vue";
import DialogDemo from "./components/DialogDemo.vue";
import TabsDemo from "./components/TabsDemo.vue";
import intro from "./markdown/intro.md"
import getStarted from "./markdown/getStarted.md"
import install from "./markdown/install.md"

import { h } from 'vue';

const history = createWebHashHistory()
const md = string => h(Markdown, { key: string, content: string })

export const router = createRouter({
  history,
  routes: [
    { path: '/', component: Home },
    { 
      path: '/doc', 
      component: Doc, 
      children: [
        { path: "", redirect: '/doc/intro' },
        { path: "intro", component: md(intro) },
        { path: "get-started", component: md(getStarted) },
        { path: "install", component: md(install) },
        { path: "switch", component: SwitchDemo },
        { path: "button", component: ButtonDemo },
        { path: "dialog", component: DialogDemo },
        { path: "tabs", component: TabsDemo },
      ] 
    },
  ]
})
