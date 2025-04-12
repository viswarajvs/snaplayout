import React, { useEffect, useState } from 'react';
import { Button, Pagination, Space } from 'antd';
import Table, { ColumnType } from 'antd/es/table';
import { UploadOutlined, FolderOpenOutlined, ExpandOutlined, DoubleRightOutlined, FullscreenOutlined, ExpandAltOutlined } from '@ant-design/icons';
import './Dashboard.scss'; // Import the CSS file
import { fileServices } from '@/services/fileServices';
import { useFileContext } from '@/context/FileContext';
import UploadFile from '@/layout/UploadFile/UploadFile';

interface File {
    filename: string;
    type: string;
    uploadedAt: Date;
}
interface UploadData {
    [key: string]: any;
}
const Dashboard: React.FC = () => {
    const { data, setData } = useFileContext();
    const [showJSONUpload, setShowJSONUpload] = useState(false);
    const [showLayoutUpload, setShowLayoutUpload] = useState(false);
    useEffect(() => {
        readAllFiles()
    }, [])
    const readAllFiles = async () => {
        const fileResponse = await fileServices.readFiles()
        setData(fileResponse)
    }
    const [currentPage, setCurrentPage] = useState(1);
    const filesPerPage = 8;

    const handleOpen = (file: string) => {
        alert(`Opening ${file}`);
    };

    const handleOpenInNewWindow = (file: string) => {
        alert(`Opening ${file} in a new window`);
    };

    const indexOfLastFile = currentPage * filesPerPage;
    const indexOfFirstFile = indexOfLastFile - filesPerPage;
    console.log(data)
    const currentFiles = data?.slice(indexOfFirstFile, indexOfLastFile);
    

    const handleFileUpload = (data: UploadData): void => {
        fileServices.createFile(data).then((res: any) => {
            console.log(res)
            readAllFiles();
            setShowJSONUpload(false)
        });
    };
    const handleLayoutFileUpload = (data: UploadData): void => {
        fileServices.createFile(data).then((res: any) => {
            console.log(res)
            readAllFiles();
            setShowLayoutUpload(false)
        });
    };
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="dashboard-title">Uploaded JSON Files</div>
                <Space>
                    <Button
                        type="primary"
                        icon={<UploadOutlined />}
                        onClick={() => setShowJSONUpload(true)}
                    >
                        Upload
                    </Button>
                    <Button
                        type="primary"
                        icon={<ExpandOutlined />}
                        onClick={() => setShowLayoutUpload(true)}
                    >
                        Upload Layout
                    </Button>
                </Space>
            </div>
            <div className="file-list-container" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                <Table
                    columns={[
                        {
                            title: 'Filename',
                            dataIndex: 'filename',
                            key: 'filename',
                        },
                        {
                            title: 'Type',
                            dataIndex: 'type',
                            key: 'type',
                        },
                        {
                            title: 'Uploaded At',
                            dataIndex: 'uploadedAt',
                            key: 'uploadedAt',
                            width: 200,
                            render: (uploadedAt: Date) => new Date(uploadedAt).toLocaleString(),
                        },
                        {
                            title: '',
                            key: 'actions',
                            width: 100,
                            render: (_: any, record: File) => (
                                <Space>
                                    <Button
                                        type="link"
                                        icon={<FullscreenOutlined />}
                                        onClick={() => handleOpen(record.filename)}
                                    />
                                    <Button
                                        type="link"
                                        icon={<ExpandAltOutlined />}
                                        onClick={() => handleOpenInNewWindow(record.filename)}
                                    />
                                </Space>
                            ),
                        },
                    ] as Array<ColumnType>}
                    dataSource={currentFiles?.map((file: any, index: number) => ({
                        key: index,
                        ...file,
                    })) as Array<File & { key: number }>}
                />
            </div>
            <div className="pagination">
                <Pagination
                    current={currentPage}
                    total={data?.length || 0}
                    pageSize={filesPerPage}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                />
            </div>
            <UploadFile title='Select JSON file' show={showJSONUpload} setShow={setShowJSONUpload} uploadFn={handleFileUpload} />
            <UploadFile title='Select layout JSON file' show={showLayoutUpload} setShow={setShowLayoutUpload} uploadFn={handleLayoutFileUpload} />
        </div>
    );
};

export default Dashboard;
