function Removefromcart(id,username) {
    return {
      type: 'Remove_Item_From_Cart',
      id: id,
      username
    };
  }
  
  export default Removefromcart;