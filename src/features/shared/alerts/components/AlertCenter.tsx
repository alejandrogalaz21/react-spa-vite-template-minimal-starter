import { useSelector } from 'react-redux';
import { selectAlerts } from '../alert.selectors';
import { AlertFactory } from './AlertFactory';

export const AlertCenter = () => {
  const alerts = useSelector(selectAlerts);

  return (
    <>
      {alerts.map((a) => (
        <AlertFactory key={a.id} alert={a} />
      ))}
    </>
  );
};
