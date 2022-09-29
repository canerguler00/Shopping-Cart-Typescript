import { useContext, createContext, ReactNode, useState } from "react";
import ShoppingCard from "../component/ShoppingCard"

type ShoppingCardProviderProps = {
    children: ReactNode
}

type CardItem = {
    id: number
    quantity: number
}

type ShoppingCardContext = {
    openCard: () => void
    closeCard: () => void
    cardQuantity: number
    cardItem: CardItem[]
    getItemQuantity: (id:number) => number
    increaseCardQuantity: (id:number) => void
    decreaseCardQuantity: (id:number) => void
    removeFromCard: (id:number) => void
}

const ShoppingCardContext = createContext({} as 
    ShoppingCardContext)

export function useShoppingCard(){
    return useContext(ShoppingCardContext)
}

export function ShoppingCardProvider({ children }:
    ShoppingCardProviderProps) {
        const [cardItems, setCardItems] = useState<CardItem[]>([])
        const [isOpen, setIsOpen] = useState(false)
 
        const cardQuantity = cardItems.reduce(
            (quantity, item) => item.quantity + quantity, 0
        )

        const openCard = () => setIsOpen(true)
        const closeCard = () => setIsOpen(false)

        function getItemQuantity(id: number){
            return cardItems.find(item => item.id === id)?.quantity || 0
        }

        function increaseCardQuantity(id:number){
            setCardItems(currItems => {
                if(currItems.find(item => item.id === id) == null){
                    return [...currItems, {id, quantity: 1}]
                }else{
                    return currItems.map(item => {
                        if(item.id === id){
                            return {...item, quantity: item.quantity + 1}
                        }else{
                            return item
                        }
                    })

                }
            })
        }

        function decreaseCardQuantity(id:number){
            setCardItems(currItems => {
                if(currItems.find(item => item.id === id)?.quantity === 1){
                    return currItems.filter(item => item.id !== id)
                }else{
                    return currItems.map(item => {
                        if(item.id === id){
                            return {...item, quantity: item.quantity - 1}
                        }else{
                            return item
                        }
                    })

                }
            })
        }

        function removeFromCard(id: number) {
            setCardItems(currItems => {
                return currItems.filter(item => item.id !== id)
            })
        }

    return (
        <ShoppingCardContext.Provider value={{
            getItemQuantity, 
            increaseCardQuantity, 
            decreaseCardQuantity,
            removeFromCard, 
            openCard, 
            closeCard,
            cardItems,
            cardQuantity
        }}>
           {children}
           <ShoppingCard isOpen />
        </ShoppingCardContext.Provider>
    )
}