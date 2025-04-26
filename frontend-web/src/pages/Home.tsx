import { Box, Typography } from "@mui/material"
import { TokenFormDialog } from "../components/common-ui/models/TokenFormDialog"

 const Home=()=>{

    return(<Box 
    sx={{
        backgroundColor:"red",
        height:"1000px"
    }}>
       <TokenFormDialog/>

    </Box>)
}

export default Home