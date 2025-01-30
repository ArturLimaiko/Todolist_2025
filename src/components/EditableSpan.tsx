import {ChangeEvent, useState} from "react";

export type Props = {
    value: string
}

export const EditableSpan = ({value}: Props) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        setIsEditMode(false)
    }

    const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <>
            {isEditMode
                ? <input  value={title} onBlur={turnOffEditMode} onChange={onChangeTitle} autoFocus/>
                : <span onDoubleClick={turnOnEditMode} >{value}</span>
            }
        </>
    );
}