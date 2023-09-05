import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/amazonSlice';
import { db } from '../../firebase.config';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { star, halfStar, emptyStar } from '../../assets/index';
import { useCart } from '../../context/userCartContext';

const Product = (props) => {
    const { productsData } = props;
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.amazon.userInfo);
    const authenticated = useSelector((state) => state.amazon.isAuthenticated);
    console.log(authenticated);
    const { userCart, updateUserCart } = useCart();

    const saveProductToFirsebase = async (product) => {
        const productWithDefaultQuantity = {
            ...product,
            quantity: 1,
        };
        const usersCollectionRef = collection(db, "users");
        const userRef = doc(usersCollectionRef, userInfo.email);
        const userCartRef = collection(userRef, "cart");
        const cartRef = doc(userCartRef, userInfo.id);
        try {
            const snap = await getDoc(cartRef);
            if (snap.exists()) {
                const cart = snap.data().cart || [];
                const existingProductIndex = cart.findIndex(
                    (item) => item.title === product.title
                );
                if (existingProductIndex !== -1) {
                    // If the product already exists in the cart, increase its quantity
                    cart[existingProductIndex].quantity += 1;
                } else {
                    // If the product is not in the cart, add it to the cart
                    cart.push(productWithDefaultQuantity);
                }
                await setDoc(cartRef, { cart: cart }, { merge: true });
                // Update the user's cart in context to reflect the change
                updateUserCart(cart);
            }
            else {
                await setDoc(cartRef, { cart: [productWithDefaultQuantity] }, { merge: true });
                // Update the user's cart in context to reflect the change immeditely in our website
                updateUserCart([...userCart, productWithDefaultQuantity]);
            }
        } catch (error) {
            console.error('Error saving product to Firebase cart:', error);
        }
    }

    const handleButton = async(product) =>{
        if(!authenticated)
        {
            dispatch(addToCart({
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                category: product.category,
                thumbnail: product.thumbnail,
                discountPercentage: product.discountPercentage,
                images: product.imgaes,
                rating: product.rating,
                stock: product.stock,
                brand: product.brand,
                quantity: 1,
            }));
        }
        else {
           await saveProductToFirsebase(product);
          }
    }

    return (
        productsData.map((product) => (
            <div className='w-96 my-5 rounded border-[1px] border-gray-200 shadow-none hover:shadow-testShadow duration-200' key={product.id}>
                <Link to={`${product.title}`} >
                    <div className=" bg-gray-100 border-b-[1px] border-gray-200 flex justify-center items-center cursor-pointer relative group" >
                        <img className="w-full h-72" src={product.thumbnail} alt="productImage" />
                    </div>
                </Link>

                <div className='p-2 '>
                    <Link to={`${product.title}`} >
                        <div>
                            <p className="text-lg font-medium cursor-pointer">{product.title}</p>
                        </div>
                    </Link>
                    <div className='my-3'>
                        <p>{product.description.substring(0, 50)}...</p>
                    </div>
                    <div className='flex items-center '>
                        {[1, 2, 3, 4, 5].map((starIndex) => (
                            <img
                                key={starIndex}
                                className='w-4 h-4'
                                src={starIndex <= product.rating ? star : (starIndex - 0.5 <= product.rating ? halfStar : emptyStar)}
                                alt={`star-${starIndex}`}
                            />
                        ))}
                        <div className='ml-1 text-blue-500'>{product.rating}</div>
                    </div>
                    <div className='flex items-center mt-1'>
                        <p className='font-medium mb-1'>&nbsp;₹&nbsp;</p>
                        <span className='text-[26px] font-medium'>{product.price}</span>
                        <span>&nbsp;({product.discountPercentage}% Off)</span>
                    </div>
                    <button onClick={() => {handleButton(product)}} className={`text-lg font-medium w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[4px] mt-3 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}
                    >Add to Cart</button>
                </div>
            </div>
        ))
    )
}

export default Product
