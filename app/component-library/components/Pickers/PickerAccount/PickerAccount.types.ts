// External dependencies.
import { ViewStyle } from 'react-native';
import { AvatarAccountType } from '../../Avatars/Avatar/variants/AvatarAccount';
import { PickerBaseProps } from '../PickerBase';

/**
 * PickerAccount component props.
 */
export interface PickerAccountProps extends Omit<PickerBaseProps, 'children'> {
  /**
   * An Ethereum wallet address.
   */
  accountAddress: string;
  /**
   * AvatarAccount variants.
   */
  accountAvatarType: AvatarAccountType;
  /**
   * Name of the account.
   */
  accountName: string;
  /**
   * Show address.
   */
  showAddress?: boolean;
  /**
   * cell account container style.
   */
  cellAccountContainerStyle?: ViewStyle;

  /**
   * Account type label.
   */
  accountTypeLabel?: string | null;
}

/**
 * Style sheet input parameters.
 */
export type PickerAccountStyleSheetVars = Pick<
  PickerAccountProps,
  'style' | 'cellAccountContainerStyle'
>;
