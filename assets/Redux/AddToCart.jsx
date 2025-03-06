import AsyncStorage from '@react-native-async-storage/async-storage';

const Addtocart = (product) => {
     
    return async (dispatch) => {
        const { id, description, image, title, price, username,uniqueId=  `${id}-${new Date().getTime()}` } = product;

        try {
            // Get current cart from AsyncStorage
            const currentCart = await AsyncStorage.getItem(`cart_${username}`);
            const parsedCart = currentCart ? JSON.parse(currentCart) : [];

            // Update the cart
            const updatedCart = [...parsedCart, { id, title, description, price, image, username }];

            // Save updated cart back to AsyncStorage
            await AsyncStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart));

            // Dispatch action
            dispatch({
                type: "Add_Item_To_Cart",
                item: { id, title, description, price, image, username,uniqueId },
            });
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
};

export default Addtocart;
