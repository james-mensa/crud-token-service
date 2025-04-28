import { Container, IconButton, Stack, Typography } from "@mui/material";
import { Token } from "@packages/utils";
import { grey } from "@mui/material/colors";

import { Asset } from "@assets/registry";
import { dialogStore } from "@store/DialogStore";
import { TokenForm } from "@components/common-ui/TokenForm";
import { tokenApi } from "@apis/token";
import { useNavigate } from "react-router-dom";
import routePath from "@config/paths";

export const AddTokenPage = () => {
    const navigate = useNavigate();
  const handleSubmit = (token: Token) => {
    dialogStore.open({
      title: "New Token",
      subtitle: "click continue to add new token",
      rightButton: {
        onClick: () => makeApiCall(token),
      },
      open: true,
    });
  };
  const makeApiCall = async (token: Token) => {
    try {
      const res = await tokenApi.createToken(token);
      dialogStore.open({
        title: "New Token",
        subtitle: res.message ?? "Request successfull",
        rightButton: {
          onClick: () => dialogStore.close(),
          label: "Okay",
        },
        open: true,
      });
    } catch (err) {}
  };
  return (
    <Container maxWidth={"md"}>
      <Stack direction={"column"} pt={5}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={10}
        >
          <Typography variant="h6" fontWeight={700} color={grey[700]}>
            Token Form
          </Typography>
          <Stack direction={"row"} alignItems={"center"}>
            <IconButton onClick={()=>navigate(routePath.HOME_PATH)}>{Asset.icon.Back}</IconButton>
            <Typography fontWeight={600} fontSize={14} color={grey[600]}>
              Back
            </Typography>
          </Stack>
        </Stack>
        <TokenForm onSubmit={handleSubmit} />
      </Stack>
    </Container>
  );
};
