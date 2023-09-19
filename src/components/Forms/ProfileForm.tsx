'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { ComboBoxOnForm } from '../ui/CustomShadcn/ComboBoxOnForm'
import { specializations, type as serviceProvider } from '@/lib/utils'
import { Button } from '../ui/button'
import { updateProfile } from '@/lib/apiCalls/profile'
import { Label } from '../ui/label'
import { useRouter } from 'next/navigation'
import { City, ICity, IState, State } from 'country-state-city'
import CustomForm from './CustomFormComponents/CustomForm'

interface PageProps {
    user: any
    accessToken: string
}

const ProfileForm = ({ user, accessToken }: PageProps) => {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState<IState[]>()
    const [city, setCity] = useState<ICity[]>()

    const router = useRouter()

    const profileSchema = z.object({
        username: z.string().min(4).max(50),
        first_name: z.string().min(4).max(50),
        middle_name: z.string().optional(),
        sur_name: z.string().min(4).max(50),
        email: z.string().email(),
        state: z.string(),
        city: z.string(),
        type: z.string().optional().nullable(),
        specialization: z.string().optional().nullable(),
        role: z.enum(["buyer", "service-provider"], {
            required_error: "You need to select a Role.",
        }),
    })

    const profileForm = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: user.username || "",
            first_name: user.firstName || "",
            middle_name: user.middleName || "",
            email: user.email || "",
            sur_name: user.surName || "",
            state: user.state || "",
            city: user.city || "",
            type: user.type || "",
            specialization: user.specialization || "",
            role: user.role || "",
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
        const state = profileForm.watch("state")
        const arr: any = [];
        const cities = City.getCitiesOfState("IN", state)
        cities.forEach(city => {
            arr.push({ label: city.name, value: city.name })
        })
        setCity(arr)
    }, [profileForm.watch("state")])

    const profileFormSchema = [
        {
            isWatch: false,
            control: profileForm.control,
            isGroup: true,
            groupItems: [
                {
                    name: "first_name",
                    renderItem: "input",
                    label: "First Name",
                    placeholder: "First Name",
                    type: "text",
                },
                {
                    name: "middle_name",
                    renderItem: "input",
                    label: "Middle Name",
                    placeholder: "Middle Name",
                    type: "text",
                },
                {
                    name: "sur_name",
                    renderItem: "input",
                    label: "Sur Name",
                    placeholder: "Sur Name",
                    type: "text",
                }
            ],
        },
        {
            isWatch: false,
            control: profileForm.control,
            isGroup: true,
            groupItems: [
                {
                    name: "username",
                    renderItem: "input",
                    label: "Username",
                    placeholder: "Username",
                    type: "text",
                },
                {
                    name: "email",
                    renderItem: "input",
                    label: "Email",
                    placeholder: "Email",
                    type: "email",
                },
            ],
        },
        {
            isGroup: false,
            isWatch: false,
            form: profileForm,
            name: "state",
            renderItem: "comboBox",
            array: state
        },
        {
            isWatch: true,
            isGroup: false,
            form: profileForm,
            watch: "state",
            watchValue: "",
            watchItems: [
                {
                    isWatch: false,
                    name: "city",
                    renderItem: "comboBox",
                    array: city
                },
            ]
        },
        {
            isWatch: false,
            isGroup: false,
            control: profileForm.control,
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
            form: profileForm,
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
                    form: profileForm,
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
                    control: profileForm.control,
                    name: "licenseId",
                    renderItem: "input",
                    label: "License ID",
                    placeholder: "LicenseId",
                    type: "text",
                }
            ]
        }
    ]

    const onProfileSubmit = async (values: z.infer<typeof profileSchema>) => {
        setLoading(true)

        const { email, ...rest } = values

        await updateProfile(rest, accessToken)
        setLoading(false)
        router.refresh()
    }


    return (
        <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="w-full shadow-lg rounded-lg bg-white px-5 pb-5 pt-3">
                <CustomForm schema={profileFormSchema} />
                <div className='mt-3 flex gap-3'>
                    <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
                    <Button type="button" variant="ghost" onClick={() => profileForm.reset()}>
                        Reset
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default ProfileForm