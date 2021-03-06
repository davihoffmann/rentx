import React, { ReactElement } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { 
  Calendar as CustomCalendar,
  LocaleConfig
} from 'react-native-calendars';

import { ptBr } from './localeConfig';
import { CalendarProps } from './types';

LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale = 'pt-br';

export default function Calendar({ markedDates, onDayPress }: CalendarProps): ReactElement {
  const theme = useTheme();
  
  return (
    <CustomCalendar 
      renderArrow={(direction) => (
        <Feather 
          size={24} 
          color={theme.colors.text}
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textMonthFontFamily: theme.fonts.secondary_600,
        textDayFontSize: 12,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}
