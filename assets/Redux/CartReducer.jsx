import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    cart: [],
    Subtotal: 0,
};

// Helper function to update AsyncStorage
const updateCartStorage = async (username, cart) => {
    try {
        await AsyncStorage.setItem(`cart_${username}`, JSON.stringify(cart));
    } catch (error) {
        console.error("Error updating cart storage:", error);
    }
};

function CartReducer(state = initialState, action) {
    switch (action.type) {
        case "Add_Item_To_Cart":
            const updatedCartAdd = [...state.cart, action.item];
            updateCartStorage(action.item.username, updatedCartAdd);
            return {
                ...state,
                cart: updatedCartAdd
            };

        case "Remove_Item_From_Cart":
            console.log("Current cart:", state.cart);
            console.log("ID to remove:", action.payload);

            const index = state.cart.findIndex((item) => item.id === action.id);
            let newCart = [...state.cart];

            if (index >= 0) {
                newCart.splice(index, 1);
                updateCartStorage(action.username, newCart);
            } else {
                console.warn("Cannot delete item, not found in cart");
            }

            return {
                ...state,
                cart: newCart
            };

        case 'SET_CART':
            return {
                ...state,
                cart: action.payload
            };

        default:
            return state;
    }
}

export default CartReducer;
