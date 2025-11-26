// // 📁 src/features/shared/components/MultiAlertProvider.tsx
// import { useEffect, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Alert, Slide, Stack } from '@mui/material';
// import { styled, keyframes } from '@mui/system';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import ErrorIcon from '@mui/icons-material/Error';
// import InfoIcon from '@mui/icons-material/Info';
// import WarningIcon from '@mui/icons-material/Warning';
// import { selectUiAlerts, clearAlert } from '@features/shared/slices/ui.slice';
// import type { Alert as AlertType } from '@features/shared/types';

// /**
//  * ✨ Animation keyframes
//  * Smooth slide + fade-in from the top.
//  */
// const fadeInDown = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(-10px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// /**
//  * 📦 Styled wrapper that positions the alerts at the top center of the layout.
//  */
// const AlertContainer = styled('div')(({ theme }) => ({
//   position: 'fixed',
//   top: 64, // Header height adjustment
//   left: 0,
//   right: 0,
//   zIndex: ((theme as any).zIndex?.snackbar ?? 1400) + 10,
//   display: 'flex',
//   justifyContent: 'center',
//   pointerEvents: 'none',
//   padding: theme.spacing(0, 2), // Add horizontal padding for mobile
// }));

// /**
//  * 📦 Stack container for multiple alerts
//  */
// const AlertStack = styled(Stack)(({ theme }) => ({
//   gap: theme.spacing(1),
//   maxWidth: '600px',
//   width: '100%',
// }));

// /**
//  * 🎨 Styled alert banner with animation and shadow
//  */
// const StyledAlert = styled(Alert)(({ theme }) => ({
//   borderRadius: theme.spacing(1),
//   width: 'auto',
//   maxWidth: '600px', // Limit maximum width
//   minWidth: '300px', // Ensure minimum width
//   fontWeight: 500,
//   padding: theme.spacing(1.5, 3),
//   pointerEvents: 'auto',
//   justifyContent: 'center',
//   alignItems: 'center',
//   display: 'flex',
//   textAlign: 'center',
//   boxShadow: '0px 3px 5px rgba(0,0,0,0.2)',
//   animation: `${fadeInDown} 0.4s ease-out`,
//   '& .MuiAlert-message': {
//     width: '100%',
//     textAlign: 'center',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// }));

// /**
//  * 🎨 MultiAlertProvider
//  * Displays multiple stacked alerts with fade animation.
//  */
// export const MultiAlertProvider = () => {
//   const dispatch = useDispatch();
//   const alerts = useSelector(selectUiAlerts);

//   // ❌ Clears a specific alert by ID
//   const handleClose = useCallback(
//     (alertId: string) => {
//       dispatch(clearAlert(alertId));
//     },
//     [dispatch]
//   );

//   // ⏱ Auto-close alerts after 5 seconds
//   useEffect(() => {
//     if (alerts.length > 0) {
//       const timers = alerts.map((alert: AlertType) => {
//         return setTimeout(() => {
//           handleClose(alert.id);
//         }, 5000);
//       });

//       return () => {
//         timers.forEach((timer: NodeJS.Timeout) => clearTimeout(timer));
//       };
//     }
//   }, [alerts, handleClose]);

//   // 🧩 Select icon depending on alert type
//   const getIcon = (type: AlertType['type']) => {
//     switch (type) {
//       case 'success':
//         return <CheckCircleIcon fontSize="inherit" />;
//       case 'error':
//         return <ErrorIcon fontSize="inherit" />;
//       case 'info':
//         return <InfoIcon fontSize="inherit" />;
//       case 'warning':
//         return <WarningIcon fontSize="inherit" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <AlertContainer>
//       <AlertStack>
//         {alerts.map((alert: AlertType, index: number) => (
//           <Slide
//             key={alert.id}
//             direction="down"
//             in={true}
//             mountOnEnter
//             unmountOnExit
//             timeout={{ enter: 300 + index * 100, exit: 200 }} // Stagger animation
//           >
//             <StyledAlert
//               icon={getIcon(alert.type)}
//               severity={alert.type}
//               variant="filled"
//               onClose={() => handleClose(alert.id)}
//             >
//               {alert.message}
//             </StyledAlert>
//           </Slide>
//         ))}
//       </AlertStack>
//     </AlertContainer>
//   );
// };
