import React from 'react';
import { Col, Row } from 'antd';
import Header from './components/Header';

import './style/common.less'

export default class Common extends React.Component {
    render() {
        return (
            <div>
                <Row className="simple-page">
                    <Header menuType="second" />
                </Row>
                <Row className="content" style={{padding:20}}>
                    <Col span={22} offset={1} style={{ marginTop:50, marginBottom:50 }} >
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        );
    }
}