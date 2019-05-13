import React from 'react';
import { Popover, } from 'antd';

const popover = props => (
    <Popover placement={props.placement} title={props.title} content={props.content} trigger="click">
        {props.children}
    </Popover>
)

export default popover;