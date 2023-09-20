"use client"

import React, { useEffect, useState } from 'react'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { register, login, forgotPassword, changePassword } from '@/lib/apiCalls/auth'
import { Form } from '../ui/form'
import { Button } from '../ui/button'

import { specializations, type as serviceProvider } from '@/lib/utils'

import Link from 'next/link'
import CustomForm from './CustomFormComponents/CustomForm'

const registerSchema = z.object({
    username: z.string().min(4).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
    licenseId: z.string().min(6).max(50).optional(),
    type: z.string().optional(),
    specialization: z.string().optional(),
    role: z.enum(["buyer", "service-provider"], {
        required_error: "You need to select a Role.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
})

const loginSchema = z.object({
    email: z.string().min(4).max(50),
    password: z.string().min(6).max(50),
})

const forgotPasswordSchema = z.object({
    email: z.string().email(),
})

const changePasswordSchema = z.object({
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
})


const AuthForm = ({ type, token }: { type: string, token?: string }) => {
    const [loading, setLoading] = useState(false)
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

    const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const changePasswordForm = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
        setLoading(true)
        const { confirmPassword, ...rest } = values
        await register(rest)
        // reset form
        registerForm.reset()
        setLoading(false)
    }

    const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
        setLoading(true)
        await login(values)
        // reset form
        loginForm.reset()
        setLoading(false)
    }

    const onForgotPasswordSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
        setLoading(true)
        await forgotPassword(values.email)
        // reset form
        forgotPasswordForm.reset()
        setLoading(false)
    }

    const onChangePasswordSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
        setLoading(true)
        const { password } = values
        await changePassword(token as string, password)
        // reset form
        changePasswordForm.reset()
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
            placeholder: "Username",
            type: "text",
        },
        {
            isWatch: false,
            isGroup: false,
            control: registerForm.control,
            name: "email",
            renderItem: "input",
            label: "Email",
            placeholder: "Email",
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
                    placeholder: "Password",
                    type: "password",
                },
                {
                    name: "confirmPassword",
                    renderItem: "input",
                    label: "Confirm Password",
                    placeholder: "Confirm Password",
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
            placeholder: "Role",
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
                    placeholder: "LicenseId",
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
            placeholder: "Email",
            type: "email",
        },
        {
            isWatch: false,
            control: loginForm.control,
            isGroup: false,
            name: "password",
            renderItem: "input",
            label: "Password",
            placeholder: "Password",
            type: "password",
        }
    ]

    const forgotPasswordFormSchema = [
        {
            isWatch: false,
            isGroup: false,
            control: loginForm.control,
            name: "email",
            renderItem: "input",
            label: "Email",
            placeholder: "Email",
            type: "email",
        },
    ]

    const changePasswordFormSchema = [
        {
            isWatch: false,
            control: changePasswordForm.control,
            isGroup: false,
            name: "password",
            renderItem: "input",
            label: "Password",
            placeholder: "Password",
            type: "password",
        },
        {
            isWatch: false,
            control: changePasswordForm.control,
            isGroup: false,
            name: "confirm password",
            renderItem: "input",
            label: "Confirm Password",
            placeholder: "Confirm Password",
            type: "password",
        }
    ]

    switch (type) {
        case "register":
            return (
                <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="w-full shadow-lg rounded-lg bg-white px-5 pb-5 pt-3">
                        <CustomForm schema={registerFormSchema} />
                        <div className='mt-3 flex gap-3'>
                            <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
                            <Button type="button" variant="ghost" onClick={() => registerForm.reset()}>
                                Reset
                            </Button>
                        </div>
                    </form>
                </Form>
            )
        case "login":
            return (
                <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className=" w-full shadow-lg rounded-lg bg-white p-7">
                        <CustomForm schema={loginFormSchema} />
                        <div className='flex justify-between flex-wrap items-center mt-4'>
                            <div className='flex items-center gap-4'>
                                <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
                                <Button type="button" variant="ghost" onClick={() => loginForm.reset()}>
                                    Reset
                                </Button>
                            </div>
                            <Button asChild variant="ghost">
                                <Link href={'/auth?type=forgot-password'} className='cursor-pointer'>Forgot Password ?</Link>
                            </Button>
                        </div>
                    </form>
                </Form>
            )
        case "forgotPassword":
            return (
                <Form {...forgotPasswordForm}>
                    <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className=" w-full shadow-lg rounded-lg bg-white p-7">
                        <CustomForm schema={forgotPasswordFormSchema} />
                        <div className='flex justify-start flex-wrap items-center gap-2 mt-4'>
                            <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
                            <Button asChild variant={"ghost"}>
                                <Link href={'/auth?type=login'} className='cursor-pointer'>Login</Link>
                            </Button>
                        </div>
                    </form>
                </Form>
            )
        case "changePassword":
            return (
                <Form {...changePasswordForm}>
                    <form onSubmit={changePasswordForm.handleSubmit(onChangePasswordSubmit)} className=" w-full shadow-lg rounded-lg bg-white p-7">
                        <CustomForm schema={changePasswordFormSchema} />
                        <div className='flex justify-start flex-wrap items-center gap-4 mt-4'>
                            <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
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

export default AuthForm