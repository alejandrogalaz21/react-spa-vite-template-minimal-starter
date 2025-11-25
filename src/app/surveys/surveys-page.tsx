import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SurveysView } from './surveys-view';

const metadata = { title: `Surveys | Dashboard - ${CONFIG.site.name}` };

export function SurveysPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <SurveysView title="Surveys" />
    </>
  );
}
