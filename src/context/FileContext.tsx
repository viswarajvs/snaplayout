import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FileResponse {
    [key: string]: any; // Adjust this type based on your expected JSON structure
}

interface FileContextType {
    data: FileResponse | [];
    setData: React.Dispatch<React.SetStateAction<FileResponse | []>>;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<FileResponse | []>([]);
    console.log(data)
    return (
        <FileContext.Provider value={{ data, setData }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFileContext = (): FileContextType => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error('useJsonContext must be used within a JsonProvider');
    }
    return context;
};
