import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import ResponsiveDrawer from "../../entities/ContentDrawer/Drawer";
import { Card, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';
import { collection, doc, getDoc, getDocFromCache, getDocs, query, where } from 'firebase/firestore';
import { dbFirebase } from '../../shared/connection/Connection';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import metodo from '../../../utils/NameRestaurant';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const drawerWidth = 240;
let nombreRestaurante: any;

export const HomeDashboard: React.FC = () => {
    return (<ResponsiveDrawer _component={<Dashboard />} optionMenu="admin" />)
}

export const Dashboard: React.FC = () => {
    nombreRestaurante = sessionStorage.getItem('nRestaurant');
    return (
        <>
            <br /><br /><br />
            <div className="card">
                <Card variant="outlined">
                    <p></p>
                    <span className="mx-2"></span><span><strong>Lista de pedidos</strong></span>
                    <p></p>
                </Card>
            </div>
            <br />
            <div className="card">
                <StickyHeadTable />
            </div>
        </>
    )
}

interface rows {
    id: string;
    idPedidos: string
    restaurante: string;
    nombre_plato: string;
    tipo_restaurante: string;
    tiempo_entreda_pedido: string;
    precio: number;
    precio_domicilio: number;
    img_plato: string;
    ciudad: string;
    descripcion_plato: string;
    telefono: string;
    valor_compra: number;
    idProduct: string;
    direccion: string;
}

interface Column {
    id: 'idPedidos' | 'ciudad' | 'direccion' | 'restaurante' | 'nombre_plato' | 'tipo_restaurante' | 'telefono';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'idPedidos', label: 'ID pedidos', minWidth: 170 },
    { id: 'restaurante', label: 'Restaurante', minWidth: 170 },
    { id: 'ciudad', label: 'Ciudad', minWidth: 170 },
    { id: 'direccion', label: 'Direccion restaurante', minWidth: 170 },
    { id: 'telefono', label: 'Telefono', minWidth: 170 },
];

interface Data {
    id: string;
    idPedidos: string
    restaurante: string;
    nombre_plato: string;
    tipo_restaurante: string;
    tiempo_entreda_pedido: string;
    precio: number;
    precio_domicilio: number;
    img_plato: string;
    ciudad: string;
    descripcion_plato: string;
    telefono: string;
    valor_compra: number;
    idProduct: string;
    direccion: string;
}

function createData(
    id: any,
    idPedidos: any,
    restaurante: any,
    nombre_plato: any,
    tipo_restaurante: any,
    tiempo_entreda_pedido: any,
    precio: any,
    precio_domicilio: any,
    img_plato: any,
    ciudad: any,
    descripcion_plato: any,
    telefono: any,
    valor_compra: any,
    idProduct: any,
    direccion: any
): Data {
    return {
        id,
        idPedidos,
        restaurante,
        nombre_plato,
        tipo_restaurante,
        tiempo_entreda_pedido,
        precio,
        precio_domicilio,
        img_plato,
        ciudad,
        descripcion_plato,
        telefono,
        valor_compra,
        idProduct,
        direccion
    };
}

interface table {
    id: string;
    data: any;
}
export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open2, setOpen2] = React.useState(false);
    const [getInfo, setInfo] = React.useState<any>();
    const [getRows2, setRows2] = React.useState<any[]>()
    const [getRows, setRows] = React.useState<rows[]>([{
        "id": '',
        "idPedidos": "",
        "restaurante": "",
        "nombre_plato": "",
        "tipo_restaurante": "",
        "tiempo_entreda_pedido": "",
        "precio": 0,
        "precio_domicilio": 0,
        "img_plato": "",
        "ciudad": "",
        "descripcion_plato": "",
        "telefono": "",
        "valor_compra": 0,
        "idProduct": '',
        "direccion": ""
    }]);


    const info = async () => {
        try {
            const querySnapshot = await getDocs(collection(dbFirebase, "productos"));
            let info: any = [];
            querySnapshot.forEach((doc) => {
                doc.data()['id'] = doc.id;
                info.push(doc.data())
            });
            setRows(info)
        } catch (error) {
            console.log("No such document!", error);
        }
    }

    const info2 = async () => {
        console.log(nombreRestaurante)
        try {
            const querySnapshot = await getDocs(
                query(collection(dbFirebase, "pedidos"), where("restaurante", "==", nombreRestaurante))
            );
            let info: table[] = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                info.push({ id: doc.id, data: doc.data() });
            });
            setRows2(info);
        } catch (error) {
            console.log("Error fetching documents:", error); 
        }
    };


    const pedidosFindById = async (_id: string) => {
        try {
            /*   const docRef = doc(dbFirebase, "productos", 'NZrBYe1TLHcxwyxTNyWI');
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                  const data = docSnap.data();
                  console.log("data is :", data);
                  setInfo(data)
                  setOpen2(true)
              } */
            setOpen2(true)
            let info: any = [];
            const q = query(collection(dbFirebase, "productos"), where("idPedidos", "==", _id));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                info.push(doc.data())
            });
            setRows(info)
        } catch (e) {
            console.log("Error getting cached document:", e);
        }
    }
    React.useEffect(() => {
        info2();
    }, [])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (<>
        <DialogContent dividers>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre(s)</TableCell>
                                <TableCell align="right">Apellido(s)</TableCell>
                                <TableCell align="right">Metodo de pago</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Telefono</TableCell>
                                <TableCell align="right">Barrio</TableCell>
                                <TableCell align="right">Dirección</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getRows2?.map((row, i) => (
                                <TableRow
                                    onClick={() => pedidosFindById(row?.id)}
                                    className='cursor'
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="right">{row?.data?.nombres}</TableCell>
                                    <TableCell align="right">{row?.data?.apellidos}</TableCell>
                                    <TableCell align="right">{row?.data?.metodo_pago}</TableCell>
                                    <TableCell align="right">{row?.data?.email}</TableCell>
                                    <TableCell align="right">{row?.data?.telefono}</TableCell>
                                    <TableCell align="right">{row?.data?.barrio}</TableCell>
                                    <TableCell align="right">{row?.data?.direccion}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </DialogContent>

        <React.Fragment>
            <BootstrapDialog
                onClose={() => { setOpen2(false) }}
                aria-labelledby="customized-dialog-title"
                open={open2}
                className='modal-car'
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <strong>Datos del cliente</strong>
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={() => { setOpen2(false) }}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent dividers>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getRows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, i) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value == 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={getRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>

                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    </>
    );
}
