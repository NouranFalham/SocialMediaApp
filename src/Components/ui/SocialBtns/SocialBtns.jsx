import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SocialBtns() {
return (
        <>
        <div className="btns flex items-center gap-3 *:grow mb-3">
            <button className="btn hover:scale-102 transition-transform duration-300">
            <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
            <span>Google</span>
            </button>
            <button className="btn bg-blue-600 text-white  hover:scale-102 transition-transform duration-300">
            <FontAwesomeIcon icon={faFacebook} />
            <span>Facebook</span>
            </button>
        </div>
        </>
    );
}
