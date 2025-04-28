import { Box, Grid, Stack } from "@mui/material";
import { type Token, TokenType } from "@packages/utils";

import { observer } from "mobx-react-lite";
import { Asset } from "@assets/registry";
import { TextInput } from "@components/TextInput";
import { useFormManager } from "@hooks/useForm";
import { SelectInput } from "@components/SelectInput";
import { tokenOptions } from "@utils/contants";
import { AppButton } from "@components/Button";
import { dialogStore } from "@store/DialogStore";

interface TokenFormProps {
  token?: Token;
  onSubmit: (token: Token) => void;
}
export const TokenForm: React.FC<TokenFormProps> = observer(
  ({ token, onSubmit }) => {
   
    const {
      formState,
      handleFieldChange,
      getFormData,
      onFormSubmit,
      setSubmitAttempt,
    } = useFormManager<Token>({
      tokenType: TokenType.ERC721,
      contractAddress: "",
      tokenName: "",
      tokenSymbol: "",
      tokenIconUri: "",
      tokenID: 0,
      ...token,
    });

    const handleonSubmit = () => {
      const optional_fields: (keyof Token)[] = ["decimal", "tokenIconUri"];
      const isErc20 = getFormData().tokenType === TokenType.ERC20;
      if (!isErc20) {
        optional_fields.push("tokenID");
      }
      const { isValid, data } = onFormSubmit({
        excludeFields: optional_fields,
      });
      if(!isValid){
        dialogStore.open({
          title: "Form",
          subtitle: "Please fill all required fields ",
          rightButton: {
            onClick: () =>{}
          },
          open: true,
        });
      }else{
        onSubmit(data)
      }
      setSubmitAttempt();
    };

    return (
      <Stack spacing={5} direction={"column"}>
        <Box>
          <Grid
            container
            spacing={{ xs: 4, md: 5 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <TextInput
                label="Token Name"
                onChange={handleFieldChange("tokenName")}
                placeholder="Enter token name"
                value={formState.tokenName}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextInput
                label="Token Symbol"
                onChange={handleFieldChange("tokenSymbol")}
                placeholder="Enter token symbol name"
                value={formState.tokenSymbol}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SelectInput
                label="Token Type"
                onChange={handleFieldChange("tokenType")}
                placeholder="Enter token  type"
                value={formState.tokenType}
                options={tokenOptions}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextInput
                label="Token Contract Address"
                onChange={handleFieldChange("contractAddress")}
                placeholder="Enter token  Contract Address"
                value={formState.contractAddress}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextInput
                label="Token ID (only for NFTs)"
                onChange={handleFieldChange("tokenID")}
                placeholder="Enter Token Id"
                value={formState.tokenID?.toString()}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextInput
                label="Decimal (optional)"
                onChange={handleFieldChange("decimal")}
                placeholder="Decimal"
                value={formState.decimal?.toString()}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextInput
                label="Icon Uri (optional)"
                onChange={handleFieldChange("tokenIconUri")}
                placeholder="tokenIconUri"
                value={formState.tokenIconUri}
              />
            </Grid>
          </Grid>
        </Box>

        <Box top={5}>
          <AppButton
            onClick={handleonSubmit}
            label={token? "Update":"Save"}
            icon={Asset.icon.Bolt}
          />
        </Box>
      </Stack>
    );
  }
);
