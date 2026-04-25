import api from '../api/axiosInstance';

const AI_ROUTE = '/ai';

export const fetchSmartSearch = async (params: { query: string; type: string; animal: string }) => {
  const { data } = await api.post(`${AI_ROUTE}/smart-search`, params);
  return data;
};

export interface ImageSuggestion {
  description: string;
  animalType: string | null;
}

export const fetchImageSuggestion = async (image: File): Promise<ImageSuggestion> => {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await api.post(`${AI_ROUTE}/suggest-description`, formData);
  return data;
};
