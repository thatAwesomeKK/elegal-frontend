'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { ComboBoxOnForm } from '../ui/CustomShadcn/ComboBoxOnForm'
import { specializations, type } from '@/lib/utils'
import { Button } from '../ui/button'
import { updateProfile } from '@/lib/apiCalls/profile'
import { Label } from '../ui/label'
import { useRouter } from 'next/navigation'

interface PageProps {
    user: any
    accessToken: string
}

const formSchema = z.object({
    type: z.string().optional().nullable(),
    specialization: z.string().optional().nullable(),
    role: z.enum(["buyer", "service-provider"], {
        required_error: "You need to select a Role.",
    }),
})

const UpdateProfessionalUserForm = ({ user, accessToken }: PageProps) => {
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: user.type || "",
            specialization: user.specialization || "",
            role: user.role || "",
        },
    })

    useEffect(() => {
        if (form.watch("role") === "buyer") {
            form.setValue("specialization", null)
            form.setValue("type", null)
        }
    }, [form.watch("role")])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        await updateProfile(values, accessToken)
        setLoading(false)
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full shadow-lg rounded-lg bg-white p-7">
                <Label>{user.email}</Label>
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl></FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="buyer" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Buyer
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="service-provider" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Service Provider
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormItem>
                    )}
                />
                {(form.watch("role") === "service-provider") &&
                    <>
                        <ComboBoxOnForm form={form} array={type} name={"type"} />
                        {form.watch("type") === "advocate" && <ComboBoxOnForm form={form} array={specializations} name={"specialization"} />}
                    </>}
                <Button className='active:scale-105' type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default UpdateProfessionalUserForm