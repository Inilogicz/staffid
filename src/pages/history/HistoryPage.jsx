// src/pages/history/HistoryPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { HistoryPageSkeleton } from './HistoryPageSkeleton';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, getImageUrl } from '@/lib/utils';

const HistoryPage = () => {
  const [history, setHistory] = useState({
    data: [], currentPage: 1, totalPages: 1, totalLogs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchHistory = useCallback(async (currentPage, filter) => {
    // Show loader on every fetch, not just initial
    setLoading(true); 
    try {
      const params = new URLSearchParams({ page: currentPage, limit: 10 });
      if (filter && filter !== 'all') {
        params.append('status', filter);
      }
      
      const response = await api.get(`/api/history/all?${params.toString()}`);
      setHistory(response.data);
    } catch (err) {
      setError('Failed to fetch history data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory(page, statusFilter);
  }, [page, statusFilter, fetchHistory]);

  // Use the skeleton only on the very first page load
  if (loading && page === 1 && history.data.length === 0) {
    return <HistoryPageSkeleton />;
  }
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Activity History</h1>
        <p className="text-muted-foreground mt-1">A complete log of all card-related actions in the system.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b">
          <div>
            <CardTitle>All Logs</CardTitle>
            <CardDescription>
              Showing {history.data.length} of {history.totalLogs} total records.
            </CardDescription>
          </div>
          <div className="w-full md:w-auto">
            <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value); setPage(1); }}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="queued">Queued</SelectItem>
                <SelectItem value="printed">Printed</SelectItem>
                <SelectItem value="success">Issued (Success)</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* ======================= Desktop Table ======================= */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Action By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.data.map((log) => (
                  <TableRow key={log._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar><AvatarImage src={getImageUrl(log.staff?.passportPhotoUrl)} /><AvatarFallback>{getInitials(log.staff?.name)}</AvatarFallback></Avatar>
                        <div>
                          <div className="font-medium">{log.staff?.name || 'N/A'}</div>
                          <div className="text-sm text-muted-foreground">{log.staff?.department || 'N/A'}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{log.actionBy}</TableCell>
                    <TableCell><Badge variant={log.status === 'failed' ? 'destructive' : 'default'}>{log.status}</Badge></TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">{new Date(log.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* ======================= Mobile Card List ======================= */}
          <div className="divide-y md:hidden">
            {history.data.map((log) => (
              <div key={log._id} className="p-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                  <Avatar><AvatarFallback>{getInitials(log.staff?.name)}</AvatarFallback></Avatar>
                  <div>
                    <p className="font-medium">{log.staff?.name || 'Unknown'}</p>
                    <p className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge variant={log.status === 'failed' ? 'destructive' : 'default'}>{log.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-4">
        <span className="text-sm text-muted-foreground">
          Page {history.currentPage} of {history.totalPages}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(p => p - 1)} disabled={history.currentPage <= 1 || loading}>Previous</Button>
          <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={history.currentPage >= history.totalPages || loading}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;