import React from 'react';
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd';
import Utils from '../../utils/util';
const FormItem = Form.Item;

export default class FilterForm extends React.Component {

    handleFilterSubmit = () => {
        let fieldsValue = this.props.formR.current.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset = () => {
        this.props.formR.current.resetFields();
    }

    initFormList = () => {
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, i) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type == '时间查询') {
                    const begin_time = <FormItem label={label} key={field} initialValue={initialValue} name={field + "_begin_time"}>
                        {
                            <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                        }
                    </FormItem>;
                    formItemList.push(begin_time)
                    const end_time = <FormItem label="~" colon={false} key={field} initialValue={initialValue} name={field + "_end_time"}>
                        {
                            <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                        }
                    </FormItem>;
                    formItemList.push(end_time)
                } else if (item.type == 'INPUT') {
                    const INPUT = <FormItem label={label} key={field} initialValue={initialValue} name={field}>
                        {
                            <Input type="text" style={{ width: width }} placeholder={placeholder} />
                        }
                    </FormItem>;
                    formItemList.push(INPUT)
                } else if (item.type == '城市') {
                    const INPUT = <FormItem label={label} key={field} initialValue={initialValue} name={field}>
                        {
                            <Select
                                style={{ width: width }}
                                placeholder={placeholder}
                            >
                                {Utils.getOptionList([{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }])}
                            </Select>
                        }
                    </FormItem>;
                    formItemList.push(INPUT)
                } else if (item.type == 'SELECT') {
                    const SELECT = <FormItem label={label} key={field} initialValue={initialValue} name={field}>
                        {
                            <Select
                                style={{ width: width }}
                                placeholder={placeholder}
                            >
                                {Utils.getOptionList(item.list)}
                            </Select>
                        }
                    </FormItem>;
                    formItemList.push(SELECT)
                } else if (item.type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem key={field} initialValue={initialValue} valuePropName="checked" name={field}>
                        {
                            <Checkbox>
                                {label}
                            </Checkbox>
                        }
                    </FormItem>;
                    formItemList.push(CHECKBOX)
                } else if (item.type == 'DATEPICKER') {
                    const DATEPICKER = <FormItem label={label} key={field} initialValue={initialValue} name={field}>
                        {
                            <DatePicker style={{ width: width }} showTime={true} placeholder={placeholder} format="YYYY-MM-DD" />
                        }
                    </FormItem>;
                    formItemList.push(DATEPICKER)
                }
            })
        }
        return formItemList;
    }

    render() {

        return (
            <Form layout="inline"
                ref={this.props.formR}
            >
                { this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}