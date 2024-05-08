import React, { useEffect, useState } from "react";
import ResponsiveDrawer from "../../entities/ContentDrawer/Drawer";
import { AppBar, Avatar, Box, Button, ButtonGroup, CardHeader, CardMedia, Dialog, Grid, IconButton, List, Slide, Toolbar, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { storeCart } from "../../shared/store-cart/StoreCart";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MapContainer from "./Map";

export const HomeProducts3: React.FC = () => {
    return (<ResponsiveDrawer _component={<Products />} optionMenu="user" />
    )
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


interface interfProduct {
    idProduct: number,
    restaurante: string,
    ciudad: string,
    direccion: string,
    telefono: string,
    tipo_restaurante: string,
    nombre_plato: string,
    descripcion_plato: string,
    precio: number,
    img_plato: string,
    tiempo_entreda_pedido: string,
    precio_domicilio: number,
    valor_compra: number,
    latitud: number,
    longitud: number
}

export const Products: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [getAlert, setAlert] = useState<boolean>(false)

    const [getProductsSelect, setProductsSelect] = useState<interfProduct>({
        idProduct: 0,
        restaurante: '',
        ciudad: '',
        direccion: '',
        telefono: '',
        tipo_restaurante: '',
        nombre_plato: '',
        descripcion_plato: '',
        precio: 0,
        img_plato: '',
        tiempo_entreda_pedido: '',
        precio_domicilio: 0,
        valor_compra: 0,
        latitud: 0,
        longitud: 0
    })
    const [count, setCount] = useState(1);

    const [getProducts, setProducts] = useState<interfProduct[]>([{
        idProduct: 0,
        restaurante: '',
        ciudad: '',
        direccion: '',
        telefono: '',
        tipo_restaurante: '',
        nombre_plato: '',
        descripcion_plato: '',
        precio: 0,
        img_plato: '',
        tiempo_entreda_pedido: '',
        precio_domicilio: 0,
        valor_compra: 0,
        latitud: 0,
        longitud: 0
    }]);

    useEffect(() => {
        setProducts([{
            idProduct: 4,
            restaurante: 'King Papa',
            ciudad: 'Cali, Valle del Cauca, Colombia',
            direccion: 'Cl. 5a #El #66-25, Gran Limonar',
            telefono: '3162571440⁣',
            tipo_restaurante: 'Comidas rapidas',
            nombre_plato: 'Salchipapa KingChicharrón',
            descripcion_plato: 'para 2 personas! 1323gr. papa, salchicha americana, queso, chicharrón, limón, salsa kingbbq y salsa de la casa.',
            precio: 68400,
            img_plato: 'https://images.rappi.com/products/564abc46-906c-4102-9f36-b63864fc72be-1689174553853.png?e=webp&d=511x511&q=85',
            tiempo_entreda_pedido: '25 min',
            precio_domicilio: 0,
            valor_compra: 0,
            latitud: 3.398,
            longitud: -76.545
        }, {
            idProduct: 5,
            restaurante: 'King Papa',
            ciudad: 'Cali, Valle del Cauca, Colombia',
            direccion: 'Cl. 5a #El #66-25, Gran Limonar',
            telefono: '3162571440⁣',
            tipo_restaurante: 'Comidas rapidas',
            nombre_plato: 'Salchipapa Kingcallejera',
            descripcion_plato: 'salchi para 2, con pollo apanado, maduro, chorizo, papa salchicha y queso.',
            precio: 72500,
            img_plato: 'https://images.rappi.com/products/4db61792-ea2d-4496-a984-920ede206454-1689686046891.png?e=webp&d=511x511&q=85',
            tiempo_entreda_pedido: '25 min',
            precio_domicilio: 0,
            valor_compra: 0,
            latitud: 3.398,
            longitud: -76.545
        }])
    }, [])
    const handleClickOpen = (obj: interfProduct) => {
        setCount(1)
        setOpen(true);
        setProductsSelect(obj)

    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => { if (getAlert) setTimeout(() => { setAlert(false) }, 3000); }, [getAlert])
    const btnCar = () => {
        getProductsSelect.valor_compra = getProductsSelect.precio * count;
        sessionStorage.setItem('carObj', JSON.stringify(getProductsSelect))
        storeCart()
        setAlert(true)
    }
    return (
        <>
            <br /><br /><br />
            <Grid container spacing={2}>
                {getProducts && (<>
                    {getProducts.map((product, index) =>
                        <Grid item xs={12} md={3} sm={12} onClick={() => handleClickOpen(product)} key={index}>
                            <div className="card-content grid-prod">
                                <CardMedia
                                    className="img-product"
                                    component="img"
                                    height="194"
                                    image={product.img_plato}
                                    alt="Paella dish"
                                />
                                <div className="gratis">
                                    <strong>% Envios gratis</strong></div>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            {product.restaurante.slice(0, 1)}
                                        </Avatar>
                                    }
                                    title={product.nombre_plato}
                                    subheader={<div>
                                        <span>  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="#6A696E" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-.22-13h-.06c-.4 0-.72.32-.72.72v4.72c0 .35.18.68.49.86l4.15 2.49c.34.2.78.1.98-.24a.71.71 0 00-.25-.99l-3.87-2.3V7.72c0-.4-.32-.72-.72-.72z"></path></svg>
                                        </span> <span style={{ fontSize: "13px" }}>{product.tiempo_entreda_pedido}</span>
                                        <span>  <svg width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1z" fill="#007AFF"></path><path d="M10 6H5v2h5V6zm9 7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#007AFF"></path></svg></span>
                                        <span style={{ fontSize: "13px" }}> $ {product.precio_domicilio}</span>
                                    </div>}
                                />

                            </div>
                        </Grid>)}
                </>)}
            </Grid>

            <Dialog
                className="dialog-color"
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Detalles
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <Box
                        component="main"
                        style={{width: '100% !important'}}
                        sx={{ 
                            flexGrow: 1, 
                            p: 3,
                            width: '100% !important'
                        }}
                    >
                        <Grid container sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100% !important'
                        }}>
                            <Grid item xs={12} md={6} sm={12}>

                                <CardMedia
                                    component="img"
                                    className="dialog-img"
                                    image={getProductsSelect?.img_plato}
                                    alt="Paella dish" />
                            </Grid>
                            <Grid item xs={12} md={4} sm={12}>
                                <div><strong style={{ fontSize: '25px' }}>{getProductsSelect?.restaurante}</strong></div>
                                <div style={{ fontSize: '13px' }}>{getProductsSelect?.nombre_plato}</div>
                                <div style={{ fontSize: '13px' }}>{getProductsSelect?.direccion}, {getProductsSelect?.ciudad}</div>
                                <p></p>
                                <div className="hr-div"></div>
                                <p></p>
                                <div>
                                    <strong>$ {getProductsSelect?.precio}</strong>
                                    <span className="mx-1"></span>
                                    <span className="color-dialog"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#6A696E" d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path></svg></span>
                                    <strong className="color-dialog">POPULAR</strong>
                                </div>
                                <div style={{ color: '#6a696e' }}>
                                    {getProductsSelect?.descripcion_plato}
                                </div>
                                <div style={{ color: '#6a696e' }}>
                                    {getProductsSelect?.descripcion_plato}
                                </div>
                                <MapContainer position={{ lat: getProductsSelect.latitud, lng: getProductsSelect.longitud }}/>

                            </Grid>
                            {/* <Grid item xs={12} md={2} sm={12}></Grid> */}
                        </Grid>


                        {getAlert && (<><Alert severity="success">
                            <AlertTitle>Exito</AlertTitle>
                            Producto agregado.
                        </Alert>
                            <br /><br /> <br /><br />

                        </>)}
                    </Box>
                </List>
                <div className="sub_div">
                    <ButtonGroup variant="contained" className="btn-cont" aria-label="Basic button group">
                        <Button onClick={() => setCount(count > 1 ? count - 1 : 1)}><strong>-</strong></Button>
                        <input type="text" disabled className="input-cont" value={count} onChange={(event) => ''} />
                        <Button className="mx-2" onClick={() => setCount(count + 1)}><strong>+</strong></Button>
                        <Button variant="outlined" onClick={() => btnCar()} >Agregar al carrito {getProductsSelect?.precio ? getProductsSelect?.precio * count : getProductsSelect?.precio}</Button>
                    </ButtonGroup>
                </div>
            </Dialog >
        </>
    );

}
