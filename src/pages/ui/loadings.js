import React from 'react';
import { Card, Button, Spin, Alert } from 'antd';

import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';

import "./ui.less";

export default class Loadings extends React.Component {

    render() {
        //const icon = <Icon type={<LoadingOutlined />} />
        const icon = <LoadingOutlined style={{ fontSize: 24 }} />
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"></Spin>
                    <Spin style={{ margin: "0 10px" }} />
                    <Spin size="large"></Spin>
                    <Spin style={{ marginLeft: 10 }} indicator={icon} />
                    <SyncOutlined style={{ marginLeft: 10 }} spin />
                </Card>
                <Card title="内容遮罩">
                    <Alert
                        message="React"
                        description="欢迎来到我的练级世界"
                        type="info"
                    />
                    <Alert
                        message="React"
                        description="欢迎来到我的练级世界"
                        type="error"
                    />
                    <Spin>
                        <Alert
                            message="React"
                            description="欢迎来到我的练级世界"
                            type="error"
                        />
                    </Spin>
                    <Spin indicator={<LoadingOutlined />} tip="加载中。。。">
                        <Alert
                            message="React"
                            description="欢迎来到我的练级世界"
                            type="error"
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
}