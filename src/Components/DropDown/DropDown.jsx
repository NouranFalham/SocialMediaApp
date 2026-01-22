import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    } from "@heroui/react";

    export default function DropDown({ option1, option2, className , onDelete ,onEdit }) {
    return (
        <Dropdown placement="bottom-end">
        <DropdownTrigger>
            <Button
            isIconOnly
            variant="light"
            className={`rounded-full hover:bg-gray-100 ${className}`}
            >
            <FontAwesomeIcon icon={faEllipsisVertical} />
            </Button>
        </DropdownTrigger>

        <DropdownMenu
            aria-label="Post Actions"
            classNames={{
            base: "w-44 rounded-xl shadow-lg bg-gray-50 border border-gray-200 ",
            }}
        >
            <DropdownItem
            key="edit"
            className="text-sm hover:bg-gray-200 rounded-lg transition-colors duration-200"
            onClick={onEdit}
            > 
            {option1}
            </DropdownItem>

            <DropdownItem
            key="delete"
            color="danger"
            className="text-red-500 text-sm rounded-lg hover:bg-gray-200 transition-colors duration-200"
            onClick={onDelete}
            >
            {option2}
            </DropdownItem>
        </DropdownMenu>
        </Dropdown>
    );
}

