import React from "react"
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined
  } from '@ant-design/icons';
import { Tag } from "antd";

interface CustomTagProps{
    status: 'pending' | 'completed' | 'rejected' | 'deleted'
}

export const CustomTag: React.FC<CustomTagProps> = ({status}) => {
  if(status == 'pending'){
    return (
        <Tag icon={<ClockCircleOutlined />} color="default">
            {status}
        </Tag>
    );
  }else if(status == 'deleted'){
    return (
        <Tag icon={<CloseCircleOutlined />} color="error">
            {status}
        </Tag>
    );
  }else if(status == 'rejected'){
    return (
        <Tag icon={<ExclamationCircleOutlined />} color="warning">
            {status}
      </Tag>
    );
  }else if(status == 'completed'){
    return (
        <Tag icon={<CheckCircleOutlined />} color="success">
            {status}
        </Tag>
    );
  }
}
