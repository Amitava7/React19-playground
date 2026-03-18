import { createContext, Suspense, use, useContext } from "react"

const Mood = createContext<string>("")
interface UT {
  name: string
}
const prom = new Promise<UT>((resolve, reject) => {
  setTimeout(() => resolve({ name: "amit" }), 500)
})


function User() {
  const user = use(prom)
  const mood = use(Mood)
  return (
    <div>{user.name} with {mood}</div>
  )
}

function UseDemo() {
  return (
    <Mood value="happy">
      <div>Use demo below </div>
      <Suspense fallback={<div>ooooo</div>}>
        <User />
      </Suspense>
    </Mood>
  )
}

export default UseDemo
