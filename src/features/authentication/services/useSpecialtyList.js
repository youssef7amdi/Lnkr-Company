import { useQuery } from '@tanstack/react-query';

import { getSpecialtyList } from '../../../services/authApi';

export function useSpecialtyList() {
  const {
    data,
    isLoading: specialtiesLoading,
    error,
  } = useQuery({
    queryKey: ['specialty_list'],
    queryFn: getSpecialtyList,
    staleTime: 10000 * 1000,
  });

  return { data: data ? data.data : [], error, specialtiesLoading };
}
