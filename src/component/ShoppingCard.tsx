import {Offcanvas, Stack} from "react-bootstrap"
import { useShoppingCard } from "../context/shoppingCardContext"

type ShoppingCardProps = {
    isOpen: boolean
}

function ShoppingCard({isOpen}: ShoppingCardProps) {
    const {closeCard, cardItems} = useShoppingCard()
  return (
    <Offcanvas show= {isOpen} placement="end" onHide={closeCard}>
         <Offcanvas.Header closeButton>
            <Offcanvas.Title>Card</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
               {cardItems.map(item.id=>(
                <CardItem key={item.id} {...item} />
               ))}
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCard