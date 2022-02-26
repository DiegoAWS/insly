import { Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useGlobalContext } from 'contexts/useGlobalContext'
import React from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
};

function ModalResult() {
    const { isModalOpen, setIsModalOpen, data } = useGlobalContext()

    const { columns, arrayData } = data;

    const cols = ['label', ...columns]
    const handleClose = () => {
        setIsModalOpen(false)
    }
    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
        >
            <Box sx={style}>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {cols.map((item, index) => (
                                    <TableCell key={index}>{item !== 'label' ? item : ''}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arrayData.map((row) => (
                                <TableRow
                                    key={row.label}

                                >
                                    {cols.map((item, index) => (
                                        <TableCell key={index}>{row[item]}</TableCell>
                                    ))}


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    )
}

export default ModalResult