const restaurant = (name: string)=>{
    return name;
}
const restaurantName = restaurant;

interface Admin {
    name: string;
    email: string;
    pass: string;
  }

const userAdmin: { [key: string]: Admin }[] = [
    {
       adminQbano: {
        'name': 'Qbano',
        'email': 'adminQbano@gmail.com',
        'pass': '123456',
       },
       adminBurguerMaster: {
        'name': 'Burguer Master',
        'email': 'adminBurguer@gmail.com',
        'pass': '123456',
       },
       adminKingPapa: {
        'name': 'King Papa',
        'email': 'adminKing@gmail.com',
        'pass': '123456',
       },
       adminChickenWings: {
        'name': 'Chicken Wings',
        'email': 'adminChicken@gmail.com',
        'pass': '123456',
       },
       adminGaonArtesanal: {
        'name': 'Gaón Artesanal',
        'email': 'adminGaon@gmail.com',
        'pass': '123456',
       }
    }
]

const metodo = {
    restaurant: restaurant,
    restaurantName: restaurantName,
    userAdmin: userAdmin,
}



export default metodo;
