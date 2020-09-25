import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                //debugger;
                if (response.status == 'success') {
                    resolve(response);
                }
                else {
                    reject(response.message);
                }
            })
        })
    }

    static ajax(options) {
        // let loading;
        // if (options.data && options.data.isShowLoading !== false){
        //     loading = document.getElementById('ajaxLoading');
        //     loading.style.display = 'block';
        // }
        let baseApi = 'https://www.easy-mock.com/mock/5f6b1803dba12925bcd53529/imoocmanager';
        let token = '3QShXbZ3ZGVzi2Yj';
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || '',
                headers: {
                    Appkey: token
                }
            }).then((response) => {
                debugger;
                // if (options.data && options.data.isShowLoading !== false) {
                //     loading = document.getElementById('ajaxLoading');
                //     loading.style.display = 'none';
                // }
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
        let baseApi = 'https://www.easy-mock.com/mock/5f6b1803dba12925bcd53529/imoocmanager';
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