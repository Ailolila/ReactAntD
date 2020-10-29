import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
import Utils from './../utils/util';

export default class Axios {
    static requestList(_this, url, params) {
        var data = {
            params: params
        }
        this.ajax({
            url,
            data
        }).then((data) => {
            if (data && data.result) {
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        });
    }
    static jsonp(options) {
        try {
            return new Promise((resolve, reject) => {
                JsonP(options.url, {
                    param: 'callback'
                }, function (err, response) {
                    //debugger;
                    // if (response.status == 'success') {
                    //     resolve(response);
                    // }
                    // else {
                    //     reject(response.message);
                    // }
                })
            })
        }
        catch { }
    }

    static ajax(options) {
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        //fastmock
        let baseApi = 'https://www.fastmock.site/mock/41e1e11d4a3ce03eed160b62ced5be56/imoocmanager';
        //easymock
        //let baseApi = 'https://www.easy-mock.com/mock/5f6b1803dba12925bcd53529/imoocmanager';
        //let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        //let token = '3QShXbZ3ZGVzi2Yj';
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || '',
                // headers: {
                //     Appkey: token
                // }
            }).then((response) => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status == '200') {
                    let res = response.data;
                    if (res.code == '0') {
                        resolve(res);
                    } else {
                        Modal.info({
                            title: "提示",
                            content: res.msg
                        })
                    }
                } else {
                    reject(response.data);
                }
            })
        });
    }

    static ajaxPost(options) {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        let baseApi = 'https://www.fastmock.site/mock/41e1e11d4a3ce03eed160b62ced5be56/imoocmanager';
        //let baseApi = 'https://www.easy-mock.com/mock/5f6b1803dba12925bcd53529/imoocmanager';
        return new Promise((resolve, reject) => {
            //let data = { "code": "1234", "name": "yyyy" };
            axios.post(baseApi + options.url, options.data, axiosConfig)
                .then(response => {
                    console.log('res=>', response);
                    if (response.status == '200') {
                        let res = response.data;
                        if (res.ResultCode == '200') {
                            resolve(res);
                        } else {
                            Modal.info({
                                title: "提示",
                                content: res.msg
                            })
                        }
                    } else {
                        reject(response.data);
                    }
                });
        })
    }


}