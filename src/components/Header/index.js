import { Row, Col } from 'antd';
import React from 'react';
import './index.less';
import Util from '../../utils/util';
import axios from '../../axios/index'

export default class Header extends React.Component {

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

        axios.ajax({
            url: "/GetTest",
            data: {
                params: {

                }
            }
        }).then((res) => {
            debugger;
            if (res.status == 'success') {
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl: data.dayPictureUrl,
                    weather: data.weather
                })
            }
        })

        let data = { "code": "1234", "name": "yyyy" };
        axios.ajaxPost({
            url: "/PostTest",
            data: data
        }).then((res) => {
            debugger;
            if (res.status == 'success') {
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl: data.dayPictureUrl,
                    weather: data.weather
                })
            }
        })

    }

    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        首页
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
            </div>
        )
    }
}