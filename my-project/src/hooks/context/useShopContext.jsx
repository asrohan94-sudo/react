import ShopContext from '../../context/ShopContext'
import { useContext } from 'react'

const useShopContext = () => {
    return useContext(ShopContext)
}
export default useShopContext