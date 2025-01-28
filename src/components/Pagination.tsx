import * as React from "react";
import { Box, Pagination } from "@mui/material";

interface PaginacionProps {
  page: number;
  totalPages: number;
  onChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const Paginacion: React.FC<PaginacionProps> = ({
  page,
  totalPages,
  onChangePage,
}) => {
  return (
    <Box sx={{width:'fit-content', margin: '2rem auto', border: '0.1px solid #ccc', padding: '.5rem', borderRadius: '.3rem'}}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={onChangePage}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Paginacion;
