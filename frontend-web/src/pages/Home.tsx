import { tokenApi } from "@apis/token";
import AppTable, { RowItem } from "@components/AppTable";
import { AppButton } from "@components/Button";
import { appConfig } from "@config/config";
import routePath from "@config/paths";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Chip,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Pagination, Token } from "@packages/utils";
import { dialogStore } from "@store/DialogStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FETCH_LIMIT = 20;

const Home = () => {
  const [data, setData] = useState<Token[]>([]);
  const [pagination, setPagination] = useState<Pagination>();

  const fetch = async (page: number) => {
    try {
      const res = await tokenApi.getTokens({ page, limit: FETCH_LIMIT });
      if (res.data) {
        setData(res.data);
        setPagination(res.pagination);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetch(1);
  }, []);

  const handlePageToggle = (page: number) => {
    fetch(page);
  };

  const handleDelete = (token: Token) => {
    dialogStore.open({
      title: "Delete Token",
      subtitle: `click continue to delete token (${token.tokenName}) `,
      rightButton: {
        onClick: () => makeDeleteApiCall(token),
      },
      open: true,
    });
  };

  const makeDeleteApiCall = async (token: Token) => {
    try {
      const res = await tokenApi.deleteToken(token.contractAddress ?? "");
      dialogStore.open({
        title: "Alert",
        subtitle: res.message ?? "",
        rightButton: {
          onClick: () => dialogStore.close(),
          label: "Okay",
        },
        open: true,
      });
      fetch(pagination?.page??1)
    } catch (err) {}
  };

  const RenderRowController = ({ item }: { item: RowItem<Token> }) => {
    return (
      <Stack direction={"row"} alignContent={"center"} spacing={2}>
        <Tooltip title="Delete Record">
          <IconButton
            onClick={() => handleDelete(item)}
            sx={{ borderRadius: 0 }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Update Record">
          <IconButton
            onClick={() => navigation(`/tokens/${item.contractAddress}/update`)}
            sx={{ borderRadius: 0 }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  };

  const navigation = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container>
      <Stack direction={"column"} spacing={3} mt={10}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={700} color={grey[800]}>
            Token
          </Typography>
          <Chip label={`version: ${appConfig.app_version}`} />
        </Stack>
        <Box width={200}>
          <AppButton
            onClick={() => navigation(routePath.TOKEN_FORM_PAGE)}
            label="Add New Token"
          />
        </Box>

        <AppTable<Token>
          data={data}
          headerLabels={isMobile ? smheaderLabels : lgheaderLabels}
          dataKeys={isMobile ? smdataKeys : lgdataKeys}
          rowComponent={RenderRowController}
          pagination={pagination}
          onChangePage={handlePageToggle}
        />
      </Stack>
    </Container>
  );
};

export default Home;
const lgheaderLabels: string[] = [
  "Token Name",
  "Token Symbol",
  "Token Type",
  "Contract Address",
  "Token ID",
  "Decimal",
  "Options",
];
const lgdataKeys: (keyof Token)[] = [
  "tokenName",
  "tokenSymbol",
  "tokenType",
  "contractAddress",
  "tokenID",
  "decimal",
];

const smheaderLabels: string[] = ["Token Name", "Symbol", "Type", "Options"];
const smdataKeys: (keyof Token)[] = ["tokenName", "tokenSymbol", "tokenType"];
