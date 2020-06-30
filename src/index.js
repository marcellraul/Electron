//archivo que arrancara la app
//archivo que arrancara la app
const {app,BrowserWindow}=require('electron');
const {Menu} = require('electron')//para la navegacion
const url = require('url');
const path = require('path');

//para que se ejecute el reload
if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

let mainWindow
let newProductwindow


app.on('ready', ()=> {
    mainWindow = new BrowserWindow({})//para la nueva ventana}
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'views/index.html'),
        protocol: 'file',//solo sera un archivo
        slashes: true//se cargar en la direccion de navegador
    }))

    const mainMenu = Menu.buildFromTemplate(templatemenu);
    Menu.setApplicationMenu(mainMenu);
    mainWindow.on('closed', ()=>{
        app.quit();
    })
});

//crear un nueveo producto y una nueva ventana

function CreatenewProductwindow(){
    newProductwindow = new BrowserWindow({
        width: 500,
        height: 400,
        title: 'Add New Product'
    });
    newProductwindow.setMenu(null);
    newProductwindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-products.html'),
        protocol: 'file',//solo sera un archivo
        slashes: true//se cargar en la direccion de navegador
    }));

    newProductwindow.on('closed', ()=>{
        newProductwindow = null;
    })
}

const templatemenu = [
    {
        label: 'Producto',
        submenu:[
            {
                label: 'Productos',
                
                click (){
                    CreatenewProductwindow();
                }
            },
            {
                label: 'Nuevo Producto',
                accelerator : 'Ctrl+N',
                click (){
                    CreatenewProductwindow();
                }
            },
            {
                label: 'Eliminar Prodcuto',
                click (){
                    
                }
            },
            {
                label: 'Incrementar Inv.',
                click (){
                    
                }
            },
            {
               label: 'Exit',
               accelerator: process.platform == 'darwin' ? 'command+Q': 'Ctrl+Q',
               click(){
                   app.quit();
                }
            }
        ]
    },
    {
        label: 'Venta',
        submenu: [
            {
                label: 'Nueva Venta',
                accelerator : 'Ctrl+V',
                click (){
                }
            },
            {
                label: 'Nueva Venta Fiscal',
                click (){
                }
            },
            {
                label: 'Listado de Ventas',
                click (){
                }
            },
        ]
    },
    {
        label: 'Cliente',
        submenu: [
            {
                label: 'Listado de Clientes',
                accelerator : 'Ctrl+C',
                click (){
                }
            },
            {
                label: 'Nueva Cliente',
                click (){
                }
            },
            {
                label: 'Eliminar Cliente',
                click (){
                }
            },
        ]
    },
    {
        label: 'Reportes',
        submenu: [
            {
                label: 'Listado',
                click (){
                }
            },
            {
                label: 'Semana',
                click (){
                }
            },
            {
                label: 'Mes',
                click (){
                }
            },
           
        ]
    }

]//arreglo del menu

if(process.env.NODE_ENV !== 'production'){
            templatemenu.push({
                label: 'DevTools',
                submenu: [
                    {
                       label: 'Show/hide DevTools'     ,
                       click(item,focusedWindow){
                            focusedWindow.toggleDevTools();
                       }
                    },
                    {
                        role: 'reload'
                    }
                ]
            })
}