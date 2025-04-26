import { useState } from "react";
import { BaseModal } from "../../BaseModel";
import { Box, Button, Grid, Theme, Typography } from "@mui/material";
import { TextInput } from "../../TextInput";
import { useFormManager } from "../../../hooks/useForm";
import { Token, TokenType } from "@packages/utils";

export const TokenFormDialog = () => {
  const [open, setOpen] = useState(false);
  const handleOnClose = () => setOpen(false);
  const handleOnOpen = () => setOpen(true);

  const {
    formState,
    setFormState,
    handleFieldChange,
    hasFieldError,
    getFormData,
    validateForm,
    handleFormSubmit,
    resetForm,
    setSubmitAttempt,
  } = useFormManager<Token>({
    tokenType: TokenType.ERC721,
    contractAddress: "",
    tokenName: "",
    tokenSymbol: "",
    tokenIconUri: "",
  });

  return (
    <Box>
      <Button onClick={handleOnOpen}>New Token</Button>
      <BaseModal isOpen={open} handleClose={handleOnClose}>
        <Box sx={styles.wrapper}>
          <Typography variant="h6" mb={2}>
            Token Form
          </Typography>

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={4}>
              <TextInput
                label="Token Name"
                onChange={handleFieldChange("tokenName")}
                placeholder="Enter token name"
                value={formState.tokenName}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextInput
                label="Token Symbol"
                onChange={handleFieldChange("tokenSymbol")}
                placeholder="Enter token symbol name"
                value={formState.tokenSymbol}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextInput
                label="Token Type"
                onChange={handleFieldChange("tokenType")}
                placeholder="Enter token  type"
                value={formState.tokenType}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextInput
                label="Token Contract Address"
                onChange={handleFieldChange("contractAddress")}
                placeholder="Enter token  Contract Address"
                value={formState.contractAddress}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextInput 
                  label="Token ID (only for NFTs)"
                  onChange={handleFieldChange('tokenID')}
                  placeholder="Enter Token Id"
                  value={ formState.tokenID?.toString()} />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextInput
                label="Decimal (optional)"
                onChange={handleFieldChange("decimal")}
                placeholder="Decimal"
                value={ formState.decimal?.toString()}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextInput 
                  label="Icon Uri (optional)"
                  onChange={handleFieldChange('tokenIconUri')}
                  placeholder="tokenIconUri"
                  value={ formState.tokenIconUri} />
            </Grid>
          </Grid>
        </Box>
      </BaseModal>
    </Box>
  );
};

const styles = {
  wrapper: (theme: Theme) => ({
    backgroundColor: "white",
    minHeight: 200,
    borderRadius: 2,
    padding: 2,
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    [theme.breakpoints.up("xl")]: {
      width: "40%",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  }),
};
