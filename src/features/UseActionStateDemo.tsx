import { useActionState } from "react";
import { fakeRequest } from "../fakeserver";

interface FormState {
    success: boolean;
    error: string | null;
}

async function submitAction(_prevState: FormState, formData: FormData) {
    const name = formData.get('name');
    try {
        await fakeRequest(name, Math.random() < 0.5);
        return { success: true, error: null }
    } catch {
        return { success: false, error: "something went wrong" }
    }
}

export default function UseActionStateDemo() {
    const [state, formAction, isPending] = useActionState(submitAction, { success: false, error: null })

    return (
        <form action={formAction}>
            <input name="name" disabled={isPending} style={state.error ? { border: '1px solid red' } : undefined}
            />
            <button type="submit" disabled={isPending}>
                {isPending ? "submitting" : "submit"}
            </button>
            {
                state.success && <p>Sucess </p>
            }
            {
                state.error && <p>failue</p>
            }
        </form>
    )
}
