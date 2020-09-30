import React from 'react';
import { Button, Card, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import "./ui.less";

const openNotification = (type, direction) => {
    if (direction) {
        notification.config({
            placement: direction
        })
    }
    
    notification[type]({
        message: '通知提醒标题',
        description:
            '这里是标准通知提醒',
    });
};

const openNotificationWithIcon = (type, direction) => {
    if (direction) {
        notification.config({
            placement: direction
        })
    }

    notification[type]({
        message: '通知提醒标题-自定义图标',
        description:
            '这里是自定义图标通知提醒',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,

    });
};

export default class Notification extends React.Component {

    render() {
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={() => openNotification('success')}>Success</Button>
                    <Button type="primary" onClick={() => openNotificationWithIcon('info')}>Info</Button>
                    <Button type="primary" onClick={() => openNotification('warning')}>Warning</Button>
                    <Button type="primary" onClick={() => openNotification('error')}>Error</Button>
                </Card>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={() => openNotification('success', 'topLeft')}>Success</Button>
                    <Button type="primary" onClick={() => openNotificationWithIcon('info', 'topRight')}>Info</Button>
                    <Button type="primary" onClick={() => openNotification('warning', 'bottomLeft')}>Warning</Button>
                    <Button type="primary" onClick={() => openNotification('error', 'bottomRight')}>Error</Button>
                </Card>
            </div>
        );
    }
}