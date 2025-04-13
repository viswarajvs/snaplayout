import { deleteRequest, getRequest, postRequest, putRequest } from "@/utils/axiosHandler";

export const layoutServices = {
    createLayout: async (fileData: any) => {
        try {
            const response = await postRequest('layouts/upload', fileData);
            return response.data;
        } catch (error) {
            throw new Error(`Error creating file: ${error}`);
        }
    },
    readLayouts: async () => {
        return await getRequest(`layouts`);
    },

    readLayout: async (fileId: string) => {
        try {
            const response = await getRequest(`/layouts/${fileId}`);
            return response;
        } catch (error) {
            throw new Error(`Error reading layout by type: ${error}`);
        }
    },

    updateLayout: async (fileId: string, updatedData: any) => {
        try {
            const response = await putRequest(`/layouts/${fileId}`, updatedData);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating file: ${error}`);
        }
    },

    deleteLayout: async (fileId: string) => {
        try {
            const response = await deleteRequest(`/layouts/${fileId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting file: ${error}`);
        }
    },
};