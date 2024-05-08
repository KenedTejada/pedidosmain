
export const storeCart = () => {
    const car = sessionStorage.getItem('car')
    const carObj = sessionStorage.getItem('carObj')
    const _id = JSON.parse(carObj || '').idProduct
    if (carObj) {
        let obj: any[] = car ? JSON.parse(car || '') : []
        obj = obj.filter(item => item.idProduct !== _id)
        obj.push(JSON.parse(carObj || ''))
        sessionStorage.setItem('car', JSON.stringify(obj))
    }
}