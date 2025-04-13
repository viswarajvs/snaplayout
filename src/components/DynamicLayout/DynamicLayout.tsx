import { layoutServices } from "@/services/layoutServices";
import React, { useContext, useEffect } from "react";
import RenderItem from "./RenderItem";
import { LoaderContext } from "@/context/LoaderContext";
import { WarningOutlined } from '@ant-design/icons';
import { Space } from "antd";
import { useNavigate } from "react-router-dom";

interface Field {
    type: string;
    label: string;
    name?: string;
    placeholder?: string;
    options?: string[];
    action?: string;
    key?: string; // Added key property
}

interface Layout {
    type: "form";
    title?: string;
    fields: Field[];
}

interface Props {
    record: any;
}

const DynamicFormRenderer: React.FC<Props> = ({ record }) => {
    const [layout, setLayout] = React.useState<Layout | null>(null)
    const loader = useContext(LoaderContext);
    const [loadCompleted, setLoadCompleted] = React.useState(false)
    const navigate = useNavigate()
    const getLayout = async () => {
        loader?.showLoader()
        try {
            const response = await layoutServices.readLayout(record.type);
            setLayout(response.layout)
            setLoadCompleted(true)
            loader?.hideLoader()
        }
        catch (error) {
            loader?.hideLoader()
            setLoadCompleted(true)
            console.error("Error fetching layout:", error);
        }
    };


    useEffect(() => {
        if (record?.type) getLayout()
    }, [record])
    if (loadCompleted && !layout)
        return (
            <div className="no-layout-found">
                <Space>
                    <WarningOutlined className="noicon" />
                    <h2>No Layout Found</h2>
                </Space>
                <p>We couldn't find a layout for the selected record type. Please upload layout definition by clicking  
                    <a className="pointer-icon" onClick={() => navigate('layouts')}> here.</a>
                </p>
            </div>
        )
    return (
        <>
            {layout?.title && <h2>{layout?.title}</h2>}

            <div className="dynamic-form-renderer">
                {layout?.fields.map((field, index) => {
                    return <RenderItem
                        field={field}
                        record={record}
                        index={index}
                    />
                })}
            </div>
        </>
    );
};


export default DynamicFormRenderer;
