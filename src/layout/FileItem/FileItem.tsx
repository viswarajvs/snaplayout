import React from 'react';
import { Typography } from 'antd';
import moment from 'moment';

const { Text } = Typography;

interface FileItemProps {
    filename: string;
    type: string;
    uploadedAt: Date;
}

const FileItem: React.FC<FileItemProps> = ({ filename, type, uploadedAt }) => {
    return (
        <div>
            <Text strong>{filename}</Text>
            <Text type="secondary">{type}</Text>
            <Text>{moment(uploadedAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
        </div>
    );
};

export default FileItem;
