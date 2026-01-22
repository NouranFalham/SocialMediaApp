    import {
    faImage,
    faLightbulb,
    faPaperPlane,
    faXmark,
    } from "@fortawesome/free-solid-svg-icons";
    import FormInput from "../ui/FormInput/FormInput";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import { useContext, useState } from "react";
    import { AuthContext } from "../../assets/Context/Auth.context/Auth.context";
    import { useFormik } from "formik";
    import * as yup from "yup";
    import axios from "axios";
    import { toast } from "react-toastify";

    export default function PostUpload({ getAllPosts }) {
    const { token } = useContext(AuthContext);
    const [previewImage, setPreviewImage] = useState(null);
    

    const validationSchema = yup.object({
        body: yup
        .string()
        .required("Caption is required")
        .min(3, "Caption can not be less than 3 characters")
        .max(500, "Caption can not be more than 500 characters"),

        image: yup
        .mixed()
        .nullable()
        .test("fileSize", "File is too large (5MB)", (file) => {
            if (file == null) return true;
            return file.size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Only images are allowed", (file) => {
            const supportedFiles = [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/svg",
            ];
            if (file == null) return true;
            return supportedFiles.includes(file.type);
        }),
    });

    async function handleSubmit(values) {
        try {
        const formData = new FormData();
        formData.append("body", values.body);
        if (values.image) {
            formData.append("image", values.image);
        }

        const options = {
            url: "https://linked-posts.routemisr.com/posts",
            method: "POST",
            headers: { token },
            data: formData,
        };
        const { data } = await axios.request(options);
        // console.log(data);
        if (data.message === "success") {
        toast.success("Post created successfully");
        getAllPosts();
        formik.resetForm();
        setPreviewImage(null);
    }
        } catch (error) {
        toast.error("Failed to create a post");
        console.log(error);
        }
    }

    const formik = useFormik({
        initialValues: {
        body: "",
        image: null,
        },

        validationSchema: validationSchema,

        onSubmit: handleSubmit,
    });

    return (
        <>
        <section >
            <div className="container mx-auto max-w-2xl p-5 bg-white rounded-2xl shadow-lg">
            <header className="flex items-center gap-2">
                <div className="avatar rounded-full border-2 border-gray-500/20">
                <img
                    src="https://img.freepik.com/premium-vector/school-teacher-education-children-class-knowledge-student-vector-illustration-teaching-pos_1013341-459381.jpg"
                    alt="user"
                    className="size-12 rounded-full"
                />
                </div>
                <div className="user">
                <h2 className="font-semibold ">Create a post</h2>
                <p className="text-sm text-gray-600 ">
                    Share your thoughts with the world{" "}
                </p>
                </div>
            </header>

            <form onSubmit={formik.handleSubmit}>
                <FormInput
                elementType="textarea"
                icon={faLightbulb}
                placeholder={"What is in your mind"}
                className={"min-h-25"}
                name={"body"}
                id={"body"}
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.body}
                touched={formik.touched.body}
                />
                {previewImage && (
                <div className="preview relative">
                    <img
                    src={previewImage}
                    alt=""
                    className="w-full aspect-video object-cover rounded-2xl my-3"
                    />

                    <button
                    type="button"
                    onClick={()=>{
                        setPreviewImage(null)
                        formik.setFieldValue('image',null)
                    }}
                    className="size-7 rounded-full bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-colors duration-200 absolute top-[10px] right-[10px]"
                    >
                    <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                )}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                <label
                    htmlFor="image"
                    className="flex items-center gap-2 border border-gray-600/20 p-1 rounded-xl text-gray-500 hover:text-gray-700 cursor-pointer transition duration-300"
                >
                    <div className="size-7 rounded-full bg-gray-100 flex items-center justify-center">
                    <FontAwesomeIcon icon={faImage} className="text-green-500" />
                    </div>
                    <span className="text-sm font-medium">Upload a photo</span>
                </label>

                <FormInput
                    elementType="input"
                    type="file"
                    id="image"
                    className="hidden"
                    name={"image"}
                    onChange={(e) => {
                    const file = e.target.files[0];
                    formik.setFieldValue("image", file);

                    // file to url
                    const url = URL.createObjectURL(file);
                    setPreviewImage(url);
                    }}
                    onBlur={formik.handleBlur}
                />

                <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full 
                        bg-blue-500 text-white text-sm font-semibold
                        hover:bg-blue-600 transition duration-300 cursor-pointer"
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <span>Post</span>
                </button>
                </div>
                {formik.touched.image && formik.errors.image && (
                <p className="error-text text-red-500">{formik.errors.image}</p>
                )}
            </form>
            </div>
        </section>
        </>
    );
}
