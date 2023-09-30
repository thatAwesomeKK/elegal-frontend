'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { rateServiceProvider } from '@/lib/apiCalls/profile'

const formSchema = z.object({
    rating: z.number(),
    description: z.string().min(10),
})

interface PageProps {
    serviceProviderId: string
}

const RatingForm = ({ serviceProviderId }: PageProps) => {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: undefined,
            description: undefined,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        console.log({ ...values, serviceProviderId });
        await rateServiceProvider({ ...values, serviceProviderId })
        setLoading(false)
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full shadow-lg rounded-lg bg-white p-7">
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rating</FormLabel>
                                <FormControl>
                                    <Input type="number" max={10} {...field} onChange={event => field.onChange(+event.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Tell us your problem" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}

export default RatingForm