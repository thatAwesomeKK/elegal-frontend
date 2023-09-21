"use client"
import React, { useEffect, useState } from 'react'
import { Form } from '../ui/form'
import { Button } from '../ui/button'
import CustomForm from './CustomFormComponents/CustomForm'
import Link from 'next/link'
import { State, City, IState, ICity } from 'country-state-city';
import { createServiceRequest } from '@/lib/apiCalls/service'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { case_type } from '@/lib/utils'
import { formSchemaType } from "@/lib/typings.d"

interface PageProps {
  accessToken?: string
  serviceType: string
}

const AdvocateSchema = z.object({
  state: z.string(),
  city: z.string(),
  mobile_no: z.string().min(10).max(10),
  description: z.string().min(20),
  case_type: z.string().optional(),
})

const ArbitratorSchema = z.object({
  state: z.string(),
  city: z.string(),
  mobile_no: z.string().min(10).max(10),
  description: z.string().min(20),
})

const DocumentWriterSchema = z.object({
  state: z.string(),
  city: z.string(),
  mobile_no: z.string().min(10).max(10),
  description: z.string().min(20),
})

const NotarySchema = z.object({
  state: z.string(),
  city: z.string(),
  price: z.string(),
  mobile_no: z.string().min(10).max(10),
  description: z.string().min(20),
})

const MediatorSchema = z.object({
  state: z.string(),
  city: z.string(),
  mobile_no: z.string().min(10).max(10),
  description: z.string().min(20),
})


const ServicesForm = ({ accessToken, serviceType }: PageProps) => {

  const [loading, setLoading] = useState(false)
  const [state, setState] = useState<IState[]>()
  const [city, setCity] = useState<ICity[]>()

  const advocateForm = useForm<z.infer<typeof AdvocateSchema>>({
    resolver: zodResolver(AdvocateSchema),
    defaultValues: {
      mobile_no: "",
      description: "",
      state: "",
      city: "",
      case_type: "",
    },
  })

  const onAdvocateSubmit = async (values: z.infer<typeof AdvocateSchema>) => {
    setLoading(true)
    await createServiceRequest({ ...values, serviceType }, accessToken)
    setLoading(false)
  }

  const arbitratorForm = useForm<z.infer<typeof ArbitratorSchema>>({
    resolver: zodResolver(ArbitratorSchema),
    defaultValues: {
      mobile_no: "",
      description: "",
      state: "",
      city: "",
    },
  })

  const onArbitratorSubmit = async (values: z.infer<typeof ArbitratorSchema>) => {
    setLoading(true)
    await createServiceRequest({ ...values, serviceType }, accessToken)
    setLoading(false)
  }

  const documentWriterForm = useForm<z.infer<typeof DocumentWriterSchema>>({
    resolver: zodResolver(DocumentWriterSchema),
    defaultValues: {
      mobile_no: "",
      description: "",
      state: "",
      city: "",
    },
  })

  const onDocumentWriterSubmit = async (values: z.infer<typeof DocumentWriterSchema>) => {
    setLoading(true)
    await createServiceRequest({ ...values, serviceType }, accessToken)
    setLoading(false)
  }

  const notaryForm = useForm<z.infer<typeof NotarySchema>>({
    resolver: zodResolver(NotarySchema),
    defaultValues: {
      mobile_no: "",
      description: "",
      price: "",
      state: "",
      city: "",
    },
  })

  const onNotarySubmit = async (values: z.infer<typeof NotarySchema>) => {
    setLoading(true)
    await createServiceRequest({ ...values, serviceType }, accessToken)
    setLoading(false)
  }

  const mediatorForm = useForm<z.infer<typeof MediatorSchema>>({
    resolver: zodResolver(MediatorSchema),
    defaultValues: {
      mobile_no: "",
      description: "",
      state: "",
      city: "",
    },
  })

  const onMediatorSubmit = async (values: z.infer<typeof MediatorSchema>) => {
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
    let state = ""
    if (advocateForm.watch("state")) {
      state = advocateForm.watch("state")
    } else if (arbitratorForm.watch("state")) {
      state = arbitratorForm.watch("state")
    } else if (documentWriterForm.watch("state")) {
      state = documentWriterForm.watch("state")
    } else if (notaryForm.watch("state")) {
      state = notaryForm.watch("state")
    } else if (mediatorForm.watch("state")) {
      state = mediatorForm.watch("state")
    }
    const arr: any = [];
    const cities = City.getCitiesOfState("IN", state)
    cities.forEach(city => {
      arr.push({ label: city.name, value: city.name })
    })
    setCity(arr)
  }, [advocateForm.watch("state"),
  arbitratorForm.watch('state'),
  documentWriterForm.watch('state'),
  notaryForm.watch('state'),
  mediatorForm.watch('state')])

  const advocateFormSchema: formSchemaType = [
    {
      isGroup: true,
      isWatch: false,

      groupItems: [
        {
          isGroup: false,
          isWatch: false,
          form: advocateForm,
          name: "state",
          renderItem: "comboBox",
          array: state
        },
        {
          isWatch: true,
          isGroup: false,
          form: advocateForm,
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
      ]
    },

    {
      isGroup: false,
      isWatch: false,
      name: "mobile_no",
      renderItem: "input",
      label: "Phone Number",
      placeholder: "Phone Number",
      type: "text",
    },
    {
      isGroup: false,
      isWatch: false,
      form: advocateForm,
      name: "case_type",
      renderItem: "comboBox",
      array: case_type
    },
    {
      isGroup: false,
      isWatch: false,
      name: "description",
      renderItem: "textarea",
      label: "Info about your Case",
      placeholder: "Tell us a little bit about your case",
      type: "textfield",
    },
  ]

  const notaryFormSchema: formSchemaType = [
    {
      isGroup: false,
      isWatch: false,
      name: "price",
      renderItem: "input",
      label: "Price",
      placeholder: "Price",
      type: "text",
    },
    {
      isGroup: true,
      isWatch: false,
      groupItems: [
        {
          isGroup: false,
          isWatch: false,
          form: notaryForm,
          name: "state",
          renderItem: "comboBox",
          array: state
        },
        {
          isWatch: true,
          isGroup: false,
          form: notaryForm,
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
      ]
    },
    {
      isGroup: false,
      isWatch: false,
      name: "mobile_no",
      renderItem: "input",
      label: "Phone Number",
      placeholder: "Phone Number",
      type: "text",
    },
    {
      isGroup: false,
      isWatch: false,
      name: "description",
      renderItem: "textarea",
      label: "Info about your Notary",
      placeholder: "Tell us a little about your Notary",
      type: "textfield",
    },
  ]

  const documentWriterFormSchema: formSchemaType = [
    {
      isGroup: true,
      isWatch: false,
      groupItems: [
        {
          isGroup: false,
          isWatch: false,
          form: documentWriterForm,
          name: "state",
          renderItem: "comboBox",
          array: state
        },
        {
          isWatch: true,
          isGroup: false,
          form: documentWriterForm,
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
      ]
    },
    {
      isGroup: false,
      isWatch: false,
      name: "mobile_no",
      renderItem: "input",
      label: "Phone Number",
      placeholder: "Phone Number",
      type: "text",
    },
    {
      isGroup: false,
      isWatch: false,
      name: "description",
      renderItem: "textarea",
      label: "Info about your Document",
      placeholder: "Tell us a little about your Document",
      type: "textfield",
    },
  ]

  const arbitratorFormSchema: formSchemaType = [
    {
      isGroup: true,
      isWatch: false,
      groupItems: [
        {
          isGroup: false,
          isWatch: false,
          form: arbitratorForm,
          name: "state",
          renderItem: "comboBox",
          array: state
        },
        {
          isWatch: true,
          isGroup: false,
          form: arbitratorForm,
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
      ]
    },
    {
      isGroup: false,
      isWatch: false,
      name: "mobile_no",
      renderItem: "input",
      label: "Phone Number",
      placeholder: "Phone Number",
      type: "text",
    },
    {
      isGroup: false,
      isWatch: false,
      name: "description",
      renderItem: "textarea",
      label: "Info about your Issue",
      placeholder: "Tell us a little about your Issue",
      type: "textfield",
    },
  ]

  const mediatorFormSchema: formSchemaType = [
    {
      isGroup: true,
      isWatch: false,
      groupItems: [
        {
          isGroup: false,
          isWatch: false,
          form: mediatorForm,
          name: "state",
          renderItem: "comboBox",
          array: state
        },
        {
          isWatch: true,
          isGroup: false,
          form: mediatorForm,
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
      ]
    },
    {
      isGroup: false,
      isWatch: false,
      name: "mobile_no",
      renderItem: "input",
      label: "Phone Number",
      placeholder: "Phone Number",
      type: "text",
    },
    {
      isGroup: false,
      isWatch: false,
      name: "description",
      renderItem: "textarea",
      label: "Info about your Issue",
      placeholder: "Tell us a little about your Issue",
      type: "textfield",
    },
  ]

  switch (serviceType) {
    case "advocate":
      return (
        <Form {...advocateForm}>
          <form onSubmit={advocateForm.handleSubmit(onAdvocateSubmit)} className="w-full shadow-lg rounded-lg bg-white px-5 pb-5 pt-3">
            <CustomForm schema={advocateFormSchema} />
            <div className='mt-3 flex gap-3'>
              <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
              <Button type="button" variant="ghost" onClick={() => advocateForm.reset()}>
                Reset
              </Button>
            </div>
          </form>
        </Form>
      )
    case "notary":
      return (
        <Form {...notaryForm}>
          <form onSubmit={notaryForm.handleSubmit(onNotarySubmit)} className=" w-full shadow-lg rounded-lg bg-white p-7">
            <CustomForm schema={notaryFormSchema} />
            <div className='mt-3 flex gap-3'>
              <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
              <Button type="button" variant="ghost" onClick={() => notaryForm.reset()}>
                Reset
              </Button>
            </div>
          </form>
        </Form>
      )
    case "document-writer":
      return (
        <Form {...documentWriterForm}>
          <form onSubmit={documentWriterForm.handleSubmit(onDocumentWriterSubmit)} className=" w-full shadow-lg rounded-lg bg-white p-7">
            <CustomForm schema={documentWriterFormSchema} />
            <div className='mt-3 flex gap-3'>
              <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
              <Button type="button" variant="ghost" onClick={() => documentWriterForm.reset()}>
                Reset
              </Button>
            </div>
          </form>
        </Form>
      )
    case "arbitrator":
      return (
        <Form {...arbitratorForm}>
          <form onSubmit={arbitratorForm.handleSubmit(onArbitratorSubmit)} className=" w-full shadow-lg rounded-lg bg-white p-7">
            <CustomForm schema={arbitratorFormSchema} />
            <div className='mt-3 flex gap-3'>
              <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
              <Button type="button" variant="ghost" onClick={() => arbitratorForm.reset()}>
                Reset
              </Button>
            </div>
          </form>
        </Form>
      )
    case "mediator":
      return (
        <Form {...mediatorForm}>
          <form onSubmit={mediatorForm.handleSubmit(onMediatorSubmit)} className=" w-full shadow-lg rounded-lg bg-white p-7">
            <CustomForm schema={mediatorFormSchema} />
            <div className='mt-3 flex gap-3'>
              <Button disabled={loading} className='active:scale-105' type="submit">Submit</Button>
              <Button type="button" variant="ghost" onClick={() => mediatorForm.reset()}>
                Reset
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

export default ServicesForm