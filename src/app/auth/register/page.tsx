import { redirect } from 'next/navigation'
const Register = () => {
    redirect('/auth?type=register')
    return (
        <></>
    )
}

export default Register