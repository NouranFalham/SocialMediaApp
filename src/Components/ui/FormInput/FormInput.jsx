import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FormInput({
    elementType = 'input',
    type,
    id,
    name,
    labelText,
    placeholder,
    icon,
    value,
    onChange,
    onBlur,
    error,
    touched,
    className,
}) {

    function renderElement(){
        switch(elementType){
            case 'input':
                return (
                    <input
                    type={type}
                    placeholder={placeholder}
                    className={`form-control ${className}`}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    />
                )
            case "textarea":
            return (
                <textarea
                placeholder={placeholder}
                className={`form-control ${className}`}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                />
            );
            
        }
    }


    return (
        <>
        <div>
            <label htmlFor={id} className="text-sm mb-1">
            {labelText}
            </label>
            <div className="relative">
            {renderElement()}
            <FontAwesomeIcon
                icon={icon}
                className=" text-sm text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
            />
            </div>
            {error && touched ? (
            <p className="text-red-500 whitespace-pre-line">{error}</p>
            ) : (
            ""
            )}
        </div>
        </>
    );
}
