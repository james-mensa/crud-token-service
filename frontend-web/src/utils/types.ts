import {ClientResponse} from '@packages/utils'

interface BaseQueryParams {
    limit?: number;
    page?: number;
  }

export interface RequestResponse<T> extends ClientResponse<T>{
    success:boolean
}

  export interface PromptDialogProps {
    title: string;
    subtitle: string;
    leftButton?: {
      onClick: () => void;
      label?: string;
    };
    rightButton?: {
      onClick: () => void;
      label?: string;
    };
    open: boolean;
    isProcessing?:boolean
  }

export interface SelectItems{
   value: string; 
   label: string 
}