import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function Loading() {
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: 10 }}
                open={true}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Loading