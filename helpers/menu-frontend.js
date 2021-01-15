
const getMenuFrontEnd = ( role ) => {
    
    const menu = [
        {
          titulo: 'Actividad',
          isOpen: true,
          icono: 'fas fa-chart-line',
          submenu: [
            { titulo: 'Main', url: '/', icono: 'fas fa-home'},    
            { titulo: 'Clientes', url: 'clientes', icono: 'fas fa-user-friends'},
            { titulo: 'Productos', url: 'productos', icono: 'fab fa-product-hunt'},
            { titulo: 'Turnos', url: 'turnos', icono: 'fas fa-futbol'},
            { titulo: 'Ventas', url: 'ventas', icono: 'fab fa-sellcast'},        
          ]
        }
      ];
    
    if( role === 'ADMIN_ROLE') {
        menu.push( {
            titulo: 'Administracion',
            isOpen: false,
            icono: 'fas fa-user-shield',
            submenu: [
              { titulo: 'Usuario', url: 'usuario', icono: 'fas fa-user'},
              { titulo: 'Movimiento', url: 'movimiento', icono: 'fas fa-file-export'},
              { titulo: 'Balance', url: 'balance', icono: 'fas fa-search-dollar'},
            ]
          });
    }

    return menu;
};

module.exports = {
  getMenuFrontEnd
};