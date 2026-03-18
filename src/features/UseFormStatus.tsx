import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { fakeRequest } from '../fakeserver'

type Props = {}

function SubmitBtn() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" disabled={pending}> submit</button>
    )
}



function UseFormStatus({ }: Props) {
    async function submitAction(_prev: null, data: FormData) {
        await fakeRequest(data.get('name'), false)
        return null;
    }

    const [_state, formAction, _isPending] = useActionState(submitAction, null)
    return (
        <form action={formAction}>
            <input name="name" />
            <SubmitBtn />
        </form>
    )
}

export default UseFormStatus
