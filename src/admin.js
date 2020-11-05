import React from 'react';
import { Col, Row, ConfigProvider } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import NavLeft from './components/NavLeft';
import zhCN from 'antd/lib/locale/zh_CN';
import { connect } from 'react-redux';

import './style/common.less'

class Admin extends React.Component {
    render() {
        return (
            <Row className="container">
                <Col span="4" className="nav-left">
                    <NavLeft />
                </Col>
                <Col span="20" className="main">
                    <Header>
                        Header
                    </Header>
                    <Row className="content">
                        {/* <Home /> */}
                        <Col span="24">
                            <ConfigProvider locale={zhCN}>
                                {this.props.children}
                            </ConfigProvider>
                        </Col>
                    </Row>
                    <Footer />
                </Col>
            </Row>
        );
    }
}

export default connect()(Admin)