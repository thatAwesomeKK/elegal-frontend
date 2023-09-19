'use client'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { ComboBoxOnForm } from '../ui/CustomShadcn/ComboBoxOnForm'
import { specializations, type } from '@/lib/utils'
import { register } from '@/lib/apiCalls/auth'

const formSchema = z.object({
    username: z.string().min(4).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(50),
    licenseId: z.string().min(6).max(50).optional(),
    type: z.string().optional(),
    specialization: z.string().optional(),
    role: z.enum(["buyer", "service-provider"], {
        required_error: "You need to select a Role.",
    }),
})

const RegisterForm = () => {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            licenseId: undefined || "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // setLoading(true)
        // await register(values)
        // setLoading(false)
        console.log(values)
    }

    useEffect(() => {
        if (form.watch("role") === "buyer") {
            form.setValue("specialization", undefined)
            form.setValue("licenseId", undefined)
            form.setValue("type", undefined)
        }
    }, [form.watch("role")])


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full shadow-lg rounded-lg bg-white p-7">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
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
                            </FormControl>
                        </FormItem>
                    )}
                />

                {form.watch("role") === "service-provider" &&
                    <>
                        <ComboBoxOnForm form={form} array={type} name={"type"} />
                        {form.watch("type") === "advocate" && <ComboBoxOnForm form={form} array={specializations} name={"specialization"} />}
                        <FormField
                            control={form.control}
                            name="licenseId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>License Id</FormLabel>
                                    <FormControl>
                                        <Input placeholder="licenseId" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>}
                <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default RegisterForm