'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { ComboBoxOnForm } from '../ui/CustomShadcn/ComboBoxOnForm'
import { Button } from '../ui/button'
import { updateProfile } from '@/lib/apiCalls/profile'
import { Label } from '../ui/label'
import { City, ICity, IState, State } from 'country-state-city'
import { useRouter } from 'next/navigation'

interface PageProps {
    user: any
    accessToken: string
}

const formSchema = z.object({
    username: z.string().min(4).max(50),
    first_name: z.string().min(4).max(50),
    middle_name: z.string().optional(),
    sur_name: z.string().min(4).max(50),
    state: z.string(),
    city: z.string(),
})

const UpdatePersonalUserForm = ({ user, accessToken }: PageProps) => {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState<IState[]>()
    const [city, setCity] = useState<ICity[]>()

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user.username || "",
            first_name: user.firstName || "",
            middle_name: user.middleName || "",
            sur_name: user.surName || "",
            state: user.state || "",
            city: user.city || "",
        },
    })

    useEffect(() => {
        setState(State.getStatesOfCountry("IN"))
        const arr: any = [];
        const states = State.getStatesOfCountry("IN")
        states.forEach(state => {
            arr.push({ label: state.name, value: state.isoCode })
        })
        setState(arr)
    }, [])


    useEffect(() => {
        const state = form.watch("state")
        const arr: any = [];
        const cities = City.getCitiesOfState("IN", state)
        cities.forEach(city => {
            arr.push({ label: city.name, value: city.name })
        })
        setCity(arr)
    }, [form.watch("state")])

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
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="First Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="middle_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Middle Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Middle Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="sur_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sur Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Sur Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {state && <ComboBoxOnForm form={form} array={state} name={"state"} />}
                {city && <ComboBoxOnForm form={form} array={city} name={"city"} />}
                <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default UpdatePersonalUserForm