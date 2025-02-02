import {SxProps} from '@mui/material'

export const containerSx: SxProps = {
    width: '100%', display: 'flex', justifyContent: 'space-between'
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    p: 0,
    justifyContent: 'space-between',
    opacity: isDone
        ? 0.5 : 1
})


