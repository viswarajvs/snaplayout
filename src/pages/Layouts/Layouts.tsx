import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Space } from 'antd';
import Table, { ColumnType } from 'antd/es/table';
import { UploadOutlined, ExpandAltOutlined, EyeOutlined, DownloadOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useFileContext } from '@/context/FileContext';
import UploadFile from '@/layout/UploadFile/UploadFile';
import { MessageContext } from '@/context/MessageContext';
import { LoaderContext } from '@/context/LoaderContext';
import { useNavigate } from 'react-router-dom';
import { layoutServices } from '@/services/layoutServices';

interface File {
    _id: string;
    filename: string;
    type: string;
    uploadedAt: Date;
    json: any;
    key?: number; // Added optional key property
    __v?: number; // Added optional __v property
}
interface UploadData {
    [key: string]: any;
}
const Layout: React.FC = () => {
    const { data, setData } = useFileContext();
    const [showJSONUpload, setShowJSONUpload] = useState(false);
    const [manageId, setManageId] = useState('');
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const messageApi = useContext(MessageContext);
    const loader = useContext(LoaderContext);
    const navigate = useNavigate()
    useEffect(() => {
        readAllFiles()
    }, [])

    const readAllFiles = async () => {
        loader?.showLoader()
        const fileResponse = await layoutServices.readLayouts()
        loader?.hideLoader()
        console.log(fileResponse)
        setData(fileResponse)
    }
    const [currentPage, setCurrentPage] = useState(1);
    const filesPerPage = 5;

    const handleFileUpload = async (data: UploadData): Promise<void> => {
        const jsonData = {
            ...data,
            type: data.type,
            filename: data?.filename,
            uploadedAt: {
                type: Date,
                default: Date.now,
            },
        };
        try {
            const res = await layoutServices.createLayout(jsonData);
            console.log(res);
            await readAllFiles();
            setShowJSONUpload(false);
        } catch (error) {
            if (messageApi) messageApi.error("Invalid JSON file!");
            console.error('Error uploading file:', error);
        }
    };
    const handleDeleteJSON = (type: string) => {
        setManageId(type)
        setShowDeletePopup(true)

    };
    const confirmDeleteJSON = () => {
        loader?.showLoader()
        layoutServices.deleteLayout(manageId).then((res: any) => {
            console.log(res)
            if (messageApi) messageApi.success('File deleted successfully!')
            readAllFiles();
            setShowDeletePopup(false)
            setManageId('')
            loader?.hideLoader()
        })
    }
    const handleDownload = (file: File) => {
        loader?.showLoader()
        const { key, _id, filename, uploadedAt, __v, ...filteredFile } = file;
        const blob = new Blob([JSON.stringify(filteredFile)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file?.filename;
        a.click();
        URL.revokeObjectURL(url);
        loader?.hideLoader()
        if (messageApi) messageApi.success('File downloaded successfully!')
    }
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="dashboard-title">Uploaded layout Files</div>
                <Space>
                    <Button
                        type="primary"
                        icon={<UploadOutlined />}
                        onClick={() => setShowJSONUpload(true)}
                    >
                        Upload
                    </Button>
                </Space>
            </div>
            <div className='dashboard-layout-info'>
                <Space>
                    <InfoCircleOutlined />
                    <div>
                        <span>To see all json files</span>
                        <a onClick={() => navigate('/snaplayout-ui')}>Click here.</a>
                    </div>
                </Space>
            </div>
            <div className="file-list-container" style={{ maxHeight: '100dvh', overflowY: 'auto' }}>
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
                                        icon={<DownloadOutlined />}
                                        title="Download"
                                        onClick={() => handleDownload(record)}
                                    />
{/*                                    
                                    <Button
                                        type="link"
                                        icon={<UploadOutlined />}
                                        className='reupload-button'
                                        title="Reupload"
                                        onClick={() => { }}
                                    /> */}
                                    <Button
                                        type="link"
                                        icon={<DeleteOutlined />}
                                        className='delete-button'
                                        title="Delete"
                                        onClick={() => handleDeleteJSON(record.type)}
                                    />

                                </Space>
                            ),
                        },
                    ] as Array<ColumnType>}
                    dataSource={data?.map((file: any, index: number) => ({
                        key: index,
                        ...file,
                    })) as Array<File & { key: number }>}
                    pagination={{
                        current: currentPage,
                        pageSize: filesPerPage,
                        total: data?.length,
                        onChange: (page) => setCurrentPage(page),
                    }}
                />
            </div>

            <UploadFile title='Select JSON file' show={showJSONUpload} setShow={setShowJSONUpload} uploadFn={handleFileUpload} />

            <Modal
                title="Delete File"
                open={showDeletePopup}
                onOk={confirmDeleteJSON}
                onCancel={() => setShowDeletePopup(false)}
                centered
                width="80%"
                style={{ maxWidth: '500px' }}
            >
                <p>Are you sure you want to delete this file ?</p>
            </Modal>
        </div>
    );
};

export default Layout;
