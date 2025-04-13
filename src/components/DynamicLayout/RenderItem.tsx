import React from 'react';
import './RenderItem.scss';
import { Divider, Table } from 'antd';

interface Field {
    type: string;
    label: string;
    name?: string;
    placeholder?: string;
    options?: string[];
    action?: string;
    key?: string;
    fields?: Field[];
    columns?: { title: string; dataIndex: string; key: string }[]; // Added columns property
    parent?: boolean; // Added parent property
}

interface Record {
    json: any;
}

interface RenderItemProps {
    field: Field;
    record: Record;
    index: number;
    isSub?: boolean;
}

const RenderItem: React.FC<RenderItemProps> = ({
    field,
    record,
    index,
    isSub = false,
}) => {
    const getRenderElement = () => {
        console.log(value, field.columns)
        switch (field.type) {
            case "text":
                return (
                    <div>{value}</div>
                );
            case "number":
                return (
                    <div>{value}</div>
                );
            case "textarea":
                return (
                    <textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        value={value}
                        style={{ display: "block", width: "100%", padding: "0.5rem" }}
                    />
                );
            case "list":
                return (
                    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                        {value?.map((item: any, itemIndex: number) => (
                            <li key={itemIndex} style={{ marginBottom: "0.5rem" }}>
                                {item}
                            </li>
                        ))}
                    </ul>
                )
            case "group":
                return (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {field.fields?.map((subField, subIndex) => (
                            <RenderItem
                                key={subField.key || subIndex}
                                field={subField}
                                record={record}
                                index={subIndex}
                                isSub={true}
                            />
                        ))}
                    </div>
                )
            case "table":
                return (
                    <>
                        <Table
                            dataSource={value}
                            columns={field.columns}
                            pagination={false}
                            bordered
                            size="small"

                        />
                    </>
                )
            default:
                return null;
        }
    }
    const getClassNameBasedOnType = () => {
        if (field?.parent) return "dynamic-form-renderer"
        switch (field.type) {
            case "group":
                return "col-span-2";
            case "table":
                return "col-span-2";
            case "divider":
                return "col-span-2"
            default:
                return "";
        }
    }
    const value: any = field.key?.split('.').reduce((acc: any, key: string) => acc?.[key], record.json) || '';
    return (
        <div key={field.key || index} className={`text-field ${getClassNameBasedOnType()}`}>
            {
                field?.type === 'divider'
                    ? <Divider />
                    : <>
                        <label className={`field-title  ${isSub ? 'sub-field' : ''}`}>{field.label}</label>
                        <div className='field-value'>{getRenderElement()}</div>
                    </>
            }

        </div>
    )

}

export default RenderItem
