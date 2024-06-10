export interface signUp{
    name:string,
    password:string,
    email:string
}

export interface login{
    email:string,
    password:string
    
}

export interface product{
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    image:string,
    id:number,
    quantity:undefined | number,
    productId:undefined | number
}

export interface cart{
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    image:string,
    id:undefined |number,
    quantity:undefined | number,
    userId:number,
    productId:number
}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}

export interface order{
    email:string,
    address:string,
    mobile:string,
    totalPrice:number,
    userId:number,
    id:number | undefined
}