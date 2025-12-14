import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getInitials, getImageUrl } from '@/lib/utils';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Phone, Building, Briefcase } from "lucide-react";




const ActionMenu = ({ staff }) => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigate(`/staff/${staff._id}`)}>
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate(`/staff/update/${staff._id}`)}>
          Update Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert(`Adding ${staff.name} to print queue.`)}>
          Add to Print Queue
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const StaffDataTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  // Define table columns for the desktop view
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={getImageUrl(row.original.passportPhotoUrl)} alt={row.getValue("name")} />
            <AvatarFallback>{getInitials(row.getValue("name"))}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.getValue("name")}</div>
            <div className="text-sm text-muted-foreground">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "designation",
      header: "Designation",
    },
    {
      accessorKey: "cardIssued",
      header: "Card Status",
      cell: ({ row }) => {
        const isIssued = row.getValue("cardIssued");
        return <Badge variant={isIssued ? "default" : "destructive"}>{isIssued ? "Issued" : "Not Issued"}</Badge>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => <div className="text-right"><ActionMenu staff={row.original} /></div>,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 8, // Set a default number of items per page
      },
    },
    state: { sorting, columnFilters },
  });
  
  // We use the table's row model to ensure the mobile view respects filtering
  const tableRows = table.getRowModel().rows;

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by staff name..."
          value={(table.getColumn("name")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* ======================= Desktop Table (Visible on medium screens and up) ======================= */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tableRows?.length ? (
              tableRows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">No results found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ======================= Mobile Card List (Visible on small screens) ======================= */}
      <div className="grid gap-4 md:hidden">
        {tableRows?.length > 0 ? (
          tableRows.map((row) => {
            const staff = row.original;
            return (
              <Card key={staff._id} className="w-full">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={getImageUrl(staff.passportPhotoUrl)} />
                        <AvatarFallback>{getInitials(staff.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{staff.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{staff.email}</p>
                      </div>
                    </div>
                    <ActionMenu staff={staff} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{staff.department}</span>
                  </div>
                   <div className="flex items-center text-sm">
                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{staff.designation}</span>
                  </div>
                  <div className="flex items-center pt-2">
                     <Badge variant={staff.cardIssued ? "default" : "destructive"}>
                       {staff.cardIssued ? "Issued" : "Not Issued"}
                     </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <p className="text-center text-muted-foreground py-10">No results found.</p>
        )}
      </div>

      {/* Pagination Controls (Common for both views) */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
      </div>
    </div>
  );
};