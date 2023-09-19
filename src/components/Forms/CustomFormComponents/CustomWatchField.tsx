import CustomFormField from "./CustomFormField"

const CustomWatchField = ({ watchItem }: { watchItem: any }) => {
    return (
        watchItem?.watchValue === "" ? (watchItem?.form?.watch(watchItem?.watch) !== watchItem?.watchValue) && watchItem.watchItems.map((item: any, index: any) => (
            item.isWatch ? <CustomWatchField key={index} watchItem={item} /> :
                <CustomFormField
                    key={index}
                    form={watchItem?.form}
                    formFields={item}
                />
        )) : (
            watchItem?.form?.watch(watchItem?.watch) === watchItem?.watchValue) && watchItem.watchItems.map((item: any, index: any) => (
                item.isWatch ? <CustomWatchField key={index} watchItem={item} /> :
                    <CustomFormField
                        key={index}
                        form={watchItem?.form}
                        formFields={item}
                    />
            ))
    )
}

export default CustomWatchField