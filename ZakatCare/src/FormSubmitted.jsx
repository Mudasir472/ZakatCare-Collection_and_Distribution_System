import success from "./assets/images/success.svg"
import { Link } from "react-router-dom";
function FormSubmitted() {
    return (<>
        <div className="submitted">
            <div className="flex flex-col gap-[2rem] items-center justify-center mb-[40px]">
                <img src={success} alt="" />
                <h2>Thank You</h2>
                <p>Form has been submitted</p>

                <Link to={'/'}>
                    <button className="bg-[#6059C9] text-white h-[56px] w-[129px] font-medium rounded-lg">Home</button>
                </Link>
            </div>
        </div>
    </>);
}

export default FormSubmitted;