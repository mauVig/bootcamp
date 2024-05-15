import { BORDER_BLACK } from "../../constant/myConstant"
import Spinner from "./Spinner"

export default function ContSpinner() {
  return (
    <div className={`w-full h-[300px] flex justify-center items-center gap-6 ${BORDER_BLACK}`}>
      <Spinner />
    </div>
  )
}
