import React from 'react';
import { Card, Button, Tabs, message } from 'antd';

import {
    PlusOutlined, EditOutlined, DeleteOutlined
} from '@ant-design/icons';

import "./ui.less";

const { TabPane } = Tabs;

// function callback(key) {
//     message.info(key);
// }

export default class TabUi extends React.Component {

    newTabIndex = 0;

    handleCallback = (key) => {
        message.info('Hi 您当前选择页签为：' + key);
    }

    componentWillMount() {
        const panes = [
            {
                title: 'Tab 1',
                content: 'Tab 111',
                key: '1'
            },
            {
                title: 'Tab 2',
                content: 'Tab 222',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'Tab 333',
                key: '3'
            }
        ]
        this.setState({
            panes
        })
    }

    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({
            panes: newPanes,
            activeKey,
        });
    };

    remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        this.setState({
            panes: newPanes,
            activeKey: newActiveKey,
        });
    };

    render() {
        return (
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="2" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">欢迎练级</TabPane>
                        <TabPane tab="Tab 2" key="2">欢迎练级</TabPane>
                        <TabPane tab="Tab 3" key="3" disabled>欢迎练小号</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图标页签" className="card-wrap">
                    {/* <Tabs defaultActiveKey="2" onChange={callback}> */}
                    <Tabs defaultActiveKey="6" onChange={this.handleCallback}>
                        <TabPane
                            tab={
                                <span>
                                    <PlusOutlined />
                              新增
                            </span>
                            }
                            key="4"
                        >添加内容</TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <EditOutlined />
                              修改
                            </span>
                            }
                            key="5"
                        >修改内容</TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <DeleteOutlined />
                              删除
                            </span>
                            }
                            key="6"
                        >删除内容</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs
                        onChange={this.onChange}
                        activeKey={this.setState.activeKey}
                        onChange={this.handleCallback}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((panel) => {
                                return <TabPane
                                    tab={panel.title}
                                    key={panel.key}
                                >
                                    {panel.content}
                                </TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        );
    }
}