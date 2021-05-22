import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FaSignInAlt} from 'react-icons/fa';
import {Container, Titulo } from './styles';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from '../Document/Recibo';
import { CenterFocusStrong } from '@material-ui/icons';
import Api from '../../services/Api';



const Modal_ = (props) => {
    const [open, setOpen] = useState();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let [recibo, setRecibo] = useState(
    {crm: "",
    data_atendimento: "",
    id: 1,
    medico: "",
    paciente: "",
    serviço: "",
    valor: 125
    });

    const buscarRecibo = async() => {
        const response = await Api.get(`recibos/${props.atendimento.id}`);
        console.log("resposta", response.data);
        setRecibo(response.data);
    };

    // useEffect(async() => {}, )


    return (
        <Container>   
            <button className= "logar" type="button" 
            onClick={() =>{buscarRecibo(); handleOpen()}}>
                IMPRIMIR
            </button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <Titulo>
                    Recibo
                    </Titulo>
                </DialogTitle>
                <DialogContent>
                <PDFViewer style={
                    {display:"flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40vw",
                    height: "70vh",
                    margin: "auto"
                }}>
                     <MyDocument 
                     recibo={recibo}
                     />
                </PDFViewer>
               
                 </DialogContent>
                 <DialogActions>
                 <Button onClick={handleClose}  color="primary">
                     Cancelar
                 </Button>
                 </DialogActions>
             </Dialog>
         </Container>
     )
}
export default Modal_;