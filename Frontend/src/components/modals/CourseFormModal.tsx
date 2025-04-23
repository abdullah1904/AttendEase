import { Course, CourseFormValues, courseSchema } from '@/types/course'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { CirclePlus, Loader2, Pencil } from 'lucide-react'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { departmentOptions } from '@/utils'

type Props = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
    selected: Course | null
    setSelected: (selected: Course | null) => void
}

const CourseFormModal = ({ selected, setSelected, setShowModal, showModal }: Props) => {
    const form = useForm<CourseFormValues>({
        defaultValues: {
            name: selected ? selected.name : "",
            code: selected ? selected.code : "",
            credits: selected ? selected.credits : undefined,
            department: selected ? String(selected.department) : "",
            session: selected ? selected.session : "",
            section: selected ? selected.section : "",
            // instructor: selected ? selected.instructor : "",
        },
        resolver: zodResolver(courseSchema)
    });
    const handleClose = () => {
        setSelected(null);
        setShowModal(false);
    }
    const onSubmit = (data: CourseFormValues) => {
        console.log(data);
    }
    return (
        <Dialog open={showModal} onOpenChange={handleClose}>
            <Form {...form}>
                <DialogContent className='overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-700 hide-scrollbar max-h-[90%]'>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>{selected ? 'Update' : 'Create'} Course</DialogTitle>
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
                                name="code"
                                disabled={!!selected}
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="code">Code</Label>
                                        <FormControl>
                                            <Input id="code" type="text" placeholder="Code (i.e. CS305)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="credits"
                                disabled={!!selected}
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="credits">Credits</Label>
                                        <FormControl>
                                            <Input id="credits" type="text" placeholder="Credits" {...field} />
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
                            <div className='grid grid-cols-2 gap-4'>
                                <FormField
                                    control={form.control}
                                    name="session"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="session">Session</Label>
                                            <FormControl>
                                                <Input id="session" type="text" placeholder="Session (i.e. 2022-2026)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="section"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="section">Section</Label>
                                            <FormControl>
                                                <Input id="section" type="text" placeholder="Section (i.e. A1)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="submit">
                                {false ? (
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

export default CourseFormModal