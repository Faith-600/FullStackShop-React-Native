import AsyncStorage from '@react-native-async-storage/async-storage';

const Addtocart = async ({ id, description, image, title, price, username }) => {
    const action = {
        type: "Add_Item_To_Cart",
        item: {
            id,
            title,
            description,
            price,
            image,
            username
        }
    };

    try {
        // Get current cart from AsyncStorage
        const currentCart = await AsyncStorage.getItem(`cart_${username}`);
        const parsedCart = currentCart ? JSON.parse(currentCart) : [];

        // Update the cart
        const updatedCart = [...parsedCart, action.item];

        // Save updated cart back to AsyncStorage
        await AsyncStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart));

        return action;
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};

export default Addtocart;
