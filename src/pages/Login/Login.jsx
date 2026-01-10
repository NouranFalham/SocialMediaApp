import Hero from "../../Components/Hero/Hero";
import LoginForm from "../../Components/LoginForm/LoginForm";

export default function Login() {
    return (
        <>
            <main>
                <div className="grid lg:grid-cols-2">
                    <Hero title={{normal: "Welcome back", highlight:"to SocialSphere app"}}
                    description={"Sign in to connect people allover the world"}/>
                    <LoginForm/>
                </div>
            </main>
        </>
    )
}
