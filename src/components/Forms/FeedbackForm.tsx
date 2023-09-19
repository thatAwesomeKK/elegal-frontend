'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { createFeedback } from '@/lib/apiCalls/feedback'

interface PageProps {
    accessToken: string
    orderId: string
}

const formSchema = z.object({
    description: z.string().min(20),
})

const FeedbackForm = ({ accessToken, orderId }: PageProps) => {

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        await createFeedback(accessToken, values.description, orderId)
        setLoading(false)
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-4/12 shadow-lg rounded-lg bg-white p-7">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Story / Experience</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Tell us something about your experience" {...field} />
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

export default FeedbackForm