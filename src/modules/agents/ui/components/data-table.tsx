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
import { cn } from "@/lib/utils"

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
            <div className="rounded-xl border border-border bg-card shadow-sm">
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
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="border-b border-border bg-muted hover:bg-muted"
                        >
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="text-xs font-semibold uppercase tracking-wider text-foreground/70"
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
                            className={cn(
                                "border-b border-border transition-colors duration-200",
                                "hover:bg-muted/60 data-[state=selected]:bg-primary/5",
                                index % 2 === 0 ? "bg-card" : "bg-muted/20"
                            )}
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
