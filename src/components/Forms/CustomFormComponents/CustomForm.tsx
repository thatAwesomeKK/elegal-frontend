import CustomFormField from "./CustomFormField"
import CustomWatchField from "./CustomWatchField"

function CustomForm({ schema }: { schema: any }) {
    return (
        schema?.map((item: any, index: any) => {
            
            return (
                item?.isWatch ?
                    <CustomWatchField key={index} watchItem={item} /> :
                    item?.form ? (<CustomFormField
                        key={index}
                        formFields={item}
                        form={item?.form}
                    />) : (<CustomFormField
                        key={index}
                        formFields={item}
                    />)
            )
        }))
}


export default CustomForm