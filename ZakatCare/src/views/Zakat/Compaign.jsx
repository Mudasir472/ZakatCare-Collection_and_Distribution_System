import logo1 from "../../NewImages/compaign-logo1.png"
import logo2 from "../../NewImages/compaign-logo2.png"
import "./zakat.css"
import { Link } from "react-router-dom";
function Campaign() {
    return (<>
        <div className="compaign">
            <div className="StartcompaignMain flex items-center justify-center container">
                <div className="compaign-l ">
                    <div className="compaign-bdy  flex flex-column items-center justify-center">
                        <img className="mb-3" src={logo1} alt="" />
                        <h4>Activists</h4>
                        <p className="my-4">Kickstart your campaign effortlessly with ZakatCare. Collect donations and signatures, and keep your supporters updated—all from one convenient dashboard</p>
                        <Link to="/zakatcare/donate">
                            <button className="btn btn-light">Start a campaign</button>
                        </Link>
                    </div>
                </div>
                <div className="compaign-right">
                    <div className="compaign-bdy flex flex-column items-center justify-center">
                        <img className="mb-3" src={logo2} alt="" />
                        <h4>Supporters</h4>
                        <p className="my-4">Be a force for change. Help campaigns reach their goals by signing, sharing, and donating to spread positive values in the community</p>
                        <button className="btn btn-sky">Sign the petition</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Campaign;