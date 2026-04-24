import { useMutation } from '@tanstack/react-query';
import { fetchImageSuggestion, fetchSmartSearch } from '../services/AiService';

export const useSmartSearch = () => {
  return useMutation({
    mutationFn: fetchSmartSearch,
  });
};

export const useSuggestDescription = () => {
  return useMutation({
    mutationFn: fetchImageSuggestion,
  });
};
