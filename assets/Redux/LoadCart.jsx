import AsyncStorage from '@react-native-async-storage/async-storage';

// Action to load cart from AsyncStorage
export const loadCart = (username) => {
    return async (dispatch) => {
        try {
            const currentCart = await AsyncStorage.getItem(`cart_${username}`);
           const parsedCart = currentCart ? JSON.parse(currentCart) : [];

            dispatch({
                type: 'SET_CART',
                payload: parsedCart
            });
        } catch (error) {
            console.error("Error loading cart:", error);
        }
    };
};