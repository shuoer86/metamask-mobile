import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, Switch, View } from 'react-native';

import { MMKV } from 'react-native-mmkv';
import { strings } from '../../../../../locales/i18n';
import { useTheme } from '../../../../util/theme';
import Text, {
  TextVariant,
  TextColor,
} from '../../../../component-library/components/Texts/Text';
import { getNavigationOptionsTitle } from '../../../UI/Navbar';
import { Props } from './ExperimentalSettings.types';
import createStyles from './ExperimentalSettings.styles';
import Button, {
  ButtonVariants,
  ButtonSize,
  ButtonWidthTypes,
} from '../../../../component-library/components/Buttons/Button';
import Device from '../../../../../app/util/device';
import { SES_URL } from '../../../../../app/constants/urls';
import Routes from '../../../../../app/constants/navigation/Routes';

const storage = new MMKV(); // id: mmkv.default

/**
 * Main view for app Experimental Settings
 */
const ExperimentalSettings = ({ navigation, route }: Props) => {
  const [sesEnabled, setSesEnabled] = useState(
    storage.getBoolean('is-ses-enabled'),
  );

  const toggleSesEnabled = () => {
    storage.set('is-ses-enabled', !sesEnabled);
    setSesEnabled(!sesEnabled);
  };

  const isFullScreenModal = route?.params?.isFullScreenModal;

  const theme = useTheme();
  const { colors } = theme;
  const styles = createStyles(colors);

  useEffect(
    () => {
      navigation.setOptions(
        getNavigationOptionsTitle(
          strings('app_settings.experimental_title'),
          navigation,
          isFullScreenModal,
          colors,
          null,
        ),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colors],
  );

  const goToWalletConnectSessions = () => {
    navigation.navigate(Routes.WALLET.WALLET_CONNECT_SESSIONS_VIEW);
  };

  const openSesLink = () => Linking.openURL(SES_URL);

  const renderWalletConnectSettings = () => (
    <>
      <Text color={TextColor.Default} variant={TextVariant.BodyLGMedium}>
        {strings('experimental_settings.wallet_connect_dapps')}
      </Text>
      <Text
        color={TextColor.Alternative}
        variant={TextVariant.BodyMD}
        style={styles.desc}
      >
        {strings('experimental_settings.wallet_connect_dapps_desc')}
      </Text>
      <Button
        variant={ButtonVariants.Secondary}
        size={ButtonSize.Lg}
        label={strings('experimental_settings.wallet_connect_dapps_cta')}
        onPress={goToWalletConnectSessions}
        width={ButtonWidthTypes.Full}
        style={styles.accessory}
      />
    </>
  );

  const renderSesSettings = () => (
    <>
      <Text
        color={TextColor.Default}
        variant={TextVariant.HeadingLG}
        style={styles.heading}
      >
        {strings('app_settings.security_heading')}
      </Text>
      <View style={styles.setting}>
        <View style={styles.switchElement}>
          <Text color={TextColor.Default} variant={TextVariant.BodyLGMedium}>
            {strings('app_settings.ses_heading')}
          </Text>
          <Switch
            value={sesEnabled}
            onValueChange={toggleSesEnabled}
            trackColor={{
              true: colors.primary.default,
              false: colors.border.muted,
            }}
            style={styles.switch}
            ios_backgroundColor={colors.border.muted}
          />
        </View>
        <Text
          color={TextColor.Alternative}
          variant={TextVariant.BodyMD}
          style={styles.desc}
        >
          {strings('app_settings.ses_description')}{' '}
          <Button
            variant={ButtonVariants.Link}
            size={ButtonSize.Auto}
            onPress={openSesLink}
            label={strings('app_settings.ses_link')}
          />
          .
        </Text>
      </View>
    </>
  );

  return (
    <ScrollView style={styles.wrapper}>
      {renderWalletConnectSettings()}
      {Device.isIos() && renderSesSettings()}
    </ScrollView>
  );
};

export default ExperimentalSettings;
