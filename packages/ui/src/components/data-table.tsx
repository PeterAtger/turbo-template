'use client';

import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  VisibilityState,
  getSortedRowModel,
  useReactTable,
  Row,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Input } from './input';
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from './pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  filter?: {
    filterMessage: string,
    filterColumn: string
  },
  hideColumnSwitch?: boolean,
  onRowClick?: (row: Row<TData>) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filter,
  hideColumnSwitch = false,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const renderPagination = () => (
    <TableRow className="w-full">
      <TableCell colSpan={4} className="pb-2 pt-4 w-full">
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              onClick={() => table.previousPage()}
              isActive={!table.getCanPreviousPage()}
            />
            <PaginationNext
              onClick={() => table.nextPage()}
              isActive={!table.getCanNextPage()}
            />
          </PaginationContent>
        </Pagination>
      </TableCell>
    </TableRow>
  );

  const renderFilter = () => {
    if (!filter) {
      return null;
    }

    return (
      <Input
        placeholder={filter.filterMessage}
        value={(table.getColumn(filter.filterColumn)?.getFilterValue() as string) ?? ''}
        onChange={(event) => table.getColumn(filter.filterColumn)
          ?.setFilterValue(event.target.value)}
        className="max-w-sm mb-4"
      />

    );
  };

  const renderColumnSwitch = () => {
    if (hideColumnSwitch) {
      return null;
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="mb-4" asChild>
          <Button variant="secondary" type="button" className="h-auto min-h-[2.25rem] ml-auto">
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter(
              (column: any) => column.getCanHide(),
            )
            .map((column: any) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center">
        {renderFilter()}
        {renderColumnSwitch()}
      </div>
      <Table className="pb-0">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <TableHead className="font-semibold text-sm" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: any) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
              >
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-12 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
          {table.getPageCount() > 1 && renderPagination()}
        </TableBody>
      </Table>
    </div>
  );
}
