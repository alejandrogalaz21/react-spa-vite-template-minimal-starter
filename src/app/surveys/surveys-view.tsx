import type { state } from 'src/redux/store';

import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

type Props = {
  title?: string;
};

export function SurveysView({ title = 'Blank' }: Props) {
  const { data, loading } = useSelector((state: state) => state.app);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4"> {title} </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 'auto',
          borderRadius: 2,
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
          border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
        }}
      >
        {loading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </Box>
    </DashboardContent>
  );
}
