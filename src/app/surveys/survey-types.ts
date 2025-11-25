export type Survey = {
  id: string | number;
  siteName: string;
  siteNumber: string;
  bankSiteManagerName: string;
  telephone: string;
  address: string;
};

export type FetchSurveysPayload = {
  page: number;
  limit: number;
};

export type CreateSurveyPayload = {
  survey: Survey;
};

export type UpdateSurveyPayload = {
  id: string | number;
  updatedData: Partial<Survey>;
};

export type RemoveSurveyPayload = {
  id: string | number;
};
