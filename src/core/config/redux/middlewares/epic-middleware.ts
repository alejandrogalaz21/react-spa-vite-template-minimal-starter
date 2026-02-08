import axiosInstance from '@/utils/axios';
// types
import type { EpicDependencies } from '@/core/types/epics/epic-types';

export const epicDependencies: EpicDependencies = {
  api: axiosInstance,
};
