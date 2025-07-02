import { Group, Pagination } from '@mantine/core';

interface PokedexPaginationProps {
  total: number;
  limit: number;
  offset: number;
  onPageChange: (page: number) => void;
}

const PokedexPagination = ({ total, limit, offset, onPageChange }: PokedexPaginationProps) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  if (totalPages <= 1) return null;

  return (
    <Group justify="center" mt="md">
      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={onPageChange}
        withEdges
      />
    </Group>
  );
};

export default PokedexPagination; 