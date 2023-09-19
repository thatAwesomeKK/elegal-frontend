import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import CustomFormControl from "./CustomFormControl"

const CustomFormField = ({
    formFields,
    form
}: { formFields: any, form?:any }) => {
    
    return (
        <>
            {formFields?.isGroup ?
                <div className="flex w-full flex-nowrap item-center justify-start gap-3 flex-col sm:flex-row">
                    {formFields?.groupItems?.map((item: any, index: any) => (
                        <FormField
                            key={index}
                            control={formFields?.control}
                            name={item?.name as string || ""}
                            render={({ field }) => (
                                <FormItem className={`mt-2 ${formFields?.renderItem === "comboBox" ? "inline-flex" : "w-full"}`}>
                                    {item.label && formFields.renderItem !== "button" && <FormLabel>{item.label}</FormLabel>}
                                    <FormControl>
                                        <CustomFormControl controlItems={item} field={field} form={form} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))
                    }
                </div>
                : (
                    <FormField
                        control={formFields?.control}
                        name={formFields?.name as string || ""}
                        render={({ field }) => (
                            <FormItem className={`mt-2 ${formFields?.renderItem === "comboBox" ? "inline-flex" : "w-full"}`}>
                                {formFields.label && formFields.renderItem !== "button" && <FormLabel>{formFields?.label}</FormLabel>}
                                <FormControl>
                                    <CustomFormControl controlItems={formFields} field={field} form={form} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />)}
        </>
    )
}


export default CustomFormField