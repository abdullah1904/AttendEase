import React from 'react'
import { Dialog, DialogHeader } from '../ui/dialog'
import { DialogContent, DialogTitle, DialogFooter } from '../ui/dialog';
import { Teacher, TeacherFormValues, teacherSchema } from '@/types/teacher';
import { Button } from '../ui/button';
import { CirclePlus, Loader2, Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { departmentOptions } from '@/utils';
import { useTeacherCreateMutation, useTeacherUpdateMutation } from '@/hooks/teacher-api';
import { toast } from 'sonner';

type Props = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
    selected: Teacher | null
    setSelected: (selected: Teacher | null) => void
}

const TeacherFormModal = ({ showModal, setShowModal, selected, setSelected }: Props) => {
    const createTeacherMutation = useTeacherCreateMutation();
    const updateTeacherMutation = useTeacherUpdateMutation();
    const form = useForm<TeacherFormValues>({
        defaultValues: {
            name: selected ? selected.name : "",
            email: selected ? selected.email : "",
            department: selected ? String(selected.department) : "",
            phone: selected ? selected.phone : ""
        },
        resolver: zodResolver(teacherSchema)
    });
    const handleClose = () => {
        setSelected(null);
        setShowModal(false);
    }
    const onSubmit = (data: TeacherFormValues) => {
        const teachersData = {
            ...data,
            department: Number(data.department),
        }
        console.log(teachersData);
        if (selected) {
            updateTeacherMutation.mutate({ teacherId: selected._id, teacher: teachersData }, {
                onSuccess: () => {
                    handleClose();
                    toast.success("Teacher updated successfully!");
                },
            });
        } else {
            createTeacherMutation.mutate(teachersData, {
                onSuccess: () => {
                    handleClose();
                    toast.success("Teacher created successfully!");
                },
            });
        }
    }
    return (
        <Dialog open={showModal} onOpenChange={handleClose}>
            <Form {...form}>
                <DialogContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>{selected ? 'Update' : 'Create'} Teacher</DialogTitle>
                        </DialogHeader>
                        <div className='flex flex-col gap-4 my-4'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="name">Name</Label>
                                        <FormControl>
                                            <Input id="name" placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                disabled={!!selected}
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="email">Email</Label>
                                        <FormControl>
                                            <Input id="email" type="email" placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="department">Department</Label>
                                        <FormControl>
                                            <Select
                                                value={String(field.value)}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="Select Department" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {departmentOptions.map((dept) => (
                                                        <SelectItem key={dept.value} value={String(dept.value)}>
                                                            {dept.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="phone">Phone</Label>
                                        <FormControl>
                                            <Input id="phone" placeholder="Phone" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="submit">
                                {createTeacherMutation.isPending ? (
                                    <Loader2 className="size-6 animate-spin" />
                                ) : (
                                    <>
                                        {selected ? (
                                            <Pencil className="mr-2 size-4" />
                                        ) : (
                                            <CirclePlus className="mr-2 h-4 w-4" />
                                        )}
                                        {selected ? 'Update' : 'Create'}
                                    </>
                                )}
                            </Button>

                        </DialogFooter>
                    </form>
                </DialogContent>
            </Form>
        </Dialog>
    )
}

export default TeacherFormModal