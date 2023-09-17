'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { applyToService } from '@/lib/apiCalls/service'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"

interface PageProps {
    accessToken: string
    serviceId: string
    price?: string
}

const formSchema = z.object({
    price: z.string(),
})

const ActionButtons = ({ accessToken, serviceId, price }: PageProps) => {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: price || '0',
        },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);

        setLoading(true)
        await applyToService(accessToken, serviceId, values.price)
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="price" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default ActionButtons