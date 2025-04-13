import { deleteRequest, getRequest, postRequest, putRequest } from "@/utils/axiosHandler";

interface UploadProgressCallback {
    (percentage: number): void;
}

interface FileResponse {
    data: any;
}

export const fileServices = {
    createFile: async (fileData: any, setUploadPercentage: UploadProgressCallback): Promise<any> => {
        try {
            const response = await postRequest('files/upload', fileData, {
                headers: {
                    "Content-Type": "application/json"
                },
                onUploadProgress: (progressEvent: ProgressEvent): void => {
                    const percent: number = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 1)
                    );
                    setUploadPercentage(percent);
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Error creating file: ${error}`);
        }
    },
    readFiles: async (): Promise<any> => {
        return await getRequest(`files`);
    },

    readFile: async (fileId: string): Promise<any> => {
        try {
            const response: FileResponse = await getRequest(`/files/${fileId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error reading file: ${error}`);
        }
    },

    updateFile: async (fileId: string, updatedData: any): Promise<any> => {
        try {
            const response: FileResponse = await putRequest(`/files/${fileId}`, updatedData);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating file: ${error}`);
        }
    },

    deleteFile: async (fileId: string): Promise<any> => {
        try {
            const response: FileResponse = await deleteRequest(`/files/${fileId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting file: ${error}`);
        }
    },
};