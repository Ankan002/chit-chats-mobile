import {SuccessToast, ErrorToast} from 'react-native-toast-message';

export const ModalToastConfig = {
    success: (props: any) => (
        <SuccessToast
          {...props}
          style={{marginTop: 0}}
        />
      ),
      error: (props: any) => (
        <ErrorToast
          {...props}
          style={{marginTop: 0}}
        />
      ),
};