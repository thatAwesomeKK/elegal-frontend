import ComboBox from "@/components/ui/CustomShadcn/ComboBox"
import { InputWithIcon } from "@/components/ui/CustomShadcn/InputWithIcon"
import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function CustomFormControl({ controlItems, field, form }: {
    controlItems: any,
    field: any,
    form?: any
}) {
    console.log(field)
    switch (controlItems?.renderItem) {
        case "input":
            return (
                <>
                    {
                        (controlItems?.type === "email") ? (
                            <>
                                <div className="flex h-10 select-none cursor-not-allowed w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative font-semibold">
                                    {field.value}
                                </div>
                            </>
                        ) :
                            (<InputWithIcon placeholder={controlItems?.placeholder || 'ok'} type={controlItems?.type || "ok"}  {...field} />)
                    }
                </>

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


export default CustomFormControl