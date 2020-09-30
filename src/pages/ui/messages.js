import React from 'react';
import { Card, Button, message } from 'antd';

import "./ui.less";

const ShowMessage = (type) => {
    message[type]('恭喜 恭喜 恭喜你！！！');
}

export default class Message extends React.Component {

    render() {
        return (
            <div>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={()=>{ShowMessage('success')}}>Success</Button>
                    <Button type="primary" onClick={()=>{ShowMessage('info')}}>Info</Button>
                    <Button type="primary" onClick={()=>{ShowMessage('warning')}}>Warning</Button>
                    <Button type="primary" onClick={()=>{ShowMessage('error')}}>Error</Button>
                    <Button type="primary" onClick={()=>{ShowMessage('loading')}}>Loading</Button>
                </Card>
            </div>
        );
    }
}