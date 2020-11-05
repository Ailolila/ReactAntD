import { Row, Col } from 'antd';
import React from 'react';
import './index.less';
import Util from '../../utils/util';
import axios from '../../axios/index';
import { connect } from 'react-redux';

class Header extends React.Component {

    componentWillMount() {
        this.setState({
            userName: "wintork 练级中"
        });

        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        }, 1000);

        this.getWeatherApiData();
    }

    getWeatherApiData() {
        try {
            let city = "天津";
            axios.jsonp({
                url: "http://api.map.baidu.com/telematics/v3/weather?location=" + encodeURIComponent(city) + "&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"
                //url:"http://www.baidu.com"
            }).then((res) => {
                //debugger;
                if (res.status == 'success') {
                    let data = res.results[0].weather_data[0];
                    this.setState({
                        dayPictureUrl: data.dayPictureUrl,
                        weather: data.weather
                    })
                }
            })
        }
        catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }

        // try {
        //     axios.ajax({
        //         url: "/GetTest",
        //         data: {
        //             params: {

        //             }
        //             , isShowLoading: false
        //         }
        //     }).then((res) => {
        //         debugger;
        //         if (res.status == 'success') {
        //             let data = res.results[0].weather_data[0];
        //             this.setState({
        //                 dayPictureUrl: data.dayPictureUrl,
        //                 weather: data.weather
        //             })
        //         }
        //     })
        // }
        // catch (errorInfo) {
        //     console.log('Failed:', errorInfo);
        // }

        try {
            let data = { "code": "1234", "name": "yyyy" };
            axios.ajaxPost({
                url: "/PostTest",
                data: data
            }).then((res) => {
                if (res.ResultCode == '200') {
                    debugger;
                    let data = res.ResultValue.Data[0];
                    this.setState({
                        ActivityName: data.ActivityName
                    })
                }
            })
        }
        catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }

    render() {
        //const menuType = this.props.menuType;
        const { menuName, menuType } = this.props;
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ?
                            <Col span="6" className="logo">
                                <img src="/assets/logo-ant.svg" alt="" />
                                <span>wintork 练级系统</span>
                            </Col> : ''
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎，{this.state.userName} {this.state.ActivityName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' :
                        <Row className="breadcrumb">
                            <Col span="4" className="breadcrumb-title">
                                {menuName || '首页'}
                            </Col>
                            <Col span="20" className="weather">
                                <span className="date">
                                    {this.state.sysTime}
                                </span>
                                <span className="weather-img">
                                    <img src={this.state.dayPictureUrl}></img>
                                </span>
                                <span className="weather-detail">
                                    {this.state.weather}
                                </span>
                            </Col>
                        </Row>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    debugger;
    return {
        menuName: state.menuName
    }
};
export default connect(mapStateToProps)(Header)