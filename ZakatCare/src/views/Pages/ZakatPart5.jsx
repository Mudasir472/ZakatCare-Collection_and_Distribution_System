import img from "../../assets/images/zakatPart5.svg"
import { Link } from "react-router-dom";
function ZakatPart5() {
    return (<>
        <div className="zakat-part5 ">
            <div className="part5-main container flex items-center justify-between">
                <div className="part5-left flex flex-column items-start  justify-evenly">
                    <div className="part5-head">
                        <h3 className="mb-3">No question I need here?</h3>
                        <p>Can’t find the question you need, contact us for your new question.</p>
                    </div>
                    <Link to={'/zakatcare/contact'}>
                        <div className="zakat5-btn cursor-pointer flex items-center justify-center">
                            <button>Contact us</button>
                        </div>
                    </Link>
                </div>
                <div className="part5-right">
                    <img src={img} alt="" />
                </div>
            </div>
        </div>
    </>);
}

export default ZakatPart5;