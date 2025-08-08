import { lazy, memo, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import CreateDirection from './dashboard/yonalishlar/yonalish_add';

const Dashboard = lazy(() => import("./dashboard"));
const Yonalishlar = lazy(() => import("./dashboard/yonalishlar"));
const Guruhlar = lazy(() => import("./dashboard/guruhlar"));
const Oquvchilar = lazy(() => import("./dashboard/oquvchilar"));
const Oqituvchilar = lazy(() => import("./dashboard/oqituvchilar"));
const UpdateDirection = lazy(() => import("./dashboard/yonalishlar/yonalishlar_upd"));

const MainRouters = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {useRoutes([
                {
                    path: "/",
                    element: <Dashboard />,
                    children: [
                        {
                            path: "yonalishlar",
                            element: <Yonalishlar />, 
                            children: [
                                { 
                                    path: "create",
                                    element: <CreateDirection /> 
                                },
                                {
                                    path: "update",
                                    element: <UpdateDirection />
                                }
                            ]
                        },
                        { path: "", element: <Guruhlar /> },
                        { path: "oquvchilar", element: <Oquvchilar /> },
                        { path: "oqituvchilar", element: <Oqituvchilar /> },
                    ],
                },
            ])}
        </Suspense>
    );
};

export default memo(MainRouters);