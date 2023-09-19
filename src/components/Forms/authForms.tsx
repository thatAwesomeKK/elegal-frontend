"use client"

import React, { useEffect, useState } from 'react'
import * as z from "zod"
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { register, login } from '@/lib/apiCalls/auth'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

import { specializations, type as serviceProvider } from '@/lib/utils'
import { InputWithIcon } from '../ui/CustomShadcn/InputWithIcon'
import ComboBox from '../ui/CustomShadcn/ComboBox'
import Link from 'next/link'

const registerSchema = z.object({
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

const loginSchema = z.object({
    email: z.string().min(4).max(50),
    password: z.string().min(6).max(50),
})



const AuthForms = ({ type }: { type: string }) => {
    const [loading, setLoading] = useState(false)
    // console.log("type", type)
    const registerForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            licenseId: "",
        },
    })

    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
        // setLoading(true)
        // await register(values)
        // setLoading(false)
        console.log(values)
    }

    const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
        setLoading(true)
        await login(values)
        setLoading(false)
    }

    useEffect(() => {
        if (registerForm.watch("role") === "buyer") {
            registerForm.setValue("specialization", undefined)
            registerForm.setValue("licenseId", undefined)
            registerForm.setValue("type", undefined)
        }
    }, [registerForm.watch("role")])

    const registerFormSchema = [
        {
            isWatch: false,
            isGroup: false,
            control: registerForm.control,
            name: "username",
            renderItem: "input",
            label: "Username",
            placeholder: "username",
            type: "text",
        },
        {
            isWatch: false,
            isGroup: false,
            control: registerForm.control,
            name: "email",
            renderItem: "input",
            label: "Email",
            placeholder: "email",
            type: "email",
        },
        {
            isWatch: false,
            control: registerForm.control,
            isGroup: true,
            groupItems: [
                {
                    name: "password",
                    renderItem: "input",
                    label: "Password",
                    placeholder: "password",
                    type: "password",
                },
                {
                    name: "confirmPassword",
                    renderItem: "input",
                    label: "Confirm Password",
                    placeholder: "confirm password",
                    type: "password",
                }
            ],
        },
        {
            isWatch: false,
            isGroup: false,
            control: registerForm.control,
            name: "role",
            renderItem: "radioGroup",
            label: "Role",
            placeholder: "role",
            type: "radio",
            radioItems: [{
                label: "Buyer",
                value: "buyer",
            },
            {
                label: "Service Provider",
                value: "service-provider"
            }]
        },
        {
            isWatch: true,
            isGroup: false,
            watch: "role",
            watchValue: "service-provider",
            form: registerForm,
            watchItems: [
                {
                    isWatch: false,
                    name: "type",
                    renderItem: "comboBox",
                    array: serviceProvider
                },
                {
                    isWatch: true,
                    watch: "type",
                    watchValue: "advocate",
                    form: registerForm,
                    watchItems: [
                        {
                            isWatch: false,
                            name: "specialization",
                            renderItem: "comboBox",
                            array: specializations
                        }
                    ]
                },
                {
                    isWatch: false,
                    control: registerForm.control,
                    name: "licenseId",
                    renderItem: "input",
                    label: "License ID",
                    placeholder: "licenseId",
                    type: "text",
                }
            ]
        }
    ]

    const loginFormSchema = [
        {
            isWatch: false,
            isGroup: false,
            control: loginForm.control,
            name: "email",
            renderItem: "input",
            label: "Email",
            placeholder: "email",
            type: "email",
        },
        {
            isWatch: false,
            control: loginForm.control,
            isGroup: false,
            name: "password",
            renderItem: "input",
            label: "Password",
            placeholder: "password",
            type: "password",
        }
    ]

    switch (type) {
        case "register":
            return (
                <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="w-full shadow-lg rounded-lg bg-white px-5 pb-5 pt-3">
                        <CustomForm schema={registerFormSchema} />
                        <Button disabled={loading} className='active:scale-105 mt-3' type="submit">Submit</Button>
                    </form>
                </Form>
            )
        case "login":
            return (
                <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className=" w-full shadow-lg rounded-lg bg-white p-7">
                        <CustomForm schema={loginFormSchema} />
                        <div className='flex justify-start items-center gap-4 mt-4'>
                            <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
                            <Button asChild variant="ghost">
                                <Link href={'/auth?type=forgot-password'} className='cursor-pointer'>Forgot Password ?</Link>
                            </Button>
                        </div>
                    </form>
                </Form>
            )
        default:
            return (
                <></>
            )
    }
}

const CustomForm = ({ schema }: { schema: any }) => {
    return (
        schema?.map((item: any, index: any) => (
            item?.isWatch ?
                <CustomWatchField key={index} watchItem={item} /> :
                <CustomFormField
                    key={index}
                    formFields={item}
                />

        )))
}

const CustomWatchField = ({ watchItem }: { watchItem: any }) => {
    return (
        watchItem.form.watch(watchItem.watch) === watchItem.watchValue && watchItem.watchItems.map((item: any, index: any) => (
            item.isWatch ? <CustomWatchField key={index} watchItem={item} /> :
                <CustomFormField
                    key={index}
                    form={watchItem?.form}
                    formFields={item}
                />
        )))
}

const CustomFormField = ({
    formFields,
    form
}: { formFields: any, form?: any }) => {
    return (
        <>
            {formFields?.isGroup ?
                <div className="flex w-full flex-nowrap item-center justify-start gap-3">
                    {formFields?.groupItems?.map((item: any, index: any) => (
                        <FormField
                            key={index}
                            control={formFields?.control}
                            name={item?.name as string || ""}
                            render={({ field }) => (
                                <FormItem className={`mt-2 ${formFields?.renderItem === "comboBox" ? "inline-flex" : "w-full"}`}>
                                    {item.label && formFields.renderItem !== "button" && <FormLabel>{item.label}</FormLabel>}
                                    <FormControl>
                                        <CustomFormControl controlItems={item} field={field} form={form} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))
                    }
                </div>
                : (
                    <FormField
                        control={formFields?.control}
                        name={formFields?.name as string || ""}
                        render={({ field }) => (
                            <FormItem className={`mt-2 ${formFields?.renderItem === "comboBox" ? "inline-flex" : "w-full"}`}>
                                {formFields.label && formFields.renderItem !== "button" && <FormLabel>{formFields?.label}</FormLabel>}
                                <FormControl>
                                    <CustomFormControl controlItems={formFields} field={field} form={form} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />)}
        </>
    )
}

const CustomFormControl = (
    { controlItems, field, form }: { controlItems: any, field: any, form?: any }
) => {
    switch (controlItems?.renderItem) {
        case "input":
            return (
                <InputWithIcon placeholder={controlItems?.placeholder || 'ok'} type={controlItems?.type || "ok"} {...field} />
            )
        case "radioGroup":
            return (
                <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-nowrap"
                >
                    {
                        controlItems?.radioItems.map((item: any, index: number) => (
                            <FormItem className="flex items-center gap-2 m-0 space-y-0" key={index}>
                                <FormControl>
                                    <RadioGroupItem id={item.value} value={item.value} className='mt-[2px]' />
                                </FormControl>
                                <FormLabel htmlFor={item.value} className="font-normal cursor-pointer m-0">
                                    {item.label}
                                </FormLabel>
                            </FormItem>
                        ))
                    }
                </RadioGroup>
            )
        case "comboBox":
            return (
                <ComboBox
                    form={form}
                    field={field}
                    array={controlItems?.array}
                    name={controlItems?.name}
                />
            )
    }
}

export default AuthForms