import React, { useContext, useState } from "react";
import { Upload, Button, Card, Typography, Progress } from "antd";
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
    percentage: number;
}

const UploadFile: React.FC<UploadFileProps> = ({
    uploadFn,
    show,
    setShow,
    title,
    percentage
}) => {
    const [file, setFile] = useState<File | null>(null);
    const messageApi = React.useContext(MessageContext);
    const [isUploading, setIsUploading] = useState(false);
    const handleFileChange = (info: any) => {
        const file = info.fileList?.[0].originFileObj;
        setFile(file);
    };

    const loader = useContext(LoaderContext);

    const handleUpload = () => {
        if (file) {
            setIsUploading(true)
            loader?.showLoader();
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target?.result as string;
                    const json = JSON.parse(text);
                    uploadFn({ ...json, filename: file.name })
                } catch (error) {
                    if (messageApi) messageApi.error("Invalid JSON file!");
                } finally {
                    loader?.hideLoader();
                    setIsUploading(false)
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
                {isUploading &&
                    <Progress percent={percentage}  status="active" showInfo={true} style={{ width: "100%" }} />
                }
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