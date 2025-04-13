import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Space } from 'antd';
import Table, { ColumnType } from 'antd/es/table';
import { UploadOutlined, ExpandAltOutlined, EyeOutlined, DownloadOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './Dashboard.scss'; // Import the CSS file
import { fileServices } from '@/services/fileServices';
import { useFileContext } from '@/context/FileContext';
import UploadFile from '@/layout/UploadFile/UploadFile';
import { MessageContext } from '@/context/MessageContext';
import { LoaderContext } from '@/context/LoaderContext';
import { useNavigate } from 'react-router-dom';
import Popup from '@/components/Popup/Popup';
import DynamicFormRenderer from '@/components/DynamicLayout/DynamicLayout';
import { layoutServices } from '@/services/layoutServices';

interface File {
    _id: string;
    filename: string;
    type: string;
    uploadedAt: Date;
    json: any;
}
interface UploadData {
    [key: string]: any;
}
const Dashboard: React.FC = () => {
    const { data, setData } = useFileContext();
    const [showJSONUpload, setShowJSONUpload] = useState(false);
    const [manageId, setManageId] = useState('');
    const [openFIle, setOpenFile] = useState<File | null>(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showJSONLayout, setShowJSONLayout] = useState(false);
    const messageApi = useContext(MessageContext);
    const loader = useContext(LoaderContext);
    const navigate = useNavigate()
    useEffect(() => {
        readAllFiles()
    }, [])

    const readAllFiles = async () => {
        loader?.showLoader()
        fileServices.readFiles().then((fileResponse: any) => {
            console.log(fileResponse)
            setData(fileResponse)
        }).finally(() => {
            loader?.hideLoader()
        })

    }
    const [currentPage, setCurrentPage] = useState(1);
    const filesPerPage = 5;

    const handleOpen = async (file: File) => {
        setShowJSONLayout(true);
        setOpenFile(file);
    };

    const handleFileUpload = async (data: UploadData): Promise<void> => {
        const jsonData = {
            type: data.type,
            json: data,
            filename: data?.filename,
            uploadedAt: {
                type: Date,
                default: Date.now,
            },
        };
        try {
            const res = await fileServices.createFile(jsonData);
            console.log(res);
            await readAllFiles();
            setShowJSONUpload(false);
        } catch (error) {
            if (messageApi) messageApi.error("Invalid JSON file!");
            console.error('Error uploading file:', error);
        }
    };
    const handleDeleteJSON = (id: string) => {
        setManageId(id)
        setShowDeletePopup(true)

    };
    const confirmDeleteJSON = () => {
        loader?.showLoader()
        fileServices.deleteFile(manageId).then((res: any) => {
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
        const blob = new Blob([JSON.stringify(file?.json)], { type: 'application/json' });
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
                <div className="dashboard-title">Uploaded JSON Files</div>
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
                        <span>To manage layouts</span>
                        <a onClick={() => navigate('layouts')}>Click here.</a>
                    </div>
                </Space>

            </div>
            <div className="file-list-container" style={{ overflowY: 'auto' }}>
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
                                        icon={<EyeOutlined />}
                                        title="Preview"
                                        onClick={() => handleOpen(record)}
                                    />
                                    <Button
                                        type="link"
                                        icon={<DownloadOutlined />}
                                        title="Download"
                                        onClick={() => handleDownload(record)}
                                    />
                                    {/* <Button
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
                                        onClick={() => handleDeleteJSON(record._id)}
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

            <Popup
                isOpen={showJSONLayout}
                onClose={() => {
                    setShowJSONLayout(false)
                    setOpenFile(null)
                }}
                title={openFIle?.filename || ''}
            >
                <DynamicFormRenderer
                    record={openFIle}
                />
            </Popup>

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

export default Dashboard;
