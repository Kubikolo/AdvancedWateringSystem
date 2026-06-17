// styles/global.js
import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#121212',
  cardBackground: '#1E1E1E',
  inputBackground: '#2A2A2A',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#CCCCCC',
  mediumGray: '#888888',
  darkGray: '#444444',
  buttonPrimary: '#4CAF50',   // green
  buttonSecondary: '#2196F3', // blue
  buttonCancel: '#E53935',    // red
  textPrimary: '#FFFFFF',
  textSecondary: '#BBBBBB',
  primaryDisabled: "#888888",

  green: '#4CAF50',   // Moisture good
  yellow: '#FFEB3B',  // Moisture moderate
  orange: '#FF9800',  // Moisture low
  red: '#F44336',     // Moisture critical
  blue: '#4DBCE9',
  waterBlue: '#00BFFF',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FONT_SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 28,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },

  emergency: {
    borderColor: COLORS.red,
    borderWidth: 10
  },

  plantCardContainer: {
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },

  plantName: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },

  infoText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
  },

  buttonPrimary: {
    backgroundColor: COLORS.buttonPrimary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonSecondary: {
    backgroundColor: COLORS.buttonSecondary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonCancel: {
    backgroundColor: COLORS.buttonCancel,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: FONT_SIZES.medium,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: SPACING.lg,
  },

  modalContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: SPACING.lg
  },

  title: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },

  label: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },

  input: {
    backgroundColor: COLORS.inputBackground,
    color: COLORS.white,
    padding: SPACING.sm,
    borderRadius: 8,
    fontSize: FONT_SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SPACING.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  infoLabel: {
    fontWeight: 'normal',
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.md,
  },
  infoValue: {
    fontWeight: 'normal',
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.md,
  },
  plantHistoryCard: {
    borderRadius: 10,
    elevation: 8,
    backgroundColor: COLORS.inputBackground
  },
  filterItem: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterContainer: {
    paddingLeft: SPACING.md,
  },
  selectedFilter: {
    backgroundColor: COLORS.blue,
  },
  selectedText: {
    color: COLORS.white,
  },
  pumpProgressBar: {
    marginTop: SPACING.md
  },
  middleBarText: {
    fontWeight: 'bold',
    color: COLORS.white
  }
});
