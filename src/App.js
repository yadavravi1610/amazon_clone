import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header';
import HeaderBottom from './Components/Header/HeaderBottom';
import ErrorPage from './Components/Error/Error';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { productsData } from "./api/api";
import Home from './Pages/Home';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import Cart from './Pages/Cart';
import Products from './Components/Products/Products';
import ProductDetails from './Components/Products/productDetails';
import { UserCartProvider } from './context/userCartContext';
// import { useEffect } from 'react';
// import { setUserAuthentication } from './Redux/amazonSlice';
// import { useDispatch } from 'react-redux';

const Layout = () => {
  return (
    <>
      <Header />
      <HeaderBottom />
      <ScrollRestoration />
      <Outlet />
      <Footer />

    </>
  );
}
function App() {

  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(setUserAuthentication(false));
  // },[dispatch])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      loader: productsData,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          loader: productsData,
          element: <Home />,
        },
        {
          path: "/allProducts",
          loader: productsData,
          children: [
            {
              index: true,
              loader: productsData,
              element: <Products />
            },
            {
              path: ":title",
              loader: productsData,
              element: <ProductDetails />,
            },
          ]
        },
        {
          path: ':category',
          children: [
            {
              index: true,
              loader: productsData,
              element: <Products />,
            },
            {
              path: ":title",
              loader: productsData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/Cart",
          loader: productsData,
          element: <Cart />
        },
      ],
    },
    {
      path: "/Login",
      children: [
        {
          index: true,
          element: <Login />
        },
        // {
        //   path: "forgotPassword",
        // element: <ForgotPassword />,
        // },
      ],
    },
    {
      path: "/createAccount",
      element: <SignUp />,
    },
    // {
    //   path: "/checkout",
    //   element: <Checkout />,
    // },
  ])


  return (
    <UserCartProvider>
      <div className='bg-gray-100 overflow-x-hidden'>
        <RouterProvider router={router} />
      </div>
    </UserCartProvider>
  );
}

export default App;


