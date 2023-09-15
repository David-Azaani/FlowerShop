import { Box, Typography, Pagination } from "@mui/material";
import { Metadata } from "../models/pagination";

interface Props {
  metaData: Metadata;
  onPageChange: (page: number) => void;
}
export default function AppPagination({ metaData, onPageChange }: Props) {
  const { currentPage, pageSize, totalCount, totalPages } = metaData;

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography color="initial">
          Displaying {(currentPage - 1) * pageSize + 1}-
          {currentPage * pageSize > totalPages
            ? totalCount
            : currentPage * pageSize}{" "}
          of {totalCount} items
        </Typography>
        <Pagination
          color="secondary"
          size="large"
          count={totalPages}
          page={currentPage}
          onChange={(e,page) =>onPageChange(page)}
        />
      </Box>
    </div>
  );
}
