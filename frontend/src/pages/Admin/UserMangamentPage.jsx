import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, deleteUser } from '@/api/authService';
import { Spinner } from '@/components/Spinner';
import {
    CheckCircle,
    XCircle,
    Edit,
    Lock,
    LockOpen,
    Search,
    Loader2
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const UserMangamentPage = () => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const queryClient = useQueryClient();

    const handleOpenDeleteDialog = (user) => {
        setOpenDeleteDialog(true);
        setSelectedUser(user);
    };

    const { data: userInfo, isLoading: isGetting } = useQuery({
        queryKey: ['getAllUsers'],
        queryFn: getAllUsers,
        onSuccess: (res) => {
            console.log('All Users', res);
        },
        onError: (err) => {
            console.log('All Users Error', err.response?.data?.error);
        }
    });

    const { mutate, isLoading: isDeleting } = useMutation({
        mutationFn: deleteUser,
        onSuccess: (res) => {
            console.log('Deleted User Successfully', res);
            if (selectedUser?.inActive) {
                toast.success(`Unblock ${selectedUser.fullName} successfully`);
            } else {
                toast.success(`Block ${selectedUser.fullName} successfully`);
            }

            setSelectedUser(null);
            setOpenDeleteDialog(false);
            queryClient.invalidateQueries(['getAllUsers']);
        },
        onError: (err) => {
            console.log('Deleted User Error', err.response.data.error);
        }
    });

    const filteredData =
        userInfo?.data?.filter(
            (user) =>
                !searchQuery ||
                user?.phone?.toLowerCase().includes(searchQuery?.toLowerCase())
        ) || [];
    const handleDeleteUser = () => {
        mutate(selectedUser.id);
    };

    if (isGetting)
        return (
            <div className="flex h-full items-center justify-center">
                <Spinner />
            </div>
        );

    return (
        <div className="space-y-6 rounded-lg bg-white p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                    User Management
                </h1>

                <div className="relative w-full max-w-xs sm:ml-auto">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                        placeholder="Search users by phone..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData?.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-muted-foreground py-8 text-center"
                            >
                                No users found
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredData?.map((user) => (
                            <TableRow
                                key={user.id}
                                className="transition-colors hover:bg-gray-50"
                            >
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="/user-default.png"
                                            alt={user.fullName}
                                            className="h-12 w-12 rounded-full border-2 border-[#fece51] object-cover"
                                        />
                                        <div>
                                            <p className="cursor-pointer font-medium hover:underline">
                                                {user.fullName}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                ID: {user.id}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="font-semibold text-pink-500">
                                        {user.phone}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                                        User
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium">
                                        {user.balance.toLocaleString()}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {user.inActive ? (
                                        <Badge className="flex w-[80px] items-center gap-1 bg-red-500 text-white hover:bg-red-600">
                                            <XCircle className="h-3.5 w-3.5" />
                                            Inactive
                                        </Badge>
                                    ) : (
                                        <Badge className="flex w-[80px] items-center gap-1 bg-green-500 text-white hover:bg-green-600">
                                            <CheckCircle className="h-3.5 w-3.5" />
                                            Active
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Button
                                            size="icon"
                                            className="bg-indigo-600 text-white hover:bg-indigo-700"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        {user.inActive ? (
                                            <Button
                                                size="icon"
                                                onClick={() =>
                                                    handleOpenDeleteDialog(user)
                                                }
                                                className="bg-blue-600 hover:bg-blue-600"
                                            >
                                                <LockOpen className="h-4 w-4" />
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() =>
                                                    handleOpenDeleteDialog(user)
                                                }
                                            >
                                                <Lock className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <AlertDialog open={openDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will{' '}
                            {selectedUser?.inActive ? 'unblock' : 'block'}{' '}
                            <strong>{selectedUser?.fullName}</strong> from
                            accessing our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setOpenDeleteDialog(false)}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className={
                                selectedUser?.inActive
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-red-600 text-white hover:bg-red-700'
                            }
                            onClick={handleDeleteUser}
                        >
                            {isDeleting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Please wait...
                                </div>
                            ) : (
                                <>
                                    {selectedUser?.inActive
                                        ? 'Unblock'
                                        : 'Block'}
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
