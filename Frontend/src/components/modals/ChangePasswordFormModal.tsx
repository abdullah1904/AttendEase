import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useChangePasswordMutation } from '@/hooks/use-auth'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
}

const changePasswordSchema = z.object({
    oldPassword: z.string().min(6, 'Old password is required'),
    newPassword: z.string().min(6, 'New password is required'),
});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>

const ChangePasswordFormModal = ({ setShowModal, showModal }: Props) => {
    const changePasswordMutation = useChangePasswordMutation();
    const form = useForm<ChangePasswordFormValues>({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
        resolver: zodResolver(changePasswordSchema)
    });
    const handleClose = () => {
        setShowModal(false);
    }
    const onSubmit = async (data: ChangePasswordFormValues) => {
        changePasswordMutation.mutate(data, {
            onSuccess: () => {
                handleClose();
                toast.success("Password changed successfully!");
            },
            onError: (error) => {
                toast.error("Error changing password: " + error.message);
            }
        })
    }
    return (
        <Dialog open={showModal} onOpenChange={handleClose}>
            <Form {...form}>
                <DialogContent className='overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-700 hide-scrollbar max-h-[90%]'>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                        </DialogHeader>
                        <div className='flex flex-col gap-4 my-4'>
                            <FormField
                                control={form.control}
                                name="oldPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="oldPassword">Old Password</Label>
                                        <FormControl>
                                            <Input id="oldPassword" placeholder="Old Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <FormControl>
                                            <Input id="newPassword" placeholder="New Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={changePasswordMutation.isPending}>
                                {changePasswordMutation.isPending ? <Loader2 className="size-6 animate-spin" /> : "Change Password"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Form>
        </Dialog>
    )
}

export default ChangePasswordFormModal