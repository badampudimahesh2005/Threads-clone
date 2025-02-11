import { Stack, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";
import AddPost from "../../components/modals/AddPost";

const ProtectedLayout = () => {
    const _700 = useMediaQuery('(min-width:700px)');

    
    return (
        <Stack
        flexDirection={"column"}
        maxWidth={_700 ? '800px' : '90%'}
        minWidth={'100%'}
        mx={'auto'}
        overflow={'hidden'}
        >
            <Header />
            <AddPost />
            <Outlet />
       
        </Stack>
    );
    };
    export default ProtectedLayout;