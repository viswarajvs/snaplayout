import React, { useContext, useState } from "react";
import { Upload, Button, Card, Typography } from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import './UploadFile.scss'; // Import the CSS file
import { MessageContext } from "@/context/MessageContext";
import { LoaderContext } from "@/context/LoaderContext";

const { Title, Text } = Typography;

interface UploadFileProps {
    uploadFn: (data: any) => Promise<void>;
    show: boolean;
    setShow: (show: boolean) => void;
    title: string;
}

const UploadFile: React.FC<UploadFileProps> = ({
    uploadFn,
    show,
    setShow,
    title
}) => {
    const [file, setFile] = useState<File | null>(null);
    const messageApi = React.useContext(MessageContext);
    const handleFileChange = (info: any) => {
        const file = info.fileList?.[0].originFileObj;
        setFile(file);
    };

    const loader = useContext(LoaderContext);

    const handleUpload = () => {
        if (file) {
            loader?.showLoader();
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target?.result as string;
                    const json = JSON.parse(text);
                    uploadFn({...json, filename: file.name})
                } catch (error) {
                    if (messageApi) messageApi.error("Invalid JSON file!");
                } finally {
                    loader?.hideLoader();
                }
            };
            reader.readAsText(file);
        } else {
            if (messageApi) messageApi.warning("Please select a file first!");
        }
    };
    if (!show) return null
    return (
        <div className="upload-popup">

            <Card className="popup-content" variant="borderless">
                <Button
                    type="text"
                    className="close-button"
                    onClick={() => setShow(false)}
                    icon={<CloseOutlined />}
                    style={{ position: "absolute", top: 8, right: 8 }}
                />
                <Title level={3}>Upload File</Title>
                <div className="flex-column">
                    <Upload
                        accept=".json"
                        beforeUpload={() => false} // Prevent auto-upload
                        onChange={handleFileChange}
                        showUploadList={true}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>{title}</Button>
                    </Upload>
                    <Button
                        type="primary"
                        disabled={!file}
                        onClick={handleUpload}
                        style={{ marginTop: 16 }}
                        className="upload-button"
                    >
                        Upload
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default UploadFile;