import ComboBox from "@/components/ui/CustomShadcn/ComboBox"
import { InputWithIcon } from "@/components/ui/CustomShadcn/InputWithIcon"
import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function CustomFormControl({ controlItems, field, form }: {
    controlItems: any,
    field: any,
    form?: any
}) {
    switch (controlItems?.renderItem) {
        case "input":
            return (
                <InputWithIcon placeholder={controlItems?.placeholder || 'ok'} type={controlItems?.type || "ok"} {...field} />
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