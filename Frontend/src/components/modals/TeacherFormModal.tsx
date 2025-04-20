import React from 'react'
import { Dialog, DialogHeader } from '../ui/dialog'
import { DialogContent, DialogTitle, DialogFooter } from '../ui/dialog';
import { Teacher, TeacherFormValues, teacherSchema } from '@/types/teacher';
import { Button } from '../ui/button';
import { CirclePlus, Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';

type Props = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
    selected: Teacher | null
    setSelected: (selected: Teacher | null) => void
}

const TeacherFormModal = ({ showModal, setShowModal, selected, setSelected }: Props) => {
    const form = useForm<TeacherFormValues>({
        defaultValues: {
            name: selected ? selected.name : "",
            email: selected ? selected.email : "",
            department: selected ? selected.department : "",
            phone: selected ? selected.phone : ""
        },
        resolver: zodResolver(teacherSchema)
    });
    const handleClose = () => {
        setSelected(null);
        setShowModal(false);
    }
    const onSubmit = (data: TeacherFormValues) => {
        console.log(data);
        if (selected) {
            // Update teacher logic here
        } else {
            // Create teacher logic here
        }
        handleClose();
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
                                            <Input id="department" placeholder="Department" {...field} />
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
                                {selected ? <Pencil className="mr-2 h-4 w-4" /> : <CirclePlus className="mr-2 h-4 w-4" />}
                                {selected ? 'Update' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Form>
        </Dialog>
    )
}

export default TeacherFormModal