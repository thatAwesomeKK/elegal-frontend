'use client'
import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { case_type } from '@/lib/utils'
import { ComboBoxOnForm } from '../ui/CustomShadcn/ComboBoxOnForm'
import { Textarea } from '../ui/textarea'
import { State, City, IState, ICity } from 'country-state-city';
import { createServiceRequest } from '@/lib/apiCalls/service'

interface PageProps {
    accessToken?: string
    serviceType: string
}

const formSchema = z.object({
    state: z.string(),
    city: z.string(),
    mobile_no: z.string().min(10).max(10),
    description: z.string().min(20),
    case_type: z.string().optional(),
})

const AdvocateForm = ({ accessToken, serviceType }: PageProps) => {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState<IState[]>()
    const [city, setCity] = useState<ICity[]>()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mobile_no: "",
            description: "",
            state: "",
            city: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        await createServiceRequest({ ...values, serviceType }, accessToken)
        setLoading(false)
    }

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


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-4/12 shadow-lg rounded-lg bg-white p-7">
                {state && <ComboBoxOnForm form={form} array={state} name={"state"} />}
                {city && <ComboBoxOnForm form={form} array={city} name={"city"} />}
                <FormField
                    control={form.control}
                    name="mobile_no"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Mobile no." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <ComboBoxOnForm form={form} array={case_type} name={"case_type"} />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Info about case</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about your issue"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={loading} className='active:scale-105 w-72' type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default AdvocateForm