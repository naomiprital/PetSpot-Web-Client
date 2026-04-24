import api from '../api/axiosInstance';

export const fetchSmartSearch = async (params: { query: string; type: string; animal: string }) => {
  const { data } = await api.post('/ai/smart-search', params);
  return data;
};

export interface ImageSuggestion {
  description: string;
  animalType: string | null;
}

export const fetchImageSuggestion = async (image: File): Promise<ImageSuggestion> => {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await api.post('/ai/suggest-description', formData);
  return data;
};
