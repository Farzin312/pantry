import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  );
};

export default Layout;
