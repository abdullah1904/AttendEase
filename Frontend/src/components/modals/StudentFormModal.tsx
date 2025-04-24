import { Student, StudentFormValues, studentSchema } from '@/types/student'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CirclePlus, Loader2, Pencil } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { departmentOptions } from '@/utils'
import { useStudentCreateMutation, useStudentUpdateMutation } from '@/hooks/use-student'
import { toast } from 'sonner'

type Props = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
    selected: Student | null
    setSelected: (selected: Student | null) => void
}

const StudentFormModal = ({ selected, setSelected, setShowModal, showModal }: Props) => {
    const createStudentMutation = useStudentCreateMutation();
    const updateStudentMutation = useStudentUpdateMutation();
    const form = useForm<StudentFormValues>({
        defaultValues: {
            name: selected ? selected.name : "",
            email: selected ? selected.email : "",
            department: selected ? String(selected.department) : "",
            phone: selected ? selected.phone : ""
        },
        resolver: zodResolver(studentSchema)
    });
    const handleClose = () => {
        setSelected(null);
        setShowModal(false);
    }
    const onSubmit = (data: StudentFormValues) => {
        const studentData = {
            ...data,
            department: Number(data.department),
        }
        if (selected) {
            updateStudentMutation.mutate({ studentId: selected._id, student: studentData }, {
                onSuccess: () => {
                    handleClose();
                    toast.success("Student updated successfully!");
                },
                onError: (error) => {
                    toast.error("Error updating student: " + error.message);
                }
            });
        } else {
            createStudentMutation.mutate(studentData, {
                onSuccess: () => {
                    handleClose();
                    toast.success("Student created successfully!");
                },
                onError: (error) => {
                    toast.error("Error creating student: " + error.message);
                }
            });
        }
    }
    return (
        <Dialog open={showModal} onOpenChange={handleClose}>
            <Form {...form}>
                <DialogContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>{selected ? 'Update' : 'Create'} Student</DialogTitle>
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
                            <Button type="submit" disabled={createStudentMutation.isPending || updateStudentMutation.isPending}>
                                {createStudentMutation.isPending || updateStudentMutation.isPending ? (
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

export default StudentFormModal