import { deleteRequest, getRequest, postRequest, putRequest } from "@/utils/axiosHandler";

export const fileServices = {
    createFile: async (fileData: any) => {
        try {
            const response = await postRequest('files/upload', fileData);
            return response.data;
        } catch (error) {
            throw new Error(`Error creating file: ${error}`);
        }
    },
    readFiles: async () => {
        return await getRequest(`files`);
    },

    readFile: async (fileId: string) => {
        try {
            const response = await getRequest(`/files/${fileId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error reading file: ${error}`);
        }
    },

    updateFile: async (fileId: string, updatedData: any) => {
        try {
            const response = await putRequest(`/files/${fileId}`, updatedData);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating file: ${error}`);
        }
    },

    deleteFile: async (fileId: string) => {
        try {
            const response = await deleteRequest(`/files/${fileId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting file: ${error}`);
        }
    },
};