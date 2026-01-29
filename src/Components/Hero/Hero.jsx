import { faSitrox } from "@fortawesome/free-brands-svg-icons";
import { faBell, faHeart, faImage, faMessage, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import author from "../../assets/images/author.jpeg";

export default function Hero({title , description}) {
    const features = [
        {
        icon: faMessage,
        title: "Real-time chat",
        description: "Instant messaging",
        colors: "bg-yellow-400/20 text-yellow-500",
        },
        {
        icon: faImage,
        title: "Share Media",
        description: "Photos & videos",
        colors: "bg-blue-400/20 text-blue-500",
        },
        {
        icon: faBell,
        title: "Smart Alerts",
        description: "Stay updated",
        colors: "bg-pink-400/20 text-pink-500",
        },
        {
        icon: faUsers,
        title: "Communities",
        description: "Find your tribe",
        colors: "bg-teal-400/20 text-green-500",
        },
    ];

    const states =[
        {
            icon: faUsers,
            number: "2M+",
            label: "Active users"
        },
        {
            icon: faHeart,
            number: "10M+",
            label: "Posts shared"
        },
        {
            icon: faMessage,
            number: "50M+",
            label: "Messages sent"
        }
    ]

    // const infos = [
    //     {
    //         icon: faDownload,
    //         label: "10M+ Downloads"
    //     },
    //     {
    //         icon: faStar,
    //         label: "4.9/5 Rating"
    //     },
    //     {
    //         icon: faAward,
    //         label: "Best Social App"
    //     },
    // ]

    return (
        <>
        <div className="signUpHero text-white flex flex-col justify-between px-8 pt-2">
            <header>
            <h1>
                <Link className="flex items-center gap-1" to="/">
                <span className="size-10 text-lg flex items-center justify-center bg-white/40 rounded-xl  ">
                    <FontAwesomeIcon icon={faSitrox} />
                </span>
                <span className="text-2xl font-bold">ocialSphere</span>
                </Link>
            </h1>
            </header>

            <div className="heroContent">
            <div className="title">
                <h2 className="text-5xl font-bold max-w-[450px]">
                {title.normal} <span className="pb-4 bg-linear-to-r from-blue-950 to-blue-800  bg-clip-text text-transparent">{title.highlight}</span>
                </h2>
                <p className="max-w-md text-lg">{description}</p>
            </div>

            <div className="feature-section py-4">
                <ul className="grid lg:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 bg-white/20 backdrop:blur-sm border border-white/20 rounded-xl px-4 py-1 hover:scale-105 transition-transform duration-300">
                    <div className={`icon size-8 flex items-center justify-center rounded-lg ${feature.colors}`}>
                        <FontAwesomeIcon icon={feature.icon} />
                    </div>
                    <div className="card-body">
                        <h4 className="text-[14px] ">{feature.title}</h4>
                        <span className="text-[14px]">{feature.description}</span>
                    </div>
                    </li>
                ))}
                </ul>
            </div>

            <div className="state-section pb-4">
                <ul className="flex items-center gap-4">
                    {
                        states.map((state,index)=>(
                            <li key={index} className="">
                                <div className="state flex items-center gap-2">
                                    <FontAwesomeIcon className="text-red-400" icon={state.icon} />
                                    <span className="text-xl font-bold">{state.number}</span>
                                </div>
                                <span className="text-[14px]">{state.label}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>

            {/* <div className="others">
                <ul className=" flex items-center gap-4">
                    {
                        infos.map((info)=>(
                            <li className="bg-white/30 p-2 rounded-4xl">
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon className="text-orange-300" icon={info.icon} />
                                    <span className="text-[12px]">{info.label}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>  */}

            </div>

            <figure className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-xl px-4 py-2 mb-3 hover:bg-white/30 transition-colors duration-300">
                <div className="rating-average">
                    {
                        [...Array(5)].map((_,index)=>
                            <FontAwesomeIcon key={index} className="text-yellow-400 hover:scale-110 duration-300 transition-transform" icon={faStar} />)
                    }
                </div>
                <blockquote>
                    <p className="italic py-2">
                        "SocialSphere has transformed the way I connect with friends and family. The user-friendly interface and engaging features make it my go-to social app!"
                    </p>
                </blockquote>
                <figcaption className="author flex items-center gap-2 ">
                    <img src={author} className="size-12 rounded-full" alt="author" />
                    <div className="info flex flex-col">
                        <cite>Alex John</cite>
                        <span className="text-[12px]">Verified User</span>
                    </div>
                </figcaption>
            </figure>

        </div>
        </>
    );
}
