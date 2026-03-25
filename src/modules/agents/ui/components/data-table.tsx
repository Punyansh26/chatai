"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { EmptyState } from "@/components/empty-state"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onCreateNew?: () => void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onCreateNew,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if (data.length === 0) {
        return (
            <div className="rounded-xl border border-border/50 bg-gradient-to-b from-background to-muted/20">
                <EmptyState
                    title="No agents yet"
                    description="Create your first AI agent to get started. Agents can help automate tasks and enhance your workflow."
                    actionLabel="Create Agent"
                    onAction={onCreateNew}
                />
            </div>
        )
    }

    return (
        <div className="overflow-hidden rounded-xl border border-border/50 bg-gradient-to-b from-background to-muted/10 shadow-sm">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="border-border/50 bg-muted/30 hover:bg-muted/30"
                        >
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row, index) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className="group border-b border-border/60 bg-background/50 transition-colors duration-200 hover:bg-muted/50 data-[state=selected]:bg-primary/5"
                            style={{
                                animationDelay: `${index * 50}ms`,
                            }}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    key={cell.id}
                                    className="py-4"
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
