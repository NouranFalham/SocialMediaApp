import Hero from "../../Components/Hero/Hero";
import SignUpForm from "../../Components/SignUpForm/SignUpForm";

export default function SignUp() {
    return (
        <>
            <main>
                <div className="grid lg:grid-cols-2">
                    <Hero title={{normal: "Connect with", highlight:"amazing people"}}
                    description={"Join our community and make new connections today!"}/>
                    <SignUpForm/>
                </div>
            </main>
        </>
    )
}
