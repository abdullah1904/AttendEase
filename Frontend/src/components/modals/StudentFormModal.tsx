import { Student, StudentFormValues, studentSchema } from '@/types/student'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CirclePlus, Pencil } from 'lucide-react'

type Props = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
    selected: Student | null
    setSelected: (selected: Student | null) => void
}

const StudentFormModal = ({ selected, setSelected, setShowModal, showModal }: Props) => {
    const form = useForm<StudentFormValues>({
        defaultValues: {
            name: selected ? selected.name : "",
            email: selected ? selected.email : "",
            department: selected ? selected.department : "",
            phone: selected ? selected.phone : ""
        },
        resolver: zodResolver(studentSchema)
    });
    const handleClose = () => {
        setSelected(null);
        setShowModal(false);
    }
    const onSubmit = (data: StudentFormValues) => {
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

export default StudentFormModal