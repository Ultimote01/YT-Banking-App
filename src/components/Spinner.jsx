import clsx from "clsx"
import "../styles/spinner.css"

export default function Spinner({className,...props}) {
return <div {...props} className={clsx(className,"spinner-div")} ></div>
}
