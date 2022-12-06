import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../Pages/Hooks/useAdmin.';
import useBuyer from '../Pages/Hooks/useBuyer';
import useSeller from '../Pages/Hooks/useSeller';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email)

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                        {
                            isAdmin && <>
                                <li><Link to='/dashboard/AllBuyer'>All buyer</Link></li>
                                <li><Link to='/dashboard/allSeller'>All Seller</Link></li>
                            </>
                        }

                        {
                            isSeller && <>
                                <li><Link to='/dashboard/addBooks'>Add Product</Link></li>
                                <li><Link to='/dashboard/myProduct'>My Product</Link></li>
                                <li><Link>My buyers</Link></li>
                            </>
                        }
                        {
                            isBuyer && <>
                                <li><Link to='/dashboard/myOrder'>My Order</Link></li>

                            </>
                        }
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;