'use client'
import React, { useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Button } from '../button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../command'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from "lucide-react"

export const ComboBoxOnForm = ({ form, array, name }: any) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel className='capitalize'>{name}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-[200px] justify-between capitalize",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? array.find(
                                            (arr: any) => arr.value === field.value
                                        )?.label
                                        : `Select ${name}`}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput className='capitalize' placeholder={`Search ${name}`} />
                                <CommandEmpty className='capitalize'>{`No ${name} Found`}</CommandEmpty>
                                <CommandGroup className='overflow-y-scroll h-96'>
                                    {array.map((arr: any) => (
                                        <CommandItem
                                            value={arr.label}
                                            key={arr.value}
                                            onSelect={() => {
                                                form.setValue(name, arr.value)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    arr.value === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {arr.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
