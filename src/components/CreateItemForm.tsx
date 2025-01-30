import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    createItem: (title: string) => void
}

export const CreateItemForm = ({createItem}: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    //логика создания item--------------------------------------------------------------------
    const createItemHandler = () => {
        const trimmedTitle = title.trim()//Убираем пробелы в начале и конце строки
        if (trimmedTitle !== '') {// проверяем что не пустая строка
            createItem(trimmedTitle) // Создаём таску
            setTitle('') // Очищаем input после создания таски
        } else {
            setError('Title is required')
        }
    }

    //заголовок item--------------------------------------------------------------------
    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null) // убираем ошибку
    }

    //создание item по нажатию Enter--------------------------------------------------------------------
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={title}
                   onChange={changeItemTitleHandler}
                   onKeyDown={onKeyDownHandler}/>
            <Button title={'+'} onClick={createItemHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};