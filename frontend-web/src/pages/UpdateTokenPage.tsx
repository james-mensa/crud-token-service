import { Container, IconButton, Stack, Typography } from "@mui/material";
import { Token } from "@packages/utils";
import { grey } from "@mui/material/colors";
import { useNavigate, useParams } from "react-router-dom";

import { Asset } from "@assets/registry";
import { dialogStore } from "@store/DialogStore";
import { TokenForm } from "@components/common-ui/TokenForm";
import { tokenApi } from "@apis/token";
import { useEffect, useState } from "react";
import routePath from "@config/paths";

export const UpdateTokenPage = () => {
  const { address } = useParams<{ address: string }>();
  const [token, setToken] = useState<Token>();
  const navigate = useNavigate();

  const fetchDetail = async () => {
    try {
      if (!address) {
        return;
      }
      const res = await tokenApi.getToken(address);
      if (!res.success) {
        dialogStore.open({
          title: "Alert",
          subtitle: res.message ?? "",
          rightButton: {
            onClick: () => navigate(routePath.HOME_PATH),
            label: "Go Back",
          },
          open: true,
        });
        setTimeout(() => {
          navigate(routePath.HOME_PATH);
          dialogStore.close();
        }, 5000);
      }

      if (res.data) {
        setToken(res.data);
      }
    } catch (err) {}
  };
  useEffect(() => {
    fetchDetail();
  }, []);

  const handleSubmit = (token: Token) => {
    dialogStore.open({
      title: "Modify",
      subtitle: "click continue to update token",
      rightButton: {
        onClick: () => makeApiCall(token),
      },
      open: true,
    });
  };
  const makeApiCall = async (token: Token) => {
    try {
      const res = await tokenApi.updateToken(address ?? "", token);

      dialogStore.open({
        title: "Alert",
        subtitle: res.message ?? "",
        rightButton: {
          onClick: () => dialogStore.close(),
          label: "Okay",
        },
        open: true,
      });
    } catch (err) {}
  };
  if (address === undefined) {
    return null;
  }
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
        {token && <TokenForm token={token} onSubmit={handleSubmit} />}
      </Stack>
    </Container>
  );
};
