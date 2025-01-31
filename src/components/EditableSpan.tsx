import {ChangeEvent, useState} from "react";

export type Props = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({value, onChange}: Props) => {
    const [isEditMode, setIsEditMode] = useState(false)// хранит и изменяет булевое значение
    const [title, setTitle] = useState(value)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        setIsEditMode(false)
        onChange(title)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <>
            {isEditMode
                ? <input value={title} onBlur={turnOffEditMode} onChange={onChangeTitle} autoFocus/> //клик в любом месте - срабатывает блур - появляется span
                : <span onDoubleClick={turnOnEditMode}>{value}</span> //2ой клик - появляется инпут
            }
        </>
    );
}