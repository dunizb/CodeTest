import React from 'react';
import { Anchor } from 'antd';
import { last } from 'lodash';

const { Link } = Anchor;

export interface TocItem {
  anchor: string;
  level: number;
  text: string;
  children?: TocItem[];
}

export type TocItems = TocItem[]; // TOC目录树结构

export default class Tocify {
  tocItems: TocItems = [];

  index: number = 0;

  constructor() {
    this.tocItems = [];
    this.index = 0;
  }

  add(text: string, level: number) {
    const anchor = `toc${level}${++this.index}`;
    const item = { anchor, level, text };
    const items = this.tocItems;

    if (items.length === 0) { // 第一个 item 直接 push
      items.push(item);
    } else {
      let lastItem = last(items) as TocItem; // 最后一个 item

      if (item.level > lastItem.level) { // item 是 lastItem 的 children
        for (let i = lastItem.level + 1; i <= 2; i++) {
          const { children } = lastItem;
          if (!children) { // 如果 children 不存在
            lastItem.children = [item];
            break;
          }

          lastItem = last(children) as TocItem; // 重置 lastItem 为 children 的最后一个 item

          if (item.level <= lastItem.level) { // item level 小于或等于 lastItem level 都视为与 children 同级
            children.push(item);
            break;
          }
        }
      } else { // 置于最顶级
        items.push(item);
      }
    }

    return anchor;
  }

  reset = () => {
    this.tocItems = [];
    this.index = 0;
  };

  renderToc(items: TocItem[]) { // 递归 render
    return items.map(item => (
      <Link key={item.anchor} href={`#${item.anchor}`} title={item.text}>
        {item.children && this.renderToc(item.children)}
      </Link>
    ));
  }

  render() {
    return (
      <Anchor affix showInkInFixed>
        {this.renderToc(this.tocItems)}
      </Anchor>
    );
  }
}
