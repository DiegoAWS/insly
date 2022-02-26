import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useGlobalContext } from 'contexts/useGlobalContext';


function Loading() {

    const { loading } = useGlobalContext()

    return (loading ? <div>
        <Backdrop
            sx={{ color: '#fff', zIndex: 10 }}
            open={true}

        >
            <CircularProgress color="inherit" />
        </Backdrop>
    </div> : null
    )
}

export default Loading